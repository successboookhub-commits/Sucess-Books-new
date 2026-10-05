import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as api, n as STORE, r as WHATSAPP_NUMBER, t as Button } from "./button-C7NRY3j5.mjs";
import { A as MessageCircle, M as MapPin, N as Mail, Y as CircleCheck, _ as Send, q as Clock, x as Phone } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-wSeNGARJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Contact() {
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [sent, setSent] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name.trim() || !message.trim()) {
			toast.error("Please enter your name and message.");
			return;
		}
		setSubmitting(true);
		try {
			await api.sendContactMessage({
				name,
				email,
				phone,
				message
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "paper-texture border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-wider text-primary",
						children: "Get in Touch"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl text-primary font-bold sm:text-5xl",
						children: "Contact Success Book Hub"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-sm leading-6 text-muted-foreground",
						children: "Questions regarding a book title, custom order, school/college wholesale, or recommendation? Reach out to us — our booksellers reply promptly."
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [[
					[
						MapPin,
						"Visit Our Bookstore",
						STORE.address
					],
					[
						Phone,
						"Customer Support",
						STORE.phone
					],
					[
						Mail,
						"Official Email",
						STORE.email
					],
					[
						Clock,
						"Opening Hours",
						STORE.hours
					]
				].map(([Icon, title, text]) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4 rounded-xl border border-border bg-card p-5 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg text-foreground font-semibold",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-6 text-muted-foreground",
							children: text
						})] })]
					}, title);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl border border-border shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						title: "Map to Success Book Hub",
						src: "https://www.google.com/maps?q=College+Street,+Kolkata&output=embed",
						className: "h-60 w-full",
						loading: "lazy"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "flex items-center gap-2 font-display text-2xl text-foreground font-bold",
						children: "Send an Inquiry or Message"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs text-muted-foreground",
						children: "Messages are directly saved in our system. You can also send directly via WhatsApp."
					}),
					sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 text-center p-8 rounded-xl bg-secondary/50 border border-border space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-12 w-12 text-emerald-600 mx-auto" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-bold text-foreground",
								children: "Message Dispatched!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "We have safely received your note and will get back to you shortly."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "rounded-full mt-2",
								onClick: () => setSent(false),
								children: "Send Another Message"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "mt-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-bold text-foreground mb-1",
								children: "Your Name *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: name,
								onChange: (e) => setName(e.target.value),
								className: "h-11 w-full rounded-md border border-border bg-background px-4 text-xs outline-none transition focus:border-primary",
								placeholder: "e.g. Priya Sharma"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid sm:grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-foreground mb-1",
									children: "Phone Number"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "tel",
									value: phone,
									onChange: (e) => setPhone(e.target.value),
									className: "h-11 w-full rounded-md border border-border bg-background px-4 text-xs outline-none transition focus:border-primary",
									placeholder: "e.g. 9876543210"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-foreground mb-1",
									children: "Email Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "h-11 w-full rounded-md border border-border bg-background px-4 text-xs outline-none transition focus:border-primary",
									placeholder: "priya@example.com"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-bold text-foreground mb-1",
								children: "Your Message *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								required: true,
								value: message,
								onChange: (e) => setMessage(e.target.value),
								rows: 4,
								className: "w-full rounded-md border border-border bg-background p-3 text-xs outline-none transition focus:border-primary",
								placeholder: "Tell us about the book you are looking for or your order question…"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 flex flex-col sm:flex-row gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									disabled: submitting,
									className: "h-12 rounded-full flex-1 gap-2 text-xs font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }), submitting ? "Sending..." : "Submit Inquiry Online"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									className: "h-12 rounded-full flex-1 border-whatsapp/40 text-whatsapp hover:bg-whatsapp hover:text-white transition gap-2 text-xs font-bold",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: sendWhatsAppUrl,
										target: "_blank",
										rel: "noreferrer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), " Chat on WhatsApp"]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-[11px] text-muted-foreground pt-1",
								children: "We usually reply within an hour during shop hours (10:00 AM – 8:30 PM)."
							})
						]
					})
				]
			})]
		})]
	});
}
//#endregion
export { Contact as component };
