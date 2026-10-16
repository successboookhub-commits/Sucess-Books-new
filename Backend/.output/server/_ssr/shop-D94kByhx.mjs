import { r as __toESM } from "../_runtime.mjs";
import { n as WHATSAPP_NUMBER } from "./books-B4F80K0Q.mjs";
import { t as api } from "./api-BkY1Bdf5.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Button } from "./button-CKfowhiz.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { At as BookOpen, H as MessageCircle, S as Send, bt as CircleCheck, g as Sparkles, gt as Clock, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, t as Dialog } from "./dialog-C-FEQyPT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-D94kByhx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BookRequestModal({ open, onOpenChange, trigger, initialBookTitle = "" }) {
	const [title, setTitle] = (0, import_react.useState)(initialBookTitle);
	const [author, setAuthor] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	(0, import_react.useState)(() => {
		if (initialBookTitle) setTitle(initialBookTitle);
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title.trim()) {
			toast.error("Please enter the book title you are looking for.");
			return;
		}
		if (!name.trim() || !phone.trim()) {
			toast.error("Please enter your name and phone number so we can notify you.");
			return;
		}
		setSubmitting(true);
		try {
			await api.sendContactMessage({
				name: name.trim(),
				phone: phone.trim(),
				email: "concierge-request@successbookhub.com",
				message: `[SPECIAL BOOK PROCUREMENT REQUEST]\nTitle: ${title.trim()}\nAuthor: ${author.trim() || "Not specified"}\nCustomer: ${name.trim()} (${phone.trim()})\nNotes: ${notes.trim() || "None"}`
			});
			setSubmitted(true);
			toast.success("Book request received! Our bookseller will search shelves and reply promptly.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to submit request.");
		} finally {
			setSubmitting(false);
		}
	};
	const handleReset = () => {
		setTitle("");
		setAuthor("");
		setName("");
		setPhone("");
		setNotes("");
		setSubmitted(false);
	};
	const whatsappMessage = `*Special Book Request — Success Book Hub*

Hello Concierge! I am looking for a book not listed on your store:

📖 *Title:* ${title.trim() || "[Book Title]"}\n` + (author.trim() ? `✍️ *Author:* ${author.trim()}\n` : "") + (name.trim() ? `👤 *My Name:* ${name.trim()}\n` : "") + (phone.trim() ? `📞 *Phone:* ${phone.trim()}\n` : "") + (notes.trim() ? `📝 *Notes:* ${notes.trim()}\n` : "") + `\nCould you please check availability, quote the best price, and share delivery timeline?`;
	const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange,
		children: [trigger && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: trigger
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[92vh] overflow-y-auto sm:max-w-lg p-0 border border-amber-500/30 bg-card rounded-3xl shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				className: "p-5 pb-4 border-b border-border/80 bg-gradient-to-r from-[#21050b] via-[#3d0b17] to-[#1a0409] text-white rounded-t-3xl relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "font-serif text-lg sm:text-xl font-bold text-amber-100 flex items-center gap-1.5",
						children: ["Can't Find Your Book? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-amber-400" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-amber-200/80 mt-0.5 font-sans",
						children: "Our College Street Bookseller Concierge will source it within 24 hours."
					})] })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-5 sm:p-6 space-y-4 text-xs",
				children: submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-6 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-14 w-14 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center mx-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-8 w-8" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-xl font-bold text-foreground",
							children: "Request Dispatched to Our Booksellers!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed",
							children: [
								"Thank you, ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: name }),
								". We have queued your request for \"",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title }),
								"\". Our procurement team will verify distributor stocks and contact you on ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: phone }),
								" with pricing and delivery details."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-2 flex flex-col sm:flex-row gap-2 justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								className: "rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-1.5 h-10 px-5 text-xs shadow cursor-pointer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: whatsappUrl,
									target: "_blank",
									rel: "noreferrer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), " Also Ping on WhatsApp"]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: handleReset,
								className: "rounded-full h-10 px-5 text-xs font-semibold cursor-pointer",
								children: "Request Another Book"
							})]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-3.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-amber-500/10 border border-amber-300/40 dark:border-amber-700/40 rounded-xl p-3 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-amber-600 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Looking for rare literature, UPSC/academic textbooks, regional translations, or out-of-stock editions? Tell us and we will hunt down original publisher copies for you." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-bold text-foreground mb-1",
							children: "Book Title / Name *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "text",
							placeholder: "e.g. Sapiens, Wings of Fire, NCERT Chemistry Class 12",
							value: title,
							onChange: (e) => setTitle(e.target.value),
							className: "w-full h-10 px-3.5 rounded-xl border border-border bg-background text-xs font-medium focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-2xs"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-bold text-foreground mb-1",
							children: "Author / Publication / ISBN (Optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "e.g. Yuval Noah Harari, HarperCollins, 2024 Edition",
							value: author,
							onChange: (e) => setAuthor(e.target.value),
							className: "w-full h-10 px-3.5 rounded-xl border border-border bg-background text-xs font-medium focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-2xs"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-bold text-foreground mb-1",
								children: "Your Name *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "text",
								placeholder: "e.g. Rahul Reddy",
								value: name,
								onChange: (e) => setName(e.target.value),
								className: "w-full h-10 px-3.5 rounded-xl border border-border bg-background text-xs font-medium focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-2xs"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-bold text-foreground mb-1",
								children: "WhatsApp / Phone Number *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "tel",
								placeholder: "e.g. 9876543210",
								value: phone,
								onChange: (e) => setPhone(e.target.value),
								className: "w-full h-10 px-3.5 rounded-xl border border-border bg-background text-xs font-medium focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-2xs"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-bold text-foreground mb-1",
							children: "Special Notes / Urgency (Optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 2,
							placeholder: "e.g. Need urgently before next Monday for exam preparation...",
							value: notes,
							onChange: (e) => setNotes(e.target.value),
							className: "w-full p-2.5 rounded-xl border border-border bg-background text-xs font-medium focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-2xs"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-2 flex flex-col sm:flex-row gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								disabled: submitting,
								className: "flex-1 h-11 rounded-full font-bold text-xs bg-amber-600 hover:bg-amber-700 text-white shadow-md btn-shimmer cursor-pointer gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }), submitting ? "Submitting..." : "Submit Book Request"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								asChild: true,
								variant: "outline",
								className: "flex-1 h-11 rounded-full font-bold text-xs border-emerald-500/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/10 cursor-pointer gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: whatsappUrl,
									target: "_blank",
									rel: "noreferrer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4 text-emerald-600" }), "Request via WhatsApp"]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-1 flex items-center justify-between text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-amber-600" }), " 100% Genuine Publisher Sourcing"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Response in 1–2 hours" })]
						})
					]
				})
			})]
		})]
	});
}
var $$splitComponentImporter = () => import("./shop-DYdG16sS.mjs");
var Route = createFileRoute("/shop")({
	validateSearch: (search) => ({
		category: typeof search["category"] === "string" ? search["category"] : void 0,
		subCategory: typeof search["subCategory"] === "string" ? search["subCategory"] : void 0,
		q: typeof search["q"] === "string" ? search["q"] : void 0
	}),
	head: () => ({ meta: [
		{ title: "Shop All Books — Success Book Hub" },
		{
			name: "description",
			content: "Browse our complete catalogue of curated literature, bestsellers, academic essentials, and special editions. Order online or on WhatsApp."
		},
		{
			property: "og:title",
			content: "Shop All Books — Success Book Hub"
		},
		{
			property: "og:description",
			content: "The complete Success Book Hub catalogue, ready to order with instant booking & WhatsApp confirmation."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as n, BookRequestModal as t };
