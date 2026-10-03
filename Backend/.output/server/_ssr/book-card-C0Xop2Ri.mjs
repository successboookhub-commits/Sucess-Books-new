import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as api, r as WHATSAPP_NUMBER, s as cn, t as Button } from "./button-Ba_olYRt.mjs";
import { n as useCart } from "./cart-DVx6BGd4.mjs";
import { B as Eye, O as MessageCircle, a as Truck, f as ShoppingBag, g as Send, l as Star, m as ShieldCheck, y as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-VU1K-_Vz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/book-card-C0Xop2Ri.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BookDetailModal({ book, open, onOpenChange }) {
	const { changeQuantity, cart } = useCart();
	const [details, setDetails] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [showReviewForm, setShowReviewForm] = (0, import_react.useState)(false);
	const [reviewerName, setReviewerName] = (0, import_react.useState)("");
	const [reviewerRating, setReviewerRating] = (0, import_react.useState)(5);
	const [reviewerComment, setReviewerComment] = (0, import_react.useState)("");
	const [submittingReview, setSubmittingReview] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!book || !open) return;
		setLoading(true);
		setShowReviewForm(false);
		api.getBook(book.id).then((data) => {
			if (data) setDetails(data);
			else setDetails(book);
		}).catch(() => setDetails(book)).finally(() => setLoading(false));
	}, [book, open]);
	if (!book) return null;
	const currentItem = details || book;
	const inCartQty = cart[book.id] || 0;
	const discount = currentItem.oldPrice ? Math.round((currentItem.oldPrice - currentItem.price) / currentItem.oldPrice * 100) : 0;
	const handleReviewSubmit = async (e) => {
		e.preventDefault();
		if (!reviewerName.trim() || !reviewerComment.trim()) {
			toast.error("Please provide both your name and review message.");
			return;
		}
		setSubmittingReview(true);
		try {
			const res = await api.addReview(book.id, {
				userName: reviewerName,
				rating: reviewerRating,
				comment: reviewerComment
			});
			toast.success("Review submitted! Thank you for sharing your thoughts.");
			setReviewerName("");
			setReviewerComment("");
			setShowReviewForm(false);
			if (res.data?.reviews) setDetails((prev) => prev ? {
				...prev,
				rating: res.data.newRating,
				reviewsCount: res.data.reviewsCount,
				reviews: res.data.reviews
			} : null);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Failed to submit review";
			toast.error(msg);
		} finally {
			setSubmittingReview(false);
		}
	};
	const whatsappDirectOrder = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Success Book Hub! I want to order:\n\n• ${book.title} by ${book.author} — ₹${book.price}\n\nPlease let me know delivery time and UPI details.`)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] overflow-y-auto sm:max-w-2xl p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				className: "p-6 pb-0 border-b border-border/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "font-display text-2xl text-primary flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Book Overview" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-sans font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary text-primary",
						children: book.category
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid sm:grid-cols-[180px_minmax(0,1fr)] gap-6 items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("relative aspect-[3/4] w-full rounded-md p-4 text-primary-foreground shadow-md flex flex-col justify-between border-l-8 border-background/20", book.cover),
						children: [book.label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-2 right-2 bg-background/90 text-primary text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shadow-sm",
							children: book.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-primary-foreground/20 p-2 h-full flex flex-col justify-between rounded-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[8px] uppercase tracking-widest opacity-70",
								children: "Success Book Hub"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-lg leading-tight",
								children: book.title
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] opacity-80",
								children: book.author
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-bold text-foreground",
								children: book.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-medium text-muted-foreground mt-0.5",
								children: ["by ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: book.author
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 font-bold text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-gold text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: currentItem.rating })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "•"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted-foreground",
										children: [currentItem.reviewsCount || currentItem.reviews?.length || 0, " reader reviews"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "•"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full",
										children: [
											"In Stock (",
											currentItem.stock ?? 30,
											" copies)"
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline gap-3 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-3xl font-bold text-primary",
									children: ["₹", book.price]
								}), book.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm text-muted-foreground line-through",
									children: ["₹", book.oldPrice]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-bold text-emerald-600",
									children: [
										"(",
										discount,
										"% off)"
									]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs leading-relaxed text-muted-foreground pt-1",
								children: currentItem.description || "A curated literary work selected for its timeless prose and engaging storytelling. Available with doorstep delivery across India."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-3 flex flex-wrap gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "rounded-full flex-1 gap-2 h-11",
									onClick: () => {
										changeQuantity(book.id, 1, book);
										toast.success(`"${book.title}" added to your bag!`);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }), inCartQty > 0 ? `In Bag (${inCartQty}) + Add More` : "Add to Bag"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									className: "rounded-full flex-1 gap-2 h-11 bg-whatsapp/10 border-whatsapp/30 text-whatsapp hover:bg-whatsapp hover:text-white transition",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: whatsappDirectOrder,
										target: "_blank",
										rel: "noreferrer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), "Buy on WhatsApp"]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-3.5 w-3.5 text-primary" }), " Free delivery over ₹799"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-primary" }), " Verified Original Print"]
								})]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border pt-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-display text-lg text-foreground font-semibold",
								children: [
									"Customer Reviews (",
									details?.reviews?.length || 0,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								className: "text-xs text-primary hover:bg-secondary rounded-full",
								onClick: () => setShowReviewForm(!showReviewForm),
								children: showReviewForm ? "Cancel Review" : "Write a Review"
							})]
						}),
						showReviewForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleReviewSubmit,
							className: "bg-secondary/50 rounded-lg p-4 space-y-3 border border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-bold text-muted-foreground block mb-1",
										children: "Your Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										value: reviewerName,
										onChange: (e) => setReviewerName(e.target.value),
										placeholder: "e.g. Rahul Sen",
										className: "w-full text-xs h-9 rounded-md border border-border bg-card px-3 outline-none focus:border-primary"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-bold text-muted-foreground block mb-1",
										children: "Rating"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-1 pt-1",
										children: [
											1,
											2,
											3,
											4,
											5
										].map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setReviewerRating(star),
											className: "p-1 hover:scale-110 transition",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("h-5 w-5", star <= reviewerRating ? "fill-gold text-gold" : "text-border") })
										}, star))
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold text-muted-foreground block mb-1",
									children: "Your Thoughts"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									required: true,
									rows: 2,
									value: reviewerComment,
									onChange: (e) => setReviewerComment(e.target.value),
									placeholder: "Tell other readers what you loved about this book...",
									className: "w-full text-xs rounded-md border border-border bg-card p-2 outline-none focus:border-primary"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "submit",
										size: "sm",
										disabled: submittingReview,
										className: "rounded-full text-xs gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3 w-3" }), submittingReview ? "Submitting..." : "Post Review"]
									})
								})
							]
						}),
						loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground py-3 text-center",
							children: "Loading reviews..."
						}) : details?.reviews && details.reviews.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3 max-h-48 overflow-y-auto pr-2",
							children: details.reviews.map((rev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-card rounded-md border border-border/80 p-3 text-xs space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-foreground",
										children: rev.user_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-0.5",
										children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("h-3 w-3", i < rev.rating ? "fill-gold text-gold" : "text-border") }, i))
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground text-[11px] leading-relaxed",
									children: rev.comment
								})]
							}, rev.id))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground italic py-2",
							children: "No reviews yet. Be the first reader to write one!"
						})
					]
				})]
			})]
		})
	});
}
function BookCard({ book }) {
	const { changeQuantity } = useCart();
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const handleAdd = (e) => {
		e.stopPropagation();
		changeQuantity(book.id, 1, book);
		toast.success(`Added "${book.title}" to bag!`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		onClick: () => setModalOpen(true),
		className: "group min-w-0 cursor-pointer text-left focus-visible:outline-none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative aspect-[3/4] overflow-hidden rounded-sm border-l-8 border-background/20 p-4 text-primary-foreground shadow-sm transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl sm:p-6 select-none", book.cover),
			children: [
				book.label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute right-2 top-2 rounded-full bg-background px-2.5 py-1 text-[9px] font-bold uppercase text-primary sm:right-3 sm:top-3 shadow-sm",
					children: book.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-full flex-col justify-between border border-primary-foreground/25 p-3 rounded-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[8px] font-bold uppercase tracking-wider opacity-60 sm:text-[10px]",
						children: "Success Book Hub"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-display text-xl leading-tight sm:text-2xl",
						children: book.title
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[9px] opacity-75 sm:text-[10px]",
						children: book.author
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-primary/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "bg-background/90 text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }), " Quick View"]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pt-3.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-bold uppercase tracking-wider text-primary",
					children: book.category
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 truncate font-display text-base sm:text-lg text-foreground font-semibold group-hover:text-primary transition-colors",
					children: book.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-muted-foreground",
					children: book.author
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex items-center gap-1.5 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-gold text-gold" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground",
							children: book.rating
						}),
						book.reviewsCount ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px]",
							children: [
								"(",
								book.reviewsCount,
								")"
							]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2.5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-bold text-base text-primary",
							children: ["₹", book.price]
						}), book.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-2 text-xs text-muted-foreground line-through",
							children: ["₹", book.oldPrice]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						className: "shrink-0 rounded-full h-8 w-8",
						onClick: handleAdd,
						"aria-label": `Add ${book.title} to bag`,
						title: "Add to bag",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
					})]
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookDetailModal, {
		book,
		open: modalOpen,
		onOpenChange: setModalOpen
	})] });
}
//#endregion
export { BookCard as t };
