import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as STORE, t as Button } from "./button-BkHncxc_.mjs";
import { n as useCart } from "./cart-B2Miq2pf.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as HeartHandshake, Q as BookOpen, a as Truck, u as Sparkles } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-C-ZocKsX.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	const { catalog } = useCart();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "paper-texture border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-wider text-primary",
							children: "Our Legacy & Mission"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 max-w-2xl font-display text-4xl leading-tight text-primary font-bold sm:text-5xl",
							children: "A sanctuary for readers, learners, and dreamers."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-5 max-w-2xl text-base leading-7 text-muted-foreground",
							children: [STORE.name, " began with a simple belief: that the right book at the right moment can alter the trajectory of a person's life. Located in the historic book district of College Street, Kolkata, we connect curious readers across every corner of India with timeless literature, academic excellence, and self-mastery titles."]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						[
							BookOpen,
							"Curated, Not Crowded",
							"Every title in our catalogue is vetted for intellectual substance and lasting joy."
						],
						[
							HeartHandshake,
							"Human Connection",
							"Personalized book recommendations via WhatsApp — our bibliophiles reply directly."
						],
						[
							Truck,
							"Pan-India Reach",
							"Free express delivery on all orders above ₹799 with real-time tracking."
						],
						[
							Sparkles,
							"Pristine Collector Care",
							"Carefully inspected, pristine editions wrapped with genuine bookmark keepsakes."
						]
					].map(([Icon, title, text]) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-6 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 font-display text-lg font-bold text-foreground",
									children: title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs leading-relaxed text-muted-foreground",
									children: text
								})
							]
						}, title);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-primary text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid max-w-7xl gap-8 px-4 py-14 text-center sm:grid-cols-3 sm:px-6 lg:px-8",
					children: [
						["12+", "Years of Bookselling"],
						["2,500+", "Satisfied Readers"],
						[`${catalog.length}`, "Curated Books on Shelves"]
					].map(([stat, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-5xl font-bold",
						children: stat
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs font-bold uppercase tracking-wider opacity-75",
						children: label
					})] }, label))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-bold text-foreground",
						children: "Explore Our Shelves"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mx-auto mt-3 max-w-md text-sm text-muted-foreground leading-relaxed",
						children: [
							STORE.address,
							" · ",
							STORE.hours
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						className: "mt-6 rounded-full px-8 font-semibold shadow-sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							children: "Shop the Collection"
						})
					})
				]
			})
		]
	});
}
//#endregion
export { About as component };
