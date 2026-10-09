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
  const { user, token, isAuthenticated, openLoginModal } = useUserAuth();

  // Load user-specific cached wishlist on auth state change
  useEffect(() => {
    if (!isAuthenticated || !user || !token) {
      setWishlist([]);
      return;
    }

    const storageKey = `sbh_wishlist_${user.email}`;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch {
      // ignore
    }

    // Refresh from backend and handle any pending wishlist item from pre-login intent
    refreshWishlist();
  }, [isAuthenticated, user?.email, token]);

  // Sync with backend for authenticated user
  const refreshWishlist = async () => {
    if (!token || !isAuthenticated || !user) return;
    try {
      const res = await api.getWishlist(token);
      let currentList = res.data || [];

      // Check if user clicked a heart icon before logging in
      const pendingRaw = sessionStorage.getItem("sbh_pending_wishlist_book");
      if (pendingRaw) {
        try {
          const pendingBook: Book = JSON.parse(pendingRaw);
          sessionStorage.removeItem("sbh_pending_wishlist_book");
          if (pendingBook && pendingBook.id && !currentList.some(b => b.id === pendingBook.id)) {
            await api.toggleWishlist(token, pendingBook.id);
            currentList = [pendingBook, ...currentList];
            toast.success(`Added "${pendingBook.title}" to your Wishlist!`);
          }
        } catch {
          sessionStorage.removeItem("sbh_pending_wishlist_book");
        }
      }

      setWishlist(currentList);
      const storageKey = `sbh_wishlist_${user.email}`;
      localStorage.setItem(storageKey, JSON.stringify(currentList));
    } catch {
      // fallback
    }
  };

  const isWishlisted = (id: number) => {
    if (!isAuthenticated) return false;
    return wishlist.some(b => b.id === id);
  };

  const toggleWishlist = async (book: Book): Promise<boolean> => {
    // If not authenticated, prompt user to sign in and do not add to wishlist directly
    if (!isAuthenticated || !token || !user) {
      try {
        sessionStorage.setItem("sbh_pending_wishlist_book", JSON.stringify(book));
      } catch {
        // ignore
      }
      openLoginModal();
      toast.info(`Please sign in to add "${book.title}" to your Wishlist.`);
      return false;
    }

    const currentlyInWishlist = isWishlisted(book.id);
    let nextState: Book[];
    const storageKey = `sbh_wishlist_${user.email}`;

    if (currentlyInWishlist) {
      nextState = wishlist.filter(b => b.id !== book.id);
      setWishlist(nextState);
      localStorage.setItem(storageKey, JSON.stringify(nextState));
      toast.info(`Removed "${book.title}" from your Wishlist`);
    } else {
      nextState = [book, ...wishlist.filter(b => b.id !== book.id)];
      setWishlist(nextState);
      localStorage.setItem(storageKey, JSON.stringify(nextState));
      toast.success(`Added "${book.title}" to your Wishlist!`);
    }

    try {
      await api.toggleWishlist(token, book.id);
    } catch {
      // silent sync fallback
    }

    return !currentlyInWishlist;
  };

  const removeFromWishlist = async (id: number) => {
    if (!isAuthenticated || !token || !user) return;

    const book = wishlist.find(b => b.id === id);
    const nextState = wishlist.filter(b => b.id !== id);
    const storageKey = `sbh_wishlist_${user.email}`;

    setWishlist(nextState);
    localStorage.setItem(storageKey, JSON.stringify(nextState));
    if (book) {
      toast.info(`Removed "${book.title}" from your Wishlist`);
    }

    try {
      await api.toggleWishlist(token, id);
    } catch {
      // silent sync
    }
  };

  const wishlistIds = new Set(wishlist.map(b => b.id));
  const wishlistCount = isAuthenticated ? wishlist.length : 0;

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
