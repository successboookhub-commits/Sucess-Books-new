import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Menu, Phone, ShoppingBag, X, Package, ShieldCheck, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { useAdminAuth } from "@/lib/auth";
import { STORE } from "@/lib/books";
import { CartSheet } from "@/components/cart-sheet";
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
  const { isAuthenticated, logout, adminUser } = useAdminAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [managerOpen, setManagerOpen] = useState(false);

  const handleAdminLogout = () => {
    logout();
    toast.success("Administrator logged out successfully.");
  };

  return (
    <>
      {/* Announcement Banner */}
      <div className="bg-primary px-4 py-2 text-center text-xs font-semibold text-primary-foreground sm:text-sm">
        <span>Free delivery on orders above ₹799</span>
        <span className="mx-2 opacity-50">•</span>
        <span>Order directly online or via WhatsApp</span>
        <span className="mx-2 hidden opacity-50 sm:inline">•</span>
        <span className="mt-1 flex items-center justify-center gap-1.5 sm:mt-0 sm:inline-flex">
          <Phone className="h-3 w-3" /> {STORE.phone}
        </span>
      </div>

      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Logo & Branding */}
          <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Success Book Hub home">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm">
              <BookOpen className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <strong className="block truncate font-display text-lg text-primary sm:text-xl font-bold">
                {STORE.name}
              </strong>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
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
                className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
                activeProps={{ className: "bg-secondary text-primary hover:text-primary" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            {/* Track Order Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTrackerOpen(true)}
              className="hidden sm:inline-flex rounded-full gap-1.5 text-xs text-muted-foreground hover:text-primary"
            >
              <Package className="h-4 w-4" /> Track Order
            </Button>

            {/* Authenticated Admin Actions ONLY */}
            {isAuthenticated && (
              <div className="hidden md:flex items-center gap-1.5">
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-full gap-1.5 text-xs bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                  asChild
                >
                  <Link to="/admin">
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-300" /> Admin Portal
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAdminLogout}
                  className="rounded-full gap-1 text-xs text-destructive hover:bg-destructive/10"
                  title="Logout Admin"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}

            {/* Cart Sheet Button */}
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative h-10 rounded-full px-4 font-semibold">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="hidden sm:inline ml-1.5">My Bag</span>
                  {cartCount > 0 && (
                    <span className="ml-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground font-bold">
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
              className="lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <nav className="border-t border-border px-4 py-3 lg:hidden space-y-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                onClick={() => setMenuOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm font-semibold text-muted-foreground"
                activeProps={{ className: "bg-secondary text-primary font-bold" }}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2 border-t border-border/60 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setTrackerOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-primary rounded-md text-left"
              >
                <Package className="h-4 w-4" /> Track Book Order
              </button>

              {/* Show in Mobile Menu ONLY when Logged In */}
              {isAuthenticated && (
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

