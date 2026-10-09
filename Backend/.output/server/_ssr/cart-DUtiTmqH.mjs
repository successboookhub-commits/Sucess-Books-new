import { r as __toESM } from "../_runtime.mjs";
import { n as WHATSAPP_NUMBER, r as books } from "./books-B4F80K0Q.mjs";
import { t as api } from "./api-BjkSpkHQ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-DUtiTmqH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var USER_TOKEN_KEY = "sbh_user_token";
var USER_DATA_KEY = "sbh_user_data";
var UserAuthContext = (0, import_react.createContext)(null);
function UserAuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [token, setToken] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [loginModalOpen, setLoginModalOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const storedToken = localStorage.getItem(USER_TOKEN_KEY);
			const storedUser = localStorage.getItem(USER_DATA_KEY);
			if (storedToken) {
				setToken(storedToken);
				if (storedUser) try {
					setUser(JSON.parse(storedUser));
				} catch {}
				api.getUserProfile(storedToken).then((res) => {
					if (res.user) {
						setUser(res.user);
						localStorage.setItem(USER_DATA_KEY, JSON.stringify(res.user));
					}
				}).catch(() => {
					localStorage.removeItem(USER_TOKEN_KEY);
					localStorage.removeItem(USER_DATA_KEY);
					setToken(null);
					setUser(null);
				}).finally(() => setIsLoading(false));
			} else setIsLoading(false);
		} catch {
			setIsLoading(false);
		}
	}, []);
	const openLoginModal = () => setLoginModalOpen(true);
	const closeLoginModal = () => setLoginModalOpen(false);
	const loginWithPassword = async (payload) => {
		const res = await api.loginUser(payload);
		if (res.success && res.token) {
			setToken(res.token);
			setUser(res.user);
			localStorage.setItem(USER_TOKEN_KEY, res.token);
			localStorage.setItem(USER_DATA_KEY, JSON.stringify(res.user));
			closeLoginModal();
			toast.success(res.message || `Welcome back, ${res.user.name || "Book Lover"}!`);
		}
	};
	const registerWithPassword = async (payload) => {
		const res = await api.registerUser(payload);
		if (res.success && res.token) {
			setToken(res.token);
			setUser(res.user);
			localStorage.setItem(USER_TOKEN_KEY, res.token);
			localStorage.setItem(USER_DATA_KEY, JSON.stringify(res.user));
			closeLoginModal();
			toast.success(res.message || `Welcome to Success Book Hub, ${res.user.name}!`);
		}
	};
	const changePassword = async (payload) => {
		if (!token) throw new Error("Please log in first.");
		const res = await api.changeUserPassword(token, payload);
		if (res.success) toast.success(res.message || "Password updated successfully!");
	};
	const sendOtp = async (email) => {
		return await api.sendUserOtp(email);
	};
	const verifyOtp = async (email, otp, name, phone) => {
		const res = await api.verifyUserOtp(email, otp, name, phone);
		if (res.success && res.token) {
			setToken(res.token);
			setUser(res.user);
			localStorage.setItem(USER_TOKEN_KEY, res.token);
			localStorage.setItem(USER_DATA_KEY, JSON.stringify(res.user));
			closeLoginModal();
			toast.success(res.message || `Welcome back, ${res.user.name || "Book Lover"}!`);
		}
	};
	const refreshProfile = async () => {
		if (!token) return;
		try {
			const res = await api.getUserProfile(token);
			if (res.user) {
				setUser(res.user);
				localStorage.setItem(USER_DATA_KEY, JSON.stringify(res.user));
			}
		} catch {}
	};
	const updateProfile = async (data) => {
		if (!token) throw new Error("Please login first");
		const res = await api.updateUserProfile(token, data);
		if (res.success && res.user) {
			setUser(res.user);
			localStorage.setItem(USER_DATA_KEY, JSON.stringify(res.user));
			toast.success("Profile updated successfully!");
		}
	};
	const logout = () => {
		localStorage.removeItem(USER_TOKEN_KEY);
		localStorage.removeItem(USER_DATA_KEY);
		setToken(null);
		setUser(null);
		toast.info("You have signed out.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAuthContext.Provider, {
		value: {
			user,
			token,
			isAuthenticated: Boolean(token && user),
			isLoading,
			loginModalOpen,
			openLoginModal,
			closeLoginModal,
			loginWithPassword,
			registerWithPassword,
			changePassword,
			sendOtp,
			verifyOtp,
			updateProfile,
			refreshProfile,
			logout
		},
		children
	});
}
function useUserAuth() {
	const context = (0, import_react.useContext)(UserAuthContext);
	if (!context) throw new Error("useUserAuth must be used within a UserAuthProvider");
	return context;
}
var GUEST_CART_KEY = "sbh_guest_cart";
var CartContext = (0, import_react.createContext)(null);
function CartProvider({ children }) {
	const [cart, setCart] = (0, import_react.useState)({});
	const [cartOpen, setCartOpen] = (0, import_react.useState)(false);
	const [catalog, setCatalog] = (0, import_react.useState)(books);
	const { token, isAuthenticated } = useUserAuth();
	const refreshCatalog = async () => {
		try {
			const fetched = await api.getBooks();
			if (fetched && fetched.length > 0) setCatalog(fetched);
		} catch {}
	};
	(0, import_react.useEffect)(() => {
		refreshCatalog();
	}, []);
	const refreshCart = (0, import_react.useCallback)(async () => {
		if (typeof window === "undefined") return;
		if (token && isAuthenticated) try {
			const guestData = localStorage.getItem(GUEST_CART_KEY);
			if (guestData) try {
				const guestMap = JSON.parse(guestData);
				const guestItems = Object.entries(guestMap).map(([id, qty]) => ({
					id: parseInt(id),
					quantity: Number(qty)
				})).filter((it) => !isNaN(it.id) && it.quantity > 0);
				if (guestItems.length > 0) await api.mergeGuestCart(token, guestItems);
				localStorage.removeItem(GUEST_CART_KEY);
			} catch {
				localStorage.removeItem(GUEST_CART_KEY);
			}
			const dbCartRes = await api.getCart(token);
			if (dbCartRes && Array.isArray(dbCartRes.items)) {
				const newCartMap = {};
				const newBooks = [];
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
				setCatalog((prev) => {
					const map = new Map(prev.map((b) => [b.id, b]));
					for (const b of newBooks) if (!map.has(b.id)) map.set(b.id, b);
					return Array.from(map.values());
				});
			}
		} catch (err) {
			console.warn("[Cart] Failed to sync DB cart:", err);
		}
		else try {
			const guestData = localStorage.getItem(GUEST_CART_KEY);
			if (guestData) setCart(JSON.parse(guestData));
			else setCart({});
		} catch {
			setCart({});
		}
	}, [token, isAuthenticated]);
	(0, import_react.useEffect)(() => {
		refreshCart();
	}, [refreshCart]);
	const changeQuantity = (id, change, bookItem) => {
		if (bookItem && !catalog.some((b) => b.id === id)) setCatalog((prev) => [...prev, bookItem]);
		setCart((current) => {
			const next = Math.max(0, (current[id] ?? 0) + change);
			const copy = { ...current };
			if (next === 0) delete copy[id];
			else copy[id] = next;
			if (token && isAuthenticated) if (next === 0) api.removeFromDbCart(token, id).catch(() => {});
			else api.updateDbCartItem(token, id, next).catch(() => {});
			else try {
				localStorage.setItem(GUEST_CART_KEY, JSON.stringify(copy));
			} catch {}
			return copy;
		});
	};
	const addToCart = (book, quantity = 1) => {
		if (!catalog.some((b) => b.id === book.id)) setCatalog((prev) => [...prev, book]);
		const qtyToAdd = Math.max(1, quantity);
		setCart((current) => {
			const nextQty = (current[book.id] ?? 0) + qtyToAdd;
			const nextCart = {
				...current,
				[book.id]: nextQty
			};
			if (token && isAuthenticated) api.addToDbCart(token, book.id, qtyToAdd).catch(() => {});
			else try {
				localStorage.setItem(GUEST_CART_KEY, JSON.stringify(nextCart));
			} catch {}
			return nextCart;
		});
		setCartOpen(true);
	};
	const clearCart = () => {
		setCart({});
		if (token && isAuthenticated) api.clearDbCart(token).catch(() => {});
		else try {
			localStorage.removeItem(GUEST_CART_KEY);
		} catch {}
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
		const subtotal = cartBooks.reduce((sum, book) => sum + book.price * book.quantity, 0);
		const mrpTotal = cartBooks.reduce((sum, book) => {
			return sum + (book.mrp || book.old_price || book.oldPrice || book.originalPrice || book.price) * book.quantity;
		}, 0);
		const savingsTotal = Math.max(0, mrpTotal - subtotal);
		const savingsPercent = mrpTotal > 0 && savingsTotal > 0 ? Math.round(savingsTotal / mrpTotal * 100) : 0;
		const freeDeliveryThreshold = 499;
		const deliveryFee = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 49;
		const awayFromFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
		const freeDeliveryProgress = Math.min(100, Math.round(subtotal / freeDeliveryThreshold * 100));
		const total = subtotal + deliveryFee;
		const message = `Hello Success Book Hub! I would like to order:\n\n${cartBooks.map((book) => `• ${book.title} × ${book.quantity} — ₹${book.price * book.quantity}`).join("\n")}\n\nMRP Total: ₹${mrpTotal}\nSavings: ₹${savingsTotal} (${savingsPercent}% OFF)\nSubtotal: ₹${subtotal}${deliveryFee > 0 ? `\nDelivery: ₹${deliveryFee}` : "\nDelivery: FREE"}\nTotal: ₹${total}\n\nPlease confirm availability and delivery schedule.`;
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
	}, [
		cart,
		cartOpen,
		catalog,
		refreshCart
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
export { useUserAuth as i, UserAuthProvider as n, useCart as r, CartProvider as t };
