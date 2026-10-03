import { useState } from "react";
import { ChevronRight, Minus, Plus, ShoppingBag, X, ArrowLeft, CheckCircle2, MessageCircle, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function CartSheet() {
  const { cartBooks, cart, subtotal, deliveryFee, total, orderUrl, changeQuantity, clearCart, setCartOpen } = useCart();
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");

  // Checkout Form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Success state
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const [placedWhatsappUrl, setPlacedWhatsappUrl] = useState<string | null>(null);
  const [placedTotal, setPlacedTotal] = useState<number>(0);

  const freeDeliveryThreshold = 799;
  const awayFromFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const deliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error("Please fill in your name, phone number, and delivery address.");
      return;
    }

    setSubmitting(true);
    try {
      const itemsPayload = cartBooks.map(b => ({
        id: b.id,
        title: b.title,
        price: b.price,
        quantity: b.quantity
      }));

      const res = await api.createOrder({
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        deliveryAddress: address,
        city,
        pincode,
        items: itemsPayload,
        subtotal,
        deliveryFee,
        paymentMethod,
        orderNotes: notes
      });

      setPlacedOrderId(res.orderId);
      setPlacedWhatsappUrl(res.whatsappUrl);
      setPlacedTotal(res.total || total);
      setStep("success");
      clearCart();
      toast.success(`Order #${res.orderId} booked successfully!`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setCartOpen(false);
    setTimeout(() => {
      setStep("cart");
    }, 300);
  };

  return (
    <SheetContent className="flex w-[94vw] flex-col p-0 sm:max-w-md">
      <SheetHeader className="border-b border-border p-6 pr-12 text-left">
        <SheetTitle className="font-display text-2xl flex items-center gap-2">
          {step === "checkout" && (
            <button
              onClick={() => setStep("cart")}
              className="p-1 rounded-full hover:bg-secondary transition mr-1"
              aria-label="Back to bag"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          {step === "success" ? "Order Confirmed!" : step === "checkout" ? "Delivery Details" : "Your Book Bag"}
        </SheetTitle>
        <SheetDescription>
          {step === "success"
            ? "Your order is recorded in our system."
            : step === "checkout"
            ? "Enter your address for fast doorstep delivery."
            : cartBooks.length
            ? `${cartBooks.length} title${cartBooks.length === 1 ? "" : "s"} selected`
            : "Your next great read is waiting."}
        </SheetDescription>
      </SheetHeader>

      {step === "success" ? (
        <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between text-center space-y-6">
          <div className="pt-6 space-y-4">
            <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground">Thank you, {name}!</h3>
              <p className="text-xs text-muted-foreground mt-1">We're preparing your book parcel with utmost care.</p>
            </div>

            <div className="bg-secondary/60 border border-border rounded-xl p-4 text-xs space-y-1 text-left">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-display font-bold text-sm text-primary tracking-wider">{placedOrderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full text-[10px] uppercase">
                  Pending Confirmation
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment:</span>
                <span className="font-medium text-foreground">{paymentMethod}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-1 font-bold">
                <span>Total Amount:</span>
                <span className="text-primary font-display text-sm">₹{placedTotal}</span>
              </div>
            </div>

            {placedWhatsappUrl && (
              <Button asChild className="w-full h-12 rounded-full bg-whatsapp hover:bg-whatsapp/90 text-sm gap-2">
                <a href={placedWhatsappUrl} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" /> Send Confirmation on WhatsApp
                </a>
              </Button>
            )}

            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Keep your Order ID <strong>{placedOrderId}</strong> handy to track live delivery progress using the "Track Order" button.
            </p>
          </div>

          <Button variant="outline" className="w-full rounded-full" onClick={handleClose}>
            Done & Continue Browsing
          </Button>
        </div>
      ) : step === "checkout" ? (
        <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col justify-between overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
            <div>
              <label className="font-bold text-foreground block mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full h-10 rounded-md border border-border bg-card px-3 text-xs outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-foreground block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full h-10 rounded-md border border-border bg-card px-3 text-xs outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="font-bold text-foreground block mb-1">Email (Optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="priya@example.com"
                  className="w-full h-10 rounded-md border border-border bg-card px-3 text-xs outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-foreground block mb-1">Delivery Address *</label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House/Flat No., Street, Landmark"
                className="w-full rounded-md border border-border bg-card p-2.5 text-xs outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-foreground block mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Kolkata / Mumbai"
                  className="w-full h-10 rounded-md border border-border bg-card px-3 text-xs outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="font-bold text-foreground block mb-1">PIN Code</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="e.g. 700073"
                  className="w-full h-10 rounded-md border border-border bg-card px-3 text-xs outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-foreground block mb-1">Payment Method</label>
              <div className="grid grid-cols-2 gap-2">
                {["Cash on Delivery", "UPI / QR Pay", "WhatsApp Order"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={cn(
                      "p-2.5 rounded-lg border text-left font-semibold transition text-[11px]",
                      paymentMethod === method
                        ? "border-primary bg-secondary text-primary"
                        : "border-border bg-card text-muted-foreground"
                    )}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-bold text-foreground block mb-1">Special Delivery Notes (Optional)</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Please wrap with a gift note"
                className="w-full h-9 rounded-md border border-border bg-card px-3 text-xs outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="border-t border-border bg-secondary/30 p-5 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Items Total ({cartBooks.length}):</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping:</span>
                <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between font-display text-base font-bold text-foreground border-t border-border pt-1">
                <span>Payable Amount:</span>
                <span className="text-primary text-xl">₹{total}</span>
              </div>
            </div>

            <Button type="submit" disabled={submitting} className="h-12 w-full rounded-full font-bold">
              {submitting ? "Processing Order..." : `Place Order (₹${total})`}
            </Button>
          </div>
        </form>
      ) : cartBooks.length ? (
        <>
          {/* Free Delivery Bar */}
          <div className="px-6 py-2.5 bg-secondary/50 border-b border-border text-xs flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <span className="flex items-center gap-1 text-primary">
                <Truck className="h-3.5 w-3.5" />
                {awayFromFreeDelivery === 0
                  ? "You unlocked FREE Pan-India delivery!"
                  : `Add ₹${awayFromFreeDelivery} more for FREE delivery`}
              </span>
              <span className="text-muted-foreground">{deliveryProgress}%</span>
            </div>
            <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${deliveryProgress}%` }} />
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {cartBooks.map((book) => (
              <div key={book.id} className="grid grid-cols-[64px_minmax(0,1fr)] gap-4 border-b border-border/50 pb-4 last:border-b-0">
                <div className={cn("grid aspect-[3/4] place-items-center rounded-sm p-2 text-center font-display text-xs text-primary-foreground", book.cover)}>
                  {book.title}
                </div>
                <div className="min-w-0 flex flex-col justify-between">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-display text-base font-semibold">{book.title}</p>
                      <p className="text-xs text-muted-foreground">₹{book.price}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => changeQuantity(book.id, -(cart[book.id] ?? 0))}
                      aria-label={`Remove ${book.title}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={() => changeQuantity(book.id, -1)} aria-label="Decrease quantity">
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-7 text-center text-xs font-bold">{cart[book.id]}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={() => changeQuantity(book.id, 1)} aria-label="Increase quantity">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="font-bold text-xs text-primary">₹{book.price * (cart[book.id] ?? 1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Footer */}
          <div className="border-t border-border bg-secondary/30 p-6 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-semibold text-foreground">₹{subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Delivery</span>
                <span className="font-semibold text-foreground">{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-border font-bold text-foreground">
                <span>Total Amount</span>
                <strong className="font-display text-2xl text-primary">₹{total}</strong>
              </div>
            </div>

            <Button className="h-12 w-full rounded-full gap-2 font-bold" onClick={() => setStep("checkout")}>
              Proceed to Checkout <ChevronRight className="h-4 w-4" />
            </Button>

            <Button asChild variant="outline" className="h-11 w-full rounded-full border-whatsapp/40 text-whatsapp hover:bg-whatsapp hover:text-white transition gap-2 text-xs font-bold">
              <a href={orderUrl} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" /> Order Directly on WhatsApp
              </a>
            </Button>
          </div>
        </>
      ) : (
        <div className="grid flex-1 place-items-center p-8 text-center">
          <div>
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground opacity-60" />
            <p className="mt-4 font-display text-2xl font-bold">Your bag is empty</p>
            <p className="mt-2 text-xs text-muted-foreground">Browse our curated collection and add books to start reading.</p>
          </div>
        </div>
      )}
    </SheetContent>
  );
}
