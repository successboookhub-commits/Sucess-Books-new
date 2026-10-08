import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Sparkles,
  Star,
  ShoppingBag,
  ExternalLink,
  RotateCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Book } from "@/lib/books";

interface HeroFlipBookProps {
  onPreviewBook?: (bookTitle: string) => void;
}

interface StoryPage {
  id: number;
  title: string;
  author: string;
  category: string;
  label: string;
  quote: string;
  chapter: string;
  synopsis: string;
  rating: number;
  reviews: number;
  price: number;
  oldPrice: number;
  coverBg: string;
  spineColor: string;
  pageLeftNum: number;
  pageRightNum: number;
}

const STORIES: StoryPage[] = [
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

export function HeroFlipBook({ onPreviewBook }: HeroFlipBookProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isCoverClosed, setIsCoverClosed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentStory = STORIES[currentIndex];
  const nextIndex = (currentIndex + 1) % STORIES.length;
  const prevIndex = (currentIndex - 1 + STORIES.length) % STORIES.length;

  // Next page flip trigger
  const handleNextPage = useCallback(() => {
    if (isFlipping || isCoverClosed) return;
    setFlipDirection("next");
    setIsFlipping(true);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % STORIES.length);
      setIsFlipping(false);
    }, 850);
  }, [isFlipping, isCoverClosed]);

  // Previous page flip trigger
  const handlePrevPage = useCallback(() => {
    if (isFlipping || isCoverClosed) return;
    setFlipDirection("prev");
    setIsFlipping(true);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + STORIES.length) % STORIES.length);
      setIsFlipping(false);
    }, 850);
  }, [isFlipping, isCoverClosed]);

  // Auto flip timer
  useEffect(() => {
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
  }, [isAutoPlay, isCoverClosed, handleNextPage]);

  return (
    <div className="relative mx-auto w-full max-w-[460px] select-none flex flex-col items-center">
      {/* 3D Scene Wrapper with Perspective */}
      <div
        className="perspective-book w-full h-[320px] sm:h-[350px] relative flex items-center justify-center cursor-pointer group"
        onClick={() => {
          if (isCoverClosed) {
            setIsCoverClosed(false);
          } else {
            handleNextPage();
          }
        }}
        title={isCoverClosed ? "Click to open book" : "Click to turn page"}
      >
        {/* Soft realistic floor shadow of open book */}
        <div className="absolute -bottom-4 w-[90%] h-8 bg-black/20 dark:bg-black/50 blur-xl rounded-[100%] transition-transform duration-700 group-hover:scale-105" />

        {/* ========================================================================= */}
        {/* MODE A: CLOSED HARDCOVER BOOK (When isCoverClosed is TRUE) */}
        {/* ========================================================================= */}
        {isCoverClosed ? (
          <div className="preserve-3d transition-transform duration-700 hover:rotate-y-[-10deg] hover:rotate-x-[6deg] w-[220px] sm:w-[250px] h-[310px] sm:h-[335px] relative rounded-r-2xl rounded-l-md shadow-2xl">
            {/* Hardcover Spine */}
            <div className="absolute left-0 top-0 w-7 h-full bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 rounded-l-md border-r border-amber-600/50 shadow-md z-20 flex flex-col justify-between py-6 items-center">
              <span className="w-4 h-0.5 bg-amber-400/60 rounded-full" />
              <span className="text-[10px] font-bold text-amber-300 rotate-90 tracking-widest uppercase whitespace-nowrap">
                SUCCESS BOOK HUB
              </span>
              <span className="w-4 h-0.5 bg-amber-400/60 rounded-full" />
            </div>

            {/* Hardcover Front */}
            <div className="absolute inset-0 pl-7 bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-500 p-6 rounded-r-2xl border-y border-r border-amber-300 text-slate-950 flex flex-col justify-between shadow-inner">
              <div className="border border-amber-900/30 p-4 h-full rounded-xl flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-white/15 to-transparent">
                {/* Gold foil header */}
                <div className="text-center border-b border-amber-900/20 pb-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-amber-950/80">
                    {currentStory.category}
                  </p>
                  <p className="text-[8px] font-semibold text-amber-900/70">Pan-India Heritage Archive</p>
                </div>

                {/* Embossed Title */}
                <div className="text-center my-auto py-2">
                  <BookOpen className="h-6 w-6 mx-auto mb-2 text-amber-950/70" />
                  <h3 className="font-display text-xl sm:text-2xl font-black text-slate-950 leading-tight">
                    {currentStory.title}
                  </h3>
                  <div className="w-12 h-0.5 bg-amber-900/30 mx-auto my-2" />
                  <p className="text-xs font-bold text-amber-950/90">{currentStory.author}</p>
                </div>

                {/* Gold seal at bottom */}
                <div className="text-center pt-2 border-t border-amber-900/20 flex items-center justify-between text-[9px] font-bold text-amber-950/80">
                  <span>₹{currentStory.price}</span>
                  <span className="inline-flex items-center gap-1 bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full text-[8px]">
                    <Sparkles className="h-2.5 w-2.5" /> Tap to Open
                  </span>
                </div>
              </div>
            </div>

            {/* Simulated 300 page edges block on the right */}
            <div className="absolute right-0 top-2 bottom-2 w-4 bg-gradient-to-r from-amber-100 via-yellow-100 to-stone-200 rounded-r-sm shadow-md translate-x-3 -z-10" />
          </div>
        ) : (
          /* ========================================================================= */
          /* MODE B: DOUBLE-PAGE OPEN BOOK WITH SMOOTH 3D FLIPPING PAGES */
          /* ========================================================================= */
          <div className="preserve-3d w-[340px] sm:w-[410px] md:w-[450px] h-[280px] sm:h-[315px] relative flex transition-transform duration-500">
            {/* ------------------------------------------------------------- */}
            {/* 1. LEFT STATIC SPREAD PAGE (Facing Left) */}
            {/* ------------------------------------------------------------- */}
            <div className="relative w-1/2 h-full bg-gradient-to-r from-amber-50 via-yellow-50/70 to-amber-100/90 dark:from-stone-900 dark:via-stone-900/90 dark:to-stone-850 rounded-l-xl rounded-r-xs border border-amber-300/80 dark:border-amber-700/60 p-4 sm:p-5 flex flex-col justify-between page-stack-left overflow-hidden">
              {/* Spine Gutter Shadow overlay on right edge */}
              <div className="absolute top-0 right-0 bottom-0 w-8 book-gutter-shadow-right pointer-events-none z-10" />

              {/* Header */}
              <div className="flex items-center justify-between border-b border-amber-300/60 dark:border-amber-800/50 pb-1.5 text-[9px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                <span className="truncate max-w-[110px]">{currentStory.label}</span>
                <span className="font-mono">#{currentStory.id}</span>
              </div>

              {/* Quote Body with Antiquarian styling */}
              <div className="my-auto py-2 pr-2">
                <p className="text-[10px] sm:text-xs font-serif italic text-foreground leading-relaxed">
                  &ldquo;{currentStory.quote}&rdquo;
                </p>
                <p className="mt-2 text-[10px] font-bold text-amber-700 dark:text-amber-400 text-right">
                  — {currentStory.author}
                </p>
              </div>

              {/* Footer / Page Number */}
              <div className="flex items-center justify-between border-t border-amber-300/60 dark:border-amber-800/50 pt-1.5 text-[9px] text-muted-foreground font-semibold">
                <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 font-bold">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {currentStory.rating}
                </span>
                <span className="font-mono">p. {currentStory.pageLeftNum}</span>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* 2. CENTER SPINE & SILK BOOKMARK RIBBON */}
            {/* ------------------------------------------------------------- */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 z-20 pointer-events-none flex justify-center">
              {/* Deep binding gutter crease */}
              <div className="w-full h-full bg-gradient-to-r from-black/25 via-black/40 to-black/25" />

              {/* Silk Red Bookmark Ribbon hanging from top of spine */}
              <div className="absolute -top-3 w-3 sm:w-3.5 h-[85%] bg-gradient-to-b from-red-700 via-red-600 to-red-800 ribbon-swallowtail shadow-md z-30 opacity-95 animate-pulse" />
            </div>

            {/* ------------------------------------------------------------- */}
            {/* 3. RIGHT STATIC BASE SPREAD PAGE (Facing Right) */}
            {/* ------------------------------------------------------------- */}
            <div className="relative w-1/2 h-full bg-gradient-to-l from-amber-50 via-yellow-50/70 to-amber-100/90 dark:from-stone-900 dark:via-stone-900/90 dark:to-stone-850 rounded-r-xl rounded-l-xs border border-amber-300/80 dark:border-amber-700/60 p-4 sm:p-5 flex flex-col justify-between page-stack-right overflow-hidden">
              {/* Spine Gutter Shadow overlay on left edge */}
              <div className="absolute top-0 left-0 bottom-0 w-8 book-gutter-shadow pointer-events-none z-10" />

              {/* Header */}
              <div className="flex items-center justify-between border-b border-amber-300/60 dark:border-amber-800/50 pb-1.5 text-[9px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 pl-2">
                <span className="truncate max-w-[120px]">{currentStory.category}</span>
                <span className="font-mono">₹{currentStory.price}</span>
              </div>

              {/* Chapter & Title */}
              <div className="my-auto py-1 pl-2">
                <p className="text-[9px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {currentStory.chapter}
                </p>
                <h4 className="font-display text-sm sm:text-base font-bold text-foreground leading-tight mt-0.5">
                  {currentStory.title}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground line-clamp-3 mt-1 leading-snug">
                  {currentStory.synopsis}
                </p>

                {/* Price tag + Action */}
                <div className="mt-2.5 flex items-center justify-between gap-1">
                  <div>
                    <span className="font-display text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-400">
                      ₹{currentStory.price}
                    </span>
                    <span className="ml-1 text-[9px] text-muted-foreground line-through">
                      ₹{currentStory.oldPrice}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onPreviewBook) {
                        onPreviewBook(currentStory.title);
                      }
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary hover:bg-primary/90 text-slate-950 font-bold text-[10px] shadow-2xs transition active:scale-95 cursor-pointer"
                  >
                    <span>Preview</span>
                    <ExternalLink className="h-2.5 w-2.5" />
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-amber-300/60 dark:border-amber-800/50 pt-1.5 text-[9px] text-muted-foreground font-semibold pl-2">
                <span className="text-[8px] text-emerald-600 dark:text-emerald-400 font-bold">● In Stock</span>
                <span className="font-mono">p. {currentStory.pageRightNum}</span>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* 4. THE 3D FLIPPING LEAF (The Animated Page Turning) */}
            {/* ------------------------------------------------------------- */}
            {isFlipping && (
              <div
                className="absolute top-0 left-1/2 w-1/2 h-full origin-left-spine preserve-3d z-30 transition-transform duration-800 ease-in-out pointer-events-none"
                style={{
                  transform: flipDirection === "next" ? "rotateY(-180deg)" : "rotateY(0deg)",
                  animation:
                    flipDirection === "next"
                      ? "pageFlipForward 0.85s cubic-bezier(0.645, 0.045, 0.355, 1) forwards"
                      : "pageFlipBackward 0.85s cubic-bezier(0.645, 0.045, 0.355, 1) forwards"
                }}
              >
                {/* Front of Flipping Page (Lifting from right) */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-l from-amber-50 via-yellow-50 to-amber-100 dark:from-stone-900 dark:to-stone-850 rounded-r-xl rounded-l-xs border border-amber-300/90 dark:border-amber-700/80 p-4 sm:p-5 flex flex-col justify-between shadow-xl overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 w-8 book-gutter-shadow" />
                  <div className="flex items-center justify-between border-b border-amber-300/60 pb-1.5 text-[9px] font-bold uppercase tracking-wider text-amber-800">
                    <span>Turning...</span>
                    <span>✨</span>
                  </div>
                  <div className="my-auto text-center py-4">
                    <BookOpen className="h-8 w-8 mx-auto text-amber-600 animate-pulse" />
                    <p className="mt-2 text-xs font-serif italic text-foreground font-bold">
                      {STORIES[nextIndex].title}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{STORIES[nextIndex].author}</p>
                  </div>
                  <div className="text-right text-[9px] font-mono text-muted-foreground">
                    p. {STORIES[nextIndex].pageRightNum}
                  </div>
                </div>

                {/* Back of Flipping Page (Landing on left) */}
                <div
                  className="absolute inset-0 backface-hidden bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100 dark:from-stone-900 dark:to-stone-850 rounded-l-xl rounded-r-xs border border-amber-300/90 dark:border-amber-700/80 p-4 sm:p-5 flex flex-col justify-between shadow-xl overflow-hidden"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <div className="absolute top-0 right-0 bottom-0 w-8 book-gutter-shadow-right" />
                  <div className="flex items-center justify-between border-b border-amber-300/60 pb-1.5 text-[9px] font-bold uppercase tracking-wider text-amber-800">
                    <span>{STORIES[nextIndex].label}</span>
                    <span>#{STORIES[nextIndex].id}</span>
                  </div>
                  <div className="my-auto py-2 pr-2">
                    <p className="text-[10px] sm:text-xs font-serif italic text-foreground leading-relaxed">
                      &ldquo;{STORIES[nextIndex].quote}&rdquo;
                    </p>
                    <p className="mt-2 text-[10px] font-bold text-amber-700 text-right">
                      — {STORIES[nextIndex].author}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-muted-foreground border-t border-amber-300/60 pt-1.5">
                    <span>★ {STORIES[nextIndex].rating}</span>
                    <span>p. {STORIES[nextIndex].pageLeftNum}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE CONTROLS BAR UNDER THE BOOK */}
      {/* ========================================================================= */}
      <div className="mt-4 flex items-center justify-between w-full max-w-[340px] sm:max-w-[420px] px-2 py-1.5 rounded-full bg-card/80 border border-border/80 shadow-xs backdrop-blur-xs text-xs">
        {/* Previous page button */}
        <button
          type="button"
          onClick={handlePrevPage}
          disabled={isFlipping || isCoverClosed}
          className="h-7 w-7 rounded-full bg-secondary hover:bg-amber-100 dark:hover:bg-amber-950/40 text-foreground flex items-center justify-center transition disabled:opacity-40 cursor-pointer active:scale-95"
          title="Previous Page"
          aria-label="Previous Page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Story Indicators & Page Status */}
        <div className="flex items-center gap-2">
          {STORIES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                if (idx !== currentIndex && !isFlipping) {
                  setIsCoverClosed(false);
                  setIsFlipping(true);
                  setTimeout(() => {
                    setCurrentIndex(idx);
                    setIsFlipping(false);
                  }, 400);
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex && !isCoverClosed
                  ? "w-6 bg-primary"
                  : "w-2 bg-border hover:bg-amber-300"
              }`}
              title={`Jump to Story ${idx + 1}`}
              aria-label={`Jump to Story ${idx + 1}`}
            />
          ))}

          <span className="text-[10px] font-bold text-muted-foreground ml-1">
            Story {currentIndex + 1} of {STORIES.length}
          </span>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-1">
          {/* Auto play toggle */}
          <button
            type="button"
            onClick={() => setIsAutoPlay((v) => !v)}
            className="h-7 w-7 rounded-full bg-secondary hover:bg-amber-100 dark:hover:bg-amber-950/40 text-muted-foreground hover:text-foreground flex items-center justify-center transition cursor-pointer"
            title={isAutoPlay ? "Pause Auto Flip" : "Resume Auto Flip"}
            aria-label={isAutoPlay ? "Pause Auto Flip" : "Resume Auto Flip"}
          >
            {isAutoPlay ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </button>

          {/* Cover Open/Close toggle */}
          <button
            type="button"
            onClick={() => setIsCoverClosed((v) => !v)}
            className="px-2.5 h-7 rounded-full bg-primary/20 hover:bg-primary/30 text-amber-900 dark:text-amber-200 font-bold text-[10px] flex items-center gap-1 transition cursor-pointer"
            title={isCoverClosed ? "Open Book Spread" : "Close Hardcover"}
          >
            <RotateCw className="h-3 w-3" />
            <span>{isCoverClosed ? "Open" : "Close"}</span>
          </button>

          {/* Next page button */}
          <button
            type="button"
            onClick={handleNextPage}
            disabled={isFlipping || isCoverClosed}
            className="h-7 w-7 rounded-full bg-primary text-slate-950 font-bold flex items-center justify-center transition hover:bg-primary/90 disabled:opacity-40 cursor-pointer active:scale-95 shadow-2xs"
            title="Next Page"
            aria-label="Next Page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Helpful Hint */}
      <p className="mt-1.5 text-[10px] text-muted-foreground flex items-center gap-1 font-medium">
        <Sparkles className="h-3 w-3 text-amber-500" /> Click page or controls to flip stories
      </p>
    </div>
  );
}
