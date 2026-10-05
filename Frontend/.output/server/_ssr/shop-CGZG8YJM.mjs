import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as api, o as categories, t as Button } from "./button-BJb0Boyw.mjs";
import { n as useCart } from "./cart-BGsjO82q.mjs";
import { G as Funnel, _ as Search, lt as BookOpen, t as X, u as Sparkles } from "../_libs/lucide-react.mjs";
import { t as Route } from "./shop-ChVah1N_.mjs";
import { t as BookCard } from "./book-card-8Rub4ycL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-CGZG8YJM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Shop() {
	const { catalog, refreshCatalog } = useCart();
	const searchParams = Route.useSearch();
	const [dbCategories, setDbCategories] = (0, import_react.useState)([]);
	const [dbSubCategories, setDbSubCategories] = (0, import_react.useState)([]);
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)(searchParams.category || "All");
	const [subCategory, setSubCategory] = (0, import_react.useState)(searchParams.subCategory || "All");
	const [sort, setSort] = (0, import_react.useState)("featured");
	(0, import_react.useEffect)(() => {
		refreshCatalog();
		Promise.all([api.getCategories({ status: "active" }).catch(() => []), api.getSubCategories({ status: "active" }).catch(() => [])]).then(([cats, subCats]) => {
			if (cats && cats.length > 0) setDbCategories(cats);
			if (subCats && subCats.length > 0) setDbSubCategories(subCats);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (searchParams.category) setCategory(searchParams.category);
		if (searchParams.subCategory) setSubCategory(searchParams.subCategory);
	}, [searchParams.category, searchParams.subCategory]);
	const activeCategoryNames = dbCategories.length > 0 ? ["All", ...dbCategories.map((c) => c.name)] : categories;
	const activeCategoryObj = dbCategories.find((c) => c.name.toLowerCase() === category.toLowerCase());
	const relevantSubCategories = (0, import_react.useMemo)(() => {
		if (category === "All" || !activeCategoryObj) {
			const fromDb = dbSubCategories.map((s) => s.name);
			const fromBooks = catalog.map((b) => b.subCategory || b.sub_category).filter(Boolean);
			return Array.from(/* @__PURE__ */ new Set([...fromDb, ...fromBooks]));
		}
		const matchingFromDb = dbSubCategories.filter((s) => s.category_id === activeCategoryObj.id).map((s) => s.name);
		const matchingFromBooks = catalog.filter((b) => b.category.toLowerCase() === category.toLowerCase() && (b.subCategory || b.sub_category)).map((b) => b.subCategory || b.sub_category);
		return Array.from(/* @__PURE__ */ new Set([...matchingFromDb, ...matchingFromBooks]));
	}, [
		category,
		activeCategoryObj,
		dbSubCategories,
		catalog
	]);
	const handleCategorySelect = (catName) => {
		setCategory(catName);
		setSubCategory("All");
	};
	const filtered = (0, import_react.useMemo)(() => {
		return [...catalog.filter((book) => {
			const matchCategory = category === "All" || book.category.toLowerCase() === category.toLowerCase();
			const bookSubCat = (book.subCategory || book.sub_category || "").toLowerCase();
			const matchSubCategory = subCategory === "All" || bookSubCat === subCategory.toLowerCase();
			const matchQuery = `${book.title} ${book.author} ${book.category} ${book.subCategory || ""} ${book.description || ""}`.toLowerCase().includes(query.toLowerCase());
			return matchCategory && matchSubCategory && matchQuery;
		})].sort((a, b) => {
			if (sort === "low") return a.price - b.price;
			if (sort === "high") return b.price - a.price;
			if (sort === "rating") return b.rating - a.rating;
			if (sort === "discount") {
				const discA = a.discountPercent || a.discount_percent || 0;
				return (b.discountPercent || b.discount_percent || 0) - discA;
			}
			return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
		});
	}, [
		catalog,
		category,
		subCategory,
		query,
		sort
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "paper-texture border-b border-border bg-card/60",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-amber-500" }), " Curated Bookstore Catalogue"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl text-primary font-bold sm:text-5xl",
						children: "Explore All Shelves"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-sm leading-6 text-muted-foreground",
						children: "Browse through our wide collection of classics, academic editions, poetry, and bestsellers. Click any book to view preview images, reviews, MRP discounts, and direct checkout options."
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
								className: "h-12 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm text-foreground",
								placeholder: "Search by book title, author, category, or keyword…"
							})
						]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 border-b border-border pb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2 overflow-x-auto pb-1 scrollbar-none",
							children: activeCategoryNames.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: category.toLowerCase() === item.toLowerCase() ? "default" : "outline",
								className: "shrink-0 rounded-full text-xs font-bold px-4 h-9 shadow-xs",
								onClick: () => handleCategorySelect(item),
								children: item
							}, item))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs font-semibold text-muted-foreground shrink-0 ml-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sort by:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: sort,
								onChange: (e) => setSort(e.target.value),
								className: "h-9 rounded-full border border-border bg-card px-3 text-foreground outline-none text-xs cursor-pointer font-bold shadow-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "featured",
										children: "Featured & Best"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "discount",
										children: "Biggest Discount (%)"
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
					}), relevantSubCategories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-2 flex items-center gap-1.5 flex-wrap text-xs animate-in fade-in duration-200",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1 mr-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-3 w-3 text-primary" }), " Sub-Genres:"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSubCategory("All"),
								className: `px-3 py-1 rounded-full text-xs font-semibold transition border ${subCategory === "All" ? "bg-secondary text-primary font-bold border-primary/30" : "bg-background text-muted-foreground hover:text-foreground border-border"}`,
								children: "All Sub-Genres"
							}),
							relevantSubCategories.map((subName) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSubCategory(subName),
								className: `px-3 py-1 rounded-full text-xs font-semibold transition border ${subCategory.toLowerCase() === subName.toLowerCase() ? "bg-secondary text-primary font-bold border-primary/40 shadow-xs" : "bg-background text-muted-foreground hover:text-foreground border-border hover:border-primary/30"}`,
								children: subName
							}, subName))
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-4 flex items-center justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold text-foreground",
						children: [
							"Showing ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: filtered.length }),
							" books",
							category !== "All" && ` in ${category}`,
							subCategory !== "All" && ` › ${subCategory}`
						]
					}), (category !== "All" || subCategory !== "All" || query) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setCategory("All");
							setSubCategory("All");
							setQuery("");
						},
						className: "text-xs text-primary hover:underline font-bold flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" }), " Clear All Filters"]
					})]
				}),
				filtered.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 lg:gap-x-6",
					children: filtered.map((book) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookCard, { book }, book.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-24 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "mx-auto h-12 w-12 text-muted-foreground opacity-40" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-2xl font-bold text-foreground",
							children: "No books found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Try selecting another category or searching for a different keyword."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "mt-5 rounded-full px-6 text-xs font-semibold",
							onClick: () => {
								setQuery("");
								setCategory("All");
								setSubCategory("All");
							},
							children: "Clear filters"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { Shop as component };
