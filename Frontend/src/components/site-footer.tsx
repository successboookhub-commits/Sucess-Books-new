import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  CheckCircle2,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  STORE,
  WHATSAPP_NUMBER,
  categories as fallbackCategories,
  books as fallbackBooks,
} from "@/lib/books";
import { api } from "@/lib/api";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SOCIAL_LINKS = [
  {
    name: "WhatsApp",
    icon: MessageCircle,
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    bgClass: "bg-[#25D366] hover:bg-[#20ba59] text-white shadow-[0_4px_12px_rgba(37,211,102,0.35)]",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com",
    bgClass: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-[0_4px_12px_rgba(225,48,108,0.35)]",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com",
    bgClass: "bg-[#1877F2] hover:bg-[#166fe5] text-white shadow-[0_4px_12px_rgba(24,119,242,0.35)]",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://youtube.com",
    bgClass: "bg-[#FF0000] hover:bg-[#e60000] text-white shadow-[0_4px_12px_rgba(255,0,0,0.35)]",
  },
  {
    name: "Twitter / X",
    icon: Twitter,
    href: "https://twitter.com",
    bgClass: "bg-slate-900 hover:bg-black text-white border border-slate-700 shadow-[0_4px_12px_rgba(0,0,0,0.35)]",
  },
];

