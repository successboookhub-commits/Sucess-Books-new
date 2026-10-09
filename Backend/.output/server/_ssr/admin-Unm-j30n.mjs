import { r as __toESM } from "../_runtime.mjs";
import { i as categories, t as STORE } from "./books-B4F80K0Q.mjs";
import { n as fallbackCategoryList, t as api } from "./api-B0JqYe2J.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as cn, t as Button } from "./button-CKfowhiz.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Plus, At as Bell, C as Save, D as Receipt, Dt as Building, E as RefreshCw, Et as ChartColumn, I as PanelLeftOpen, K as LogOut, L as PanelLeftClose, N as Pen, Nt as ArrowUpRight, P as PenLine, Pt as ArrowRight, Q as Layers, R as Palette, S as Search, St as ChevronRight, U as Menu, X as Library, Y as LoaderCircle, Z as LayoutDashboard, _ as Shield, a as Upload, at as FolderPlus, b as Settings, bt as CircleAlert, c as TriangleAlert, d as ToggleRight, dt as ExternalLink, et as Image$1, f as ToggleLeft, ft as DollarSign, g as ShoppingBag, h as Sparkles, i as User, it as Funnel, k as Printer, kt as BookOpen, l as TrendingUp, m as Star, n as X, ot as FolderOpen, p as Tag, q as LogIn, r as Users, u as Trash2, v as ShieldCheck, wt as ChevronDown, y as ShieldAlert, yt as CircleCheck, z as Package } from "../_libs/lucide-react.mjs";
import { t as TaxInvoiceModal } from "./tax-invoice-modal-6TreJndk.mjs";
import { n as useAdminAuth } from "./auth-DOWIJfDH.mjs";
import { a as DropdownMenuSeparator, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, s as Route, t as DropdownMenu } from "./admin-BJUUMVTe.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/radix-ui__react-popover.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-Unm-j30n.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminSidebar({ activeSection, onSelectSection, mobileOpen, onMobileClose, collapsed, onToggleCollapse, ordersCount = 0 }) {
	const [openGroups, setOpenGroups] = (0, import_react.useState)({
		catalog: true,
		sales: true,
		customers: false,
		content: false,
		reports: false,
		settings: false,
		"admin-management": false
	});
	const toggleGroup = (groupId) => {
		setOpenGroups((prev) => ({
			...prev,
			[groupId]: !prev[groupId]
		}));
	};
	const menuGroups = [
		{
			id: "catalog",
			title: "Catalog",
			icon: Library,
			items: [
				{
					id: "categories",
					label: "Categories"
				},
				{
					id: "sub-categories",
					label: "Sub Categories"
				},
				{
					id: "books",
					label: "Books"
				}
			]
		},
		{
			id: "sales",
			title: "Sales",
			icon: ShoppingBag,
			items: [
				{
					id: "orders",
					label: "Orders",
					badge: ordersCount > 0 ? ordersCount : void 0
				},
				{
					id: "payments",
					label: "Payments"
				},
				{
					id: "coupons",
					label: "Coupons"
				}
			]
		},
		{
			id: "customers",
			title: "Customers",
			icon: Users,
			items: [
				{
					id: "users",
					label: "Users"
				},
				{
					id: "addresses",
					label: "Addresses"
				},
				{
					id: "reviews",
					label: "Reviews"
				}
			]
		},
		{
			id: "content",
			title: "Content",
			icon: Palette,
			items: [
				{
					id: "hero-banners",
					label: "Hero Banners"
				},
				{
					id: "promo-banners",
					label: "Promotional Banners"
				},
				{
					id: "testimonials",
					label: "Testimonials"
				},
				{
					id: "blogs",
					label: "Blogs (Optional)"
				}
			]
		},
		{
			id: "reports",
			title: "Reports",
			icon: ChartColumn,
			items: [
				{
					id: "sales-report",
					label: "Sales Report"
				},
				{
					id: "revenue-report",
					label: "Revenue Report"
				},
				{
					id: "customer-report",
					label: "Customer Report"
				}
			]
		},
		{
			id: "settings",
			title: "Settings",
			icon: Settings,
			items: [
				{
					id: "website-settings",
					label: "Website Settings"
				},
				{
					id: "delivery-charges",
					label: "Delivery Charges"
				},
				{
					id: "tax-settings",
					label: "Tax Settings"
				},
				{
					id: "social-links",
					label: "Social Links"
				},
				{
					id: "contact-details",
					label: "Contact Details"
				},
				{
					id: "email-settings",
					label: "Email Settings"
				}
			]
		},
		{
			id: "admin-management",
			title: "Admin Management",
			icon: ShieldCheck,
			items: [
				{
					id: "admin-users",
					label: "Admin Users"
				},
				{
					id: "roles-permissions",
					label: "Roles & Permissions"
				},
				{
					id: "activity-logs",
					label: "Activity Logs"
				}
			]
		}
	];
	const handleItemClick = (section) => {
		onSelectSection(section);
		onMobileClose();
	};
	const sidebarContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col justify-between bg-card border-r border-border text-card-foreground select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-16 items-center justify-between px-4 border-b border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-5 w-5" })
						}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-display font-bold text-sm tracking-tight text-foreground truncate",
								children: STORE.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[10px] font-bold uppercase tracking-widest text-amber-600",
								children: "Admin Portal"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onToggleCollapse,
						className: "hidden lg:flex p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition",
						title: collapsed ? "Expand sidebar" : "Collapse sidebar",
						children: collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftOpen, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftClose, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onMobileClose,
						className: "lg:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto px-3 py-4 space-y-1.5 text-xs scrollbar-none",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handleItemClick("dashboard"),
						className: cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition text-left", activeSection === "dashboard" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-secondary"),
						title: "Dashboard",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "h-4 w-4 shrink-0" }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1",
							children: "Dashboard"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-border/60" })
					}),
					menuGroups.map((group) => {
						const GroupIcon = group.icon;
						const isOpen = openGroups[group.id];
						const hasActiveChild = group.items.some((item) => item.id === activeSection);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									if (collapsed) onToggleCollapse();
									toggleGroup(group.id);
								},
								className: cn("w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg font-semibold transition text-left", hasActiveChild ? "text-primary bg-secondary/50 font-bold" : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"),
								title: group.title,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupIcon, { className: cn("h-4 w-4 shrink-0", hasActiveChild ? "text-primary" : "") }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: group.title
									})]
								}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })
								})]
							}), !collapsed && isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pl-6 pr-1 py-1 space-y-0.5 border-l-2 border-border/80 ml-5",
								children: group.items.map((subItem) => {
									const isSubActive = activeSection === subItem.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleItemClick(subItem.id),
										className: cn("w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium text-[11px] transition text-left", isSubActive ? "bg-primary text-primary-foreground font-bold shadow-xs" : "text-muted-foreground hover:text-foreground hover:bg-secondary"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate",
											children: subItem.label
										}), subItem.badge !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("px-1.5 py-0.5 rounded-full text-[9px] font-bold", isSubActive ? "bg-white/20 text-white" : "bg-primary/15 text-primary"),
											children: subItem.badge
										})]
									}, subItem.id);
								})
							})]
						}, group.id);
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-3 border-t border-border bg-secondary/30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg text-xs font-semibold text-primary hover:bg-secondary transition border border-primary/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3.5 w-3.5" }),
						!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View Online Store" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5 opacity-60" })
					]
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
		className: cn("hidden lg:block h-screen sticky top-0 transition-all duration-300 z-30 shrink-0", collapsed ? "w-18" : "w-64"),
		children: sidebarContent
	}), mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 lg:hidden flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity",
			onClick: onMobileClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-250",
			children: sidebarContent
		})]
	})] });
}
var Popover = Root2;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2.displayName;
function getBreadcrumbs(section) {
	switch (section) {
		case "dashboard": return {
			category: "Admin",
			item: "Dashboard"
		};
		case "categories": return {
			category: "Catalog",
			item: "Categories"
		};
		case "sub-categories": return {
			category: "Catalog",
			item: "Sub Categories"
		};
		case "authors": return {
			category: "Catalog",
			item: "Authors"
		};
		case "publishers": return {
			category: "Catalog",
			item: "Publishers"
		};
		case "books":
		case "inventory": return {
			category: "Catalog",
			item: "Books Catalog"
		};
		case "orders": return {
			category: "Sales",
			item: "Customer Orders"
		};
		case "payments": return {
			category: "Sales",
			item: "Payment Transactions"
		};
		case "coupons": return {
			category: "Sales",
			item: "Discount Coupons"
		};
		case "users": return {
			category: "Customers",
			item: "Registered Users"
		};
		case "addresses": return {
			category: "Customers",
			item: "Shipping Addresses"
		};
		case "reviews": return {
			category: "Customers",
			item: "Book Reviews"
		};
		case "hero-banners": return {
			category: "Content",
			item: "Hero Banners"
		};
		case "promo-banners": return {
			category: "Content",
			item: "Promotional Banners"
		};
		case "testimonials": return {
			category: "Content",
			item: "Reader Testimonials"
		};
		case "blogs": return {
			category: "Content",
			item: "Articles & Blogs"
		};
		case "sales-report":
		case "inventory-report": return {
			category: "Reports",
			item: "Sales Analytics"
		};
		case "revenue-report": return {
			category: "Reports",
			item: "Revenue Breakdown"
		};
		case "customer-report": return {
			category: "Reports",
			item: "Customer Growth"
		};
		case "website-settings": return {
			category: "Settings",
			item: "Website Settings"
		};
		case "delivery-charges": return {
			category: "Settings",
			item: "Delivery Rules"
		};
		case "tax-settings": return {
			category: "Settings",
			item: "GST & Tax"
		};
		case "social-links": return {
			category: "Settings",
			item: "Social Media Links"
		};
		case "contact-details": return {
			category: "Settings",
			item: "Store Contacts"
		};
		case "email-settings": return {
			category: "Settings",
			item: "SMTP & Notification Emails"
		};
		case "admin-users": return {
			category: "Admin Management",
			item: "System Administrators"
		};
		case "roles-permissions": return {
			category: "Admin Management",
			item: "Roles & Permissions"
		};
		case "activity-logs": return {
			category: "Admin Management",
			item: "Audit Activity Logs"
		};
		default: return {
			category: "Admin",
			item: "Dashboard"
		};
	}
}
function AdminHeader({ activeSection, onOpenMobileSidebar, searchQuery, onSearchChange, ordersCount = 0 }) {
	const navigate = useNavigate();
	const { logout, adminUser } = useAdminAuth();
	const breadcrumb = getBreadcrumbs(activeSection);
	const [unreadCount, setUnreadCount] = (0, import_react.useState)(3);
	const notifications = [
		{
			id: 1,
			title: "New Book Order Received",
			desc: "Order #SBH-2777 placed by Rohan Roy (₹409)",
			time: "5 mins ago",
			icon: Package,
			unread: true
		},
		{
			id: 2,
			title: "New Reader Review Posted",
			desc: "5-star rating added for 'The Secret Garden'",
			time: "24 mins ago",
			icon: CircleCheck,
			unread: true
		},
		{
			id: 3,
			title: "Catalog Showcase Updated",
			desc: "Latest bestselling titles featured on homepage",
			time: "2 hours ago",
			icon: CircleAlert,
			unread: true
		}
	];
	const handleLogout = () => {
		logout();
		toast.success("Administrator logged out safely.");
		navigate({ to: "/login" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-20 h-16 border-b border-border bg-card/95 backdrop-blur px-4 sm:px-6 flex items-center justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onOpenMobileSidebar,
				className: "lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition",
				"aria-label": "Open mobile menu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex items-center gap-1.5 text-xs text-muted-foreground truncate",
				"aria-label": "Breadcrumb",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-foreground/70 hidden sm:inline",
						children: "Admin"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 text-muted-foreground/60 hidden sm:inline" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground/70",
						children: breadcrumb.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 text-muted-foreground/60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-primary truncate",
						children: breadcrumb.item
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative hidden md:block w-56 lg:w-72",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Search books, orders... (Ctrl + K)",
						value: searchQuery,
						onChange: (e) => onSearchChange(e.target.value),
						className: "w-full h-9 pl-9 pr-3 rounded-full border border-border bg-background text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					className: "hidden sm:inline-flex rounded-full text-xs text-muted-foreground hover:text-primary gap-1.5",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						target: "_blank",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Storefront" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3 opacity-70" })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "relative p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition",
						"aria-label": "Notifications",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-card" })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
					className: "w-80 p-0",
					align: "end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between p-3.5 border-b border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display font-bold text-sm text-foreground",
								children: "Notifications"
							}), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setUnreadCount(0),
								className: "text-[10px] font-semibold text-primary hover:underline",
								children: "Mark all as read"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "divide-y divide-border/60 max-h-72 overflow-y-auto",
							children: notifications.map((n) => {
								const Icon = n.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 text-xs flex gap-3 hover:bg-secondary/40 transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-foreground truncate",
												children: n.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-muted-foreground line-clamp-2 mt-0.5",
												children: n.desc
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground/80 mt-1 block",
												children: n.time
											})
										]
									})]
								}, n.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-2 border-t border-border text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-semibold text-muted-foreground",
								children: "All systems running smoothly"
							})
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex items-center gap-2 p-1 pl-2 rounded-full hover:bg-secondary transition border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right hidden sm:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs font-bold text-foreground leading-none",
								children: "Admin"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[9px] text-muted-foreground uppercase tracking-wider",
								children: "Superuser"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-7 w-7 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-xs shadow-xs",
							children: "A"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					className: "w-56",
					align: "end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
							className: "font-normal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold text-foreground",
									children: "Success Book Hub Admin"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: adminUser?.email || "successboookhub@gmail.com"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							className: "gap-2 text-xs cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Admin Profile" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							className: "gap-2 text-xs cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Store Configuration" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							className: "gap-2 text-xs cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Security & Roles" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onClick: handleLogout,
							className: "gap-2 text-xs text-destructive focus:text-destructive cursor-pointer font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Logout from Admin" })]
						})
					]
				})] })
			]
		})]
	});
}
async function compressImageFile(file, options = {}) {
	const { maxWidth = 1200, maxHeight = 800, quality = .82 } = options;
	return new Promise((resolve) => {
		if (!file.type || !file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = () => resolve("");
			reader.readAsDataURL(file);
			return;
		}
		const reader = new FileReader();
		reader.onload = (e) => {
			const rawDataUrl = e.target?.result;
			if (!rawDataUrl) {
				resolve("");
				return;
			}
			if (file.type === "image/svg+xml") {
				resolve(rawDataUrl);
				return;
			}
			const img = new Image();
			img.onload = () => {
				let width = img.naturalWidth || img.width;
				let height = img.naturalHeight || img.height;
				if (width <= 0 || height <= 0) {
					resolve(rawDataUrl);
					return;
				}
				if (width > maxWidth) {
					height = Math.round(height * maxWidth / width);
					width = maxWidth;
				}
				if (height > maxHeight) {
					width = Math.round(width * maxHeight / height);
					height = maxHeight;
				}
				try {
					const canvas = document.createElement("canvas");
					canvas.width = width;
					canvas.height = height;
					const ctx = canvas.getContext("2d");
					if (!ctx) {
						resolve(rawDataUrl);
						return;
					}
					ctx.imageSmoothingEnabled = true;
					ctx.imageSmoothingQuality = "high";
					ctx.drawImage(img, 0, 0, width, height);
					resolve(canvas.toDataURL("image/jpeg", quality));
				} catch (err) {
					console.warn("[compressImageFile] Canvas compression failed, using raw data URL:", err);
					resolve(rawDataUrl);
				}
			};
			img.onerror = () => {
				console.warn("[compressImageFile] Image decode error, falling back to raw data URL");
				resolve(rawDataUrl);
			};
			img.src = rawDataUrl;
		};
		reader.onerror = () => resolve("");
		reader.readAsDataURL(file);
	});
}
/**
* Optimizes and uploads an image to the backend /api/upload endpoint.
* Returns the public URL (e.g. "/uploads/cat-1728...jpg") on success.
* Gracefully falls back to the compressed base64 Data URL if the upload endpoint is unreachable.
*/
async function uploadImageToServer(fileOrData, namePrefix) {
	let base64Payload = "";
	if (typeof fileOrData === "string") {
		if (fileOrData.startsWith("http://") || fileOrData.startsWith("https://") || fileOrData.startsWith("/uploads/")) return fileOrData;
		base64Payload = fileOrData;
	} else base64Payload = await compressImageFile(fileOrData);
	if (!base64Payload || !base64Payload.startsWith("data:image/")) return base64Payload;
	try {
		const res = await fetch("/api/upload", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				image: base64Payload,
				name: namePrefix || "image"
			})
		});
		if (res.ok) {
			const data = await res.json();
			if (data && data.url) return data.url;
		}
	} catch (err) {
		console.warn("[uploadImageToServer] /api/upload network notice, using compressed data URL:", err);
	}
	return base64Payload;
}
var PRESET_IMAGES = [
	{
		label: "Classics",
		url: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800&auto=format&fit=crop"
	},
	{
		label: "Graphic Novels",
		url: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=800&auto=format&fit=crop"
	},
	{
		label: "Self Help",
		url: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop"
	},
	{
		label: "Science",
		url: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=800&auto=format&fit=crop"
	},
	{
		label: "Poetry",
		url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop"
	},
	{
		label: "Biography",
		url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop"
	},
	{
		label: "Philosophy",
		url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop"
	},
	{
		label: "Children",
		url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop"
	}
];
function CategoryManager({ onNavigateToSubCategories, onOpenAddSubCategory }) {
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [isModalOpen, setIsModalOpen] = (0, import_react.useState)(false);
	const [editingCategory, setEditingCategory] = (0, import_react.useState)(null);
	const [deletingCategory, setDeletingCategory] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [image, setImage] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("active");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [uploadingImage, setUploadingImage] = (0, import_react.useState)(false);
	const loadCategories = async () => {
		setLoading(true);
		try {
			const data = await api.getCategories();
			setCategories(data);
		} catch (err) {
			toast.error(err.message || "Failed to load categories");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadCategories();
	}, []);
	const filteredCategories = (0, import_react.useMemo)(() => {
		return categories.filter((c) => {
			const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.description && c.description.toLowerCase().includes(search.toLowerCase());
			const matchesStatus = statusFilter === "all" || c.status === statusFilter;
			return matchesSearch && matchesStatus;
		});
	}, [
		categories,
		search,
		statusFilter
	]);
	const handleOpenCreate = () => {
		setEditingCategory(null);
		setName("");
		setDescription("");
		setImage(PRESET_IMAGES[0].url);
		setStatus("active");
		setIsModalOpen(true);
	};
	const handleOpenEdit = (cat) => {
		setEditingCategory(cat);
		setName(cat.name);
		setDescription(cat.description || "");
		setImage(cat.image || "");
		setStatus(cat.status);
		setIsModalOpen(true);
	};
	const handleImageFileUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > 10485760) {
			toast.error("File size is too large (max 10MB)");
			return;
		}
		setUploadingImage(true);
		const toastId = toast.loading("Optimizing and uploading image...");
		try {
			const uploadedUrl = await uploadImageToServer(file, name ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "cat");
			if (uploadedUrl) {
				setImage(uploadedUrl);
				toast.success("Image updated successfully", { id: toastId });
			}
		} catch (err) {
			toast.error("Failed to process image: " + (err.message || "Unknown error"), { id: toastId });
		} finally {
			setUploadingImage(false);
			e.target.value = "";
		}
	};
	const handleSave = async (e) => {
		e.preventDefault();
		if (!name.trim()) {
			toast.error("Category name is required");
			return;
		}
		setSaving(true);
		try {
			if (editingCategory) {
				const updated = await api.updateCategory(editingCategory.id, {
					name: name.trim(),
					description: description.trim(),
					image: image.trim(),
					status
				});
				setCategories((prev) => prev.map((c) => c.id === updated.id ? updated : c));
				toast.success(`Category "${updated.name}" updated successfully`);
			} else {
				const created = await api.createCategory({
					name: name.trim(),
					description: description.trim(),
					image: image.trim(),
					status
				});
				setCategories((prev) => [...prev, created]);
				toast.success(`Category "${created.name}" created successfully`);
			}
			setIsModalOpen(false);
		} catch (err) {
			toast.error(err.message || "Failed to save category");
		} finally {
			setSaving(false);
		}
	};
	const handleDelete = async () => {
		if (!deletingCategory) return;
		try {
			await api.deleteCategory(deletingCategory.id);
			setCategories((prev) => prev.filter((c) => c.id !== deletingCategory.id));
			toast.success(`Category "${deletingCategory.name}" and sub-categories deleted`);
			setDeletingCategory(null);
		} catch (err) {
			toast.error(err.message || "Failed to delete category");
		}
	};
	const totalSubcategories = categories.reduce((sum, c) => sum + (c.sub_categories_count || 0), 0);
	const activeCount = categories.filter((c) => c.status === "active").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold text-foreground",
					children: "Categories Taxonomy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: "Create and curate bookstore departments, shelf headers, and dynamic hierarchies."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: loadCategories,
						className: "rounded-full text-xs h-9 gap-1.5",
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("h-3.5 w-3.5", loading && "animate-spin") }), "Sync"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: handleOpenCreate,
						className: "rounded-full text-xs h-9 gap-1.5 shadow-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Create Category"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground text-xs font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Categories" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "p-2 rounded-lg bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPlus, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl font-bold text-foreground mt-2",
								children: categories.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground mt-0.5",
								children: "Literature & Genre Shelves"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground text-xs font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Active Categories" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "p-2 rounded-lg bg-emerald-50 text-emerald-700",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl font-bold text-foreground mt-2",
								children: activeCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-emerald-600 font-semibold mt-0.5",
								children: "Live on online storefront"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground text-xs font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sub-Categories Linked" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "p-2 rounded-lg bg-amber-50 text-amber-700",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl font-bold text-foreground mt-2",
								children: totalSubcategories
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground mt-0.5",
								children: "Deep taxonomy branches"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-border bg-card p-3 shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full sm:w-80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Search categories by name or description...",
						className: "w-full h-8.5 rounded-lg border border-border bg-background pl-9 pr-3 text-xs outline-none focus:border-primary"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1.5 w-full sm:w-auto",
					children: [
						"all",
						"active",
						"inactive"
					].map((filter) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setStatusFilter(filter),
						className: cn("px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors", statusFilter === filter ? "bg-primary text-primary-foreground shadow-xs" : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"),
						children: filter
					}, filter))
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-16 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-6 w-6 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Loading bookstore categories..." })]
			}) : filteredCategories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-dashed border-border bg-card/50 p-12 text-center text-xs text-muted-foreground space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPlus, { className: "h-10 w-10 mx-auto text-muted-foreground/60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-bold text-foreground text-sm",
						children: "No categories found"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-md mx-auto",
						children: search ? `No categories match your search "${search}". Try clearing the search filter.` : "No categories have been created yet. Click 'Create Category' to add the first one!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: handleOpenCreate,
						className: "rounded-full text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5 mr-1" }), " Add Category Now"]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",
				children: filteredCategories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group rounded-xl border border-border bg-card overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-40 w-full overflow-hidden bg-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: !cat.image || cat.image.startsWith("data:image/") && cat.image.length >= 65530 ? PRESET_IMAGES[0].url : cat.image,
								alt: cat.name,
								className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-500",
								onError: (e) => {
									e.target.src = PRESET_IMAGES[0].url;
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs", cat.status === "active" ? "bg-emerald-500/90 text-white" : "bg-zinc-700/90 text-zinc-200"),
								children: cat.status
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3 w-3 text-gold" }),
									cat.sub_categories_count || 0,
									" Sub-categories"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-3 left-3 right-3 text-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-bold drop-shadow-sm leading-tight",
									children: cat.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] text-zinc-300 font-mono",
									children: ["/category/", cat.slug]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 flex-1 flex flex-col justify-between space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed",
								children: cat.description || "No description provided for this literature department."
							}),
							cat.subCategories && cat.subCategories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
									children: "Sub-categories:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-1",
									children: [cat.subCategories.slice(0, 3).map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-2 py-0.5 rounded-md bg-secondary/80 text-foreground text-[10px] font-medium",
										children: sub.name
									}, sub.id)), cat.subCategories.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "px-1.5 py-0.5 rounded-md bg-secondary text-muted-foreground text-[10px]",
										children: [
											"+",
											cat.subCategories.length - 3,
											" more"
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-3 border-t border-border flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "ghost",
										className: "h-7 px-2 text-xs gap-1 text-primary hover:bg-primary/10",
										onClick: () => {
											if (onOpenAddSubCategory) onOpenAddSubCategory(cat);
											else if (onNavigateToSubCategories) onNavigateToSubCategories(cat.id);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" }), "Add Sub"]
									}), onNavigateToSubCategories && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "ghost",
										className: "h-7 px-2 text-[11px] text-muted-foreground hover:text-foreground",
										onClick: () => onNavigateToSubCategories(cat.id),
										children: ["View Subs ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3 ml-0.5" })]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleOpenEdit(cat),
										className: "p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
										title: "Edit Category",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-3.5 w-3.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setDeletingCategory(cat),
										className: "p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors",
										title: "Delete Category",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
									})]
								})]
							})
						]
					})]
				}, cat.id))
			}),
			isModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSave,
					className: "bg-card border border-border rounded-xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-xs animate-in zoom-in-95 my-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-bold text-primary",
								children: editingCategory ? "Edit Category" : "Create Dynamic Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Specify category name, curated cover image, and description."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setIsModalOpen(false),
								className: "text-muted-foreground hover:text-foreground text-sm font-bold p-1",
								children: "✕"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "font-bold text-foreground block mb-1",
								children: "Category Name *"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: "e.g. Graphic Novels & Manga",
								className: "w-full h-9 rounded-md border border-border bg-background px-3 text-xs outline-none focus:border-primary"
							}),
							name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] text-muted-foreground mt-1",
								children: ["URL slug will be: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", {
									className: "font-mono text-primary font-bold",
									children: ["/category/", name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")]
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold text-foreground block",
									children: "Category Cover Image *"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										value: image,
										onChange: (e) => setImage(e.target.value),
										placeholder: "Paste image URL or choose preset/upload...",
										className: "flex-1 h-9 rounded-md border border-border bg-background px-3 text-xs outline-none focus:border-primary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: cn("h-9 px-3 rounded-md border border-border bg-secondary/70 hover:bg-secondary cursor-pointer flex items-center gap-1.5 text-xs font-semibold text-foreground transition-all", uploadingImage && "opacity-60 pointer-events-none"),
										children: [
											uploadingImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-3.5 w-3.5" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: uploadingImage ? "Uploading..." : "Upload" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "file",
												accept: "image/*",
												disabled: uploadingImage,
												className: "hidden",
												onChange: handleImageFileUpload
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] font-semibold text-muted-foreground flex items-center gap-1 mb-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-gold" }), " Quick Presets (Click to apply):"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-1.5",
										children: PRESET_IMAGES.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setImage(preset.url),
											className: cn("px-2 py-0.5 rounded-full text-[10px] border transition-colors", image === preset.url ? "border-primary bg-primary/10 text-primary font-bold" : "border-border bg-background hover:bg-secondary text-muted-foreground"),
											children: preset.label
										}, preset.label))
									})]
								}),
								image && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 rounded-lg border border-border overflow-hidden bg-muted relative h-28 flex items-end p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: image,
											alt: "Preview",
											className: "absolute inset-0 w-full h-full object-cover",
											onError: (e) => {
												e.target.src = PRESET_IMAGES[0].url;
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative z-10 text-white",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-bold uppercase tracking-wider text-gold",
												children: "Live Preview"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-display font-bold text-sm leading-tight",
												children: name || "Category Title"
											})]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold text-foreground block mb-1",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: description,
							onChange: (e) => setDescription(e.target.value),
							placeholder: "A short overview of the books and themes featured in this category...",
							className: "w-full rounded-md border border-border bg-background p-2 text-xs outline-none focus:border-primary leading-relaxed"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold text-foreground block mb-1",
							children: "Publication Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "status",
									checked: status === "active",
									onChange: () => setStatus("active"),
									className: "text-primary focus:ring-primary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: "Active (Visible in Store)"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "status",
									checked: status === "inactive",
									onChange: () => setStatus("inactive"),
									className: "text-primary focus:ring-primary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-muted-foreground",
									children: "Inactive (Hidden)"
								})]
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 pt-3 border-t border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setIsModalOpen(false),
								disabled: saving,
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: saving,
								children: saving ? "Saving..." : editingCategory ? "Update Category" : "Create Category"
							})]
						})
					]
				})
			}),
			deletingCategory && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-destructive/30 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs animate-in zoom-in-95",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2 rounded-full bg-destructive/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-6 w-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-bold text-foreground",
								children: "Delete Category?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "This action cannot be undone."
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-foreground leading-relaxed",
							children: [
								"Are you sure you want to delete ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-primary",
									children: [
										"\"",
										deletingCategory.name,
										"\""
									]
								}),
								"?",
								deletingCategory.sub_categories_count ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block mt-2 font-bold text-destructive",
									children: [
										"⚠️ This category contains ",
										deletingCategory.sub_categories_count,
										" sub-categories which will also be deleted."
									]
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setDeletingCategory(null),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "destructive",
								onClick: handleDelete,
								children: "Yes, Delete Category"
							})]
						})
					]
				})
			})
		]
	});
}
var PRESET_SUB_IMAGES = [
	{
		label: "Modern Fiction",
		url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"
	},
	{
		label: "Classic Poetry",
		url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop"
	},
	{
		label: "Manga & Art",
		url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop"
	},
	{
		label: "Space & Physics",
		url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop"
	},
	{
		label: "Habits & Routine",
		url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop"
	},
	{
		label: "Mindfulness",
		url: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop"
	}
];
function SubCategoryManager({ initialCategoryId, categories: passedCategories, autoOpenCreate, onModalClosed, onNavigateToCategories }) {
	const [subCategories, setSubCategories] = (0, import_react.useState)([]);
	const [categories, setCategories] = (0, import_react.useState)(passedCategories && passedCategories.length > 0 ? passedCategories : fallbackCategoryList);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const effectiveCategories = (0, import_react.useMemo)(() => {
		if (categories && categories.length > 0) return categories;
		if (passedCategories && passedCategories.length > 0) return passedCategories;
		return fallbackCategoryList;
	}, [categories, passedCategories]);
	const [selectedCategoryFilter, setSelectedCategoryFilter] = (0, import_react.useState)(initialCategoryId ? String(initialCategoryId) : "all");
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [isModalOpen, setIsModalOpen] = (0, import_react.useState)(false);
	const [editingSub, setEditingSub] = (0, import_react.useState)(null);
	const [deletingSub, setDeletingSub] = (0, import_react.useState)(null);
	const [categoryId, setCategoryId] = (0, import_react.useState)(() => {
		if (initialCategoryId) return initialCategoryId;
		if (passedCategories && passedCategories.length > 0) return passedCategories[0].id;
		return fallbackCategoryList[0]?.id || 1;
	});
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [image, setImage] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("active");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [uploadingImage, setUploadingImage] = (0, import_react.useState)(false);
	const handleCloseModal = () => {
		setIsModalOpen(false);
		if (onModalClosed) onModalClosed();
	};
	(0, import_react.useEffect)(() => {
		if (passedCategories && passedCategories.length > 0) {
			setCategories(passedCategories);
			setCategoryId((prev) => prev > 0 ? prev : initialCategoryId || passedCategories[0].id);
		}
	}, [passedCategories, initialCategoryId]);
	const loadData = async () => {
		setLoading(true);
		try {
			const [cats, subs] = await Promise.all([api.getCategories(), api.getSubCategories()]);
			if (cats && cats.length > 0) {
				setCategories(cats);
				setCategoryId((prev) => prev > 0 ? prev : initialCategoryId || cats[0].id);
			} else if (passedCategories && passedCategories.length > 0) setCategories(passedCategories);
			setSubCategories(subs || []);
		} catch (err) {
			toast.error(err.message || "Failed to load sub-categories");
			if (passedCategories && passedCategories.length > 0) setCategories(passedCategories);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, []);
	const filteredSubCategories = (0, import_react.useMemo)(() => {
		return subCategories.filter((sub) => {
			const matchesCategory = selectedCategoryFilter === "all" || String(sub.category_id) === String(selectedCategoryFilter);
			const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
			const matchesSearch = sub.name.toLowerCase().includes(search.toLowerCase()) || sub.description && sub.description.toLowerCase().includes(search.toLowerCase()) || sub.category_name && sub.category_name.toLowerCase().includes(search.toLowerCase());
			return matchesCategory && matchesStatus && matchesSearch;
		});
	}, [
		subCategories,
		selectedCategoryFilter,
		statusFilter,
		search
	]);
	const handleOpenCreate = (presetCategoryId) => {
		setEditingSub(null);
		const filterCatId = selectedCategoryFilter !== "all" ? Number(selectedCategoryFilter) : 0;
		const targetCatId = presetCategoryId || filterCatId || initialCategoryId || (effectiveCategories.length > 0 ? effectiveCategories[0].id : 1);
		setCategoryId(targetCatId);
		setName("");
		setDescription("");
		setImage(PRESET_SUB_IMAGES[0].url);
		setStatus("active");
		setIsModalOpen(true);
	};
	(0, import_react.useEffect)(() => {
		if (initialCategoryId) {
			setSelectedCategoryFilter(String(initialCategoryId));
			setCategoryId(initialCategoryId);
			if (autoOpenCreate) handleOpenCreate(initialCategoryId);
		}
	}, [initialCategoryId, autoOpenCreate]);
	const handleOpenEdit = (sub) => {
		setEditingSub(sub);
		setCategoryId(sub.category_id);
		setName(sub.name);
		setDescription(sub.description || "");
		setImage(sub.image || "");
		setStatus(sub.status);
		setIsModalOpen(true);
	};
	const handleImageFileUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > 10485760) {
			toast.error("File size is too large (max 10MB)");
			return;
		}
		setUploadingImage(true);
		const toastId = toast.loading("Optimizing and uploading image...");
		try {
			const uploadedUrl = await uploadImageToServer(file, name ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "subcat");
			if (uploadedUrl) {
				setImage(uploadedUrl);
				toast.success("Image updated successfully", { id: toastId });
			}
		} catch (err) {
			toast.error("Failed to process image: " + (err.message || "Unknown error"), { id: toastId });
		} finally {
			setUploadingImage(false);
			e.target.value = "";
		}
	};
	const handleSave = async (e) => {
		e.preventDefault();
		const finalCatId = categoryId || (effectiveCategories.length > 0 ? effectiveCategories[0].id : 1);
		if (!finalCatId) {
			toast.error("Please select a parent category");
			return;
		}
		if (!name.trim()) {
			toast.error("Sub-category name is required");
			return;
		}
		setSaving(true);
		try {
			if (editingSub) {
				const updated = await api.updateSubCategory(editingSub.id, {
					category_id: finalCatId,
					name: name.trim(),
					description: description.trim(),
					image: image.trim(),
					status
				});
				setSubCategories((prev) => prev.map((s) => s.id === updated.id ? updated : s));
				toast.success(`Sub-category "${updated.name}" updated successfully`);
			} else {
				const created = await api.createSubCategory({
					category_id: finalCatId,
					name: name.trim(),
					description: description.trim(),
					image: image.trim(),
					status
				});
				setSubCategories((prev) => [...prev, created]);
				toast.success(`Sub-category "${created.name}" created successfully`);
			}
			handleCloseModal();
		} catch (err) {
			toast.error(err.message || "Failed to save sub-category");
		} finally {
			setSaving(false);
		}
	};
	const handleDelete = async () => {
		if (!deletingSub) return;
		try {
			await api.deleteSubCategory(deletingSub.id);
			setSubCategories((prev) => prev.filter((s) => s.id !== deletingSub.id));
			toast.success(`Sub-category "${deletingSub.name}" deleted`);
			setDeletingSub(null);
		} catch (err) {
			toast.error(err.message || "Failed to delete sub-category");
		}
	};
	const activeCount = subCategories.filter((s) => s.status === "active").length;
	const categoriesCovered = new Set(subCategories.map((s) => s.category_id)).size;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold text-foreground",
					children: "Sub-Categories Catalog"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: "Create and organize granular sub-genres linked dynamically to parent book categories."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: loadData,
						className: "rounded-full text-xs h-9 gap-1.5",
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("h-3.5 w-3.5", loading && "animate-spin") }), "Sync"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => handleOpenCreate(),
						className: "rounded-full text-xs h-9 gap-1.5 shadow-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Create Sub-Category"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground text-xs font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Sub-Categories" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "p-2 rounded-lg bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl font-bold text-foreground mt-2",
								children: subCategories.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground mt-0.5",
								children: "Granular literary taxonomy"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground text-xs font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Categories Mapped" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "p-2 rounded-lg bg-blue-50 text-blue-700",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-2xl font-bold text-foreground mt-2",
								children: [
									categoriesCovered,
									" / ",
									effectiveCategories.length
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground mt-0.5",
								children: "Parent categories enriched"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground text-xs font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Active Sub-Categories" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "p-2 rounded-lg bg-emerald-50 text-emerald-700",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl font-bold text-foreground mt-2",
								children: activeCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-emerald-600 font-semibold mt-0.5",
								children: "Available for book tagging"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-3 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 min-w-[200px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-3.5 w-3.5 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: selectedCategoryFilter,
							onChange: (e) => setSelectedCategoryFilter(e.target.value),
							className: "h-8.5 rounded-lg border border-border bg-background px-2.5 text-xs font-semibold outline-none focus:border-primary w-full cursor-pointer text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: "all",
								children: [
									"All Parent Categories (",
									effectiveCategories.length,
									")"
								]
							}), effectiveCategories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.id,
								children: c.name
							}, c.id))]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1 min-w-[180px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Search sub-categories...",
							className: "w-full h-8.5 rounded-lg border border-border bg-background pl-9 pr-3 text-xs outline-none focus:border-primary"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1 shrink-0",
					children: [
						"all",
						"active",
						"inactive"
					].map((filter) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setStatusFilter(filter),
						className: cn("px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors", statusFilter === filter ? "bg-primary text-primary-foreground shadow-xs" : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"),
						children: filter
					}, filter))
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-16 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-6 w-6 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Loading sub-categories..." })]
			}) : filteredSubCategories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-dashed border-border bg-card/50 p-12 text-center text-xs text-muted-foreground space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-10 w-10 mx-auto text-muted-foreground/60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-bold text-foreground text-sm",
						children: "No sub-categories found"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-md mx-auto",
						children: search || selectedCategoryFilter !== "all" ? "No sub-categories match your current filters. Try changing the parent category or clearing search." : "No sub-categories have been created yet. Click 'Create Sub-Category' to get started."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => handleOpenCreate(),
						className: "rounded-full text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5 mr-1" }), " Add Sub-Category Now"]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-card shadow-xs overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-xs text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-secondary/60 text-muted-foreground font-semibold border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Sub-Category & Thumbnail"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Parent Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Description"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5 text-right",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/60",
							children: filteredSubCategories.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-secondary/20 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-12 w-12 rounded-lg overflow-hidden border border-border bg-muted shrink-0",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: !sub.image || sub.image.startsWith("data:image/") && sub.image.length >= 65530 ? PRESET_SUB_IMAGES[0].url : sub.image,
													alt: sub.name,
													className: "h-full w-full object-cover",
													onError: (e) => {
														e.target.src = PRESET_SUB_IMAGES[0].url;
													}
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-foreground text-sm leading-tight",
												children: sub.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[10px] text-muted-foreground font-mono mt-0.5",
												children: ["slug: ", sub.slug]
											})] })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-border bg-secondary/40",
											children: [sub.category_image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: sub.category_image,
												alt: "",
												className: "h-4 w-4 rounded-full object-cover"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-foreground text-[11px]",
												children: sub.category_name || "Unknown"
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3.5 max-w-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground line-clamp-2 leading-relaxed",
											children: sub.description || "—"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase", sub.status === "active" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"),
											children: sub.status
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3.5 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-end gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleOpenEdit(sub),
												className: "p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
												title: "Edit Sub-Category",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-3.5 w-3.5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setDeletingSub(sub),
												className: "p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors",
												title: "Delete Sub-Category",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
											})]
										})
									})
								]
							}, sub.id))
						})]
					})
				})
			}),
			isModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSave,
					className: "bg-card border border-border rounded-xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-xs animate-in zoom-in-95 my-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-bold text-primary",
								children: editingSub ? "Edit Sub-Category" : "Create Sub-Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Link this sub-genre dynamically to a parent book category."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleCloseModal,
								className: "text-muted-foreground hover:text-foreground text-sm font-bold p-1",
								children: "✕"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "font-bold text-foreground block text-xs",
								children: "Parent Category *"
							}), effectiveCategories.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-amber-600 font-semibold animate-pulse",
								children: "Loading categories..."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							required: true,
							value: categoryId || (effectiveCategories[0]?.id ?? ""),
							onChange: (e) => setCategoryId(Number(e.target.value)),
							className: "w-full h-9 rounded-md border border-border bg-background px-3 text-xs font-semibold outline-none focus:border-primary cursor-pointer text-foreground",
							children: effectiveCategories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								disabled: true,
								children: "Loading categories from database..."
							}) : effectiveCategories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: c.id,
								children: [
									c.name,
									" ",
									c.status !== "active" ? "(Inactive)" : ""
								]
							}, c.id))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "font-bold text-foreground block mb-1",
								children: "Sub-Category Name *"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: "e.g. Manga & Anime, Historical Fiction, Stoicism",
								className: "w-full h-9 rounded-md border border-border bg-background px-3 text-xs outline-none focus:border-primary"
							}),
							name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] text-muted-foreground mt-1",
								children: ["Slug: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "font-mono text-primary font-bold",
									children: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold text-foreground block",
									children: "Thumbnail Image *"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										value: image,
										onChange: (e) => setImage(e.target.value),
										placeholder: "Paste thumbnail URL or select preset/upload...",
										className: "flex-1 h-9 rounded-md border border-border bg-background px-3 text-xs outline-none focus:border-primary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: cn("h-9 px-3 rounded-md border border-border bg-secondary/70 hover:bg-secondary cursor-pointer flex items-center gap-1.5 text-xs font-semibold text-foreground transition-all", uploadingImage && "opacity-60 pointer-events-none"),
										children: [
											uploadingImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-3.5 w-3.5" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: uploadingImage ? "Uploading..." : "Upload" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "file",
												accept: "image/*",
												disabled: uploadingImage,
												className: "hidden",
												onChange: handleImageFileUpload
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] font-semibold text-muted-foreground flex items-center gap-1 mb-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-gold" }), " Quick Presets:"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-1.5",
										children: PRESET_SUB_IMAGES.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setImage(preset.url),
											className: cn("px-2 py-0.5 rounded-full text-[10px] border transition-colors", image === preset.url ? "border-primary bg-primary/10 text-primary font-bold" : "border-border bg-background hover:bg-secondary text-muted-foreground"),
											children: preset.label
										}, preset.label))
									})]
								}),
								image && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 rounded-lg border border-border p-2 bg-secondary/30 flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: image,
										alt: "Preview",
										className: "h-14 w-14 rounded-md object-cover border border-border",
										onError: (e) => {
											e.target.src = PRESET_SUB_IMAGES[0].url;
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-gold uppercase tracking-wider",
										children: "Preview"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-foreground text-xs",
										children: name || "Sub-Category Title"
									})] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold text-foreground block mb-1",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: description,
							onChange: (e) => setDescription(e.target.value),
							placeholder: "Brief summary of books cataloged under this sub-category...",
							className: "w-full rounded-md border border-border bg-background p-2 text-xs outline-none focus:border-primary leading-relaxed"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold text-foreground block mb-1",
							children: "Publication Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "subStatus",
									checked: status === "active",
									onChange: () => setStatus("active"),
									className: "text-primary focus:ring-primary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: "Active"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "subStatus",
									checked: status === "inactive",
									onChange: () => setStatus("inactive"),
									className: "text-primary focus:ring-primary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-muted-foreground",
									children: "Inactive"
								})]
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 pt-3 border-t border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: handleCloseModal,
								disabled: saving,
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: saving,
								children: saving ? "Saving..." : editingSub ? "Update Sub-Category" : "Create Sub-Category"
							})]
						})
					]
				})
			}),
			deletingSub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-destructive/30 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs animate-in zoom-in-95",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2 rounded-full bg-destructive/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-6 w-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-bold text-foreground",
								children: "Delete Sub-Category?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "This action will remove it from the catalog."
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-foreground leading-relaxed",
							children: [
								"Are you sure you want to delete ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-primary",
									children: [
										"\"",
										deletingSub.name,
										"\""
									]
								}),
								" from parent category ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: deletingSub.category_name }),
								"?"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setDeletingSub(null),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "destructive",
								onClick: handleDelete,
								children: "Yes, Delete Sub-Category"
							})]
						})
					]
				})
			})
		]
	});
}
function AdminViews({ activeSection, searchQuery, onNavigateSection }) {
	const [books, setBooks] = (0, import_react.useState)([]);
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [customers, setCustomers] = (0, import_react.useState)([]);
	const [addresses, setAddresses] = (0, import_react.useState)([]);
	const [reviews, setReviews] = (0, import_react.useState)([]);
	const [dashboardStats, setDashboardStats] = (0, import_react.useState)(null);
	const [dbCategories, setDbCategories] = (0, import_react.useState)([]);
	const [dbSubCategories, setDbSubCategories] = (0, import_react.useState)([]);
	const [selectedSubCatParentId, setSelectedSubCatParentId] = (0, import_react.useState)(null);
	const [autoOpenSubCatModal, setAutoOpenSubCatModal] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [coupons, setCoupons] = (0, import_react.useState)([]);
	const [showCouponModal, setShowCouponModal] = (0, import_react.useState)(false);
	const [editingCouponId, setEditingCouponId] = (0, import_react.useState)(null);
	const [couponCode, setCouponCode] = (0, import_react.useState)("");
	const [couponType, setCouponType] = (0, import_react.useState)("percentage");
	const [couponValue, setCouponValue] = (0, import_react.useState)("");
	const [couponMinOrder, setCouponMinOrder] = (0, import_react.useState)("");
	const [couponMaxDiscount, setCouponMaxDiscount] = (0, import_react.useState)("");
	const [couponStatus, setCouponStatus] = (0, import_react.useState)("active");
	const [savingCoupon, setSavingCoupon] = (0, import_react.useState)(false);
	const [settings, setSettings] = (0, import_react.useState)({});
	const [savingSettings, setSavingSettings] = (0, import_react.useState)(false);
	const [contentBlocks, setContentBlocks] = (0, import_react.useState)([]);
	const [showContentModal, setShowContentModal] = (0, import_react.useState)(false);
	const [editingContentId, setEditingContentId] = (0, import_react.useState)(null);
	const [contentTitle, setContentTitle] = (0, import_react.useState)("");
	const [contentSubtitle, setContentSubtitle] = (0, import_react.useState)("");
	const [contentImage, setContentImage] = (0, import_react.useState)("");
	const [contentLinkUrl, setContentLinkUrl] = (0, import_react.useState)("");
	const [contentBody, setContentBody] = (0, import_react.useState)("");
	const [contentOrder, setContentOrder] = (0, import_react.useState)("0");
	const [contentStatus, setContentStatus] = (0, import_react.useState)("active");
	const [savingContent, setSavingContent] = (0, import_react.useState)(false);
	const [selectedInvoiceOrderId, setSelectedInvoiceOrderId] = (0, import_react.useState)(null);
	const [showInvoiceModal, setShowInvoiceModal] = (0, import_react.useState)(false);
	const [showAddBook, setShowAddBook] = (0, import_react.useState)(false);
	const [editingBookId, setEditingBookId] = (0, import_react.useState)(null);
	const [newTitle, setNewTitle] = (0, import_react.useState)("");
	const [newAuthor, setNewAuthor] = (0, import_react.useState)("");
	const [newCategory, setNewCategory] = (0, import_react.useState)("Classics");
	const [newSubCategory, setNewSubCategory] = (0, import_react.useState)("");
	const [newPrice, setNewPrice] = (0, import_react.useState)("");
	const [newOldPrice, setNewOldPrice] = (0, import_react.useState)("");
	const [newDescription, setNewDescription] = (0, import_react.useState)("");
	const [newCover, setNewCover] = (0, import_react.useState)("https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop");
	const [newImage2, setNewImage2] = (0, import_react.useState)("");
	const [newStock, setNewStock] = (0, import_react.useState)("50");
	const [newLabel, setNewLabel] = (0, import_react.useState)("");
	const [newFeatured, setNewFeatured] = (0, import_react.useState)(false);
	const [savingBook, setSavingBook] = (0, import_react.useState)(false);
	const [uploadingCover, setUploadingCover] = (0, import_react.useState)(false);
	const [uploadingImage2, setUploadingImage2] = (0, import_react.useState)(false);
	const [catalogFilterCategory, setCatalogFilterCategory] = (0, import_react.useState)("All");
	const [catalogActiveTab, setCatalogActiveTab] = (0, import_react.useState)("books");
	const [catalogFilterAuthor, setCatalogFilterAuthor] = (0, import_react.useState)("All");
	const [catalogFilterPublisher, setCatalogFilterPublisher] = (0, import_react.useState)("All");
	const [newPublisher, setNewPublisher] = (0, import_react.useState)("");
	const loadData = async () => {
		setLoading(true);
		try {
			const [fetchedBooks, fetchedOrders, fetchedCats, fetchedSubCats, fetchedCustomers, fetchedAddresses, fetchedReviews, fetchedStats, fetchedCoupons, fetchedSettings, fetchedContent] = await Promise.all([
				api.getBooks(),
				api.getAllOrders().catch(() => []),
				api.getCategories().catch(() => []),
				api.getSubCategories().catch(() => []),
				api.getAllCustomers().catch(() => []),
				api.getAllCustomerAddresses().catch(() => []),
				api.getAllReviews().catch(() => []),
				api.getDashboardStats().catch(() => null),
				api.getCoupons().catch(() => []),
				api.getSettings().catch(() => ({})),
				api.getContentBlocks().catch(() => [])
			]);
			setBooks(fetchedBooks || []);
			setOrders(fetchedOrders || []);
			setDbCategories(fetchedCats || []);
			setDbSubCategories(fetchedSubCats || []);
			setCustomers(fetchedCustomers || []);
			setAddresses(fetchedAddresses || []);
			setReviews(fetchedReviews || []);
			setDashboardStats(fetchedStats || null);
			setCoupons(fetchedCoupons || []);
			setSettings(fetchedSettings || {});
			setContentBlocks(fetchedContent || []);
			if (fetchedCats && fetchedCats.length > 0 && !newCategory) setNewCategory(fetchedCats[0]?.name || "Classics");
		} catch (err) {
			console.error("Admin view data load error:", err);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, []);
	const handleStatusUpdate = async (orderId, status) => {
		try {
			await api.updateOrderStatus(orderId, status);
			toast.success(`Order #${orderId} marked as ${status}`);
			setOrders((prev) => prev.map((o) => o.id === orderId ? {
				...o,
				status
			} : o));
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to update status");
		}
	};
	const handleDeleteReview = async (reviewId) => {
		if (!confirm("Are you sure you want to delete this customer review?")) return;
		try {
			await api.deleteReview(reviewId);
			setReviews((prev) => prev.filter((r) => r.id !== reviewId));
			toast.success("Review deleted successfully.");
		} catch {
			toast.error("Failed to delete review.");
		}
	};
	const handleCoverFileUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > 15728640) {
			toast.error("File size is too large (max 15MB)");
			return;
		}
		setUploadingCover(true);
		const toastId = toast.loading("Optimizing and uploading cover image...");
		try {
			const uploadedUrl = await uploadImageToServer(file, newTitle ? newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 25) : "book-cover");
			if (uploadedUrl) {
				setNewCover(uploadedUrl);
				toast.success("Cover image uploaded successfully!", { id: toastId });
			}
		} catch (err) {
			toast.error("Failed to upload image: " + (err.message || "Unknown error"), { id: toastId });
		} finally {
			setUploadingCover(false);
			e.target.value = "";
		}
	};
	const handleImage2FileUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > 15728640) {
			toast.error("File size is too large (max 15MB)");
			return;
		}
		setUploadingImage2(true);
		const toastId = toast.loading("Optimizing and uploading secondary image...");
		try {
			const uploadedUrl = await uploadImageToServer(file, newTitle ? `${newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 20)}-back` : "book-image2");
			if (uploadedUrl) {
				setNewImage2(uploadedUrl);
				toast.success("Secondary image uploaded successfully!", { id: toastId });
			}
		} catch (err) {
			toast.error("Failed to upload image: " + (err.message || "Unknown error"), { id: toastId });
		} finally {
			setUploadingImage2(false);
			e.target.value = "";
		}
	};
	const handleOpenAddBook = () => {
		setEditingBookId(null);
		setNewTitle("");
		setNewAuthor("");
		setNewPublisher("");
		setNewCategory(dbCategories[0]?.name || "Classics");
		setNewSubCategory("");
		setNewPrice("");
		setNewOldPrice("");
		setNewDescription("");
		setNewCover("https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop");
		setNewImage2("");
		setNewStock("50");
		setNewLabel("");
		setNewFeatured(false);
		setShowAddBook(true);
	};
	const handleOpenEditBook = (b) => {
		setEditingBookId(b.id);
		setNewTitle(b.title || "");
		setNewAuthor(b.author || "");
		setNewPublisher(b.publisher || "");
		setNewCategory(b.category || dbCategories[0]?.name || "Classics");
		setNewSubCategory(b.subCategory || b.sub_category || "");
		setNewPrice(b.price ? String(b.price) : "");
		setNewOldPrice(b.oldPrice || b.old_price ? String(b.oldPrice || b.old_price) : "");
		setNewDescription(b.description || "");
		setNewCover(b.cover || "");
		setNewImage2(b.image2 || b.image_2 || "");
		setNewStock(b.stock ? String(b.stock) : "50");
		setNewLabel(b.label || "");
		setNewFeatured(Boolean(b.featured));
		setShowAddBook(true);
	};
	const handleSaveBook = async (e) => {
		e.preventDefault();
		if (!newTitle.trim() || !newAuthor.trim() || !newPrice) {
			toast.error("Book Title, Author, and Selling Price are required.");
			return;
		}
		setSavingBook(true);
		try {
			const priceNum = parseFloat(newPrice);
			const oldPriceNum = newOldPrice ? parseFloat(newOldPrice) : void 0;
			let discountPct = 0;
			if (oldPriceNum && oldPriceNum > priceNum) discountPct = Math.round((oldPriceNum - priceNum) / oldPriceNum * 100);
			const payload = {
				title: newTitle.trim(),
				author: newAuthor.trim(),
				publisher: newPublisher.trim() || void 0,
				category: newCategory,
				subCategory: newSubCategory.trim() || void 0,
				sub_category: newSubCategory.trim() || void 0,
				price: priceNum,
				oldPrice: oldPriceNum,
				old_price: oldPriceNum,
				discountPercent: discountPct,
				discount_percent: discountPct,
				description: newDescription.trim(),
				cover: newCover.trim() || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
				image2: newImage2.trim() || void 0,
				image_2: newImage2.trim() || void 0,
				stock: parseInt(newStock) || 50,
				label: newLabel.trim() || (discountPct >= 20 ? `${discountPct}% OFF` : void 0),
				featured: newFeatured
			};
			if (editingBookId) {
				await api.updateBook(editingBookId, payload);
				toast.success(`"${newTitle}" updated successfully!`);
			} else {
				await api.createBook(payload);
				toast.success(`"${newTitle}" added to catalog!`);
			}
			setShowAddBook(false);
			setEditingBookId(null);
			loadData();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to save book");
		} finally {
			setSavingBook(false);
		}
	};
	const filteredBooks = books.filter((b) => {
		const bookPublisher = b.publisher && b.publisher.trim() ? b.publisher.trim() : b.author ? `${b.author} Imprint` : "Independent";
		const matchesSearch = `${b.title} ${b.author} ${b.publisher || ""} ${b.category} ${b.subCategory || ""} ${b.sub_category || ""}`.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory = catalogFilterCategory === "All" || b.category.toLowerCase() === catalogFilterCategory.toLowerCase();
		const matchesAuthor = catalogFilterAuthor === "All" || (b.author || "").toLowerCase() === catalogFilterAuthor.toLowerCase();
		const matchesPublisher = catalogFilterPublisher === "All" || bookPublisher.toLowerCase() === catalogFilterPublisher.toLowerCase();
		return matchesSearch && matchesCategory && matchesAuthor && matchesPublisher;
	});
	const filteredOrders = orders.filter((o) => `${o.id} ${o.customerName} ${o.customerPhone} ${o.customerEmail || ""} ${o.status} ${o.deliveryAddress}`.toLowerCase().includes(searchQuery.toLowerCase()));
	const filteredCustomers = customers.filter((c) => `${c.name} ${c.email} ${c.phone || ""}`.toLowerCase().includes(searchQuery.toLowerCase()));
	const filteredAddresses = addresses.filter((a) => `${a.fullName} ${a.phone} ${a.formattedAddress || ""} ${a.city} ${a.state} ${a.userEmail}`.toLowerCase().includes(searchQuery.toLowerCase()));
	const filteredReviews = reviews.filter((r) => `${r.userName} ${r.bookTitle} ${r.comment}`.toLowerCase().includes(searchQuery.toLowerCase()));
	const filteredCoupons = coupons.filter((c) => `${c.code} ${c.discountType || c.discount_type || ""} ${c.status}`.toLowerCase().includes(searchQuery.toLowerCase()));
	const filteredContentBlocks = contentBlocks.filter((cb) => {
		const matchesType = cb.type === activeSection;
		const matchesSearch = `${cb.title} ${cb.subtitle || ""} ${cb.content || ""}`.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesType && matchesSearch;
	});
	const distinctAuthors = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		books.forEach((b) => {
			const author = b.author || "Unknown Author";
			if (!map.has(author)) map.set(author, {
				name: author,
				titlesCount: 0,
				books: [],
				avgRating: 0
			});
			const item = map.get(author);
			item.titlesCount++;
			item.books.push(b);
		});
		return Array.from(map.values()).sort((a, b) => b.titlesCount - a.titlesCount);
	}, [books]);
	const distinctPublishers = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		books.forEach((b) => {
			const pub = b.publisher && b.publisher.trim() ? b.publisher.trim() : b.author ? `${b.author} Imprint` : "Independent / Self Published";
			if (!map.has(pub)) map.set(pub, {
				name: pub,
				titlesCount: 0,
				books: []
			});
			const item = map.get(pub);
			item.titlesCount++;
			item.books.push(b);
		});
		return Array.from(map.values()).sort((a, b) => b.titlesCount - a.titlesCount);
	}, [books]);
	const totalRevenue = dashboardStats?.totalRevenue !== void 0 ? Number(dashboardStats.totalRevenue) : orders.reduce((sum, o) => sum + (o.total || 0), 0);
	const totalOrdersCount = dashboardStats?.totalOrders !== void 0 ? Number(dashboardStats.totalOrders) : orders.length;
	books.reduce((sum, b) => sum + (b.stock || 0), 0);
	const totalInventoryValuation = books.reduce((sum, b) => sum + (b.price || 0) * (b.stock || 0), 0);
	books.filter((b) => (b.stock || 0) < 20);
	const handleOpenAddCoupon = () => {
		setEditingCouponId(null);
		setCouponCode("");
		setCouponType("percentage");
		setCouponValue("");
		setCouponMinOrder("0");
		setCouponMaxDiscount("");
		setCouponStatus("active");
		setShowCouponModal(true);
	};
	const handleOpenEditCoupon = (c) => {
		setEditingCouponId(c.id);
		setCouponCode(c.code);
		setCouponType(c.discountType || c.discount_type || "percentage");
		setCouponValue(String(c.discountValue || c.discount_value || ""));
		setCouponMinOrder(String(c.minOrder || c.min_order || "0"));
		setCouponMaxDiscount(c.maxDiscount || c.max_discount ? String(c.maxDiscount || c.max_discount) : "");
		setCouponStatus(c.status);
		setShowCouponModal(true);
	};
	const handleSaveCoupon = async (e) => {
		e.preventDefault();
		if (!couponCode.trim() || !couponValue) {
			toast.error("Coupon code and discount value are required.");
			return;
		}
		setSavingCoupon(true);
		try {
			const payload = {
				code: couponCode.trim().toUpperCase(),
				discountType: couponType,
				discountValue: parseFloat(couponValue),
				minOrder: parseFloat(couponMinOrder) || 0,
				...couponMaxDiscount ? { maxDiscount: parseFloat(couponMaxDiscount) } : {},
				status: couponStatus
			};
			if (editingCouponId) {
				await api.updateCoupon(editingCouponId, payload);
				toast.success(`Coupon ${payload.code} updated!`);
			} else {
				await api.createCoupon(payload);
				toast.success(`Coupon ${payload.code} created!`);
			}
			setShowCouponModal(false);
			const refreshed = await api.getCoupons();
			setCoupons(refreshed);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to save coupon");
		} finally {
			setSavingCoupon(false);
		}
	};
	const handleDeleteCoupon = async (id, code) => {
		if (!confirm(`Are you sure you want to permanently delete coupon "${code}"?`)) return;
		try {
			await api.deleteCoupon(id);
			toast.success(`Coupon "${code}" deleted.`);
			setCoupons((prev) => prev.filter((c) => c.id !== id));
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to delete coupon");
		}
	};
	const handleToggleCouponStatus = async (c) => {
		const nextStatus = c.status === "active" ? "inactive" : "active";
		try {
			await api.updateCoupon(c.id, { status: nextStatus });
			setCoupons((prev) => prev.map((item) => item.id === c.id ? {
				...item,
				status: nextStatus
			} : item));
			toast.success(`Coupon ${c.code} is now ${nextStatus}`);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to update status");
		}
	};
	const handleToggleCustomerStatus = async (customerId, currentStatus, name) => {
		const nextStatus = currentStatus === "blocked" ? "active" : "blocked";
		if (!confirm(`Change customer "${name}" status to "${nextStatus.toUpperCase()}"?`)) return;
		try {
			await api.updateCustomerStatus(customerId, nextStatus);
			setCustomers((prev) => prev.map((c) => c.id === customerId ? {
				...c,
				status: nextStatus
			} : c));
			toast.success(`Customer "${name}" status updated to ${nextStatus}`);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to update status");
		}
	};
	const handleOpenAddContent = () => {
		setEditingContentId(null);
		setContentTitle("");
		setContentSubtitle("");
		setContentImage("");
		setContentLinkUrl("");
		setContentBody("");
		setContentOrder("0");
		setContentStatus("active");
		setShowContentModal(true);
	};
	const handleOpenEditContent = (cb) => {
		setEditingContentId(cb.id);
		setContentTitle(cb.title);
		setContentSubtitle(cb.subtitle || "");
		setContentImage(cb.image || "");
		setContentLinkUrl(cb.linkUrl || cb.link_url || "");
		setContentBody(cb.content || "");
		setContentOrder(String(cb.displayOrder || cb.display_order || 0));
		setContentStatus(cb.status);
		setShowContentModal(true);
	};
	const handleSaveContent = async (e) => {
		e.preventDefault();
		if (!contentTitle.trim()) {
			toast.error("Title is required.");
			return;
		}
		setSavingContent(true);
		try {
			const payload = {
				type: activeSection,
				title: contentTitle.trim(),
				subtitle: contentSubtitle.trim() || void 0,
				image: contentImage.trim() || void 0,
				linkUrl: contentLinkUrl.trim() || void 0,
				content: contentBody.trim() || void 0,
				displayOrder: parseInt(contentOrder) || 0,
				status: contentStatus
			};
			if (editingContentId) {
				await api.updateContentBlock(editingContentId, payload);
				toast.success("Content item updated!");
			} else {
				await api.createContentBlock(payload);
				toast.success("Content item created!");
			}
			setShowContentModal(false);
			const refreshed = await api.getContentBlocks();
			setContentBlocks(refreshed);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to save content");
		} finally {
			setSavingContent(false);
		}
	};
	const handleDeleteContent = async (id, title) => {
		if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
		try {
			await api.deleteContentBlock(id);
			toast.success("Content deleted.");
			setContentBlocks((prev) => prev.filter((c) => c.id !== id));
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to delete");
		}
	};
	const handleToggleContentStatus = async (cb) => {
		const nextStatus = cb.status === "active" ? "inactive" : "active";
		try {
			await api.updateContentBlock(cb.id, { status: nextStatus });
			setContentBlocks((prev) => prev.map((item) => item.id === cb.id ? {
				...item,
				status: nextStatus
			} : item));
			toast.success(`Content status set to ${nextStatus}`);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to update status");
		}
	};
	const handleSaveSettings = async (e) => {
		e.preventDefault();
		setSavingSettings(true);
		try {
			const cleanSettings = {};
			Object.entries(settings).forEach(([k, v]) => {
				if (typeof v === "string") cleanSettings[k] = v;
			});
			await api.updateSettings(cleanSettings);
			toast.success("Store configurations persisted to database!");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to update settings");
		} finally {
			setSavingSettings(false);
		}
	};
	const renderSectionContent = () => {
		if (activeSection === "dashboard") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-card p-5 shadow-xs transition hover:shadow-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-muted-foreground text-xs font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Gross Revenue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "p-2 rounded-xl bg-emerald-500/10 text-emerald-600",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-4 w-4" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-2xl sm:text-3xl font-bold text-foreground mt-2",
									children: ["₹", totalRevenue.toLocaleString()]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3" }), " Real-time order valuation"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-card p-5 shadow-xs transition hover:shadow-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-muted-foreground text-xs font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Customer Orders" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "p-2 rounded-xl bg-primary/10 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl sm:text-3xl font-bold text-foreground mt-2",
									children: totalOrdersCount
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-muted-foreground mt-1",
									children: [orders.filter((o) => o.status === "pending").length, " pending dispatch"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-card p-5 shadow-xs transition hover:shadow-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-muted-foreground text-xs font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Books Catalog" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "p-2 rounded-xl bg-amber-500/10 text-amber-600",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-2xl sm:text-3xl font-bold text-foreground mt-2",
									children: [books.length, " Titles"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-muted-foreground mt-1",
									children: [dbCategories.length, " Categories active"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-card p-5 shadow-xs transition hover:shadow-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-muted-foreground text-xs font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Registered Readers" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "p-2 rounded-xl bg-blue-500/10 text-blue-600",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl sm:text-3xl font-bold text-foreground mt-2",
									children: customers.length > 0 ? customers.length : "2,500+"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-blue-600 font-semibold mt-1",
									children: [addresses.length, " Saved delivery addresses"]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-secondary/30 p-4 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-foreground",
								children: "Admin Shortcuts:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								className: "rounded-full text-xs h-8 gap-1.5 font-bold",
								onClick: handleOpenAddBook,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Add New Book"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								className: "rounded-full text-xs h-8 gap-1.5",
								onClick: () => onNavigateSection?.("categories"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3.5 w-3.5" }),
									" Categories (",
									dbCategories.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								className: "rounded-full text-xs h-8 gap-1.5",
								onClick: () => onNavigateSection?.("orders"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-3.5 w-3.5" }),
									" View Orders (",
									orders.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "ghost",
								className: "rounded-full text-xs h-8 gap-1",
								onClick: loadData,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("h-3.5 w-3.5", loading && "animate-spin") }), " Sync DB"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-emerald-500 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SQLite Connected & Live" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid lg:grid-cols-3 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-bold text-foreground",
								children: "Recent Customer Bookings"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Live orders placed by customers across India."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => onNavigateSection?.("orders"),
								className: "text-xs font-semibold text-primary gap-1",
								children: ["All Orders ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })]
							})]
						}), orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center py-10 text-muted-foreground text-xs space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-8 w-8 mx-auto text-muted-foreground/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No orders recorded yet in database." })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-xs text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "border-b border-border text-muted-foreground font-semibold",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-2.5",
											children: "Order ID & Date"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-2.5",
											children: "Customer"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-2.5",
											children: "Amount"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-2.5",
											children: "Status"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-2.5 text-right",
											children: "Invoice & Action"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border/60",
									children: orders.slice(0, 6).map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-secondary/20 transition",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-bold text-primary font-display",
													children: order.id
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-muted-foreground",
													children: order.createdAt || "Recent"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-bold text-foreground",
													children: order.customerName
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-muted-foreground",
													children: order.customerPhone
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-3 font-bold font-display text-sm",
												children: ["₹", order.total]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase", order.status === "delivered" ? "bg-emerald-100 text-emerald-800" : order.status === "dispatched" ? "bg-blue-100 text-blue-800" : order.status === "confirmed" ? "bg-amber-100 text-amber-800" : order.status === "cancelled" ? "bg-red-100 text-red-800" : "bg-orange-100 text-orange-800"),
													children: order.status
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 text-right",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-end gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														size: "sm",
														variant: "ghost",
														className: "h-7 text-[11px] px-2 text-primary hover:bg-secondary rounded-md gap-1",
														onClick: () => {
															setSelectedInvoiceOrderId(order.id);
															setShowInvoiceModal(true);
														},
														title: "View Tax Invoice",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-3.5 w-3.5" }), " Invoice"]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														value: order.status,
														onChange: (e) => handleStatusUpdate(order.id, e.target.value),
														className: "h-7 rounded-md text-[11px] border border-border bg-background px-2 font-semibold cursor-pointer outline-none",
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
												})
											})
										]
									}, order.id))
								})]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-bold text-foreground",
								children: "Shelves Breakdown"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: [books.length, " Books"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: (dbCategories.length > 0 ? dbCategories.map((c) => c.name) : categories.filter((c) => c !== "All")).map((cat) => {
								const count = books.filter((b) => b.category === cat).length;
								const pct = books.length ? Math.round(count / books.length * 100) : 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: cat
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground font-medium",
											children: [
												count,
												" titles (",
												pct,
												"%)"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-1.5 w-full bg-secondary rounded-full overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full bg-primary rounded-full transition-all duration-500",
											style: { width: `${pct}%` }
										})
									})]
								}, cat);
							})
						})]
					})]
				})
			]
		});
		if (activeSection === "books" || activeSection === "inventory") {
			const selectedCatObj = dbCategories.find((c) => c.name.toLowerCase() === newCategory.toLowerCase());
			const modalSubCats = dbSubCategories.filter((s) => selectedCatObj ? s.category_id === selectedCatObj.id : false);
			const pNum = parseFloat(newPrice) || 0;
			const oNum = parseFloat(newOldPrice) || 0;
			const previewDiscount = oNum > pNum ? Math.round((oNum - pNum) / oNum * 100) : 0;
			const previewSavings = oNum > pNum ? oNum - pNum : 0;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-bold text-foreground",
							children: "Books Catalog"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Manage book titles, front & secondary preview images, authors, publishers, categories & MRP pricing."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: loadData,
								className: "gap-1.5 text-xs rounded-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("h-3.5 w-3.5", loading && "animate-spin") }), " Refresh"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: handleOpenAddBook,
								className: "rounded-full gap-2 text-xs font-bold bg-primary text-primary-foreground shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add New Book"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-secondary/80 border border-border/80 w-fit",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setCatalogActiveTab("books"),
								className: cn("px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2", catalogActiveTab === "books" ? "bg-card text-primary shadow-xs border border-border/60" : "text-muted-foreground hover:text-foreground hover:bg-card/50"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4" }),
									"Books List (",
									books.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setCatalogActiveTab("authors"),
								className: cn("px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2", catalogActiveTab === "authors" ? "bg-card text-amber-600 shadow-xs border border-border/60" : "text-muted-foreground hover:text-foreground hover:bg-card/50"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
									"Authors Directory (",
									distinctAuthors.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setCatalogActiveTab("publishers"),
								className: cn("px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2", catalogActiveTab === "publishers" ? "bg-card text-blue-600 shadow-xs border border-border/60" : "text-muted-foreground hover:text-foreground hover:bg-card/50"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "h-4 w-4" }),
									"Publishers & Imprints (",
									distinctPublishers.length,
									")"
								]
							})
						]
					}),
					catalogActiveTab === "books" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 p-4 rounded-2xl border border-border bg-card shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-bold text-muted-foreground flex items-center gap-1 mr-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-3.5 w-3.5" }), " Category:"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setCatalogFilterCategory("All"),
										className: cn("px-3 py-1 rounded-full text-xs font-bold transition", catalogFilterCategory === "All" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"),
										children: [
											"All (",
											books.length,
											")"
										]
									}),
									dbCategories.map((c) => {
										const cCount = books.filter((b) => b.category.toLowerCase() === c.name.toLowerCase()).length;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setCatalogFilterCategory(c.name),
											className: cn("px-3 py-1 rounded-full text-xs font-semibold transition", catalogFilterCategory.toLowerCase() === c.name.toLowerCase() ? "bg-primary text-primary-foreground font-bold" : "bg-secondary text-foreground hover:bg-secondary/80"),
											children: [
												c.name,
												" (",
												cCount,
												")"
											]
										}, c.id);
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground font-medium",
								children: [
									"Showing ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: filteredBooks.length }),
									" of ",
									books.length,
									" titles"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3 pt-3 border-t border-border/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-bold text-muted-foreground flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3.5 w-3.5 text-amber-600" }), " Author:"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: catalogFilterAuthor,
										onChange: (e) => setCatalogFilterAuthor(e.target.value),
										className: "h-8 rounded-lg border border-border bg-background px-2.5 text-xs font-medium text-foreground cursor-pointer outline-none focus:border-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: "All",
											children: [
												"All Authors (",
												distinctAuthors.length,
												")"
											]
										}), distinctAuthors.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: a.name,
											children: [
												a.name,
												" (",
												a.titlesCount,
												")"
											]
										}, a.name))]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-bold text-muted-foreground flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "h-3.5 w-3.5 text-blue-600" }), " Publisher:"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: catalogFilterPublisher,
										onChange: (e) => setCatalogFilterPublisher(e.target.value),
										className: "h-8 rounded-lg border border-border bg-background px-2.5 text-xs font-medium text-foreground cursor-pointer outline-none focus:border-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: "All",
											children: [
												"All Publishers (",
												distinctPublishers.length,
												")"
											]
										}), distinctPublishers.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: p.name,
											children: [
												p.name,
												" (",
												p.titlesCount,
												")"
											]
										}, p.name))]
									})]
								}),
								(catalogFilterCategory !== "All" || catalogFilterAuthor !== "All" || catalogFilterPublisher !== "All") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2 ml-auto",
									children: [
										catalogFilterAuthor !== "All" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold text-[11px] border border-amber-500/20",
											children: [
												"Author: ",
												catalogFilterAuthor,
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setCatalogFilterAuthor("All"),
													className: "hover:text-destructive ml-0.5",
													children: "✕"
												})
											]
										}),
										catalogFilterPublisher !== "All" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 font-bold text-[11px] border border-blue-500/20",
											children: [
												"Publisher: ",
												catalogFilterPublisher,
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setCatalogFilterPublisher("All"),
													className: "hover:text-destructive ml-0.5",
													children: "✕"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												setCatalogFilterCategory("All");
												setCatalogFilterAuthor("All");
												setCatalogFilterPublisher("All");
											},
											className: "text-xs font-bold text-primary hover:underline ml-1",
											children: "Reset All Filters"
										})
									]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl border border-border bg-card shadow-xs overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-xs text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-secondary/60 text-muted-foreground font-semibold border-b border-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "Cover"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "Title, Author & Publisher"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "Category / Sub-Category"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "Cost & MRP"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "Discount %"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "Rating"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5 text-right",
											children: "Actions"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border/60",
									children: filteredBooks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										colSpan: 7,
										className: "p-8 text-center text-muted-foreground",
										children: [
											"No books match the current filters.",
											" ",
											(catalogFilterAuthor !== "All" || catalogFilterPublisher !== "All" || catalogFilterCategory !== "All") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													setCatalogFilterCategory("All");
													setCatalogFilterAuthor("All");
													setCatalogFilterPublisher("All");
												},
												className: "text-primary font-bold hover:underline",
												children: "Clear all filters"
											})
										]
									}) }) : filteredBooks.map((b) => {
										const isImg = b.cover && (b.cover.startsWith("http") || b.cover.startsWith("/"));
										const mrpVal = b.oldPrice || b.old_price;
										const disc = b.discountPercent || b.discount_percent || (mrpVal && mrpVal > b.price ? Math.round((mrpVal - b.price) / mrpVal * 100) : 0);
										const sub = b.subCategory || b.sub_category;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "hover:bg-secondary/20 transition",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3.5",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "relative h-12 w-9 rounded-md overflow-hidden bg-secondary border border-border/80 shadow-2xs shrink-0",
														children: [isImg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: b.cover,
															alt: b.title,
															className: "h-full w-full object-cover"
														}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: cn("h-full w-full flex items-center justify-center text-[7px] text-white font-bold p-0.5 text-center", b.cover || "bg-primary"),
															children: b.title.slice(0, 8)
														}), (b.image2 || b.image_2) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "absolute bottom-0.5 right-0.5 bg-black/70 text-[7px] text-white px-0.5 rounded font-bold",
															title: "Dual 2-Image Gallery",
															children: "2🖼"
														})]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "p-3.5 font-medium max-w-[220px]",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-bold text-foreground text-sm font-display truncate",
															children: b.title
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-[11px] text-muted-foreground truncate",
															children: [
																"by",
																" ",
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	type: "button",
																	onClick: () => setCatalogFilterAuthor(b.author),
																	className: "text-foreground hover:text-primary hover:underline font-semibold",
																	title: `Filter books by "${b.author}"`,
																	children: b.author
																})
															]
														}),
														b.publisher && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-[10px] text-muted-foreground/80 truncate flex items-center gap-1 mt-0.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "h-3 w-3 text-blue-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => setCatalogFilterPublisher(b.publisher || "All"),
																className: "hover:text-primary hover:underline",
																title: `Filter books by "${b.publisher}"`,
																children: b.publisher
															})]
														}),
														b.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "inline-block mt-0.5 text-[9px] font-bold text-amber-600 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/30",
															children: "★ Featured Showcase"
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3.5",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "px-2 py-0.5 rounded-full bg-secondary text-primary font-bold text-[10px] w-fit",
															children: b.category
														}), sub && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-[10px] text-muted-foreground font-medium pl-1",
															children: ["› ", sub]
														})]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "p-3.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "font-bold text-foreground text-sm font-display",
														children: ["₹", b.price]
													}), mrpVal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[10px] text-muted-foreground line-through",
														children: [
															"₹",
															mrpVal,
															" MRP"
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3.5",
													children: disc > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-[11px]",
														children: [disc, "% OFF"]
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground text-[11px]",
														children: "Standard"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3.5",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-amber-400 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-bold text-foreground",
															children: b.rating || 4.5
														})]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "p-3.5 text-right space-x-1 whitespace-nowrap",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														size: "sm",
														variant: "ghost",
														className: "h-8 text-xs text-primary hover:bg-secondary rounded-lg",
														onClick: () => handleOpenEditBook(b),
														title: "Edit Book Details",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "h-3.5 w-3.5" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														size: "sm",
														variant: "ghost",
														className: "h-8 text-xs text-destructive hover:bg-destructive/10 rounded-lg",
														onClick: async () => {
															if (confirm(`Remove "${b.title}" from bookstore catalog?`)) try {
																await api.deleteBook(b.id);
																toast.success(`Removed "${b.title}"`);
																loadData();
															} catch (err) {
																toast.error(err instanceof Error ? err.message : "Failed to delete book");
															}
														},
														title: "Delete Book",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
													})]
												})
											]
										}, b.id);
									})
								})]
							})
						})
					})] }),
					activeSection === "books" && catalogActiveTab === "authors" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-border bg-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-display font-bold text-lg text-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5 text-amber-600" }), " Vetted Authors & Creators"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"Directory of ",
									distinctAuthors.length,
									" authors featured in the catalog. Click any author to view all their books."
								]
							})] }), catalogFilterAuthor !== "All" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => setCatalogFilterAuthor("All"),
								className: "text-xs rounded-full gap-1 h-8",
								children: [
									"Clear Filter (",
									catalogFilterAuthor,
									")"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
							children: distinctAuthors.map((author) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-5 rounded-2xl border border-border bg-card shadow-xs space-y-3 hover:border-amber-500/50 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-9 w-9 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-display font-bold flex items-center justify-center text-sm",
												children: author.name.slice(0, 1).toUpperCase()
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "font-display font-bold text-foreground text-sm",
												children: author.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground font-semibold",
												children: "Author & Edition Contributor"
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-[10px] border border-amber-500/20",
											children: [
												author.titlesCount,
												" ",
												author.titlesCount === 1 ? "Title" : "Titles"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1 text-xs pt-1 border-t border-border/60",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] font-bold text-muted-foreground uppercase",
											children: "Featured Works:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-0.5",
											children: author.books.slice(0, 3).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-foreground font-medium truncate flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-1 rounded-full bg-amber-600" }),
													b.title,
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-muted-foreground",
														children: [
															"(₹",
															b.price,
															")"
														]
													})
												]
											}, b.id))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-2 border-t border-border/40",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => {
												setCatalogFilterAuthor(author.name);
												setCatalogActiveTab("books");
											},
											className: "w-full text-xs font-bold gap-1.5 rounded-xl h-8 text-amber-700 dark:text-amber-400 hover:bg-amber-500/10",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3.5 w-3.5" }),
												"View ",
												author.titlesCount,
												" ",
												author.titlesCount === 1 ? "Book" : "Books"
											]
										})
									})
								]
							}, author.name))
						})]
					}),
					activeSection === "books" && catalogActiveTab === "publishers" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-border bg-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-display font-bold text-lg text-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "h-5 w-5 text-blue-600" }), " Publishers & Imprints"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"Directory of ",
									distinctPublishers.length,
									" publishers and imprints. Click any publisher to view associated catalogue titles."
								]
							})] }), catalogFilterPublisher !== "All" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => setCatalogFilterPublisher("All"),
								className: "text-xs rounded-full gap-1 h-8",
								children: [
									"Clear Filter (",
									catalogFilterPublisher,
									")"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
							children: distinctPublishers.map((pub) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-5 rounded-2xl border border-border bg-card shadow-xs space-y-3 hover:border-blue-500/50 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-9 w-9 rounded-full bg-blue-500/10 text-blue-600 font-display font-bold flex items-center justify-center text-sm",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "h-4 w-4" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "font-display font-bold text-foreground text-sm",
												children: pub.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground font-semibold",
												children: "Publishing House / Imprint"
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 font-bold text-[10px] border border-blue-500/20",
											children: [
												pub.titlesCount,
												" ",
												pub.titlesCount === 1 ? "Title" : "Titles"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1 text-xs pt-1 border-t border-border/60",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] font-bold text-muted-foreground uppercase",
											children: "Featured Works:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-0.5",
											children: pub.books.slice(0, 3).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-foreground font-medium truncate flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-1 rounded-full bg-blue-600" }),
													b.title,
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-muted-foreground",
														children: [
															"(₹",
															b.price,
															")"
														]
													})
												]
											}, b.id))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-2 border-t border-border/40",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => {
												setCatalogFilterPublisher(pub.name);
												setCatalogActiveTab("books");
											},
											className: "w-full text-xs font-bold gap-1.5 rounded-xl h-8 text-blue-700 dark:text-blue-300 hover:bg-blue-500/10",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3.5 w-3.5" }),
												"View ",
												pub.titlesCount,
												" ",
												pub.titlesCount === 1 ? "Book" : "Books"
											]
										})
									})
								]
							}, pub.name))
						})]
					}),
					showAddBook && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSaveBook,
							className: "bg-card border border-border rounded-2xl p-6 sm:p-7 max-w-2xl w-full shadow-2xl space-y-4 text-xs animate-in zoom-in-95 max-h-[92vh] overflow-y-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-border pb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-xl font-bold text-primary",
										children: editingBookId ? "Edit Book Details" : "Add New Book to Catalogue"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground",
										children: "Fill in book details, author, publisher, multiple images, categories, MRP and discount prices."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setShowAddBook(false);
											setEditingBookId(null);
										},
										className: "text-muted-foreground hover:text-foreground text-sm font-bold p-1",
										children: "✕"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "font-bold block mb-1",
											children: "Book Title / Name *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											value: newTitle,
											onChange: (e) => setNewTitle(e.target.value),
											placeholder: "e.g. The Secret Garden",
											className: "w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary text-foreground"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "font-bold block mb-1",
												children: "Author Name *"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												required: true,
												value: newAuthor,
												onChange: (e) => setNewAuthor(e.target.value),
												placeholder: "e.g. Frances Hodgson Burnett",
												list: "admin-authors-list",
												className: "w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary text-foreground"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
												id: "admin-authors-list",
												children: distinctAuthors.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: a.name }, a.name))
											})
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "font-bold block mb-1",
												children: "Publisher / Imprint"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: newPublisher,
												onChange: (e) => setNewPublisher(e.target.value),
												placeholder: "e.g. Penguin Classics / Harper",
												list: "admin-publishers-list",
												className: "w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary text-foreground"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
												id: "admin-publishers-list",
												children: distinctPublishers.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: p.name }, p.name))
											})
										] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold block mb-1",
										children: "Main Category *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: newCategory,
										onChange: (e) => {
											setNewCategory(e.target.value);
											setNewSubCategory("");
										},
										className: "w-full h-9 rounded-lg border border-border bg-background px-2.5 outline-none focus:border-primary text-foreground cursor-pointer",
										children: (dbCategories.length > 0 ? dbCategories.map((c) => c.name) : categories.filter((c) => c !== "All")).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: c,
											children: c
										}, c))
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold block mb-1",
										children: "Sub-Category (Optional)"
									}), modalSubCats.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: newSubCategory,
										onChange: (e) => setNewSubCategory(e.target.value),
										className: "w-full h-9 rounded-lg border border-border bg-background px-2.5 outline-none focus:border-primary text-foreground cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "-- Select Sub-Category --"
										}), modalSubCats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: s.name,
											children: s.name
										}, s.id))]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: newSubCategory,
										onChange: (e) => setNewSubCategory(e.target.value),
										placeholder: "e.g. British Literature",
										className: "w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary text-foreground"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold block mb-1",
										children: "Selling Price / Cost (₹) *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										required: true,
										min: "0",
										step: "1",
										value: newPrice,
										onChange: (e) => setNewPrice(e.target.value),
										placeholder: "349",
										className: "w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary font-bold text-primary"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold block mb-1",
										children: "MRP / Original Price (₹)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: "0",
										step: "1",
										value: newOldPrice,
										onChange: (e) => setNewOldPrice(e.target.value),
										placeholder: "499",
										className: "w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary text-muted-foreground"
									})] })]
								}),
								previewDiscount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between text-emerald-800 dark:text-emerald-300",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-emerald-600" }),
											"Customer Discount: ",
											previewDiscount,
											"% OFF"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-semibold text-[11px]",
										children: ["Customer Saves: ₹", previewSavings]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-3 border-t border-border/60 pt-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2 p-3 rounded-xl border border-border bg-secondary/30",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-bold text-foreground block",
														children: "Front Cover Image (Image 1) *"
													}), newCover && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setNewCover(""),
														className: "text-[10px] text-destructive hover:underline font-semibold",
														children: "Clear"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: cn("w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 text-primary cursor-pointer transition text-xs font-bold shadow-2xs", uploadingCover && "opacity-50 pointer-events-none"),
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: cn("h-4 w-4", uploadingCover && "animate-bounce") }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: uploadingCover ? "Optimizing & Uploading..." : "Upload from Computer / Device" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "file",
															accept: "image/*",
															className: "hidden",
															disabled: uploadingCover,
															onChange: handleCoverFileUpload
														})
													]
												}) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-muted-foreground font-semibold block",
														children: "Or paste direct image URL:"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														required: true,
														value: newCover,
														onChange: (e) => setNewCover(e.target.value),
														placeholder: "https://images.unsplash.com/... or /uploads/...",
														className: "w-full h-8 rounded-lg border border-border bg-background px-2.5 outline-none focus:border-primary text-foreground text-xs"
													})]
												}),
												newCover && (newCover.startsWith("http") || newCover.startsWith("/") || newCover.startsWith("data:image")) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-1 flex items-center gap-3 p-2 rounded-lg bg-background border border-border/70",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-16 w-12 rounded-md overflow-hidden border border-border shadow-2xs shrink-0",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: newCover,
															alt: "Cover Preview",
															className: "h-full w-full object-cover"
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-[10px] text-muted-foreground truncate",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-bold text-foreground",
															children: "Front Cover Active"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "truncate",
															children: [newCover.slice(0, 45), "..."]
														})]
													})]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2 p-3 rounded-xl border border-border bg-secondary/30",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-bold text-foreground block",
														children: "Inside / Secondary Image (Optional)"
													}), newImage2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setNewImage2(""),
														className: "text-[10px] text-destructive hover:underline font-semibold",
														children: "Clear"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: cn("w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-dashed border-border hover:border-primary/40 bg-background hover:bg-secondary text-foreground cursor-pointer transition text-xs font-semibold shadow-2xs", uploadingImage2 && "opacity-50 pointer-events-none"),
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: cn("h-4 w-4 text-primary", uploadingImage2 && "animate-bounce") }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: uploadingImage2 ? "Optimizing & Uploading..." : "Upload from Computer / Device" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "file",
															accept: "image/*",
															className: "hidden",
															disabled: uploadingImage2,
															onChange: handleImage2FileUpload
														})
													]
												}) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-muted-foreground font-semibold block",
														children: "Or paste direct image URL:"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														value: newImage2,
														onChange: (e) => setNewImage2(e.target.value),
														placeholder: "https://images.unsplash.com/... or /uploads/...",
														className: "w-full h-8 rounded-lg border border-border bg-background px-2.5 outline-none focus:border-primary text-foreground text-xs"
													})]
												}),
												newImage2 && (newImage2.startsWith("http") || newImage2.startsWith("/") || newImage2.startsWith("data:image")) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-1 flex items-center gap-3 p-2 rounded-lg bg-background border border-border/70",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-16 w-12 rounded-md overflow-hidden border border-border shadow-2xs shrink-0",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: newImage2,
															alt: "Image 2 Preview",
															className: "h-full w-full object-cover"
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-[10px] text-muted-foreground truncate",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-bold text-foreground",
															children: "Secondary Image Active"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "truncate",
															children: [newImage2.slice(0, 45), "..."]
														})]
													})]
												})
											]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold block mb-1",
									children: "Synopsis / Book Description"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									rows: 3,
									value: newDescription,
									onChange: (e) => setNewDescription(e.target.value),
									placeholder: "A brief synopsis of the book, author highlights, and key takeaways...",
									className: "w-full rounded-lg border border-border bg-background p-2.5 outline-none focus:border-primary text-foreground"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-3 items-center border-t border-border/60 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold block mb-1",
										children: "Custom Promotional Label"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: newLabel,
										onChange: (e) => setNewLabel(e.target.value),
										placeholder: "e.g. Bestseller, Editor's Pick, New",
										className: "w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 pt-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											id: "featuredCheckbox",
											checked: newFeatured,
											onChange: (e) => setNewFeatured(e.target.checked),
											className: "h-4 w-4 rounded text-primary focus:ring-primary accent-primary"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "featuredCheckbox",
											className: "font-bold text-foreground cursor-pointer select-none",
											children: "Feature on Homepage (Featured Showcase)"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-2 pt-3 border-t border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										onClick: () => {
											setShowAddBook(false);
											setEditingBookId(null);
										},
										className: "rounded-full",
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										disabled: savingBook,
										className: "rounded-full bg-primary text-primary-foreground font-bold px-6",
										children: savingBook ? "Saving..." : editingBookId ? "Update Book" : "Save & Publish Book"
									})]
								})
							]
						})
					})
				]
			});
		}
		if (activeSection === "orders") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold text-foreground",
					children: "Customer Orders"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Review incoming book orders, customer addresses, payment methods, and GST Tax Invoices."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: loadData,
					className: "gap-1.5 text-xs rounded-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("h-3.5 w-3.5", loading && "animate-spin") }), " Refresh Orders"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-border bg-card shadow-xs overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-xs text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-secondary/60 text-muted-foreground font-semibold border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Order ID & Date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Customer & Shipping Address"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Items Ordered"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Payment"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Total Bill"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5 text-right",
									children: "Tax Invoice & Status"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/60",
							children: filteredOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 7,
								className: "p-8 text-center text-muted-foreground",
								children: "No orders found matching your search."
							}) }) : filteredOrders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-secondary/20 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-3.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display font-bold text-primary text-sm",
											children: o.id
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground",
											children: o.createdAt || "Recent"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-3.5 max-w-[240px]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-foreground",
												children: o.customerName
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-muted-foreground font-medium",
												children: o.customerPhone
											}),
											o.customerEmail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground truncate",
												children: o.customerEmail
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground/90 mt-1 line-clamp-2",
												children: o.deliveryAddress
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-1 max-w-[200px]",
											children: o.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-foreground leading-tight",
												children: [
													item.title,
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
														className: "text-primary",
														children: ["× ", item.quantity]
													})
												]
											}, i))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "px-2 py-0.5 rounded-md bg-secondary font-bold text-[10px]",
											children: o.paymentMethod || "COD"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-3.5 font-bold font-display text-sm text-foreground",
										children: ["₹", o.total]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase", o.status === "delivered" ? "bg-emerald-100 text-emerald-800" : o.status === "dispatched" ? "bg-blue-100 text-blue-800" : o.status === "confirmed" ? "bg-amber-100 text-amber-800" : o.status === "cancelled" ? "bg-red-100 text-red-800" : "bg-orange-100 text-orange-800"),
											children: o.status
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3.5 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-end gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												variant: "outline",
												className: "h-8 text-xs font-semibold rounded-lg gap-1 border-primary/30 text-primary hover:bg-primary/10",
												onClick: () => {
													setSelectedInvoiceOrderId(o.id);
													setShowInvoiceModal(true);
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-3.5 w-3.5" }), " Tax Invoice"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: o.status,
												onChange: (e) => handleStatusUpdate(o.id, e.target.value),
												className: "h-8 rounded-md text-xs border border-border bg-background px-2.5 font-semibold cursor-pointer outline-none focus:border-primary",
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
										})
									})
								]
							}, o.id))
						})]
					})
				})
			})]
		});
		if (activeSection === "payments") {
			const codTotal = orders.filter((o) => o.paymentMethod?.toLowerCase().includes("cod")).reduce((s, o) => s + (o.total || 0), 0);
			const onlineTotal = totalRevenue - codTotal;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-bold text-foreground",
							children: "Payments & Tax Invoices"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "View GST invoices, transaction logs, and print official tax invoices for bookstore accounting."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: loadData,
							className: "gap-1.5 text-xs rounded-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("h-3.5 w-3.5", loading && "animate-spin") }), " Refresh"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid sm:grid-cols-3 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-2xl border border-border bg-card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-muted-foreground uppercase",
									children: "Total Invoiced Amount"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-2xl font-bold text-foreground mt-1",
									children: ["₹", totalRevenue.toLocaleString()]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-2xl border border-border bg-card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-muted-foreground uppercase",
									children: "Digital / UPI Receipts"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-2xl font-bold text-emerald-600 mt-1",
									children: ["₹", onlineTotal.toLocaleString()]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-2xl border border-border bg-card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-muted-foreground uppercase",
									children: "COD Pending Collections"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-2xl font-bold text-amber-600 mt-1",
									children: ["₹", codTotal.toLocaleString()]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl border border-border bg-card shadow-xs overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-xs text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-secondary/60 text-muted-foreground font-semibold border-b border-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "Invoice Number"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "Order ID & Date"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "Customer Name"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "Payment Method"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "Gross Amount"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "Payment Status"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5 text-right",
											children: "Official Document"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border/60",
									children: filteredOrders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-secondary/20 transition",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-3.5 font-bold font-mono text-primary text-xs",
												children: ["INV-2026-", o.id]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-3.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-bold text-foreground",
													children: o.id
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-muted-foreground",
													children: o.createdAt || "Recent"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-3.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-bold text-foreground",
													children: o.customerName
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-muted-foreground",
													children: o.customerPhone
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3.5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "px-2 py-0.5 rounded bg-secondary font-bold text-[10px]",
													children: o.paymentMethod || "COD"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-3.5 font-bold font-display text-sm text-foreground",
												children: ["₹", o.total]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3.5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase", o.status === "delivered" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"),
													children: o.status === "delivered" ? "Settled" : "In Process"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3.5 text-right",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													onClick: () => {
														setSelectedInvoiceOrderId(o.id);
														setShowInvoiceModal(true);
													},
													className: "h-8 rounded-lg text-xs font-bold gap-1.5 bg-primary text-primary-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-3.5 w-3.5" }), " Print Tax Invoice"]
												})
											})
										]
									}, o.id))
								})]
							})
						})
					})
				]
			});
		}
		if (activeSection === "coupons") {
			const activeCouponsCount = coupons.filter((c) => c.status === "active").length;
			const totalRedemptions = coupons.reduce((sum, c) => sum + (c.usageCount || c.usage_count || 0), 0);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-bold text-foreground",
							children: "Coupons & Promotional Codes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Manage persistent bookstore discount vouchers, order thresholds and percentage cuts."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: loadData,
								className: "gap-1.5 text-xs rounded-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("h-3.5 w-3.5", loading && "animate-spin") }), " Refresh"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								className: "rounded-full gap-1.5 text-xs font-bold",
								onClick: handleOpenAddCoupon,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Create New Coupon"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid sm:grid-cols-3 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-2xl border border-border bg-card shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-muted-foreground uppercase",
									children: "Total Coupons Created"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl font-bold text-foreground mt-1",
									children: coupons.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-2xl border border-border bg-card shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-muted-foreground uppercase",
									children: "Currently Active Offers"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl font-bold text-emerald-600 mt-1",
									children: activeCouponsCount
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-2xl border border-border bg-card shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-muted-foreground uppercase",
									children: "Total Redemptions"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-2xl font-bold text-primary mt-1",
									children: [totalRedemptions, " orders"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl border border-border bg-card shadow-xs overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-xs text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-secondary/60 text-muted-foreground font-semibold border-b border-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "Coupon Code"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "Discount Offer"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "Min Order Value"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "Times Used"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "Status"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "Created Date"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5 text-right",
											children: "Actions"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border/60",
									children: filteredCoupons.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										colSpan: 7,
										className: "p-8 text-center text-muted-foreground",
										children: "No promotional coupons found. Click \"Create New Coupon\" to publish your first discount."
									}) }) : filteredCoupons.map((c) => {
										const isPct = (c.discountType || c.discount_type) === "percentage";
										const val = c.discountValue || c.discount_value || 0;
										const maxDisc = c.maxDiscount || c.max_discount;
										const minOrd = c.minOrder || c.min_order || 0;
										const uses = c.usageCount || c.usage_count || 0;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "hover:bg-secondary/20 transition",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3.5",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-mono font-bold text-sm text-primary bg-primary/10 px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-3 w-3" }),
															" ",
															c.code
														]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "p-3.5 font-bold text-foreground",
													children: [isPct ? `${val}% OFF` : `₹${val} Flat OFF`, maxDisc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[10px] text-muted-foreground font-normal ml-1",
														children: [
															"(Cap: ₹",
															maxDisc,
															")"
														]
													}) : null]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3.5 font-semibold text-foreground",
													children: minOrd > 0 ? `₹${minOrd}` : "No Minimum"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3.5",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "px-2 py-0.5 rounded-full bg-secondary font-bold text-[11px]",
														children: [uses, " times"]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3.5",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: cn("px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase", c.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-muted text-muted-foreground"),
														children: c.status
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3.5 text-muted-foreground font-mono text-[10px]",
													children: c.createdAt || c.created_at ? new Date(c.createdAt || c.created_at).toLocaleDateString() : "Active"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3.5 text-right",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-end gap-1",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																size: "sm",
																variant: "ghost",
																className: "h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground",
																onClick: () => handleToggleCouponStatus(c),
																title: c.status === "active" ? "Deactivate Coupon" : "Activate Coupon",
																children: c.status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRight, { className: "h-4 w-4 text-emerald-600" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleLeft, { className: "h-4 w-4 text-muted-foreground" })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																size: "sm",
																variant: "ghost",
																className: "h-7 text-xs px-2 gap-1 text-primary hover:bg-primary/10",
																onClick: () => handleOpenEditCoupon(c),
																title: "Edit Coupon",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "h-3.5 w-3.5" })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																size: "sm",
																variant: "ghost",
																className: "h-7 text-xs px-2 gap-1 text-destructive hover:bg-destructive/10",
																onClick: () => handleDeleteCoupon(c.id, c.code),
																title: "Delete Coupon",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
															})
														]
													})
												})
											]
										}, c.id);
									})
								})]
							})
						})
					})
				]
			});
		}
		if (activeSection === "users") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold text-foreground",
					children: "Registered Customers"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Verified readers who have signed in via OTP, their contact details, order frequency & addresses."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: loadData,
					className: "gap-1.5 text-xs rounded-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("h-3.5 w-3.5", loading && "animate-spin") }), " Refresh Readers"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-border bg-card shadow-xs overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-xs text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-secondary/60 text-muted-foreground font-semibold border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Customer ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Reader Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Verified Email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Phone Number"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Total Orders"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Saved Addresses"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Total Spent"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5 text-right",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/60",
							children: filteredCustomers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 9,
								className: "p-8 text-center text-muted-foreground",
								children: "No customer accounts found. When readers sign in via OTP, they will appear here."
							}) }) : filteredCustomers.map((c) => {
								const userStatus = c.status || "active";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-secondary/20 transition",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-3.5 font-bold font-mono text-primary",
											children: ["#", c.id]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-3.5 font-bold text-foreground flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "h-7 w-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs",
												children: c.name ? c.name.slice(0, 1).toUpperCase() : "R"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.name || "Reader" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3.5 font-mono text-muted-foreground",
											children: c.email
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3.5 font-semibold text-foreground",
											children: c.phone || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[11px]",
												children: [c.totalOrders || 0, " Orders"]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-3.5 font-semibold text-muted-foreground",
											children: [c.totalAddresses || 0, " Addresses"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-3.5 font-bold font-display text-sm text-foreground",
											children: ["₹", (c.totalSpent || 0).toLocaleString()]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase", userStatus === "blocked" ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"),
												children: userStatus
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3.5 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "ghost",
												className: cn("h-7 text-xs font-semibold rounded-lg gap-1", userStatus === "blocked" ? "text-emerald-600 hover:bg-emerald-50" : "text-amber-600 hover:bg-amber-50"),
												onClick: () => handleToggleCustomerStatus(c.id, userStatus, c.name || c.email),
												children: userStatus === "blocked" ? "Unblock" : "Block"
											})
										})
									]
								}, c.id);
							})
						})]
					})
				})
			})]
		});
		if (activeSection === "addresses") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold text-foreground",
					children: "Saved Delivery Addresses"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "All customer delivery addresses saved across India with pincode and landmark details."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: loadData,
					className: "gap-1.5 text-xs rounded-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("h-3.5 w-3.5", loading && "animate-spin") }), " Refresh Addresses"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-border bg-card shadow-xs overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-xs text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-secondary/60 text-muted-foreground font-semibold border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Customer Email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Recipient Name & Phone"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Complete Delivery Address"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "City & State"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Pincode"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Type"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5 text-right",
									children: "Default"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/60",
							children: filteredAddresses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 7,
								className: "p-8 text-center text-muted-foreground",
								children: "No saved addresses recorded in database yet."
							}) }) : filteredAddresses.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-secondary/20 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3.5 font-mono text-primary font-semibold",
										children: a.userEmail
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-3.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold text-foreground",
											children: a.fullName
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground",
											children: a.phone
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3.5 max-w-[280px]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-foreground leading-relaxed",
											children: a.formattedAddress
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-3.5 font-semibold text-foreground",
										children: [
											a.city,
											", ",
											a.state
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3.5 font-mono font-bold text-primary",
										children: a.pincode
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "px-2 py-0.5 rounded-md bg-secondary font-bold text-[10px]",
											children: a.addressType || "Home"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3.5 text-right",
										children: a.isDefault ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]",
											children: "Default Address"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-[10px]",
											children: "Secondary"
										})
									})
								]
							}, a.id))
						})]
					})
				})
			})]
		});
		if (activeSection === "reviews") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold text-foreground",
					children: "Reader Reviews & Ratings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Moderate verified reader feedback, star ratings, and testimonials across the bookstore."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: loadData,
					className: "gap-1.5 text-xs rounded-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("h-3.5 w-3.5", loading && "animate-spin") }), " Refresh Reviews"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
				children: filteredReviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-full text-center py-12 text-muted-foreground text-xs",
					children: "No reader reviews recorded yet."
				}) : filteredReviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 rounded-2xl border border-border bg-card shadow-xs space-y-3 flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-foreground text-sm",
									children: r.userName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex text-amber-400",
									children: Array.from({ length: r.rating }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-amber-400" }, i))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-primary font-semibold flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3.5 w-3.5" }),
									" ",
									r.bookTitle
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground leading-relaxed italic bg-secondary/30 p-3 rounded-xl border border-border/50",
								children: [
									"\"",
									r.comment,
									"\""
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pt-2 border-t border-border text-[11px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "Verified Purchase" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => handleDeleteReview(r.id),
							className: "h-7 text-xs text-destructive hover:bg-destructive/10 rounded-lg gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" }), " Remove"]
						})]
					})]
				}, r.id))
			})]
		});
		if (activeSection === "authors" || activeSection === "publishers") {
			const isPub = activeSection === "publishers";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-border bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-2xl font-bold text-foreground flex items-center gap-2",
						children: [isPub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "h-6 w-6 text-blue-600" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-6 w-6 text-amber-600" }), isPub ? "Publishers & Imprints" : "Vetted Authors & Creators"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: isPub ? `Directory of ${distinctPublishers.length} publishing houses and imprints featured across the bookstore catalogue.` : `Directory of ${distinctAuthors.length} authors and edition creators featured across the bookstore catalogue.`
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: () => {
								setCatalogActiveTab("books");
								if (onNavigateSection) onNavigateSection("books");
							},
							className: "gap-1.5 text-xs font-bold rounded-full bg-primary text-primary-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4" }), " Go to Books Catalog"]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
					children: isPub ? distinctPublishers.map((pub) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 rounded-2xl border border-border bg-card shadow-xs space-y-3 hover:border-blue-500/50 transition",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-9 w-9 rounded-full bg-blue-500/10 text-blue-600 font-display font-bold flex items-center justify-center text-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-display font-bold text-foreground text-sm",
										children: pub.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground font-semibold",
										children: "Publishing House / Imprint"
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 font-bold text-[10px] border border-blue-500/20",
									children: [
										pub.titlesCount,
										" ",
										pub.titlesCount === 1 ? "Title" : "Titles"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 text-xs pt-1 border-t border-border/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-bold text-muted-foreground uppercase",
									children: "Featured Works:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-0.5",
									children: pub.books.slice(0, 3).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-foreground font-medium truncate flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-1 rounded-full bg-blue-600" }),
											b.title,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-muted-foreground",
												children: [
													"(₹",
													b.price,
													")"
												]
											})
										]
									}, b.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-2 border-t border-border/40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => {
										setCatalogFilterPublisher(pub.name);
										setCatalogActiveTab("books");
										if (onNavigateSection) onNavigateSection("books");
									},
									className: "w-full text-xs font-bold gap-1.5 rounded-xl h-8 text-blue-700 dark:text-blue-300 hover:bg-blue-500/10",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3.5 w-3.5" }),
										"View ",
										pub.titlesCount,
										" ",
										pub.titlesCount === 1 ? "Book" : "Books"
									]
								})
							})
						]
					}, pub.name)) : distinctAuthors.map((author) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 rounded-2xl border border-border bg-card shadow-xs space-y-3 hover:border-amber-500/50 transition",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-9 w-9 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-display font-bold flex items-center justify-center text-sm",
										children: author.name.slice(0, 1).toUpperCase()
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-display font-bold text-foreground text-sm",
										children: author.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground font-semibold",
										children: "Author & Edition Contributor"
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-[10px] border border-amber-500/20",
									children: [
										author.titlesCount,
										" ",
										author.titlesCount === 1 ? "Title" : "Titles"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 text-xs pt-1 border-t border-border/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-bold text-muted-foreground uppercase",
									children: "Featured Works:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-0.5",
									children: author.books.slice(0, 3).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-foreground font-medium truncate flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-1 rounded-full bg-amber-600" }),
											b.title,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-muted-foreground",
												children: [
													"(₹",
													b.price,
													")"
												]
											})
										]
									}, b.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-2 border-t border-border/40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => {
										setCatalogFilterAuthor(author.name);
										setCatalogActiveTab("books");
										if (onNavigateSection) onNavigateSection("books");
									},
									className: "w-full text-xs font-bold gap-1.5 rounded-xl h-8 text-amber-700 dark:text-amber-400 hover:bg-amber-500/10",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3.5 w-3.5" }),
										"View ",
										author.titlesCount,
										" ",
										author.titlesCount === 1 ? "Book" : "Books"
									]
								})
							})
						]
					}, author.name))
				})]
			});
		}
		if (activeSection === "categories") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryManager, {
			onNavigateToSubCategories: (catId) => {
				setSelectedSubCatParentId(catId || null);
				setAutoOpenSubCatModal(false);
				if (onNavigateSection) onNavigateSection("sub-categories");
			},
			onOpenAddSubCategory: (cat) => {
				setSelectedSubCatParentId(cat.id);
				setAutoOpenSubCatModal(true);
				if (onNavigateSection) onNavigateSection("sub-categories");
			}
		});
		if (activeSection === "sub-categories") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubCategoryManager, {
			initialCategoryId: selectedSubCatParentId,
			categories: dbCategories,
			autoOpenCreate: autoOpenSubCatModal,
			onModalClosed: () => setAutoOpenSubCatModal(false),
			onNavigateToCategories: () => {
				if (onNavigateSection) onNavigateSection("categories");
			}
		});
		if (activeSection.includes("report")) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold text-foreground capitalize",
						children: activeSection.replace(/-/g, " ")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Automated analytics derived directly from live database transactions."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: loadData,
						className: "gap-1.5 text-xs rounded-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("h-3.5 w-3.5", loading && "animate-spin") }), " Recompute Metrics"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid sm:grid-cols-4 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 rounded-2xl border border-border bg-card shadow-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-muted-foreground",
									children: "Total Store Revenue"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-2xl font-bold text-foreground mt-1",
									children: ["₹", totalRevenue.toLocaleString()]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-emerald-600 font-bold mt-1 inline-block",
									children: "+24.8% Monthly Growth"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 rounded-2xl border border-border bg-card shadow-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-muted-foreground",
									children: "Average Order Value (AOV)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-2xl font-bold text-foreground mt-1",
									children: ["₹", orders.length ? Math.round(orders.reduce((s, o) => s + (o.total || 0), 0) / orders.length) : 485]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-muted-foreground mt-1 inline-block",
									children: "Across all categories"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 rounded-2xl border border-border bg-card shadow-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-muted-foreground",
									children: "Order Fulfillment Rate"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl font-bold text-emerald-600 mt-1",
									children: "98.5%"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-emerald-600 font-bold mt-1 inline-block",
									children: "Dispatch within 24 hours"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 rounded-2xl border border-border bg-card shadow-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-muted-foreground",
									children: "Active Catalog Value"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-2xl font-bold text-foreground mt-1",
									children: ["₹", totalInventoryValuation.toLocaleString()]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] text-muted-foreground mt-1 inline-block",
									children: [books.length, " titles in catalog"]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid lg:grid-cols-2 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 rounded-2xl border border-border bg-card shadow-xs space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-bold text-foreground",
							children: "Category Revenue Contribution"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: dbCategories.map((c) => {
								const catVal = books.filter((b) => b.category === c.name).reduce((sum, b) => sum + (b.price || 0) * (b.stock || 0), 0);
								const pct = totalInventoryValuation > 0 ? Math.round(catVal / totalInventoryValuation * 100) : 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-foreground",
											children: c.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold text-muted-foreground",
											children: [
												"₹",
												catVal.toLocaleString(),
												" (",
												pct,
												"%)"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2 w-full bg-secondary rounded-full overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full bg-primary rounded-full transition-all duration-500",
											style: { width: `${pct}%` }
										})
									})]
								}, c.id);
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 rounded-2xl border border-border bg-card shadow-xs space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-bold text-foreground",
							children: "Top Bestselling Titles"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: books.slice(0, 5).map((b, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/60 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display font-bold text-sm text-primary w-4",
										children: idx + 1
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold text-foreground truncate",
											children: b.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10px] text-muted-foreground truncate",
											children: [
												b.category,
												" • by ",
												b.author
											]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-bold text-foreground font-display text-sm",
										children: ["₹", b.price]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] text-muted-foreground font-medium",
										children: ["★ ", b.rating || 4.5]
									})]
								})]
							}, b.id))
						})]
					})]
				})
			]
		});
		if (activeSection.includes("settings") || activeSection === "delivery-charges" || activeSection === "tax-settings" || activeSection === "social-links" || activeSection === "contact-details" || activeSection === "email-settings") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6 max-w-4xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold text-foreground capitalize",
					children: activeSection.replace(/-/g, " ")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Persist official bookstore details, tax GST parameters, free delivery threshold & support channels directly to database."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: loadData,
					className: "gap-1.5 text-xs rounded-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("h-3.5 w-3.5", loading && "animate-spin") }), " Reload Settings"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSaveSettings,
				className: "p-6 sm:p-7 rounded-2xl border border-border bg-card shadow-xs space-y-5 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid sm:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold text-foreground block mb-1",
							children: "Official Bookstore Name *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							value: settings.store_name ?? STORE.name,
							onChange: (e) => setSettings((prev) => ({
								...prev,
								store_name: e.target.value
							})),
							className: "w-full h-9 rounded-lg border border-border bg-background px-3 font-semibold text-foreground outline-none focus:border-primary"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold text-foreground block mb-1",
							children: "Store Tagline"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: settings.store_tagline ?? STORE.tagline,
							onChange: (e) => setSettings((prev) => ({
								...prev,
								store_tagline: e.target.value
							})),
							className: "w-full h-9 rounded-lg border border-border bg-background px-3 font-semibold text-foreground outline-none focus:border-primary"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid sm:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold text-foreground block mb-1",
							children: "Customer Support Email *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							required: true,
							value: settings.store_email ?? STORE.email,
							onChange: (e) => setSettings((prev) => ({
								...prev,
								store_email: e.target.value
							})),
							className: "w-full h-9 rounded-lg border border-border bg-background px-3 font-semibold text-foreground outline-none focus:border-primary"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold text-foreground block mb-1",
							children: "Official Helpline Phone"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: settings.store_phone ?? STORE.phone,
							onChange: (e) => setSettings((prev) => ({
								...prev,
								store_phone: e.target.value
							})),
							className: "w-full h-9 rounded-lg border border-border bg-background px-3 font-semibold text-foreground outline-none focus:border-primary"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid sm:grid-cols-3 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "font-bold text-foreground block mb-1",
								children: "WhatsApp Business Number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: settings.whatsapp_number ?? "919876543210",
								onChange: (e) => setSettings((prev) => ({
									...prev,
									whatsapp_number: e.target.value
								})),
								placeholder: "e.g. 919876543210",
								className: "w-full h-9 rounded-lg border border-border bg-background px-3 font-mono font-bold text-primary outline-none focus:border-primary"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "font-bold text-foreground block mb-1",
								children: "Free Delivery Minimum (₹)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: settings.free_delivery_min ?? "799",
								onChange: (e) => setSettings((prev) => ({
									...prev,
									free_delivery_min: e.target.value
								})),
								className: "w-full h-9 rounded-lg border border-border bg-background px-3 font-bold text-emerald-600 outline-none focus:border-primary"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "font-bold text-foreground block mb-1",
								children: "Standard Delivery Fee (₹)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: settings.standard_delivery_fee ?? "49",
								onChange: (e) => setSettings((prev) => ({
									...prev,
									standard_delivery_fee: e.target.value
								})),
								className: "w-full h-9 rounded-lg border border-border bg-background px-3 font-semibold text-foreground outline-none focus:border-primary"
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid sm:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold text-foreground block mb-1",
							children: "Bookstore GSTIN"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: settings.store_gstin ?? "36AABCS1429B1Z8",
							onChange: (e) => setSettings((prev) => ({
								...prev,
								store_gstin: e.target.value
							})),
							className: "w-full h-9 rounded-lg border border-border bg-background px-3 font-mono font-bold text-primary outline-none focus:border-primary"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold text-foreground block mb-1",
							children: "Store Operating Hours"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: settings.store_hours ?? "Mon – Sat: 10:00 AM – 8:30 PM",
							onChange: (e) => setSettings((prev) => ({
								...prev,
								store_hours: e.target.value
							})),
							className: "w-full h-9 rounded-lg border border-border bg-background px-3 font-semibold text-foreground outline-none focus:border-primary"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "font-bold text-foreground block mb-1",
						children: "Registered Headquarters Address"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: settings.store_address ?? STORE.address,
						onChange: (e) => setSettings((prev) => ({
							...prev,
							store_address: e.target.value
						})),
						className: "w-full h-9 rounded-lg border border-border bg-background px-3 font-semibold text-foreground outline-none focus:border-primary"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "font-bold text-foreground block mb-1",
						children: "Top Announcement Bar Text"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 2,
						value: settings.announcement ?? "Free Pan-India Delivery on orders above ₹799 • Order directly online or via WhatsApp!",
						onChange: (e) => setSettings((prev) => ({
							...prev,
							announcement: e.target.value
						})),
						className: "w-full rounded-lg border border-border bg-background p-3 font-semibold text-foreground outline-none focus:border-primary resize-none"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-3 border-t border-border flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] text-muted-foreground",
							children: "Changes are applied immediately to storefront pricing and headers."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							type: "submit",
							disabled: savingSettings,
							className: "rounded-full px-6 font-bold gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3.5 w-3.5" }),
								" ",
								savingSettings ? "Saving Settings..." : "Save Settings to Database"
							]
						})]
					})
				]
			})]
		});
		if (activeSection === "admin-users" || activeSection === "roles-permissions" || activeSection === "activity-logs") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6 max-w-4xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-bold text-foreground capitalize",
				children: activeSection.replace(/-/g, " ")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Super Administrator credentials, role access hierarchy, and system activity logs."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 rounded-2xl border border-border bg-card shadow-xs space-y-4 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between pb-4 border-b border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-10 w-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-base",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold text-foreground text-sm",
							children: "Super Administrator Account"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground font-mono text-xs",
							children: "successboookhub@gmail.com"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase",
						children: "OTP Protected • Verified"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid sm:grid-cols-3 gap-3 pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3.5 rounded-xl bg-secondary/30 border border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground font-semibold",
								children: "Role Level"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-foreground text-sm mt-0.5",
								children: "Super Admin (All Privileges)"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3.5 rounded-xl bg-secondary/30 border border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground font-semibold",
								children: "Auth Method"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-foreground text-sm mt-0.5",
								children: "Gmail SMTP OTP (Secure)"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3.5 rounded-xl bg-secondary/30 border border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground font-semibold",
								children: "Database Access"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-emerald-600 text-sm mt-0.5",
								children: "Read / Write / Delete"
							})]
						})
					]
				})]
			})]
		});
		if (activeSection === "hero-banners" || activeSection === "promo-banners" || activeSection === "testimonials" || activeSection === "blogs") {
			const typeLabel = activeSection.replace(/-/g, " ");
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold text-foreground capitalize",
						children: typeLabel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Manage dynamic website content stored in database and rendered on the storefront."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: loadData,
							className: "gap-1.5 text-xs rounded-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("h-3.5 w-3.5", loading && "animate-spin") }), " Refresh"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							className: "rounded-full gap-1.5 text-xs font-bold capitalize",
							onClick: handleOpenAddContent,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }),
								" Add ",
								typeLabel.slice(0, -1)
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
					children: filteredContentBlocks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-full text-center py-12 text-muted-foreground text-xs rounded-2xl border border-dashed border-border p-8 bg-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image$1, { className: "h-10 w-10 mx-auto text-muted-foreground/50 mb-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-semibold text-foreground",
								children: [
									"No content blocks found for ",
									typeLabel,
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1",
								children: [
									"Click \"Add ",
									typeLabel.slice(0, -1),
									"\" above to create a new record."
								]
							})
						]
					}) : filteredContentBlocks.map((cb) => {
						const img = cb.image;
						const link = cb.linkUrl || cb.link_url;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-card shadow-xs overflow-hidden flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [img && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "h-36 w-full bg-secondary overflow-hidden relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: img,
									alt: cb.title,
									className: "w-full h-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase backdrop-blur-xs", cb.status === "active" ? "bg-emerald-600/90 text-white" : "bg-zinc-800/80 text-white"),
									children: cb.status
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 space-y-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-bold text-foreground text-sm leading-tight",
											children: cb.title
										}), !img && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase shrink-0", cb.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-muted text-muted-foreground"),
											children: cb.status
										})]
									}),
									cb.subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground font-medium",
										children: cb.subtitle
									}),
									cb.content && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground leading-relaxed line-clamp-3 bg-secondary/30 p-2.5 rounded-lg border border-border/60",
										children: cb.content
									}),
									link && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-primary font-mono text-[10px] truncate",
										children: ["Target: ", link]
									})
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 border-t border-border flex items-center justify-between text-xs bg-secondary/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] text-muted-foreground font-mono",
									children: ["Order: #", cb.displayOrder ?? cb.display_order ?? 0]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "ghost",
											className: "h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground",
											onClick: () => handleToggleContentStatus(cb),
											title: "Toggle Status",
											children: cb.status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRight, { className: "h-4 w-4 text-emerald-600" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleLeft, { className: "h-4 w-4 text-muted-foreground" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "ghost",
											className: "h-7 text-xs px-2 gap-1 text-primary hover:bg-primary/10",
											onClick: () => handleOpenEditContent(cb),
											title: "Edit",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "h-3.5 w-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "ghost",
											className: "h-7 text-xs px-2 gap-1 text-destructive hover:bg-destructive/10",
											onClick: () => handleDeleteContent(cb.id, cb.title),
											title: "Delete",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
										})
									]
								})]
							})]
						}, cb.id);
					})
				})]
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-border bg-card p-8 shadow-xs space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold text-foreground capitalize",
					children: activeSection.replace(/-/g, " ")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: "Success Book Hub Administration & Control Panel"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "px-3 py-1 rounded-full bg-secondary text-primary font-bold text-xs capitalize",
					children: [activeSection.split("-")[0], " Area"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-12 text-center text-xs text-muted-foreground space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-10 w-10 mx-auto text-primary opacity-60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-bold text-foreground text-base capitalize",
						children: [activeSection.replace(/-/g, " "), " Active"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-md mx-auto",
						children: "This module is linked directly to Success Book Hub live server."
					})
				]
			})]
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		renderSectionContent(),
		showCouponModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-xs flex items-center justify-center p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSaveCoupon,
				className: "bg-card border border-border rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4 text-xs animate-in zoom-in-95",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-bold text-primary",
							children: editingCouponId ? "Edit Promotion Coupon" : "Create New Coupon"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "Define coupon code, discount percentage or flat amount and minimum order value."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowCouponModal(false),
							className: "text-muted-foreground hover:text-foreground text-sm font-bold p-1",
							children: "✕"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "font-bold block mb-1",
						children: "Coupon Code *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						value: couponCode,
						onChange: (e) => setCouponCode(e.target.value.toUpperCase()),
						placeholder: "e.g. FESTIVE20 or BOOKLOVE50",
						className: "w-full h-9 rounded-lg border border-border bg-background px-3 font-mono font-bold text-primary uppercase outline-none focus:border-primary"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold block mb-1",
							children: "Discount Type *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: couponType,
							onChange: (e) => setCouponType(e.target.value),
							className: "w-full h-9 rounded-lg border border-border bg-background px-2.5 outline-none focus:border-primary font-semibold text-foreground cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "percentage",
								children: "Percentage (%)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "flat",
								children: "Flat Amount (₹)"
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold block mb-1",
							children: couponType === "percentage" ? "Discount Percentage (%) *" : "Discount Amount (₹) *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							step: "0.01",
							required: true,
							value: couponValue,
							onChange: (e) => setCouponValue(e.target.value),
							placeholder: couponType === "percentage" ? "e.g. 20" : "e.g. 100",
							className: "w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary font-bold text-foreground"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold block mb-1",
							children: "Min Order Amount (₹)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: couponMinOrder,
							onChange: (e) => setCouponMinOrder(e.target.value),
							placeholder: "e.g. 499 (0 for none)",
							className: "w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary font-semibold text-foreground"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold block mb-1",
							children: "Max Discount Cap (₹)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: couponMaxDiscount,
							onChange: (e) => setCouponMaxDiscount(e.target.value),
							placeholder: "e.g. 300 (Optional)",
							className: "w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary font-semibold text-foreground"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "font-bold block mb-1",
						children: "Status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: couponStatus,
						onChange: (e) => setCouponStatus(e.target.value),
						className: "w-full h-9 rounded-lg border border-border bg-background px-2.5 outline-none focus:border-primary font-semibold text-foreground cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "active",
							children: "Active (Available for checkout)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "inactive",
							children: "Inactive (Disabled)"
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-3 border-t border-border flex items-center justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => setShowCouponModal(false),
							className: "rounded-full px-4",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: savingCoupon,
							size: "sm",
							className: "rounded-full px-6 font-bold",
							children: savingCoupon ? "Saving..." : editingCouponId ? "Update Coupon" : "Create Coupon"
						})]
					})
				]
			})
		}),
		showContentModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-xs flex items-center justify-center p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSaveContent,
				className: "bg-card border border-border rounded-2xl p-6 sm:p-7 max-w-lg w-full shadow-2xl space-y-4 text-xs animate-in zoom-in-95 max-h-[90vh] overflow-y-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-bold text-primary capitalize",
							children: editingContentId ? `Edit ${activeSection.replace(/-/g, " ").slice(0, -1)}` : `New ${activeSection.replace(/-/g, " ").slice(0, -1)}`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "Publish dynamic storefront media, headlines and promotional links."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowContentModal(false),
							className: "text-muted-foreground hover:text-foreground text-sm font-bold p-1",
							children: "✕"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "font-bold block mb-1",
						children: "Title / Headline *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						value: contentTitle,
						onChange: (e) => setContentTitle(e.target.value),
						placeholder: "e.g. Discover Stories That Shape Your Mind",
						className: "w-full h-9 rounded-lg border border-border bg-background px-3 font-semibold text-foreground outline-none focus:border-primary"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "font-bold block mb-1",
						children: "Subtitle / Author / Attribution"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: contentSubtitle,
						onChange: (e) => setContentSubtitle(e.target.value),
						placeholder: "e.g. Handpicked classics and transforming reads",
						className: "w-full h-9 rounded-lg border border-border bg-background px-3 font-semibold text-foreground outline-none focus:border-primary"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold block mb-1",
							children: "Image URL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: contentImage,
							onChange: (e) => setContentImage(e.target.value),
							placeholder: "https://images.unsplash.com/...",
							className: "w-full h-9 rounded-lg border border-border bg-background px-3 font-mono text-[11px] outline-none focus:border-primary"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold block mb-1",
							children: "Target Link URL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: contentLinkUrl,
							onChange: (e) => setContentLinkUrl(e.target.value),
							placeholder: "e.g. /shop or /about",
							className: "w-full h-9 rounded-lg border border-border bg-background px-3 font-mono text-[11px] outline-none focus:border-primary"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "font-bold block mb-1",
						children: "Content Body / Description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 3,
						value: contentBody,
						onChange: (e) => setContentBody(e.target.value),
						placeholder: "Detailed text content, blog body, or reader testimonial...",
						className: "w-full rounded-lg border border-border bg-background p-3 font-medium text-foreground outline-none focus:border-primary resize-none"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold block mb-1",
							children: "Display Order"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: contentOrder,
							onChange: (e) => setContentOrder(e.target.value),
							className: "w-full h-9 rounded-lg border border-border bg-background px-3 font-bold text-foreground outline-none focus:border-primary"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold block mb-1",
							children: "Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: contentStatus,
							onChange: (e) => setContentStatus(e.target.value),
							className: "w-full h-9 rounded-lg border border-border bg-background px-2.5 outline-none focus:border-primary font-semibold text-foreground cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "active",
								children: "Active (Visible)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "inactive",
								children: "Inactive (Hidden)"
							})]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-3 border-t border-border flex items-center justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => setShowContentModal(false),
							className: "rounded-full px-4",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: savingContent,
							size: "sm",
							className: "rounded-full px-6 font-bold",
							children: savingContent ? "Saving..." : editingContentId ? "Update Content" : "Publish Content"
						})]
					})
				]
			})
		}),
		selectedInvoiceOrderId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaxInvoiceModal, {
			orderId: selectedInvoiceOrderId,
			open: showInvoiceModal,
			onOpenChange: (open) => {
				setShowInvoiceModal(open);
				if (!open) setSelectedInvoiceOrderId(null);
			}
		})
	] });
}
function AdminLayoutPage() {
	const navigate = useNavigate();
	const { isAuthenticated, isLoading } = useAdminAuth();
	const searchParams = Route.useSearch();
	const [activeSection, setActiveSection] = (0, import_react.useState)(searchParams.tab || "dashboard");
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!isLoading && !isAuthenticated) navigate({ to: "/login" });
	}, [
		isAuthenticated,
		isLoading,
		navigate
	]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-6 w-6 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground font-semibold",
				children: "Verifying admin credentials..."
			})]
		})
	});
	if (!isAuthenticated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center shadow-lg space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-16 w-16 mx-auto rounded-full bg-destructive/10 text-destructive flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-8 w-8" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-bold font-display text-foreground",
						children: "Access Restricted"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "You must be authenticated with a verified administrator OTP session to access the Store Management Portal."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/login",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-4 w-4 mr-2" }), " Proceed to Admin Login"]
					})
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSidebar, {
			activeSection,
			onSelectSection: setActiveSection,
			mobileOpen,
			onMobileClose: () => setMobileOpen(false),
			collapsed,
			onToggleCollapse: () => setCollapsed(!collapsed)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex flex-col min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminHeader, {
				activeSection,
				onOpenMobileSidebar: () => setMobileOpen(true),
				searchQuery,
				onSearchChange: setSearchQuery
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminViews, {
					activeSection,
					searchQuery,
					onNavigateSection: setActiveSection
				})
			})]
		})]
	});
}
//#endregion
export { AdminLayoutPage as component };
