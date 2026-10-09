import { r as __toESM } from "../_runtime.mjs";
import { i as categories } from "./books-L-o23q6K.mjs";
import { t as api } from "./api-CIbGssxW.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useCart } from "./cart-DMZvUTwh.mjs";
import { Ct as ChevronLeft, Pt as ArrowRight, Q as Layers, S as Search, St as ChevronRight, h as Sparkles, kt as BookOpen, n as X, p as Tag } from "../_libs/lucide-react.mjs";
import { t as Route } from "./shop-DU6q2uj0.mjs";
import { n as BookDetailModal, t as BookCard } from "./book-card-BO0uAu0C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-B5kBX95D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Shop() {
	const { catalog, refreshCatalog } = useCart();
	const searchParams = Route.useSearch();
	const [dbCategories, setDbCategories] = (0, import_react.useState)([]);
	const [query, setQuery] = (0, import_react.useState)(searchParams.q || "");
	const [category, setCategory] = (0, import_react.useState)(searchParams.category || "All");
	const [sort, setSort] = (0, import_react.useState)("featured");
	const [suggestionsOpen, setSuggestionsOpen] = (0, import_react.useState)(false);
	const [previewBook, setPreviewBook] = (0, import_react.useState)(null);
	const [previewModalOpen, setPreviewModalOpen] = (0, import_react.useState)(false);
	const categoriesScrollRef = (0, import_react.useRef)(null);
	const searchContainerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const handleClickOutside = (e) => {
			if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) setSuggestionsOpen(false);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	(0, import_react.useEffect)(() => {
		refreshCatalog();
		api.getCategories({ status: "active" }).then((cats) => {
			if (cats && cats.length > 0) setDbCategories(cats);
		}).catch(() => []);
	}, []);
	(0, import_react.useEffect)(() => {
		if (searchParams.category) setCategory(searchParams.category);
		if (searchParams.q !== void 0) setQuery(searchParams.q);
	}, [searchParams.category, searchParams.q]);
	const scrollCategories = (direction) => {
		if (categoriesScrollRef.current) {
			const scrollDistance = direction === "left" ? -260 : 260;
			categoriesScrollRef.current.scrollBy({
				left: scrollDistance,
				behavior: "smooth"
			});
		}
	};
	const displayCategories = dbCategories.length > 0 ? dbCategories.map((c) => ({
		name: c.name,
		image: c.image
	})) : categories.filter((c) => c !== "All").map((name) => ({
		name,
		image: ""
	}));
	const filteredCategories = (0, import_react.useMemo)(() => {
		if (!query.trim()) return displayCategories;
		const q = query.trim().toLowerCase();
		const directMatches = displayCategories.filter((c) => c.name.toLowerCase().includes(q));
		if (directMatches.length > 0) return directMatches;
		const categoriesWithBooks = new Set(catalog.filter((b) => `${b.title} ${b.author} ${b.description || ""}`.toLowerCase().includes(q)).map((b) => b.category.toLowerCase()));
		const indirectMatches = displayCategories.filter((c) => categoriesWithBooks.has(c.name.toLowerCase()));
		return indirectMatches.length > 0 ? indirectMatches : displayCategories;
	}, [
		query,
		displayCategories,
		catalog
	]);
	const matchingBooks = (0, import_react.useMemo)(() => {
		if (!query.trim()) return [];
		const q = query.trim().toLowerCase();
		return catalog.filter((b) => `${b.title} ${b.author} ${b.category} ${b.subCategory || ""}`.toLowerCase().includes(q)).slice(0, 5);
	}, [query, catalog]);
	const matchingCategoriesList = (0, import_react.useMemo)(() => {
		if (!query.trim()) return [];
		const q = query.trim().toLowerCase();
		return displayCategories.filter((c) => c.name.toLowerCase().includes(q));
	}, [query, displayCategories]);
	const handleSearchSubmit = (e) => {
		e.preventDefault();
		setSuggestionsOpen(false);
	};
	const filtered = (0, import_react.useMemo)(() => {
		return [...catalog.filter((book) => {
			const matchCategory = category === "All" || book.category.toLowerCase() === category.toLowerCase();
			const matchQuery = !query.trim() || `${book.title} ${book.author} ${book.category} ${book.subCategory || ""} ${book.description || ""}`.toLowerCase().includes(query.toLowerCase());
			return matchCategory && matchQuery;
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
		query,
		sort
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "paper-texture border-b border-border bg-gradient-to-b from-amber-50/20 via-card to-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 py-5 sm:py-7 sm:px-6 lg:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 fill-amber-500 text-amber-500" }), " Curated Bookstore Catalogue"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 font-display text-2xl sm:text-3xl lg:text-4xl text-foreground font-bold",
							children: "All Books"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 max-w-xl text-xs sm:text-sm text-muted-foreground leading-relaxed",
							children: "Browse through our complete collection of literary masterworks, academic editions, poetry, and bestsellers."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-4 py-4 sm:py-7 sm:px-6 lg:px-8 border-b border-border/60 bg-gradient-to-b from-card/30 via-background to-background overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex flex-row items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 fill-amber-500 text-amber-500" }), " Explore by Genre"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-0.5 font-display text-lg sm:text-2xl lg:text-3xl text-foreground font-bold",
						children: "Shop by Category"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-3",
						children: (category !== "All" || query) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setCategory("All");
								setQuery("");
								setSuggestionsOpen(false);
							},
							className: "text-[11px] sm:text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reset filters" })
							]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col lg:flex-row items-stretch lg:items-center gap-3 sm:gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: searchContainerRef,
						className: "relative w-full lg:w-72 xl:w-80 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSearchSubmit,
							className: "relative group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500 group-focus-within:text-amber-600 transition-colors pointer-events-none z-10" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: query,
									onFocus: () => {
										if (query.trim()) setSuggestionsOpen(true);
									},
									onChange: (e) => {
										setQuery(e.target.value);
										setSuggestionsOpen(true);
									},
									placeholder: "Search category or books…",
									className: "w-full h-11 sm:h-12 pl-10 pr-16 rounded-full border border-border/80 bg-card/90 backdrop-blur-xs text-xs sm:text-sm font-semibold text-foreground placeholder:text-muted-foreground shadow-xs focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
								}),
								query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setQuery("");
										setSuggestionsOpen(false);
									},
									className: "absolute right-10 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-secondary transition cursor-pointer",
									title: "Clear search",
									"aria-label": "Clear search",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-8.5 sm:w-8.5 rounded-full bg-primary text-slate-950 font-bold flex items-center justify-center shadow-xs hover:bg-primary/90 transition active:scale-95 cursor-pointer",
									title: "Search books",
									"aria-label": "Search books",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
								})
							]
						}), suggestionsOpen && query.trim().length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute top-full left-0 mt-2 w-full sm:w-[380px] md:w-[420px] bg-card/95 backdrop-blur-md border border-amber-300/80 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150",
							children: [
								matchingCategoriesList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 border-b border-border/60 bg-muted/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-1.5 flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-3 w-3" }),
											" Matching Categories (",
											matchingCategoriesList.length,
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-1.5 flex-wrap",
										children: matchingCategoriesList.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												setCategory(cat.name);
												setSuggestionsOpen(false);
											},
											className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs border border-amber-300 shadow-2xs transition cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cat.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] text-amber-800 opacity-70",
												children: [
													"(",
													catalog.filter((b) => b.category.toLowerCase() === cat.name.toLowerCase()).length,
													")"
												]
											})]
										}, cat.name))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2 max-h-[300px] overflow-y-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "px-2 py-1 flex items-center justify-between text-[11px] font-bold text-muted-foreground uppercase tracking-wider",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Products & Books" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [matchingBooks.length, " suggestions"] })]
									}), matchingBooks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-1 mt-1",
										children: matchingBooks.map((book) => {
											const mrp = book.oldPrice || book.old_price;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												onClick: () => {
													setPreviewBook(book);
													setPreviewModalOpen(true);
													setSuggestionsOpen(false);
												},
												className: "flex items-center gap-3 p-2 rounded-xl hover:bg-amber-500/10 transition cursor-pointer group",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-12 w-9 rounded-md overflow-hidden bg-secondary border border-border shadow-2xs shrink-0 flex items-center justify-center",
														children: book.cover && (book.cover.startsWith("http") || book.cover.startsWith("/")) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: book.cover,
															alt: book.title,
															className: "h-full w-full object-cover"
														}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4 text-amber-600" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex-1 min-w-0",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
															className: "font-display text-xs font-bold text-foreground group-hover:text-amber-600 truncate transition-colors",
															children: book.title
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-[11px] text-muted-foreground truncate",
															children: [
																book.author,
																" ·",
																" ",
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-amber-700 dark:text-amber-400 font-semibold",
																	children: book.category
																})
															]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-right shrink-0",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "font-sans text-xs font-bold text-amber-600 dark:text-amber-400",
															children: ["₹", book.price]
														}), mrp && mrp > book.price && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-[10px] text-muted-foreground line-through",
															children: ["₹", mrp]
														})]
													})
												]
											}, book.id);
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "py-6 text-center text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-6 w-6 mx-auto mb-1.5 opacity-40 text-amber-600" }),
											"No books matching \"",
											query,
											"\""
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-2 border-t border-border/60 bg-muted/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setSuggestionsOpen(false),
										className: "w-full py-2 px-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"View all matching results (",
											filtered.length,
											")"
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
									})
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1 min-w-0 flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => scrollCategories("left"),
								className: "hidden sm:flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full bg-card hover:bg-primary hover:text-primary-foreground border border-border/80 shadow-xs items-center justify-center text-foreground transition-all active:scale-90 z-10 cursor-pointer",
								"aria-label": "Previous categories",
								title: "Previous categories",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								ref: categoriesScrollRef,
								className: "flex items-center gap-3 sm:gap-5 overflow-x-auto scrollbar-none scroll-smooth py-1.5 px-1 sm:px-0 flex-1 min-w-0 -mx-4 px-4 sm:mx-0 snap-x",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									onClick: () => setCategory("All"),
									className: "group shrink-0 flex flex-col items-center text-center cursor-pointer select-none transition-transform hover:-translate-y-1 snap-start",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `relative h-16 w-16 sm:h-20 sm:w-20 rounded-full p-[2.5px] transition-all duration-300 ${category === "All" ? "bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-400 ring-4 ring-amber-400/50 shadow-md scale-105" : "bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 shadow-xs group-hover:shadow-md ring-2 ring-primary/10"}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full w-full rounded-full overflow-hidden bg-card border-[1.5px] border-background relative flex items-center justify-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-full w-full bg-primary/20 flex items-center justify-center text-amber-700 dark:text-amber-400",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-6 w-6" })
												})
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `mt-1.5 text-[11px] sm:text-xs font-bold line-clamp-2 w-[72px] sm:w-[92px] text-center leading-tight h-7 sm:h-8 flex items-center justify-center ${category === "All" ? "text-amber-600 dark:text-amber-400 underline font-black" : "text-foreground group-hover:text-amber-600"}`,
											children: "All Shelves"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[9px] sm:text-[10px] text-muted-foreground font-semibold",
											children: [catalog.length, " titles"]
										})
									]
								}), filteredCategories.map((cat) => {
									const isSelected = category.toLowerCase() === cat.name.toLowerCase();
									const count = catalog.filter((b) => b.category.toLowerCase() === cat.name.toLowerCase()).length;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										onClick: () => setCategory(cat.name),
										className: "group shrink-0 flex flex-col items-center text-center cursor-pointer select-none transition-transform hover:-translate-y-1 snap-start",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `relative h-16 w-16 sm:h-20 sm:w-20 rounded-full p-[2.5px] transition-all duration-300 ${isSelected ? "bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-400 ring-4 ring-amber-400/50 shadow-md scale-105" : "bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 shadow-xs group-hover:shadow-md ring-2 ring-primary/10"}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-full w-full rounded-full overflow-hidden bg-card border-[1.5px] border-background relative flex items-center justify-center",
													children: cat.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: cat.image,
														alt: cat.name,
														className: "h-full w-full object-cover group-hover:scale-115 transition-transform duration-500",
														loading: "lazy"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-full w-full bg-primary/15 flex items-center justify-center text-amber-700 dark:text-amber-400",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-6 w-6" })
													})
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `mt-1.5 text-[11px] sm:text-xs font-bold line-clamp-2 w-[72px] sm:w-[92px] text-center leading-tight h-7 sm:h-8 flex items-center justify-center ${isSelected ? "text-amber-600 dark:text-amber-400 underline font-black" : "text-foreground group-hover:text-amber-600"}`,
												children: cat.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[9px] sm:text-[10px] text-muted-foreground font-semibold",
												children: [count, " titles"]
											})
										]
									}, cat.name);
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => scrollCategories("right"),
								className: "hidden sm:flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full bg-card hover:bg-primary hover:text-primary-foreground border border-border/80 shadow-xs items-center justify-center text-foreground transition-all active:scale-90 z-10 cursor-pointer",
								"aria-label": "Next categories",
								title: "Next categories",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-wider text-amber-600",
						children: category !== "All" ? `Shelf: ${category}` : "Curated Bookstore Collection"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-0.5 font-display text-xl sm:text-2xl lg:text-3xl text-foreground font-bold",
						children: "All Products"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 self-start sm:self-auto flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-semibold text-muted-foreground",
							children: [
								"Showing ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: filtered.length }),
								" of ",
								catalog.length,
								" books"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-xs font-semibold text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sort:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: sort,
								onChange: (e) => setSort(e.target.value),
								className: "h-8.5 rounded-full border border-border bg-card px-3 text-foreground outline-none text-xs cursor-pointer font-bold shadow-2xs hover:border-amber-400",
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
					})]
				}), filtered.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-4 sm:gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 lg:gap-x-3 lg:gap-y-4",
					children: filtered.map((book) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookCard, {
						book,
						compact: true
					}, book.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-16 text-center bg-card rounded-3xl border border-border/80 p-8 max-w-lg mx-auto shadow-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-12 w-12 mx-auto text-amber-500 mb-3 opacity-60" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-bold text-foreground",
							children: "No Books Found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [
								"We couldn't find any books matching \"",
								query || category,
								"\"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setCategory("All");
								setQuery("");
							},
							className: "mt-4 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-slate-950 font-bold text-xs shadow-xs hover:bg-primary/90 transition cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" }), " View All Books"]
						})
					]
				})]
			}),
			previewBook && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookDetailModal, {
				book: previewBook,
				open: previewModalOpen,
				onOpenChange: setPreviewModalOpen
			})
		]
	});
}
//#endregion
export { Shop as component };
