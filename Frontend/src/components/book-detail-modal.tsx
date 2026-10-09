import { useState, useEffect } from "react";
import {
  Star,
  MessageCircle,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Check,
  Send,
  Heart,
  BookOpen,
  Clock,
  Sparkles,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { api, type BookDetail } from "@/lib/api";
import { type Book, WHATSAPP_NUMBER } from "@/lib/books";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BookDetailModalProps {
  book: Book | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectBook?: (book: Book) => void;
}

export function BookDetailModal({ book, open, onOpenChange, onSelectBook }: BookDetailModalProps) {
  const { changeQuantity, addToCart, setCartOpen, catalog, cart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [details, setDetails] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<0 | 1>(0);
  const [selectedQty, setSelectedQty] = useState(1);

  const wishlisted = book ? isWishlisted(book.id) : false;

  // Review Form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (!book || !open) return;
    setLoading(true);
    setShowReviewForm(false);
    setActiveImageIndex(0);
    setSelectedQty(1);
    api
      .getBook(book.id)
      .then((data) => {
        if (data) setDetails(data);
        else setDetails(book);
      })
      .catch(() => setDetails(book))
      .finally(() => setLoading(false));
  }, [book, open]);

  if (!book) return null;

  const currentItem = details || book;
  const inCartQty = cart[book.id] || 0;

  const mrp = currentItem.oldPrice || currentItem.old_price;
  const sellingPrice = currentItem.price;
  const savings = mrp && mrp > sellingPrice ? mrp - sellingPrice : 0;
  const discountPercent =
    currentItem.discountPercent ||
    currentItem.discount_percent ||
    (mrp && mrp > sellingPrice ? Math.round(((mrp - sellingPrice) / mrp) * 100) : 0);

  const subCategoryName = currentItem.subCategory || currentItem.sub_category;

  const image1 = currentItem.cover;
  const image2 = currentItem.image2 || currentItem.image_2;
  const isImage1 = image1 && (image1.startsWith("http") || image1.startsWith("/"));
  const isImage2 = image2 && (image2.startsWith("http") || image2.startsWith("/"));

  const activeImageUrl = activeImageIndex === 1 && isImage2 ? image2 : image1;
  const isActiveImgUrl = activeImageUrl && (activeImageUrl.startsWith("http") || activeImageUrl.startsWith("/"));

  const handleReviewSubmit = async (e: React.FormEvent) => {
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
        comment: reviewerComment,
      });

      toast.success("Review submitted! Thank you for sharing your thoughts.");
      setReviewerName("");
      setReviewerComment("");
      setShowReviewForm(false);

      if (res.data?.reviews) {
        setDetails((prev) =>
          prev
            ? {
                ...prev,
                rating: res.data.newRating,
                reviewsCount: res.data.reviewsCount,
                reviews: res.data.reviews,
              }
            : null
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit review";
      toast.error(msg);
    } finally {
      setSubmittingReview(false);
    }
  };

  const whatsappDirectOrder = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Success Book Hub! I want to order:\n\n• ${book.title} by ${book.author} — ₹${book.price}\n\nPlease confirm availability and payment details.`
  )}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] flex flex-col w-[94vw] sm:w-full sm:max-w-2xl lg:max-w-3xl p-0 border border-border/80 bg-card rounded-3xl shadow-2xl overflow-hidden">
        {/* Sleek Top Header Bar (Pinned) */}
        <div className="shrink-0 px-5 sm:px-6 py-3.5 border-b border-border/60 bg-muted/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber-400/20 text-amber-700 dark:text-amber-400 font-bold">
              <BookOpen className="h-4 w-4" />
            </span>
            <DialogTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground m-0">
              Book Details & Overview
            </DialogTitle>
          </div>
          <div className="flex items-center gap-2 pr-7 sm:pr-8">
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300/60 shadow-2xs">
              {book.category}
            </span>
            {subCategoryName && (
              <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary text-muted-foreground border border-border">
                {subCategoryName}
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Content Body with Subtle Scrollbar */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1 [scrollbar-width:thin] [scrollbar-color:hsl(var(--muted-foreground)/0.2)_transparent]">
          <div className="grid sm:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] gap-5 sm:gap-6 items-start">
            {/* Left: Luxury Book Cover Showcase */}
            <div className="space-y-3">
              <div className="relative aspect-[3/4] w-full max-w-[190px] sm:max-w-none mx-auto rounded-2xl overflow-hidden border border-border/80 shadow-[0_12px_28px_rgba(0,0,0,0.15)] bg-secondary/40">
                {/* Discount Tag */}
                {discountPercent > 0 && (
                  <span className="absolute top-2.5 left-2.5 z-20 rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-md">
                    {discountPercent}% OFF
                  </span>
                )}

                {book.label && !book.label.includes("%") && (
                  <span className="absolute top-2.5 right-2.5 z-20 rounded-md bg-background/95 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold uppercase text-primary shadow-xs border border-border">
                    {book.label}
                  </span>
                )}

                {isActiveImgUrl && !activeImageUrl.startsWith("bg-") ? (
                  <img
                    src={activeImageUrl}
                    alt={book.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800";
                    }}
                    className="w-full h-full object-cover transition duration-300"
                  />
                ) : (
                  /* Luxury Fallback Hardcover Book Look */
                  <div
                    className={cn(
                      "relative flex h-full flex-col justify-between p-4 text-slate-900 border-l-[10px] border-amber-800/40 shadow-inner",
                      book.cover || "bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500"
                    )}
                  >
                    {/* Spine crease lighting effect */}
                    <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none" />

                    <div className="border border-slate-950/20 p-3 h-full flex flex-col justify-between rounded-lg bg-white/10 backdrop-blur-[1px]">
                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-widest text-slate-900/70">
                          Success Book Hub • Authentic
                        </p>
                        <h4 className="mt-2.5 font-display text-base sm:text-lg leading-tight font-bold text-slate-950">
                          {book.title}
                        </h4>
                      </div>
                      <div>
                        <div className="h-0.5 w-8 bg-slate-950/30 mb-2" />
                        <p className="text-[11px] font-semibold text-slate-900/80">
                          {book.author}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnails if 2 images available */}
              {isImage2 && (
                <div className="flex items-center gap-2 justify-center">
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex(0)}
                    className={cn(
                      "h-12 w-12 rounded-lg border-2 overflow-hidden transition p-0.5 cursor-pointer",
                      activeImageIndex === 0
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border opacity-70 hover:opacity-100"
                    )}
                  >
                    {isImage1 ? (
                      <img
                        src={image1}
                        alt="Cover 1"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop";
                        }}
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/20 flex items-center justify-center text-[10px] text-primary font-bold">
                        1
                      </div>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveImageIndex(1)}
                    className={cn(
                      "h-12 w-12 rounded-lg border-2 overflow-hidden transition p-0.5 cursor-pointer",
                      activeImageIndex === 1
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border opacity-70 hover:opacity-100"
                    )}
                  >
                    <img
                      src={image2}
                      alt="Cover 2"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop";
                      }}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </button>
                </div>
              )}
            </div>

            {/* Right: Book Info, Pricing & Actions */}
            <div className="space-y-4">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-tight tracking-tight">
                  {book.title}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">
                  by <strong className="text-foreground font-bold">{book.author}</strong>
                </p>
              </div>

              {/* Meta Tags Row */}
              <div className="flex items-center gap-2.5 text-xs flex-wrap">
                <div className="flex items-center gap-1 font-bold text-foreground bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-400/30">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>{currentItem.rating || 4.5}</span>
                  <span className="text-[10px] text-muted-foreground font-normal">
                    ({currentItem.reviewsCount || details?.reviews?.length || 0})
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  ● In Stock • Ready to Dispatch
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-secondary px-2.5 py-1 rounded-full border border-border">
                  100% Original Edition
                </span>
              </div>

              {/* Rich Pricing Card (Clean, Proportional & Informative) */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-transparent border border-amber-300/60 dark:border-amber-700/40 shadow-xs space-y-1.5">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-sans text-3xl sm:text-4xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
                    ₹{sellingPrice}
                  </span>
                  {mrp && mrp > sellingPrice ? (
                    <>
                      <span className="font-sans text-base sm:text-lg text-slate-400 dark:text-slate-500 line-through font-medium">
                        ₹{mrp}
                      </span>
                      <span className="text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 px-2.5 py-0.5 rounded-full border border-amber-300 shadow-2xs">
                        Save ₹{savings} ({discountPercent}% OFF)
                      </span>
                    </>
                  ) : (
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                      Best Price Guaranteed
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5 pt-0.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  Inclusive of all taxes • Ships in 24–48 hours across India
                </p>
              </div>

              {/* Book Synopsis */}
              <div className="space-y-1">
                <h4 className="text-[11px] font-bold text-foreground uppercase tracking-wider text-muted-foreground">
                  Book Synopsis
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground/90 font-normal">
                  {currentItem.description ||
                    "A thoughtfully selected edition published with premium binding and clear typography. Ideal for literature enthusiasts, students, and avid readers across India."}
                </p>
              </div>

              {/* Action Buttons: Perfectly Balanced Row with Quantity Selector & Buy Now */}
              <div className="space-y-3 pt-2">
                {/* Quantity Selector Row */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Quantity:
                  </span>
                  <div className="flex items-center gap-2 bg-secondary/80 rounded-xl p-1 border border-border">
                    <button
                      type="button"
                      onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                      className="h-7 w-7 rounded-lg bg-card hover:bg-background transition flex items-center justify-center font-bold text-muted-foreground hover:text-foreground border border-border/50 cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-bold font-mono text-foreground">
                      {selectedQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedQty(selectedQty + 1)}
                      className="h-7 w-7 rounded-lg bg-card hover:bg-background transition flex items-center justify-center font-bold text-muted-foreground hover:text-foreground border border-border/50 cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    Total: <strong className="text-foreground font-bold">₹{sellingPrice * selectedQty}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {/* 1. Add to Bag (Gold Button) */}
                  <Button
                    className="col-span-1 h-11 rounded-full gap-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-bold shadow-md hover:shadow-lg transition-all active:scale-95 text-xs cursor-pointer"
                    onClick={() => {
                      addToCart(book, selectedQty);
                      toast.success(`Added ${selectedQty} × "${book.title}" to your bag!`);
                    }}
                  >
                    <ShoppingBag className="h-4 w-4 fill-slate-950" />
                    {inCartQty > 0 ? `In Bag (${inCartQty}) +` : "Add to Bag"}
                  </Button>

                  {/* 2. Buy Now (Express Checkout) */}
                  <Button
                    className="col-span-1 h-11 rounded-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md hover:shadow-lg transition-all active:scale-95 text-xs cursor-pointer"
                    onClick={() => {
                      addToCart(book, selectedQty);
                      onOpenChange(false);
                      setCartOpen(true);
                    }}
                  >
                    <Sparkles className="h-4 w-4" />
                    Buy Now
                  </Button>

                  {/* 3. Wishlist / WhatsApp Buttons */}
                  <div className="col-span-2 sm:col-span-1 flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => toggleWishlist(book)}
                      className={cn(
                        "flex-1 h-11 rounded-full border border-border/80 transition-all font-semibold shrink-0 gap-1.5 hover:border-red-300 cursor-pointer justify-center text-xs",
                        wishlisted
                          ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40"
                          : "text-muted-foreground hover:text-red-500"
                      )}
                      title={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
                    >
                      <Heart className={cn("h-4 w-4", wishlisted && "fill-current text-red-500")} />
                      <span>{wishlisted ? "Saved" : "Save"}</span>
                    </Button>

                    <Button
                      className="h-11 px-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold shadow-md transition cursor-pointer shrink-0"
                      asChild
                      title="Order on WhatsApp"
                    >
                      <a href={whatsappDirectOrder} target="_blank" rel="noreferrer">
                        <MessageCircle className="h-4 w-4 fill-current" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Guarantees Strip */}
              <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/50 pt-2.5 flex-wrap gap-2">
                <span className="flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5 text-amber-600 shrink-0" /> Free delivery over ₹499
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-600 shrink-0" /> 100% Genuine Edition
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-amber-600 shrink-0" /> 24/7 WhatsApp Assistance
                </span>
              </div>
            </div>
          </div>

          {/* Related Books Section */}
          {(() => {
            const related = catalog
              .filter(b => b.category === book.category && b.id !== book.id)
              .slice(0, 4);

            if (related.length === 0) return null;

            return (
              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-foreground">
                    More in {book.category}
                  </h3>
                  <span className="text-[11px] text-muted-foreground">Handpicked for you</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {related.map(rel => (
                    <div
                      key={rel.id}
                      onClick={() => {
                        if (onSelectBook) onSelectBook(rel);
                        else setDetails(rel);
                      }}
                      className="group p-2 rounded-xl border border-border bg-card hover:border-amber-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                    >
                      <div className="aspect-[3/4] rounded-lg overflow-hidden bg-secondary mb-2 relative">
                        <img
                          src={rel.cover || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"}
                          alt={rel.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-display text-xs font-bold text-foreground truncate group-hover:text-amber-600 transition">
                          {rel.title}
                        </h4>
                        <p className="text-[10px] text-muted-foreground truncate">{rel.author}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs font-bold text-primary font-mono">₹{rel.price}</span>
                          <span className="text-[10px] font-semibold text-amber-600">View &rarr;</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Reader Reviews Section */}
          <div className="border-t border-border pt-4 space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-base sm:text-lg text-foreground font-bold">
                  Customer Reviews ({details?.reviews?.length || 0})
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Verified feedback from readers who bought this book.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-amber-700 dark:text-amber-400 font-bold hover:bg-amber-100/40 rounded-full cursor-pointer"
                onClick={() => setShowReviewForm(!showReviewForm)}
              >
                {showReviewForm ? "Cancel Review" : "Write a Review"}
              </Button>
            </div>

            {/* Write Review Form */}
            {showReviewForm && (
              <form
                onSubmit={handleReviewSubmit}
                className="bg-secondary/40 rounded-2xl p-4 space-y-3 border border-border"
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder="e.g. Rahul Sen"
                      className="w-full text-xs h-9 rounded-xl border border-border bg-card px-3 outline-none focus:border-amber-400 shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground block mb-1">
                      Rating
                    </label>
                    <div className="flex items-center gap-1 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewerRating(star)}
                          className="p-1 hover:scale-110 transition cursor-pointer"
                        >
                          <Star
                            className={cn(
                              "h-4.5 w-4.5",
                              star <= reviewerRating
                                ? "fill-amber-400 text-amber-400"
                                : "text-border"
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground block mb-1">
                    Your Thoughts
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={reviewerComment}
                    onChange={(e) => setReviewerComment(e.target.value)}
                    placeholder="Tell other readers what you loved about this book..."
                    className="w-full text-xs rounded-xl border border-border bg-card p-2.5 outline-none focus:border-amber-400 shadow-2xs"
                  />
                </div>
                <div className="text-right">
                  <Button
                    type="submit"
                    size="sm"
                    disabled={submittingReview}
                    className="rounded-full text-xs gap-1.5 bg-primary text-slate-950 font-bold hover:bg-primary/90 cursor-pointer"
                  >
                    <Send className="h-3 w-3" />
                    {submittingReview ? "Submitting..." : "Post Review"}
                  </Button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            {loading ? (
              <p className="text-xs text-muted-foreground py-3 text-center">Loading reviews...</p>
            ) : details?.reviews && details.reviews.length > 0 ? (
              <div className="space-y-2.5 max-h-48 overflow-y-auto pr-2">
                {details.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-card rounded-xl border border-border/80 p-3 text-xs space-y-1 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground">{rev.user_name}</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-3 w-3",
                              i < rev.rating ? "fill-amber-400 text-amber-400" : "text-border"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic py-2">
                No reviews yet. Be the first reader to write one!
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
