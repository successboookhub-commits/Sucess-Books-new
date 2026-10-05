import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type Book } from "./books";
import { api } from "./api";
import { useUserAuth } from "./user-auth";
import { toast } from "sonner";

interface WishlistContextType {
  wishlist: Book[];
  wishlistIds: Set<number>;
  wishlistCount: number;
  isWishlisted: (id: number) => boolean;
  toggleWishlist: (book: Book) => Promise<boolean>;
  removeFromWishlist: (id: number) => Promise<void>;
  wishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | null>(null);
const WISHLIST_LOCAL_STORAGE = "sbh_local_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Book[]>([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { token, isAuthenticated } = useUserAuth();

  // Load initial local wishlist
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_LOCAL_STORAGE);
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  // Sync with backend if user is authenticated
  const refreshWishlist = async () => {
    if (token && isAuthenticated) {
      try {
        const res = await api.getWishlist(token);
        if (res.data) {
          setWishlist(res.data);
          localStorage.setItem(WISHLIST_LOCAL_STORAGE, JSON.stringify(res.data));
        }
      } catch {
        // fallback to local
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      refreshWishlist();
    }
  }, [isAuthenticated, token]);

  const isWishlisted = (id: number) => {
    return wishlist.some(b => b.id === id);
  };

  const toggleWishlist = async (book: Book): Promise<boolean> => {
    const currentlyInWishlist = isWishlisted(book.id);
    let nextState: Book[];

    if (currentlyInWishlist) {
      nextState = wishlist.filter(b => b.id !== book.id);
      setWishlist(nextState);
      localStorage.setItem(WISHLIST_LOCAL_STORAGE, JSON.stringify(nextState));
      toast.info(`Removed "${book.title}" from your Wishlist`);
    } else {
      nextState = [book, ...wishlist.filter(b => b.id !== book.id)];
      setWishlist(nextState);
      localStorage.setItem(WISHLIST_LOCAL_STORAGE, JSON.stringify(nextState));
      toast.success(`Added "${book.title}" to your Wishlist!`);
    }

    if (token && isAuthenticated) {
      try {
        await api.toggleWishlist(token, book.id);
      } catch {
        // silent sync fallback
      }
    }

    return !currentlyInWishlist;
  };

  const removeFromWishlist = async (id: number) => {
    const book = wishlist.find(b => b.id === id);
    const nextState = wishlist.filter(b => b.id !== id);
    setWishlist(nextState);
    localStorage.setItem(WISHLIST_LOCAL_STORAGE, JSON.stringify(nextState));
    if (book) {
      toast.info(`Removed "${book.title}" from your Wishlist`);
    }

    if (token && isAuthenticated) {
      try {
        await api.toggleWishlist(token, id);
      } catch {
        // silent sync
      }
    }
  };

  const wishlistIds = new Set(wishlist.map(b => b.id));
  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistIds,
        wishlistCount,
        isWishlisted,
        toggleWishlist,
        removeFromWishlist,
        wishlistOpen,
        setWishlistOpen,
        refreshWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
