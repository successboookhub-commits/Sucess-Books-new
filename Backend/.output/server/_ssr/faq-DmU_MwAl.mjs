import { r as __toESM } from "../_runtime.mjs";
import { n as WHATSAPP_NUMBER } from "./books-L-o23q6K.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-CKfowhiz.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Dt as ArrowRight, R as MessageCircle, dt as CircleQuestionMark, p as Sparkles, vt as ChevronDown } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-DmU_MwAl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var faqs = [
	{
		category: "Ordering & WhatsApp",
		q: "How do I order books from Success Book Hub?",
		a: "You can easily order online through our website with direct bag checkout, or tap 'Buy on WhatsApp' from any book card or modal to immediately confirm your order via chat with pre-filled book details."
	},
	{
		category: "Ordering & WhatsApp",
		q: "Can I place custom or bulk orders through WhatsApp?",
		a: "Yes! Simply message us on WhatsApp with the list of titles, ISBNs, or authors you are looking for. Our team will verify shelf stock and quote custom bulk discounts."
	},
	{
		category: "Shipping & Delivery",
		q: "What are your delivery fees and transit times?",
		a: "We offer FREE delivery on all orders over ₹499 across India. For orders below ₹499, a nominal flat delivery charge of ₹49 applies. Kolkata metro deliveries arrive in 1–2 days; pan-India orders typically take 3–5 business days."
	},
	{
		category: "Shipping & Delivery",
		q: "How can I track my shipment?",
		a: "Use our 'Track Order' modal in the navigation bar using your Order ID (e.g. SBH-1042). You will also receive dispatch and tracking details directly via SMS and WhatsApp."
	},
	{
		category: "Authenticity & Quality",
		q: "Are your books 100% original editions?",
		a: "Absolutely. Every book in our catalogue is sourced directly from authorized publishing houses and distributors. We never sell pirated, counterfeit, or substandard photocopies."
	},
	{
		category: "Payments & Invoicing",
		q: "What payment methods do you accept?",
		a: "We accept UPI (Google Pay, PhonePe, Paytm), Net Banking, Credit/Debit cards, Cash on Delivery (COD) for eligible pin codes, and direct WhatsApp Pay."
	},
	{
		category: "Payments & Invoicing",
		q: "Can I receive a GST Tax Invoice?",
		a: "Yes. Every order is eligible for a GST-compliant digital tax invoice that you can view and download instantly from your Order Success screen or your Account orders page."
	},
	{
		category: "Returns & Exchanges",
		q: "What is your return policy if a book arrives damaged?",
		a: "In the rare event that a book arrives misprinted or transit-damaged, notify us within 7 days with a quick photo on WhatsApp (+91 98765 43210). We provide a free replacement or 100% full refund immediately."
	}
];
var CATEGORIES = [
	"All Topics",
	"Ordering & WhatsApp",
	"Shipping & Delivery",
	"Authenticity & Quality",
	"Payments & Invoicing",
	"Returns & Exchanges"
];
function FAQPage() {
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("All Topics");
	const [openIndices, setOpenIndices] = (0, import_react.useState)(/* @__PURE__ */ new Set([0, 1]));
	const toggle = (idx) => {
		setOpenIndices((prev) => {
			const next = new Set(prev);
			if (next.has(idx)) next.delete(idx);
			else next.add(idx);
			return next;
		});
	};
	const filteredFaqs = activeCategory === "All Topics" ? faqs : faqs.filter((f) => f.category === activeCategory);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "paper-texture border-b border-border bg-gradient-to-b from-amber-50/20 via-card to-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 py-5 sm:py-6 sm:px-6 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-3.5 w-3.5 text-amber-500" }), " Reader Assistance & Help Center"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground",
						children: "Frequently Asked Questions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed",
						children: "Everything you need to know about our book selection, Pan-India shipping, payments, and WhatsApp ordering assistance."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex items-center gap-1.5 sm:gap-2 flex-wrap",
						children: CATEGORIES.map((cat) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setActiveCategory(cat),
								className: `px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer select-none ${activeCategory === cat ? "bg-primary text-slate-950 font-bold shadow-xs border border-primary ring-2 ring-primary/20 scale-102" : "bg-card text-muted-foreground hover:text-foreground border border-border/80 hover:border-amber-400/60"}`,
								children: cat
							}, cat);
						})
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-5 sm:py-7 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-start",
				children: filteredFaqs.map((faq, i) => {
					const isOpen = openIndices.has(i);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-2xl border transition-all duration-200 bg-card overflow-hidden ${isOpen ? "border-amber-400/90 ring-2 ring-amber-400/15 shadow-sm bg-gradient-to-b from-card via-card to-amber-50/20 dark:to-amber-950/10" : "border-border/80 hover:border-amber-400/60 hover:shadow-2xs"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => toggle(i),
							"aria-expanded": isOpen,
							className: "w-full text-left p-3.5 sm:p-4.5 flex items-start justify-between gap-3 text-foreground hover:text-amber-600 transition cursor-pointer select-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2.5 sm:gap-3 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `mt-1.5 h-2 w-2 rounded-full shrink-0 transition-colors ${isOpen ? "bg-amber-500 scale-125" : "bg-primary"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-0.5",
										children: faq.category
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-sans font-bold text-sm sm:text-base leading-snug text-foreground",
										children: faq.q
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `h-6.5 w-6.5 sm:h-7 sm:w-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 mt-0.5 ${isOpen ? "bg-amber-400 text-slate-950 border-amber-400 rotate-180 shadow-2xs font-bold" : "bg-secondary text-muted-foreground border-border hover:text-foreground"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
							})]
						}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-4 pb-4 sm:px-4.5 sm:pb-4.5 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 mt-1 pt-2.5 animate-in fade-in-50 duration-150",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: faq.a })
						})]
					}, faq.q);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7 sm:mt-8 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-400/40 p-5 sm:p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1 text-center md:text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[10px] font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5 justify-center md:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 fill-amber-400 text-amber-400" }), " Dedicated Reader Support"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg sm:text-xl font-bold text-amber-300",
							children: "Have a question not listed here?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-300 max-w-lg leading-relaxed",
							children: "Our team of book enthusiasts is available Mon–Sat (10:00 AM – 8:30 PM). Get instant book recommendations and order help."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row items-center gap-2.5 shrink-0 w-full md:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "rounded-full px-5 h-9.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold shadow-md w-full sm:w-auto gap-2 text-xs",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `https://wa.me/${WHATSAPP_NUMBER}`,
							target: "_blank",
							rel: "noreferrer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4 fill-current" }), "Chat on WhatsApp"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "rounded-full px-5 h-9.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold w-full sm:w-auto gap-1.5 text-xs transition",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							children: ["Contact & Visit ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
						})
					})]
				})]
			})]
		})]
	});
}
//#endregion
export { FAQPage as component };
