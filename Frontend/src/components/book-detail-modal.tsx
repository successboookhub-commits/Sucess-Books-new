import { useState, useEffect } from "react";
import { Star, MessageCircle, ShoppingBag, Truck, ShieldCheck, Check, Send, Layers, Image as ImageIcon, Heart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
}

export function BookDetailModal({ book, open, onOpenChange }: BookDetailModalProps) {
  const { changeQuantity, cart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [details, setDetails] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<0 | 1>(0);

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
    api.getBook(book.id)
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
        comment: reviewerComment
      });

      toast.success("Review submitted! Thank you for sharing your thoughts.");
      setReviewerName("");
      setReviewerComment("");
      setShowReviewForm(false);

      if (res.data?.reviews) {
        setDetails(prev => prev ? {
          ...prev,
          rating: res.data.newRating,
          reviewsCount: res.data.reviewsCount,
          reviews: res.data.reviews
        } : null);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit review";
      toast.error(msg);
    } finally {
      setSubmittingReview(false);
    }
  };

  const whatsappDirectOrder = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Success Book Hub! I want to order:\n\n• ${book.title} by ${book.author} — ₹${book.price}\n\nPlease confirm delivery time and UPI payment details.`
  )}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl p-0 border-border bg-card">
        <DialogHeader className="p-5 sm:p-6 pb-0 border-b border-border/60">
          <DialogTitle className="font-display text-xl sm:text-2xl text-primary flex items-center justify-between gap-3">
            <span>Book Overview</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-secondary text-primary border border-primary/20">
                {book.category}
              </span>
              {subCategoryName && (
                <span className="text-xs font-sans font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                  {subCategoryName}
                </span>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="p-5 sm:p-6 space-y-6">
          <div className="grid sm:grid-cols-[200px_minmax(0,1fr)] gap-6 items-start">
            {/* Gallery Frame & Thumbnails */}
            <div className="space-y-3">
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-border shadow-md bg-secondary/30">
                {/* Discount Tag */}
                {discountPercent > 0 && (
                  <span className="absolute top-2.5 left-2.5 z-10 rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-md">
                    {discountPercent}% OFF
                  </span>
                )}

                {book.label && !book.label.includes("%") && (
                  <span className="absolute top-2.5 right-2.5 z-10 rounded-md bg-background/95 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold uppercase text-primary shadow-xs border border-border">
                    {book.label}
                  </span>
                )}

                {isActiveImgUrl ? (
                  <img
                    src={activeImageUrl}
                    alt={book.title}
                    className="w-full h-full object-cover transition duration-300"
                  />
                ) : (
                  <div className={cn("flex h-full flex-col justify-between p-4 text-primary-foreground border-l-8 border-background/30", book.cover || "bg-primary")}>
                    <div className="border border-primary-foreground/20 p-2 h-full flex flex-col justify-between rounded-sm">
                      <div>
                        <p className="text-[8px] uppercase tracking-widest opacity-70">Success Book Hub</p>
                        <p className="mt-3 font-display text-base leading-tight font-bold">{book.title}</p>
                      </div>
                      <p className="text-[10px] opacity-80">{book.author}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* 2-Image Thumbnails if available */}
              {isImage2 && (
                <div className="flex items-center gap-2 justify-center">
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex(0)}
                    className={cn(
                      "h-12 w-12 rounded-lg border-2 overflow-hidden transition p-0.5",
                      activeImageIndex === 0 ? "border-primary ring-2 ring-primary/20" : "border-border opacity-70 hover:opacity-100"
                    )}
                  >
                    {isImage1 ? (
                      <img src={image1} alt="Cover 1" className="w-full h-full object-cover rounded-md" />
                    ) : (
                      <div className="w-full h-full bg-primary flex items-center justify-center text-[9px] text-white font-bold">1</div>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveImageIndex(1)}
                    className={cn(
                      "h-12 w-12 rounded-lg border-2 overflow-hidden transition p-0.5",
                      activeImageIndex === 1 ? "border-primary ring-2 ring-primary/20" : "border-border opacity-70 hover:opacity-100"
                    )}
                  >
                    <img src={image2} alt="Cover 2" className="w-full h-full object-cover rounded-md" />
                  </button>
                </div>
              )}
            </div>

            {/* Book Info */}
            <div className="space-y-3.5">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-tight">{book.title}</h2>
                <p className="text-sm font-medium text-muted-foreground mt-1">by <strong className="text-foreground font-semibold">{book.author}</strong></p>
              </div>

              <div className="flex items-center gap-3 text-sm flex-wrap">
                <div className="flex items-center gap-1 font-bold text-foreground">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span>{currentItem.rating || 4.5}</span>
                </div>
                <span className="text-muted-foreground/50">•</span>
                <span className="text-xs text-muted-foreground">
                  {currentItem.reviewsCount || currentItem.reviews?.length || 0} reader reviews
                </span>
                <span className="text-muted-foreground/50">•</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  In Stock ({currentItem.stock ?? 30} copies)
                </span>
              </div>

              {/* Price Breakdown with MRP and Savings */}
              <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/80 space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl font-extrabold text-primary">₹{sellingPrice}</span>
                  {mrp && mrp > sellingPrice && (
                    <span className="text-base text-muted-foreground line-through">₹{mrp}</span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>

                {savings > 0 && (
                  <p className="text-xs font-bold text-emerald-600">
                    You save ₹{savings} ({discountPercent}% discount off MRP)
                  </p>
                )}
              </div>

              {/* Synopsis */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Book Description</h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {currentItem.description || "A thoughtfully selected edition published with premium binding and clear typography. Ideal for literature enthusiasts, students, and avid readers across India."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-2.5">
                <Button
                  className="rounded-full flex-1 gap-2 h-11 bg-primary text-primary-foreground font-semibold shadow-md hover:bg-primary/90"
                  onClick={() => {
                    changeQuantity(book.id, 1, book);
                    toast.success(`"${book.title}" added to your bag!`);
                  }}
                >
                  <ShoppingBag className="h-4 w-4" />
                  {inCartQty > 0 ? `In Bag (${inCartQty}) + Add More` : "Add to Bag"}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => toggleWishlist(book)}
                  className={cn(
                    "rounded-full h-11 px-4 gap-1.5 transition font-semibold",
                    wishlisted
                      ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40 dark:border-red-900"
                      : "text-muted-foreground hover:text-red-500"
                  )}
                  title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart className={cn("h-4 w-4", wishlisted && "fill-current text-red-500")} />
                  <span className="hidden sm:inline">{wishlisted ? "Wishlisted" : "Wishlist"}</span>
                </Button>

                <Button
                  variant="outline"
                  className="rounded-full flex-1 gap-2 h-11 bg-emerald-600/10 border-emerald-600/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition font-semibold"
                  asChild
                >
                  <a href={whatsappDirectOrder} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    Buy on WhatsApp
                  </a>
                </Button>
              </div>

              {/* Guarantees */}
              <div className="pt-1 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5 text-primary" /> Free delivery over ₹499</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> 100% Genuine Edition</span>
              </div>
            </div>
          </div>

          {/* Reader Reviews Section */}
          <div className="border-t border-border pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg text-foreground font-semibold">
                Customer Reviews ({details?.reviews?.length || 0})
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-primary hover:bg-secondary rounded-full"
                onClick={() => setShowReviewForm(!showReviewForm)}
              >
                {showReviewForm ? "Cancel Review" : "Write a Review"}
              </Button>
            </div>

            {/* Write Review Form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="bg-secondary/50 rounded-xl p-4 space-y-3 border border-border">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder="e.g. Rahul Sen"
                      className="w-full text-xs h-9 rounded-md border border-border bg-card px-3 outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground block mb-1">Rating</label>
                    <div className="flex items-center gap-1 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewerRating(star)}
                          className="p-1 hover:scale-110 transition"
                        >
                          <Star className={cn("h-5 w-5", star <= reviewerRating ? "fill-amber-400 text-amber-400" : "text-border")} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground block mb-1">Your Thoughts</label>
                  <textarea
                    required
                    rows={2}
                    value={reviewerComment}
                    onChange={(e) => setReviewerComment(e.target.value)}
                    placeholder="Tell other readers what you loved about this book..."
                    className="w-full text-xs rounded-md border border-border bg-card p-2 outline-none focus:border-primary"
                  />
                </div>
                <div className="text-right">
                  <Button type="submit" size="sm" disabled={submittingReview} className="rounded-full text-xs gap-1.5">
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
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {details.reviews.map((rev) => (
                  <div key={rev.id} className="bg-card rounded-md border border-border/80 p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground">{rev.user_name}</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={cn("h-3 w-3", i < rev.rating ? "fill-amber-400 text-amber-400" : "text-border")} />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic py-2">No reviews yet. Be the first reader to write one!</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
