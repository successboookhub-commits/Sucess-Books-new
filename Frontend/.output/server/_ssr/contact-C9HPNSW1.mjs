import { r as __toESM } from "../_runtime.mjs";
import { n as WHATSAPP_NUMBER, t as STORE } from "./books-B4F80K0Q.mjs";
import { t as api } from "./api-BkY1Bdf5.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Button } from "./button-CKfowhiz.mjs";
import { G as Mail, H as MessageCircle, M as Phone, S as Send, W as MapPin, bt as CircleCheck, c as Truck, g as Sparkles, gt as Clock, y as ShieldCheck, z as Package } from "../_libs/lucide-react.mjs";
import { t as OrderTrackerModal } from "./order-tracker-modal-D0cJcFNv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-C9HPNSW1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Contact() {
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [sent, setSent] = (0, import_react.useState)(false);
	const [trackerOpen, setTrackerOpen] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const cleanName = name.trim();
		const cleanEmail = email.trim();
		const cleanPhone = phone.trim();
		const cleanMessage = message.trim();
		if (!cleanName || cleanName.length < 2) {
			toast.error("Please enter a valid name (at least 2 characters).");
			return;
		}
		if (!cleanEmail && !cleanPhone) {
			toast.error("Please provide either your phone number or email address so we can reply.");
			return;
		}
		if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
			toast.error("Please enter a valid email address.");
			return;
		}
		if (cleanPhone && !/^\+?[0-9\s-]{8,15}$/.test(cleanPhone)) {
			toast.error("Please enter a valid phone number (at least 8-10 digits).");
			return;
		}
		if (!cleanMessage || cleanMessage.length < 5) {
			toast.error("Please enter your message (at least 5 characters).");
			return;
		}
		setSubmitting(true);
		try {
			await api.sendContactMessage({
				name: cleanName,
				email: cleanEmail,
				phone: cleanPhone,
				message: cleanMessage
			});
			setSent(true);
			toast.success("Thank you! Your message has been saved. We will contact you soon.");
			setName("");
			setEmail("");
			setPhone("");
			setMessage("");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to send message");
		} finally {
			setSubmitting(false);
		}
	};
	const sendWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Success Book Hub! My name is ${name || "a reader"}.\n\n${message || "I have a question about books / my order."}`)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "paper-texture border-b border-border bg-gradient-to-b from-amber-50/20 via-background to-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "site-container py-3 sm:py-4.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 fill-amber-500 text-amber-500" }), "Get in Touch"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground font-bold tracking-tight",
							children: "Contact Success Book Hub"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 max-w-4xl text-xs sm:text-sm leading-relaxed text-muted-foreground",
							children: "Looking for a specific title, bulk book orders, custom recommendations, or order inquiries? Reach out to our College Street booksellers — we reply promptly."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3.5 bg-amber-500/10 border border-amber-300/50 dark:border-amber-700/50 rounded-xl p-3 sm:p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-4xl shadow-2xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-2 rounded-xl bg-amber-500/20 text-amber-800 dark:text-amber-300 shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4.5 w-4.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-xs text-foreground",
									children: "Have an Existing Order to Enquire?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Check real-time dispatch progress, delivery address, or invoice with your unique Order ID."
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => setTrackerOpen(true),
								className: "rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold gap-1.5 h-8.5 px-4 cursor-pointer shrink-0 shadow-xs btn-shimmer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-3.5 w-3.5" }), " Track / Enquire Order"]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "site-container grid gap-3.5 sm:gap-4.5 py-3 sm:py-4.5 lg:grid-cols-[1fr_1.15fr] items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [[
						[
							MapPin,
							"Visit Our Bookstore",
							STORE.address,
							"College Street, Kolkata"
						],
						[
							Phone,
							"Phone & Support",
							STORE.phone,
							"Available 10 AM – 8:30 PM"
						],
						[
							Mail,
							"Official Email",
							STORE.email,
							"For general queries & bulk inquiries"
						],
						[
							Clock,
							"Opening Hours",
							STORE.hours,
							"Open Monday through Saturday"
						]
					].map(([Icon, title, text, sub]) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3 rounded-2xl border border-border/80 bg-card p-3 sm:p-3.5 shadow-xs hover:border-amber-300 hover:shadow-md transition-all",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-400/15 text-amber-700 dark:text-amber-400 font-bold border border-amber-300/40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4.5 w-4.5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-sm sm:text-base text-foreground font-bold leading-tight",
										children: title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-xs text-foreground font-semibold leading-relaxed",
										children: text
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground mt-0.5 font-normal",
										children: sub
									})
								]
							})]
						}, title);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-2xl border border-border/80 shadow-xs bg-muted/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
							title: "Map to Success Book Hub",
							src: "https://www.google.com/maps?q=College+Street,+Kolkata&output=embed",
							className: "h-40 w-full border-0",
							loading: "lazy"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-left space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 fill-amber-500 text-amber-500" }), "Direct Inquiry"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl sm:text-2xl text-foreground font-bold",
								children: "Send an Inquiry or Message"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground leading-relaxed",
								children: "Fill in your details below and our team will get back to you promptly."
							})
						]
					}), sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 text-center p-6 sm:p-8 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-12 w-12 text-emerald-600 mx-auto" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-bold text-foreground",
								children: "Message Dispatched!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground max-w-sm mx-auto",
								children: "We have safely received your note. A member of our bookstore team will reply shortly."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "rounded-full mt-2 font-bold cursor-pointer",
								onClick: () => setSent(false),
								children: "Send Another Message"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "mt-3.5 space-y-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-bold text-foreground mb-1",
								children: "Your Full Name *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: name,
								onChange: (e) => setName(e.target.value),
								className: "h-9.5 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 text-foreground shadow-2xs",
								placeholder: "e.g. Priya Sharma"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid sm:grid-cols-2 gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-foreground mb-1",
									children: "Phone Number"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "tel",
									value: phone,
									onChange: (e) => setPhone(e.target.value),
									className: "h-9.5 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 text-foreground shadow-2xs",
									placeholder: "e.g. 9876543210"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-foreground mb-1",
									children: "Email Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "h-9.5 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 text-foreground shadow-2xs",
									placeholder: "priya@example.com"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-bold text-foreground mb-1",
								children: "Your Message or Title Request *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								required: true,
								value: message,
								onChange: (e) => setMessage(e.target.value),
								rows: 3,
								className: "w-full rounded-xl border border-border bg-background p-2.5 text-xs outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 text-foreground shadow-2xs",
								placeholder: "Tell us about the book you are looking for, order assistance, or wholesale inquiries…"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 flex flex-col sm:flex-row gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									disabled: submitting,
									className: "h-11 rounded-full flex-1 gap-2 text-xs font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 shadow-md hover:shadow-lg transition-all active:scale-95 justify-center cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }), submitting ? "Sending..." : "Submit Inquiry Online"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									className: "h-11 rounded-full flex-1 border-[#25D366]/40 hover:bg-[#25D366]/10 text-emerald-700 dark:text-emerald-400 transition gap-2 text-xs font-bold justify-center cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: sendWhatsAppUrl,
										target: "_blank",
										rel: "noreferrer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4 text-[#25D366] fill-[#25D366]" }), " Chat on WhatsApp"]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-amber-600" }), "Fast 1-hour reply during shop hours"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hours: 10:00 AM – 8:30 PM" })]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderTrackerModal, {
				open: trackerOpen,
				onOpenChange: setTrackerOpen
			})
		]
	});
}
//#endregion
export { Contact as component };
