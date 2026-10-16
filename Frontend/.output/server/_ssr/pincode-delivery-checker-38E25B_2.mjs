import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-CKfowhiz.mjs";
import { W as MapPin, bt as CircleCheck, c as Truck, t as Zap, xt as CircleAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pincode-delivery-checker-38E25B_2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PincodeDeliveryChecker({ compact = false, className = "" }) {
	const [pincode, setPincode] = (0, import_react.useState)("");
	const [checkedPincode, setCheckedPincode] = (0, import_react.useState)("");
	const [isEditing, setIsEditing] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		try {
			const saved = localStorage.getItem("sbh_pincode");
			if (saved && /^\d{6}$/.test(saved)) {
				setPincode(saved);
				setCheckedPincode(saved);
			}
		} catch {}
	}, []);
	const handleCheck = (e) => {
		if (e) e.preventDefault();
		const clean = pincode.trim();
		if (!/^\d{6}$/.test(clean)) {
			setError("Please enter a valid 6-digit Indian PIN code.");
			return;
		}
		setError(null);
		setCheckedPincode(clean);
		setIsEditing(false);
		try {
			localStorage.setItem("sbh_pincode", clean);
		} catch {}
	};
	const getDeliveryInfo = (pin) => {
		const prefix2 = pin.slice(0, 2);
		if (prefix2 === "50") return {
			zone: "Telangana & Hyderabad Metro",
			speed: "Express 24–48h Delivery",
			estimate: "Arrives Tomorrow or within 24–48 Hours",
			isExpress: true,
			codAvailable: true
		};
		else if (prefix2 === "51" || prefix2 === "52" || prefix2 === "53") return {
			zone: "Andhra Pradesh Regional",
			speed: "Fast Regional Delivery",
			estimate: "Arrives in 2–3 Business Days",
			isExpress: false,
			codAvailable: true
		};
		else return {
			zone: "Pan-India Standard Courier",
			speed: "Standard Delivery",
			estimate: "Estimated arrival in 3–5 Business Days",
			isExpress: false,
			codAvailable: true
		};
	};
	const deliveryInfo = checkedPincode ? getDeliveryInfo(checkedPincode) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-xl border border-border/80 bg-secondary/30 p-3 text-xs ${className}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-bold text-foreground flex items-center gap-1.5 text-[11px] uppercase tracking-wider",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 text-amber-600" }), "Check Delivery Date & COD:"]
				}), checkedPincode && !isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setIsEditing(true),
					className: "text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer",
					children: [
						"Change (",
						checkedPincode,
						")"
					]
				})]
			}),
			!checkedPincode || isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleCheck,
				className: "mt-2 flex gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						maxLength: 6,
						placeholder: "Enter 6-digit PIN code (e.g. 500001)",
						value: pincode,
						onChange: (e) => {
							const val = e.target.value.replace(/\D/g, "");
							setPincode(val);
							if (error) setError(null);
						},
						className: "w-full h-8.5 px-3 rounded-lg border border-border bg-card text-xs font-semibold text-foreground focus:border-amber-500 focus:outline-none"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "sm",
					className: "h-8.5 px-4 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer shadow-xs btn-shimmer",
					children: "Check"
				})]
			}) : null,
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1.5 text-[11px] text-destructive flex items-center gap-1 font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3.5 w-3.5 shrink-0" }), error]
			}),
			deliveryInfo && !isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 space-y-1.5 animate-in fade-in-50",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${deliveryInfo.isExpress ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30" : "bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-500/30"}`,
							children: [deliveryInfo.isExpress ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3 w-3 fill-emerald-600 text-emerald-600" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-3 w-3" }), deliveryInfo.speed]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] text-muted-foreground font-medium",
							children: ["to PIN ", checkedPincode]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] font-semibold text-foreground flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: deliveryInfo.estimate })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-muted-foreground",
						children: "• Cash on Delivery (COD) Available • Free shipping over ₹499"
					})
				]
			})
		]
	});
}
//#endregion
export { PincodeDeliveryChecker as t };
