import { useState, useEffect, useRef, useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  HeartHandshake,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/book-card";
import { BookDetailModal } from "@/components/book-detail-modal";
import { HeroFlipBook } from "@/components/hero-flip-book";
import { categories as defaultCategories, STORE, WHATSAPP_NUMBER, type Book } from "@/lib/books";
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
  const navigate = useNavigate();
  const [dbCategories, setDbCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [previewBook, setPreviewBook] = useState<Book | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  const categoriesScrollRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close suggestions dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollCategories = (direction: "left" | "right") => {
    if (categoriesScrollRef.current) {
      const scrollDistance = direction === "left" ? -260 : 260;
      categoriesScrollRef.current.scrollBy({ left: scrollDistance, behavior: "smooth" });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSuggestionsOpen(false);
    navigate({
      to: "/shop",
      search: { q: searchQuery.trim() },
    });
  };

  const handleHeroBookPreview = (title: string) => {
    const found = catalog.find((b) => b.title.toLowerCase().includes(title.toLowerCase()));
    if (found) {
      setPreviewBook(found);
      setPreviewModalOpen(true);
    } else {
      navigate({ to: "/shop", search: { q: title } });
    }
  };

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

  // Live filter categories in the round row when searching
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return displayCategories;
    const q = searchQuery.trim().toLowerCase();
    const directMatches = displayCategories.filter((c) => c.name.toLowerCase().includes(q));
    if (directMatches.length > 0) return directMatches;

    // Check if books inside any categories match the query
    const categoriesWithBooks = new Set(
      catalog
        .filter((b) => `${b.title} ${b.author} ${b.description || ""}`.toLowerCase().includes(q))
        .map((b) => b.category.toLowerCase())
    );
    const indirectMatches = displayCategories.filter((c) => categoriesWithBooks.has(c.name.toLowerCase()));
    return indirectMatches;
  }, [searchQuery, displayCategories, catalog]);

  // Matching books suggestions for the dropdown
  const matchingBooks = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.trim().toLowerCase();
    return catalog
      .filter((b) => `${b.title} ${b.author} ${b.category} ${b.subCategory || ""}`.toLowerCase().includes(q))
      .slice(0, 5);
  }, [searchQuery, catalog]);

  // Matching categories list for the dropdown
  const matchingCategoriesList = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.trim().toLowerCase();
    return displayCategories.filter((c) => c.name.toLowerCase().includes(q));
  }, [searchQuery, displayCategories]);

  const displayBooks = useMemo(() => {
    const feat = catalog.filter((b) => b.featured);
    const nonFeat = catalog.filter((b) => !b.featured);
    return [...feat, ...nonFeat].slice(0, 12);
  }, [catalog]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      {/* Hero Section */}
      <section className="paper-texture border-b border-border bg-gradient-to-b from-amber-50/30 via-background to-background">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:py-10">
          <div className="max-w-2xl">
            <p className="mb-2.5 inline-flex items-center gap-2 rounded-full bg-amber-100/80 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-900 border border-amber-300/40 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              Curated with Passion & Purpose
            </p>
            <h1 className="font-display text-3xl leading-[1.15] text-foreground sm:text-5xl lg:text-5xl font-bold tracking-tight">
              Books that inspire.<br />
              <span className="text-amber-500 font-serif italic">Stories that shape success.</span>
            </h1>
            <p className="mt-3 max-w-xl text-xs leading-6 text-muted-foreground sm:text-sm">
              From literary masterworks to mindset guides, explore our handpicked collection at <strong className="text-foreground">{STORE.name}</strong> — available with direct online checkout and instant WhatsApp order confirmation.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <Button size="lg" className="h-11 rounded-full px-7 shadow-xs gap-2 font-bold bg-primary text-primary-foreground hover:bg-primary/90 justify-center btn-shimmer" asChild>
                <Link to="/shop">
                  <ShoppingBag className="h-4 w-4" /> Explore Catalogue
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-11 rounded-full px-6 border-border hover:border-amber-400 bg-card text-foreground hover:bg-secondary transition font-bold justify-center" asChild>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-3.5 text-xs font-semibold text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-amber-600" /> Free delivery above ₹499
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> Rated 4.8 by 2,500+ readers
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-600" /> 100% Original Editions
              </span>
            </div>
          </div>

          {/* 3D Realistic Open Book with Page Flip Motion (Desktop / Laptop ONLY) */}
          <div className="relative mx-auto hidden lg:flex w-full max-w-lg justify-center mt-6 lg:mt-0">
            <HeroFlipBook onPreviewBook={handleHeroBookPreview} />
          </div>
        </div>
      </section>

      {/* Categories Row */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:py-7 sm:px-6 lg:px-8 border-b border-border/60 bg-gradient-to-b from-card/30 via-background to-background overflow-hidden">
        <div className="mb-3 flex flex-row items-center justify-between gap-2">
          <div>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 fill-amber-500 text-amber-500" /> Explore by Genre
            </p>
            <h2 className="mt-0.5 font-display text-lg sm:text-2xl lg:text-3xl text-foreground font-bold">
              Shop by Category
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSuggestionsOpen(false);
                }}
                className="text-[11px] sm:text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Show all</span>
              </button>
            )}
            <Link to="/shop" className="items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline inline-flex">
              View all <span className="hidden sm:inline">shelves</span> <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Search Option on Left Side + Round Categories in One Line with Left & Right Movement Arrows */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 sm:gap-5">
          {/* Left Side: Sleek Capsule Search Bar with Live Suggestions Dropdown */}
          <div ref={searchContainerRef} className="relative w-full lg:w-72 xl:w-80 shrink-0">
            <form onSubmit={handleSearchSubmit} className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500 group-focus-within:text-amber-600 transition-colors pointer-events-none z-10" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => {
                  if (searchQuery.trim()) setSuggestionsOpen(true);
                }}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSuggestionsOpen(true);
                }}
                placeholder="Search category or books…"
                className="w-full h-11 sm:h-12 pl-10 pr-16 rounded-full border border-border/80 bg-card/90 backdrop-blur-xs text-xs sm:text-sm font-semibold text-foreground placeholder:text-muted-foreground shadow-xs focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
              />

              {/* Clear button */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSuggestionsOpen(false);
                  }}
                  className="absolute right-10 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-secondary transition cursor-pointer"
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}

              {/* Submit search button */}
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-8.5 sm:w-8.5 rounded-full bg-primary text-slate-950 font-bold flex items-center justify-center shadow-xs hover:bg-primary/90 transition active:scale-95 cursor-pointer"
                title="Search books"
                aria-label="Search books"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Suggestions Dropdown Popup */}
            {suggestionsOpen && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-full sm:w-[380px] md:w-[420px] bg-card/95 backdrop-blur-md border border-amber-300/80 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
                {/* Categories Match Strip */}
                {matchingCategoriesList.length > 0 && (
                  <div className="p-3 border-b border-border/60 bg-muted/40">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-1.5 flex items-center gap-1">
                      <Tag className="h-3 w-3" /> Matching Categories ({matchingCategoriesList.length})
                    </p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {matchingCategoriesList.map((cat) => (
                        <button
                          key={cat.name}
                          type="button"
                          onClick={() => {
                            setSuggestionsOpen(false);
                            navigate({ to: "/shop", search: { category: cat.name } });
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs border border-amber-300 shadow-2xs transition cursor-pointer"
                        >
                          <span>{cat.name}</span>
                          <span className="text-[10px] text-amber-800 opacity-70">
                            ({catalog.filter((b) => b.category.toLowerCase() === cat.name.toLowerCase()).length})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Product / Book Suggestions List */}
                <div className="p-2 max-h-[300px] overflow-y-auto">
                  <div className="px-2 py-1 flex items-center justify-between text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    <span>Products & Books</span>
                    <span>{matchingBooks.length} suggestions</span>
                  </div>

                  {matchingBooks.length > 0 ? (
                    <div className="space-y-1 mt-1">
                      {matchingBooks.map((book) => {
                        const mrp = book.oldPrice || book.old_price;
                        return (
                          <div
                            key={book.id}
                            onClick={() => {
                              setPreviewBook(book);
                              setPreviewModalOpen(true);
                              setSuggestionsOpen(false);
                            }}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-amber-500/10 transition cursor-pointer group"
                          >
                            {/* Thumbnail */}
                            <div className="h-12 w-9 rounded-md overflow-hidden bg-secondary border border-border shadow-2xs shrink-0 flex items-center justify-center">
                              {book.cover && (book.cover.startsWith("http") || book.cover.startsWith("/")) ? (
                                <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
                              ) : (
                                <BookOpen className="h-4 w-4 text-amber-600" />
                              )}
                            </div>

                            {/* Book Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-display text-xs font-bold text-foreground group-hover:text-amber-600 truncate transition-colors">
                                {book.title}
                              </h4>
                              <p className="text-[11px] text-muted-foreground truncate">
                                {book.author} · <span className="text-amber-700 dark:text-amber-400 font-semibold">{book.category}</span>
                              </p>
                            </div>

                            {/* Price */}
                            <div className="text-right shrink-0">
                              <p className="font-sans text-xs font-bold text-amber-600 dark:text-amber-400">
                                ₹{book.price}
                              </p>
                              {mrp && mrp > book.price && (
                                <p className="text-[10px] text-muted-foreground line-through">
                                  ₹{mrp}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-xs text-muted-foreground">
                      <BookOpen className="h-6 w-6 mx-auto mb-1.5 opacity-40 text-amber-600" />
                      No books matching &quot;{searchQuery}&quot;
                    </div>
                  )}
                </div>

                {/* Dropdown Footer: View All in Shop */}
                <div className="p-2 border-t border-border/60 bg-muted/20">
                  <button
                    type="button"
                    onClick={() => {
                      setSuggestionsOpen(false);
                      navigate({ to: "/shop", search: { q: searchQuery.trim() } });
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
                  >
                    <span>View full results in Shop for &quot;{searchQuery}&quot;</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Categories Horizontal Track Flanked by Left and Right Arrow Buttons */}
          <div className="relative flex-1 min-w-0 flex items-center gap-2">
            {/* Left Arrow Button (hidden on mobile, visible on desktop/tablet) */}
            <button
              type="button"
              onClick={() => scrollCategories("left")}
              className="hidden sm:flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full bg-card hover:bg-primary hover:text-primary-foreground border border-border/80 shadow-xs items-center justify-center text-foreground transition-all active:scale-90 z-10 cursor-pointer"
              aria-label="Previous categories"
              title="Previous categories"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Scrollable Track (Round Categories in One Line) */}
            <div
              ref={categoriesScrollRef}
              className="flex items-center gap-3 sm:gap-5 overflow-x-auto scrollbar-none scroll-smooth py-1.5 px-1 sm:px-0 flex-1 min-w-0 -mx-4 px-4 sm:mx-0 snap-x"
            >
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => {
                  const count = catalog.filter((b) => b.category.toLowerCase() === cat.name.toLowerCase()).length;
                  return (
                    <Link
                      key={cat.name}
                      to="/shop"
                      search={{ category: cat.name }}
                      className="group shrink-0 flex flex-col items-center text-center cursor-pointer select-none transition-transform hover:-translate-y-1 snap-start"
                    >
                      {/* Round Avatar Container */}
                      <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 shadow-xs group-hover:shadow-md group-hover:from-amber-500 group-hover:to-yellow-400 transition-all duration-300 ring-2 ring-primary/10">
                        <div className="h-full w-full rounded-full overflow-hidden bg-card border-[1.5px] border-background relative flex items-center justify-center">
                          {cat.image ? (
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="h-full w-full object-cover group-hover:scale-115 transition-transform duration-500"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-full w-full bg-primary/15 flex items-center justify-center text-amber-700 dark:text-amber-400">
                              <BookOpen className="h-6 w-6" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent group-hover:opacity-0 transition-opacity" />
                        </div>
                      </div>

                      {/* Category Label */}
                      <span className="mt-1.5 text-[11px] sm:text-xs font-bold text-foreground group-hover:text-amber-600 transition-colors line-clamp-2 w-[72px] sm:w-[92px] text-center leading-tight h-7 sm:h-8 flex items-center justify-center">
                        {cat.name}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-muted-foreground font-semibold">
                        {count} titles
                      </span>
                    </Link>
                  );
                })
              ) : (
                <div className="flex items-center gap-3 py-3 px-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 text-xs text-amber-900 dark:text-amber-200">
                  <span>No categories matching &quot;{searchQuery}&quot;</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSuggestionsOpen(false);
                    }}
                    className="font-bold underline cursor-pointer"
                  >
                    Reset Categories
                  </button>
                </div>
              )}
            </div>

            {/* Right Arrow Button (hidden on mobile, visible on desktop/tablet) */}
            <button
              type="button"
              onClick={() => scrollCategories("right")}
              className="hidden sm:flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full bg-card hover:bg-primary hover:text-primary-foreground border border-border/80 shadow-xs items-center justify-center text-foreground transition-all active:scale-90 z-10 cursor-pointer"
              aria-label="Next categories"
              title="Next categories"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Books Grid */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Curated Highlights</p>
            <h2 className="mt-0.5 font-display text-xl sm:text-2xl lg:text-3xl text-foreground font-bold">Featured This Week</h2>
          </div>
          <Link to="/shop" className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 hover:underline">
            Shop all {catalog.length} books <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {/* 6 Books Per Row on Laptop/Desktop (lg:grid-cols-6 xl:grid-cols-6), Mobile stays 2 cols */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-4 sm:gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 lg:gap-x-3 lg:gap-y-4">
          {displayBooks.map((book) => (
            <BookCard key={book.id} book={book} compact={true} />
          ))}
        </div>

        {/* View More Option Button (Opens all books in /shop page) */}
        <div className="mt-7 sm:mt-9 flex flex-col items-center justify-center gap-2">
          <Button
            size="default"
            className="rounded-full px-8 h-10 sm:h-11 font-bold bg-primary text-slate-950 hover:bg-primary/90 shadow-xs gap-2 group transition-all"
            asChild
          >
            <Link to="/shop">
              <span>View More Books</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <p className="text-[11px] text-muted-foreground font-semibold text-center">
            Showing {displayBooks.length} of {catalog.length} curated highlights • Explore our full catalogue of fiction, classics & bestsellers
          </p>
        </div>
      </section>


      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:py-10 sm:px-6 lg:px-8">
        <div className="text-left mb-4 sm:mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600">From Our Community</p>
          <h2 className="mt-0.5 font-display text-xl sm:text-2xl lg:text-3xl text-foreground font-bold">Loved by Readers Across India</h2>
        </div>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {[
            ["Ananya Roy, Kolkata", "Ordered via WhatsApp late at night, and received the books within 48 hours in beautiful eco-friendly packaging with a personalized bookmark."],
            ["Dr. Rohit Menon, Bangalore", "The book quality is genuine and pristine. You can tell the curators are actual bibliophiles who care deeply about literature."],
            ["Sara Khan, Delhi", "Fair pricing, instantaneous WhatsApp responses, and great recommendations. Success Book Hub is now my go-to online bookshop."],
          ].map(([name, quote]) => (
            <figure key={name} className="rounded-xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  “{quote}”
                </blockquote>
              </div>
              <figcaption className="mt-4 text-xs font-bold text-foreground border-t border-border pt-2.5">
                {name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>



      {/* Book Detail Modal for Suggestions / Quick Preview */}
      <BookDetailModal
        book={previewBook}
        open={previewModalOpen}
        onOpenChange={setPreviewModalOpen}
      />
    </main>
  );
}