export function SiteFooter() {
  const { catalog } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const [categoriesList, setCategoriesList] = useState<string[]>(() =>
    fallbackCategories.filter((c) => c !== "All")
  );
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);

  useEffect(() => {
    api
      .getCategories({ status: "active" })
      .then((cats) => {
        if (cats && cats.length > 0) {
          const names = cats.map((c) => c.name).filter(Boolean);
          if (names.length > 0) setCategoriesList(names);
        }
      })
      .catch(() => {});
  }, []);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setSubscribing(true);
    try {
      const res = await api.subscribeNewsletter(newsletterEmail.trim());
      setSubscribed(true);
      toast.success(res.message || "Thank you for subscribing!");
      setNewsletterEmail("");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to subscribe");
    } finally {
      setSubscribing(false);
    }
  };

  const productList = catalog && catalog.length > 0 ? catalog : fallbackBooks;
  const visibleCategories = showAllCategories
    ? categoriesList
    : categoriesList.slice(0, 5);
  const visibleProducts = showAllProducts
    ? productList.slice(0, 12)
    : productList.slice(0, 5);

  return (
    <footer className="bg-slate-950 text-slate-300">
      {/* Newsletter Strip */}
      <div className="border-b border-amber-300/40 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-950">
              Join the Readers' Circle
            </h3>
            <p className="text-xs text-slate-900 font-semibold mt-0.5">
              Get monthly curated reading lists, author spotlights, and secret flash deals.
            </p>
          </div>
          <form
            onSubmit={handleNewsletter}
            className="w-full md:w-auto flex flex-col sm:flex-row max-w-md gap-2"
          >
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs font-bold text-slate-950 bg-white/60 px-4 py-2 rounded-full border border-slate-950/20">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" /> You're on our reading list!
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="h-10 rounded-full bg-white border border-slate-950/20 px-4 text-xs text-slate-950 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-slate-950 min-w-0 sm:min-w-[240px] flex-1 shadow-2xs"
                />
                <Button
                  type="submit"
                  disabled={subscribing}
                  className="h-10 rounded-full px-5 text-xs font-bold gap-1.5 shrink-0 bg-slate-950 text-amber-300 hover:bg-slate-900 shadow-md"
                >
                  <Send className="h-3.5 w-3.5" />
                  {subscribing ? "Joining..." : "Subscribe"}
                </Button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Content Grid */}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:px-8">
        {/* Col 1: Store Info & Social Media with Real Brand Colors */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="flex items-center gap-2.5 font-display text-2xl font-bold text-white">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-amber-400 text-slate-950 shadow font-bold">
                <BookOpen className="h-4 w-4" />
              </span>
              {STORE.name}
            </p>
            <p className="mt-3 text-xs sm:text-sm leading-6 text-slate-400">
              Stories that stay with you. Thoughtfully curated literature, academic essentials, and bestselling collections delivered right to your doorstep across India.
            </p>
          </div>

          {/* Social Media Icons with Real Brand Colors */}
          <div className="mt-6">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400/90 mb-3">
              Follow & Connect
            </p>
            <div className="flex items-center gap-2.5 flex-wrap">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Follow Success Book Hub on ${item.name}`}
                    title={item.name}
                    className={`h-9 w-9 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 active:scale-95 ${item.bgClass}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Col 2: Quick Links (All Working) */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/" className="text-slate-300 transition hover:text-amber-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-slate-300 transition hover:text-amber-400">
                Shop All Books
              </Link>
            </li>
            <li>
              <Link to="/account" className="text-slate-300 transition hover:text-amber-400">
                My Orders & Account
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-slate-300 transition hover:text-amber-400">
                Our Story & Ethos
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-slate-300 transition hover:text-amber-400">
                Contact & Visit
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-slate-300 transition hover:text-amber-400">
                FAQ & Order Help
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-slate-400 text-xs transition hover:text-amber-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-slate-400 text-xs transition hover:text-amber-400">
                Terms & Shipping
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Categories (Store Data with View More) */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Categories
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {visibleCategories.map((c) => (
              <li key={c}>
                <Link
                  to="/shop"
                  search={{ category: c }}
                  className="text-slate-300 transition hover:text-amber-400 inline-block hover:translate-x-1 duration-150"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
          {categoriesList.length > 5 && (
            <div className="mt-3 pt-2 border-t border-slate-900/60 flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="text-xs text-amber-400 font-semibold hover:text-amber-300 transition inline-flex items-center gap-1 cursor-pointer"
              >
                {showAllCategories ? (
                  <>Show less <ChevronUp className="h-3 w-3" /></>
                ) : (
                  <>View more ({categoriesList.length - 5} more) <ChevronDown className="h-3 w-3" /></>
                )}
              </button>
              <Link
                to="/shop"
                className="text-xs text-slate-400 hover:text-amber-400 transition"
              >
                Browse all categories →
              </Link>
            </div>
          )}
        </div>

        {/* Col 4: Products / Popular Books (Store Data with View More) */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Popular Books
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {visibleProducts.map((book) => (
              <li key={book.id}>
                <Link
                  to="/shop"
                  search={{ q: book.title }}
                  title={`${book.title} by ${book.author}`}
                  className="text-slate-300 transition hover:text-amber-400 block truncate group"
                >
                  <span className="group-hover:underline">{book.title}</span>
                  <span className="block text-[11px] text-slate-500 font-mono">
                    ₹{book.price} · {book.category}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {productList.length > 5 && (
            <div className="mt-3 pt-2 border-t border-slate-900/60 flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => setShowAllProducts(!showAllProducts)}
                className="text-xs text-amber-400 font-semibold hover:text-amber-300 transition inline-flex items-center gap-1 cursor-pointer"
              >
                {showAllProducts ? (
                  <>Show less <ChevronUp className="h-3 w-3" /></>
                ) : (
                  <>View more ({productList.length - 5} more) <ChevronDown className="h-3 w-3" /></>
                )}
              </button>
              <Link
                to="/shop"
                className="text-xs text-slate-400 hover:text-amber-400 transition"
              >
                View all {productList.length} books →
              </Link>
            </div>
          )}
        </div>

        {/* Col 5: Visit or Call Us */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Visit or Call Us
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <span className="text-slate-300 leading-snug">{STORE.address}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <a
                href={`tel:${STORE.phone.replace(/[^\d+]/g, "")}`}
                className="text-slate-300 hover:text-amber-400 transition"
              >
                {STORE.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <a
                href={`mailto:${STORE.email}`}
                className="text-slate-300 hover:text-amber-400 transition truncate"
              >
                {STORE.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <span className="text-slate-300">{STORE.hours}</span>
            </li>
          </ul>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] px-4 py-2.5 text-xs font-bold text-white transition-all shadow-[0_4px_12px_rgba(37,211,102,0.35)] hover:scale-105 active:scale-95"
          >
            <MessageCircle className="h-4 w-4 fill-current" /> WhatsApp Us Anytime
          </a>
        </div>
      </div>

      {/* Bottom Legal / Copyright Bar */}
      <div className="border-t border-slate-900 px-4 py-3.5 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>© 2026 {STORE.name} · Curated Books Delivered Pan-India · All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <Link to="/privacy" className="hover:text-amber-400 transition">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-amber-400 transition">
              Terms of Service
            </Link>
            <span>•</span>
            <Link to="/faq" className="hover:text-amber-400 transition">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
