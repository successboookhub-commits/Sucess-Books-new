import { Link } from "@tanstack/react-router";
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
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
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
      {/* Announcement Banner */}
      <div className="bg-primary px-4 py-2 text-center text-xs font-semibold text-primary-foreground sm:text-sm">
        <span>Free delivery on orders above ₹499</span>
        <span className="mx-2 opacity-50">•</span>
        <span>Order directly online or via WhatsApp</span>
        <span className="mx-2 hidden opacity-50 sm:inline">•</span>
        <span className="mt-1 flex items-center justify-center gap-1.5 sm:mt-0 sm:inline-flex">
          <Phone className="h-3 w-3" /> {STORE.phone}
        </span>
      </div>

      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo & Branding */}
          <Link to="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label="Success Book Hub home">
            <span className="grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <span className="min-w-0">
              <strong className="block truncate font-display text-base text-primary sm:text-xl font-bold">
                {STORE.name}
              </strong>
              <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {STORE.tagline}
              </span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                className="rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-muted-foreground transition hover:text-primary"
                activeProps={{ className: "bg-secondary text-primary hover:text-primary" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Track Order Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTrackerOpen(true)}
              className="hidden sm:inline-flex rounded-full gap-1 text-xs text-muted-foreground hover:text-primary h-9 px-3"
            >
              <Package className="h-3.5 w-3.5" />
              <span>Track</span>
            </Button>

            {/* Wishlist Button */}
            <Sheet open={wishlistOpen} onOpenChange={setWishlistOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative rounded-full h-9 px-2.5 text-muted-foreground hover:text-primary"
                  title="My Wishlist"
                >
                  <Heart className="h-4 w-4 text-red-500" />
                  {wishlistCount > 0 && (
                    <span className="ml-1 grid h-4 min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[9px] text-white font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <WishlistSheet />
            </Sheet>

            {/* Customer User Authentication Menu */}
            {isUserLoggedIn && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full h-9 px-3 gap-1.5 text-xs font-semibold border-primary/30 bg-primary/5 text-primary hover:bg-primary/10"
                  >
                    <User className="h-3.5 w-3.5" />
                    <span className="max-w-[80px] sm:max-w-[120px] truncate">
                      {user.name ? user.name.split(" ")[0] : "Account"}
                    </span>
                    <ChevronDown className="h-3 w-3 opacity-60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl p-1.5 shadow-xl border-border">
                  <DropdownMenuLabel className="font-normal px-2 py-1.5">
                    <div className="text-xs font-bold text-foreground truncate">{user.name || "Customer"}</div>
                    <div className="text-[11px] text-muted-foreground truncate">{user.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="flex items-center gap-2 cursor-pointer text-xs py-2">
                      <User className="h-3.5 w-3.5 text-primary" />
                      <span>My Dashboard & Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account" search={{ tab: "orders" }} className="flex items-center gap-2 cursor-pointer text-xs py-2">
                      <Package className="h-3.5 w-3.5 text-primary" />
                      <span>My Orders & Invoices</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account" search={{ tab: "addresses" }} className="flex items-center gap-2 cursor-pointer text-xs py-2">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span>Saved Addresses</span>
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
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={openLoginModal}
                className="rounded-full h-9 px-3 gap-1.5 text-xs font-semibold border-primary/20 text-primary hover:bg-primary/10"
              >
                <User className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            )}

            {/* Authenticated Admin Actions ONLY */}
            {isAdminLoggedIn && (
              <div className="hidden md:flex items-center gap-1">
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-full gap-1 text-xs bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 h-9 px-3"
                  asChild
                >
                  <Link to="/admin">
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-300" /> Admin
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
                <Button variant="outline" className="relative h-9 rounded-full px-3.5 font-semibold text-xs gap-1.5">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="hidden sm:inline">Bag</span>
                  {cartCount > 0 && (
                    <span className="grid h-4.5 min-w-4.5 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground font-bold">
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
              className="lg:hidden h-9 w-9"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <nav className="border-t border-border px-4 py-3 lg:hidden space-y-1 bg-background" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                onClick={() => setMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground"
                activeProps={{ className: "bg-secondary text-primary font-bold" }}
              >
                {link.label}
              </Link>
            ))}

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
