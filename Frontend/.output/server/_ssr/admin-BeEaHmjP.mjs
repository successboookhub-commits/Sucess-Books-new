import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as api, n as STORE, o as categories, s as cn, t as Button } from "./button-XQbb4kXE.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Library, D as PanelLeftClose, E as PanelLeftOpen, G as Funnel, H as Layers, I as LogOut, K as FolderPlus, L as LogIn, N as Menu, O as Palette, S as Plus, T as PenLine, V as LayoutDashboard, X as ExternalLink, Z as DollarSign, at as ChevronDown, c as Trash2, d as SlidersVertical, f as ShoppingBag, ft as ArrowUpRight, g as Settings, h as ShieldAlert, i as Upload, it as ChevronRight, k as Package, l as Star, lt as BookOpen, m as ShieldCheck, n as Users, nt as CircleCheck, o as TriangleAlert, p as Shield, pt as ArrowRight, q as FolderOpen, r as User, rt as CircleAlert, s as TrendingUp, st as ChartColumn, t as X, u as Sparkles, ut as Bell, v as Search, w as Pen, y as RefreshCw } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useAdminAuth } from "./auth-DLAu8YU6.mjs";
import { a as DropdownMenuSeparator, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, s as Route, t as DropdownMenu } from "./admin-DtA3FEI9.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/radix-ui__react-popover.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BeEaHmjP.js
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
					id: "authors",
					label: "Authors"
				},
				{
					id: "publishers",
					label: "Publishers"
				},
				{
					id: "books",
					label: "Books"
				},
				{
					id: "inventory",
					label: "Inventory"
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
					id: "inventory-report",
					label: "Inventory Report"
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
								className: "block font-display font-bold text-sm tracking-tight text-primary truncate",
								children: STORE.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
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
		case "books": return {
			category: "Catalog",
			item: "Books Inventory"
		};
		case "inventory": return {
			category: "Catalog",
			item: "Stock Levels"
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
		case "sales-report": return {
			category: "Reports",
			item: "Sales Analytics"
		};
		case "revenue-report": return {
			category: "Reports",
			item: "Revenue Breakdown"
		};
		case "inventory-report": return {
			category: "Reports",
			item: "Inventory Valuation"
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
			title: "Low Inventory Alert",
			desc: "A Brief History of Time has 22 copies remaining",
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
	const handleImageFileUpload = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > 4194304) {
			toast.error("File size is too large (max 4MB)");
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === "string") {
				setImage(reader.result);
				toast.success("Image loaded successfully");
			}
		};
		reader.readAsDataURL(file);
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
								src: cat.image || PRESET_IMAGES[0].url,
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
										className: "h-9 px-3 rounded-md border border-border bg-secondary/70 hover:bg-secondary cursor-pointer flex items-center gap-1.5 text-xs font-semibold text-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-3.5 w-3.5" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Upload" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "file",
												accept: "image/*",
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
function SubCategoryManager({ initialCategoryId, onNavigateToCategories }) {
	const [subCategories, setSubCategories] = (0, import_react.useState)([]);
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedCategoryFilter, setSelectedCategoryFilter] = (0, import_react.useState)(initialCategoryId ? String(initialCategoryId) : "all");
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [isModalOpen, setIsModalOpen] = (0, import_react.useState)(false);
	const [editingSub, setEditingSub] = (0, import_react.useState)(null);
	const [deletingSub, setDeletingSub] = (0, import_react.useState)(null);
	const [categoryId, setCategoryId] = (0, import_react.useState)(0);
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [image, setImage] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("active");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const loadData = async () => {
		setLoading(true);
		try {
			const [cats, subs] = await Promise.all([api.getCategories(), api.getSubCategories()]);
			setCategories(cats);
			setSubCategories(subs);
			if (cats.length > 0 && !categoryId) setCategoryId(cats[0].id);
		} catch (err) {
			toast.error(err.message || "Failed to load sub-categories");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, []);
	(0, import_react.useEffect)(() => {
		if (initialCategoryId) setSelectedCategoryFilter(String(initialCategoryId));
	}, [initialCategoryId]);
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
		const targetCatId = presetCategoryId || (categories.length > 0 ? categories[0].id : 0);
		setCategoryId(targetCatId);
		setName("");
		setDescription("");
		setImage(PRESET_SUB_IMAGES[0].url);
		setStatus("active");
		setIsModalOpen(true);
	};
	const handleOpenEdit = (sub) => {
		setEditingSub(sub);
		setCategoryId(sub.category_id);
		setName(sub.name);
		setDescription(sub.description || "");
		setImage(sub.image || "");
		setStatus(sub.status);
		setIsModalOpen(true);
	};
	const handleImageFileUpload = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > 4194304) {
			toast.error("File size is too large (max 4MB)");
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === "string") {
				setImage(reader.result);
				toast.success("Image loaded successfully");
			}
		};
		reader.readAsDataURL(file);
	};
	const handleSave = async (e) => {
		e.preventDefault();
		if (!categoryId) {
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
					category_id: categoryId,
					name: name.trim(),
					description: description.trim(),
					image: image.trim(),
					status
				});
				setSubCategories((prev) => prev.map((s) => s.id === updated.id ? updated : s));
				toast.success(`Sub-category "${updated.name}" updated successfully`);
			} else {
				const created = await api.createSubCategory({
					category_id: categoryId,
					name: name.trim(),
					description: description.trim(),
					image: image.trim(),
					status
				});
				setSubCategories((prev) => [...prev, created]);
				toast.success(`Sub-category "${created.name}" created successfully`);
			}
			setIsModalOpen(false);
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
									categories.length
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
							className: "h-8.5 rounded-lg border border-border bg-background px-2.5 text-xs font-semibold outline-none focus:border-primary w-full cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: "all",
								children: [
									"All Parent Categories (",
									categories.length,
									")"
								]
							}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
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
													src: sub.image || PRESET_SUB_IMAGES[0].url,
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
								onClick: () => setIsModalOpen(false),
								className: "text-muted-foreground hover:text-foreground text-sm font-bold p-1",
								children: "✕"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold text-foreground block mb-1",
							children: "Parent Category *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							required: true,
							value: categoryId,
							onChange: (e) => setCategoryId(Number(e.target.value)),
							className: "w-full h-9 rounded-md border border-border bg-background px-3 text-xs font-semibold outline-none focus:border-primary cursor-pointer",
							children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
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
										className: "h-9 px-3 rounded-md border border-border bg-secondary/70 hover:bg-secondary cursor-pointer flex items-center gap-1.5 text-xs font-semibold text-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-3.5 w-3.5" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Upload" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "file",
												accept: "image/*",
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
								onClick: () => setIsModalOpen(false),
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
	const [contacts, setContacts] = (0, import_react.useState)([]);
	const [dbCategories, setDbCategories] = (0, import_react.useState)([]);
	const [dbSubCategories, setDbSubCategories] = (0, import_react.useState)([]);
	const [selectedSubCatParentId, setSelectedSubCatParentId] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
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
	const loadData = async () => {
		setLoading(true);
		try {
			const [fetchedBooks, fetchedOrders, fetchedCats, fetchedSubCats] = await Promise.all([
				api.getBooks(),
				api.getAllOrders().catch(() => []),
				api.getCategories().catch(() => []),
				api.getSubCategories().catch(() => [])
			]);
			setBooks(fetchedBooks || []);
			setOrders(fetchedOrders || []);
			setDbCategories(fetchedCats || []);
			setDbSubCategories(fetchedSubCats || []);
			if (fetchedCats && fetchedCats.length > 0 && !newCategory) setNewCategory(fetchedCats[0].name);
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
	const handleOpenAddBook = () => {
		setEditingBookId(null);
		setNewTitle("");
		setNewAuthor("");
		setNewCategory(dbCategories.length > 0 ? dbCategories[0].name : "Classics");
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
		setNewCategory(b.category || (dbCategories.length > 0 ? dbCategories[0].name : "Classics"));
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
	const filteredBooks = books.filter((b) => `${b.title} ${b.author} ${b.category}`.toLowerCase().includes(searchQuery.toLowerCase()));
	const filteredOrders = orders.filter((o) => `${o.id} ${o.customerName} ${o.customerPhone} ${o.status}`.toLowerCase().includes(searchQuery.toLowerCase()));
	const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0) + 14850;
	if (activeSection === "dashboard") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-5 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground text-xs font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Revenue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "p-2 rounded-lg bg-emerald-50 text-emerald-700",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-2xl font-bold text-foreground mt-2",
								children: ["₹", totalRevenue.toLocaleString()]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3" }), " +18.4% from last month"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-5 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground text-xs font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Customer Orders" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "p-2 rounded-lg bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl font-bold text-foreground mt-2",
								children: orders.length + 38
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-muted-foreground mt-1",
								children: [orders.filter((o) => o.status === "pending").length, " pending delivery"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-5 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground text-xs font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Books in Catalog" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "p-2 rounded-lg bg-amber-50 text-amber-700",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl font-bold text-foreground mt-2",
								children: books.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground mt-1",
								children: "Across 6 literary categories"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-5 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted-foreground text-xs font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Active Readers" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "p-2 rounded-lg bg-blue-50 text-blue-700",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl font-bold text-foreground mt-2",
								children: "2,500+"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-blue-600 font-semibold mt-1",
								children: "Pan-India readership"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-secondary/40 p-4 flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold text-foreground",
							children: "Quick Store Actions:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							className: "rounded-full text-xs h-8 gap-1",
							onClick: () => setShowAddBook(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Add New Book"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							className: "rounded-full text-xs h-8 gap-1",
							onClick: loadData,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("h-3 w-3", loading && "animate-spin") }), " Sync Backend"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: "Connected to SQLite Database"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 rounded-xl border border-border bg-card p-5 shadow-xs space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-bold text-foreground",
							children: "Recent Customer Bookings"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Live orders placed by readers."
						})] })
					}), orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground py-8 text-center italic",
						children: "No orders recorded yet. As customers book books, they will appear here."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-xs text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "border-b border-border text-muted-foreground font-semibold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2",
										children: "Order ID"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2",
										children: "Customer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2",
										children: "Total"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2 text-right",
										children: "Action"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border/60",
								children: orders.slice(0, 5).map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-secondary/20",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2.5 font-bold text-primary font-display",
											children: order.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold text-foreground",
												children: order.customerName
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground",
												children: order.customerPhone
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-2.5 font-bold",
											children: ["₹", order.total]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", order.status === "delivered" ? "bg-emerald-100 text-emerald-800" : order.status === "dispatched" ? "bg-blue-100 text-blue-800" : order.status === "confirmed" ? "bg-amber-100 text-amber-800" : order.status === "cancelled" ? "bg-red-100 text-red-800" : "bg-orange-100 text-orange-800"),
												children: order.status
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2.5 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: order.status,
												onChange: (e) => handleStatusUpdate(order.id, e.target.value),
												className: "h-7 rounded text-[11px] border border-border bg-background px-2 font-medium cursor-pointer",
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
											})
										})
									]
								}, order.id))
							})]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-5 shadow-xs space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-bold text-foreground",
						children: "Shelves Breakdown"
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
										className: "font-medium text-foreground",
										children: cat
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
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
										className: "h-full bg-primary",
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
						children: "Books Inventory"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Manage your book titles, 2-image galleries, categories, subcategories, MRP, selling prices & discounts."
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
							className: "rounded-full gap-2 text-xs font-semibold bg-primary text-primary-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add New Book"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
										children: "Cover"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3.5",
										children: "Title & Author"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3.5",
										children: "Category / Sub-Genre"
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
										children: "Stock"
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
								children: filteredBooks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 8,
									className: "p-8 text-center text-muted-foreground",
									children: "No books found. Click \"Add New Book\" to add your first title!"
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
														className: "absolute bottom-0.5 right-0.5 bg-black/70 text-[7px] text-white px-0.5 rounded",
														title: "2 Images",
														children: "2🖼"
													})]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-3.5 font-medium max-w-[200px]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-bold text-foreground text-sm font-display truncate",
														children: b.title
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[11px] text-muted-foreground truncate",
														children: ["by ", b.author]
													}),
													b.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "inline-block mt-0.5 text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200",
														children: "★ Featured"
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
													className: "px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-extrabold text-[11px]",
													children: [disc, "% OFF"]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground text-[11px]",
													children: "Regular"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3.5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: cn("px-2 py-0.5 rounded-full font-semibold text-[11px]", (b.stock ?? 30) > 10 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"),
													children: [b.stock ?? 30, " in stock"]
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
									children: "Fill in book details, multiple images, categories, MRP and discount prices."
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
								className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold block mb-1",
									children: "Book Title / Name *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									value: newTitle,
									onChange: (e) => setNewTitle(e.target.value),
									placeholder: "e.g. The Secret Garden",
									className: "w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary text-foreground"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold block mb-1",
									children: "Author Name *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									value: newAuthor,
									onChange: (e) => setNewAuthor(e.target.value),
									placeholder: "e.g. Frances Hodgson Burnett",
									className: "w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary text-foreground"
								})] })]
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
								className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
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
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
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
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold block mb-1",
										children: "Stock Quantity"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: "0",
										value: newStock,
										onChange: (e) => setNewStock(e.target.value),
										placeholder: "50",
										className: "w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary"
									})] })
								]
							}),
							previewDiscount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-emerald-800",
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 border-t border-border/60 pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "font-bold block",
												children: "Front Cover Image URL (Image 1) *"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												required: true,
												value: newCover,
												onChange: (e) => setNewCover(e.target.value),
												placeholder: "https://images.unsplash.com/...",
												className: "w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary text-foreground"
											}),
											newCover && (newCover.startsWith("http") || newCover.startsWith("/")) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1 h-20 w-16 rounded-md overflow-hidden border border-border shadow-xs",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: newCover,
													alt: "Cover Preview",
													className: "h-full w-full object-cover"
												})
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "font-bold block",
												children: "Second / Inside Image URL (Image 2 - Optional)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: newImage2,
												onChange: (e) => setNewImage2(e.target.value),
												placeholder: "https://images.unsplash.com/...",
												className: "w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary text-foreground"
											}),
											newImage2 && (newImage2.startsWith("http") || newImage2.startsWith("/")) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1 h-20 w-16 rounded-md overflow-hidden border border-border shadow-xs",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: newImage2,
													alt: "Image 2 Preview",
													className: "h-full w-full object-cover"
												})
											})
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 pt-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground font-semibold",
											children: "Quick image presets:"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setNewCover("https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"),
											className: "text-[10px] text-primary hover:underline",
											children: "Classic Book"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "•"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setNewCover("https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop"),
											className: "text-[10px] text-primary hover:underline",
											children: "Novel"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "•"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setNewCover("https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop"),
											className: "text-[10px] text-primary hover:underline",
											children: "Self Help"
										})
									]
								})]
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
				children: "Orders Management"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Review incoming book orders and track delivery statuses."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "outline",
				onClick: loadData,
				className: "gap-1.5 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("h-3.5 w-3.5", loading && "animate-spin") }), " Refresh Orders"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
								children: "Order ID & Date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3.5",
								children: "Customer Details"
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
								children: "Total"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3.5",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3.5 text-right",
								children: "Update Status"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border/60",
						children: filteredOrders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-secondary/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "p-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display font-bold text-primary text-sm",
										children: o.id
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground",
										children: o.createdAt
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "p-3.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold text-foreground",
											children: o.customerName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-muted-foreground",
											children: o.customerPhone
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground truncate max-w-xs",
											children: o.deliveryAddress
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-0.5",
										children: o.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-foreground",
											children: [
												item.title,
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-muted-foreground font-semibold",
													children: ["× ", item.quantity]
												})
											]
										}, i))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3.5 font-medium",
									children: o.paymentMethod
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
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
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
									})
								})
							]
						}, o.id))
					})]
				})
			})
		})]
	});
	if (activeSection === "categories") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryManager, {
		onNavigateToSubCategories: (catId) => {
			setSelectedSubCatParentId(catId || null);
			if (onNavigateSection) onNavigateSection("sub-categories");
		},
		onOpenAddSubCategory: (cat) => {
			setSelectedSubCatParentId(cat.id);
			if (onNavigateSection) onNavigateSection("sub-categories");
		}
	});
	if (activeSection === "sub-categories") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubCategoryManager, {
		initialCategoryId: selectedSubCatParentId,
		onNavigateToCategories: () => {
			if (onNavigateSection) onNavigateSection("categories");
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-8 shadow-xs space-y-6",
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
		}), activeSection === "authors" || activeSection === "publishers" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Vetted authors and publishing houses in our catalog."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid sm:grid-cols-2 gap-3",
				children: [
					"Frances H. Burnett",
					"Rainer Maria Rilke",
					"Madeline Martin",
					"Stephen Hawking",
					"Jane Austen",
					"Yuval Noah Harari",
					"Emily Dickinson",
					"James Clear"
				].map((author) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3.5 rounded-lg border border-border bg-background flex items-center justify-between text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-foreground",
						children: author
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Original Edition Publisher"
					})]
				}, author))
			})]
		}) : activeSection === "inventory" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Live stock counts and reorder threshold monitoring."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid sm:grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-lg border border-border bg-emerald-50/50 text-emerald-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase",
							children: "Optimal Stock"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl font-bold mt-1",
							children: "12 Titles"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-lg border border-border bg-amber-50/50 text-amber-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase",
							children: "Low Stock Alert (<25)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl font-bold mt-1",
							children: "4 Titles"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-lg border border-border bg-blue-50/50 text-blue-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase",
							children: "Total Warehouse Units"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl font-bold mt-1",
							children: "540 Copies"
						})]
					})
				]
			})]
		}) : activeSection === "reviews" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Reader reviews submitted across all books."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2.5",
				children: [
					{
						user: "Meera Roy",
						book: "The Secret Garden",
						stars: 5,
						text: "Received in gorgeous packaging with a handwritten note! What a joy to read."
					},
					{
						user: "Arjun Sen",
						book: "The Secret Garden",
						stars: 5,
						text: "The paper quality and cover feel so premium. Five stars!"
					},
					{
						user: "Priya Nair",
						book: "Letters to a Young Poet",
						stars: 5,
						text: "Rilke's words will change how you view solitude. Must read."
					}
				].map((rev, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 rounded-lg border border-border bg-card text-xs space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-bold text-foreground",
							children: [
								rev.user,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground font-normal",
									children: ["on ", rev.book]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex text-gold",
							children: Array.from({ length: rev.stars }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-gold" }, i))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground leading-relaxed",
						children: rev.text
					})]
				}, idx))
			})]
		}) : activeSection.includes("report") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 rounded-xl bg-secondary/30 border border-border text-center space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarChart3, { className: "h-10 w-10 mx-auto text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "font-display text-lg font-bold text-foreground capitalize",
						children: [activeSection.replace(/-/g, " "), " Summary"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground max-w-md mx-auto",
						children: "Automated analytics generated from store bookings and catalog valuation. All values are calculated in INR."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-4 flex justify-center gap-6 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "30-Day Growth:"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-emerald-600",
									children: "+22.4%"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Avg Order Value:"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "₹485" })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Fulfillment Rate:"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-emerald-600",
									children: "98.2%"
								})
							] })
						]
					})
				]
			})
		}) : activeSection.includes("settings") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 max-w-xl text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "font-bold text-foreground block mb-1",
						children: "Store Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						readOnly: true,
						value: STORE.name,
						className: "w-full h-9 rounded-md border border-border bg-muted/40 px-3 font-semibold"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "font-bold text-foreground block mb-1",
						children: "Official WhatsApp"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						readOnly: true,
						value: STORE.phone,
						className: "w-full h-9 rounded-md border border-border bg-muted/40 px-3 font-semibold"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "font-bold text-foreground block mb-1",
						children: "Kolkata Headquarters"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						readOnly: true,
						value: STORE.address,
						className: "w-full h-9 rounded-md border border-border bg-muted/40 px-3 font-semibold"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "font-bold text-foreground block mb-1",
						children: "Free Delivery Minimum"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						readOnly: true,
						value: "₹799",
						className: "w-full h-9 rounded-md border border-border bg-muted/40 px-3 font-semibold"
					})] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				className: "rounded-full mt-2",
				onClick: () => toast.success("Store settings verified."),
				children: "Save Changes"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "py-8 text-center text-xs text-muted-foreground space-y-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, { className: "h-8 w-8 mx-auto text-muted-foreground opacity-50" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-semibold text-foreground capitalize",
					children: [activeSection.replace(/-/g, " "), " Module"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Configured and operational under Success Book Hub Admin Core." })
			]
		})]
	});
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
