import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as books, i as api, r as WHATSAPP_NUMBER } from "./button-C1OU8w0U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-Dx97UxOL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CartContext = (0, import_react.createContext)(null);
function CartProvider({ children }) {
	const [cart, setCart] = (0, import_react.useState)({});
	const [cartOpen, setCartOpen] = (0, import_react.useState)(false);
	const [catalog, setCatalog] = (0, import_react.useState)(books);
	const refreshCatalog = async () => {
		try {
			const fetched = await api.getBooks();
			if (fetched && fetched.length > 0) setCatalog(fetched);
		} catch {}
	};
	(0, import_react.useEffect)(() => {
		refreshCatalog();
	}, []);
	const changeQuantity = (id, change, bookItem) => {
		if (bookItem && !catalog.some((b) => b.id === id)) setCatalog((prev) => [...prev, bookItem]);
		setCart((current) => {
			const next = Math.max(0, (current[id] ?? 0) + change);
			if (next === 0) {
				const copy = { ...current };
				delete copy[id];
				return copy;
			}
			return {
				...current,
				[id]: next
			};
		});
	};
	const clearCart = () => {
		setCart({});
	};
	const value = (0, import_react.useMemo)(() => {
		const cartBooks = Object.keys(cart).map((idStr) => {
			const id = parseInt(idStr);
			const found = catalog.find((b) => b.id === id);
			if (!found) return null;
			return {
				...found,
				quantity: cart[id]
			};
		}).filter((b) => b !== null);
		const cartCount = Object.values(cart).reduce((total, qty) => total + qty, 0);
		const subtotal = cartBooks.reduce((total, book) => total + book.price * book.quantity, 0);
		const deliveryFee = subtotal >= 799 || subtotal === 0 ? 0 : 60;
		const total = subtotal + deliveryFee;
		const message = `Hello Success Book Hub! I would like to order:\n\n${cartBooks.map((book) => `• ${book.title} × ${book.quantity} — ₹${book.price * book.quantity}`).join("\n")}\n\nSubtotal: ₹${subtotal}${deliveryFee > 0 ? `\nDelivery: ₹${deliveryFee}` : "\nDelivery: FREE"}\nTotal: ₹${total}\n\nPlease confirm availability and payment details.`;
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
	}, [
		cart,
		cartOpen,
		catalog
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value,
		children
	});
}
function useCart() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCart must be used inside CartProvider");
	return ctx;
}
//#endregion
export { useCart as n, CartProvider as t };
