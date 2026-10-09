import { r as __toESM } from "../_runtime.mjs";
import { t as api } from "./api-CIbGssxW.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as useUserAuth } from "./cart-DMZvUTwh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wishlist-BizSf4Wx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WishlistContext = (0, import_react.createContext)(null);
var WISHLIST_LOCAL_STORAGE = "sbh_local_wishlist";
function WishlistProvider({ children }) {
	const [wishlist, setWishlist] = (0, import_react.useState)([]);
	const [wishlistOpen, setWishlistOpen] = (0, import_react.useState)(false);
	const { token, isAuthenticated } = useUserAuth();
	(0, import_react.useEffect)(() => {
		try {
			const stored = localStorage.getItem(WISHLIST_LOCAL_STORAGE);
			if (stored) setWishlist(JSON.parse(stored));
		} catch {}
	}, []);
	const refreshWishlist = async () => {
		if (token && isAuthenticated) try {
			const res = await api.getWishlist(token);
			if (res.data) {
				setWishlist(res.data);
				localStorage.setItem(WISHLIST_LOCAL_STORAGE, JSON.stringify(res.data));
			}
		} catch {}
	};
	(0, import_react.useEffect)(() => {
		if (isAuthenticated && token) refreshWishlist();
	}, [isAuthenticated, token]);
	const isWishlisted = (id) => {
		return wishlist.some((b) => b.id === id);
	};
	const toggleWishlist = async (book) => {
		const currentlyInWishlist = isWishlisted(book.id);
		let nextState;
		if (currentlyInWishlist) {
			nextState = wishlist.filter((b) => b.id !== book.id);
			setWishlist(nextState);
			localStorage.setItem(WISHLIST_LOCAL_STORAGE, JSON.stringify(nextState));
			toast.info(`Removed "${book.title}" from your Wishlist`);
		} else {
			nextState = [book, ...wishlist.filter((b) => b.id !== book.id)];
			setWishlist(nextState);
			localStorage.setItem(WISHLIST_LOCAL_STORAGE, JSON.stringify(nextState));
			toast.success(`Added "${book.title}" to your Wishlist!`);
		}
		if (token && isAuthenticated) try {
			await api.toggleWishlist(token, book.id);
		} catch {}
		return !currentlyInWishlist;
	};
	const removeFromWishlist = async (id) => {
		const book = wishlist.find((b) => b.id === id);
		const nextState = wishlist.filter((b) => b.id !== id);
		setWishlist(nextState);
		localStorage.setItem(WISHLIST_LOCAL_STORAGE, JSON.stringify(nextState));
		if (book) toast.info(`Removed "${book.title}" from your Wishlist`);
		if (token && isAuthenticated) try {
			await api.toggleWishlist(token, id);
		} catch {}
	};
	const wishlistIds = new Set(wishlist.map((b) => b.id));
	const wishlistCount = wishlist.length;
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
