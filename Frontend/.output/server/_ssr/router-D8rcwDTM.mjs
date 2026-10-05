import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { i as api, n as STORE, o as categories, r as WHATSAPP_NUMBER, s as cn, t as Button } from "./button-XQbb4kXE.mjs";
import { n as useCart, t as CartProvider } from "./cart-BmXw_5sw.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as Clock, A as Minus, C as Phone, F as Mail, I as LogOut, J as FileText, M as MessageCircle, N as Menu, P as MapPin, Q as CreditCard, S as Plus, U as Heart, _ as Send, a as Truck, at as ChevronDown, b as QrCode, c as Trash2, ct as BookPlus, dt as Banknote, f as ShoppingBag, g as Settings, it as ChevronRight, j as MessageSquare, k as Package, lt as BookOpen, m as ShieldCheck, mt as ArrowLeft, nt as CircleCheck, pt as ArrowRight, r as User, rt as CircleAlert, t as X, tt as CirclePlus, u as Sparkles, v as Search, y as RefreshCw } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as DialogTitle$1, c as WishlistProvider, i as DialogHeader, l as useUserAuth, n as DialogContent$1, o as DialogTrigger$1, r as DialogDescription$1, s as UserAuthProvider, t as Dialog$1, u as useWishlist } from "./dialog-CLaD6TXM.mjs";
import { n as TaxInvoiceModal, t as Route$5 } from "./account-C3gtMJpm.mjs";
import { n as useAdminAuth, t as AuthProvider } from "./auth-DLAu8YU6.mjs";
import { a as DropdownMenuSeparator, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, s as Route$6, t as DropdownMenu } from "./admin-DtA3FEI9.mjs";
import { t as Route$7 } from "./shop-DX0XaVyY.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D8rcwDTM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-B5ogrJB-.css";
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
	const { cartBooks, cartCount, subtotal, mrpTotal, savingsTotal, savingsPercent, deliveryFee, freeDeliveryThreshold, awayFromFreeDelivery, freeDeliveryProgress, total, changeQuantity, clearCart, setCartOpen } = useCart();
	const { user, token, isAuthenticated, openLoginModal } = useUserAuth();
	const [step, setStep] = (0, import_react.useState)("cart");
	const [savedAddresses, setSavedAddresses] = (0, import_react.useState)([]);
	const [selectedAddressId, setSelectedAddressId] = (0, import_react.useState)(null);
	const [showNewAddressForm, setShowNewAddressForm] = (0, import_react.useState)(false);
	const [loadingAddresses, setLoadingAddresses] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [flatHouse, setFlatHouse] = (0, import_react.useState)("");
	const [areaStreet, setAreaStreet] = (0, import_react.useState)("");
	const [landmark, setLandmark] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [state, setState] = (0, import_react.useState)("Telangana");
	const [pincode, setPincode] = (0, import_react.useState)("");
	const [addressType, setAddressType] = (0, import_react.useState)("Home");
	const [saveAsDefault, setSaveAsDefault] = (0, import_react.useState)(true);
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("UPI / QR Code");
	const [orderNotes, setOrderNotes] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [placedOrderId, setPlacedOrderId] = (0, import_react.useState)(null);
	const [placedWhatsappUrl, setPlacedWhatsappUrl] = (0, import_react.useState)(null);
	const [invoiceModalOpen, setInvoiceModalOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isAuthenticated && token) {
			if (user) {
				setName(user.name || "");
				setPhone(user.phone || "");
				setEmail(user.email || "");
			}
			setLoadingAddresses(true);
			api.getUserAddresses(token).then((addresses) => {
				setSavedAddresses(addresses);
				if (addresses.length > 0) {
					const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
					setSelectedAddressId(defaultAddr.id);
					setShowNewAddressForm(false);
				} else setShowNewAddressForm(true);
			}).catch(() => {}).finally(() => setLoadingAddresses(false));
		} else {
			setSavedAddresses([]);
			setSelectedAddressId(null);
			setShowNewAddressForm(true);
		}
	}, [
		isAuthenticated,
		token,
		user
	]);
	const handleProceedToAddress = () => {
		if (cartBooks.length === 0) return;
		setStep("address");
	};
	const handleProceedToPayment = async (e) => {
		e.preventDefault();
		if (selectedAddressId && !showNewAddressForm) {
			const selected = savedAddresses.find((a) => a.id === selectedAddressId);
			if (selected) {
				setName(selected.fullName);
				setPhone(selected.phone);
				setFlatHouse(selected.flatHouse);
				setAreaStreet(selected.areaStreet);
				setLandmark(selected.landmark || "");
				setCity(selected.city);
				setState(selected.state);
				setPincode(selected.pincode);
				setAddressType(selected.addressType);
				setStep("payment");
				return;
			}
		}
		if (!name.trim() || !phone.trim() || !flatHouse.trim() || !areaStreet.trim() || !city.trim() || !pincode.trim()) {
			toast.error("Please fill in all required address fields (Name, Phone, House/Flat, Street, City, Pincode).");
			return;
		}
		if (isAuthenticated && token && showNewAddressForm) try {
			const newAddr = await api.addUserAddress(token, {
				fullName: name.trim(),
				phone: phone.trim(),
				flatHouse: flatHouse.trim(),
				areaStreet: areaStreet.trim(),
				landmark: landmark.trim(),
				city: city.trim(),
				state: state.trim(),
				pincode: pincode.trim(),
				addressType,
				isDefault: saveAsDefault
			});
			setSavedAddresses((prev) => [newAddr, ...prev]);
			setSelectedAddressId(newAddr.id);
		} catch {}
		setStep("payment");
	};
	const handlePlaceOrder = async () => {
		setSubmitting(true);
		try {
			const itemsPayload = cartBooks.map((b) => ({
				id: b.id,
				title: b.title,
				author: b.author,
				price: b.price,
				mrp: b.mrp || b.old_price || b.oldPrice || b.price,
				quantity: b.quantity
			}));
			const fullAddressText = `${flatHouse}, ${areaStreet}${landmark ? `, Near ${landmark}` : ""}, ${city}, ${state} - ${pincode}`;
			const res = await api.createOrder({
				customerName: name.trim(),
				customerPhone: phone.trim(),
				customerEmail: email.trim() || user?.email || "",
				deliveryAddress: fullAddressText,
				city: city.trim(),
				pincode: pincode.trim(),
				items: itemsPayload,
				subtotal,
				deliveryFee,
				paymentMethod,
				orderNotes: orderNotes.trim()
			});
			setPlacedOrderId(res.orderId);
			setPlacedWhatsappUrl(res.whatsappUrl);
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
	const getStepTitle = () => {
		switch (step) {
			case "address": return "Select Delivery Address";
			case "payment": return "Select Payment Method";
			case "success": return "Order Confirmed!";
			default: return `Your Book Bag (${cartCount})`;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
		className: "flex w-[96vw] max-w-lg flex-col p-0 bg-background border-border shadow-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				className: "border-b border-border p-5 pr-12 text-left bg-secondary/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
					className: "font-display text-xl font-bold flex items-center gap-2",
					children: [step !== "cart" && step !== "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setStep(step === "payment" ? "address" : "cart"),
						className: "p-1 rounded-full hover:bg-secondary transition mr-1",
						"aria-label": "Back",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" })
					}), getStepTitle()]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
					className: "text-xs text-muted-foreground",
					children: step === "success" ? "Your order has been recorded and is being prepared" : step === "payment" ? "Choose how you'd like to pay for your books" : step === "address" ? "Enter or choose where you want your books delivered" : "Review your items, calculate total cost, and proceed"
				})]
			}),
			step === "cart" && cartBooks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-amber-500/10 border-b border-amber-500/20 px-5 py-2.5 flex items-center justify-between text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-amber-900 dark:text-amber-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4 text-amber-600" }), awayFromFreeDelivery === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-emerald-600",
						children: "🎉 Congratulations! You unlocked FREE Pan-India Delivery!"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Add ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
							className: "font-bold",
							children: ["₹", awayFromFreeDelivery]
						}),
						" more for ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-primary font-bold",
							children: "FREE Delivery"
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[10px] font-bold text-muted-foreground",
					children: [freeDeliveryProgress, "%"]
				})]
			}),
			step === "cart" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: cartBooks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col items-center justify-center p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-full bg-secondary/60 p-6 text-muted-foreground mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-10 w-10 stroke-[1.5]" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl font-medium",
						children: "Your Bag is Empty"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground max-w-xs leading-relaxed",
						children: "Explore our curated collection of books and add timeless reads to your bag!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handleClose,
						className: "mt-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 text-xs font-semibold",
						children: "Start Browsing"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto p-5 space-y-3.5",
				children: cartBooks.map((book) => {
					const itemMrp = Number(book.mrp || book.old_price || book.oldPrice || book.price);
					const itemSavings = Math.max(0, itemMrp - book.price);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3.5 p-3 rounded-xl border border-border bg-card/60 hover:bg-card transition shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-16 h-22 flex-shrink-0 overflow-hidden rounded-lg bg-secondary/30 border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: book.cover || book.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
								alt: book.title,
								className: "h-full w-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 flex flex-col justify-between min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								book.sub_category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-primary uppercase tracking-wider block truncate",
									children: book.sub_category
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-display text-sm font-bold text-foreground truncate",
									children: book.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-muted-foreground truncate",
									children: ["by ", book.author]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline gap-2 mt-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-sm text-primary",
											children: ["₹", book.price]
										}),
										itemMrp > book.price && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11px] text-muted-foreground line-through",
											children: ["₹", itemMrp]
										}),
										itemSavings > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded",
											children: ["Save ₹", itemSavings * book.quantity]
										})
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between pt-2 border-t border-border/40 mt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 bg-secondary/80 rounded-lg p-0.5 border border-border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => changeQuantity(book.id, -1, book),
											className: "p-1 rounded hover:bg-background transition text-muted-foreground hover:text-foreground",
											"aria-label": "Decrease quantity",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-6 text-center text-xs font-bold font-mono",
											children: book.quantity
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => changeQuantity(book.id, 1, book),
											className: "p-1 rounded hover:bg-background transition text-muted-foreground hover:text-foreground",
											"aria-label": "Increase quantity",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold text-xs text-foreground font-mono",
									children: ["₹", book.price * book.quantity]
								})]
							})]
						})]
					}, book.id);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border bg-card/90 p-5 space-y-3",
				children: [
					savingsTotal > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-2.5 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-emerald-600" }), "Total Savings on this Order:"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-bold",
							children: [
								"₹",
								savingsTotal,
								" (",
								savingsPercent,
								"% OFF)"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total MRP:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "line-through",
									children: ["₹", mrpTotal]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Bag Subtotal:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold",
									children: ["₹", subtotal]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Estimated Delivery:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: deliveryFee === 0 ? "text-emerald-600 font-bold" : "font-semibold",
									children: deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-border pt-2 flex justify-between font-bold text-base text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Final Payable Total:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-primary font-mono text-lg",
									children: ["₹", total]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: handleProceedToAddress,
						className: "w-full rounded-xl py-6 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition flex items-center justify-center gap-2",
						children: [
							"Proceed to Buy (",
							cartCount,
							" ",
							cartCount === 1 ? "Book" : "Books",
							")",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
						]
					})
				]
			})] }) }),
			step === "address" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto p-5 space-y-4",
				children: [
					!isAuthenticated && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-primary/5 border border-primary/20 rounded-xl p-3.5 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs font-bold text-primary flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5" }), "Have an account?"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground mt-0.5",
							children: "Sign in with OTP to use your saved addresses."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: openLoginModal,
							className: "rounded-lg text-xs font-semibold h-8",
							children: "Sign In"
						})]
					}),
					isAuthenticated && savedAddresses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Saved Delivery Addresses" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setShowNewAddressForm(!showNewAddressForm),
								className: "text-primary hover:underline text-xs lowercase font-medium flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "h-3.5 w-3.5" }), showNewAddressForm ? "Use saved" : "+ Add new"]
							})]
						}), !showNewAddressForm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: savedAddresses.map((addr) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: cn("block p-3.5 rounded-xl border transition cursor-pointer relative", selectedAddressId === addr.id ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-card hover:bg-secondary/40"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "delivery_address",
										checked: selectedAddressId === addr.id,
										onChange: () => setSelectedAddressId(addr.id),
										className: "mt-1 text-primary focus:ring-primary h-4 w-4"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-bold text-foreground text-sm",
														children: addr.fullName
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "bg-secondary px-2 py-0.5 rounded text-[10px] font-semibold text-muted-foreground",
														children: addr.addressType
													}),
													addr.isDefault && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded",
														children: "Default"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-muted-foreground mt-1 leading-relaxed",
												children: addr.formattedAddress || `${addr.flatHouse}, ${addr.areaStreet}, ${addr.city}, ${addr.state} - ${addr.pincode}`
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-muted-foreground mt-1 font-medium",
												children: ["Phone: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-foreground",
													children: addr.phone
												})]
											})
										]
									})]
								})
							}, addr.id))
						})]
					}),
					(showNewAddressForm || savedAddresses.length === 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleProceedToPayment,
						className: "space-y-3.5 bg-card border border-border p-4 rounded-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5 pb-2 border-b border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary" }), "Enter Delivery Address"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-semibold text-muted-foreground mb-1",
									children: "Full Name *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: name,
									onChange: (e) => setName(e.target.value),
									placeholder: "e.g. Rahul Sharma",
									className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-semibold text-muted-foreground mb-1",
									children: "Mobile Number *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "tel",
									required: true,
									value: phone,
									onChange: (e) => setPhone(e.target.value),
									placeholder: "10-digit phone",
									className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-semibold text-muted-foreground mb-1",
								children: "Email Address (for Tax Invoice)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "name@gmail.com",
								className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-semibold text-muted-foreground mb-1",
								children: "Flat, House No., Building, Apartment *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: flatHouse,
								onChange: (e) => setFlatHouse(e.target.value),
								placeholder: "e.g. Flat 402, Sai Residency",
								className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-semibold text-muted-foreground mb-1",
								children: "Area, Street, Sector, Village *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: areaStreet,
								onChange: (e) => setAreaStreet(e.target.value),
								placeholder: "e.g. Road No 12, Banjara Hills",
								className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] font-semibold text-muted-foreground mb-1",
										children: "Landmark"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: landmark,
										onChange: (e) => setLandmark(e.target.value),
										placeholder: "Near Water Tank",
										className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] font-semibold text-muted-foreground mb-1",
										children: "Town / City *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										value: city,
										onChange: (e) => setCity(e.target.value),
										placeholder: "Hyderabad",
										className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] font-semibold text-muted-foreground mb-1",
										children: "Pincode *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										value: pincode,
										onChange: (e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6)),
										placeholder: "500034",
										className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none font-mono"
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-semibold text-muted-foreground",
										children: "Type:"
									}), [
										"Home",
										"Work",
										"Other"
									].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setAddressType(t),
										className: cn("px-2.5 py-1 rounded text-xs font-semibold border transition", addressType === t ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-muted-foreground border-border hover:bg-secondary/80"),
										children: t
									}, t))]
								}), isAuthenticated && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: saveAsDefault,
										onChange: (e) => setSaveAsDefault(e.target.checked),
										className: "rounded text-primary focus:ring-primary h-3.5 w-3.5"
									}), "Make default"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full rounded-xl py-5 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow transition mt-3",
								children: "Deliver to this Address"
							})
						]
					}),
					!showNewAddressForm && savedAddresses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: handleProceedToPayment,
						className: "w-full rounded-xl py-6 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition flex items-center justify-center gap-2 mt-4",
						children: ["Continue to Payment", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
					})
				]
			}),
			step === "payment" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto p-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
						children: "Choose Payment Method"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2.5",
						children: [
							{
								id: "UPI / QR Code",
								title: "UPI / QR Code (Instant & Fast)",
								desc: "Scan QR code via PhonePe, Google Pay, Paytm, or BHIM",
								icon: QrCode,
								recommended: true
							},
							{
								id: "Cash on Delivery",
								title: "Cash on Delivery (COD)",
								desc: "Pay in cash or UPI to the courier upon doorstep delivery",
								icon: Banknote,
								recommended: false
							},
							{
								id: "Net Banking / Cards",
								title: "Credit / Debit Card / Net Banking",
								desc: "All major banks, Visa, MasterCard, RuPay supported",
								icon: CreditCard,
								recommended: false
							}
						].map((opt) => {
							const Icon = opt.icon;
							const isSelected = paymentMethod === opt.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: cn("block p-3.5 rounded-xl border transition cursor-pointer relative", isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-card hover:bg-secondary/40"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "payment_method",
										checked: isSelected,
										onChange: () => setPaymentMethod(opt.id),
										className: "mt-1 text-primary focus:ring-primary h-4 w-4"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-primary" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-foreground text-sm",
													children: opt.title
												}),
												opt.recommended && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "bg-amber-100 text-amber-900 text-[9px] font-bold px-1.5 py-0.5 rounded",
													children: "Recommended"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground mt-1 leading-relaxed text-[11px]",
											children: opt.desc
										})]
									})]
								})
							}, opt.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-[11px] font-semibold text-muted-foreground mb-1",
							children: "Special Delivery Instructions (Optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: orderNotes,
							onChange: (e) => setOrderNotes(e.target.value),
							placeholder: "e.g. Leave package at security gate or call before delivering",
							rows: 2,
							className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-secondary/30 rounded-xl p-3.5 border border-border space-y-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-semibold text-foreground flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Total Items (",
									cartCount,
									"):"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", subtotal] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery Charges:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: deliveryFee === 0 ? "text-emerald-600 font-bold" : "",
									children: deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-border pt-2 flex justify-between font-bold text-sm text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Order Total:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-primary font-mono text-base",
									children: ["₹", total]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handlePlaceOrder,
						disabled: submitting,
						className: "w-full rounded-xl py-6 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition flex items-center justify-center gap-2",
						children: submitting ? "Confirming Your Order..." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }),
							"Place Order • ₹",
							total
						] })
					})
				]
			}),
			step === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-full bg-emerald-100 dark:bg-emerald-950/60 p-4 text-emerald-600 border border-emerald-300",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-12 w-12" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "bg-primary/10 text-primary font-mono font-bold text-xs px-3 py-1 rounded-full border border-primary/20",
							children: ["Order #", placedOrderId]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl font-bold text-foreground mt-2",
							children: "Order Booked Successfully!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-1 max-w-xs mx-auto leading-relaxed",
							children: "Thank you for ordering from Success Book Hub. We are dispatching your books with premium packaging."
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full space-y-2.5 pt-3",
						children: [
							placedOrderId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => setInvoiceModalOpen(true),
								variant: "outline",
								className: "w-full rounded-xl py-5 text-xs font-semibold gap-2 border-primary/30 text-primary hover:bg-primary/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }), "Download GST Tax Invoice"]
							}),
							placedWhatsappUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: placedWhatsappUrl,
								target: "_blank",
								rel: "noreferrer",
								className: "w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), "Confirm & Track on WhatsApp"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: handleClose,
								className: "w-full rounded-xl py-5 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow transition",
								children: "Continue Shopping"
							})
						]
					})
				]
			})
		]
	}), placedOrderId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaxInvoiceModal, {
		orderId: placedOrderId,
		open: invoiceModalOpen,
		onOpenChange: setInvoiceModalOpen
	})] });
}
function WishlistSheet() {
	const { wishlist, wishlistCount, removeFromWishlist, setWishlistOpen } = useWishlist();
	const { addToCart } = useCart();
	const handleMoveToCart = (book) => {
		addToCart(book, 1);
		removeFromWishlist(book.id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
		className: "flex w-[94vw] flex-col p-0 sm:max-w-md bg-background border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
			className: "border-b border-border p-6 pr-12 text-left bg-secondary/30",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
				className: "font-display text-2xl flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-6 w-6 text-red-500 fill-red-500" }),
					"My Wishlist",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-normal text-muted-foreground ml-1",
						children: [
							"(",
							wishlistCount,
							" ",
							wishlistCount === 1 ? "item" : "items",
							")"
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
				className: "text-xs text-muted-foreground",
				children: "Books you've saved for later. Move them to your bag anytime."
			})]
		}), wishlistCount === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col items-center justify-center p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-full bg-secondary/60 p-6 text-muted-foreground mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-10 w-10 text-muted-foreground stroke-[1.5]" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl font-medium",
					children: "Your Wishlist is Empty"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted-foreground max-w-xs leading-relaxed",
					children: "Explore our curated catalog and tap the heart icon to save your favorite books!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => setWishlistOpen(false),
					asChild: true,
					className: "mt-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 text-xs font-semibold",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/shop",
						children: ["Browse Books", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 ml-1.5" })]
					})
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto p-6 space-y-4",
			children: wishlist.map((book) => {
				const price = Number(book.price) || 0;
				const mrp = Number(book.mrp || book.old_price || book.oldPrice || price);
				const discount = Number(book.discount_percent) || (mrp > price ? Math.round((mrp - price) / mrp * 100) : 0);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-4 p-3.5 rounded-xl border border-border bg-card/60 hover:bg-card transition shadow-sm group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-20 h-28 flex-shrink-0 overflow-hidden rounded-lg bg-secondary/40 border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: book.cover || book.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
							alt: book.title,
							className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
						}), discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "absolute top-1 left-1 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm",
							children: [discount, "% OFF"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 flex flex-col justify-between min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							book.sub_category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-semibold text-primary uppercase tracking-wider block truncate",
								children: book.sub_category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-display text-sm font-bold text-foreground truncate mt-0.5",
								children: book.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground truncate",
								children: ["by ", book.author]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline gap-2 mt-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold text-sm text-primary",
									children: ["₹", price]
								}), mrp > price && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground line-through",
									children: ["₹", mrp]
								})]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 pt-2 border-t border-border/50 mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => handleMoveToCart(book),
								className: "flex-1 h-8 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-3.5 w-3.5" }), "Move to Bag"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => removeFromWishlist(book.id),
								className: "p-1.5 rounded-lg border border-border text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition",
								title: "Remove from wishlist",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
							})]
						})]
					})]
				}, book.id);
			})
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
	const { wishlistCount, wishlistOpen, setWishlistOpen } = useWishlist();
	const { user, isAuthenticated: isUserLoggedIn, openLoginModal, logout: userLogout } = useUserAuth();
	const { isAuthenticated: isAdminLoggedIn, logout: adminLogout, adminUser } = useAdminAuth();
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [trackerOpen, setTrackerOpen] = (0, import_react.useState)(false);
	const [managerOpen, setManagerOpen] = (0, import_react.useState)(false);
	const handleAdminLogout = () => {
		adminLogout();
		toast.success("Administrator logged out successfully.");
	};
	const handleUserLogout = () => {
		userLogout();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-primary px-4 py-2 text-center text-xs font-semibold text-primary-foreground sm:text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Free delivery on orders above ₹499" }),
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
				className: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex min-w-0 items-center gap-2.5 sm:gap-3",
						"aria-label": "Success Book Hub home",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4 sm:h-5 sm:w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "block truncate font-display text-base text-primary sm:text-xl font-bold",
								children: STORE.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
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
							className: "rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-muted-foreground transition hover:text-primary",
							activeProps: { className: "bg-secondary text-primary hover:text-primary" },
							children: link.label
						}, link.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 sm:gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => setTrackerOpen(true),
								className: "hidden sm:inline-flex rounded-full gap-1 text-xs text-muted-foreground hover:text-primary h-9 px-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Track" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
								open: wishlistOpen,
								onOpenChange: setWishlistOpen,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										size: "sm",
										className: "relative rounded-full h-9 px-2.5 text-muted-foreground hover:text-primary",
										title: "My Wishlist",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4 text-red-500" }), wishlistCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-1 grid h-4 min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[9px] text-white font-bold",
											children: wishlistCount
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WishlistSheet, {})]
							}),
							isUserLoggedIn && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									className: "rounded-full h-9 px-3 gap-1.5 text-xs font-semibold border-primary/30 bg-primary/5 text-primary hover:bg-primary/10",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "max-w-[80px] sm:max-w-[120px] truncate",
											children: user.name ? user.name.split(" ")[0] : "Account"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3 w-3 opacity-60" })
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
								align: "end",
								className: "w-56 rounded-xl p-1.5 shadow-xl border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuLabel, {
										className: "font-normal px-2 py-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-bold text-foreground truncate",
											children: user.name || "Customer"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] text-muted-foreground truncate",
											children: user.email
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/account",
											className: "flex items-center gap-2 cursor-pointer text-xs py-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "My Dashboard & Profile" })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/account",
											search: { tab: "orders" },
											className: "flex items-center gap-2 cursor-pointer text-xs py-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-3.5 w-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "My Orders & Invoices" })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/account",
											search: { tab: "addresses" },
											className: "flex items-center gap-2 cursor-pointer text-xs py-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Saved Addresses" })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onClick: () => setWishlistOpen(true),
										className: "flex items-center gap-2 cursor-pointer text-xs py-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3.5 w-3.5 text-red-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"My Wishlist (",
											wishlistCount,
											")"
										] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onClick: handleUserLogout,
										className: "flex items-center gap-2 cursor-pointer text-xs py-2 text-destructive focus:text-destructive",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign Out" })]
									})
								]
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: openLoginModal,
								className: "rounded-full h-9 px-3 gap-1.5 text-xs font-semibold border-primary/20 text-primary hover:bg-primary/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "Sign In"
								})]
							}),
							isAdminLoggedIn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden md:flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "default",
									size: "sm",
									className: "rounded-full gap-1 text-xs bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 h-9 px-3",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/admin",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-amber-300" }), " Admin"]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "sm",
									onClick: handleAdminLogout,
									className: "rounded-full p-2 text-xs text-destructive hover:bg-destructive/10 h-9 w-9",
									title: "Logout Admin",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
								open: cartOpen,
								onOpenChange: setCartOpen,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										className: "relative h-9 rounded-full px-3.5 font-semibold text-xs gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden sm:inline",
												children: "Bag"
											}),
											cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "grid h-4.5 min-w-4.5 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground font-bold",
												children: cartCount
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartSheet, {})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "lg:hidden h-9 w-9",
								onClick: () => setMenuOpen((open) => !open),
								"aria-label": "Toggle menu",
								children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
							})
						]
					})
				]
			}), menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "border-t border-border px-4 py-3 lg:hidden space-y-1 bg-background",
				"aria-label": "Mobile navigation",
				children: [navLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: link.to,
					activeOptions: { exact: link.to === "/" },
					onClick: () => setMenuOpen(false),
					className: "block rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground",
					activeProps: { className: "bg-secondary text-primary font-bold" },
					children: link.label
				}, link.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-2 border-t border-border/60 flex flex-col gap-1.5",
					children: [
						isUserLoggedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/account",
							onClick: () => setMenuOpen(false),
							className: "flex items-center gap-2 px-3 py-2 text-sm font-semibold text-primary rounded-md bg-secondary/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }), " My Account & Orders"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setMenuOpen(false);
								handleUserLogout();
							},
							className: "flex items-center gap-2 px-3 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10 rounded-md text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sign Out"]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setMenuOpen(false);
								openLoginModal();
							},
							className: "flex items-center gap-2 px-3 py-2 text-sm font-semibold text-primary rounded-md bg-secondary/60 text-left font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }), " Sign In with OTP"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setMenuOpen(false);
								setTrackerOpen(true);
							},
							className: "flex items-center gap-2 px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-primary rounded-md text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }), " Track Book Order"]
						}),
						isAdminLoggedIn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin",
							onClick: () => setMenuOpen(false),
							className: "flex items-center gap-2 px-3 py-2 text-sm font-semibold text-primary rounded-md bg-secondary/70 font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-primary" }), " Store Admin Portal"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setMenuOpen(false);
								handleAdminLogout();
							},
							className: "flex items-center gap-2 px-3 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10 rounded-md text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }),
								" Logout Admin (",
								adminUser?.email,
								")"
							]
						})] })
					]
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
function UserLoginModal() {
	const { loginModalOpen, closeLoginModal, sendOtp, verifyOtp } = useUserAuth();
	const [step, setStep] = (0, import_react.useState)("email");
	const [email, setEmail] = (0, import_react.useState)("");
	const [otp, setOtp] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [isExistingUser, setIsExistingUser] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [countdown, setCountdown] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let timer;
		if (countdown > 0) timer = setTimeout(() => setCountdown((c) => c - 1), 1e3);
		return () => clearTimeout(timer);
	}, [countdown]);
	const handleOpenChange = (open) => {
		if (!open) {
			closeLoginModal();
			setTimeout(() => {
				setStep("email");
				setOtp("");
				setName("");
				setPhone("");
				setLoading(false);
			}, 300);
		}
	};
	const handleSendOtp = async (e) => {
		e.preventDefault();
		if (!email.trim() || !email.includes("@")) {
			toast.error("Please enter a valid email address.");
			return;
		}
		setLoading(true);
		try {
			const res = await sendOtp(email.trim());
			setIsExistingUser(Boolean(res.isExistingUser));
			setStep("otp");
			setCountdown(60);
			toast.success(res.message || "OTP sent successfully! Check your inbox.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to send OTP.");
		} finally {
			setLoading(false);
		}
	};
	const handleVerifyOtp = async (e) => {
		e.preventDefault();
		if (otp.length < 6) {
			toast.error("Please enter the complete 6-digit OTP.");
			return;
		}
		if (!isExistingUser && (!name.trim() || !phone.trim())) {
			toast.error("Please provide your full name and phone number to complete registration.");
			return;
		}
		setLoading(true);
		try {
			await verifyOtp(email.trim(), otp.trim(), name.trim(), phone.trim());
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Invalid or expired OTP.");
		} finally {
			setLoading(false);
		}
	};
	const handleResendOtp = async () => {
		if (countdown > 0) return;
		setLoading(true);
		try {
			await sendOtp(email.trim());
			setCountdown(60);
			toast.success("New OTP sent! Please check your inbox.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to resend OTP.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		open: loginModalOpen,
		onOpenChange: handleOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
			className: "sm:max-w-[440px] p-0 overflow-hidden border-border bg-card shadow-2xl rounded-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-gradient-to-br from-primary via-[#5a1224] to-[#3a0814] p-6 text-white text-center relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "inline-flex items-center justify-center p-3 rounded-full bg-white/10 backdrop-blur-md mb-3 border border-white/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-7 w-7 text-amber-300" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
						className: "font-display text-2xl font-bold tracking-tight text-amber-100",
						children: step === "email" ? "Sign In to Success Book Hub" : "Verify Verification Code"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
						className: "text-white/80 text-xs mt-1.5 max-w-xs mx-auto",
						children: step === "email" ? "Access your personal dashboard, track live orders, and manage saved addresses" : `Enter the 6-digit passcode sent to ${email}`
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-6",
				children: step === "email" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSendOtp,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5",
								children: "Email Address"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									required: true,
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "name@gmail.com",
									className: "w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition",
									autoFocus: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-muted-foreground mt-1.5 flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-emerald-600" }), "We'll send a 1-time secure verification passcode to this email."]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: loading || !email.trim(),
								className: "w-full rounded-xl py-6 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition flex items-center justify-center gap-2",
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4 animate-spin" }), "Sending Verification Code..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Continue with OTP", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })] })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-secondary/40 rounded-xl p-3.5 border border-border text-xs text-muted-foreground space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-semibold text-foreground flex items-center gap-1.5 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-amber-600" }), "Benefits of an Account:"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "list-disc pl-4 space-y-1 text-[11px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Track order status & download GST Tax Invoices" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Save multiple addresses for fast checkout" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Sync your Wishlist across devices" })
								]
							})]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleVerifyOtp,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: "6-Digit Security Passcode"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setStep("email"),
								className: "text-[11px] text-primary hover:underline",
								children: "Change Email"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							maxLength: 6,
							required: true,
							value: otp,
							onChange: (e) => setOtp(e.target.value.replace(/\D/g, "")),
							placeholder: "• • • • • •",
							className: "w-full text-center text-2xl tracking-[12px] font-mono py-3 rounded-xl border border-input bg-background font-bold text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition",
							autoFocus: true
						})] }),
						!isExistingUser && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 pt-2 border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-medium text-foreground",
									children: "Complete your profile:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										value: name,
										onChange: (e) => setName(e.target.value),
										placeholder: "Your Full Name",
										className: "w-full pl-10 pr-4 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
									})]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "tel",
										required: true,
										value: phone,
										onChange: (e) => setPhone(e.target.value),
										placeholder: "10-digit Mobile Number",
										className: "w-full pl-10 pr-4 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
									})]
								}) })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Didn't receive code?"
							}), countdown > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground font-mono",
								children: [
									"Resend in ",
									countdown,
									"s"
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleResendOtp,
								disabled: loading,
								className: "text-primary font-semibold hover:underline",
								children: "Resend OTP"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: loading || otp.length < 6,
								className: "w-full rounded-xl py-6 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition flex items-center justify-center gap-2",
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4 animate-spin" }), "Verifying..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), "Verify & Sign In"] })
							})
						})
					]
				})
			})]
		})
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
var Route$4 = createRootRouteWithContext()({
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-background text-foreground antialiased min-h-screen flex flex-col",
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		})]
	});
}
function RootComponent() {
	const queryClient = Route$4.useRouteContext()?.queryClient || new QueryClient();
	const routerState = useRouterState();
	const isAdmin = Boolean(routerState?.location?.pathname?.startsWith("/admin"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WishlistProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [
			!isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			!isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserLoginModal, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				richColors: true,
				position: "top-right",
				closeButton: true
			})
		] }) }) }) })
	});
}
var $$splitComponentImporter$3 = () => import("./routes-BEHLKUq4.mjs");
var Route$3 = createFileRoute("/")({
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
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./about-DikR642v.mjs");
var Route$2 = createFileRoute("/about")({
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
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./contact-6uFj04MT.mjs");
var Route$1 = createFileRoute("/contact")({
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
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./login-CTGHXAyi.mjs");
var Route = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: "Admin Login — Success Book Hub" },
		{
			name: "description",
			content: "Secure OTP-based administrator login portal for Success Book Hub."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	AboutRoute: Route$2.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$4
	}),
	AccountRoute: Route$5.update({
		id: "/account",
		path: "/account",
		getParentRoute: () => Route$4
	}),
	AdminRoute: Route$6.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$4
	}),
	ContactRoute: Route$1.update({
		id: "/contact",
		path: "/contact",
		getParentRoute: () => Route$4
	}),
	LoginRoute: Route.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$4
	}),
	ShopRoute: Route$7.update({
		id: "/shop",
		path: "/shop",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
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
