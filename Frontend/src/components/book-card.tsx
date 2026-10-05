import { useState } from "react";
import { Plus, Star, Eye, Layers, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import type { Book } from "@/lib/books";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { BookDetailModal } from "./book-detail-modal";

export function BookCard({ book }: { book: Book }) {
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
        className="group min-w-0 cursor-pointer text-left focus-visible:outline-none flex flex-col justify-between"
      >
        {/* Book Cover / Image Frame */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-border/70 bg-secondary/30 shadow-xs transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl select-none">
          {/* Discount Badge */}
          {discountPercent > 0 && (
            <span className="absolute left-2.5 top-2.5 z-10 rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-md">
              {discountPercent}% OFF
            </span>
          )}

          {/* Wishlist Heart Button */}
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={cn(
              "absolute right-2.5 top-2.5 z-20 rounded-full p-1.5 backdrop-blur-md transition shadow-md",
              wishlisted
                ? "bg-red-500/90 text-white hover:bg-red-600"
                : "bg-background/80 text-muted-foreground hover:text-red-500 hover:bg-background"
            )}
            title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-label="Wishlist toggle"
          >
            <Heart className={cn("h-3.5 w-3.5 transition-transform active:scale-125", wishlisted && "fill-current")} />
          </button>

          {/* Custom Label (e.g. Bestseller / New) */}
          {book.label && !book.label.includes("%") && (
            <span className="absolute right-2.5 bottom-2.5 z-10 rounded-md bg-background/95 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary shadow-xs border border-border">
              {book.label}
            </span>
          )}

          {/* 2-Image Indicator Badge */}
          {hasSecondImage && !book.label && (
            <span className="absolute bottom-2.5 right-2.5 z-10 rounded-full bg-background/90 backdrop-blur-xs p-1 text-muted-foreground shadow-xs group-hover:text-primary transition" title="2 Views Available">
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
            <div className={cn("flex h-full flex-col justify-between p-4 text-primary-foreground border-l-8 border-background/30", book.cover || "bg-primary")}>
              <div className="border border-primary-foreground/25 p-3 h-full flex flex-col justify-between rounded-sm">
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-wider opacity-60">Success Book Hub</p>
                  <p className="mt-3 font-display text-lg leading-tight font-bold">{book.title}</p>
                </div>
                <p className="text-[10px] opacity-80">{book.author}</p>
              </div>
            </div>
          )}

          {/* Quick Preview Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-background text-foreground text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Eye className="h-3.5 w-3.5 text-primary" /> Quick View
            </span>
          </div>
        </div>

        {/* Book Details */}
        <div className="pt-3 flex flex-col flex-1 justify-between">
          <div>
            {/* Category & SubCategory */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary truncate max-w-[120px]">
                {book.category}
              </span>
              {subCategoryName && (
                <>
                  <span className="text-muted-foreground/40 text-[9px]">&bull;</span>
                  <span className="text-[10px] font-medium text-muted-foreground truncate max-w-[130px]">
                    {subCategoryName}
                  </span>
                </>
              )}
            </div>

            {/* Title & Author */}
            <h3 className="mt-1 font-display text-sm sm:text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate">{book.author}</p>

            {/* Rating */}
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="font-bold text-foreground text-xs">{book.rating || 4.5}</span>
              {book.reviewsCount ? <span className="text-[10px]">({book.reviewsCount})</span> : null}
            </div>
          </div>

          {/* Price & Add to Bag */}
          <div className="mt-2.5 pt-2 border-t border-border/50 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-base text-primary font-display">₹{sellingPrice}</span>
                {mrp && mrp > sellingPrice && (
                  <span className="text-xs text-muted-foreground line-through">₹{mrp}</span>
                )}
              </div>
            </div>

            <Button
              size="icon"
              className="shrink-0 rounded-full h-8 w-8 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
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
