import { Heart, ShoppingBag, Trash2, ArrowRight, BookOpen } from "lucide-react";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart";
import { Link } from "@tanstack/react-router";

export function WishlistSheet() {
  const { wishlist, wishlistCount, removeFromWishlist, setWishlistOpen } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (book: any) => {
    addToCart(book, 1);
    removeFromWishlist(book.id);
  };

  return (
    <SheetContent className="flex w-[94vw] flex-col p-0 sm:max-w-md bg-background border-border">
      <SheetHeader className="border-b border-border p-6 pr-12 text-left bg-secondary/30">
        <SheetTitle className="font-display text-2xl flex items-center gap-2">
          <Heart className="h-6 w-6 text-red-500 fill-red-500" />
          My Wishlist
          <span className="text-xs font-normal text-muted-foreground ml-1">
            ({wishlistCount} {wishlistCount === 1 ? "item" : "items"})
          </span>
        </SheetTitle>
        <SheetDescription className="text-xs text-muted-foreground">
          Books you've saved for later. Move them to your bag anytime.
        </SheetDescription>
      </SheetHeader>

      {wishlistCount === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
          <div className="rounded-full bg-secondary/60 p-6 text-muted-foreground mb-4">
            <Heart className="h-10 w-10 text-muted-foreground stroke-[1.5]" />
          </div>
          <h3 className="font-display text-xl font-medium">Your Wishlist is Empty</h3>
          <p className="mt-2 text-xs text-muted-foreground max-w-xs leading-relaxed">
            Explore our curated catalog and tap the heart icon to save your favorite books!
          </p>
          <Button
            onClick={() => setWishlistOpen(false)}
            asChild
            className="mt-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 text-xs font-semibold"
          >
            <Link to="/shop">
              Browse Books
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlist.map((book) => {
            const price = Number(book.price) || 0;
            const mrp = Number(book.mrp || book.old_price || book.oldPrice || price);
            const discount = Number(book.discount_percent) || (mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0);

            return (
              <div
                key={book.id}
                className="flex gap-4 p-3.5 rounded-xl border border-border bg-card/60 hover:bg-card transition shadow-sm group"
              >
                <div className="relative w-20 h-28 flex-shrink-0 overflow-hidden rounded-lg bg-secondary/40 border border-border">
                  <img
                    src={book.cover || book.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"}
                    alt={book.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {discount > 0 && (
                    <span className="absolute top-1 left-1 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    {book.sub_category && (
                      <span className="text-[10px] font-semibold text-primary uppercase tracking-wider block truncate">
                        {book.sub_category}
                      </span>
                    )}
                    <h4 className="font-display text-sm font-bold text-foreground truncate mt-0.5">
                      {book.title}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">
                      by {book.author}
                    </p>

                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="font-bold text-sm text-primary">₹{price}</span>
                      {mrp > price && (
                        <span className="text-xs text-muted-foreground line-through">₹{mrp}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-border/50 mt-2">
                    <Button
                      size="sm"
                      onClick={() => handleMoveToCart(book)}
                      className="flex-1 h-8.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold gap-1.5 whitespace-nowrap shadow-sm"
                    >
                      <ShoppingBag className="h-3.5 w-3.5 shrink-0" />
                      Move to Bag
                    </Button>
                    <button
                      onClick={() => removeFromWishlist(book.id)}
                      className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </SheetContent>
  );
}
