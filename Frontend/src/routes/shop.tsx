import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import {
  BookOpen,
  Search,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Tag,
  Layers,
} from "lucide-react";
import { BookCard } from "@/components/book-card";
import { BookDetailModal } from "@/components/book-detail-modal";
import { categories as defaultCategories, type Book } from "@/lib/books";
import { api, type Category } from "@/lib/api";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): { category?: string | undefined; subCategory?: string | undefined; q?: string | undefined } => ({
    category: typeof search["category"] === "string" ? search["category"] : undefined,
    subCategory: typeof search["subCategory"] === "string" ? search["subCategory"] : undefined,
    q: typeof search["q"] === "string" ? search["q"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All Books — Success Book Hub" },
      {
        name: "description",
        content:
          "Browse our complete catalogue of curated literature, bestsellers, academic essentials, and special editions. Order online or on WhatsApp.",
      },
      { property: "og:title", content: "Shop All Books — Success Book Hub" },
      {
        property: "og:description",
        content:
          "The complete Success Book Hub catalogue, ready to order with instant booking & WhatsApp confirmation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { catalog, refreshCatalog } = useCart();
  const searchParams = Route.useSearch();
  const [dbCategories, setDbCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState(searchParams.q || "");
  const [category, setCategory] = useState<string>(searchParams.category || "All");
  const [sort, setSort] = useState("featured");

  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [previewBook, setPreviewBook] = useState<Book | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  const categoriesScrollRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close suggestions dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Refresh catalog & load categories
  useEffect(() => {
    refreshCatalog();
    api
      .getCategories({ status: "active" })
      .then((cats) => {
        if (cats && cats.length > 0) setDbCategories(cats);
      })
      .catch(() => []);
  }, []);

  useEffect(() => {
    if (searchParams.category) {
      setCategory(searchParams.category);
    }
    if (searchParams.q !== undefined) {
      setQuery(searchParams.q);
    }
  }, [searchParams.category, searchParams.q]);

  const scrollCategories = (direction: "left" | "right") => {
    if (categoriesScrollRef.current) {
      const scrollDistance = direction === "left" ? -260 : 260;
      categoriesScrollRef.current.scrollBy({ left: scrollDistance, behavior: "smooth" });
    }
  };

  const displayCategories =
    dbCategories.length > 0
      ? dbCategories.map((c) => ({ name: c.name, image: c.image }))
      : defaultCategories
          .filter((c) => c !== "All")
          .map((name) => ({ name, image: "" }));

  // Live filter categories in track when typing
  const filteredCategories = useMemo(() => {
    if (!query.trim()) return displayCategories;
    const q = query.trim().toLowerCase();
    const directMatches = displayCategories.filter((c) => c.name.toLowerCase().includes(q));
    if (directMatches.length > 0) return directMatches;

    const categoriesWithBooks = new Set(
      catalog
        .filter((b) => `${b.title} ${b.author} ${b.description || ""}`.toLowerCase().includes(q))
        .map((b) => b.category.toLowerCase())
    );
    const indirectMatches = displayCategories.filter((c) =>
      categoriesWithBooks.has(c.name.toLowerCase())
    );
    return indirectMatches.length > 0 ? indirectMatches : displayCategories;
  }, [query, displayCategories, catalog]);

  // Matching books for dropdown
  const matchingBooks = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return catalog
      .filter((b) => `${b.title} ${b.author} ${b.category} ${b.subCategory || ""}`.toLowerCase().includes(q))
      .slice(0, 5);
  }, [query, catalog]);

  // Matching categories for dropdown
  const matchingCategoriesList = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return displayCategories.filter((c) => c.name.toLowerCase().includes(q));
  }, [query, displayCategories]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestionsOpen(false);
  };

  // Filtered books for bottom grid
  const filtered = useMemo(() => {
    const result = catalog.filter((book) => {
      const matchCategory =
        category === "All" || book.category.toLowerCase() === category.toLowerCase();
      const matchQuery =
        !query.trim() ||
        `${book.title} ${book.author} ${book.category} ${book.subCategory || ""} ${book.description || ""}`
          .toLowerCase()
          .includes(query.toLowerCase());

      return matchCategory && matchQuery;
    });

    return [...result].sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "discount") {
        const discA = a.discountPercent || a.discount_percent || 0;
        const discB = b.discountPercent || b.discount_percent || 0;
        return discB - discA;
      }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [catalog, category, query, sort]);

  return (
    <main className="min-h-screen bg-background">
      {/* 1. Top Clean Header Banner: Just All Books */}
      <section className="paper-texture border-b border-border bg-gradient-to-b from-amber-50/20 via-card to-card">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:py-7 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> Curated Bookstore Catalogue
          </p>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl lg:text-4xl text-foreground font-bold">
            All Books
          </h1>
          <p className="mt-1.5 max-w-xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Browse through our complete collection of literary masterworks, academic editions, poetry, and bestsellers.
          </p>
        </div>
      </section>

      {/* 2. Same Category Section as Home (Search on Left + Round Categories on Right) */}
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
            {(category !== "All" || query) && (
              <button
                type="button"
                onClick={() => {
                  setCategory("All");
                  setQuery("");
                  setSuggestionsOpen(false);
                }}
                className="text-[11px] sm:text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" /> <span>Reset filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Search Bar on Left + Round Categories in One Line with Arrows */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 sm:gap-5">
          {/* Left Side: Sleek Capsule Search Bar with Live Suggestions Dropdown */}
          <div ref={searchContainerRef} className="relative w-full lg:w-72 xl:w-80 shrink-0">
            <form onSubmit={handleSearchSubmit} className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500 group-focus-within:text-amber-600 transition-colors pointer-events-none z-10" />
              <input
                type="text"
                value={query}
                onFocus={() => {
                  if (query.trim()) setSuggestionsOpen(true);
                }}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSuggestionsOpen(true);
                }}
                placeholder="Search category or books…"
                className="w-full h-11 sm:h-12 pl-10 pr-16 rounded-full border border-border/80 bg-card/90 backdrop-blur-xs text-xs sm:text-sm font-semibold text-foreground placeholder:text-muted-foreground shadow-xs focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
              />

              {/* Clear button */}
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setSuggestionsOpen(false);
                  }}
                  className="absolute right-10 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-secondary transition cursor-pointer"
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}

              {/* Submit button */}
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
            {suggestionsOpen && query.trim().length > 0 && (
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
                            setCategory(cat.name);
                            setSuggestionsOpen(false);
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
                            <div className="h-12 w-9 rounded-md overflow-hidden bg-secondary border border-border shadow-2xs shrink-0 flex items-center justify-center">
                              {book.cover && (book.cover.startsWith("http") || book.cover.startsWith("/")) ? (
                                <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
                              ) : (
                                <BookOpen className="h-4 w-4 text-amber-600" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h4 className="font-display text-xs font-bold text-foreground group-hover:text-amber-600 truncate transition-colors">
                                {book.title}
                              </h4>
                              <p className="text-[11px] text-muted-foreground truncate">
                                {book.author} ·{" "}
                                <span className="text-amber-700 dark:text-amber-400 font-semibold">
                                  {book.category}
                                </span>
                              </p>
                            </div>

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
                      No books matching &quot;{query}&quot;
                    </div>
                  )}
                </div>

                <div className="p-2 border-t border-border/60 bg-muted/20">
                  <button
                    type="button"
                    onClick={() => setSuggestionsOpen(false)}
                    className="w-full py-2 px-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
                  >
                    <span>View all matching results ({filtered.length})</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Categories Horizontal Track Flanked by Left and Right Arrows */}
          <div className="relative flex-1 min-w-0 flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollCategories("left")}
              className="hidden sm:flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full bg-card hover:bg-primary hover:text-primary-foreground border border-border/80 shadow-xs items-center justify-center text-foreground transition-all active:scale-90 z-10 cursor-pointer"
              aria-label="Previous categories"
              title="Previous categories"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Scrollable Track */}
            <div
              ref={categoriesScrollRef}
              className="flex items-center gap-3 sm:gap-5 overflow-x-auto scrollbar-none scroll-smooth py-1.5 px-1 sm:px-0 flex-1 min-w-0 -mx-4 px-4 sm:mx-0 snap-x"
            >
              {/* "All" Category Round Avatar */}
              <div
                onClick={() => setCategory("All")}
                className="group shrink-0 flex flex-col items-center text-center cursor-pointer select-none transition-transform hover:-translate-y-1 snap-start"
              >
                <div
                  className={`relative h-16 w-16 sm:h-20 sm:w-20 rounded-full p-[2.5px] transition-all duration-300 ${
                    category === "All"
                      ? "bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-400 ring-4 ring-amber-400/50 shadow-md scale-105"
                      : "bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 shadow-xs group-hover:shadow-md ring-2 ring-primary/10"
                  }`}
                >
                  <div className="h-full w-full rounded-full overflow-hidden bg-card border-[1.5px] border-background relative flex items-center justify-center">
                    <div className="h-full w-full bg-primary/20 flex items-center justify-center text-amber-700 dark:text-amber-400">
                      <Layers className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                <span
                  className={`mt-1.5 text-[11px] sm:text-xs font-bold line-clamp-2 w-[72px] sm:w-[92px] text-center leading-tight h-7 sm:h-8 flex items-center justify-center ${
                    category === "All"
                      ? "text-amber-600 dark:text-amber-400 underline font-black"
                      : "text-foreground group-hover:text-amber-600"
                  }`}
                >
                  All Shelves
                </span>
                <span className="text-[9px] sm:text-[10px] text-muted-foreground font-semibold">
                  {catalog.length} titles
                </span>
              </div>

              {/* Dynamic Categories */}
              {filteredCategories.map((cat) => {
                const isSelected = category.toLowerCase() === cat.name.toLowerCase();
                const count = catalog.filter((b) => b.category.toLowerCase() === cat.name.toLowerCase()).length;
                return (
                  <div
                    key={cat.name}
                    onClick={() => setCategory(cat.name)}
                    className="group shrink-0 flex flex-col items-center text-center cursor-pointer select-none transition-transform hover:-translate-y-1 snap-start"
                  >
                    <div
                      className={`relative h-16 w-16 sm:h-20 sm:w-20 rounded-full p-[2.5px] transition-all duration-300 ${
                        isSelected
                          ? "bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-400 ring-4 ring-amber-400/50 shadow-md scale-105"
                          : "bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 shadow-xs group-hover:shadow-md ring-2 ring-primary/10"
                      }`}
                    >
                      <div className="h-full w-full rounded-full overflow-hidden bg-card border-[1.5px] border-background relative flex items-center justify-center">
                        {cat.image ? (
                          <img
                            src={cat.image}
                            alt={cat.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800&auto=format&fit=crop";
                            }}
                            className="h-full w-full object-cover group-hover:scale-115 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-full w-full bg-primary/15 flex items-center justify-center text-amber-700 dark:text-amber-400">
                            <BookOpen className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                    </div>

                    <span
                      className={`mt-1.5 text-[11px] sm:text-xs font-bold line-clamp-2 w-[72px] sm:w-[92px] text-center leading-tight h-7 sm:h-8 flex items-center justify-center ${
                        isSelected
                          ? "text-amber-600 dark:text-amber-400 underline font-black"
                          : "text-foreground group-hover:text-amber-600"
                      }`}
                    >
                      {cat.name}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-muted-foreground font-semibold">
                      {count} titles
                    </span>
                  </div>
                );
              })}
            </div>

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

      {/* 3. Bottom All Products Grid (Same layout as Home: 6 books per line on desktop) */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
              {category !== "All" ? `Shelf: ${category}` : "Curated Bookstore Collection"}
            </p>
            <h2 className="mt-0.5 font-display text-xl sm:text-2xl lg:text-3xl text-foreground font-bold">
              All Products
            </h2>
          </div>

          {/* Sort Dropdown & Books count */}
          <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
            <span className="text-xs font-semibold text-muted-foreground">
              Showing <strong>{filtered.length}</strong> of {catalog.length} books
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <span>Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-8.5 rounded-full border border-border bg-card px-3 text-foreground outline-none text-xs cursor-pointer font-bold shadow-2xs hover:border-amber-400"
              >
                <option value="featured">Featured & Best</option>
                <option value="discount">Biggest Discount (%)</option>
                <option value="rating">Highest Rated</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* 6 Books Per Row on Laptop/Desktop (lg:grid-cols-6 xl:grid-cols-6), Mobile stays 2 cols */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-4 sm:gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 lg:gap-x-3 lg:gap-y-4">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} compact={true} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-card rounded-3xl border border-border/80 p-8 max-w-lg mx-auto shadow-xs">
            <BookOpen className="h-12 w-12 mx-auto text-amber-500 mb-3 opacity-60" />
            <h3 className="font-display text-lg font-bold text-foreground">No Books Found</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              We couldn't find any books matching &quot;{query || category}&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory("All");
                setQuery("");
              }}
              className="mt-4 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-slate-950 font-bold text-xs shadow-xs hover:bg-primary/90 transition cursor-pointer"
            >
              <X className="h-3.5 w-3.5" /> View All Books
            </button>
          </div>
        )}
      </section>

      {/* Book Detail Preview Modal from dropdown search suggestion click */}
      {previewBook && (
        <BookDetailModal
          book={previewBook}
          open={previewModalOpen}
          onOpenChange={setPreviewModalOpen}
        />
      )}
    </main>
  );
}
