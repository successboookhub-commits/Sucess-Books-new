import { r as __toESM } from "../_runtime.mjs";
import { t as api } from "./api-DNBX1byj.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-C6tKOay8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(void 0);
var TOKEN_KEY = "sbh_admin_token";
var USER_KEY = "sbh_admin_user";
function AuthProvider({ children }) {
	const [token, setToken] = (0, import_react.useState)(null);
	const [adminUser, setAdminUser] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			if (typeof window !== "undefined") {
				const storedToken = localStorage.getItem(TOKEN_KEY);
				const storedUser = localStorage.getItem(USER_KEY);
				if (storedToken && storedUser) {
					setIsLoading(true);
					setToken(storedToken);
					setAdminUser(JSON.parse(storedUser));
					api.getAdminMe(storedToken).then((res) => {
						if (res?.user) setAdminUser(res.user);
					}).catch(() => {
						logout();
					}).finally(() => {
						setIsLoading(false);
					});
					return;
				}
			}
		} catch {}
		setIsLoading(false);
	}, []);
	const login = (newToken, newUser) => {
		setToken(newToken);
		setAdminUser(newUser);
		if (typeof window !== "undefined") {
			localStorage.setItem(TOKEN_KEY, newToken);
			localStorage.setItem(USER_KEY, JSON.stringify(newUser));
		}
	};
	const logout = () => {
		setToken(null);
		setAdminUser(null);
		if (typeof window !== "undefined") {
			localStorage.removeItem(TOKEN_KEY);
			localStorage.removeItem(USER_KEY);
		}
	};
	const sendOtp = async (email) => {
		return await api.sendAdminOtp(email);
	};
	const verifyOtp = async (email, otp) => {
		const res = await api.verifyAdminOtp(email, otp);
		if (res.success && res.token && res.user) login(res.token, res.user);
		return res;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			token,
			adminUser,
			isAuthenticated: Boolean(token),
			isLoading,
			login,
			logout,
			sendOtp,
			verifyOtp
		},
		children
	});
}
function useAdminAuth() {
	const context = (0, import_react.useContext)(AuthContext);
	if (!context) throw new Error("useAdminAuth must be used within an AuthProvider");
	return context;
}
//#endregion
export { useAdminAuth as n, AuthProvider as t };
