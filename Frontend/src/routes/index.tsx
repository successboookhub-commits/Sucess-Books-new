import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HeartHandshake, ShoppingBag, Star, Truck, ShieldCheck, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/book-card";
import { categories as defaultCategories, STORE, WHATSAPP_NUMBER } from "@/lib/books";
import { api, type Category } from "@/lib/api";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Success Book Hub — Curated Books & Timeless Stories" },
      { name: "description", content: "Browse fiction, classics, poetry, non-fiction, children's and self-help books. Fast delivery across India, order online or via WhatsApp." },
      { property: "og:title", content: "Success Book Hub — Books worth keeping" },
      { property: "og:description", content: "A thoughtfully curated online bookstore with direct checkout & WhatsApp ordering." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { catalog } = useCart();
  const [dbCategories, setDbCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.getCategories({ status: "active" }).then((cats) => {
      if (cats && cats.length > 0) {
        setDbCategories(cats);
      }
    }).catch(() => {});
  }, []);

  const displayCategories = dbCategories.length > 0
    ? dbCategories.map((c) => ({ name: c.name, image: c.image }))
    : defaultCategories.filter((c) => c !== "All").map((name) => ({ name, image: "" }));

  const featured = catalog.filter((b) => b.featured).slice(0, 8);
  const displayBooks = featured.length ? featured : catalog.slice(0, 8);

  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      {/* Hero Section */}
      <section className="paper-texture border-b border-border">
        <div className="mx-auto grid min-h-[560px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <span className="h-px w-8 bg-primary" /> Curated with Passion & Purpose
            </p>
            <h1 className="font-display text-5xl leading-[1.08] text-primary sm:text-6xl lg:text-7xl font-bold">
              Books that inspire.<br />
              <em className="text-maroon-soft font-normal">Stories that shape success.</em>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              From literary masterworks to mindset guides, explore our handpicked collection at <strong>{STORE.name}</strong> — available with direct online checkout and instant WhatsApp order confirmation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Button size="lg" className="h-12 rounded-full px-7 shadow-sm gap-2 font-semibold" asChild>
                <Link to="/shop">
                  <ShoppingBag className="h-4 w-4" /> Explore Catalogue
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12 rounded-full px-7 border-whatsapp/40 text-whatsapp hover:bg-whatsapp hover:text-white transition font-semibold" asChild>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5 text-xs font-semibold text-muted-foreground">
              <span className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" /> Free delivery above ₹799
              </span>
              <span className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-gold text-gold" /> Rated 4.8 by 2,500+ readers
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> 100% Original Editions
              </span>
            </div>
          </div>

          {/* Decorative Visual Book Stack */}
          <div className="relative mx-auto hidden h-[440px] w-full max-w-md lg:block" aria-label="A decorative stack of featured books">
            <div className="book-shadow absolute left-4 top-8 h-[350px] w-60 -rotate-6 border-l-8 border-maroon-soft bg-primary p-7 text-primary-foreground">
              <p className="text-xs uppercase tracking-widest opacity-75 font-semibold">Bestselling Classic</p>
              <p className="mt-16 font-display text-4xl leading-tight font-bold">The Secret Garden</p>
              <p className="mt-5 text-xs opacity-80">Frances Hodgson Burnett</p>
            </div>
            <div className="book-shadow absolute bottom-2 right-2 h-[360px] w-60 rotate-6 border-l-8 border-primary bg-gold p-7 text-foreground">
              <p className="text-xs uppercase tracking-widest opacity-75 font-semibold">Staff Selection</p>
              <p className="mt-16 font-display text-4xl leading-tight font-bold">The Last Bookshop</p>
              <p className="mt-5 text-xs font-medium">Madeline Martin</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Row */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Explore by genre</p>
            <h2 className="mt-1 font-display text-3xl text-foreground font-bold sm:text-4xl">Shop by Category</h2>
          </div>
          <Link to="/shop" className="hidden items-center gap-1 text-sm font-bold text-primary hover:underline sm:inline-flex">
            View all shelves <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {displayCategories.map((cat) => {
            const count = catalog.filter((b) => b.category.toLowerCase() === cat.name.toLowerCase()).length;
            return (
              <Link
                key={cat.name}
                to="/shop"
                search={{ category: cat.name }}
                className="group rounded-xl border border-border bg-card overflow-hidden text-center transition duration-200 hover:border-primary hover:shadow-md flex flex-col"
              >
                {cat.image ? (
                  <div className="h-24 w-full overflow-hidden bg-muted relative">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                ) : null}
                <div className="p-4 flex-1 flex flex-col justify-center">
                  <p className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {cat.name}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-muted-foreground">{count} titles</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Books Grid */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Curated Highlights</p>
            <h2 className="mt-1 font-display text-3xl text-foreground font-bold sm:text-4xl">Featured This Week</h2>
          </div>
          <Link to="/shop" className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
            Shop all {catalog.length} books <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-7">
          {displayBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* How it works strip */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <p className="font-display text-3xl font-bold leading-tight">Simple ordering.<br />Personal care.</p>
            <p className="text-xs opacity-75 mt-3">From Kolkata's heritage book alleys to your doorstep anywhere in India.</p>
          </div>
          {[
            ["01", "Select Your Books", "Browse our curated collection and add your favorite stories to your bag."],
            ["02", "Instant Order & WhatsApp", "Place your booking online with doorstep COD or send details via WhatsApp in 1 click."],
          ].map(([number, title, text]) => (
            <div key={number} className="border-l border-primary-foreground/20 pl-6">
              <span className="text-xs opacity-60 font-bold">{number}</span>
              <h3 className="mt-2 font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 opacity-80">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">From Our Community</p>
          <h2 className="mt-1 font-display text-3xl text-foreground font-bold sm:text-4xl">Loved by Readers Across India</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Ananya Roy, Kolkata", "Ordered via WhatsApp late at night, and received the books within 48 hours in beautiful eco-friendly packaging with a personalized bookmark."],
            ["Dr. Rohit Menon, Bangalore", "The book quality is genuine and pristine. You can tell the curators are actual bibliophiles who care deeply about literature."],
            ["Sara Khan, Delhi", "Fair pricing, instantaneous WhatsApp responses, and great recommendations. Success Book Hub is now my go-to online bookshop."],
          ].map(([name, quote]) => (
            <figure key={name} className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  “{quote}”
                </blockquote>
              </div>
              <figcaption className="mt-6 text-xs font-bold text-foreground border-t border-border pt-3">
                {name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Store Location */}
      <section className="paper-texture border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl text-primary font-bold">Visit Our Kolkata Shop</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground leading-relaxed">
            {STORE.address}<br />
            <span className="font-semibold text-foreground">{STORE.hours}</span>
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" size="lg" className="rounded-full px-7 font-semibold" asChild>
              <Link to="/contact">Directions & Hours</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
