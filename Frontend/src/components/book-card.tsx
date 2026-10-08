import { useState } from "react";
import { Plus, Star, Eye, Layers, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import type { Book } from "@/lib/books";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { BookDetailModal } from "./book-detail-modal";

export function BookCard({ book, compact = false }: { book: Book; compact?: boolean }) {
  const { changeQuantity } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [modalOpen, setModalOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const wishlisted = isWishlisted(book.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    changeQuantity(book.id, 1, book);
    toast.success(`Added "${book.title}" to bag!`);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(book);
  };

  const isImageCover = book.cover && (book.cover.startsWith("http") || book.cover.startsWith("/"));
  const hasSecondImage = book.image2 && (book.image2.startsWith("http") || book.image2.startsWith("/"));

  const mrp = book.oldPrice || book.old_price;
  const sellingPrice = book.price;
  const discountPercent =
    book.discountPercent ||
    book.discount_percent ||
    (mrp && mrp > sellingPrice ? Math.round(((mrp - sellingPrice) / mrp) * 100) : 0);

  const subCategoryName = book.subCategory || book.sub_category;

  return (
    <>
      <article
        onClick={() => setModalOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "group min-w-0 cursor-pointer text-left focus-visible:outline-none flex flex-col justify-between book-card-hover rounded-2xl bg-card border border-border/80 shadow-xs hover:border-amber-400/80 transition-all",
          compact ? "p-2 sm:p-2.5 lg:p-2" : "p-2 sm:p-2.5"
        )}
      >
        {/* Book Cover / Image Frame */}
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-xl border border-border/80 bg-secondary/30 shadow-xs transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:border-amber-300/80 select-none",
            compact ? "aspect-[3/4] lg:aspect-[4/5]" : "aspect-[3/4]"
          )}
        >
          {/* Discount Badge */}
          {discountPercent > 0 && (
            <span className="absolute left-2 top-2 z-10 rounded-md bg-gradient-to-r from-amber-400 to-yellow-400 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wide text-slate-950 shadow-xs border border-amber-300/60">
              {discountPercent}% OFF
            </span>
          )}

          {/* Wishlist Heart Button */}
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={cn(
              "absolute right-2 top-2 z-20 rounded-full p-1 sm:p-1.5 backdrop-blur-md transition shadow-xs",
              wishlisted
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-background/90 text-muted-foreground hover:text-red-500 hover:bg-background border border-border/60"
            )}
            title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-label="Wishlist toggle"
          >
            <Heart className={cn("h-3 sm:h-3.5 w-3 sm:w-3.5 transition-transform active:scale-125", wishlisted && "fill-current")} />
          </button>

          {/* Custom Label (e.g. Bestseller / New) */}
          {book.label && !book.label.includes("%") && (
            <span className="absolute right-2 bottom-2 z-10 rounded-md bg-background/95 backdrop-blur-xs px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300 shadow-2xs border border-border">
              {book.label}
            </span>
          )}

          {/* 2-Image Indicator Badge */}
          {hasSecondImage && !book.label && (
            <span className="absolute bottom-2 right-2 z-10 rounded-full bg-background/90 backdrop-blur-xs p-1 text-muted-foreground shadow-2xs group-hover:text-amber-600 transition" title="2 Views Available">
              <Layers className="h-3 w-3" />
            </span>
          )}

          {/* Image Display / Stylized Book Cover */}
          {isImageCover ? (
            <div className="relative h-full w-full overflow-hidden">
              <img
                src={hovered && hasSecondImage ? (book.image2 || book.image_2) : book.cover}
                alt={book.title}
                loading="lazy"
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
              />
            </div>
          ) : (
            /* Fallback Stylized Cover Spine */
            <div className={cn("flex h-full flex-col justify-between p-3 sm:p-4 text-primary-foreground border-l-6 sm:border-l-8 border-amber-600", book.cover || "bg-primary")}>
              <div className="border border-primary-foreground/25 p-2 sm:p-3 h-full flex flex-col justify-between rounded-sm">
                <div>
                  <p className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider opacity-60">Success Book Hub</p>
                  <p className={cn("font-display leading-tight font-bold", compact ? "mt-1.5 sm:mt-3 text-sm sm:text-base lg:text-sm" : "mt-3 text-base sm:text-lg")}>{book.title}</p>
                </div>
                <p className="text-[9px] sm:text-[10px] opacity-80 truncate">{book.author}</p>
              </div>
            </div>
          )}

          {/* Quick Preview Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-background text-foreground text-[10px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Eye className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-amber-600" /> Quick View
            </span>
          </div>
        </div>

        {/* Book Details */}
        <div className={cn("flex flex-col flex-1 justify-between", compact ? "pt-2 sm:pt-3 lg:pt-1.5" : "pt-3")}>
          <div>
            {/* Category & SubCategory */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={cn("font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 truncate max-w-[120px]", compact ? "text-[9px] sm:text-[10px]" : "text-[10px]")}>
                {book.category}
              </span>
              {subCategoryName && (
                <>
                  <span className="text-muted-foreground/40 text-[9px]">&bull;</span>
                  <span className={cn("font-medium text-muted-foreground truncate max-w-[110px]", compact ? "text-[9px] sm:text-[10px]" : "text-[10px]")}>
                    {subCategoryName}
                  </span>
                </>
              )}
            </div>

            {/* Title & Author */}
            <h3 className={cn("font-bold text-foreground line-clamp-1 group-hover:text-amber-600 transition-colors", compact ? "mt-0.5 sm:mt-1 text-xs sm:text-sm" : "mt-1 text-sm sm:text-base")}>
              {book.title}
            </h3>
            <p className={cn("text-muted-foreground truncate font-medium", compact ? "text-[11px] sm:text-xs" : "text-xs")}>{book.author}</p>

            {/* Rating */}
            <div className={cn("flex items-center gap-1 text-muted-foreground", compact ? "mt-0.5 sm:mt-1 text-[11px] sm:text-xs" : "mt-1 text-xs")}>
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="font-bold text-foreground text-xs">{book.rating || 4.5}</span>
              {book.reviewsCount ? <span className="text-[10px] text-muted-foreground">({book.reviewsCount})</span> : null}
            </div>
          </div>

          {/* Price & Add to Bag */}
          <div className="border-t border-border/60 flex items-center justify-between gap-1.5 mt-2 pt-2">
            <div className="min-w-0">
              <div className="flex items-baseline gap-1.5 font-sans">
                <span className={cn("font-sans font-extrabold text-amber-600 dark:text-amber-400 tracking-tight", compact ? "text-sm sm:text-base" : "text-base sm:text-lg")}>
                  ₹{sellingPrice}
                </span>
                {mrp && mrp > sellingPrice && (
                  <span className={cn("font-sans font-medium text-slate-400 dark:text-slate-500 line-through", compact ? "text-[11px] sm:text-xs" : "text-xs")}>
                    ₹{mrp}
                  </span>
                )}
              </div>
            </div>

            <Button
              size="icon"
              className={cn("shrink-0 rounded-full bg-primary text-slate-950 hover:bg-primary/90 shadow-xs font-bold active:scale-90 transition-transform cursor-pointer", compact ? "h-7.5 w-7.5 sm:h-8 sm:w-8" : "h-8 w-8")}
              onClick={handleAdd}
              aria-label={`Add ${book.title} to bag`}
              title="Add to bag"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </article>

      {/* Book Detail Modal */}
      <BookDetailModal book={book} open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
