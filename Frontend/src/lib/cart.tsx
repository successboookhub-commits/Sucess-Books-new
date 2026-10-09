import { createContext, useContext, useMemo, useState, useEffect, useCallback, type ReactNode } from "react";
import { books as seedBooks, WHATSAPP_NUMBER, type Book } from "./books";
import { api } from "./api";
import { useUserAuth } from "./user-auth";

const GUEST_CART_KEY = "sbh_guest_cart";

type CartContextValue = {
  cart: Record<number, number>;
  cartBooks: (Book & { quantity: number })[];
  cartCount: number;
  subtotal: number;
  mrpTotal: number;
  savingsTotal: number;
  savingsPercent: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  awayFromFreeDelivery: number;
  freeDeliveryProgress: number;
  total: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  changeQuantity: (id: number, change: number, bookItem?: Book) => void;
  addToCart: (book: Book, quantity?: number) => void;
  clearCart: () => void;
  orderUrl: string;
  catalog: Book[];
  refreshCatalog: () => Promise<void>;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [catalog, setCatalog] = useState<Book[]>(seedBooks);
  const { token, isAuthenticated } = useUserAuth();

  const refreshCatalog = async () => {
    try {
      const fetched = await api.getBooks();
      if (fetched && fetched.length > 0) {
        setCatalog(fetched);
      }
    } catch {
      // keep existing catalog
    }
  };

  useEffect(() => {
    refreshCatalog();
  }, []);

  // Fetch or merge cart when auth state changes
  const refreshCart = useCallback(async () => {
    if (typeof window === "undefined") return;

    if (token && isAuthenticated) {
      try {
        // 1. Check if there is a guest cart to merge
        const guestData = localStorage.getItem(GUEST_CART_KEY);
        if (guestData) {
          try {
            const guestMap: Record<string, number> = JSON.parse(guestData);
            const guestItems = Object.entries(guestMap)
              .map(([id, qty]) => ({ id: parseInt(id), quantity: Number(qty) }))
              .filter(it => !isNaN(it.id) && it.quantity > 0);

            if (guestItems.length > 0) {
              await api.mergeGuestCart(token, guestItems);
            }
            localStorage.removeItem(GUEST_CART_KEY);
          } catch {
            localStorage.removeItem(GUEST_CART_KEY);
          }
        }

        // 2. Load authoritative cart from database
        const dbCartRes = await api.getCart(token);
        if (dbCartRes && Array.isArray(dbCartRes.items)) {
          const newCartMap: Record<number, number> = {};
          const newBooks: Book[] = [];

          for (const it of dbCartRes.items) {
            newCartMap[it.id] = it.quantity;
            newBooks.push({
              id: it.id,
              title: it.title,
              author: it.author,
              category: it.category,
              subCategory: it.subCategory,
              sub_category: it.subCategory,
              price: it.price,
              oldPrice: it.oldPrice,
              old_price: it.oldPrice,
              mrp: it.mrp,
              cover: it.cover,
              image_2: it.image2,
              rating: it.rating,
              stock: it.stock,
              label: it.label,
              publisher: it.publisher,
              badge: it.label,
              description: ""
            });
          }

          setCart(newCartMap);
          // Enrich catalog with any newly loaded books
          setCatalog(prev => {
            const map = new Map(prev.map(b => [b.id, b]));
            for (const b of newBooks) {
              if (!map.has(b.id)) map.set(b.id, b);
            }
            return Array.from(map.values());
          });
        }
      } catch (err) {
        console.warn("[Cart] Failed to sync DB cart:", err);
      }
    } else {
      // Load guest cart from localStorage
      try {
        const guestData = localStorage.getItem(GUEST_CART_KEY);
        if (guestData) {
          setCart(JSON.parse(guestData));
        } else {
          setCart({});
        }
      } catch {
        setCart({});
      }
    }
  }, [token, isAuthenticated]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const changeQuantity = (id: number, change: number, bookItem?: Book) => {
    if (bookItem && !catalog.some(b => b.id === id)) {
      setCatalog(prev => [...prev, bookItem]);
    }

    setCart((current) => {
      const next = Math.max(0, (current[id] ?? 0) + change);
      const copy = { ...current };
      if (next === 0) {
        delete copy[id];
      } else {
        copy[id] = next;
      }

      // Persist to DB or localStorage
      if (token && isAuthenticated) {
        if (next === 0) {
          api.removeFromDbCart(token, id).catch(() => {});
        } else {
          api.updateDbCartItem(token, id, next).catch(() => {});
        }
      } else {
        try {
          localStorage.setItem(GUEST_CART_KEY, JSON.stringify(copy));
        } catch {
          // ignore
        }
      }

      return copy;
    });
  };

  const addToCart = (book: Book, quantity = 1) => {
    if (!catalog.some(b => b.id === book.id)) {
      setCatalog(prev => [...prev, book]);
    }

    const qtyToAdd = Math.max(1, quantity);

    setCart(current => {
      const nextQty = (current[book.id] ?? 0) + qtyToAdd;
      const nextCart = {
        ...current,
        [book.id]: nextQty
      };

      if (token && isAuthenticated) {
        api.addToDbCart(token, book.id, qtyToAdd).catch(() => {});
      } else {
        try {
          localStorage.setItem(GUEST_CART_KEY, JSON.stringify(nextCart));
        } catch {
          // ignore
        }
      }

      return nextCart;
    });

    setCartOpen(true);
  };

  const clearCart = () => {
    setCart({});
    if (token && isAuthenticated) {
      api.clearDbCart(token).catch(() => {});
    } else {
      try {
        localStorage.removeItem(GUEST_CART_KEY);
      } catch {
        // ignore
      }
    }
  };

  const value = useMemo<CartContextValue>(() => {
    const cartBooks = Object.keys(cart)
      .map(idStr => {
        const id = parseInt(idStr);
        const found = catalog.find(b => b.id === id);
        if (!found) return null;
        return {
          ...found,
          quantity: cart[id]
        };
      })
      .filter((b): b is Book & { quantity: number } => b !== null);

    const cartCount = Object.values(cart).reduce((total, qty) => total + qty, 0);
    const subtotal = cartBooks.reduce((sum, book) => sum + book.price * book.quantity, 0);
    
    // Calculate total MRP based on original price or MRP
    const mrpTotal = cartBooks.reduce((sum, book) => {
      const itemMrp = book.mrp || book.old_price || book.oldPrice || book.originalPrice || book.price;
      return sum + itemMrp * book.quantity;
    }, 0);

    const savingsTotal = Math.max(0, mrpTotal - subtotal);
    const savingsPercent = mrpTotal > 0 && savingsTotal > 0 ? Math.round((savingsTotal / mrpTotal) * 100) : 0;

    const freeDeliveryThreshold = 499;
    const deliveryFee = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 49;
    const awayFromFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
    const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
    const total = subtotal + deliveryFee;

    const message = `Hello Success Book Hub! I would like to order:\n\n${cartBooks
      .map((book) => `• ${book.title} × ${book.quantity} — ₹${book.price * book.quantity}`)
      .join("\n")}\n\nMRP Total: ₹${mrpTotal}\nSavings: ₹${savingsTotal} (${savingsPercent}% OFF)\nSubtotal: ₹${subtotal}${deliveryFee > 0 ? `\nDelivery: ₹${deliveryFee}` : "\nDelivery: FREE"}\nTotal: ₹${total}\n\nPlease confirm availability and delivery schedule.`;
    
    const orderUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    return {
      cart,
      cartBooks,
      cartCount,
      subtotal,
      mrpTotal,
      savingsTotal,
      savingsPercent,
      deliveryFee,
      freeDeliveryThreshold,
      awayFromFreeDelivery,
      freeDeliveryProgress,
      total,
      cartOpen,
      setCartOpen,
      changeQuantity,
      addToCart,
      clearCart,
      orderUrl,
      catalog,
      refreshCatalog,
      refreshCart
    };
  }, [cart, cartOpen, catalog, refreshCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

