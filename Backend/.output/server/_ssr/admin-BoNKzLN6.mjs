import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as api, n as STORE, o as categories, s as cn, t as Button } from "./button-Ba_olYRt.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as Bell, C as PanelLeftClose, F as Layers, G as CircleCheck, H as DollarSign, J as ChevronDown, K as CircleAlert, L as Funnel, M as LogOut, N as Library, P as LayoutDashboard, Q as BookOpen, R as FolderPlus, S as PanelLeftOpen, T as Package, V as ExternalLink, W as Circle, X as ChartColumn, Y as Check, _ as Search, c as Trash2, d as SlidersVertical, et as ArrowUpRight, f as ShoppingBag, h as Settings, i as Upload, k as Menu, l as Star, m as ShieldCheck, n as Users, o as TriangleAlert, p as Shield, q as ChevronRight, r as User, s as TrendingUp, t as X, tt as ArrowRight, u as Sparkles, v as RefreshCw, w as Palette, x as Pen, y as Plus, z as FolderOpen } from "../_libs/lucide-react.mjs";
import { t as Route } from "./admin-DpdfKBZV.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { i as Trigger$1, n as Portal, r as Root2$1, t as Content2$1 } from "../_libs/radix-ui__react-popover.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BoNKzLN6.js
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
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var Popover = Root2$1;
var PopoverTrigger = Trigger$1;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2$1.displayName;
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
		toast.success("Administrator logged out safely.");
		navigate({ to: "/" });
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
									children: "admin@successbookhub.com"
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
	const [selectedSubCatParentId, setSelectedSubCatParentId] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [showAddBook, setShowAddBook] = (0, import_react.useState)(false);
	const [newTitle, setNewTitle] = (0, import_react.useState)("");
	const [newAuthor, setNewAuthor] = (0, import_react.useState)("");
	const [newCategory, setNewCategory] = (0, import_react.useState)("Classics");
	const [newPrice, setNewPrice] = (0, import_react.useState)("");
	const [newOldPrice, setNewOldPrice] = (0, import_react.useState)("");
	const [newDescription, setNewDescription] = (0, import_react.useState)("");
	const [newCover, setNewCover] = (0, import_react.useState)("bg-primary");
	const [addingBook, setAddingBook] = (0, import_react.useState)(false);
	const loadData = async () => {
		setLoading(true);
		try {
			const [fetchedBooks, fetchedOrders, fetchedCats] = await Promise.all([
				api.getBooks(),
				api.getAllOrders().catch(() => []),
				api.getCategories().catch(() => [])
			]);
			setBooks(fetchedBooks || []);
			setOrders(fetchedOrders || []);
			setDbCategories(fetchedCats || []);
			if (fetchedCats && fetchedCats.length > 0) setNewCategory(fetchedCats[0].name);
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
				description: newDescription.trim(),
				cover: newCover
			});
			toast.success(`"${newTitle}" added to catalog!`);
			setShowAddBook(false);
			setNewTitle("");
			setNewAuthor("");
			setNewPrice("");
			setNewOldPrice("");
			setNewDescription("");
			loadData();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to add book");
		} finally {
			setAddingBook(false);
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
	if (activeSection === "books") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold text-foreground",
					children: "Books Inventory"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Manage your titles, stock, prices, and classifications."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setShowAddBook(true),
					className: "rounded-full gap-2 text-xs font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add New Book"]
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
									children: "Title & Author"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3.5",
									children: "Price"
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
							children: filteredBooks.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-secondary/20",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-3.5 font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold text-foreground text-sm font-display",
											children: b.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-muted-foreground",
											children: ["by ", b.author]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "px-2.5 py-0.5 rounded-full bg-secondary text-primary font-bold text-[10px]",
											children: b.category
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-3.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-foreground",
											children: ["₹", b.price]
										}), b.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "ml-1.5 text-muted-foreground line-through",
											children: ["₹", b.oldPrice]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px]",
											children: [b.stock ?? 30, " copies"]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-3.5 flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-gold text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-foreground",
											children: b.rating
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3.5 text-right space-x-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "ghost",
											className: "h-7 text-xs text-destructive hover:bg-destructive/10",
											onClick: async () => {
												if (confirm(`Remove "${b.title}" from catalog?`)) try {
													await api.deleteBook(b.id);
													toast.success(`Removed "${b.title}"`);
													loadData();
												} catch (err) {
													toast.error(err instanceof Error ? err.message : "Failed to delete book");
												}
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
										})
									})
								]
							}, b.id))
						})]
					})
				})
			}),
			showAddBook && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleCreateBook,
					className: "bg-card border border-border rounded-xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-xs animate-in zoom-in-95",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-bold text-primary",
								children: "Add Book to Inventory"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowAddBook(false),
								className: "text-muted-foreground hover:text-foreground",
								children: "✕"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold block mb-1",
							children: "Book Title *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							value: newTitle,
							onChange: (e) => setNewTitle(e.target.value),
							placeholder: "e.g. Meditations",
							className: "w-full h-9 rounded-md border border-border bg-background px-3 outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "font-bold block mb-1",
								children: "Author *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: newAuthor,
								onChange: (e) => setNewAuthor(e.target.value),
								placeholder: "e.g. Marcus Aurelius",
								className: "w-full h-9 rounded-md border border-border bg-background px-3 outline-none focus:border-primary"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "font-bold block mb-1",
								children: "Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: newCategory,
								onChange: (e) => setNewCategory(e.target.value),
								className: "w-full h-9 rounded-md border border-border bg-background px-2 outline-none focus:border-primary",
								children: (dbCategories.length > 0 ? dbCategories.map((c) => c.name) : categories.filter((c) => c !== "All")).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c,
									children: c
								}, c))
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "font-bold block mb-1",
								children: "Selling Price (₹) *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								required: true,
								value: newPrice,
								onChange: (e) => setNewPrice(e.target.value),
								placeholder: "349",
								className: "w-full h-9 rounded-md border border-border bg-background px-3 outline-none focus:border-primary"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "font-bold block mb-1",
								children: "Original Price (₹)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: newOldPrice,
								onChange: (e) => setNewOldPrice(e.target.value),
								placeholder: "449",
								className: "w-full h-9 rounded-md border border-border bg-background px-3 outline-none focus:border-primary"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-bold block mb-1",
							children: "Synopsis"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: newDescription,
							onChange: (e) => setNewDescription(e.target.value),
							placeholder: "Brief synopsis...",
							className: "w-full rounded-md border border-border bg-background p-2 outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setShowAddBook(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: addingBook,
								children: addingBook ? "Saving..." : "Save Book"
							})]
						})
					]
				})
			})
		]
	});
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
	const searchParams = Route.useSearch();
	const [activeSection, setActiveSection] = (0, import_react.useState)(searchParams.tab || "dashboard");
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
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
