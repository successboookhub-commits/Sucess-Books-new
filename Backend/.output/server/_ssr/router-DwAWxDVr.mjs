import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { i as api, n as STORE, o as categories, r as WHATSAPP_NUMBER, s as cn, t as Button } from "./button-AP1kkBMv.mjs";
import { n as useCart, t as CartProvider } from "./cart-B_5EOj-V.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as MapPin, D as MessageSquare, E as Minus, G as CircleCheck, K as CircleAlert, O as MessageCircle, Q as BookOpen, T as Package, U as Clock, Z as BookPlus, _ as Search, a as Truck, b as Phone, f as ShoppingBag, g as Send, h as Settings, j as Mail, k as Menu, m as ShieldCheck, nt as ArrowLeft, q as ChevronRight, t as X, v as RefreshCw, y as Plus } from "../_libs/lucide-react.mjs";
import { t as Route$4 } from "./admin-B_GJj6tE.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as DialogTrigger$1, i as DialogTitle$1, n as DialogContent$1, r as DialogHeader, t as Dialog$1 } from "./dialog-CcAJgr37.mjs";
import { t as Route$5 } from "./shop-DpmHaCzj.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DwAWxDVr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BKSpHtNf.css";
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
function CartSheet() {
	const { cartBooks, cart, subtotal, deliveryFee, total, orderUrl, changeQuantity, clearCart, setCartOpen } = useCart();
	const [step, setStep] = (0, import_react.useState)("cart");
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [pincode, setPincode] = (0, import_react.useState)("");
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("Cash on Delivery");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [placedOrderId, setPlacedOrderId] = (0, import_react.useState)(null);
	const [placedWhatsappUrl, setPlacedWhatsappUrl] = (0, import_react.useState)(null);
	const [placedTotal, setPlacedTotal] = (0, import_react.useState)(0);
	const freeDeliveryThreshold = 799;
	const awayFromFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
	const deliveryProgress = Math.min(100, Math.round(subtotal / freeDeliveryThreshold * 100));
	const handleCheckoutSubmit = async (e) => {
		e.preventDefault();
		if (!name.trim() || !phone.trim() || !address.trim()) {
			toast.error("Please fill in your name, phone number, and delivery address.");
			return;
		}
		setSubmitting(true);
		try {
			const itemsPayload = cartBooks.map((b) => ({
				id: b.id,
				title: b.title,
				price: b.price,
				quantity: b.quantity
			}));
			const res = await api.createOrder({
				customerName: name,
				customerPhone: phone,
				customerEmail: email,
				deliveryAddress: address,
				city,
				pincode,
				items: itemsPayload,
				subtotal,
				deliveryFee,
				paymentMethod,
				orderNotes: notes
			});
			setPlacedOrderId(res.orderId);
			setPlacedWhatsappUrl(res.whatsappUrl);
			setPlacedTotal(res.total || total);
			setStep("success");
			clearCart();
			toast.success(`Order #${res.orderId} booked successfully!`);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to place order. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};
	const handleClose = () => {
		setCartOpen(false);
		setTimeout(() => {
			setStep("cart");
		}, 300);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
		className: "flex w-[94vw] flex-col p-0 sm:max-w-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
			className: "border-b border-border p-6 pr-12 text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
				className: "font-display text-2xl flex items-center gap-2",
				children: [step === "checkout" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setStep("cart"),
					className: "p-1 rounded-full hover:bg-secondary transition mr-1",
					"aria-label": "Back to bag",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
				}), step === "success" ? "Order Confirmed!" : step === "checkout" ? "Delivery Details" : "Your Book Bag"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: step === "success" ? "Your order is recorded in our system." : step === "checkout" ? "Enter your address for fast doorstep delivery." : cartBooks.length ? `${cartBooks.length} title${cartBooks.length === 1 ? "" : "s"} selected` : "Your next great read is waiting." })]
		}), step === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 overflow-y-auto p-6 flex flex-col justify-between text-center space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pt-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-display text-2xl font-bold text-foreground",
						children: [
							"Thank you, ",
							name,
							"!"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: "We're preparing your book parcel with utmost care."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-secondary/60 border border-border rounded-xl p-4 text-xs space-y-1 text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Order ID:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display font-bold text-sm text-primary tracking-wider",
									children: placedOrderId
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Status:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full text-[10px] uppercase",
									children: "Pending Confirmation"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Payment:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground",
									children: paymentMethod
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between border-t border-border pt-1 font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Amount:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-primary font-display text-sm",
									children: ["₹", placedTotal]
								})]
							})
						]
					}),
					placedWhatsappUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "w-full h-12 rounded-full bg-whatsapp hover:bg-whatsapp/90 text-sm gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: placedWhatsappUrl,
							target: "_blank",
							rel: "noreferrer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), " Send Confirmation on WhatsApp"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-muted-foreground leading-relaxed",
						children: [
							"Keep your Order ID ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: placedOrderId }),
							" handy to track live delivery progress using the \"Track Order\" button."
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				className: "w-full rounded-full",
				onClick: handleClose,
				children: "Done & Continue Browsing"
			})]
		}) : step === "checkout" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleCheckoutSubmit,
			className: "flex-1 flex flex-col justify-between overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto p-6 space-y-4 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "font-bold text-foreground block mb-1",
						children: "Full Name *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						required: true,
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "e.g. Priya Sharma",
						className: "w-full h-10 rounded-md border border-border bg-card px-3 text-xs outline-none focus:border-primary"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold text-foreground block mb-1",
							children: "Phone Number *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "tel",
							required: true,
							value: phone,
							onChange: (e) => setPhone(e.target.value),
							placeholder: "e.g. 9876543210",
							className: "w-full h-10 rounded-md border border-border bg-card px-3 text-xs outline-none focus:border-primary"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold text-foreground block mb-1",
							children: "Email (Optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							placeholder: "priya@example.com",
							className: "w-full h-10 rounded-md border border-border bg-card px-3 text-xs outline-none focus:border-primary"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "font-bold text-foreground block mb-1",
						children: "Delivery Address *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						required: true,
						rows: 2,
						value: address,
						onChange: (e) => setAddress(e.target.value),
						placeholder: "House/Flat No., Street, Landmark",
						className: "w-full rounded-md border border-border bg-card p-2.5 text-xs outline-none focus:border-primary"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold text-foreground block mb-1",
							children: "City"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: city,
							onChange: (e) => setCity(e.target.value),
							placeholder: "e.g. Kolkata / Mumbai",
							className: "w-full h-10 rounded-md border border-border bg-card px-3 text-xs outline-none focus:border-primary"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold text-foreground block mb-1",
							children: "PIN Code"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: pincode,
							onChange: (e) => setPincode(e.target.value),
							placeholder: "e.g. 700073",
							className: "w-full h-10 rounded-md border border-border bg-card px-3 text-xs outline-none focus:border-primary"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "font-bold text-foreground block mb-1",
						children: "Payment Method"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [
							"Cash on Delivery",
							"UPI / QR Pay",
							"WhatsApp Order"
						].map((method) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setPaymentMethod(method),
							className: cn("p-2.5 rounded-lg border text-left font-semibold transition text-[11px]", paymentMethod === method ? "border-primary bg-secondary text-primary" : "border-border bg-card text-muted-foreground"),
							children: method
						}, method))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "font-bold text-foreground block mb-1",
						children: "Special Delivery Notes (Optional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: notes,
						onChange: (e) => setNotes(e.target.value),
						placeholder: "e.g. Please wrap with a gift note",
						className: "w-full h-9 rounded-md border border-border bg-card px-3 text-xs outline-none focus:border-primary"
					})] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border bg-secondary/30 p-5 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Items Total (",
								cartBooks.length,
								"):"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", subtotal] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Shipping:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: deliveryFee === 0 ? "FREE" : `₹${deliveryFee}` })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between font-display text-base font-bold text-foreground border-t border-border pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Payable Amount:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-primary text-xl",
								children: ["₹", total]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: submitting,
					className: "h-12 w-full rounded-full font-bold",
					children: submitting ? "Processing Order..." : `Place Order (₹${total})`
				})]
			})]
		}) : cartBooks.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 py-2.5 bg-secondary/50 border-b border-border text-xs flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-[11px] font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-3.5 w-3.5" }), awayFromFreeDelivery === 0 ? "You unlocked FREE Pan-India delivery!" : `Add ₹${awayFromFreeDelivery} more for FREE delivery`]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground",
						children: [deliveryProgress, "%"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1.5 w-full bg-border rounded-full overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-primary transition-all duration-300",
						style: { width: `${deliveryProgress}%` }
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 space-y-4 overflow-y-auto p-6",
				children: cartBooks.map((book) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[64px_minmax(0,1fr)] gap-4 border-b border-border/50 pb-4 last:border-b-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("grid aspect-[3/4] place-items-center rounded-sm p-2 text-center font-display text-xs text-primary-foreground", book.cover),
						children: book.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[minmax(0,1fr)_auto] gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-display text-base font-semibold",
									children: book.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: ["₹", book.price]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "h-7 w-7 text-muted-foreground hover:text-destructive",
								onClick: () => changeQuantity(book.id, -(cart[book.id] ?? 0)),
								"aria-label": `Remove ${book.title}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "icon",
										className: "h-7 w-7 rounded-full",
										onClick: () => changeQuantity(book.id, -1),
										"aria-label": "Decrease quantity",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-7 text-center text-xs font-bold",
										children: cart[book.id]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "icon",
										className: "h-7 w-7 rounded-full",
										onClick: () => changeQuantity(book.id, 1),
										"aria-label": "Increase quantity",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-xs text-primary",
								children: ["₹", book.price * (cart[book.id] ?? 1)]
							})]
						})]
					})]
				}, book.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border bg-secondary/30 p-6 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-foreground",
									children: ["₹", subtotal]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between pt-1 border-t border-border font-bold text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Amount" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "font-display text-2xl text-primary",
									children: ["₹", total]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "h-12 w-full rounded-full gap-2 font-bold",
						onClick: () => setStep("checkout"),
						children: ["Proceed to Checkout ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "h-11 w-full rounded-full border-whatsapp/40 text-whatsapp hover:bg-whatsapp hover:text-white transition gap-2 text-xs font-bold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: orderUrl,
							target: "_blank",
							rel: "noreferrer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), " Order Directly on WhatsApp"]
						})
					})
				]
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid flex-1 place-items-center p-8 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "mx-auto h-12 w-12 text-muted-foreground opacity-60" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-display text-2xl font-bold",
					children: "Your bag is empty"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: "Browse our curated collection and add books to start reading."
				})
			] })
		})]
	});
}
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog$1, {
		open,
		onOpenChange,
		children: [trigger && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger$1, {
			asChild: true,
			children: trigger
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
			className: "max-h-[90vh] overflow-y-auto sm:max-w-xl p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				className: "p-6 pb-4 border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle$1, {
					className: "font-display text-2xl text-primary flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-6 w-6 text-primary" }), " Track Your Book Order"]
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
									className: "font-display text-2xl font-bold text-primary",
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
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function StoreManagerModal({ open, onOpenChange, trigger }) {
	const { refreshCatalog } = useCart();
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [contacts, setContacts] = (0, import_react.useState)([]);
	const [loadingOrders, setLoadingOrders] = (0, import_react.useState)(false);
	const [loadingContacts, setLoadingContacts] = (0, import_react.useState)(false);
	const [newTitle, setNewTitle] = (0, import_react.useState)("");
	const [newAuthor, setNewAuthor] = (0, import_react.useState)("");
	const [newCategory, setNewCategory] = (0, import_react.useState)("Fiction");
	const [newPrice, setNewPrice] = (0, import_react.useState)("");
	const [newOldPrice, setNewOldPrice] = (0, import_react.useState)("");
	const [newCover, setNewCover] = (0, import_react.useState)("bg-primary");
	const [newLabel, setNewLabel] = (0, import_react.useState)("");
	const [newDescription, setNewDescription] = (0, import_react.useState)("");
	const [addingBook, setAddingBook] = (0, import_react.useState)(false);
	const loadOrders = async () => {
		setLoadingOrders(true);
		try {
			const data = await api.getAllOrders();
			setOrders(data);
		} catch {
			toast.error("Failed to load orders from backend.");
		} finally {
			setLoadingOrders(false);
		}
	};
	const loadContacts = async () => {
		setLoadingContacts(true);
		try {
			const data = await api.getContacts();
			if (data) setContacts(data);
		} catch {} finally {
			setLoadingContacts(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (open) {
			loadOrders();
			loadContacts();
		}
	}, [open]);
	const handleStatusChange = async (orderId, newStatus) => {
		try {
			await api.updateOrderStatus(orderId, newStatus);
			toast.success(`Order #${orderId} set to ${newStatus}`);
			setOrders((prev) => prev.map((o) => o.id === orderId ? {
				...o,
				status: newStatus
			} : o));
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to update status");
		}
	};
	const handleCreateBook = async (e) => {
		e.preventDefault();
		if (!newTitle.trim() || !newAuthor.trim() || !newPrice) {
			toast.error("Title, Author, and Price are required.");
			return;
		}
		setAddingBook(true);
		try {
			await api.createBook({
				title: newTitle.trim(),
				author: newAuthor.trim(),
				category: newCategory,
				price: parseFloat(newPrice),
				oldPrice: newOldPrice ? parseFloat(newOldPrice) : void 0,
				cover: newCover,
				label: newLabel.trim() || void 0,
				description: newDescription.trim() || void 0
			});
			toast.success(`"${newTitle}" added to store inventory!`);
			setNewTitle("");
			setNewAuthor("");
			setNewPrice("");
			setNewOldPrice("");
			setNewLabel("");
			setNewDescription("");
			await refreshCatalog();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to add book");
		} finally {
			setAddingBook(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog$1, {
		open,
		onOpenChange,
		children: [trigger && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger$1, {
			asChild: true,
			children: trigger
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
			className: "max-h-[90vh] overflow-y-auto sm:max-w-3xl p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				className: "p-6 pb-4 border-b border-border flex flex-row items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle$1, {
					className: "font-display text-2xl text-primary flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-6 w-6 text-primary" }), " Store Management Console"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "orders",
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid grid-cols-3 bg-secondary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "orders",
									className: "gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }),
										" Live Orders (",
										orders.length,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "add-book",
									className: "gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookPlus, { className: "h-4 w-4" }), " Add New Book"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "messages",
									className: "gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4" }),
										" Inquiries (",
										contacts.length,
										")"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "orders",
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Manage customer book bookings and fulfillment status."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: loadOrders,
									disabled: loadingOrders,
									className: "h-8 gap-1 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("h-3.5 w-3.5", loadingOrders && "animate-spin") }), " Refresh"]
								})]
							}), loadingOrders ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "py-12 text-center text-xs text-muted-foreground",
								children: "Loading orders from backend..."
							}) : orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "py-12 text-center rounded-lg border border-dashed border-border p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-8 w-8 mx-auto text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm font-semibold",
										children: "No orders yet"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Orders placed by customers will appear here in real-time."
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border bg-card p-4 space-y-3 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-display text-base font-bold text-primary",
													children: order.id
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-muted-foreground",
													children: ["• ", order.createdAt]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-muted-foreground",
													children: "Status:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: order.status,
													onChange: (e) => handleStatusChange(order.id, e.target.value),
													className: cn("h-7 rounded-md px-2 font-bold text-xs border border-border cursor-pointer outline-none", order.status === "delivered" ? "bg-emerald-50 text-emerald-800" : order.status === "dispatched" ? "bg-blue-50 text-blue-800" : order.status === "confirmed" ? "bg-amber-50 text-amber-800" : order.status === "cancelled" ? "bg-red-50 text-red-800" : "bg-orange-50 text-orange-800"),
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "pending",
															children: "Pending"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "confirmed",
															children: "Confirmed"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "dispatched",
															children: "Dispatched"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "delivered",
															children: "Delivered"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "cancelled",
															children: "Cancelled"
														})
													]
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid sm:grid-cols-2 gap-3 text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground",
													children: order.customerName
												}),
												" (",
												order.customerPhone,
												")",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[11px]",
													children: [
														order.deliveryAddress,
														order.city ? `, ${order.city}` : "",
														order.pincode ? ` - ${order.pincode}` : ""
													]
												})
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-right sm:text-right",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Payment: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground",
													children: order.paymentMethod
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-foreground font-bold text-sm",
													children: ["Total: ₹", order.total]
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-secondary/40 rounded p-2 text-[11px] text-muted-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Items:" }),
												" ",
												order.items.map((i) => `${i.title} (x${i.quantity})`).join(", ")
											]
										})
									]
								}, order.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "add-book",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleCreateBook,
								className: "rounded-lg border border-border bg-card p-5 space-y-4 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Add a new book title directly into the SQLite database. It will instantly appear on the store catalog."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid sm:grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "font-bold text-foreground block mb-1",
											children: "Book Title *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											required: true,
											placeholder: "e.g. Beyond the Far Mountains",
											value: newTitle,
											onChange: (e) => setNewTitle(e.target.value),
											className: "w-full h-9 rounded-md border border-border bg-background px-3 outline-none focus:border-primary"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "font-bold text-foreground block mb-1",
											children: "Author Name *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											required: true,
											placeholder: "e.g. Arundhati Sharma",
											value: newAuthor,
											onChange: (e) => setNewAuthor(e.target.value),
											className: "w-full h-9 rounded-md border border-border bg-background px-3 outline-none focus:border-primary"
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-3 gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "font-bold text-foreground block mb-1",
												children: "Category"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												value: newCategory,
												onChange: (e) => setNewCategory(e.target.value),
												className: "w-full h-9 rounded-md border border-border bg-background px-2 outline-none focus:border-primary",
												children: categories.filter((c) => c !== "All").map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: cat,
													children: cat
												}, cat))
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "font-bold text-foreground block mb-1",
												children: "Price (₹) *"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												placeholder: "399",
												value: newPrice,
												onChange: (e) => setNewPrice(e.target.value),
												className: "w-full h-9 rounded-md border border-border bg-background px-3 outline-none focus:border-primary"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "font-bold text-foreground block mb-1",
												children: "Original Price (₹)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												placeholder: "499",
												value: newOldPrice,
												onChange: (e) => setNewOldPrice(e.target.value),
												className: "w-full h-9 rounded-md border border-border bg-background px-3 outline-none focus:border-primary"
											})] })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid sm:grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "font-bold text-foreground block mb-1",
											children: "Cover Aesthetic"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: newCover,
											onChange: (e) => setNewCover(e.target.value),
											className: "w-full h-9 rounded-md border border-border bg-background px-2 outline-none focus:border-primary",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "bg-primary",
													children: "Deep Maroon (Primary)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "bg-maroon-soft",
													children: "Soft Crimson"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "bg-gold",
													children: "Amber Gold"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "bg-foreground",
													children: "Charcoal Midnight"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "bg-whatsapp",
													children: "Emerald Green"
												})
											]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "font-bold text-foreground block mb-1",
											children: "Badge / Label (Optional)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "e.g. New Release / Bestseller",
											value: newLabel,
											onChange: (e) => setNewLabel(e.target.value),
											className: "w-full h-9 rounded-md border border-border bg-background px-3 outline-none focus:border-primary"
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold text-foreground block mb-1",
										children: "Synopsis / Description"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 3,
										placeholder: "Short description of the book...",
										value: newDescription,
										onChange: (e) => setNewDescription(e.target.value),
										className: "w-full rounded-md border border-border bg-background p-2.5 outline-none focus:border-primary"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											disabled: addingBook,
											className: "h-10 rounded-full px-7 text-xs",
											children: addingBook ? "Saving to Database..." : "Add Book to Inventory"
										})
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "messages",
							className: "space-y-3",
							children: loadingContacts ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "py-12 text-center text-xs text-muted-foreground",
								children: "Loading inquiries..."
							}) : contacts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "py-12 text-center text-xs text-muted-foreground",
								children: "No customer inquiries yet."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: contacts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border bg-card p-4 space-y-1.5 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between font-bold text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												c.name,
												" ",
												c.phone && `(${c.phone})`
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground text-[10px]",
												children: c.created_at
											})]
										}),
										c.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground text-[11px]",
											children: c.email
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "bg-secondary/40 rounded p-2.5 text-foreground leading-relaxed",
											children: c.message
										})
									]
								}, c.id))
							})
						})
					]
				})
			})]
		})]
	});
}
var navLinks = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/shop",
		label: "Shop"
	},
	{
		to: "/about",
		label: "About Us"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function SiteHeader() {
	const { cartCount, cartOpen, setCartOpen } = useCart();
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [trackerOpen, setTrackerOpen] = (0, import_react.useState)(false);
	const [managerOpen, setManagerOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-primary px-4 py-2 text-center text-xs font-semibold text-primary-foreground sm:text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Free delivery on orders above ₹799" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-2 opacity-50",
					children: "•"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Order directly online or via WhatsApp" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-2 hidden opacity-50 sm:inline",
					children: "•"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-1 flex items-center justify-center gap-1.5 sm:mt-0 sm:inline-flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3 w-3" }),
						" ",
						STORE.phone
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex min-w-0 items-center gap-3",
						"aria-label": "Success Book Hub home",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "block truncate font-display text-lg text-primary sm:text-xl font-bold",
								children: STORE.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
								children: STORE.tagline
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center gap-1 lg:flex",
						"aria-label": "Main navigation",
						children: navLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: link.to,
							activeOptions: { exact: link.to === "/" },
							className: "rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:text-primary",
							activeProps: { className: "bg-secondary text-primary hover:text-primary" },
							children: link.label
						}, link.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => setTrackerOpen(true),
								className: "hidden sm:inline-flex rounded-full gap-1.5 text-xs text-muted-foreground hover:text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }), " Track Order"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								className: "hidden md:inline-flex rounded-full gap-1.5 text-xs border-primary/20 text-primary hover:bg-secondary",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/admin",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), " Store Admin"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
								open: cartOpen,
								onOpenChange: setCartOpen,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										className: "relative h-10 rounded-full px-4 font-semibold",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden sm:inline ml-1.5",
												children: "My Bag"
											}),
											cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground font-bold",
												children: cartCount
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartSheet, {})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "lg:hidden",
								onClick: () => setMenuOpen((open) => !open),
								"aria-label": "Toggle menu",
								children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
							})
						]
					})
				]
			}), menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "border-t border-border px-4 py-3 lg:hidden space-y-1",
				"aria-label": "Mobile navigation",
				children: [navLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: link.to,
					activeOptions: { exact: link.to === "/" },
					onClick: () => setMenuOpen(false),
					className: "block rounded-md px-3 py-2.5 text-sm font-semibold text-muted-foreground",
					activeProps: { className: "bg-secondary text-primary font-bold" },
					children: link.label
				}, link.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-2 border-t border-border/60 flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setMenuOpen(false);
							setTrackerOpen(true);
						},
						className: "flex items-center gap-2 px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-primary rounded-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }), " Track Book Order"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin",
						onClick: () => setMenuOpen(false),
						className: "flex items-center gap-2 px-3 py-2 text-sm font-semibold text-primary rounded-md bg-secondary/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }), " Store Admin Portal"]
					})]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderTrackerModal, {
			open: trackerOpen,
			onOpenChange: setTrackerOpen
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreManagerModal, {
			open: managerOpen,
			onOpenChange: setManagerOpen
		})
	] });
}
function SiteFooter() {
	const [newsletterEmail, setNewsletterEmail] = (0, import_react.useState)("");
	const [subscribing, setSubscribing] = (0, import_react.useState)(false);
	const [subscribed, setSubscribed] = (0, import_react.useState)(false);
	const handleNewsletter = async (e) => {
		e.preventDefault();
		if (!newsletterEmail.trim()) return;
		setSubscribing(true);
		try {
			const res = await api.subscribeNewsletter(newsletterEmail.trim());
			setSubscribed(true);
			toast.success(res.message || "Thank you for subscribing!");
			setNewsletterEmail("");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to subscribe");
		} finally {
			setSubscribing(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-foreground text-primary-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-primary-foreground/10 bg-primary/20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl sm:text-2xl font-bold",
						children: "Join the Readers' Circle"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-primary-foreground/75 mt-1",
						children: "Get monthly curated reading lists, author spotlights, and secret flash deals."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
						onSubmit: handleNewsletter,
						className: "w-full md:w-auto flex max-w-md gap-2",
						children: subscribed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-4 py-2.5 rounded-full border border-emerald-800",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), " You're on our reading list!"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							required: true,
							placeholder: "Enter your email address",
							value: newsletterEmail,
							onChange: (e) => setNewsletterEmail(e.target.value),
							className: "h-11 rounded-full bg-background/10 border border-primary-foreground/20 px-4 text-xs text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:border-primary-foreground min-w-[240px] flex-1"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							disabled: subscribing,
							className: "h-11 rounded-full px-5 text-xs font-bold gap-1.5 shrink-0 bg-gold text-foreground hover:bg-gold/90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3.5 w-3.5" }), subscribing ? "Joining..." : "Subscribe"]
						})] })
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2.5 font-display text-2xl font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-9 w-9 place-items-center rounded-full bg-primary-foreground text-primary shadow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4" })
						}), STORE.name]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-6 opacity-75",
						children: "Stories that stay with you. Thoughtfully curated literature, academic essentials, and bestselling collections delivered right to your doorstep across India."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-bold uppercase tracking-wider opacity-60",
						children: "Quick Links"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-2.5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "opacity-80 transition hover:opacity-100",
								children: "Home"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "opacity-80 transition hover:opacity-100",
								children: "Shop All Books"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/about",
								className: "opacity-80 transition hover:opacity-100",
								children: "Our Story & Ethos"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "opacity-80 transition hover:opacity-100",
								children: "Contact & Visit"
							}) })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-bold uppercase tracking-wider opacity-60",
						children: "Genres & Shelves"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2.5 text-sm",
						children: categories.filter((c) => c !== "All").map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: { category: c },
							className: "opacity-80 transition hover:opacity-100",
							children: c
						}) }, c))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-bold uppercase tracking-wider opacity-60",
							children: "Visit or Call Us"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 opacity-70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "opacity-80 leading-snug",
										children: STORE.address
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "mt-0.5 h-4 w-4 shrink-0 opacity-70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "opacity-80",
										children: STORE.phone
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "mt-0.5 h-4 w-4 shrink-0 opacity-70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "opacity-80",
										children: STORE.email
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mt-0.5 h-4 w-4 shrink-0 opacity-70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "opacity-80",
										children: STORE.hours
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `https://wa.me/${WHATSAPP_NUMBER}`,
							target: "_blank",
							rel: "noreferrer",
							className: "mt-5 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-xs font-bold text-primary-foreground transition hover:bg-whatsapp/90 shadow-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), " WhatsApp Us Anytime"]
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-primary-foreground/15 px-4 py-5 text-center text-xs opacity-60",
				children: [
					"© 2026 ",
					STORE.name,
					" · Curated Books Delivered Pan-India · Powered by Node.js & Express API"
				]
			})
		]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground font-display",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 shadow-sm",
						children: "Back to Home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground font-display",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$3 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Success Book Hub — Curated Books & Timeless Stories" },
			{
				name: "description",
				content: "Browse fiction, classics, poetry, self-help, and academic books. Order online or on WhatsApp with fast Pan-India delivery."
			},
			{
				name: "author",
				content: "Success Book Hub"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "alternate icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$3.useRouteContext();
	const isAdmin = useRouterState().location.pathname.startsWith("/admin");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [
			!isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			!isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				richColors: true,
				position: "top-right",
				closeButton: true
			})
		] })
	});
}
var $$splitComponentImporter$2 = () => import("./routes-CuYzSLce.mjs");
var Route$2 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Success Book Hub — Curated Books & Timeless Stories" },
		{
			name: "description",
			content: "Browse fiction, classics, poetry, non-fiction, children's and self-help books. Fast delivery across India, order online or via WhatsApp."
		},
		{
			property: "og:title",
			content: "Success Book Hub — Books worth keeping"
		},
		{
			property: "og:description",
			content: "A thoughtfully curated online bookstore with direct checkout & WhatsApp ordering."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./about-9Z0r7lNx.mjs");
var Route$1 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About Us — Success Book Hub" },
		{
			name: "description",
			content: "A dedicated independent bookstore in Kolkata, sending thoughtfully chosen books across India."
		},
		{
			property: "og:title",
			content: "About Us — Success Book Hub"
		},
		{
			property: "og:description",
			content: "Our story, our shelves, and how we deliver books across India."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./contact-DuMLXV1_.mjs");
var Route = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact Us — Success Book Hub" },
		{
			name: "description",
			content: "Find our Kolkata bookstore, call us, or message us on WhatsApp. We assist every book lover."
		},
		{
			property: "og:title",
			content: "Contact Us — Success Book Hub"
		},
		{
			property: "og:description",
			content: "Address, phone, WhatsApp and opening hours for Success Book Hub."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	AboutRoute: Route$1.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$3
	}),
	AdminRoute: Route$4.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$3
	}),
	ContactRoute: Route.update({
		id: "/contact",
		path: "/contact",
		getParentRoute: () => Route$3
	}),
	ShopRoute: Route$5.update({
		id: "/shop",
		path: "/shop",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
