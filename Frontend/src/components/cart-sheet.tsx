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
  Phone,
  Copy,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { useUserAuth } from "@/lib/user-auth";
import { api, type UserAddress, type AddressInput } from "@/lib/api";
import { TaxInvoiceModal } from "@/components/invoice/tax-invoice-modal";
import { OrderTrackerModal } from "@/components/order-tracker-modal";
import { PincodeDeliveryChecker } from "@/components/pincode-delivery-checker";
import { WHATSAPP_NUMBER } from "@/lib/books";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
// Helper to dynamically ensure Razorpay checkout script is loaded
function loadRazorpaySdk(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if ((window as unknown as { Razorpay?: unknown }).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

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
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");
  const [orderNotes, setOrderNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Success State
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const [placedWhatsappUrl, setPlacedWhatsappUrl] = useState<string | null>(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [trackerModalOpen, setTrackerModalOpen] = useState(false);
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  const handleCopyOrderId = () => {
    if (!placedOrderId) return;
    navigator.clipboard.writeText(placedOrderId);
    setCopiedOrderId(true);
    toast.success(`Order ID #${placedOrderId} copied to clipboard!`);
    setTimeout(() => setCopiedOrderId(false), 2500);
  };

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
    if (!isAuthenticated || !token || !user) {
      openLoginModal();
      toast.info("Please sign in with Email & OTP to proceed to checkout.");
      return;
    }
    setStep("address");
  };

  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !token || !user) {
      openLoginModal();
      toast.info("Please sign in with Email & OTP to proceed.");
      return;
    }

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

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number for delivery.");
      return;
    }

    const cleanPincode = pincode.replace(/\D/g, "");
    if (cleanPincode.length !== 6) {
      toast.error("Please enter a valid 6-digit postal pincode.");
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
    if (!isAuthenticated || !token || !user) {
      openLoginModal();
      toast.info("Please sign in to place your order.");
      return;
    }
    if (cartBooks.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setSubmitting(true);

    const itemsPayload = cartBooks.map((b) => ({
      id: b.id,
      title: b.title,
      author: b.author,
      price: b.price,
      mrp: b.mrp || b.old_price || b.oldPrice || b.price,
      quantity: b.quantity,
      cover: b.cover || b.image || "",
      image: b.cover || b.image || "",
    }));

    const fullAddressText = `${flatHouse}, ${areaStreet}${landmark ? `, Near ${landmark}` : ""}, ${city}, ${state} - ${pincode}`;

    // If Razorpay online payment selected
    if (paymentMethod === "Razorpay") {
      try {
        const sdkLoaded = await loadRazorpaySdk();
        if (!sdkLoaded) {
          throw new Error("Unable to load Razorpay checkout SDK. Please verify your internet connection.");
        }

        // 1. Create Razorpay order on backend
        const rzpData = await api.createRazorpayOrder(total);

        // 2. Configure Razorpay modal options
        const razorpayKey = rzpData.keyId || (import.meta.env.VITE_RAZORPAY_KEY_ID as string) || "rzp_test_SwedUUn1KgRMs0";

        type RazorpayOptions = {
          key: string;
          amount: number;
          currency: string;
          name: string;
          description: string;
          image: string;
          order_id: string;
          prefill: {
            name: string;
            email: string;
            contact: string;
          };
          theme: {
            color: string;
          };
          modal: {
            backdropclose: boolean;
            ondismiss: () => void;
          };
          handler: (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) => Promise<void>;
        };

        const options: RazorpayOptions = {
          key: razorpayKey,
          amount: rzpData.amount,
          currency: rzpData.currency || "INR",
          name: "Success Book Hub",
          description: `Book Order (${cartCount} ${cartCount === 1 ? "item" : "items"})`,
          image: "https://successbookhub.com/favicon.svg",
          order_id: rzpData.orderId,
          prefill: {
            name: name.trim(),
            email: email.trim() || user?.email || "",
            contact: phone.trim(),
          },
          theme: {
            color: "#b45309",
          },
          modal: {
            backdropclose: false,
            ondismiss: () => {
              setSubmitting(false);
              toast.info("Payment window closed. Your cart is preserved, click below to try again.");
            },
          },
          handler: async (response) => {
            try {
              toast.loading("Verifying your payment...", { id: "rzp-verifying" });

              // Persist order with verified Razorpay payment signature
              const orderRes = await api.createOrder({
                customerName: name.trim(),
                customerPhone: phone.trim(),
                customerEmail: email.trim() || user?.email || "",
                deliveryAddress: fullAddressText,
                city: city.trim(),
                pincode: pincode.trim(),
                items: itemsPayload,
                subtotal,
                deliveryFee,
                paymentMethod: "Razorpay (Paid Online)",
                orderNotes: orderNotes.trim(),
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              });

              toast.dismiss("rzp-verifying");
              setPlacedOrderId(orderRes.orderId);
              setPlacedWhatsappUrl(orderRes.whatsappUrl);
              setStep("success");
              clearCart();
              toast.success(`Payment verified! Order #${orderRes.orderId} placed successfully!`);
            } catch (postErr) {
              toast.dismiss("rzp-verifying");
              console.error("[Razorpay Post Error]:", postErr);
              toast.error(postErr instanceof Error ? postErr.message : "Error verifying payment with server.");
            } finally {
              setSubmitting(false);
            }
          },
        };

        const RazorpayConstructor = (window as unknown as { Razorpay: new (opts: RazorpayOptions) => { open: () => void; on: (evt: string, cb: (data: unknown) => void) => void } }).Razorpay;
        const razorpayInstance = new RazorpayConstructor(options);
        razorpayInstance.on("payment.failed", (errData: unknown) => {
          setSubmitting(false);
          const desc = (errData as { error?: { description?: string } })?.error?.description;
          toast.error(`Payment failed: ${desc || "Transaction declined"}`);
        });
        razorpayInstance.open();
      } catch (rzpErr) {
        setSubmitting(false);
        toast.error(rzpErr instanceof Error ? rzpErr.message : "Could not initialize Razorpay payment.");
      }
      return;
    }

    // Cash on Delivery (COD) Flow
    try {
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
        paymentMethod: "Cash on Delivery",
        orderNotes: orderNotes.trim(),
      });

      setPlacedOrderId(res.orderId);
      setPlacedWhatsappUrl(res.whatsappUrl);
      setStep("success");
      clearCart();
      toast.success(`Order #${res.orderId} booked successfully with Cash on Delivery!`);
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
        <SheetHeader className="border-b border-border/80 p-5 pr-12 text-left bg-gradient-to-b from-secondary/40 to-background/60 backdrop-blur-sm">
          <SheetTitle className="font-serif text-xl font-bold flex items-center gap-2 text-foreground tracking-tight">
            {step !== "cart" && step !== "success" && (
              <button
                onClick={() => setStep(step === "payment" ? "address" : "cart")}
                className="p-1 rounded-full hover:bg-secondary transition mr-1 cursor-pointer"
                aria-label="Back"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            {getStepTitle()}
          </SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
            {step === "success"
              ? "Your literary order has been recorded with care and is being prepared"
              : step === "payment"
              ? "Choose your preferred secure payment method"
              : step === "address"
              ? "Enter or choose where your curated books should be delivered"
              : "Review your curated items, verify total cost, and proceed to dispatch"}
          </SheetDescription>
        </SheetHeader>

        {/* Free Delivery Bar (Visible in Cart Step) */}
        {step === "cart" && cartBooks.length > 0 && (
          <div className="bg-gradient-to-r from-amber-50 via-amber-100/90 to-yellow-50 dark:from-amber-950/40 dark:via-amber-900/30 dark:to-yellow-950/30 border-b border-amber-300/60 dark:border-amber-700/40 px-4 py-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-900 dark:text-amber-100 font-semibold">
              <Truck className="h-4 w-4 text-amber-700 dark:text-amber-400 shrink-0" />
              {awayFromFreeDelivery === 0 ? (
                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                  🎉 Unlocked: FREE Pan-India Courier Delivery!
                </span>
              ) : (
                <span>
                  Add <strong className="font-bold text-amber-800 dark:text-amber-300">₹{awayFromFreeDelivery}</strong> more for <strong className="underline decoration-amber-500 font-bold">FREE Delivery</strong>
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-900 dark:text-amber-200 bg-amber-200/80 dark:bg-amber-800/60 px-2 py-0.5 rounded-full shadow-2xs">
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
                <div className="rounded-2xl bg-secondary/50 p-6 text-muted-foreground mb-4 border border-border/60 shadow-inner">
                  <ShoppingBag className="h-10 w-10 stroke-[1.5] text-amber-600/70" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground">Your Book Bag is Empty</h3>
                <p className="mt-2 text-xs text-muted-foreground max-w-xs leading-relaxed">
                  Discover rare gems, timeless classics, and contemporary bestsellers in our catalogue.
                </p>
                <Button
                  onClick={handleClose}
                  className="mt-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-2.5 text-xs font-semibold shadow-md btn-shimmer cursor-pointer"
                >
                  Explore Catalogue
                </Button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 divide-y divide-border/30">
                  {cartBooks.map((book) => {
                    const itemMrp = Number(book.mrp || book.old_price || book.oldPrice || book.price);
                    const itemSavings = Math.max(0, itemMrp - book.price);

                    return (
                      <div
                        key={book.id}
                        className="flex gap-3.5 pt-3.5 first:pt-0 group transition"
                      >
                        <div className="relative w-16 h-23 shrink-0 rounded-md overflow-hidden book-edge-shadow bg-secondary/40 border border-border/80">
                          <img
                            src={book.cover || book.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"}
                            alt={book.title}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop";
                            }}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="book-spine-overlay absolute inset-0 pointer-events-none" />
                        </div>

                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            {book.sub_category && (
                              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest block truncate">
                                {book.sub_category}
                              </span>
                            )}
                            <h4 className="font-serif text-sm font-bold text-foreground leading-snug line-clamp-2">
                              {book.title}
                            </h4>
                            <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                              by {book.author}
                            </p>

                            <div className="flex items-baseline gap-2 mt-1">
                              <span className="font-bold text-sm text-foreground font-mono">₹{book.price}</span>
                              {itemMrp > book.price && (
                                <span className="text-[11px] text-muted-foreground line-through font-mono">₹{itemMrp}</span>
                              )}
                              {itemSavings > 0 && (
                                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                  Save ₹{itemSavings * book.quantity}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between pt-2 border-t border-border/40 mt-2">
                            <div className="flex items-center gap-1.5 bg-secondary/60 rounded-lg p-0.5 border border-border/80">
                              <button
                                onClick={() => changeQuantity(book.id, -1, book)}
                                className="p-1 rounded hover:bg-background transition text-muted-foreground hover:text-foreground cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-bold font-mono">
                                {book.quantity}
                              </span>
                              <button
                                onClick={() => changeQuantity(book.id, 1, book)}
                                className="p-1 rounded hover:bg-background transition text-muted-foreground hover:text-foreground cursor-pointer"
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
                <div className="border-t border-border bg-gradient-to-b from-card to-secondary/30 p-4 sm:p-5 space-y-3 shadow-lg">
                  {savingsTotal > 0 && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
                      <span className="flex items-center gap-1.5 font-semibold">
                        <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        Total Savings on this Order:
                      </span>
                      <span className="font-bold font-mono">
                        ₹{savingsTotal} ({savingsPercent}% OFF)
                      </span>
                    </div>
                  )}

                  {/* Live Pincode Estimator in Cart */}
                  <PincodeDeliveryChecker compact={true} />

                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Total MRP:</span>
                      <span className="line-through font-mono">₹{mrpTotal}</span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Bag Subtotal:</span>
                      <span className="font-semibold font-mono">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Estimated Delivery:</span>
                      <span className={deliveryFee === 0 ? "text-emerald-600 dark:text-emerald-400 font-bold" : "font-semibold font-mono"}>
                        {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                      </span>
                    </div>
                    <div className="border-t border-border/80 pt-2 flex justify-between items-baseline font-bold text-base text-foreground">
                      <span className="font-serif">Payable Total:</span>
                      <span className="text-amber-700 dark:text-amber-400 font-mono text-xl font-black">₹{total}</span>
                    </div>
                  </div>

                  {!isAuthenticated ? (
                    <div className="space-y-2.5">
                      <div className="bg-amber-500/10 border border-amber-300/60 dark:border-amber-700/50 rounded-xl p-3 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="p-1.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0">
                            <User className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-foreground text-xs truncate">Sign In Required to Checkout</p>
                            <p className="text-[11px] text-muted-foreground truncate">To save delivery address & track your order</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={openLoginModal}
                          className="rounded-lg text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground h-8 shrink-0 px-3 cursor-pointer"
                        >
                          Sign In
                        </Button>
                      </div>

                      <Button
                        onClick={handleProceedToAddress}
                        className="w-full rounded-xl py-5 sm:py-6 text-xs sm:text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition flex items-center justify-center gap-2 btn-shimmer active:scale-[0.99] cursor-pointer whitespace-nowrap"
                      >
                        <span className="truncate">Sign In & Proceed to Buy ({cartCount} {cartCount === 1 ? "Book" : "Books"})</span>
                        <ChevronRight className="h-4 w-4 shrink-0" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={handleProceedToAddress}
                      className="w-full rounded-xl py-5 sm:py-6 text-xs sm:text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition flex items-center justify-center gap-2 btn-shimmer active:scale-[0.99] cursor-pointer whitespace-nowrap"
                    >
                      <span className="truncate">Proceed to Buy ({cartCount} {cartCount === 1 ? "Book" : "Books"})</span>
                      <ChevronRight className="h-4 w-4 shrink-0" />
                    </Button>
                  )}
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
              <div className="bg-amber-500/10 border border-amber-300/80 rounded-2xl p-6 text-center space-y-3">
                <div className="p-3.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 inline-flex">
                  <User className="h-6 w-6" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground">Sign In Required for Delivery</h3>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                  Please sign in with your email & OTP to select your saved delivery address and place your order.
                </p>
                <Button
                  onClick={openLoginModal}
                  className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 text-xs font-bold gap-2 shadow-md btn-shimmer"
                >
                  <User className="h-4 w-4" />
                  Sign In with Email & OTP
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
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              <span>Choose Payment Method</span>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> 256-Bit SSL Encrypted
              </span>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: "Razorpay",
                  title: "Online Payment via Razorpay",
                  subtitle: "UPI, Cards, NetBanking, Wallets",
                  desc: "Instant payment with Google Pay, PhonePe, Paytm, BHIM UPI, Visa, Mastercard, RuPay & NetBanking",
                  icon: Sparkles,
                  recommended: true,
                  badge: "Instant & Zero Fees"
                },
                {
                  id: "Cash on Delivery",
                  title: "Cash on Delivery (COD)",
                  subtitle: "Pay at Doorstep",
                  desc: "Pay in cash or UPI directly to courier delivery executive when your books arrive",
                  icon: Banknote,
                  recommended: false,
                  badge: "Doorstep Delivery"
                }
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = paymentMethod === opt.id;

                return (
                  <label
                    key={opt.id}
                    className={cn(
                      "block p-4 rounded-xl border transition cursor-pointer relative",
                      isSelected
                        ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
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
                        <div className="flex items-center gap-2 flex-wrap">
                          <Icon className="h-4 w-4 text-primary" />
                          <span className="font-bold text-foreground text-sm">{opt.title}</span>
                          {opt.recommended && (
                            <span className="bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-700">
                              ★ Recommended
                            </span>
                          )}
                          {opt.badge && !opt.recommended && (
                            <span className="bg-secondary text-muted-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-semibold text-primary/80 mt-0.5">
                          {opt.subtitle}
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

            {/* Special Instructions */}
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
                <span>Total Payable:</span>
                <span className="text-primary font-mono text-base">₹{total}</span>
              </div>
            </div>

            <Button
              onClick={handlePlaceOrder}
              disabled={submitting}
              className="w-full rounded-xl py-5 sm:py-6 text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition flex items-center justify-center gap-2 btn-shimmer whitespace-nowrap cursor-pointer"
            >
              {submitting ? (
                "Processing Your Order..."
              ) : paymentMethod === "Razorpay" ? (
                <>
                  <CreditCard className="h-4 w-4 shrink-0 text-amber-200" />
                  <span>Pay with Razorpay • ₹{total}</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>Place Order (COD) • ₹{total}</span>
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
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full shadow-2xs">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Order ID:</span>
                <span className="font-mono font-black text-xs text-primary">{placedOrderId}</span>
                <button
                  type="button"
                  onClick={handleCopyOrderId}
                  className="text-primary hover:text-primary/70 transition p-1 rounded cursor-pointer"
                  title="Copy Order ID"
                >
                  {copiedOrderId ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>

              <h3 className="font-display text-2xl font-bold text-foreground mt-3">
                Order Booked Successfully!
              </h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto leading-relaxed">
                Thank you for ordering from Success Book Hub. Use your unique Order ID <strong>#{placedOrderId}</strong> for any inquiries, tracking, and customer support.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="w-full space-y-2.5 pt-2">
              {placedOrderId && (
                <Button
                  onClick={() => setTrackerModalOpen(true)}
                  className="w-full rounded-xl py-5 text-xs font-bold gap-2 bg-amber-600 hover:bg-amber-700 text-white shadow btn-shimmer cursor-pointer"
                >
                  <Truck className="h-4 w-4" />
                  Track Order Live (#{placedOrderId})
                </Button>
              )}

              {placedOrderId && (
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hello Success Book Hub! I would like to enquire about my Order #${placedOrderId}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow transition"
                >
                  <MessageCircle className="h-4 w-4" />
                  Enquire on WhatsApp (#{placedOrderId})
                </a>
              )}

              {placedOrderId && (
                <Button
                  onClick={() => setInvoiceModalOpen(true)}
                  variant="outline"
                  className="w-full rounded-xl py-5 text-xs font-semibold gap-2 border-primary/30 text-primary hover:bg-primary/10 cursor-pointer"
                >
                  <FileText className="h-4 w-4" />
                  Download GST Tax Invoice
                </Button>
              )}

              <Button
                onClick={handleClose}
                variant="ghost"
                className="w-full rounded-xl py-4 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
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

      {/* Live Order Tracker Modal */}
      {placedOrderId && (
        <OrderTrackerModal
          initialOrderId={placedOrderId}
          open={trackerModalOpen}
          onOpenChange={setTrackerModalOpen}
        />
      )}
    </>
  );
}
