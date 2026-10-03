import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { BookOpen, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/book-card";
import { categories as defaultCategories, STORE } from "@/lib/books";
import { api } from "@/lib/api";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): { category?: string } => ({
    category: typeof search.category === "string" ? search.category : undefined,
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
  const { catalog } = useCart();
  const searchParams = Route.useSearch();
  const [dbCategories, setDbCategories] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(searchParams.category || "All");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    api.getCategories({ status: "active" }).then((cats) => {
      if (cats && cats.length > 0) {
        setDbCategories(["All", ...cats.map((c) => c.name)]);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (searchParams.category) {
      setCategory(searchParams.category);
    }
  }, [searchParams.category]);

  const activeCategories = dbCategories.length > 0 ? dbCategories : defaultCategories;

  const filtered = useMemo(() => {
    const result = catalog.filter((book) => {
      const matchCategory = category === "All" || book.category.toLowerCase() === category.toLowerCase();
      const matchQuery = `${book.title} ${book.author} ${book.category}`.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchQuery;
    });

    return [...result].sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [catalog, category, query, sort]);

  return (
    <main className="min-h-screen bg-background">
      {/* Header Banner */}
      <section className="paper-texture border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> Full Bookstore Catalogue
          </p>
          <h1 className="mt-2 font-display text-4xl text-primary font-bold sm:text-5xl">Explore All Shelves</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            Every title in {STORE.name} is chosen for its story, craft, and lasting impact. Click any book to view reader reviews, detailed synopsis, and instant booking options.
          </p>
          <label className="relative mt-7 block max-w-xl">
            <span className="sr-only">Search books or authors</span>
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20 shadow-sm"
              placeholder="Search by book title, author, or keyword…"
            />
          </label>
        </div>
      </section>

      {/* Filter and Books Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-9 flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {activeCategories.map((item) => (
              <Button
                key={item}
                size="sm"
                variant={category.toLowerCase() === item.toLowerCase() ? "default" : "ghost"}
                className="shrink-0 rounded-full text-xs font-semibold px-4"
                onClick={() => setCategory(item)}
              >
                {item}
              </Button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-semibold text-muted-foreground">
            <span>Showing {filtered.length} titles</span>
            <label className="flex shrink-0 items-center gap-2">
              Sort by:
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-9 rounded-md border border-border bg-card px-3 text-foreground outline-none text-xs cursor-pointer font-medium"
              >
                <option value="featured">Featured First</option>
                <option value="rating">Highest Rated</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </label>
          </div>
        </div>

        {filtered.length ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-7">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mt-4 font-display text-2xl font-bold">No books found</h3>
            <p className="mt-2 text-sm text-muted-foreground">Try another title, author, or category.</p>
            <Button
              variant="outline"
              className="mt-5 rounded-full px-6 text-xs font-semibold"
              onClick={() => {
                setQuery("");
                setCategory("All");
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
