import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { BookOpen, Search, Sparkles, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/book-card";
import { categories as defaultCategories, STORE } from "@/lib/books";
import { api, type Category, type SubCategory } from "@/lib/api";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): { category?: string; subCategory?: string } => ({
    category: typeof search.category === "string" ? search.category : undefined,
    subCategory: typeof search.subCategory === "string" ? search.subCategory : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All Books — Success Book Hub" },
      { name: "description", content: "Browse our full catalogue of fiction, classics, poetry, non-fiction, children's and self-help books. Order online or on WhatsApp." },
      { property: "og:title", content: "Shop All Books — Success Book Hub" },
      { property: "og:description", content: "The complete Success Book Hub catalogue, ready to order with instant booking & WhatsApp confirmation." },
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
  const [dbSubCategories, setDbSubCategories] = useState<SubCategory[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(searchParams.category || "All");
  const [subCategory, setSubCategory] = useState<string>(searchParams.subCategory || "All");
  const [sort, setSort] = useState("featured");

  // Load live categories and subcategories from backend
  useEffect(() => {
    refreshCatalog();
    Promise.all([
      api.getCategories({ status: "active" }).catch(() => []),
      api.getSubCategories({ status: "active" }).catch(() => [])
    ]).then(([cats, subCats]) => {
      if (cats && cats.length > 0) setDbCategories(cats);
      if (subCats && subCats.length > 0) setDbSubCategories(subCats);
    });
  }, []);

  useEffect(() => {
    if (searchParams.category) {
      setCategory(searchParams.category);
    }
    if (searchParams.subCategory) {
      setSubCategory(searchParams.subCategory);
    }
  }, [searchParams.category, searchParams.subCategory]);

  const activeCategoryNames = dbCategories.length > 0
    ? ["All", ...dbCategories.map((c) => c.name)]
    : defaultCategories;

  // Find subcategories belonging to the active selected category
  const activeCategoryObj = dbCategories.find((c) => c.name.toLowerCase() === category.toLowerCase());
  const relevantSubCategories = useMemo(() => {
    if (category === "All" || !activeCategoryObj) {
      // Gather all distinct subcategories from catalog or subcategory table
      const fromDb = dbSubCategories.map((s) => s.name);
      const fromBooks = catalog.map((b) => b.subCategory || b.sub_category).filter(Boolean) as string[];
      const combined = Array.from(new Set([...fromDb, ...fromBooks]));
      return combined;
    }
    const matchingFromDb = dbSubCategories.filter((s) => s.category_id === activeCategoryObj.id).map((s) => s.name);
    const matchingFromBooks = catalog
      .filter((b) => b.category.toLowerCase() === category.toLowerCase() && (b.subCategory || b.sub_category))
      .map((b) => (b.subCategory || b.sub_category) as string);
    return Array.from(new Set([...matchingFromDb, ...matchingFromBooks]));
  }, [category, activeCategoryObj, dbSubCategories, catalog]);

  // Handle Category selection
  const handleCategorySelect = (catName: string) => {
    setCategory(catName);
    setSubCategory("All"); // reset subcategory on category change
  };

  const filtered = useMemo(() => {
    const result = catalog.filter((book) => {
      const matchCategory = category === "All" || book.category.toLowerCase() === category.toLowerCase();
      const bookSubCat = (book.subCategory || book.sub_category || "").toLowerCase();
      const matchSubCategory = subCategory === "All" || bookSubCat === subCategory.toLowerCase();
      const matchQuery = `${book.title} ${book.author} ${book.category} ${book.subCategory || ""} ${book.description || ""}`
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchCategory && matchSubCategory && matchQuery;
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
  }, [catalog, category, subCategory, query, sort]);

  return (
    <main className="min-h-screen bg-background">
      {/* Header Banner */}
      <section className="paper-texture border-b border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Curated Bookstore Catalogue
          </p>
          <h1 className="mt-2 font-display text-4xl text-primary font-bold sm:text-5xl">Explore All Shelves</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            Browse through our wide collection of classics, academic editions, poetry, and bestsellers. Click any book to view preview images, reviews, MRP discounts, and direct checkout options.
          </p>
          <label className="relative mt-7 block max-w-xl">
            <span className="sr-only">Search books or authors</span>
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm text-foreground"
              placeholder="Search by book title, author, category, or keyword…"
            />
          </label>
        </div>
      </section>

      {/* Filter and Books Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Category Bar */}
        <div className="flex flex-col gap-4 border-b border-border pb-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Primary Category Buttons */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {activeCategoryNames.map((item) => (
                <Button
                  key={item}
                  size="sm"
                  variant={category.toLowerCase() === item.toLowerCase() ? "default" : "outline"}
                  className="shrink-0 rounded-full text-xs font-bold px-4 h-9 shadow-xs"
                  onClick={() => handleCategorySelect(item)}
                >
                  {item}
                </Button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground shrink-0 ml-auto">
              <span>Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-9 rounded-full border border-border bg-card px-3 text-foreground outline-none text-xs cursor-pointer font-bold shadow-xs"
              >
                <option value="featured">Featured & Best</option>
                <option value="discount">Biggest Discount (%)</option>
                <option value="rating">Highest Rated</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Sub-Category Pills if available */}
          {relevantSubCategories.length > 0 && (
            <div className="pt-2 flex items-center gap-1.5 flex-wrap text-xs animate-in fade-in duration-200">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1 mr-1">
                <Filter className="h-3 w-3 text-primary" /> Sub-Genres:
              </span>
              <button
                type="button"
                onClick={() => setSubCategory("All")}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition border ${
                  subCategory === "All"
                    ? "bg-secondary text-primary font-bold border-primary/30"
                    : "bg-background text-muted-foreground hover:text-foreground border-border"
                }`}
              >
                All Sub-Genres
              </button>
              {relevantSubCategories.map((subName) => (
                <button
                  key={subName}
                  type="button"
                  onClick={() => setSubCategory(subName)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition border ${
                    subCategory.toLowerCase() === subName.toLowerCase()
                      ? "bg-secondary text-primary font-bold border-primary/40 shadow-xs"
                      : "bg-background text-muted-foreground hover:text-foreground border-border hover:border-primary/30"
                  }`}
                >
                  {subName}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results Counter & Active Filter Pills */}
        <div className="py-4 flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">
            Showing <strong>{filtered.length}</strong> books
            {category !== "All" && ` in ${category}`}
            {subCategory !== "All" && ` › ${subCategory}`}
          </span>

          {(category !== "All" || subCategory !== "All" || query) && (
            <button
              onClick={() => {
                setCategory("All");
                setSubCategory("All");
                setQuery("");
              }}
              className="text-xs text-primary hover:underline font-bold flex items-center gap-1"
            >
              <X className="h-3 w-3" /> Clear All Filters
            </button>
          )}
        </div>

        {/* Book Cards Grid */}
        {filtered.length ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 lg:gap-x-6">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-40" />
            <h3 className="mt-4 font-display text-2xl font-bold text-foreground">No books found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try selecting another category or searching for a different keyword.
            </p>
            <Button
              variant="outline"
              className="mt-5 rounded-full px-6 text-xs font-semibold"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setSubCategory("All");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
