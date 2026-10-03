import { useState, useEffect } from "react";
import { Star, MessageCircle, ShoppingBag, Truck, ShieldCheck, Check, Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
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
  const [details, setDetails] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(false);

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
  const discount = currentItem.oldPrice
    ? Math.round(((currentItem.oldPrice - currentItem.price) / currentItem.oldPrice) * 100)
    : 0;

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
    `Hello Success Book Hub! I want to order:\n\n• ${book.title} by ${book.author} — ₹${book.price}\n\nPlease let me know delivery time and UPI details.`
  )}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl p-0">
        <DialogHeader className="p-6 pb-0 border-b border-border/50">
          <DialogTitle className="font-display text-2xl text-primary flex items-center justify-between">
            <span>Book Overview</span>
            <span className="text-xs font-sans font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary text-primary">
              {book.category}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="grid sm:grid-cols-[180px_minmax(0,1fr)] gap-6 items-start">
            {/* Cover Spine */}
            <div className={cn(
              "relative aspect-[3/4] w-full rounded-md p-4 text-primary-foreground shadow-md flex flex-col justify-between border-l-8 border-background/20",
              book.cover
            )}>
              {book.label && (
                <span className="absolute top-2 right-2 bg-background/90 text-primary text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shadow-sm">
                  {book.label}
                </span>
              )}
              <div className="border border-primary-foreground/20 p-2 h-full flex flex-col justify-between rounded-sm">
                <div>
                  <p className="text-[8px] uppercase tracking-widest opacity-70">Success Book Hub</p>
                  <p className="mt-3 font-display text-lg leading-tight">{book.title}</p>
                </div>
                <p className="text-[10px] opacity-80">{book.author}</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">{book.title}</h2>
                <p className="text-sm font-medium text-muted-foreground mt-0.5">by <span className="text-foreground">{book.author}</span></p>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1 font-bold text-foreground">
                  <Star className="h-4 w-4 fill-gold text-gold" />
                  <span>{currentItem.rating}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {currentItem.reviewsCount || currentItem.reviews?.length || 0} reader reviews
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  In Stock ({currentItem.stock ?? 30} copies)
                </span>
              </div>

              <div className="flex items-baseline gap-3 pt-2">
                <span className="font-display text-3xl font-bold text-primary">₹{book.price}</span>
                {book.oldPrice && (
                  <>
                    <span className="text-sm text-muted-foreground line-through">₹{book.oldPrice}</span>
                    <span className="text-xs font-bold text-emerald-600">({discount}% off)</span>
                  </>
                )}
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground pt-1">
                {currentItem.description || "A curated literary work selected for its timeless prose and engaging storytelling. Available with doorstep delivery across India."}
              </p>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap gap-2.5">
                <Button
                  className="rounded-full flex-1 gap-2 h-11"
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
                  className="rounded-full flex-1 gap-2 h-11 bg-whatsapp/10 border-whatsapp/30 text-whatsapp hover:bg-whatsapp hover:text-white transition"
                  asChild
                >
                  <a href={whatsappDirectOrder} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    Buy on WhatsApp
                  </a>
                </Button>
              </div>

              {/* Guarantees */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5 text-primary" /> Free delivery over ₹799</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Verified Original Print</span>
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
              <form onSubmit={handleReviewSubmit} className="bg-secondary/50 rounded-lg p-4 space-y-3 border border-border">
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
                          <Star className={cn("h-5 w-5", star <= reviewerRating ? "fill-gold text-gold" : "text-border")} />
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
                          <Star key={i} className={cn("h-3 w-3", i < rev.rating ? "fill-gold text-gold" : "text-border")} />
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
