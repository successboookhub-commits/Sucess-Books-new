import { Heart, ShoppingBag, Trash2, ArrowRight, User, LogIn } from "lucide-react";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart";
import { useUserAuth } from "@/lib/user-auth";
import { Link } from "@tanstack/react-router";

export function WishlistSheet() {
  const { wishlist, wishlistCount, removeFromWishlist, setWishlistOpen } = useWishlist();
  const { isAuthenticated, openLoginModal } = useUserAuth();
  const { addToCart } = useCart();

  const handleMoveToCart = (book: any) => {
    addToCart(book, 1);
    removeFromWishlist(book.id);
  };

  return (
    <SheetContent className="flex w-[94vw] flex-col p-0 sm:max-w-md bg-background border-border shadow-2xl">
      <SheetHeader className="border-b border-border/80 p-5 pr-12 text-left bg-gradient-to-b from-secondary/40 to-background/60 backdrop-blur-sm">
        <SheetTitle className="font-serif text-xl font-bold flex items-center gap-2 text-foreground">
          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
          My Wishlist
          {isAuthenticated && (
            <span className="text-xs font-mono text-muted-foreground ml-1">
              ({wishlistCount} {wishlistCount === 1 ? "book" : "books"})
            </span>
          )}
        </SheetTitle>
        <SheetDescription className="text-xs text-muted-foreground flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
          {isAuthenticated
            ? "Books you've saved for later. Move them to your bag anytime."
            : "Sign in to save books and sync your wishlist across all your devices."}
        </SheetDescription>
      </SheetHeader>

      {!isAuthenticated ? (
        <div className="flex flex-1 flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="rounded-2xl bg-amber-500/10 p-5 text-amber-600 mb-1 border border-amber-300/40 shadow-inner">
            <Heart className="h-10 w-10 text-amber-600 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-xl font-bold text-foreground">Sign In to Save Your Wishlist</h3>
          <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
            Your wishlist is saved to your account. Sign in with email & OTP to keep track of books you want to read.
          </p>
          <div className="pt-2 w-full max-w-xs space-y-2">
            <Button
              onClick={() => {
                setWishlistOpen(false);
                openLoginModal();
              }}
              className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground py-5 text-xs font-bold gap-2 shadow-md btn-shimmer cursor-pointer"
            >
              <LogIn className="h-4 w-4" />
              Sign In with Email & OTP
            </Button>
            <Button
              variant="outline"
              onClick={() => setWishlistOpen(false)}
              asChild
              className="w-full rounded-full border-border text-xs font-semibold cursor-pointer"
            >
              <Link to="/shop">Browse Catalog</Link>
            </Button>
          </div>
        </div>
      ) : wishlistCount === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
          <div className="rounded-2xl bg-secondary/60 p-6 text-muted-foreground mb-4 border border-border/60 shadow-inner">
            <Heart className="h-10 w-10 text-amber-600/60 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-foreground">Your Wishlist is Empty</h3>
          <p className="mt-2 text-xs text-muted-foreground max-w-xs leading-relaxed">
            Explore our curated catalog and tap the heart icon on any book to save it here!
          </p>
          <Button
            onClick={() => setWishlistOpen(false)}
            asChild
            className="mt-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-2.5 text-xs font-semibold shadow-md btn-shimmer cursor-pointer"
          >
            <Link to="/shop">
              Browse Books
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 divide-y divide-border/30">
          {wishlist.map((book) => {
            const price = Number(book.price) || 0;
            const mrp = Number(book.mrp || book.old_price || book.oldPrice || price);
            const discount = Number(book.discount_percent) || (mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0);

            return (
              <div
                key={book.id}
                className="flex gap-3.5 pt-3.5 first:pt-0 group transition"
              >
                <div className="relative w-18 h-25 shrink-0 rounded-md overflow-hidden book-edge-shadow bg-secondary/40 border border-border/80">
                  <img
                    src={book.cover || book.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"}
                    alt={book.title}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop";
                    }}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="book-spine-overlay absolute inset-0 pointer-events-none" />
                  {discount > 0 && (
                    <span className="absolute top-1 left-1 bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs font-mono">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    {book.sub_category && (
                      <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest block truncate">
                        {book.sub_category}
                      </span>
                    )}
                    <h4 className="font-serif text-sm font-bold text-foreground leading-snug line-clamp-2 mt-0.5">
                      {book.title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                      by {book.author}
                    </p>

                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-bold text-sm text-foreground font-mono">₹{price}</span>
                      {mrp > price && (
                        <span className="text-[11px] text-muted-foreground line-through font-mono">₹{mrp}</span>
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
