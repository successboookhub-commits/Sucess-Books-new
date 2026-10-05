import { createContext, useContext, useMemo, useState, useEffect, type ReactNode } from "react";
import { books as seedBooks, WHATSAPP_NUMBER, type Book } from "./books";
import { api } from "./api";

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
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [catalog, setCatalog] = useState<Book[]>(seedBooks);

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

  const changeQuantity = (id: number, change: number, bookItem?: Book) => {
    if (bookItem && !catalog.some(b => b.id === id)) {
      setCatalog(prev => [...prev, bookItem]);
    }

    setCart((current) => {
      const next = Math.max(0, (current[id] ?? 0) + change);
      if (next === 0) {
        const copy = { ...current };
        delete copy[id];
        return copy;
      }
      return { ...current, [id]: next };
    });
  };

  const addToCart = (book: Book, quantity = 1) => {
    if (!catalog.some(b => b.id === book.id)) {
      setCatalog(prev => [...prev, book]);
    }
    setCart(current => ({
      ...current,
      [book.id]: (current[book.id] ?? 0) + quantity
    }));
    setCartOpen(true);
  };

  const clearCart = () => {
    setCart({});
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
      refreshCatalog
    };
  }, [cart, cartOpen, catalog]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

