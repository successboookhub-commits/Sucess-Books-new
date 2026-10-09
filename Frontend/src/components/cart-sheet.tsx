import { useState, useEffect } from "react";
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  X,
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  Truck,
  MapPin,
  PlusCircle,
  ShieldCheck,
  CreditCard,
  QrCode,
  Banknote,
  FileText,
  User,
  Sparkles,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { useUserAuth } from "@/lib/user-auth";
import { api, type UserAddress, type AddressInput } from "@/lib/api";
import { TaxInvoiceModal } from "@/components/invoice/tax-invoice-modal";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function CartSheet() {
  const {
    cartBooks,
    cartCount,
    subtotal,
    mrpTotal,
    savingsTotal,
    savingsPercent,
    deliveryFee,
    freeDeliveryThreshold,
    awayFromFreeDelivery,
    freeDeliveryProgress,
    total,
    changeQuantity,
    clearCart,
    setCartOpen
  } = useCart();

  const { user, token, isAuthenticated, openLoginModal } = useUserAuth();

  const [step, setStep] = useState<"cart" | "address" | "payment" | "success">("cart");

  // Saved addresses state for logged-in users
  const [savedAddresses, setSavedAddresses] = useState<UserAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);

  // Manual / New Address Form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [flatHouse, setFlatHouse] = useState("");
  const [areaStreet, setAreaStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Telangana");
  const [pincode, setPincode] = useState("");
  const [addressType, setAddressType] = useState<"Home" | "Work" | "Other">("Home");
  const [saveAsDefault, setSaveAsDefault] = useState(true);

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState("UPI / QR Code");
  const [orderNotes, setOrderNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Success State
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const [placedWhatsappUrl, setPlacedWhatsappUrl] = useState<string | null>(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  // Load user details and addresses when authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      if (user) {
        setName(user.name || "");
        setPhone(user.phone || "");
        setEmail(user.email || "");
      }
      setLoadingAddresses(true);
      api.getUserAddresses(token)
        .then(addresses => {
          setSavedAddresses(addresses);
          if (addresses.length > 0) {
            const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
            setSelectedAddressId(defaultAddr.id);
            setShowNewAddressForm(false);
          } else {
            setShowNewAddressForm(true);
          }
        })
        .catch(() => {})
        .finally(() => setLoadingAddresses(false));
    } else {
      setSavedAddresses([]);
      setSelectedAddressId(null);
      setShowNewAddressForm(true);
    }
  }, [isAuthenticated, token, user]);

  const handleProceedToAddress = () => {
    if (cartBooks.length === 0) return;
    setStep("address");
  };

  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    // If using saved address
    if (selectedAddressId && !showNewAddressForm) {
      const selected = savedAddresses.find(a => a.id === selectedAddressId);
      if (selected) {
        setName(selected.fullName);
        setPhone(selected.phone);
        setFlatHouse(selected.flatHouse);
        setAreaStreet(selected.areaStreet);
        setLandmark(selected.landmark || "");
        setCity(selected.city);
        setState(selected.state);
        setPincode(selected.pincode);
        setAddressType(selected.addressType);
        setStep("payment");
        return;
      }
    }

    // Otherwise validate new address fields
    if (!name.trim() || !phone.trim() || !flatHouse.trim() || !areaStreet.trim() || !city.trim() || !pincode.trim()) {
      toast.error("Please fill in all required address fields (Name, Phone, House/Flat, Street, City, Pincode).");
      return;
    }

    // Save address to user profile if logged in
    if (isAuthenticated && token && showNewAddressForm) {
      try {
        const newAddr = await api.addUserAddress(token, {
          fullName: name.trim(),
          phone: phone.trim(),
          flatHouse: flatHouse.trim(),
          areaStreet: areaStreet.trim(),
          landmark: landmark.trim(),
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
          addressType,
          isDefault: saveAsDefault
        });
        setSavedAddresses(prev => [newAddr, ...prev]);
        setSelectedAddressId(newAddr.id);
      } catch {
        // continue even if address save has minor issue
      }
    }

    setStep("payment");
  };

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    try {
      const itemsPayload = cartBooks.map(b => ({
        id: b.id,
        title: b.title,
        author: b.author,
        price: b.price,
        mrp: b.mrp || b.old_price || b.oldPrice || b.price,
        quantity: b.quantity
      }));

      const fullAddressText = `${flatHouse}, ${areaStreet}${landmark ? `, Near ${landmark}` : ""}, ${city}, ${state} - ${pincode}`;

      const res = await api.createOrder({
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim() || user?.email || "",
        deliveryAddress: fullAddressText,
        city: city.trim(),
        pincode: pincode.trim(),
        items: itemsPayload,
        subtotal,
        deliveryFee,
        paymentMethod,
        orderNotes: orderNotes.trim()
      });

      setPlacedOrderId(res.orderId);
      setPlacedWhatsappUrl(res.whatsappUrl);
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

  const getStepTitle = () => {
    switch (step) {
      case "address": return "Select Delivery Address";
      case "payment": return "Select Payment Method";
      case "success": return "Order Confirmed!";
      default: return `Your Book Bag (${cartCount})`;
    }
  };

  return (
    <>
      <SheetContent className="flex w-[96vw] max-w-lg flex-col p-0 bg-background border-border shadow-2xl">
        {/* Sheet Header */}
        <SheetHeader className="border-b border-border p-5 pr-12 text-left bg-secondary/30">
          <SheetTitle className="font-display text-xl font-bold flex items-center gap-2">
            {step !== "cart" && step !== "success" && (
              <button
                onClick={() => setStep(step === "payment" ? "address" : "cart")}
                className="p-1 rounded-full hover:bg-secondary transition mr-1"
                aria-label="Back"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            {getStepTitle()}
          </SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground">
            {step === "success"
              ? "Your order has been recorded and is being prepared"
              : step === "payment"
              ? "Choose how you'd like to pay for your books"
              : step === "address"
              ? "Enter or choose where you want your books delivered"
              : "Review your items, calculate total cost, and proceed"}
          </SheetDescription>
        </SheetHeader>

        {/* Free Delivery Bar (Visible in Cart Step) */}
        {step === "cart" && cartBooks.length > 0 && (
          <div className="bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100 border-b border-amber-300/80 px-4 py-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-950 font-bold">
              <Truck className="h-4 w-4 text-amber-700" />
              {awayFromFreeDelivery === 0 ? (
                <span className="font-black text-emerald-700">
                  🎉 Congratulations! You unlocked FREE Pan-India Delivery!
                </span>
              ) : (
                <span>
                  Add <strong className="font-black text-amber-800">₹{awayFromFreeDelivery}</strong> more for <strong className="font-black text-slate-950 underline decoration-amber-500">FREE Delivery</strong>
                </span>
              )}
            </div>
            <span className="text-[10px] font-black text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full">
              {freeDeliveryProgress}%
            </span>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 1: CART ITEMS & SUMMARY */}
        {/* ============================================================ */}
        {step === "cart" && (
          <>
            {cartBooks.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                <div className="rounded-full bg-secondary/60 p-6 text-muted-foreground mb-4">
                  <ShoppingBag className="h-10 w-10 stroke-[1.5]" />
                </div>
                <h3 className="font-display text-xl font-medium">Your Bag is Empty</h3>
                <p className="mt-2 text-xs text-muted-foreground max-w-xs leading-relaxed">
                  Explore our curated collection of books and add timeless reads to your bag!
                </p>
                <Button
                  onClick={handleClose}
                  className="mt-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 text-xs font-semibold"
                >
                  Start Browsing
                </Button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
                  {cartBooks.map((book) => {
                    const itemMrp = Number(book.mrp || book.old_price || book.oldPrice || book.price);
                    const itemSavings = Math.max(0, itemMrp - book.price);

                    return (
                      <div
                        key={book.id}
                        className="flex gap-3.5 p-3 rounded-xl border border-border bg-card/60 hover:bg-card transition shadow-sm"
                      >
                        <div className="w-16 h-22 flex-shrink-0 overflow-hidden rounded-lg bg-secondary/30 border border-border">
                          <img
                            src={book.cover || book.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"}
                            alt={book.title}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop";
                            }}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            {book.sub_category && (
                              <span className="text-[10px] font-bold text-primary uppercase tracking-wider block truncate">
                                {book.sub_category}
                              </span>
                            )}
                            <h4 className="font-display text-sm font-bold text-foreground truncate">
                              {book.title}
                            </h4>
                            <p className="text-[11px] text-muted-foreground truncate">
                              by {book.author}
                            </p>

                            <div className="flex items-baseline gap-2 mt-1">
                              <span className="font-bold text-sm text-primary">₹{book.price}</span>
                              {itemMrp > book.price && (
                                <span className="text-[11px] text-muted-foreground line-through">₹{itemMrp}</span>
                              )}
                              {itemSavings > 0 && (
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                                  Save ₹{itemSavings * book.quantity}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between pt-2 border-t border-border/40 mt-2">
                            <div className="flex items-center gap-1.5 bg-secondary/80 rounded-lg p-0.5 border border-border">
                              <button
                                onClick={() => changeQuantity(book.id, -1, book)}
                                className="p-1 rounded hover:bg-background transition text-muted-foreground hover:text-foreground"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-bold font-mono">
                                {book.quantity}
                              </span>
                              <button
                                onClick={() => changeQuantity(book.id, 1, book)}
                                className="p-1 rounded hover:bg-background transition text-muted-foreground hover:text-foreground"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <span className="font-bold text-xs text-foreground font-mono">
                              ₹{book.price * book.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Price Breakdown Footer */}
                <div className="border-t border-border bg-card/90 p-5 space-y-3">
                  {savingsTotal > 0 && (
                    <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-2.5 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
                      <span className="flex items-center gap-1.5 font-semibold">
                        <Sparkles className="h-4 w-4 text-emerald-600" />
                        Total Savings on this Order:
                      </span>
                      <span className="font-bold">
                        ₹{savingsTotal} ({savingsPercent}% OFF)
                      </span>
                    </div>
                  )}

                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Total MRP:</span>
                      <span className="line-through">₹{mrpTotal}</span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Bag Subtotal:</span>
                      <span className="font-semibold">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Estimated Delivery:</span>
                      <span className={deliveryFee === 0 ? "text-emerald-600 font-bold" : "font-semibold"}>
                        {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                      </span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between font-bold text-base text-foreground">
                      <span>Final Payable Total:</span>
                      <span className="text-amber-700 dark:text-amber-400 font-mono text-xl font-black">₹{total}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleProceedToAddress}
                    className="w-full rounded-xl py-6 text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition flex items-center justify-center gap-2 btn-shimmer active:scale-[0.99]"
                  >
                    Proceed to Buy ({cartCount} {cartCount === 1 ? "Book" : "Books"})
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </>
        )}

        {/* ============================================================ */}
        {/* STEP 2: DELIVERY ADDRESS (AMAZON STYLE) */}
        {/* ============================================================ */}
        {step === "address" && (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Login Prompt Banner if Guest */}
            {!isAuthenticated && (
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    Have an account?
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Sign in with OTP to use your saved addresses.
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={openLoginModal}
                  className="rounded-lg text-xs font-semibold h-8"
                >
                  Sign In
                </Button>
              </div>
            )}

            {/* Saved Addresses List (If Authenticated) */}
            {isAuthenticated && savedAddresses.length > 0 && (
              <div className="space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                  <span>Saved Delivery Addresses</span>
                  <button
                    type="button"
                    onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                    className="text-primary hover:underline text-xs lowercase font-medium flex items-center gap-1"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    {showNewAddressForm ? "Use saved" : "+ Add new"}
                  </button>
                </div>

                {!showNewAddressForm && (
                  <div className="space-y-2">
                    {savedAddresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={cn(
                          "block p-3.5 rounded-xl border transition cursor-pointer relative",
                          selectedAddressId === addr.id
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border bg-card hover:bg-secondary/40"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="delivery_address"
                            checked={selectedAddressId === addr.id}
                            onChange={() => setSelectedAddressId(addr.id)}
                            className="mt-1 text-primary focus:ring-primary h-4 w-4"
                          />
                          <div className="flex-1 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-foreground text-sm">{addr.fullName}</span>
                              <span className="bg-secondary px-2 py-0.5 rounded text-[10px] font-semibold text-muted-foreground">
                                {addr.addressType}
                              </span>
                              {addr.isDefault && (
                                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-muted-foreground mt-1 leading-relaxed">
                              {addr.formattedAddress || `${addr.flatHouse}, ${addr.areaStreet}, ${addr.city}, ${addr.state} - ${addr.pincode}`}
                            </p>
                            <p className="text-muted-foreground mt-1 font-medium">
                              Phone: <span className="text-foreground">{addr.phone}</span>
                            </p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Manual / New Address Form */}
            {(showNewAddressForm || savedAddresses.length === 0) && (
              <form onSubmit={handleProceedToPayment} className="space-y-3.5 bg-card border border-border p-4 rounded-xl">
                <div className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5 pb-2 border-b border-border">
                  <MapPin className="h-4 w-4 text-primary" />
                  Enter Delivery Address
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit phone"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                    Email Address (for Tax Invoice)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                    Flat, House No., Building, Apartment *
                  </label>
                  <input
                    type="text"
                    required
                    value={flatHouse}
                    onChange={(e) => setFlatHouse(e.target.value)}
                    placeholder="e.g. Flat 402, Sai Residency"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                    Area, Street, Sector, Village *
                  </label>
                  <input
                    type="text"
                    required
                    value={areaStreet}
                    onChange={(e) => setAreaStreet(e.target.value)}
                    placeholder="e.g. Road No 12, Banjara Hills"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      Landmark
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="Near Water Tank"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      Town / City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Hyderabad"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="500034"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-muted-foreground">Type:</span>
                    {(["Home", "Work", "Other"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setAddressType(t)}
                        className={cn(
                          "px-2.5 py-1 rounded text-xs font-semibold border transition",
                          addressType === t
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-secondary text-muted-foreground border-border hover:bg-secondary/80"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {isAuthenticated && (
                    <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={saveAsDefault}
                        onChange={(e) => setSaveAsDefault(e.target.checked)}
                        className="rounded text-primary focus:ring-primary h-3.5 w-3.5"
                      />
                      Make default
                    </label>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-xl py-5 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow transition mt-3"
                >
                  Deliver to this Address
                </Button>
              </form>
            )}

            {/* Continue with Selected Address Button */}
            {!showNewAddressForm && savedAddresses.length > 0 && (
              <Button
                onClick={handleProceedToPayment}
                className="w-full rounded-xl py-6 text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition flex items-center justify-center gap-2 mt-4 btn-shimmer"
              >
                Continue to Payment
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 3: PAYMENT METHOD SELECTION */}
        {/* ============================================================ */}
        {step === "payment" && (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Choose Payment Method
            </div>

            <div className="space-y-2.5">
              {[
                {
                  id: "UPI / QR Code",
                  title: "UPI / QR Code (Instant & Fast)",
                  desc: "Scan QR code via PhonePe, Google Pay, Paytm, or BHIM",
                  icon: QrCode,
                  recommended: true
                },
                {
                  id: "Cash on Delivery",
                  title: "Cash on Delivery (COD)",
                  desc: "Pay in cash or UPI to the courier upon doorstep delivery",
                  icon: Banknote,
                  recommended: false
                },
                {
                  id: "Net Banking / Cards",
                  title: "Credit / Debit Card / Net Banking",
                  desc: "All major banks, Visa, MasterCard, RuPay supported",
                  icon: CreditCard,
                  recommended: false
                }
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = paymentMethod === opt.id;

                return (
                  <label
                    key={opt.id}
                    className={cn(
                      "block p-3.5 rounded-xl border transition cursor-pointer relative",
                      isSelected
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-card hover:bg-secondary/40"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment_method"
                        checked={isSelected}
                        onChange={() => setPaymentMethod(opt.id)}
                        className="mt-1 text-primary focus:ring-primary h-4 w-4"
                      />
                      <div className="flex-1 text-xs">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-primary" />
                          <span className="font-bold text-foreground text-sm">{opt.title}</span>
                          {opt.recommended && (
                            <span className="bg-amber-100 text-amber-900 text-[9px] font-bold px-1.5 py-0.5 rounded">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground mt-1 leading-relaxed text-[11px]">
                          {opt.desc}
                        </p>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Order Note */}
            <div className="pt-2">
              <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                Special Delivery Instructions (Optional)
              </label>
              <textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="e.g. Leave package at security gate or call before delivering"
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>

            {/* Order Review Summary Box */}
            <div className="bg-secondary/30 rounded-xl p-3.5 border border-border space-y-2 text-xs">
              <div className="font-semibold text-foreground flex justify-between">
                <span>Total Items ({cartCount}):</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Charges:</span>
                <span className={deliveryFee === 0 ? "text-emerald-600 font-bold" : ""}>
                  {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold text-sm text-foreground">
                <span>Order Total:</span>
                <span className="text-primary font-mono text-base">₹{total}</span>
              </div>
            </div>

            <Button
              onClick={handlePlaceOrder}
              disabled={submitting}
              className="w-full rounded-xl py-6 text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition flex items-center justify-center gap-2 btn-shimmer"
            >
              {submitting ? (
                "Confirming Your Order..."
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Place Order • ₹{total}
                </>
              )}
            </Button>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 4: ORDER SUCCESS SCREEN */}
        {/* ============================================================ */}
        {step === "success" && (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="rounded-full bg-emerald-100 dark:bg-emerald-950/60 p-4 text-emerald-600 border border-emerald-300">
              <CheckCircle2 className="h-12 w-12" />
            </div>

            <div>
              <span className="bg-primary/10 text-primary font-mono font-bold text-xs px-3 py-1 rounded-full border border-primary/20">
                Order #{placedOrderId}
              </span>
              <h3 className="font-display text-2xl font-bold text-foreground mt-2">
                Order Booked Successfully!
              </h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto leading-relaxed">
                Thank you for ordering from Success Book Hub. We are dispatching your books with premium packaging.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="w-full space-y-2.5 pt-3">
              {placedOrderId && (
                <Button
                  onClick={() => setInvoiceModalOpen(true)}
                  variant="outline"
                  className="w-full rounded-xl py-5 text-xs font-semibold gap-2 border-primary/30 text-primary hover:bg-primary/10"
                >
                  <FileText className="h-4 w-4" />
                  Download GST Tax Invoice
                </Button>
              )}

              {placedWhatsappUrl && (
                <a
                  href={placedWhatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow transition"
                >
                  <MessageCircle className="h-4 w-4" />
                  Confirm & Track on WhatsApp
                </a>
              )}

              <Button
                onClick={handleClose}
                className="w-full rounded-xl py-5 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow transition"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </SheetContent>

      {/* Tax Invoice Modal for Placed Order */}
      {placedOrderId && (
        <TaxInvoiceModal
          orderId={placedOrderId}
          open={invoiceModalOpen}
          onOpenChange={setInvoiceModalOpen}
        />
      )}
    </>
  );
}
