import { r as __toESM } from "../_runtime.mjs";
import { t as api } from "./api-B0JqYe2J.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as useUserAuth } from "./cart-DXL0Uihs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wishlist-8lo-BWJg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WishlistContext = (0, import_react.createContext)(null);
function WishlistProvider({ children }) {
	const [wishlist, setWishlist] = (0, import_react.useState)([]);
	const [wishlistOpen, setWishlistOpen] = (0, import_react.useState)(false);
	const { user, token, isAuthenticated, openLoginModal } = useUserAuth();
	(0, import_react.useEffect)(() => {
		if (!isAuthenticated || !user || !token) {
			setWishlist([]);
			return;
		}
		const storageKey = `sbh_wishlist_${user.email}`;
		try {
			const stored = localStorage.getItem(storageKey);
			if (stored) setWishlist(JSON.parse(stored));
		} catch {}
		refreshWishlist();
	}, [
		isAuthenticated,
		user?.email,
		token
	]);
	const refreshWishlist = async () => {
		if (!token || !isAuthenticated || !user) return;
		try {
			let currentList = (await api.getWishlist(token)).data || [];
			const pendingRaw = sessionStorage.getItem("sbh_pending_wishlist_book");
			if (pendingRaw) try {
				const pendingBook = JSON.parse(pendingRaw);
				sessionStorage.removeItem("sbh_pending_wishlist_book");
				if (pendingBook && pendingBook.id && !currentList.some((b) => b.id === pendingBook.id)) {
					await api.toggleWishlist(token, pendingBook.id);
					currentList = [pendingBook, ...currentList];
					toast.success(`Added "${pendingBook.title}" to your Wishlist!`);
				}
			} catch {
				sessionStorage.removeItem("sbh_pending_wishlist_book");
			}
			setWishlist(currentList);
			const storageKey = `sbh_wishlist_${user.email}`;
			localStorage.setItem(storageKey, JSON.stringify(currentList));
		} catch {}
	};
	const isWishlisted = (id) => {
		if (!isAuthenticated) return false;
		return wishlist.some((b) => b.id === id);
	};
	const toggleWishlist = async (book) => {
		if (!isAuthenticated || !token || !user) {
			try {
				sessionStorage.setItem("sbh_pending_wishlist_book", JSON.stringify(book));
			} catch {}
			openLoginModal();
			toast.info(`Please sign in to add "${book.title}" to your Wishlist.`);
			return false;
		}
		const currentlyInWishlist = isWishlisted(book.id);
		let nextState;
		const storageKey = `sbh_wishlist_${user.email}`;
		if (currentlyInWishlist) {
			nextState = wishlist.filter((b) => b.id !== book.id);
			setWishlist(nextState);
			localStorage.setItem(storageKey, JSON.stringify(nextState));
			toast.info(`Removed "${book.title}" from your Wishlist`);
		} else {
			nextState = [book, ...wishlist.filter((b) => b.id !== book.id)];
			setWishlist(nextState);
			localStorage.setItem(storageKey, JSON.stringify(nextState));
			toast.success(`Added "${book.title}" to your Wishlist!`);
		}
		try {
			await api.toggleWishlist(token, book.id);
		} catch {}
		return !currentlyInWishlist;
	};
	const removeFromWishlist = async (id) => {
		if (!isAuthenticated || !token || !user) return;
		const book = wishlist.find((b) => b.id === id);
		const nextState = wishlist.filter((b) => b.id !== id);
		const storageKey = `sbh_wishlist_${user.email}`;
		setWishlist(nextState);
		localStorage.setItem(storageKey, JSON.stringify(nextState));
		if (book) toast.info(`Removed "${book.title}" from your Wishlist`);
		try {
			await api.toggleWishlist(token, id);
		} catch {}
	};
	const wishlistIds = new Set(wishlist.map((b) => b.id));
	const wishlistCount = isAuthenticated ? wishlist.length : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WishlistContext.Provider, {
		value: {
			wishlist,
			wishlistIds,
			wishlistCount,
			isWishlisted,
			toggleWishlist,
			removeFromWishlist,
			wishlistOpen,
			setWishlistOpen,
			refreshWishlist
		},
		children
	});
}
function useWishlist() {
	const context = (0, import_react.useContext)(WishlistContext);
	if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
	return context;
}
//#endregion
export { useWishlist as n, WishlistProvider as t };
