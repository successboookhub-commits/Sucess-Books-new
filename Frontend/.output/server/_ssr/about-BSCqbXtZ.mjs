import { n as WHATSAPP_NUMBER, t as STORE } from "./books-B4F80K0Q.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useCart } from "./cart-DUtiTmqH.mjs";
import { t as Button } from "./button-CKfowhiz.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as MessageCircle, Mt as Award, Pt as ArrowRight, W as MapPin, h as Sparkles, kt as BookOpen, mt as Compass, r as Users, rt as HeartHandshake, s as Truck, v as ShieldCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-BSCqbXtZ.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	const { catalog } = useCart();
	const whatsappDirect = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Success Book Hub! I am visiting your website and would like book recommendations.")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "paper-texture border-b border-border bg-gradient-to-b from-amber-50/20 via-background to-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 py-5 sm:py-7 sm:px-6 lg:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 fill-amber-500 text-amber-500" }), "Our Legacy & Story"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1.5 font-display text-2xl sm:text-3xl lg:text-4xl leading-tight text-foreground font-bold tracking-tight",
							children: "A sanctuary for readers, learners, and dreamers."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 max-w-4xl text-xs sm:text-sm leading-relaxed text-muted-foreground",
							children: [
								"Rooted in Kolkata's historic College Street, ",
								STORE.name,
								" curates timeless literature and delivers genuine publisher editions directly to readers across India."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap items-center gap-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 border border-amber-300/60 font-semibold shadow-2xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 text-amber-600" }), " College Street Heritage"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold shadow-2xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-3.5 w-3.5 text-emerald-600" }), " Pan-India Express Delivery"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-foreground border border-border font-semibold shadow-2xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-amber-600" }), " 100% Genuine Publisher Copies"]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-4 py-5 sm:py-7 sm:px-6 lg:px-8 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "h-3.5 w-3.5 fill-amber-500 text-amber-500" }), "Why Readers Trust Us"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-xl sm:text-2xl font-bold text-foreground",
					children: "Our Guiding Commitments"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						[
							BookOpen,
							"Curated, Not Crowded",
							"Every title in our catalogue is vetted for intellectual substance, clear thought, and lasting literary value.",
							"Top Quality"
						],
						[
							HeartHandshake,
							"Human Connection",
							"Personalized book recommendations via WhatsApp — our passionate booksellers reply directly.",
							"1-on-1 Guidance"
						],
						[
							Truck,
							"Pan-India Reach",
							"Free express delivery on orders above ₹499 with real-time updates from packaging to your doorstep.",
							"Fast Shipping"
						],
						[
							Sparkles,
							"Pristine Collector Care",
							"Carefully inspected, pristine editions wrapped with genuine bookmark keepsakes for bibliophiles.",
							"Safe Packaging"
						]
					].map(([Icon, title, text, badge]) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "group relative rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-9 w-9 place-items-center rounded-xl bg-amber-400/15 text-amber-700 dark:text-amber-400 font-bold border border-amber-300/40 group-hover:scale-105 transition",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4.5 w-4.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border",
										children: badge
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-3 font-display text-base font-bold text-foreground",
									children: title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-xs leading-relaxed text-muted-foreground font-normal",
									children: text
								})
							] })
						}, title);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-7xl px-4 py-3 sm:py-5 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl sm:rounded-3xl border border-amber-300/70 dark:border-amber-700/50 bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-card p-5 sm:p-7 shadow-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:gap-4 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-amber-300/40 dark:divide-amber-800/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-3 sm:pt-0 sm:px-4 text-left sm:text-center space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "EXPERIENCE" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-sans text-3xl sm:text-4xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight",
										children: "12+"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold uppercase tracking-wider text-foreground",
										children: "Years of Bookselling"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground font-normal",
										children: "Serving avid readers from College Street since inception"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-3 sm:pt-0 sm:px-4 text-left sm:text-center space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "COMMUNITY" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-sans text-3xl sm:text-4xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight",
										children: "2,500+"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold uppercase tracking-wider text-foreground",
										children: "Satisfied Readers"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground font-normal",
										children: "Across 28 Indian States & Union Territories"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-3 sm:pt-0 sm:px-4 text-left sm:text-center space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SHELVES" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-sans text-3xl sm:text-4xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight",
										children: catalog.length || 19
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold uppercase tracking-wider text-foreground",
										children: "Curated Books on Shelves"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground font-normal",
										children: "Carefully handpicked across fiction, non-fiction & classics"
									})
								]
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-7xl px-4 py-5 sm:py-7 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border/80 bg-secondary/30 p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl text-left space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 fill-amber-500 text-amber-500" }), "Visit In Person Or Order Online"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl sm:text-2xl lg:text-3xl font-bold text-foreground",
								children: "Explore Our Shelves & Find Your Next Read"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs sm:text-sm text-muted-foreground leading-relaxed",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: STORE.address
									}),
									" • Timings: ",
									STORE.hours,
									". Free shipping on orders over ₹499 across India."
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2.5 shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "default",
								className: "rounded-full px-6 font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 shadow-md hover:shadow-lg transition-all active:scale-95 text-xs cursor-pointer",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/shop",
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Shop the Collection" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "default",
								className: "rounded-full px-5 font-bold border-[#25D366]/40 hover:bg-[#25D366]/10 text-emerald-700 dark:text-emerald-400 text-xs cursor-pointer",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: whatsappDirect,
									target: "_blank",
									rel: "noreferrer",
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-3.5 w-3.5 text-[#25D366] fill-[#25D366]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ask on WhatsApp" })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "default",
								className: "rounded-full px-4 text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/contact",
									children: "Contact Info"
								})
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { About as component };
