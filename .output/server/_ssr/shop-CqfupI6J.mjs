import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as api, n as STORE, o as categories, t as Button } from "./button-Ba_olYRt.mjs";
import { n as useCart } from "./cart-DVx6BGd4.mjs";
import { Q as BookOpen, _ as Search, u as Sparkles } from "../_libs/lucide-react.mjs";
import { t as Route } from "./shop-vPaKgUf-.mjs";
import { t as BookCard } from "./book-card-C0Xop2Ri.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-CqfupI6J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Shop() {
	const { catalog } = useCart();
	const searchParams = Route.useSearch();
	const [dbCategories, setDbCategories] = (0, import_react.useState)([]);
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)(searchParams.category || "All");
	const [sort, setSort] = (0, import_react.useState)("featured");
	(0, import_react.useEffect)(() => {
		api.getCategories({ status: "active" }).then((cats) => {
			if (cats && cats.length > 0) setDbCategories(["All", ...cats.map((c) => c.name)]);
		}).catch(() => {});
	}, []);
	(0, import_react.useEffect)(() => {
		if (searchParams.category) setCategory(searchParams.category);
	}, [searchParams.category]);
	const activeCategories = dbCategories.length > 0 ? dbCategories : categories;
	const filtered = (0, import_react.useMemo)(() => {
		return [...catalog.filter((book) => {
			const matchCategory = category === "All" || book.category.toLowerCase() === category.toLowerCase();
			const matchQuery = `${book.title} ${book.author} ${book.category}`.toLowerCase().includes(query.toLowerCase());
			return matchCategory && matchQuery;
		})].sort((a, b) => {
			if (sort === "low") return a.price - b.price;
			if (sort === "high") return b.price - a.price;
			if (sort === "rating") return b.rating - a.rating;
			return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
		});
	}, [
		catalog,
		category,
		query,
		sort
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "paper-texture border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " Full Bookstore Catalogue"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl text-primary font-bold sm:text-5xl",
						children: "Explore All Shelves"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 max-w-xl text-sm leading-6 text-muted-foreground",
						children: [
							"Every title in ",
							STORE.name,
							" is chosen for its story, craft, and lasting impact. Click any book to view reader reviews, detailed synopsis, and instant booking options."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "relative mt-7 block max-w-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Search books or authors"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (e) => setQuery(e.target.value),
								className: "h-12 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20 shadow-sm",
								placeholder: "Search by book title, author, or keyword…"
							})
						]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-9 flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none",
					children: activeCategories.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: category.toLowerCase() === item.toLowerCase() ? "default" : "ghost",
						className: "shrink-0 rounded-full text-xs font-semibold px-4",
						onClick: () => setCategory(item),
						children: item
					}, item))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between sm:justify-end gap-4 text-xs font-semibold text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Showing ",
						filtered.length,
						" titles"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex shrink-0 items-center gap-2",
						children: ["Sort by:", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: sort,
							onChange: (e) => setSort(e.target.value),
							className: "h-9 rounded-md border border-border bg-card px-3 text-foreground outline-none text-xs cursor-pointer font-medium",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "featured",
									children: "Featured First"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "rating",
									children: "Highest Rated"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "low",
									children: "Price: Low to High"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "high",
									children: "Price: High to Low"
								})
							]
						})]
					})]
				})]
			}), filtered.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-7",
				children: filtered.map((book) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookCard, { book }, book.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-24 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "mx-auto h-12 w-12 text-muted-foreground opacity-50" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 font-display text-2xl font-bold",
						children: "No books found"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Try another title, author, or category."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "mt-5 rounded-full px-6 text-xs font-semibold",
						onClick: () => {
							setQuery("");
							setCategory("All");
						},
						children: "Clear filters"
					})
				]
			})]
		})]
	});
}
//#endregion
export { Shop as component };
