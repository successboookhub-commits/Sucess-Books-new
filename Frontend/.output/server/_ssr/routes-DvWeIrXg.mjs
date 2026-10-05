import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as api, n as STORE, o as categories, r as WHATSAPP_NUMBER, t as Button } from "./button-BJb0Boyw.mjs";
import { n as useCart } from "./cart-BGsjO82q.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Truck, d as ShoppingBag, l as Star, p as ShieldCheck, pt as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as BookCard } from "./book-card-8Rub4ycL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DvWeIrXg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	const { catalog } = useCart();
	const [dbCategories, setDbCategories] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		api.getCategories({ status: "active" }).then((cats) => {
			if (cats && cats.length > 0) setDbCategories(cats);
		}).catch(() => {});
	}, []);
	const displayCategories = dbCategories.length > 0 ? dbCategories.map((c) => ({
		name: c.name,
		image: c.image
	})) : categories.filter((c) => c !== "All").map((name) => ({
		name,
		image: ""
	}));
	const featured = catalog.filter((b) => b.featured).slice(0, 8);
	const displayBooks = featured.length ? featured : catalog.slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen overflow-x-hidden bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "paper-texture border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid min-h-[560px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-primary" }), " Curated with Passion & Purpose"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "font-display text-5xl leading-[1.08] text-primary sm:text-6xl lg:text-7xl font-bold",
								children: [
									"Books that inspire.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
										className: "text-maroon-soft font-normal",
										children: "Stories that shape success."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg",
								children: [
									"From literary masterworks to mindset guides, explore our handpicked collection at ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: STORE.name }),
									" — available with direct online checkout and instant WhatsApp order confirmation."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-3.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "lg",
									className: "h-12 rounded-full px-7 shadow-sm gap-2 font-semibold",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/shop",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }), " Explore Catalogue"]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "lg",
									className: "h-12 rounded-full px-7 border-whatsapp/40 text-whatsapp hover:bg-whatsapp hover:text-white transition font-semibold",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `https://wa.me/${WHATSAPP_NUMBER}`,
										target: "_blank",
										rel: "noreferrer",
										children: "Chat on WhatsApp"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5 text-xs font-semibold text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4 text-primary" }), " Free delivery above ₹799"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-gold text-gold" }), " Rated 4.8 by 2,500+ readers"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-primary" }), " 100% Original Editions"]
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto hidden h-[440px] w-full max-w-md lg:block",
						"aria-label": "A decorative stack of featured books",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "book-shadow absolute left-4 top-8 h-[350px] w-60 -rotate-6 border-l-8 border-maroon-soft bg-primary p-7 text-primary-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-widest opacity-75 font-semibold",
									children: "Bestselling Classic"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-16 font-display text-4xl leading-tight font-bold",
									children: "The Secret Garden"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 text-xs opacity-80",
									children: "Frances Hodgson Burnett"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "book-shadow absolute bottom-2 right-2 h-[360px] w-60 rotate-6 border-l-8 border-primary bg-gold p-7 text-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-widest opacity-75 font-semibold",
									children: "Staff Selection"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-16 font-display text-4xl leading-tight font-bold",
									children: "The Last Bookshop"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 text-xs font-medium",
									children: "Madeline Martin"
								})
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-wider text-primary",
						children: "Explore by genre"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-3xl text-foreground font-bold sm:text-4xl",
						children: "Shop by Category"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/shop",
						className: "hidden items-center gap-1 text-sm font-bold text-primary hover:underline sm:inline-flex",
						children: ["View all shelves ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6",
					children: displayCategories.map((cat) => {
						const count = catalog.filter((b) => b.category.toLowerCase() === cat.name.toLowerCase()).length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/shop",
							search: { category: cat.name },
							className: "group rounded-xl border border-border bg-card overflow-hidden text-center transition duration-200 hover:border-primary hover:shadow-md flex flex-col",
							children: [cat.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "h-24 w-full overflow-hidden bg-muted relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: cat.image,
									alt: cat.name,
									className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" })]
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 flex-1 flex flex-col justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight",
									children: cat.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-[11px] font-medium text-muted-foreground",
									children: [count, " titles"]
								})]
							})]
						}, cat.name);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-wider text-primary",
						children: "Curated Highlights"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-3xl text-foreground font-bold sm:text-4xl",
						children: "Featured This Week"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/shop",
						className: "inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline",
						children: [
							"Shop all ",
							catalog.length,
							" books ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-7",
					children: displayBooks.map((book) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookCard, { book }, book.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-primary text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-3xl font-bold leading-tight",
						children: [
							"Simple ordering.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Personal care."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs opacity-75 mt-3",
						children: "From Kolkata's heritage book alleys to your doorstep anywhere in India."
					})] }), [[
						"01",
						"Select Your Books",
						"Browse our curated collection and add your favorite stories to your bag."
					], [
						"02",
						"Instant Order & WhatsApp",
						"Place your booking online with doorstep COD or send details via WhatsApp in 1 click."
					]].map(([number, title, text]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-l border-primary-foreground/20 pl-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs opacity-60 font-bold",
								children: number
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-display text-xl font-bold",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-6 opacity-80",
								children: text
							})
						]
					}, number))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center max-w-xl mx-auto mb-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-wider text-primary",
						children: "From Our Community"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-3xl text-foreground font-bold sm:text-4xl",
						children: "Loved by Readers Across India"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 md:grid-cols-3",
					children: [
						["Ananya Roy, Kolkata", "Ordered via WhatsApp late at night, and received the books within 48 hours in beautiful eco-friendly packaging with a personalized bookmark."],
						["Dr. Rohit Menon, Bangalore", "The book quality is genuine and pristine. You can tell the curators are actual bibliophiles who care deeply about literature."],
						["Sara Khan, Delhi", "Fair pricing, instantaneous WhatsApp responses, and great recommendations. Success Book Hub is now my go-to online bookshop."]
					].map(([name, quote]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1",
							children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-gold text-gold" }, i))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: [
								"“",
								quote,
								"”"
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
							className: "mt-6 text-xs font-bold text-foreground border-t border-border pt-3",
							children: name
						})]
					}, name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "paper-texture border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-4xl text-primary font-bold",
							children: "Visit Our Kolkata Shop"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mx-auto mt-3 max-w-md text-sm text-muted-foreground leading-relaxed",
							children: [
								STORE.address,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: STORE.hours
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 flex justify-center gap-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "lg",
								className: "rounded-full px-7 font-semibold",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/contact",
									children: "Directions & Hours"
								})
							})
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Index as component };
