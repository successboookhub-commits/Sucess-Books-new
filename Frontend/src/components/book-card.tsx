import { useState } from "react";
import { Plus, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import type { Book } from "@/lib/books";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { BookDetailModal } from "./book-detail-modal";

export function BookCard({ book }: { book: Book }) {
  const { changeQuantity } = useCart();
  const [modalOpen, setModalOpen] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    changeQuantity(book.id, 1, book);
    toast.success(`Added "${book.title}" to bag!`);
  };

  return (
    <>
      <article
        onClick={() => setModalOpen(true)}
        className="group min-w-0 cursor-pointer text-left focus-visible:outline-none"
      >
        <div
          className={cn(
            "relative aspect-[3/4] overflow-hidden rounded-sm border-l-8 border-background/20 p-4 text-primary-foreground shadow-sm transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl sm:p-6 select-none",
            book.cover
          )}
        >
          {book.label && (
            <span className="absolute right-2 top-2 rounded-full bg-background px-2.5 py-1 text-[9px] font-bold uppercase text-primary sm:right-3 sm:top-3 shadow-sm">
              {book.label}
            </span>
          )}

          <div className="flex h-full flex-col justify-between border border-primary-foreground/25 p-3 rounded-sm">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-wider opacity-60 sm:text-[10px]">Success Book Hub</p>
              <p className="mt-4 font-display text-xl leading-tight sm:text-2xl">{book.title}</p>
            </div>
            <p className="text-[9px] opacity-75 sm:text-[10px]">{book.author}</p>
          </div>

          {/* Quick Preview Hover Overlay */}
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-background/90 text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <Eye className="h-3.5 w-3.5" /> Quick View
            </span>
          </div>
        </div>

        <div className="pt-3.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-primary">{book.category}</p>
          <h3 className="mt-1 truncate font-display text-base sm:text-lg text-foreground font-semibold group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          <p className="truncate text-xs text-muted-foreground">{book.author}</p>

          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-gold text-gold" />
            <span className="font-semibold text-foreground">{book.rating}</span>
            {book.reviewsCount ? <span className="text-[10px]">({book.reviewsCount})</span> : null}
          </div>

          <div className="mt-2.5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
            <div className="min-w-0">
              <span className="font-bold text-base text-primary">₹{book.price}</span>
              {book.oldPrice && (
                <span className="ml-2 text-xs text-muted-foreground line-through">₹{book.oldPrice}</span>
              )}
            </div>
            <Button
              size="icon"
              className="shrink-0 rounded-full h-8 w-8"
              onClick={handleAdd}
              aria-label={`Add ${book.title} to bag`}
              title="Add to bag"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </article>

      {/* Book Quick View / Detail Modal */}
      <BookDetailModal book={book} open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
