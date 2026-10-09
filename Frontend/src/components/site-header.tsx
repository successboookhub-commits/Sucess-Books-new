import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  BookOpen,
  Menu,
  Phone,
  ShoppingBag,
  X,
  Package,
  ShieldCheck,
  LogOut,
  Heart,
  User,
  MapPin,
  ChevronDown,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useUserAuth } from "@/lib/user-auth";
import { useAdminAuth } from "@/lib/auth";
import { STORE } from "@/lib/books";
import { CartSheet } from "@/components/cart-sheet";
import { WishlistSheet } from "@/components/wishlist-sheet";
import { OrderTrackerModal } from "@/components/order-tracker-modal";
import { StoreManagerModal } from "@/components/store-manager-modal";
import { toast } from "sonner";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const routerState = useRouterState();
  const currentPath = routerState?.location?.pathname || "/";
  const isLinkActive = (to: string) => {
    if (to === "/") return currentPath === "/";
    return currentPath === to || currentPath.startsWith(`${to}/`);
  };

  const { cartCount, cartOpen, setCartOpen } = useCart();
  const { wishlistCount, wishlistOpen, setWishlistOpen } = useWishlist();
  const { user, isAuthenticated: isUserLoggedIn, openLoginModal, logout: userLogout } = useUserAuth();
  const { isAuthenticated: isAdminLoggedIn, logout: adminLogout, adminUser } = useAdminAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [managerOpen, setManagerOpen] = useState(false);

  const handleAdminLogout = () => {
    adminLogout();
    toast.success("Administrator logged out successfully.");
  };

  const handleUserLogout = () => {
    userLogout();
  };

  return (
    <>
      {/* Main Navigation Header (Permanently Sticky at top on scroll) */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md shadow-sm transition-all">
        {/* Top Announcement Banner */}
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 px-3 py-1.5 sm:py-2 text-center text-xs font-bold text-slate-950 sm:text-sm shadow-xs border-b border-amber-300 overflow-hidden">
          <div className="mx-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 max-w-7xl text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="h-3.5 w-3.5 fill-slate-950 text-slate-950 shrink-0" />
              Free delivery over ₹499
            </span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span className="hidden sm:inline whitespace-nowrap">Direct Online & WhatsApp Orders</span>
            <span className="hidden sm:inline opacity-40">•</span>
            <a href={`tel:${STORE.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-1 whitespace-nowrap hover:underline">
              <Phone className="h-3 w-3 shrink-0" /> {STORE.phone}
            </a>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-1.5 sm:gap-4 px-2.5 sm:px-6 lg:px-8 py-2 sm:py-3">
          {/* Logo & Branding */}
          <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3 flex-shrink" aria-label="Success Book Hub home">
            <span className="grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-xs font-bold ring-2 ring-primary/20">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <span className="min-w-0 overflow-hidden">
              <strong className="block truncate font-display text-sm sm:text-xl font-bold tracking-tight text-foreground leading-tight">
                {STORE.name}
              </strong>
              <span className="hidden sm:block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 truncate">
                {STORE.tagline}
              </span>
            </span>
          </Link>

          {/* Navigation Links with Hardcover Book Tab Aesthetic */}
          <nav className="hidden items-center gap-1.5 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = isLinkActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  activeOptions={{ exact: link.to === "/" }}
                  className={`group relative inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm transition-all duration-200 select-none ${
                    active
                      ? "rounded-r-md rounded-l-xs bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 dark:from-amber-950/80 dark:via-amber-900/50 dark:to-amber-950/80 text-amber-950 dark:text-amber-100 font-bold border border-amber-300/90 dark:border-amber-700/60 border-l-[3.5px] border-l-amber-600 dark:border-l-amber-400 shadow-xs ring-1 ring-amber-400/20"
                      : "rounded-md font-semibold text-muted-foreground hover:text-foreground hover:bg-amber-100/50 dark:hover:bg-amber-950/30"
                  }`}
                >
                  {/* Silk Red Ribbon Bookmark peaking from top edge of book */}
                  {active && (
                    <span
                      className="absolute -top-1 left-2.5 h-2.5 w-1.5 bg-red-600 dark:bg-red-500 rounded-b-xs shadow-2xs pointer-events-none"
                      aria-hidden="true"
                    />
                  )}

                  {/* Open Book Icon for active book tab */}
                  {active ? (
                    <BookOpen className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400 shrink-0 animate-in zoom-in-75 duration-200" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-border/80 group-hover:bg-amber-400 transition-colors" />
                  )}

                  <span className="tracking-tight">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Wishlist Button */}
            <Sheet open={wishlistOpen} onOpenChange={setWishlistOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative rounded-full h-8.5 w-8.5 sm:h-9 sm:w-auto p-0 sm:px-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/60 justify-center"
                  title="My Wishlist"
                  aria-label="View Wishlist"
                >
                  <Heart className="h-4 w-4 text-red-500" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 sm:static sm:ml-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary text-[9px] text-primary-foreground font-black shadow-xs px-1">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <WishlistSheet />
            </Sheet>

            {/* Customer User Authentication Menu */}
            {isUserLoggedIn && user ? (
              <div className="flex items-center gap-0.5 sm:gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="rounded-full h-8.5 w-8.5 sm:h-9 sm:w-auto p-0 sm:px-3 gap-1.5 text-xs font-bold border-amber-300 bg-amber-50/70 text-amber-950 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-700/50 justify-center shadow-2xs cursor-pointer"
                  title="Open User Dashboard"
                  aria-label="Open User Dashboard"
                >
                  <Link to="/account">
                    <User className="h-3.5 w-3.5 text-amber-600" />
                    <span className="hidden sm:inline max-w-[90px] truncate">
                      {user.name ? user.name.split(" ")[0] : "Account"}
                    </span>
                  </Link>
                </Button>

                {/* Quick User Dropdown Options & Logout */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8.5 w-6 sm:h-9 sm:w-7 p-0 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/60 cursor-pointer"
                      aria-label="Account options menu"
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-xl p-1.5 shadow-xl border-border bg-card">
                    <DropdownMenuLabel className="font-normal px-2 py-1.5">
                      <div className="text-xs font-bold text-foreground truncate">{user.name || "Customer"}</div>
                      <div className="text-[11px] text-muted-foreground truncate">{user.email}</div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/account" search={{ tab: "orders" }} className="flex items-center gap-2 cursor-pointer text-xs py-2">
                        <Package className="h-3.5 w-3.5 text-amber-600" />
                        <span>My Orders & Invoices</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/account" search={{ tab: "addresses" }} className="flex items-center gap-2 cursor-pointer text-xs py-2">
                        <MapPin className="h-3.5 w-3.5 text-amber-600" />
                        <span>Saved Addresses</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/account" search={{ tab: "profile" }} className="flex items-center gap-2 cursor-pointer text-xs py-2">
                        <User className="h-3.5 w-3.5 text-amber-600" />
                        <span>Profile & Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setWishlistOpen(true)}
                      className="flex items-center gap-2 cursor-pointer text-xs py-2"
                    >
                      <Heart className="h-3.5 w-3.5 text-red-500" />
                      <span>My Wishlist ({wishlistCount})</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleUserLogout}
                      className="flex items-center gap-2 cursor-pointer text-xs py-2 text-destructive focus:text-destructive"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={openLoginModal}
                className="rounded-full h-8.5 w-8.5 sm:h-9 sm:w-auto p-0 sm:px-3 gap-1.5 text-xs font-bold border-amber-300 bg-amber-50/50 text-amber-900 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-200 justify-center"
                title="Sign In / My Dashboard"
                aria-label="User Account"
              >
                <User className="h-3.5 w-3.5 text-amber-700" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            )}

            {/* Authenticated Admin Actions ONLY */}
            {isAdminLoggedIn && (
              <div className="hidden md:flex items-center gap-1">
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-full gap-1 text-xs bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-3"
                  asChild
                >
                  <Link to="/admin">
                    <ShieldCheck className="h-3.5 w-3.5" /> Admin
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAdminLogout}
                  className="rounded-full p-2 text-xs text-destructive hover:bg-destructive/10 h-9 w-9"
                  title="Logout Admin"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}

            {/* Cart Sheet Button */}
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="default"
                  className="relative h-8.5 sm:h-9 rounded-full px-2.5 sm:px-4 font-bold text-xs gap-1.5 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
                  aria-label="Shopping Bag"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span className="hidden sm:inline">Bag</span>
                  {cartCount > 0 && (
                    <span className="grid h-4.5 min-w-4.5 place-items-center rounded-full bg-slate-950 px-1 text-[10px] text-amber-300 font-black">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <CartSheet />
            </Sheet>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-8.5 w-8.5 p-0 justify-center"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <nav className="border-t border-border px-4 py-3 lg:hidden space-y-1.5 bg-background" aria-label="Mobile navigation">
            {navLinks.map((link) => {
              const active = isLinkActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  activeOptions={{ exact: link.to === "/" }}
                  onClick={() => setMenuOpen(false)}
                  className={`relative flex items-center gap-2.5 px-3.5 py-2.5 text-sm transition-all select-none ${
                    active
                      ? "rounded-r-lg rounded-l-xs bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 dark:from-amber-950/80 dark:via-amber-900/50 dark:to-amber-950/80 text-amber-950 dark:text-amber-100 font-bold border border-amber-300/90 dark:border-amber-700/60 border-l-[4px] border-l-amber-600 shadow-xs"
                      : "rounded-md font-semibold text-muted-foreground hover:bg-amber-100/40 hover:text-foreground"
                  }`}
                >
                  {active && (
                    <span className="absolute -top-1 left-3 h-2.5 w-1.5 bg-red-600 rounded-b-xs shadow-2xs pointer-events-none" />
                  )}
                  {active ? (
                    <BookOpen className="h-4 w-4 text-amber-700 dark:text-amber-400 shrink-0" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-border" />
                  )}
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="pt-2 border-t border-border/60 flex flex-col gap-1.5">
              {isUserLoggedIn ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-primary rounded-md bg-secondary/60"
                  >
                    <User className="h-4 w-4" /> My Account & Orders
                  </Link>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleUserLogout();
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10 rounded-md text-left"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    openLoginModal();
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-primary rounded-md bg-secondary/60 text-left font-bold"
                >
                  <User className="h-4 w-4" /> Sign In with OTP
                </button>
              )}

              <button
                onClick={() => {
                  setMenuOpen(false);
                  setTrackerOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-primary rounded-md text-left"
              >
                <Package className="h-4 w-4" /> Track Book Order
              </button>

              {/* Show in Mobile Menu ONLY when Logged In as Admin */}
              {isAdminLoggedIn && (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-primary rounded-md bg-secondary/70 font-bold"
                  >
                    <ShieldCheck className="h-4 w-4 text-primary" /> Store Admin Portal
                  </Link>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleAdminLogout();
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10 rounded-md text-left"
                  >
                    <LogOut className="h-4 w-4" /> Logout Admin ({adminUser?.email})
                  </button>
                </>
              )}
            </div>
          </nav>
        )}
      </header>

      {/* Global Modals */}
      <OrderTrackerModal open={trackerOpen} onOpenChange={setTrackerOpen} />
      <StoreManagerModal open={managerOpen} onOpenChange={setManagerOpen} />
    </>
  );
}
