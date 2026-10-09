import { r as __toESM } from "../_runtime.mjs";
import { i as categories, n as WHATSAPP_NUMBER, t as STORE } from "./books-L-o23q6K.mjs";
import { t as api } from "./api-D2JDZHWc.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useCart } from "./cart-BogyCPoq.mjs";
import { t as Button } from "./button-CKfowhiz.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Play, Et as BookOpen, P as Pause, S as Search, bt as ChevronRight, g as ShoppingBag, h as Sparkles, jt as ArrowRight, lt as ExternalLink, m as Star, n as X, p as Tag, s as Truck, v as ShieldCheck, w as RotateCw, xt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as BookDetailModal, t as BookCard } from "./book-card-Rmw6Gdkb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CZALVP4j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORIES = [
	{
		id: 1,
		title: "The Secret Garden",
		author: "Frances Hodgson Burnett",
		category: "Bestselling Classic",
		label: "Collector's Heritage Edition",
		quote: "If you look the right way, you can see that the whole world is a garden.",
		chapter: "Chapter I — The Forgotten Door",
		synopsis: "An orphaned young girl sent to Yorkshire uncovers a locked, neglected garden and discovers friendship, magic, and life's quiet renewal.",
		rating: 4.8,
		reviews: 34,
		price: 349,
		oldPrice: 449,
		coverBg: "from-amber-500 via-amber-400 to-yellow-500",
		spineColor: "border-l-amber-600",
		pageLeftNum: 24,
		pageRightNum: 25
	},
	{
		id: 2,
		title: "Letters to a Young Poet",
		author: "Rainer Maria Rilke",
		category: "Poetry & Philosophy",
		label: "Centennial Translation",
		quote: "Be patient toward all that is unsolved in your heart and try to love the questions themselves.",
		chapter: "Letter IV — On Solitude & Truth",
		synopsis: "Ten intimate letters from Rilke offering timeless wisdom on patience, loneliness, art, love, and living courageously without rush.",
		rating: 4.7,
		reviews: 21,
		price: 299,
		oldPrice: 399,
		coverBg: "from-amber-600 via-amber-500 to-yellow-600",
		spineColor: "border-l-amber-700",
		pageLeftNum: 58,
		pageRightNum: 59
	},
	{
		id: 3,
		title: "The Last Bookshop in London",
		author: "Madeline Martin",
		category: "Historical Fiction",
		label: "Staff Handpicked Choice",
		quote: "A bookshop is not merely a shop of words, but a sanctuary of human hope.",
		chapter: "Chapter VII — Lantern in the Dust",
		synopsis: "Grace Bennett finds solace working in a dusty London bookshop, discovering literature's supreme power to unite a city through hardship.",
		rating: 4.9,
		reviews: 42,
		price: 399,
		oldPrice: 499,
		coverBg: "from-amber-500 via-yellow-400 to-amber-600",
		spineColor: "border-l-amber-600",
		pageLeftNum: 112,
		pageRightNum: 113
	}
];
function HeroFlipBook({ onPreviewBook }) {
	const [currentIndex, setCurrentIndex] = (0, import_react.useState)(0);
	const [isFlipping, setIsFlipping] = (0, import_react.useState)(false);
	const [flipDirection, setFlipDirection] = (0, import_react.useState)("next");
	const [isAutoPlay, setIsAutoPlay] = (0, import_react.useState)(true);
	const [isCoverClosed, setIsCoverClosed] = (0, import_react.useState)(false);
	const timerRef = (0, import_react.useRef)(null);
	const currentStory = STORIES[currentIndex];
	const nextIndex = (currentIndex + 1) % STORIES.length;
	(currentIndex - 1 + STORIES.length) % STORIES.length;
	const handleNextPage = (0, import_react.useCallback)(() => {
		if (isFlipping || isCoverClosed) return;
		setFlipDirection("next");
		setIsFlipping(true);
		setTimeout(() => {
			setCurrentIndex((prev) => (prev + 1) % STORIES.length);
			setIsFlipping(false);
		}, 850);
	}, [isFlipping, isCoverClosed]);
	const handlePrevPage = (0, import_react.useCallback)(() => {
		if (isFlipping || isCoverClosed) return;
		setFlipDirection("prev");
		setIsFlipping(true);
		setTimeout(() => {
			setCurrentIndex((prev) => (prev - 1 + STORIES.length) % STORIES.length);
			setIsFlipping(false);
		}, 850);
	}, [isFlipping, isCoverClosed]);
	(0, import_react.useEffect)(() => {
		if (!isAutoPlay || isCoverClosed) {
			if (timerRef.current) clearInterval(timerRef.current);
			return;
		}
		timerRef.current = setInterval(() => {
			handleNextPage();
		}, 5500);
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [
		isAutoPlay,
		isCoverClosed,
		handleNextPage
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto w-full max-w-[460px] select-none flex flex-col items-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "perspective-book w-full h-[320px] sm:h-[350px] relative flex items-center justify-center cursor-pointer group",
				onClick: () => {
					if (isCoverClosed) setIsCoverClosed(false);
					else handleNextPage();
				},
				title: isCoverClosed ? "Click to open book" : "Click to turn page",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-4 w-[90%] h-8 bg-black/20 dark:bg-black/50 blur-xl rounded-[100%] transition-transform duration-700 group-hover:scale-105" }), isCoverClosed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "preserve-3d transition-transform duration-700 hover:rotate-y-[-10deg] hover:rotate-x-[6deg] w-[220px] sm:w-[250px] h-[310px] sm:h-[335px] relative rounded-r-2xl rounded-l-md shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute left-0 top-0 w-7 h-full bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 rounded-l-md border-r border-amber-600/50 shadow-md z-20 flex flex-col justify-between py-6 items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-4 h-0.5 bg-amber-400/60 rounded-full" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-amber-300 rotate-90 tracking-widest uppercase whitespace-nowrap",
									children: "SUCCESS BOOK HUB"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-4 h-0.5 bg-amber-400/60 rounded-full" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 pl-7 bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-500 p-6 rounded-r-2xl border-y border-r border-amber-300 text-slate-950 flex flex-col justify-between shadow-inner",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-amber-900/30 p-4 h-full rounded-xl flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-white/15 to-transparent",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-center border-b border-amber-900/20 pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[9px] font-black uppercase tracking-widest text-amber-950/80",
											children: currentStory.category
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[8px] font-semibold text-amber-900/70",
											children: "Pan-India Heritage Archive"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-center my-auto py-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-6 w-6 mx-auto mb-2 text-amber-950/70" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-display text-xl sm:text-2xl font-black text-slate-950 leading-tight",
												children: currentStory.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-0.5 bg-amber-900/30 mx-auto my-2" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-bold text-amber-950/90",
												children: currentStory.author
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-center pt-2 border-t border-amber-900/20 flex items-center justify-between text-[9px] font-bold text-amber-950/80",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", currentStory.price] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full text-[8px]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-2.5 w-2.5" }), " Tap to Open"]
										})]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-0 top-2 bottom-2 w-4 bg-gradient-to-r from-amber-100 via-yellow-100 to-stone-200 rounded-r-sm shadow-md translate-x-3 -z-10" })
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "preserve-3d w-[340px] sm:w-[410px] md:w-[450px] h-[280px] sm:h-[315px] relative flex transition-transform duration-500",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-1/2 h-full bg-gradient-to-r from-amber-50 via-yellow-50/70 to-amber-100/90 dark:from-stone-900 dark:via-stone-900/90 dark:to-stone-850 rounded-l-xl rounded-r-xs border border-amber-300/80 dark:border-amber-700/60 p-4 sm:p-5 flex flex-col justify-between page-stack-left overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 bottom-0 w-8 book-gutter-shadow-right pointer-events-none z-10" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-amber-300/60 dark:border-amber-800/50 pb-1.5 text-[9px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate max-w-[110px]",
										children: currentStory.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono",
										children: ["#", currentStory.id]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "my-auto py-2 pr-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] sm:text-xs font-serif italic text-foreground leading-relaxed",
										children: [
											"“",
											currentStory.quote,
											"”"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-[10px] font-bold text-amber-700 dark:text-amber-400 text-right",
										children: ["— ", currentStory.author]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-t border-amber-300/60 dark:border-amber-800/50 pt-1.5 text-[9px] text-muted-foreground font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 font-bold",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-amber-400 text-amber-400" }),
											" ",
											currentStory.rating
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono",
										children: ["p. ", currentStory.pageLeftNum]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 z-20 pointer-events-none flex justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full h-full bg-gradient-to-r from-black/25 via-black/40 to-black/25" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-3 w-3 sm:w-3.5 h-[85%] bg-gradient-to-b from-red-700 via-red-600 to-red-800 ribbon-swallowtail shadow-md z-30 opacity-95 animate-pulse" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-1/2 h-full bg-gradient-to-l from-amber-50 via-yellow-50/70 to-amber-100/90 dark:from-stone-900 dark:via-stone-900/90 dark:to-stone-850 rounded-r-xl rounded-l-xs border border-amber-300/80 dark:border-amber-700/60 p-4 sm:p-5 flex flex-col justify-between page-stack-right overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 bottom-0 w-8 book-gutter-shadow pointer-events-none z-10" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-amber-300/60 dark:border-amber-800/50 pb-1.5 text-[9px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 pl-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate max-w-[120px]",
										children: currentStory.category
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono",
										children: ["₹", currentStory.price]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "my-auto py-1 pl-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[9px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400",
											children: currentStory.chapter
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-display text-sm sm:text-base font-bold text-foreground leading-tight mt-0.5",
											children: currentStory.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] sm:text-[11px] text-muted-foreground line-clamp-3 mt-1 leading-snug",
											children: currentStory.synopsis
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2.5 flex items-center justify-between gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-display text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-400",
												children: ["₹", currentStory.price]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "ml-1 text-[9px] text-muted-foreground line-through",
												children: ["₹", currentStory.oldPrice]
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: (e) => {
													e.stopPropagation();
													if (onPreviewBook) onPreviewBook(currentStory.title);
												},
												className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary hover:bg-primary/90 text-slate-950 font-bold text-[10px] shadow-2xs transition active:scale-95 cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Preview" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-2.5 w-2.5" })]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-t border-amber-300/60 dark:border-amber-800/50 pt-1.5 text-[9px] text-muted-foreground font-semibold pl-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8px] text-emerald-600 dark:text-emerald-400 font-bold",
										children: "● In Stock"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono",
										children: ["p. ", currentStory.pageRightNum]
									})]
								})
							]
						}),
						isFlipping && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute top-0 left-1/2 w-1/2 h-full origin-left-spine preserve-3d z-30 transition-transform duration-800 ease-in-out pointer-events-none",
							style: {
								transform: flipDirection === "next" ? "rotateY(-180deg)" : "rotateY(0deg)",
								animation: flipDirection === "next" ? "pageFlipForward 0.85s cubic-bezier(0.645, 0.045, 0.355, 1) forwards" : "pageFlipBackward 0.85s cubic-bezier(0.645, 0.045, 0.355, 1) forwards"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 backface-hidden bg-gradient-to-l from-amber-50 via-yellow-50 to-amber-100 dark:from-stone-900 dark:to-stone-850 rounded-r-xl rounded-l-xs border border-amber-300/90 dark:border-amber-700/80 p-4 sm:p-5 flex flex-col justify-between shadow-xl overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 bottom-0 w-8 book-gutter-shadow" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-amber-300/60 pb-1.5 text-[9px] font-bold uppercase tracking-wider text-amber-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Turning..." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✨" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "my-auto text-center py-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-8 w-8 mx-auto text-amber-600 animate-pulse" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-xs font-serif italic text-foreground font-bold",
												children: STORIES[nextIndex].title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground",
												children: STORIES[nextIndex].author
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right text-[9px] font-mono text-muted-foreground",
										children: ["p. ", STORIES[nextIndex].pageRightNum]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 backface-hidden bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100 dark:from-stone-900 dark:to-stone-850 rounded-l-xl rounded-r-xs border border-amber-300/90 dark:border-amber-700/80 p-4 sm:p-5 flex flex-col justify-between shadow-xl overflow-hidden",
								style: { transform: "rotateY(180deg)" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 bottom-0 w-8 book-gutter-shadow-right" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-amber-300/60 pb-1.5 text-[9px] font-bold uppercase tracking-wider text-amber-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: STORIES[nextIndex].label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["#", STORIES[nextIndex].id] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "my-auto py-2 pr-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10px] sm:text-xs font-serif italic text-foreground leading-relaxed",
											children: [
												"“",
												STORIES[nextIndex].quote,
												"”"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-2 text-[10px] font-bold text-amber-700 text-right",
											children: ["— ", STORIES[nextIndex].author]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-[9px] font-mono text-muted-foreground border-t border-amber-300/60 pt-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["★ ", STORIES[nextIndex].rating] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["p. ", STORIES[nextIndex].pageLeftNum] })]
									})
								]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center justify-between w-full max-w-[340px] sm:max-w-[420px] px-2 py-1.5 rounded-full bg-card/80 border border-border/80 shadow-xs backdrop-blur-xs text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handlePrevPage,
						disabled: isFlipping || isCoverClosed,
						className: "h-7 w-7 rounded-full bg-secondary hover:bg-amber-100 dark:hover:bg-amber-950/40 text-foreground flex items-center justify-center transition disabled:opacity-40 cursor-pointer active:scale-95",
						title: "Previous Page",
						"aria-label": "Previous Page",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [STORIES.map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								if (idx !== currentIndex && !isFlipping) {
									setIsCoverClosed(false);
									setIsFlipping(true);
									setTimeout(() => {
										setCurrentIndex(idx);
										setIsFlipping(false);
									}, 400);
								}
							},
							className: `h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === currentIndex && !isCoverClosed ? "w-6 bg-primary" : "w-2 bg-border hover:bg-amber-300"}`,
							title: `Jump to Story ${idx + 1}`,
							"aria-label": `Jump to Story ${idx + 1}`
						}, idx)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] font-bold text-muted-foreground ml-1",
							children: [
								"Story ",
								currentIndex + 1,
								" of ",
								STORIES.length
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setIsAutoPlay((v) => !v),
								className: "h-7 w-7 rounded-full bg-secondary hover:bg-amber-100 dark:hover:bg-amber-950/40 text-muted-foreground hover:text-foreground flex items-center justify-center transition cursor-pointer",
								title: isAutoPlay ? "Pause Auto Flip" : "Resume Auto Flip",
								"aria-label": isAutoPlay ? "Pause Auto Flip" : "Resume Auto Flip",
								children: isAutoPlay ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3 w-3" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setIsCoverClosed((v) => !v),
								className: "px-2.5 h-7 rounded-full bg-primary/20 hover:bg-primary/30 text-amber-900 dark:text-amber-200 font-bold text-[10px] flex items-center gap-1 transition cursor-pointer",
								title: isCoverClosed ? "Open Book Spread" : "Close Hardcover",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isCoverClosed ? "Open" : "Close" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleNextPage,
								disabled: isFlipping || isCoverClosed,
								className: "h-7 w-7 rounded-full bg-primary text-slate-950 font-bold flex items-center justify-center transition hover:bg-primary/90 disabled:opacity-40 cursor-pointer active:scale-95 shadow-2xs",
								title: "Next Page",
								"aria-label": "Next Page",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1.5 text-[10px] text-muted-foreground flex items-center gap-1 font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-amber-500" }), " Click page or controls to flip stories"]
			})
		]
	});
}
function Index() {
	const { catalog } = useCart();
	const navigate = useNavigate();
	const [dbCategories, setDbCategories] = (0, import_react.useState)([]);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [suggestionsOpen, setSuggestionsOpen] = (0, import_react.useState)(false);
	const [previewBook, setPreviewBook] = (0, import_react.useState)(null);
	const [previewModalOpen, setPreviewModalOpen] = (0, import_react.useState)(false);
	const categoriesScrollRef = (0, import_react.useRef)(null);
	const searchContainerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const handleClickOutside = (e) => {
			if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) setSuggestionsOpen(false);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	const scrollCategories = (direction) => {
		if (categoriesScrollRef.current) {
			const scrollDistance = direction === "left" ? -260 : 260;
			categoriesScrollRef.current.scrollBy({
				left: scrollDistance,
				behavior: "smooth"
			});
		}
	};
	const handleSearchSubmit = (e) => {
		e.preventDefault();
		if (!searchQuery.trim()) return;
		setSuggestionsOpen(false);
		navigate({
			to: "/shop",
			search: { q: searchQuery.trim() }
		});
	};
	const handleHeroBookPreview = (title) => {
		const found = catalog.find((b) => b.title.toLowerCase().includes(title.toLowerCase()));
		if (found) {
			setPreviewBook(found);
			setPreviewModalOpen(true);
		} else navigate({
			to: "/shop",
			search: { q: title }
		});
	};
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
	const filteredCategories = (0, import_react.useMemo)(() => {
		if (!searchQuery.trim()) return displayCategories;
		const q = searchQuery.trim().toLowerCase();
		const directMatches = displayCategories.filter((c) => c.name.toLowerCase().includes(q));
		if (directMatches.length > 0) return directMatches;
		const categoriesWithBooks = new Set(catalog.filter((b) => `${b.title} ${b.author} ${b.description || ""}`.toLowerCase().includes(q)).map((b) => b.category.toLowerCase()));
		return displayCategories.filter((c) => categoriesWithBooks.has(c.name.toLowerCase()));
	}, [
		searchQuery,
		displayCategories,
		catalog
	]);
	const matchingBooks = (0, import_react.useMemo)(() => {
		if (!searchQuery.trim()) return [];
		const q = searchQuery.trim().toLowerCase();
		return catalog.filter((b) => `${b.title} ${b.author} ${b.category} ${b.subCategory || ""}`.toLowerCase().includes(q)).slice(0, 5);
	}, [searchQuery, catalog]);
	const matchingCategoriesList = (0, import_react.useMemo)(() => {
		if (!searchQuery.trim()) return [];
		const q = searchQuery.trim().toLowerCase();
		return displayCategories.filter((c) => c.name.toLowerCase().includes(q));
	}, [searchQuery, displayCategories]);
	const displayBooks = (0, import_react.useMemo)(() => {
		const feat = catalog.filter((b) => b.featured);
		const nonFeat = catalog.filter((b) => !b.featured);
		return [...feat, ...nonFeat].slice(0, 12);
	}, [catalog]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen overflow-x-hidden bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "paper-texture border-b border-border bg-gradient-to-b from-amber-50/30 via-background to-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-7xl items-center gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:py-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mb-2.5 inline-flex items-center gap-2 rounded-full bg-amber-100/80 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-900 border border-amber-300/40 shadow-2xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 fill-amber-500 text-amber-500" }), "Curated with Passion & Purpose"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "font-display text-3xl leading-[1.15] text-foreground sm:text-5xl lg:text-5xl font-bold tracking-tight",
								children: [
									"Books that inspire.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-amber-500 font-serif italic",
										children: "Stories that shape success."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 max-w-xl text-xs leading-6 text-muted-foreground sm:text-sm",
								children: [
									"From literary masterworks to mindset guides, explore our handpicked collection at ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: STORE.name
									}),
									" — available with direct online checkout and instant WhatsApp order confirmation."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "lg",
									className: "h-11 rounded-full px-7 shadow-xs gap-2 font-bold bg-primary text-primary-foreground hover:bg-primary/90 justify-center btn-shimmer",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/shop",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }), " Explore Catalogue"]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "lg",
									className: "h-11 rounded-full px-6 border-border hover:border-amber-400 bg-card text-foreground hover:bg-secondary transition font-bold justify-center",
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
								className: "mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-3.5 text-xs font-semibold text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-3.5 w-3.5 text-amber-600" }), " Free delivery above ₹499"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-amber-400 text-amber-400" }), " Rated 4.8 by 2,500+ readers"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-amber-600" }), " 100% Original Editions"]
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative mx-auto hidden lg:flex w-full max-w-lg justify-center mt-6 lg:mt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroFlipBook, { onPreviewBook: handleHeroBookPreview })
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-4 py-4 sm:py-7 sm:px-6 lg:px-8 border-b border-border/60 bg-gradient-to-b from-card/30 via-background to-background overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex flex-row items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 fill-amber-500 text-amber-500" }), " Explore by Genre"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-0.5 font-display text-lg sm:text-2xl lg:text-3xl text-foreground font-bold",
						children: "Shop by Category"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setSearchQuery("");
								setSuggestionsOpen(false);
							},
							className: "text-[11px] sm:text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "Show all"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/shop",
							className: "items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline inline-flex",
							children: [
								"View all ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "shelves"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col lg:flex-row items-stretch lg:items-center gap-3 sm:gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: searchContainerRef,
						className: "relative w-full lg:w-72 xl:w-80 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSearchSubmit,
							className: "relative group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500 group-focus-within:text-amber-600 transition-colors pointer-events-none z-10" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: searchQuery,
									onFocus: () => {
										if (searchQuery.trim()) setSuggestionsOpen(true);
									},
									onChange: (e) => {
										setSearchQuery(e.target.value);
										setSuggestionsOpen(true);
									},
									placeholder: "Search category or books…",
									className: "w-full h-11 sm:h-12 pl-10 pr-16 rounded-full border border-border/80 bg-card/90 backdrop-blur-xs text-xs sm:text-sm font-semibold text-foreground placeholder:text-muted-foreground shadow-xs focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
								}),
								searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setSearchQuery("");
										setSuggestionsOpen(false);
									},
									className: "absolute right-10 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-secondary transition cursor-pointer",
									title: "Clear search",
									"aria-label": "Clear search",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-8.5 sm:w-8.5 rounded-full bg-primary text-slate-950 font-bold flex items-center justify-center shadow-xs hover:bg-primary/90 transition active:scale-95 cursor-pointer",
									title: "Search books",
									"aria-label": "Search books",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
								})
							]
						}), suggestionsOpen && searchQuery.trim().length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute top-full left-0 mt-2 w-full sm:w-[380px] md:w-[420px] bg-card/95 backdrop-blur-md border border-amber-300/80 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150",
							children: [
								matchingCategoriesList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 border-b border-border/60 bg-muted/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-1.5 flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-3 w-3" }),
											" Matching Categories (",
											matchingCategoriesList.length,
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-1.5 flex-wrap",
										children: matchingCategoriesList.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												setSuggestionsOpen(false);
												navigate({
													to: "/shop",
													search: { category: cat.name }
												});
											},
											className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs border border-amber-300 shadow-2xs transition cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cat.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] text-amber-800 opacity-70",
												children: [
													"(",
													catalog.filter((b) => b.category.toLowerCase() === cat.name.toLowerCase()).length,
													")"
												]
											})]
										}, cat.name))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2 max-h-[300px] overflow-y-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "px-2 py-1 flex items-center justify-between text-[11px] font-bold text-muted-foreground uppercase tracking-wider",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Products & Books" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [matchingBooks.length, " suggestions"] })]
									}), matchingBooks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-1 mt-1",
										children: matchingBooks.map((book) => {
											const mrp = book.oldPrice || book.old_price;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												onClick: () => {
													setPreviewBook(book);
													setPreviewModalOpen(true);
													setSuggestionsOpen(false);
												},
												className: "flex items-center gap-3 p-2 rounded-xl hover:bg-amber-500/10 transition cursor-pointer group",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-12 w-9 rounded-md overflow-hidden bg-secondary border border-border shadow-2xs shrink-0 flex items-center justify-center",
														children: book.cover && (book.cover.startsWith("http") || book.cover.startsWith("/")) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: book.cover,
															alt: book.title,
															className: "h-full w-full object-cover"
														}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4 text-amber-600" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex-1 min-w-0",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
															className: "font-display text-xs font-bold text-foreground group-hover:text-amber-600 truncate transition-colors",
															children: book.title
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-[11px] text-muted-foreground truncate",
															children: [
																book.author,
																" · ",
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-amber-700 dark:text-amber-400 font-semibold",
																	children: book.category
																})
															]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-right shrink-0",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "font-sans text-xs font-bold text-amber-600 dark:text-amber-400",
															children: ["₹", book.price]
														}), mrp && mrp > book.price && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-[10px] text-muted-foreground line-through",
															children: ["₹", mrp]
														})]
													})
												]
											}, book.id);
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "py-6 text-center text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-6 w-6 mx-auto mb-1.5 opacity-40 text-amber-600" }),
											"No books matching \"",
											searchQuery,
											"\""
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-2 border-t border-border/60 bg-muted/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setSuggestionsOpen(false);
											navigate({
												to: "/shop",
												search: { q: searchQuery.trim() }
											});
										},
										className: "w-full py-2 px-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"View full results in Shop for \"",
											searchQuery,
											"\""
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
									})
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1 min-w-0 flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => scrollCategories("left"),
								className: "hidden sm:flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full bg-card hover:bg-primary hover:text-primary-foreground border border-border/80 shadow-xs items-center justify-center text-foreground transition-all active:scale-90 z-10 cursor-pointer",
								"aria-label": "Previous categories",
								title: "Previous categories",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								ref: categoriesScrollRef,
								className: "flex items-center gap-3 sm:gap-5 overflow-x-auto scrollbar-none scroll-smooth py-1.5 px-1 sm:px-0 flex-1 min-w-0 -mx-4 px-4 sm:mx-0 snap-x",
								children: filteredCategories.length > 0 ? filteredCategories.map((cat) => {
									const count = catalog.filter((b) => b.category.toLowerCase() === cat.name.toLowerCase()).length;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/shop",
										search: { category: cat.name },
										className: "group shrink-0 flex flex-col items-center text-center cursor-pointer select-none transition-transform hover:-translate-y-1 snap-start",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "relative h-16 w-16 sm:h-20 sm:w-20 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 shadow-xs group-hover:shadow-md group-hover:from-amber-500 group-hover:to-yellow-400 transition-all duration-300 ring-2 ring-primary/10",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "h-full w-full rounded-full overflow-hidden bg-card border-[1.5px] border-background relative flex items-center justify-center",
													children: [cat.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: cat.image,
														alt: cat.name,
														className: "h-full w-full object-cover group-hover:scale-115 transition-transform duration-500",
														loading: "lazy"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-full w-full bg-primary/15 flex items-center justify-center text-amber-700 dark:text-amber-400",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-6 w-6" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent group-hover:opacity-0 transition-opacity" })]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-1.5 text-[11px] sm:text-xs font-bold text-foreground group-hover:text-amber-600 transition-colors line-clamp-2 w-[72px] sm:w-[92px] text-center leading-tight h-7 sm:h-8 flex items-center justify-center",
												children: cat.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[9px] sm:text-[10px] text-muted-foreground font-semibold",
												children: [count, " titles"]
											})
										]
									}, cat.name);
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 py-3 px-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 text-xs text-amber-900 dark:text-amber-200",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"No categories matching \"",
										searchQuery,
										"\""
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setSearchQuery("");
											setSuggestionsOpen(false);
										},
										className: "font-bold underline cursor-pointer",
										children: "Reset Categories"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => scrollCategories("right"),
								className: "hidden sm:flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full bg-card hover:bg-primary hover:text-primary-foreground border border-border/80 shadow-xs items-center justify-center text-foreground transition-all active:scale-90 z-10 cursor-pointer",
								"aria-label": "Next categories",
								title: "Next categories",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 sm:mb-6 flex items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-wider text-amber-600",
							children: "Curated Highlights"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-0.5 font-display text-xl sm:text-2xl lg:text-3xl text-foreground font-bold",
							children: "Featured This Week"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/shop",
							className: "inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 hover:underline",
							children: [
								"Shop all ",
								catalog.length,
								" books ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-4 sm:gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 lg:gap-x-3 lg:gap-y-4",
						children: displayBooks.map((book) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookCard, {
							book,
							compact: true
						}, book.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 sm:mt-9 flex flex-col items-center justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "default",
							className: "rounded-full px-8 h-10 sm:h-11 font-bold bg-primary text-slate-950 hover:bg-primary/90 shadow-xs gap-2 group transition-all",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/shop",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View More Books" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-muted-foreground font-semibold text-center",
							children: [
								"Showing ",
								displayBooks.length,
								" of ",
								catalog.length,
								" curated highlights • Explore our full catalogue of fiction, classics & bestsellers"
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-4 py-8 sm:py-10 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-left mb-4 sm:mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-wider text-amber-600",
						children: "From Our Community"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-0.5 font-display text-xl sm:text-2xl lg:text-3xl text-foreground font-bold",
						children: "Loved by Readers Across India"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:gap-6 md:grid-cols-3",
					children: [
						["Ananya Roy, Kolkata", "Ordered via WhatsApp late at night, and received the books within 48 hours in beautiful eco-friendly packaging with a personalized bookmark."],
						["Dr. Rohit Menon, Bangalore", "The book quality is genuine and pristine. You can tell the curators are actual bibliophiles who care deeply about literature."],
						["Sara Khan, Delhi", "Fair pricing, instantaneous WhatsApp responses, and great recommendations. Success Book Hub is now my go-to online bookshop."]
					].map(([name, quote]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "rounded-xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1",
							children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-gold text-gold" }, i))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
							className: "mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground",
							children: [
								"“",
								quote,
								"”"
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
							className: "mt-4 text-xs font-bold text-foreground border-t border-border pt-2.5",
							children: name
						})]
					}, name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookDetailModal, {
				book: previewBook,
				open: previewModalOpen,
				onOpenChange: setPreviewModalOpen
			})
		]
	});
}
//#endregion
export { Index as component };
