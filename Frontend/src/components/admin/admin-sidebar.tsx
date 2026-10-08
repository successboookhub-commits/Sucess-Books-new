import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Library,
  ShoppingBag,
  Users,
  Palette,
  BarChart3,
  Settings,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  BookOpen,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  ArrowUpRight
} from "lucide-react";
import { type AdminSection, type AdminMenuCategory } from "./admin-types";
import { cn } from "@/lib/utils";
import { STORE } from "@/lib/books";

interface AdminSidebarProps {
  activeSection: AdminSection;
  onSelectSection: (section: AdminSection) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  ordersCount?: number;
}

export function AdminSidebar({
  activeSection,
  onSelectSection,
  mobileOpen,
  onMobileClose,
  collapsed,
  onToggleCollapse,
  ordersCount = 0,
}: AdminSidebarProps) {
  // Controlled open accordions
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    catalog: true,
    sales: true,
    customers: false,
    content: false,
    reports: false,
    settings: false,
    "admin-management": false,
  });

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const menuGroups: AdminMenuCategory[] = [
    {
      id: "catalog",
      title: "Catalog",
      icon: Library,
      items: [
        { id: "categories", label: "Categories" },
        { id: "sub-categories", label: "Sub Categories" },
        { id: "authors", label: "Authors" },
        { id: "publishers", label: "Publishers" },
        { id: "books", label: "Books" },
        { id: "inventory", label: "Inventory" },
      ],
    },
    {
      id: "sales",
      title: "Sales",
      icon: ShoppingBag,
      items: [
        { id: "orders", label: "Orders", badge: ordersCount > 0 ? ordersCount : undefined },
        { id: "payments", label: "Payments" },
        { id: "coupons", label: "Coupons" },
      ],
    },
    {
      id: "customers",
      title: "Customers",
      icon: Users,
      items: [
        { id: "users", label: "Users" },
        { id: "addresses", label: "Addresses" },
        { id: "reviews", label: "Reviews" },
      ],
    },
    {
      id: "content",
      title: "Content",
      icon: Palette,
      items: [
        { id: "hero-banners", label: "Hero Banners" },
        { id: "promo-banners", label: "Promotional Banners" },
        { id: "testimonials", label: "Testimonials" },
        { id: "blogs", label: "Blogs (Optional)" },
      ],
    },
    {
      id: "reports",
      title: "Reports",
      icon: BarChart3,
      items: [
        { id: "sales-report", label: "Sales Report" },
        { id: "revenue-report", label: "Revenue Report" },
        { id: "inventory-report", label: "Inventory Report" },
        { id: "customer-report", label: "Customer Report" },
      ],
    },
    {
      id: "settings",
      title: "Settings",
      icon: Settings,
      items: [
        { id: "website-settings", label: "Website Settings" },
        { id: "delivery-charges", label: "Delivery Charges" },
        { id: "tax-settings", label: "Tax Settings" },
        { id: "social-links", label: "Social Links" },
        { id: "contact-details", label: "Contact Details" },
        { id: "email-settings", label: "Email Settings" },
      ],
    },
    {
      id: "admin-management",
      title: "Admin Management",
      icon: ShieldCheck,
      items: [
        { id: "admin-users", label: "Admin Users" },
        { id: "roles-permissions", label: "Roles & Permissions" },
        { id: "activity-logs", label: "Activity Logs" },
      ],
    },
  ];

  const handleItemClick = (section: AdminSection) => {
    onSelectSection(section);
    onMobileClose();
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-card border-r border-border text-card-foreground select-none">
      {/* Sidebar Header / Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <BookOpen className="h-5 w-5" />
          </span>
          {!collapsed && (
            <div className="min-w-0">
              <span className="block font-display font-bold text-sm tracking-tight text-foreground truncate">
                {STORE.name}
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-amber-600">
                Admin Portal
              </span>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>

        {/* Mobile Close Button */}
        <button
          onClick={onMobileClose}
          className="lg:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Nav Items List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 text-xs scrollbar-none">
        {/* 1. Dashboard */}
        <button
          onClick={() => handleItemClick("dashboard")}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition text-left",
            activeSection === "dashboard"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
          title="Dashboard"
        >
          <LayoutDashboard className="h-4 w-4 shrink-0" />
          {!collapsed && <span className="flex-1">Dashboard</span>}
        </button>

        {/* Separator */}
        <div className="py-1">
          <div className="h-px bg-border/60" />
        </div>

        {/* Menu Groups */}
        {menuGroups.map((group) => {
          const GroupIcon = group.icon;
          const isOpen = openGroups[group.id];
          const hasActiveChild = group.items.some((item) => item.id === activeSection);

          return (
            <div key={group.id} className="space-y-0.5">
              {/* Group Header */}
              <button
                onClick={() => {
                  if (collapsed) onToggleCollapse();
                  toggleGroup(group.id);
                }}
                className={cn(
                  "w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg font-semibold transition text-left",
                  hasActiveChild
                    ? "text-primary bg-secondary/50 font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                )}
                title={group.title}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <GroupIcon className={cn("h-4 w-4 shrink-0", hasActiveChild ? "text-primary" : "")} />
                  {!collapsed && <span className="truncate">{group.title}</span>}
                </div>
                {!collapsed && (
                  <span className="text-muted-foreground">
                    {isOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                  </span>
                )}
              </button>

              {/* Sub-items (Accordion Content) */}
              {!collapsed && isOpen && (
                <div className="pl-6 pr-1 py-1 space-y-0.5 border-l-2 border-border/80 ml-5">
                  {group.items.map((subItem) => {
                    const isSubActive = activeSection === subItem.id;
                    return (
                      <button
                        key={subItem.id}
                        onClick={() => handleItemClick(subItem.id)}
                        className={cn(
                          "w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium text-[11px] transition text-left",
                          isSubActive
                            ? "bg-primary text-primary-foreground font-bold shadow-xs"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        )}
                      >
                        <span className="truncate">{subItem.label}</span>
                        {subItem.badge !== undefined && (
                          <span className={cn(
                            "px-1.5 py-0.5 rounded-full text-[9px] font-bold",
                            isSubActive ? "bg-white/20 text-white" : "bg-primary/15 text-primary"
                          )}>
                            {subItem.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer: Quick Link to Public Store */}
      <div className="p-3 border-t border-border bg-secondary/30">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg text-xs font-semibold text-primary hover:bg-secondary transition border border-primary/20"
        >
          <BookOpen className="h-3.5 w-3.5" />
          {!collapsed && <span>View Online Store</span>}
          <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={cn(
          "hidden lg:block h-screen sticky top-0 transition-all duration-300 z-30 shrink-0",
          collapsed ? "w-18" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
            onClick={onMobileClose}
          />
          {/* Drawer Window */}
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-250">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
