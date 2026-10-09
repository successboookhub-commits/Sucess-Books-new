import { r as __toESM } from "../_runtime.mjs";
import { n as WHATSAPP_NUMBER } from "./books-B4F80K0Q.mjs";
import { t as api } from "./api-B0JqYe2J.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useCart } from "./cart-urURf13s.mjs";
import { n as cn, t as Button } from "./button-CKfowhiz.mjs";
import { A as Plus, H as MessageCircle, Q as Layers, Tt as Check, g as ShoppingBag, h as Sparkles, ht as Clock, kt as BookOpen, lt as Eye, m as Star, nt as Heart, s as Truck, v as ShieldCheck, x as Send } from "../_libs/lucide-react.mjs";
import { n as useWishlist } from "./wishlist-a-u1H06p.mjs";
import { a as DialogTitle, n as DialogContent, t as Dialog } from "./dialog-C-FEQyPT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/book-card-BgfjT1ZQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BookDetailModal({ book, open, onOpenChange, onSelectBook }) {
	const { changeQuantity, addToCart, setCartOpen, catalog, cart } = useCart();
	const { isWishlisted, toggleWishlist } = useWishlist();
	const [details, setDetails] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [activeImageIndex, setActiveImageIndex] = (0, import_react.useState)(0);
	const [selectedQty, setSelectedQty] = (0, import_react.useState)(1);
	const wishlisted = book ? isWishlisted(book.id) : false;
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
		setSelectedQty(1);
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
	const whatsappDirectOrder = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Success Book Hub! I want to order:\n\n• ${book.title} by ${book.author} — ₹${book.price}\n\nPlease confirm availability and payment details.`)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] flex flex-col w-[94vw] sm:w-full sm:max-w-2xl lg:max-w-3xl p-0 border border-border/80 bg-card rounded-3xl shadow-2xl overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shrink-0 px-5 sm:px-6 py-3.5 border-b border-border/60 bg-muted/40 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-7 w-7 place-items-center rounded-lg bg-amber-400/20 text-amber-700 dark:text-amber-400 font-bold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-xs font-bold uppercase tracking-wider text-muted-foreground m-0",
						children: "Book Details & Overview"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 pr-7 sm:pr-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300/60 shadow-2xs",
						children: book.category
					}), subCategoryName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary text-muted-foreground border border-border",
						children: subCategoryName
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 sm:p-6 space-y-6 overflow-y-auto flex-1 [scrollbar-width:thin] [scrollbar-color:hsl(var(--muted-foreground)/0.2)_transparent]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid sm:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] gap-5 sm:gap-6 items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-[3/4] w-full max-w-[190px] sm:max-w-none mx-auto rounded-2xl overflow-hidden border border-border/80 shadow-[0_12px_28px_rgba(0,0,0,0.15)] bg-secondary/40",
								children: [
									discountPercent > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "absolute top-2.5 left-2.5 z-20 rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-md",
										children: [discountPercent, "% OFF"]
									}),
									book.label && !book.label.includes("%") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute top-2.5 right-2.5 z-20 rounded-md bg-background/95 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold uppercase text-primary shadow-xs border border-border",
										children: book.label
									}),
									isActiveImgUrl && !activeImageUrl.startsWith("bg-") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: activeImageUrl,
										alt: book.title,
										onError: (e) => {
											e.target.src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800";
										},
										className: "w-full h-full object-cover transition duration-300"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: cn("relative flex h-full flex-col justify-between p-4 text-slate-900 border-l-[10px] border-amber-800/40 shadow-inner", book.cover || "bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border border-slate-950/20 p-3 h-full flex flex-col justify-between rounded-lg bg-white/10 backdrop-blur-[1px]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[8px] font-bold uppercase tracking-widest text-slate-900/70",
												children: "Success Book Hub • Authentic"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "mt-2.5 font-display text-base sm:text-lg leading-tight font-bold text-slate-950",
												children: book.title
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-0.5 w-8 bg-slate-950/30 mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] font-semibold text-slate-900/80",
												children: book.author
											})] })]
										})]
									})
								]
							}), isImage2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setActiveImageIndex(0),
									className: cn("h-12 w-12 rounded-lg border-2 overflow-hidden transition p-0.5 cursor-pointer", activeImageIndex === 0 ? "border-primary ring-2 ring-primary/20" : "border-border opacity-70 hover:opacity-100"),
									children: isImage1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: image1,
										alt: "Cover 1",
										onError: (e) => {
											e.currentTarget.src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop";
										},
										className: "w-full h-full object-cover rounded-md"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-full h-full bg-primary/20 flex items-center justify-center text-[10px] text-primary font-bold",
										children: "1"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setActiveImageIndex(1),
									className: cn("h-12 w-12 rounded-lg border-2 overflow-hidden transition p-0.5 cursor-pointer", activeImageIndex === 1 ? "border-primary ring-2 ring-primary/20" : "border-border opacity-70 hover:opacity-100"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: image2,
										alt: "Cover 2",
										onError: (e) => {
											e.currentTarget.src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop";
										},
										className: "w-full h-full object-cover rounded-md"
									})
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl sm:text-3xl font-bold text-foreground leading-tight tracking-tight",
									children: book.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs sm:text-sm text-muted-foreground font-medium mt-1",
									children: ["by ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground font-bold",
										children: book.author
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5 text-xs flex-wrap",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1 font-bold text-foreground bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-400/30",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-amber-400 text-amber-400" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: currentItem.rating || 4.5 }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[10px] text-muted-foreground font-normal",
													children: [
														"(",
														currentItem.reviewsCount || details?.reviews?.length || 0,
														")"
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800",
											children: "● In Stock • Ready to Dispatch"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold text-slate-700 dark:text-slate-300 bg-secondary px-2.5 py-1 rounded-full border border-border",
											children: "100% Original Edition"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-transparent border border-amber-300/60 dark:border-amber-700/40 shadow-xs space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline gap-3 flex-wrap",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-sans text-3xl sm:text-4xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight",
											children: ["₹", sellingPrice]
										}), mrp && mrp > sellingPrice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-sans text-base sm:text-lg text-slate-400 dark:text-slate-500 line-through font-medium",
											children: ["₹", mrp]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 px-2.5 py-0.5 rounded-full border border-amber-300 shadow-2xs",
											children: [
												"Save ₹",
												savings,
												" (",
												discountPercent,
												"% OFF)"
											]
										})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800",
											children: "Best Price Guaranteed"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-muted-foreground font-medium flex items-center gap-1.5 pt-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-emerald-600 shrink-0" }), "Inclusive of all taxes • Ships in 24–48 hours across India"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-[11px] font-bold text-foreground uppercase tracking-wider text-muted-foreground",
										children: "Book Synopsis"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs sm:text-sm leading-relaxed text-muted-foreground/90 font-normal",
										children: currentItem.description || "A thoughtfully selected edition published with premium binding and clear typography. Ideal for literature enthusiasts, students, and avid readers across India."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
												children: "Quantity:"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 bg-secondary/80 rounded-xl p-1 border border-border",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setSelectedQty(Math.max(1, selectedQty - 1)),
														className: "h-7 w-7 rounded-lg bg-card hover:bg-background transition flex items-center justify-center font-bold text-muted-foreground hover:text-foreground border border-border/50 cursor-pointer",
														"aria-label": "Decrease quantity",
														children: "-"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "w-8 text-center text-sm font-bold font-mono text-foreground",
														children: selectedQty
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setSelectedQty(selectedQty + 1),
														className: "h-7 w-7 rounded-lg bg-card hover:bg-background transition flex items-center justify-center font-bold text-muted-foreground hover:text-foreground border border-border/50 cursor-pointer",
														"aria-label": "Increase quantity",
														children: "+"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs text-muted-foreground font-mono",
												children: ["Total: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
													className: "text-foreground font-bold",
													children: ["₹", sellingPrice * selectedQty]
												})]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 sm:grid-cols-3 gap-2.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												className: "col-span-1 h-11 rounded-full gap-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-bold shadow-md hover:shadow-lg transition-all active:scale-95 text-xs cursor-pointer",
												onClick: () => {
													addToCart(book, selectedQty);
													toast.success(`Added ${selectedQty} × "${book.title}" to your bag!`);
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4 fill-slate-950" }), inCartQty > 0 ? `In Bag (${inCartQty}) +` : "Add to Bag"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												className: "col-span-1 h-11 rounded-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md hover:shadow-lg transition-all active:scale-95 text-xs cursor-pointer",
												onClick: () => {
													addToCart(book, selectedQty);
													onOpenChange(false);
													setCartOpen(true);
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), "Buy Now"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "col-span-2 sm:col-span-1 flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													variant: "outline",
													onClick: () => toggleWishlist(book),
													className: cn("flex-1 h-11 rounded-full border border-border/80 transition-all font-semibold shrink-0 gap-1.5 hover:border-red-300 cursor-pointer justify-center text-xs", wishlisted ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40" : "text-muted-foreground hover:text-red-500"),
													title: wishlisted ? "Remove from wishlist" : "Save to wishlist",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("h-4 w-4", wishlisted && "fill-current text-red-500") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: wishlisted ? "Saved" : "Save" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													className: "h-11 px-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold shadow-md transition cursor-pointer shrink-0",
													asChild: true,
													title: "Order on WhatsApp",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														href: whatsappDirectOrder,
														target: "_blank",
														rel: "noreferrer",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4 fill-current" })
													})
												})]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/50 pt-2.5 flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-3.5 w-3.5 text-amber-600 shrink-0" }), " Free delivery over ₹499"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-amber-600 shrink-0" }), " 100% Genuine Edition"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5 text-amber-600 shrink-0" }), " 24/7 WhatsApp Assistance"]
										})
									]
								})
							]
						})]
					}),
					(() => {
						const related = catalog.filter((b) => b.category === book.category && b.id !== book.id).slice(0, 4);
						if (related.length === 0) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border pt-4 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-display text-base font-bold text-foreground",
									children: ["More in ", book.category]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-muted-foreground",
									children: "Handpicked for you"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
								children: related.map((rel) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									onClick: () => {
										if (onSelectBook) onSelectBook(rel);
										else setDetails(rel);
									},
									className: "group p-2 rounded-xl border border-border bg-card hover:border-amber-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "aspect-[3/4] rounded-lg overflow-hidden bg-secondary mb-2 relative",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: rel.cover || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
											alt: rel.title,
											className: "h-full w-full object-cover group-hover:scale-105 transition duration-300"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-display text-xs font-bold text-foreground truncate group-hover:text-amber-600 transition",
											children: rel.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground truncate",
											children: rel.author
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between mt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs font-bold text-primary font-mono",
												children: ["₹", rel.price]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-semibold text-amber-600",
												children: "View →"
											})]
										})
									] })]
								}, rel.id))
							})]
						});
					})(),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border pt-4 space-y-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-display text-base sm:text-lg text-foreground font-bold",
									children: [
										"Customer Reviews (",
										details?.reviews?.length || 0,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Verified feedback from readers who bought this book."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "sm",
									className: "text-xs text-amber-700 dark:text-amber-400 font-bold hover:bg-amber-100/40 rounded-full cursor-pointer",
									onClick: () => setShowReviewForm(!showReviewForm),
									children: showReviewForm ? "Cancel Review" : "Write a Review"
								})]
							}),
							showReviewForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleReviewSubmit,
								className: "bg-secondary/40 rounded-2xl p-4 space-y-3 border border-border",
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
											className: "w-full text-xs h-9 rounded-xl border border-border bg-card px-3 outline-none focus:border-amber-400 shadow-2xs"
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
												className: "p-1 hover:scale-110 transition cursor-pointer",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("h-4.5 w-4.5", star <= reviewerRating ? "fill-amber-400 text-amber-400" : "text-border") })
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
										className: "w-full text-xs rounded-xl border border-border bg-card p-2.5 outline-none focus:border-amber-400 shadow-2xs"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "submit",
											size: "sm",
											disabled: submittingReview,
											className: "rounded-full text-xs gap-1.5 bg-primary text-slate-950 font-bold hover:bg-primary/90 cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3 w-3" }), submittingReview ? "Submitting..." : "Post Review"]
										})
									})
								]
							}),
							loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground py-3 text-center",
								children: "Loading reviews..."
							}) : details?.reviews && details.reviews.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2.5 max-h-48 overflow-y-auto pr-2",
								children: details.reviews.map((rev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-card rounded-xl border border-border/80 p-3 text-xs space-y-1 shadow-2xs",
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
					})
				]
			})]
		})
	});
}
function BookCard({ book, compact = false }) {
	const { changeQuantity } = useCart();
	const { isWishlisted, toggleWishlist } = useWishlist();
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const [hovered, setHovered] = (0, import_react.useState)(false);
	const wishlisted = isWishlisted(book.id);
	const handleAdd = (e) => {
		e.stopPropagation();
		changeQuantity(book.id, 1, book);
		toast.success(`Added "${book.title}" to bag!`);
	};
	const handleWishlistToggle = (e) => {
		e.stopPropagation();
		toggleWishlist(book);
	};
	book.cover && (book.cover.startsWith("http") || book.cover.startsWith("/"));
	const hasSecondImage = book.image2 && (book.image2.startsWith("http") || book.image2.startsWith("/"));
	const mrp = book.oldPrice || book.old_price;
	const sellingPrice = book.price;
	const discountPercent = book.discountPercent || book.discount_percent || (mrp && mrp > sellingPrice ? Math.round((mrp - sellingPrice) / mrp * 100) : 0);
	const subCategoryName = book.subCategory || book.sub_category;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		onClick: () => setModalOpen(true),
		onMouseEnter: () => setHovered(true),
		onMouseLeave: () => setHovered(false),
		className: cn("group min-w-0 cursor-pointer text-left focus-visible:outline-none flex flex-col justify-between book-card-hover rounded-2xl bg-card border border-border/80 shadow-xs hover:border-amber-400/80 transition-all", compact ? "p-2 sm:p-2.5 lg:p-2" : "p-2 sm:p-2.5"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative w-full overflow-hidden rounded-xl border border-border/80 bg-secondary/30 shadow-xs transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:border-amber-300/80 select-none", compact ? "aspect-[3/4] lg:aspect-[4/5]" : "aspect-[3/4]"),
			children: [
				discountPercent > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute left-2 top-2 z-10 rounded-md bg-gradient-to-r from-amber-400 to-yellow-400 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wide text-slate-950 shadow-xs border border-amber-300/60",
					children: [discountPercent, "% OFF"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: handleWishlistToggle,
					className: cn("absolute right-2 top-2 z-20 rounded-full p-1 sm:p-1.5 backdrop-blur-md transition shadow-xs", wishlisted ? "bg-red-500 text-white hover:bg-red-600" : "bg-background/90 text-muted-foreground hover:text-red-500 hover:bg-background border border-border/60"),
					title: wishlisted ? "Remove from wishlist" : "Add to wishlist",
					"aria-label": "Wishlist toggle",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("h-3 sm:h-3.5 w-3 sm:w-3.5 transition-transform active:scale-125", wishlisted && "fill-current") })
				}),
				book.label && !book.label.includes("%") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute right-2 bottom-2 z-10 rounded-md bg-background/95 backdrop-blur-xs px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300 shadow-2xs border border-border",
					children: book.label
				}),
				hasSecondImage && !book.label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute bottom-2 right-2 z-10 rounded-full bg-background/90 backdrop-blur-xs p-1 text-muted-foreground shadow-2xs group-hover:text-amber-600 transition",
					title: "2 Views Available",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3 w-3" })
				}),
				book.cover && !book.cover.startsWith("bg-") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative h-full w-full overflow-hidden bg-secondary/40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hovered && hasSecondImage ? book.image2 || book.image_2 || book.cover : book.cover,
						alt: book.title,
						loading: "lazy",
						onError: (e) => {
							e.target.src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800";
						},
						className: "h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("flex h-full flex-col justify-between p-3 sm:p-4 text-primary-foreground border-l-6 sm:border-l-8 border-amber-600", book.cover || "bg-primary"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-primary-foreground/25 p-2 sm:p-3 h-full flex flex-col justify-between rounded-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[7px] sm:text-[8px] font-bold uppercase tracking-wider opacity-60",
							children: "Success Book Hub"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("font-display leading-tight font-bold", compact ? "mt-1.5 sm:mt-3 text-sm sm:text-base lg:text-sm" : "mt-3 text-base sm:text-lg"),
							children: book.title
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[9px] sm:text-[10px] opacity-80 truncate",
							children: book.author
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "bg-background text-foreground text-[10px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3 sm:h-3.5 w-3 sm:w-3.5 text-amber-600" }), " Quick View"]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex flex-col flex-1 justify-between", compact ? "pt-2 sm:pt-3 lg:pt-1.5" : "pt-3"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 truncate max-w-[120px]", compact ? "text-[9px] sm:text-[10px]" : "text-[10px]"),
						children: book.category
					}), subCategoryName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground/40 text-[9px]",
						children: "•"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("font-medium text-muted-foreground truncate max-w-[110px]", compact ? "text-[9px] sm:text-[10px]" : "text-[10px]"),
						children: subCategoryName
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: cn("font-bold text-foreground line-clamp-1 group-hover:text-amber-600 transition-colors", compact ? "mt-0.5 sm:mt-1 text-xs sm:text-sm" : "mt-1 text-sm sm:text-base"),
					children: book.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("text-muted-foreground truncate font-medium", compact ? "text-[11px] sm:text-xs" : "text-xs"),
					children: book.author
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("flex items-center gap-1 text-muted-foreground", compact ? "mt-0.5 sm:mt-1 text-[11px] sm:text-xs" : "mt-1 text-xs"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-amber-400 text-amber-400" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-foreground text-xs",
							children: book.rating || 4.5
						}),
						book.reviewsCount ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] text-muted-foreground",
							children: [
								"(",
								book.reviewsCount,
								")"
							]
						}) : null
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border/60 flex items-center justify-between gap-1.5 mt-2 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline gap-1.5 font-sans",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("font-sans font-extrabold text-amber-600 dark:text-amber-400 tracking-tight", compact ? "text-sm sm:text-base" : "text-base sm:text-lg"),
							children: ["₹", sellingPrice]
						}), mrp && mrp > sellingPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("font-sans font-medium text-slate-400 dark:text-slate-500 line-through", compact ? "text-[11px] sm:text-xs" : "text-xs"),
							children: ["₹", mrp]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon",
					className: cn("shrink-0 rounded-full bg-primary text-slate-950 hover:bg-primary/90 shadow-xs font-bold active:scale-90 transition-transform cursor-pointer", compact ? "h-7.5 w-7.5 sm:h-8 sm:w-8" : "h-8 w-8"),
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
export { BookDetailModal as n, BookCard as t };
