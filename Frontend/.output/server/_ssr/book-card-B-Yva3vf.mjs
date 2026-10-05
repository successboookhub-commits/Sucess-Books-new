import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as api, r as WHATSAPP_NUMBER, s as cn, t as Button } from "./button-C7NRY3j5.mjs";
import { n as useCart } from "./cart-nKLOt66s.mjs";
import { A as MessageCircle, W as Eye, _ as Send, a as Truck, b as Plus, f as ShoppingBag, l as Star, m as ShieldCheck, z as Layers } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-CaRcPlue.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/book-card-B-Yva3vf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BookDetailModal({ book, open, onOpenChange }) {
	const { changeQuantity, cart } = useCart();
	const [details, setDetails] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [activeImageIndex, setActiveImageIndex] = (0, import_react.useState)(0);
	const [showReviewForm, setShowReviewForm] = (0, import_react.useState)(false);
	const [reviewerName, setReviewerName] = (0, import_react.useState)("");
	const [reviewerRating, setReviewerRating] = (0, import_react.useState)(5);
	const [reviewerComment, setReviewerComment] = (0, import_react.useState)("");
	const [submittingReview, setSubmittingReview] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!book || !open) return;
		setLoading(true);
		setShowReviewForm(false);
		setActiveImageIndex(0);
		api.getBook(book.id).then((data) => {
			if (data) setDetails(data);
			else setDetails(book);
		}).catch(() => setDetails(book)).finally(() => setLoading(false));
	}, [book, open]);
	if (!book) return null;
	const currentItem = details || book;
	const inCartQty = cart[book.id] || 0;
	const mrp = currentItem.oldPrice || currentItem.old_price;
	const sellingPrice = currentItem.price;
	const savings = mrp && mrp > sellingPrice ? mrp - sellingPrice : 0;
	const discountPercent = currentItem.discountPercent || currentItem.discount_percent || (mrp && mrp > sellingPrice ? Math.round((mrp - sellingPrice) / mrp * 100) : 0);
	const subCategoryName = currentItem.subCategory || currentItem.sub_category;
	const image1 = currentItem.cover;
	const image2 = currentItem.image2 || currentItem.image_2;
	const isImage1 = image1 && (image1.startsWith("http") || image1.startsWith("/"));
	const isImage2 = image2 && (image2.startsWith("http") || image2.startsWith("/"));
	const activeImageUrl = activeImageIndex === 1 && isImage2 ? image2 : image1;
	const isActiveImgUrl = activeImageUrl && (activeImageUrl.startsWith("http") || activeImageUrl.startsWith("/"));
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
	const whatsappDirectOrder = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Success Book Hub! I want to order:\n\n• ${book.title} by ${book.author} — ₹${book.price}\n\nPlease confirm delivery time and UPI payment details.`)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[92vh] overflow-y-auto sm:max-w-2xl p-0 border-border bg-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				className: "p-5 sm:p-6 pb-0 border-b border-border/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "font-display text-xl sm:text-2xl text-primary flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Book Overview" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-secondary text-primary border border-primary/20",
							children: book.category
						}), subCategoryName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-sans font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary",
							children: subCategoryName
						})]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 sm:p-6 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid sm:grid-cols-[200px_minmax(0,1fr)] gap-6 items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-border shadow-md bg-secondary/30",
							children: [
								discountPercent > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "absolute top-2.5 left-2.5 z-10 rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-md",
									children: [discountPercent, "% OFF"]
								}),
								book.label && !book.label.includes("%") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-2.5 right-2.5 z-10 rounded-md bg-background/95 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold uppercase text-primary shadow-xs border border-border",
									children: book.label
								}),
								isActiveImgUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: activeImageUrl,
									alt: book.title,
									className: "w-full h-full object-cover transition duration-300"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("flex h-full flex-col justify-between p-4 text-primary-foreground border-l-8 border-background/30", book.cover || "bg-primary"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border border-primary-foreground/20 p-2 h-full flex flex-col justify-between rounded-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[8px] uppercase tracking-widest opacity-70",
											children: "Success Book Hub"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 font-display text-base leading-tight font-bold",
											children: book.title
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] opacity-80",
											children: book.author
										})]
									})
								})
							]
						}), isImage2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setActiveImageIndex(0),
								className: cn("h-12 w-12 rounded-lg border-2 overflow-hidden transition p-0.5", activeImageIndex === 0 ? "border-primary ring-2 ring-primary/20" : "border-border opacity-70 hover:opacity-100"),
								children: isImage1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: image1,
									alt: "Cover 1",
									className: "w-full h-full object-cover rounded-md"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full h-full bg-primary flex items-center justify-center text-[9px] text-white font-bold",
									children: "1"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setActiveImageIndex(1),
								className: cn("h-12 w-12 rounded-lg border-2 overflow-hidden transition p-0.5", activeImageIndex === 1 ? "border-primary ring-2 ring-primary/20" : "border-border opacity-70 hover:opacity-100"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: image2,
									alt: "Cover 2",
									className: "w-full h-full object-cover rounded-md"
								})
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl sm:text-3xl font-bold text-foreground leading-tight",
								children: book.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-medium text-muted-foreground mt-1",
								children: ["by ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-foreground font-semibold",
									children: book.author
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 text-sm flex-wrap",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 font-bold text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-amber-400 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: currentItem.rating || 4.5 })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground/50",
										children: "•"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted-foreground",
										children: [currentItem.reviewsCount || currentItem.reviews?.length || 0, " reader reviews"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground/50",
										children: "•"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200",
										children: [
											"In Stock (",
											currentItem.stock ?? 30,
											" copies)"
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3.5 rounded-xl bg-secondary/40 border border-border/80 space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-display text-3xl font-extrabold text-primary",
											children: ["₹", sellingPrice]
										}),
										mrp && mrp > sellingPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-base text-muted-foreground line-through",
											children: ["₹", mrp]
										}),
										discountPercent > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md",
											children: [discountPercent, "% OFF"]
										})
									]
								}), savings > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-bold text-emerald-600",
									children: [
										"You save ₹",
										savings,
										" (",
										discountPercent,
										"% discount off MRP)"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-xs font-bold text-foreground uppercase tracking-wider",
									children: "Book Description"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs leading-relaxed text-muted-foreground",
									children: currentItem.description || "A thoughtfully selected edition published with premium binding and clear typography. Ideal for literature enthusiasts, students, and avid readers across India."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 flex flex-wrap gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "rounded-full flex-1 gap-2 h-11 bg-primary text-primary-foreground font-semibold shadow-md hover:bg-primary/90",
									onClick: () => {
										changeQuantity(book.id, 1, book);
										toast.success(`"${book.title}" added to your bag!`);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }), inCartQty > 0 ? `In Bag (${inCartQty}) + Add More` : "Add to Bag"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									className: "rounded-full flex-1 gap-2 h-11 bg-whatsapp/10 border-whatsapp/30 text-whatsapp hover:bg-whatsapp hover:text-white transition font-semibold",
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
								className: "pt-1 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-3.5 w-3.5 text-primary" }), " Free delivery over ₹799"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-primary" }), " 100% Genuine Edition"]
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
							className: "bg-secondary/50 rounded-xl p-4 space-y-3 border border-border",
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
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("h-5 w-5", star <= reviewerRating ? "fill-amber-400 text-amber-400" : "text-border") })
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
										children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("h-3 w-3", i < rev.rating ? "fill-amber-400 text-amber-400" : "text-border") }, i))
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
	const [hovered, setHovered] = (0, import_react.useState)(false);
	const handleAdd = (e) => {
		e.stopPropagation();
		changeQuantity(book.id, 1, book);
		toast.success(`Added "${book.title}" to bag!`);
	};
	const isImageCover = book.cover && (book.cover.startsWith("http") || book.cover.startsWith("/"));
	const hasSecondImage = book.image2 && (book.image2.startsWith("http") || book.image2.startsWith("/"));
	const mrp = book.oldPrice || book.old_price;
	const sellingPrice = book.price;
	const discountPercent = book.discountPercent || book.discount_percent || (mrp && mrp > sellingPrice ? Math.round((mrp - sellingPrice) / mrp * 100) : 0);
	const subCategoryName = book.subCategory || book.sub_category;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		onClick: () => setModalOpen(true),
		onMouseEnter: () => setHovered(true),
		onMouseLeave: () => setHovered(false),
		className: "group min-w-0 cursor-pointer text-left focus-visible:outline-none flex flex-col justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-border/70 bg-secondary/30 shadow-xs transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl select-none",
			children: [
				discountPercent > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute left-2.5 top-2.5 z-10 rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-md",
					children: [discountPercent, "% OFF"]
				}),
				book.label && !book.label.includes("%") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute right-2.5 top-2.5 z-10 rounded-md bg-background/95 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary shadow-xs border border-border",
					children: book.label
				}),
				hasSecondImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute bottom-2.5 right-2.5 z-10 rounded-full bg-background/90 backdrop-blur-xs p-1 text-muted-foreground shadow-xs group-hover:text-primary transition",
					title: "2 Views Available",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3 w-3" })
				}),
				isImageCover ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative h-full w-full overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hovered && hasSecondImage ? book.image2 || book.image_2 : book.cover,
						alt: book.title,
						loading: "lazy",
						className: "h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("flex h-full flex-col justify-between p-4 text-primary-foreground border-l-8 border-background/30", book.cover || "bg-primary"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-primary-foreground/25 p-3 h-full flex flex-col justify-between rounded-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[8px] font-bold uppercase tracking-wider opacity-60",
							children: "Success Book Hub"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-display text-lg leading-tight font-bold",
							children: book.title
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] opacity-80",
							children: book.author
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "bg-background text-foreground text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5 text-primary" }), " Quick View"]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pt-3 flex flex-col flex-1 justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-bold uppercase tracking-wider text-primary truncate max-w-[120px]",
						children: book.category
					}), subCategoryName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground/40 text-[9px]",
						children: "•"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-medium text-muted-foreground truncate max-w-[130px]",
						children: subCategoryName
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-sm sm:text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors",
					children: book.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground truncate",
					children: book.author
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex items-center gap-1.5 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-amber-400 text-amber-400" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-foreground text-xs",
							children: book.rating || 4.5
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
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2.5 pt-2 border-t border-border/50 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-bold text-base text-primary font-display",
							children: ["₹", sellingPrice]
						}), mrp && mrp > sellingPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground line-through",
							children: ["₹", mrp]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon",
					className: "shrink-0 rounded-full h-8 w-8 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
					onClick: handleAdd,
					"aria-label": `Add ${book.title} to bag`,
					title: "Add to bag",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
				})]
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookDetailModal, {
		book,
		open: modalOpen,
		onOpenChange: setModalOpen
	})] });
}
//#endregion
export { BookCard as t };
