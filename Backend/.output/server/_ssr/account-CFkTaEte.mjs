import { r as __toESM } from "../_runtime.mjs";
import { t as api } from "./api-BjkSpkHQ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as useUserAuth, r as useCart } from "./cart-DUtiTmqH.mjs";
import { n as cn, t as Button } from "./button-CKfowhiz.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Plus, G as Mail, J as Lock, K as LogOut, M as Phone, N as Pen, T as RotateCcw, W as MapPin, g as ShoppingBag, ht as Clock, i as User, kt as BookOpen, lt as Eye, nt as Heart, st as FileText, u as Trash2, ut as EyeOff, yt as CircleCheck, z as Package } from "../_libs/lucide-react.mjs";
import { n as useWishlist } from "./wishlist-2Bq0yOu5.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-C-FEQyPT.mjs";
import { t as TaxInvoiceModal } from "./tax-invoice-modal-DPw4jWTP.mjs";
import { t as Route } from "./account-B4z4w1Ms.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-CFkTaEte.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AccountPage() {
	const search = Route.useSearch();
	const navigate = useNavigate();
	const { user, token, isAuthenticated, isLoading, openLoginModal, updateProfile, changePassword, logout } = useUserAuth();
	const { wishlist, removeFromWishlist } = useWishlist();
	const { addToCart } = useCart();
	const [activeTab, setActiveTab] = (0, import_react.useState)(search.tab || "orders");
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [loadingOrders, setLoadingOrders] = (0, import_react.useState)(false);
	const [selectedInvoiceOrderId, setSelectedInvoiceOrderId] = (0, import_react.useState)(null);
	const [invoiceModalOpen, setInvoiceModalOpen] = (0, import_react.useState)(false);
	const [addresses, setAddresses] = (0, import_react.useState)([]);
	const [loadingAddresses, setLoadingAddresses] = (0, import_react.useState)(false);
	const [addressModalOpen, setAddressModalOpen] = (0, import_react.useState)(false);
	const [editingAddressId, setEditingAddressId] = (0, import_react.useState)(null);
	const [addrName, setAddrName] = (0, import_react.useState)("");
	const [addrPhone, setAddrPhone] = (0, import_react.useState)("");
	const [addrAltPhone, setAddrAltPhone] = (0, import_react.useState)("");
	const [addrFlat, setAddrFlat] = (0, import_react.useState)("");
	const [addrStreet, setAddrStreet] = (0, import_react.useState)("");
	const [addrLandmark, setAddrLandmark] = (0, import_react.useState)("");
	const [addrCity, setAddrCity] = (0, import_react.useState)("");
	const [addrState, setAddrState] = (0, import_react.useState)("Telangana");
	const [addrPincode, setAddrPincode] = (0, import_react.useState)("");
	const [addrType, setAddrType] = (0, import_react.useState)("Home");
	const [addrDefault, setAddrDefault] = (0, import_react.useState)(false);
	const [savingAddress, setSavingAddress] = (0, import_react.useState)(false);
	const [profileName, setProfileName] = (0, import_react.useState)("");
	const [profilePhone, setProfilePhone] = (0, import_react.useState)("");
	const [savingProfile, setSavingProfile] = (0, import_react.useState)(false);
	const [currentPassword, setCurrentPassword] = (0, import_react.useState)("");
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirmNewPassword, setConfirmNewPassword] = (0, import_react.useState)("");
	const [showCurrentPwd, setShowCurrentPwd] = (0, import_react.useState)(false);
	const [showNewPwd, setShowNewPwd] = (0, import_react.useState)(false);
	const [showConfirmNewPwd, setShowConfirmNewPwd] = (0, import_react.useState)(false);
	const [savingPassword, setSavingPassword] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (search.tab && [
			"orders",
			"addresses",
			"wishlist",
			"profile"
		].includes(search.tab)) setActiveTab(search.tab);
	}, [search.tab]);
	(0, import_react.useEffect)(() => {
		if (user) {
			setProfileName(user.name || "");
			setProfilePhone(user.phone || "");
		}
	}, [user]);
	const loadOrders = async () => {
		if (!token) return;
		setLoadingOrders(true);
		try {
			const data = await api.getMyOrders(token);
			setOrders(data);
		} catch {} finally {
			setLoadingOrders(false);
		}
	};
	const loadAddresses = async () => {
		if (!token) return;
		setLoadingAddresses(true);
		try {
			const data = await api.getUserAddresses(token);
			setAddresses(data);
		} catch {} finally {
			setLoadingAddresses(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (isAuthenticated && token) {
			loadOrders();
			loadAddresses();
		}
	}, [isAuthenticated, token]);
	const handleOpenInvoice = (orderId) => {
		setSelectedInvoiceOrderId(orderId);
		setInvoiceModalOpen(true);
	};
	const handleOpenAddAddress = () => {
		setEditingAddressId(null);
		setAddrName(user?.name || "");
		setAddrPhone(user?.phone || "");
		setAddrAltPhone("");
		setAddrFlat("");
		setAddrStreet("");
		setAddrLandmark("");
		setAddrCity("Hyderabad");
		setAddrState("Telangana");
		setAddrPincode("");
		setAddrType("Home");
		setAddrDefault(addresses.length === 0);
		setAddressModalOpen(true);
	};
	const handleOpenEditAddress = (addr) => {
		setEditingAddressId(addr.id);
		setAddrName(addr.fullName);
		setAddrPhone(addr.phone);
		setAddrAltPhone(addr.alternatePhone || "");
		setAddrFlat(addr.flatHouse);
		setAddrStreet(addr.areaStreet);
		setAddrLandmark(addr.landmark || "");
		setAddrCity(addr.city);
		setAddrState(addr.state);
		setAddrPincode(addr.pincode);
		setAddrType(addr.addressType);
		setAddrDefault(addr.isDefault);
		setAddressModalOpen(true);
	};
	const handleSaveAddress = async (e) => {
		e.preventDefault();
		if (!token) return;
		if (!addrName.trim() || !addrPhone.trim() || !addrFlat.trim() || !addrStreet.trim() || !addrCity.trim() || !addrPincode.trim()) {
			toast.error("Please fill in all required address fields.");
			return;
		}
		setSavingAddress(true);
		try {
			const payload = {
				fullName: addrName.trim(),
				phone: addrPhone.trim(),
				alternatePhone: addrAltPhone.trim() || void 0,
				flatHouse: addrFlat.trim(),
				areaStreet: addrStreet.trim(),
				landmark: addrLandmark.trim() || void 0,
				city: addrCity.trim(),
				state: addrState.trim(),
				pincode: addrPincode.trim(),
				addressType: addrType,
				isDefault: addrDefault
			};
			if (editingAddressId) {
				await api.updateUserAddress(token, editingAddressId, payload);
				toast.success("Address updated successfully!");
			} else {
				await api.addUserAddress(token, payload);
				toast.success("New address added successfully!");
			}
			setAddressModalOpen(false);
			loadAddresses();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to save address.");
		} finally {
			setSavingAddress(false);
		}
	};
	const handleDeleteAddress = async (id) => {
		if (!token) return;
		if (!confirm("Are you sure you want to delete this delivery address?")) return;
		try {
			await api.deleteUserAddress(token, id);
			toast.success("Address removed.");
			loadAddresses();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to delete address.");
		}
	};
	const handleSetDefaultAddress = async (id) => {
		if (!token) return;
		try {
			await api.setDefaultUserAddress(token, id);
			toast.success("Default address updated!");
			loadAddresses();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to set default.");
		}
	};
	const handleUpdateProfile = async (e) => {
		e.preventDefault();
		setSavingProfile(true);
		try {
			await updateProfile({
				name: profileName.trim(),
				phone: profilePhone.trim()
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to update profile.");
		} finally {
			setSavingProfile(false);
		}
	};
	const handleCancelOrder = async (orderId) => {
		if (!token) return;
		if (!confirm(`Are you sure you want to cancel Order #${orderId}? Any reserved stock will be automatically restored.`)) return;
		try {
			const res = await api.cancelOrder(token, orderId);
			toast.success(res.message || `Order #${orderId} has been cancelled.`);
			loadOrders();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to cancel order.");
		}
	};
	const handleChangePassword = async (e) => {
		e.preventDefault();
		if (!newPassword || newPassword.length < 6) {
			toast.error("New password must be at least 6 characters long.");
			return;
		}
		if (newPassword !== confirmNewPassword) {
			toast.error("New password and confirm password do not match.");
			return;
		}
		setSavingPassword(true);
		try {
			await changePassword({
				currentPassword: currentPassword || void 0,
				newPassword,
				confirmPassword: confirmNewPassword
			});
			setCurrentPassword("");
			setNewPassword("");
			setConfirmNewPassword("");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to change password.");
		} finally {
			setSavingPassword(false);
		}
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-[60vh] flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Loading your account..."
			})]
		})
	});
	if (!isAuthenticated || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-[70vh] flex items-center justify-center px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md w-full text-center bg-card border border-border p-8 rounded-2xl shadow-xl space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "inline-flex p-4 rounded-full bg-primary/10 text-primary mb-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-10 w-10" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold",
					children: "Sign In to Your Account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground leading-relaxed",
					children: "Sign in with your email & OTP to view your orders, download GST Tax Invoices, manage saved delivery addresses, and access your wishlist."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: openLoginModal,
					className: "w-full rounded-full py-6 text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg btn-shimmer",
					children: "Sign In with Email & OTP"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-muted/20 py-4 sm:py-6 px-4 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-6xl mx-auto space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-400/30 text-white p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-16 w-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-display text-2xl font-black shadow-md border-2 border-amber-300",
								children: user.name ? user.name.charAt(0).toUpperCase() : "U"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "font-display text-2xl font-bold text-amber-300",
									children: [
										"Hello, ",
										user.name || "Book Lover",
										"!"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider",
									children: "Verified Member"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-slate-300 text-xs mt-1 flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5 text-amber-400" }),
									" ",
									user.email,
									user.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "opacity-40",
											children: "•"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3.5 w-3.5 text-amber-400" }),
										" ",
										user.phone
									] })
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: logout,
							className: "rounded-full bg-white/10 hover:bg-white/20 text-white border-white/30 text-xs gap-1.5 font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), " Sign Out"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2 border-b border-border pb-1 overflow-x-auto scrollbar-none",
						children: [
							{
								id: "orders",
								label: "My Orders & Invoices",
								icon: Package,
								count: orders.length
							},
							{
								id: "addresses",
								label: "Saved Addresses",
								icon: MapPin,
								count: addresses.length
							},
							{
								id: "wishlist",
								label: "My Wishlist",
								icon: Heart,
								count: wishlist.length
							},
							{
								id: "profile",
								label: "Account Settings",
								icon: User
							}
						].map((tab) => {
							const Icon = tab.icon;
							const isActive = activeTab === tab.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setActiveTab(tab.id);
									navigate({
										to: "/account",
										search: { tab: tab.id }
									});
								},
								className: cn("flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition border-b-2 whitespace-nowrap", isActive ? "border-primary text-slate-950 dark:text-amber-300 bg-amber-50/80 dark:bg-amber-950/30 shadow-2xs" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/40"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("h-4 w-4", isActive ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tab.label }),
									tab.count !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("px-2 py-0.5 rounded-full text-[10px] font-black", isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"),
										children: tab.count
									})
								]
							}, tab.id);
						})
					}),
					activeTab === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: loadingOrders ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-16 text-center text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs",
								children: "Loading your order history..."
							})]
						}) : orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-card border border-border rounded-2xl p-10 text-center space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-12 w-12 text-muted-foreground mx-auto stroke-[1.5]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-bold",
									children: "No Orders Placed Yet"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground max-w-sm mx-auto",
									children: "Looks like you haven't placed any orders yet. Discover timeless reads in our shop!"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									className: "rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "/shop",
										children: "Explore Books"
									})
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: orders.map((order) => {
								const isDelivered = order.status === "delivered";
								const isCancelled = order.status === "cancelled";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-muted/40 p-4 border-b border-border flex flex-wrap items-center justify-between gap-3 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-4 sm:gap-8",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground block text-[10px] uppercase font-semibold",
													children: "Order Placed"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-foreground",
													children: order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN", {
														day: "2-digit",
														month: "short",
														year: "numeric"
													}) : "Recent"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground block text-[10px] uppercase font-semibold",
													children: "Total Amount"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-bold text-primary font-mono text-sm",
													children: ["₹", order.total]
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground block text-[10px] uppercase font-semibold",
													children: "Ship To"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium text-foreground truncate max-w-[120px] block",
													children: order.customerName
												})] })
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-mono text-xs font-bold text-muted-foreground",
													children: ["#", order.id]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													variant: "outline",
													onClick: () => handleOpenInvoice(order.id),
													className: "rounded-lg text-xs gap-1.5 h-8 border-primary/30 text-primary hover:bg-primary/10",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5" }), "Tax Invoice"]
												}),
												(order.status === "pending" || order.status === "confirmed") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													variant: "outline",
													onClick: () => handleCancelOrder(order.id),
													className: "rounded-lg text-xs gap-1 h-8 border-rose-300 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" }), "Cancel Order"]
												})
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-5 space-y-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex items-center justify-between pb-3 border-b border-border/50",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: cn("px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5", isDelivered ? "bg-emerald-100 text-emerald-800" : isCancelled ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-900"),
														children: [
															isDelivered ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-600" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5 text-amber-700" }),
															"Status: ",
															order.status
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-xs text-muted-foreground",
														children: ["• Payment: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
															className: "text-foreground",
															children: order.paymentMethod
														})]
													})]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "space-y-3",
												children: order.items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between text-xs py-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-3 min-w-0",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "h-10 w-8 bg-secondary rounded overflow-hidden flex-shrink-0 border border-border flex items-center justify-center",
															children: item.image || item.cover ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																src: item.image || item.cover,
																alt: item.title,
																onError: (e) => {
																	e.currentTarget.style.display = "none";
																},
																className: "h-full w-full object-cover"
															}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-full w-full p-2 text-muted-foreground" })
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "min-w-0",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
																className: "font-bold text-foreground text-xs truncate",
																children: item.title
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "text-[11px] text-muted-foreground",
																children: [
																	"Qty: ",
																	item.quantity,
																	" × ₹",
																	item.price
																]
															})]
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-mono font-bold text-foreground",
														children: ["₹", item.price * item.quantity]
													})]
												}, idx))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-secondary/30 rounded-xl p-3 text-[11px] text-muted-foreground flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary flex-shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-foreground",
														children: "Delivering to: "
													}),
													order.deliveryAddress,
													order.city ? `, ${order.city}` : "",
													order.pincode ? ` - ${order.pincode}` : ""
												] })]
											})
										]
									})]
								}, order.id);
							})
						})
					}),
					activeTab === "addresses" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-bold",
								children: "Your Saved Addresses"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Manage delivery locations for fast 1-click checkout"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: handleOpenAddAddress,
								className: "rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add New Address"]
							})]
						}), loadingAddresses ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-16 text-center text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs",
								children: "Loading addresses..."
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleOpenAddAddress,
								className: "border-2 border-dashed border-border hover:border-primary/50 bg-card/50 hover:bg-card p-6 rounded-2xl flex flex-col items-center justify-center text-center transition min-h-[160px] group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-3 rounded-full bg-secondary group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary transition mb-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-6 w-6" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-sm text-foreground group-hover:text-primary transition",
										children: "Add New Delivery Address"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-muted-foreground mt-0.5",
										children: "Save home, office, or other locations"
									})
								]
							}), addresses.map((addr) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("bg-card border rounded-2xl p-5 shadow-sm space-y-3 relative flex flex-col justify-between", addr.isDefault ? "border-primary/60 bg-primary/[0.02]" : "border-border"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-sm text-foreground",
												children: addr.fullName
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "bg-secondary px-2 py-0.5 rounded text-[10px] font-semibold text-muted-foreground",
												children: addr.addressType
											})]
										}), addr.isDefault && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full",
											children: "Default Address"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground leading-relaxed",
										children: [
											addr.flatHouse,
											", ",
											addr.areaStreet,
											addr.landmark && `, Near ${addr.landmark}`,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											addr.city,
											", ",
											addr.state,
											" - ",
											addr.pincode
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-foreground font-medium mt-2",
										children: [
											"Phone number: ",
											addr.phone,
											addr.alternatePhone && ` | Alt: ${addr.alternatePhone}`
										]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-3 border-t border-border flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => handleOpenEditAddress(addr),
											className: "text-primary hover:underline font-semibold flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-3 w-3" }), " Edit"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => handleDeleteAddress(addr.id),
											className: "text-destructive hover:underline font-medium flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" }), " Delete"]
										})]
									}), !addr.isDefault && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleSetDefaultAddress(addr.id),
										className: "text-xs text-muted-foreground hover:text-foreground underline",
										children: "Set as default"
									})]
								})]
							}, addr.id))]
						})]
					}),
					activeTab === "wishlist" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-bold",
								children: "Your Saved Wishlist"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									wishlist.length,
									" ",
									wishlist.length === 1 ? "book" : "books",
									" saved for later"
								]
							})] })
						}), wishlist.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-card border border-border rounded-2xl p-10 text-center space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-12 w-12 text-muted-foreground mx-auto stroke-[1.5]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-bold",
									children: "Your Wishlist is Empty"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground max-w-sm mx-auto",
									children: "Click the heart icon on any book card to save it here for future reading!"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									className: "rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "/shop",
										children: "Browse Catalog"
									})
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
							children: wishlist.map((book) => {
								const price = Number(book.price) || 0;
								const mrp = Number(book.mrp || book.old_price || book.oldPrice || price);
								const discount = Number(book.discount_percent) || (mrp > price ? Math.round((mrp - price) / mrp * 100) : 0);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-card border border-border rounded-2xl p-4 shadow-sm hover:shadow-md transition flex gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "w-20 h-28 flex-shrink-0 overflow-hidden rounded-xl bg-secondary border border-border relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: book.cover || book.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
											alt: book.title,
											onError: (e) => {
												e.currentTarget.src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop";
											},
											className: "h-full w-full object-cover"
										}), discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "absolute top-1 left-1 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded",
											children: [discount, "% OFF"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 flex flex-col justify-between min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											book.sub_category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-bold text-primary uppercase tracking-wider block truncate",
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
											className: "flex items-center gap-2 pt-2 mt-2 border-t border-border",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												onClick: () => {
													addToCart(book, 1);
													removeFromWishlist(book.id);
													toast.success(`Moved "${book.title}" to your Bag!`);
												},
												className: "flex-1 h-8 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-3 w-3" }), "Move to Bag"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => removeFromWishlist(book.id),
												className: "p-1.5 rounded-lg border border-border text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition",
												title: "Remove",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
											})]
										})]
									})]
								}, book.id);
							})
						})]
					}),
					activeTab === "profile" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xl bg-card border border-border rounded-2xl p-6 shadow-sm space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-bold",
								children: "Profile Details"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Update your contact information for orders and communications"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleUpdateProfile,
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs font-semibold text-muted-foreground mb-1",
											children: "Registered Email Address (Locked)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "email",
												disabled: true,
												value: user.email,
												className: "w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-secondary/50 text-foreground text-xs cursor-not-allowed opacity-80"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }), " Email is verified with OTP"]
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-muted-foreground mb-1",
										children: "Full Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											required: true,
											value: profileName,
											onChange: (e) => setProfileName(e.target.value),
											placeholder: "Enter your name",
											className: "w-full pl-10 pr-4 py-2 rounded-xl border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
										})]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-muted-foreground mb-1",
										children: "Primary Mobile Number"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "tel",
											value: profilePhone,
											onChange: (e) => setProfilePhone(e.target.value),
											placeholder: "10-digit mobile number",
											className: "w-full pl-10 pr-4 py-2 rounded-xl border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
										})]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											disabled: savingProfile,
											className: "w-full rounded-xl py-5 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow transition",
											children: savingProfile ? "Saving Profile..." : "Save Changes"
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-border pt-6 space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-display text-lg font-bold flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-amber-600" }), "Account Security & Password"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Set a new account password to sign in securely from any device"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleChangePassword,
									className: "space-y-3.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs font-semibold text-muted-foreground mb-1",
											children: "Current Password (Optional if newly registered)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: showCurrentPwd ? "text" : "password",
													value: currentPassword,
													onChange: (e) => setCurrentPassword(e.target.value),
													placeholder: "Enter current password",
													className: "w-full pl-10 pr-11 py-2 rounded-xl border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setShowCurrentPwd(!showCurrentPwd),
													className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1",
													children: showCurrentPwd ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" })
												})
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold text-muted-foreground mb-1",
												children: "New Password (min. 6 chars)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: showNewPwd ? "text" : "password",
														required: true,
														value: newPassword,
														onChange: (e) => setNewPassword(e.target.value),
														placeholder: "New password",
														className: "w-full pl-10 pr-11 py-2 rounded-xl border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setShowNewPwd(!showNewPwd),
														className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1",
														children: showNewPwd ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" })
													})
												]
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-semibold text-muted-foreground mb-1",
												children: "Confirm New Password"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: showConfirmNewPwd ? "text" : "password",
														required: true,
														value: confirmNewPassword,
														onChange: (e) => setConfirmNewPassword(e.target.value),
														placeholder: "Re-type new password",
														className: "w-full pl-10 pr-11 py-2 rounded-xl border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setShowConfirmNewPwd(!showConfirmNewPwd),
														className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1",
														children: showConfirmNewPwd ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" })
													})
												]
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pt-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "submit",
												disabled: savingPassword || !newPassword || newPassword !== confirmNewPassword,
												className: "w-full rounded-xl py-5 text-xs font-bold bg-secondary hover:bg-secondary/80 text-foreground border border-border shadow-xs transition",
												children: savingPassword ? "Updating Password..." : "Update Password"
											})
										})
									]
								})]
							})
						]
					})
				]
			}),
			selectedInvoiceOrderId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaxInvoiceModal, {
				orderId: selectedInvoiceOrderId,
				open: invoiceModalOpen,
				onOpenChange: setInvoiceModalOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: addressModalOpen,
				onOpenChange: setAddressModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-lg p-0 overflow-hidden bg-card border-border rounded-2xl shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
						className: "p-5 border-b border-border bg-secondary/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "font-display text-lg font-bold",
							children: editingAddressId ? "Edit Delivery Address" : "Add New Delivery Address"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "text-xs text-muted-foreground",
							children: "Enter your exact delivery address for hassle-free shipping"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveAddress,
						className: "p-5 space-y-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-semibold text-muted-foreground mb-1",
									children: "Full Name *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: addrName,
									onChange: (e) => setAddrName(e.target.value),
									placeholder: "e.g. Rahul Sharma",
									className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-semibold text-muted-foreground mb-1",
									children: "Phone Number *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "tel",
									required: true,
									value: addrPhone,
									onChange: (e) => setAddrPhone(e.target.value),
									placeholder: "10-digit number",
									className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-semibold text-muted-foreground mb-1",
								children: "Flat, House No., Building, Apartment *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: addrFlat,
								onChange: (e) => setAddrFlat(e.target.value),
								placeholder: "e.g. Flat 301, Emerald Towers",
								className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-semibold text-muted-foreground mb-1",
								children: "Area, Street, Sector *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: addrStreet,
								onChange: (e) => setAddrStreet(e.target.value),
								placeholder: "e.g. Jubilee Hills, Road No 36",
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
										value: addrLandmark,
										onChange: (e) => setAddrLandmark(e.target.value),
										placeholder: "Near Metro",
										className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] font-semibold text-muted-foreground mb-1",
										children: "City *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										value: addrCity,
										onChange: (e) => setAddrCity(e.target.value),
										placeholder: "Hyderabad",
										className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] font-semibold text-muted-foreground mb-1",
										children: "Pincode *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										value: addrPincode,
										onChange: (e) => setAddrPincode(e.target.value.replace(/\D/g, "").slice(0, 6)),
										placeholder: "500033",
										className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none font-mono"
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between pt-2",
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
										onClick: () => setAddrType(t),
										className: cn("px-2.5 py-1 rounded text-xs font-semibold border transition", addrType === t ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-muted-foreground border-border hover:bg-secondary/80"),
										children: t
									}, t))]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: addrDefault,
										onChange: (e) => setAddrDefault(e.target.checked),
										className: "rounded text-primary focus:ring-primary h-3.5 w-3.5"
									}), "Set as default"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-3 border-t border-border flex items-center justify-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => setAddressModalOpen(false),
									className: "rounded-xl text-xs",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: savingAddress,
									className: "rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold",
									children: savingAddress ? "Saving..." : editingAddressId ? "Update Address" : "Save Address"
								})]
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { AccountPage as component };
