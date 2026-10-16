import { r as __toESM } from "../_runtime.mjs";
import { t as api } from "./api-BkY1Bdf5.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./button-CKfowhiz.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { R as Package, S as Search, U as MapPin, V as MessageCircle, mt as Clock, s as Truck, vt as CircleCheck, yt as CircleAlert } from "../_libs/lucide-react.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, t as Dialog } from "./dialog-C-FEQyPT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-BfyKergw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OrderTrackerModal({ open, onOpenChange, initialOrderId = "", trigger }) {
	const [orderIdInput, setOrderIdInput] = (0, import_react.useState)(initialOrderId);
	const [order, setOrder] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const handleTrack = async (idToSearch) => {
		const id = (idToSearch || orderIdInput).trim();
		if (!id) return;
		setLoading(true);
		setError(null);
		try {
			const data = await api.trackOrder(id);
			setOrder(data);
		} catch (err) {
			setOrder(null);
			setError(err instanceof Error ? err.message : `Order ${id} could not be found.`);
		} finally {
			setLoading(false);
		}
	};
	const steps = [
		{
			key: "pending",
			label: "Order Placed",
			icon: Clock
		},
		{
			key: "confirmed",
			label: "Confirmed",
			icon: CircleCheck
		},
		{
			key: "dispatched",
			label: "Dispatched",
			icon: Truck
		},
		{
			key: "delivered",
			label: "Delivered",
			icon: Package
		}
	];
	const getStepStatus = (stepKey, currentStatus) => {
		const statusOrder = [
			"pending",
			"confirmed",
			"dispatched",
			"delivered"
		];
		const currentIndex = statusOrder.indexOf(currentStatus.toLowerCase());
		const stepIndex = statusOrder.indexOf(stepKey);
		if (currentStatus === "cancelled") return "cancelled";
		if (stepIndex <= currentIndex) return "completed";
		return "upcoming";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange,
		children: [trigger && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: trigger
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] overflow-y-auto sm:max-w-xl p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				className: "p-5 pb-4 border-b border-border/80 bg-gradient-to-b from-secondary/40 to-background/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "font-serif text-xl font-bold text-foreground flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5 text-amber-600 dark:text-amber-400" }), " Track Your Book Order"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							handleTrack();
						},
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Enter Order ID (e.g. SBH-9734)",
								value: orderIdInput,
								onChange: (e) => setOrderIdInput(e.target.value.toUpperCase()),
								className: "w-full h-11 pl-10 pr-3 rounded-full border border-border bg-card text-sm font-semibold outline-none focus:border-primary uppercase tracking-wider"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: loading,
							className: "rounded-full px-6 h-11",
							children: loading ? "Searching..." : "Track"
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-xs text-destructive flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-5 w-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })]
					}),
					order && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6 animate-in fade-in-50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-secondary/50 border border-border p-4 flex flex-wrap items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase font-bold text-muted-foreground tracking-wider",
									children: "Tracking Code"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xl font-bold text-primary",
									children: order.id
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase font-bold text-muted-foreground tracking-wider",
										children: "Current Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: cn("text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block mt-0.5", order.status === "delivered" ? "bg-emerald-100 text-emerald-800" : order.status === "dispatched" ? "bg-blue-100 text-blue-800" : order.status === "confirmed" ? "bg-amber-100 text-amber-800" : order.status === "cancelled" ? "bg-red-100 text-red-800" : "bg-orange-100 text-orange-800"),
										children: order.status
									})]
								})]
							}),
							order.status !== "cancelled" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-4 gap-1 relative text-center",
									children: steps.map((step, idx) => {
										const status = getStepStatus(step.key, order.status);
										const StepIcon = step.icon;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-center space-y-1.5 z-10",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: cn("h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold transition", status === "completed" ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground border border-border"),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepIcon, { className: "h-4 w-4" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("text-[10px] font-semibold", status === "completed" ? "text-foreground font-bold" : "text-muted-foreground"),
												children: step.label
											})]
										}, step.key);
									})
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-xs text-destructive font-semibold",
								children: "This order was cancelled. Please contact customer care for assistance."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid sm:grid-cols-2 gap-4 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border p-3.5 space-y-1.5 bg-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-bold text-foreground flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 text-primary" }), " Delivery Address"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-muted-foreground leading-relaxed",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: order.customerName }),
											" (",
											order.customerPhone,
											")",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											order.deliveryAddress,
											order.city ? `, ${order.city}` : "",
											order.pincode ? ` - ${order.pincode}` : ""
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border p-3.5 space-y-1.5 bg-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-foreground",
										children: "Payment & Summary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1 text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Method:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground",
													children: order.paymentMethod
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", order.subtotal] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: order.deliveryFee === 0 ? "FREE" : `₹${order.deliveryFee}` })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between font-bold text-foreground border-t border-border pt-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Amount:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-primary font-display text-sm",
													children: ["₹", order.total]
												})]
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-border rounded-lg p-4 space-y-2 bg-card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-bold text-xs text-foreground uppercase tracking-wider",
									children: [
										"Ordered Books (",
										order.items.length,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "divide-y divide-border text-xs",
									children: order.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "py-2 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-medium text-foreground",
											children: [
												item.title,
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-muted-foreground",
													children: ["× ", item.quantity]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-primary",
											children: ["₹", item.price * item.quantity]
										})]
									}, i))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "w-full rounded-full gap-2 text-whatsapp border-whatsapp/30 hover:bg-whatsapp/10",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `https://wa.me/919876543210?text=${encodeURIComponent(`Hello Success Book Hub! I have a question regarding my order #${order.id}.`)}`,
									target: "_blank",
									rel: "noreferrer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4 text-whatsapp" }),
										" Query on WhatsApp regarding Order #",
										order.id
									]
								})
							})
						]
					})
				]
			})]
		})]
	});
}
var $$splitComponentImporter = () => import("./account-Yg-mwwv5.mjs");
var Route = createFileRoute("/account")({
	validateSearch: (search) => {
		return { tab: typeof search["tab"] === "string" ? search["tab"] : void 0 };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as n, OrderTrackerModal as t };
