import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Menu,
  Search,
  Bell,
  ChevronRight,
  User,
  LogOut,
  Settings,
  Shield,
  CheckCircle2,
  AlertCircle,
  Package,
  ExternalLink
} from "lucide-react";
import { type AdminSection } from "./admin-types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

interface AdminHeaderProps {
  activeSection: AdminSection;
  onOpenMobileSidebar: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  ordersCount?: number;
}

// Map section to breadcrumb labels
function getBreadcrumbs(section: AdminSection): { category: string; item: string } {
  switch (section) {
    case "dashboard":
      return { category: "Admin", item: "Dashboard" };
    // Catalog
    case "categories":
      return { category: "Catalog", item: "Categories" };
    case "sub-categories":
      return { category: "Catalog", item: "Sub Categories" };
    case "authors":
      return { category: "Catalog", item: "Authors" };
    case "publishers":
      return { category: "Catalog", item: "Publishers" };
    case "books":
      return { category: "Catalog", item: "Books Inventory" };
    case "inventory":
      return { category: "Catalog", item: "Stock Levels" };
    // Sales
    case "orders":
      return { category: "Sales", item: "Customer Orders" };
    case "payments":
      return { category: "Sales", item: "Payment Transactions" };
    case "coupons":
      return { category: "Sales", item: "Discount Coupons" };
    // Customers
    case "users":
      return { category: "Customers", item: "Registered Users" };
    case "addresses":
      return { category: "Customers", item: "Shipping Addresses" };
    case "reviews":
      return { category: "Customers", item: "Book Reviews" };
    // Content
    case "hero-banners":
      return { category: "Content", item: "Hero Banners" };
    case "promo-banners":
      return { category: "Content", item: "Promotional Banners" };
    case "testimonials":
      return { category: "Content", item: "Reader Testimonials" };
    case "blogs":
      return { category: "Content", item: "Articles & Blogs" };
    // Reports
    case "sales-report":
      return { category: "Reports", item: "Sales Analytics" };
    case "revenue-report":
      return { category: "Reports", item: "Revenue Breakdown" };
    case "inventory-report":
      return { category: "Reports", item: "Inventory Valuation" };
    case "customer-report":
      return { category: "Reports", item: "Customer Growth" };
    // Settings
    case "website-settings":
      return { category: "Settings", item: "Website Settings" };
    case "delivery-charges":
      return { category: "Settings", item: "Delivery Rules" };
    case "tax-settings":
      return { category: "Settings", item: "GST & Tax" };
    case "social-links":
      return { category: "Settings", item: "Social Media Links" };
    case "contact-details":
      return { category: "Settings", item: "Store Contacts" };
    case "email-settings":
      return { category: "Settings", item: "SMTP & Notification Emails" };
    // Admin Management
    case "admin-users":
      return { category: "Admin Management", item: "System Administrators" };
    case "roles-permissions":
      return { category: "Admin Management", item: "Roles & Permissions" };
    case "activity-logs":
      return { category: "Admin Management", item: "Audit Activity Logs" };
    default:
      return { category: "Admin", item: "Dashboard" };
  }
}

export function AdminHeader({
  activeSection,
  onOpenMobileSidebar,
  searchQuery,
  onSearchChange,
  ordersCount = 0,
}: AdminHeaderProps) {
  const navigate = useNavigate();
  const breadcrumb = getBreadcrumbs(activeSection);
  const [unreadCount, setUnreadCount] = useState(3);

  const notifications = [
    {
      id: 1,
      title: "New Book Order Received",
      desc: "Order #SBH-2777 placed by Rohan Roy (₹409)",
      time: "5 mins ago",
      icon: Package,
      unread: true,
    },
    {
      id: 2,
      title: "New Reader Review Posted",
      desc: "5-star rating added for 'The Secret Garden'",
      time: "24 mins ago",
      icon: CheckCircle2,
      unread: true,
    },
    {
      id: 3,
      title: "Low Inventory Alert",
      desc: "A Brief History of Time has 22 copies remaining",
      time: "2 hours ago",
      icon: AlertCircle,
      unread: true,
    },
  ];

  const handleLogout = () => {
    toast.success("Administrator logged out safely.");
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-border bg-card/95 backdrop-blur px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition"
          aria-label="Open mobile menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground truncate" aria-label="Breadcrumb">
          <span className="font-semibold text-foreground/70 hidden sm:inline">Admin</span>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 hidden sm:inline" />
          <span className="text-foreground/70">{breadcrumb.category}</span>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
          <span className="font-bold text-primary truncate">{breadcrumb.item}</span>
        </nav>
      </div>

      {/* Right: Search, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative hidden md:block w-56 lg:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search books, orders... (Ctrl + K)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-full border border-border bg-background text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition"
          />
        </div>

        {/* Visit Online Store Link */}
        <Button
          variant="ghost"
          size="sm"
          className="hidden sm:inline-flex rounded-full text-xs text-muted-foreground hover:text-primary gap-1.5"
          asChild
        >
          <Link to="/" target="_blank">
            <span>Storefront</span>
            <ExternalLink className="h-3 w-3 opacity-70" />
          </Link>
        </Button>

        {/* Notification Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="relative p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-card" />
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="flex items-center justify-between p-3.5 border-b border-border">
              <span className="font-display font-bold text-sm text-foreground">Notifications</span>
              {unreadCount > 0 && (
                <button
                  onClick={() => setUnreadCount(0)}
                  className="text-[10px] font-semibold text-primary hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>
            <div className="divide-y divide-border/60 max-h-72 overflow-y-auto">
              {notifications.map((n) => {
                const Icon = n.icon;
                return (
                  <div key={n.id} className="p-3 text-xs flex gap-3 hover:bg-secondary/40 transition">
                    <span className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-foreground truncate">{n.title}</p>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">{n.desc}</p>
                      <span className="text-[10px] text-muted-foreground/80 mt-1 block">{n.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-2 border-t border-border text-center">
              <span className="text-[10px] font-semibold text-muted-foreground">All systems running smoothly</span>
            </div>
          </PopoverContent>
        </Popover>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1 pl-2 rounded-full hover:bg-secondary transition border border-border">
              <div className="text-right hidden sm:block">
                <span className="block text-xs font-bold text-foreground leading-none">Admin</span>
                <span className="block text-[9px] text-muted-foreground uppercase tracking-wider">Superuser</span>
              </div>
              <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-xs shadow-xs">
                A
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-xs font-bold text-foreground">Success Book Hub Admin</p>
                <p className="text-[11px] text-muted-foreground">admin@successbookhub.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-xs cursor-pointer">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Admin Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-xs cursor-pointer">
              <Settings className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Store Configuration</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-xs cursor-pointer">
              <Shield className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Security & Roles</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="gap-2 text-xs text-destructive focus:text-destructive cursor-pointer font-semibold"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout from Admin</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
