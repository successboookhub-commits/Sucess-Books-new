import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  HelpCircle,
  ChevronDown,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/books";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions (FAQ) — Success Book Hub" },
      {
        name: "description",
        content:
          "Answers to common questions about book orders, Pan-India shipping, WhatsApp ordering, original book guarantees, and returns.",
      },
      { property: "og:title", content: "FAQ — Success Book Hub" },
      {
        property: "og:description",
        content: "Everything you need to know about purchasing books from Success Book Hub.",
      },
    ],
  }),
  component: FAQPage,
});

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Ordering & WhatsApp",
    q: "How do I order books from Success Book Hub?",
    a: "You can easily order online through our website with direct bag checkout, or tap 'Buy on WhatsApp' from any book card or modal to immediately confirm your order via chat with pre-filled book details.",
  },
  {
    category: "Ordering & WhatsApp",
    q: "Can I place custom or bulk orders through WhatsApp?",
    a: "Yes! Simply message us on WhatsApp with the list of titles, ISBNs, or authors you are looking for. Our team will verify shelf stock and quote custom bulk discounts.",
  },
  {
    category: "Shipping & Delivery",
    q: "What are your delivery fees and transit times?",
    a: "We offer FREE delivery on all orders over ₹499 across India. For orders below ₹499, a nominal flat delivery charge of ₹49 applies. Kolkata metro deliveries arrive in 1–2 days; pan-India orders typically take 3–5 business days.",
  },
  {
    category: "Shipping & Delivery",
    q: "How can I track my shipment?",
    a: "Use our 'Track Order' modal in the navigation bar using your Order ID (e.g. SBH-1042). You will also receive dispatch and tracking details directly via SMS and WhatsApp.",
  },
  {
    category: "Authenticity & Quality",
    q: "Are your books 100% original editions?",
    a: "Absolutely. Every book in our catalogue is sourced directly from authorized publishing houses and distributors. We never sell pirated, counterfeit, or substandard photocopies.",
  },
  {
    category: "Payments & Invoicing",
    q: "What payment methods do you accept?",
    a: "We accept UPI (Google Pay, PhonePe, Paytm), Net Banking, Credit/Debit cards, Cash on Delivery (COD) for eligible pin codes, and direct WhatsApp Pay.",
  },
  {
    category: "Payments & Invoicing",
    q: "Can I receive a GST Tax Invoice?",
    a: "Yes. Every order is eligible for a GST-compliant digital tax invoice that you can view and download instantly from your Order Success screen or your Account orders page.",
  },
  {
    category: "Returns & Exchanges",
    q: "What is your return policy if a book arrives damaged?",
    a: "In the rare event that a book arrives misprinted or transit-damaged, notify us within 7 days with a quick photo on WhatsApp (+91 98765 43210). We provide a free replacement or 100% full refund immediately.",
  },
];

const CATEGORIES = [
  "All Topics",
  "Ordering & WhatsApp",
  "Shipping & Delivery",
  "Authenticity & Quality",
  "Payments & Invoicing",
  "Returns & Exchanges",
];

function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0, 1]));

  const toggle = (idx: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const filteredFaqs =
    activeCategory === "All Topics"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <main className="min-h-screen bg-background">
      {/* Left-Aligned Clean & Compact Header */}
      <section className="paper-texture border-b border-border bg-gradient-to-b from-amber-50/20 via-card to-card">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:py-6 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
            <HelpCircle className="h-3.5 w-3.5 text-amber-500" /> Reader Assistance & Help Center
          </p>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="mt-1.5 max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Everything you need to know about our book selection, Pan-India shipping, payments, and WhatsApp ordering assistance.
          </p>

          {/* Left-Aligned Category Filter Chips with Compact Gap */}
          <div className="mt-4 flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer select-none ${
                    isActive
                      ? "bg-primary text-slate-950 font-bold shadow-xs border border-primary ring-2 ring-primary/20 scale-102"
                      : "bg-card text-muted-foreground hover:text-foreground border border-border/80 hover:border-amber-400/60"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2-Columns FAQ Grid Section (2 Questions Per Line, Left-Aligned with exact same container & tight gaps) */}
      <section className="mx-auto max-w-7xl px-4 py-5 sm:py-7 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-start">
          {filteredFaqs.map((faq, i) => {
            const isOpen = openIndices.has(i);
            return (
              <div
                key={faq.q}
                className={`rounded-2xl border transition-all duration-200 bg-card overflow-hidden ${
                  isOpen
                    ? "border-amber-400/90 ring-2 ring-amber-400/15 shadow-sm bg-gradient-to-b from-card via-card to-amber-50/20 dark:to-amber-950/10"
                    : "border-border/80 hover:border-amber-400/60 hover:shadow-2xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-3.5 sm:p-4.5 flex items-start justify-between gap-3 text-foreground hover:text-amber-600 transition cursor-pointer select-none"
                >
                  <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                    <span
                      className={`mt-1.5 h-2 w-2 rounded-full shrink-0 transition-colors ${
                        isOpen ? "bg-amber-500 scale-125" : "bg-primary"
                      }`}
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-0.5">
                        {faq.category}
                      </span>
                      <h3 className="font-sans font-bold text-sm sm:text-base leading-snug text-foreground">
                        {faq.q}
                      </h3>
                    </div>
                  </div>
                  <div
                    className={`h-6.5 w-6.5 sm:h-7 sm:w-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 mt-0.5 ${
                      isOpen
                        ? "bg-amber-400 text-slate-950 border-amber-400 rotate-180 shadow-2xs font-bold"
                        : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                    }`}
                  >
                    <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 mt-1 pt-2.5 animate-in fade-in-50 duration-150">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box - Compact, Clean & Properly Proportioned */}
        <div className="mt-7 sm:mt-8 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-400/40 p-5 sm:p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl text-left">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5 justify-center md:justify-start">
              <Sparkles className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> Dedicated Reader Support
            </p>
            <h3 className="font-display text-lg sm:text-xl font-bold text-amber-300">
              Have a question not listed here?
            </h3>
            <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
              Our team of book enthusiasts is available Mon–Sat (10:00 AM – 8:30 PM). Get instant book recommendations and order help.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0 w-full md:w-auto">
            <Button
              className="rounded-full px-5 h-9.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold shadow-md w-full sm:w-auto gap-2 text-xs"
              asChild
            >
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4 fill-current" />
                Chat on WhatsApp
              </a>
            </Button>
            <Button
              className="rounded-full px-5 h-9.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold w-full sm:w-auto gap-1.5 text-xs transition"
              asChild
            >
              <Link to="/contact">
                Contact & Visit <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
