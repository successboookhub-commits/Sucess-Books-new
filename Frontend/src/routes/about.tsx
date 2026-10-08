import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  HeartHandshake,
  Sparkles,
  Truck,
  Award,
  Users,
  Compass,
  ArrowRight,
  MessageCircle,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { STORE, WHATSAPP_NUMBER } from "@/lib/books";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Success Book Hub" },
      {
        name: "description",
        content:
          "A dedicated independent bookstore in Kolkata, sending thoughtfully chosen books across India.",
      },
      { property: "og:title", content: "About Us — Success Book Hub" },
      {
        property: "og:description",
        content: "Our story, our shelves, and how we deliver books across India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  const { catalog } = useCart();

  const whatsappDirect = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Success Book Hub! I am visiting your website and would like book recommendations."
  )}`;

  return (
    <main className="min-h-screen bg-background">
      {/* 1. Hero / Legacy Mission (Left-Aligned, Tight Gaps) */}
      <section className="paper-texture border-b border-border bg-gradient-to-b from-amber-50/20 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:py-7 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            Our Legacy & Story
          </p>
          <h1 className="mt-1.5 font-display text-2xl sm:text-3xl lg:text-4xl leading-tight text-foreground font-bold tracking-tight">
            A sanctuary for readers, learners, and dreamers.
          </h1>
          <p className="mt-2 max-w-4xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
            Rooted in Kolkata's historic College Street, {STORE.name} curates timeless literature and delivers genuine publisher editions directly to readers across India.
          </p>

          {/* Quick Credibility Badges */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 border border-amber-300/60 font-semibold shadow-2xs">
              <MapPin className="h-3.5 w-3.5 text-amber-600" /> College Street Heritage
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold shadow-2xs">
              <Truck className="h-3.5 w-3.5 text-emerald-600" /> Pan-India Express Delivery
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-foreground border border-border font-semibold shadow-2xs">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-600" /> 100% Genuine Publisher Copies
            </span>
          </div>
        </div>
      </section>

      {/* 2. Core Pillars (Left Heading, Compact 4-Card Grid) */}
      <section className="mx-auto max-w-7xl px-4 py-5 sm:py-7 sm:px-6 lg:px-8 space-y-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            Why Readers Trust Us
          </p>
          <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold text-foreground">
            Our Guiding Commitments
          </h2>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              BookOpen,
              "Curated, Not Crowded",
              "Every title in our catalogue is vetted for intellectual substance, clear thought, and lasting literary value.",
              "Top Quality",
            ],
            [
              HeartHandshake,
              "Human Connection",
              "Personalized book recommendations via WhatsApp — our passionate booksellers reply directly.",
              "1-on-1 Guidance",
            ],
            [
              Truck,
              "Pan-India Reach",
              "Free express delivery on orders above ₹499 with real-time updates from packaging to your doorstep.",
              "Fast Shipping",
            ],
            [
              Sparkles,
              "Pristine Collector Care",
              "Carefully inspected, pristine editions wrapped with genuine bookmark keepsakes for bibliophiles.",
              "Safe Packaging",
            ],
          ].map(([Icon, title, text, badge]) => {
            const IconComponent = Icon as typeof BookOpen;
            return (
              <div
                key={title as string}
                className="group relative rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-400/15 text-amber-700 dark:text-amber-400 font-bold border border-amber-300/40 group-hover:scale-105 transition">
                      <IconComponent className="h-4.5 w-4.5" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                      {badge as string}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold text-foreground">
                    {title as string}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground font-normal">
                    {text as string}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Luxury Contained Stats Card (NO FULL-WIDTH SOLID YELLOW BAR!) */}
      <section className="mx-auto max-w-7xl px-4 py-3 sm:py-5 sm:px-6 lg:px-8">
        <div className="rounded-2xl sm:rounded-3xl border border-amber-300/70 dark:border-amber-700/50 bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-card p-5 sm:p-7 shadow-xs">
          <div className="grid gap-5 sm:gap-4 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-amber-300/40 dark:divide-amber-800/40">
            {/* Stat 1 */}
            <div className="pt-3 sm:pt-0 sm:px-4 text-left sm:text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold text-xs">
                <Award className="h-4 w-4" />
                <span>EXPERIENCE</span>
              </div>
              <p className="font-sans text-3xl sm:text-4xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
                12+
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                Years of Bookselling
              </p>
              <p className="text-[11px] text-muted-foreground font-normal">
                Serving avid readers from College Street since inception
              </p>
            </div>

            {/* Stat 2 */}
            <div className="pt-3 sm:pt-0 sm:px-4 text-left sm:text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold text-xs">
                <Users className="h-4 w-4" />
                <span>COMMUNITY</span>
              </div>
              <p className="font-sans text-3xl sm:text-4xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
                2,500+
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                Satisfied Readers
              </p>
              <p className="text-[11px] text-muted-foreground font-normal">
                Across 28 Indian States & Union Territories
              </p>
            </div>

            {/* Stat 3 */}
            <div className="pt-3 sm:pt-0 sm:px-4 text-left sm:text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold text-xs">
                <BookOpen className="h-4 w-4" />
                <span>SHELVES</span>
              </div>
              <p className="font-sans text-3xl sm:text-4xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
                {catalog.length || 19}
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                Curated Books on Shelves
              </p>
              <p className="text-[11px] text-muted-foreground font-normal">
                Carefully handpicked across fiction, non-fiction & classics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Explore Our Shelves (Left-Aligned, Clean Callout Card, No Bloated Gaps) */}
      <section className="mx-auto max-w-7xl px-4 py-5 sm:py-7 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border/80 bg-secondary/30 p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-xs">
          <div className="max-w-2xl text-left space-y-1.5">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              Visit In Person Or Order Online
            </p>
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
              Explore Our Shelves & Find Your Next Read
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">{STORE.address}</strong> • Timings: {STORE.hours}. Free shipping on orders over ₹499 across India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Button
              size="default"
              className="rounded-full px-6 font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 shadow-md hover:shadow-lg transition-all active:scale-95 text-xs cursor-pointer"
              asChild
            >
              <Link to="/shop" className="flex items-center gap-2">
                <span>Shop the Collection</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="default"
              className="rounded-full px-5 font-bold border-[#25D366]/40 hover:bg-[#25D366]/10 text-emerald-700 dark:text-emerald-400 text-xs cursor-pointer"
              asChild
            >
              <a href={whatsappDirect} target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
                <MessageCircle className="h-3.5 w-3.5 text-[#25D366] fill-[#25D366]" />
                <span>Ask on WhatsApp</span>
              </a>
            </Button>

            <Button
              variant="ghost"
              size="default"
              className="rounded-full px-4 text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer"
              asChild
            >
              <Link to="/contact">Contact Info</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
