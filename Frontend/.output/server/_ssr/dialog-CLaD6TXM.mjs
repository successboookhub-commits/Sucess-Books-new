import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as api, s as cn } from "./button-XQbb4kXE.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogOverlay$1, c as DialogTrigger$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dialog-CLaD6TXM.js
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
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
//#endregion
export { DialogTitle as a, WishlistProvider as c, DialogHeader as i, useUserAuth as l, DialogContent as n, DialogTrigger as o, DialogDescription as r, UserAuthProvider as s, Dialog as t, useWishlist as u };
