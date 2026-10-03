import { createContext, useContext, useMemo, useState, useEffect, type ReactNode } from "react";
import { books as seedBooks, WHATSAPP_NUMBER, type Book } from "./books";
import { api } from "./api";

type CartContextValue = {
  cart: Record<number, number>;
  cartBooks: (Book & { quantity: number })[];
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  changeQuantity: (id: number, change: number, bookItem?: Book) => void;
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
    const subtotal = cartBooks.reduce((total, book) => total + book.price * book.quantity, 0);
    const deliveryFee = subtotal >= 799 || subtotal === 0 ? 0 : 60;
    const total = subtotal + deliveryFee;

    const message = `Hello Success Book Hub! I would like to order:\n\n${cartBooks
      .map((book) => `• ${book.title} × ${book.quantity} — ₹${book.price * book.quantity}`)
      .join("\n")}\n\nSubtotal: ₹${subtotal}${deliveryFee > 0 ? `\nDelivery: ₹${deliveryFee}` : "\nDelivery: FREE"}\nTotal: ₹${total}\n\nPlease confirm availability and payment details.`;
    
    const orderUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    return {
      cart,
      cartBooks,
      cartCount,
      subtotal,
      deliveryFee,
      total,
      cartOpen,
      setCartOpen,
      changeQuantity,
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
