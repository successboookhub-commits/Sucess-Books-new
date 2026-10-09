import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  User,
  Package,
  MapPin,
  Heart,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  FileText,
  ShoppingBag,
  ShieldCheck,
  Phone,
  Mail,
  ArrowRight,
  LogOut,
  AlertCircle,
  PlusCircle,
  X,
  Lock,
  Eye,
  EyeOff,
  BookOpen,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useUserAuth } from "@/lib/user-auth";
import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart";
import { api, type OrderData, type UserAddress, type AddressInput } from "@/lib/api";
import { TaxInvoiceModal } from "@/components/invoice/tax-invoice-modal";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  validateSearch: (search: Record<string, unknown>): { tab?: string | undefined } => {
    return {
      tab: typeof search["tab"] === "string" ? search["tab"] : undefined,
    };
  },
  component: AccountPage,
});

function AccountPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { user, token, isAuthenticated, isLoading, openLoginModal, updateProfile, changePassword, logout } = useUserAuth();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "wishlist" | "profile">(
    (search.tab as any) || "orders"
  );

  // Orders State
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [selectedInvoiceOrderId, setSelectedInvoiceOrderId] = useState<string | null>(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  // Addresses State
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);

  // Address Form State
  const [addrName, setAddrName] = useState("");
  const [addrPhone, setAddrPhone] = useState("");
  const [addrAltPhone, setAddrAltPhone] = useState("");
  const [addrFlat, setAddrFlat] = useState("");
  const [addrStreet, setAddrStreet] = useState("");
  const [addrLandmark, setAddrLandmark] = useState("");
  const [addrCity, setAddrCity] = useState("");
  const [addrState, setAddrState] = useState("Telangana");
  const [addrPincode, setAddrPincode] = useState("");
  const [addrType, setAddrType] = useState<"Home" | "Work" | "Other">("Home");
  const [addrDefault, setAddrDefault] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);

  // Profile Form State
  const [profileName, setProfileName] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // Change Password Form State
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmNewPwd, setShowConfirmNewPwd] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Keep active tab synced with query param
  useEffect(() => {
    if (search.tab && ["orders", "addresses", "wishlist", "profile"].includes(search.tab)) {
      setActiveTab(search.tab as any);
    }
  }, [search.tab]);

  // Load user data
  useEffect(() => {
    if (user) {
      setProfileName(user.name || "");
      setProfilePhone(user.phone || "");
    }
  }, [user]);

  // Load orders
  const loadOrders = async () => {
    if (!token) return;
    setLoadingOrders(true);
    try {
      const data = await api.getMyOrders(token);
      setOrders(data);
    } catch {
      // fallback
    } finally {
      setLoadingOrders(false);
    }
  };

  // Load addresses
  const loadAddresses = async () => {
    if (!token) return;
    setLoadingAddresses(true);
    try {
      const data = await api.getUserAddresses(token);
      setAddresses(data);
    } catch {
      // fallback
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      loadOrders();
      loadAddresses();
    }
  }, [isAuthenticated, token]);

  const handleOpenInvoice = (orderId: string) => {
    setSelectedInvoiceOrderId(orderId);
    setInvoiceModalOpen(true);
  };

  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setAddrName(user?.name || "");
    setAddrPhone(user?.phone || "");
    setAddrAltPhone("");
    setAddrFlat("");
    setAddrStreet("");
    setAddrLandmark("");
    setAddrCity("Hyderabad");
    setAddrState("Telangana");
    setAddrPincode("");
    setAddrType("Home");
    setAddrDefault(addresses.length === 0);
    setAddressModalOpen(true);
  };

  const handleOpenEditAddress = (addr: UserAddress) => {
    setEditingAddressId(addr.id);
    setAddrName(addr.fullName);
    setAddrPhone(addr.phone);
    setAddrAltPhone(addr.alternatePhone || "");
    setAddrFlat(addr.flatHouse);
    setAddrStreet(addr.areaStreet);
    setAddrLandmark(addr.landmark || "");
    setAddrCity(addr.city);
    setAddrState(addr.state);
    setAddrPincode(addr.pincode);
    setAddrType(addr.addressType);
    setAddrDefault(addr.isDefault);
    setAddressModalOpen(true);
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!addrName.trim() || !addrPhone.trim() || !addrFlat.trim() || !addrStreet.trim() || !addrCity.trim() || !addrPincode.trim()) {
      toast.error("Please fill in all required address fields.");
      return;
    }

    setSavingAddress(true);
    try {
      const payload: AddressInput = {
        fullName: addrName.trim(),
        phone: addrPhone.trim(),
        alternatePhone: addrAltPhone.trim() || undefined,
        flatHouse: addrFlat.trim(),
        areaStreet: addrStreet.trim(),
        landmark: addrLandmark.trim() || undefined,
        city: addrCity.trim(),
        state: addrState.trim(),
        pincode: addrPincode.trim(),
        addressType: addrType,
        isDefault: addrDefault
      };

      if (editingAddressId) {
        await api.updateUserAddress(token, editingAddressId, payload);
        toast.success("Address updated successfully!");
      } else {
        await api.addUserAddress(token, payload);
        toast.success("New address added successfully!");
      }

      setAddressModalOpen(false);
      loadAddresses();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to save address.");
    } finally {
      setSavingAddress(false);
    }
  };

  const handleDeleteAddress = async (id: number) => {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this delivery address?")) return;
    try {
      await api.deleteUserAddress(token, id);
      toast.success("Address removed.");
      loadAddresses();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to delete address.");
    }
  };

  const handleSetDefaultAddress = async (id: number) => {
    if (!token) return;
    try {
      await api.setDefaultUserAddress(token, id);
      toast.success("Default address updated!");
      loadAddresses();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to set default.");
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await updateProfile({
        name: profileName.trim(),
        phone: profilePhone.trim()
      });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!token) return;
    if (!confirm(`Are you sure you want to cancel Order #${orderId}? Any reserved stock will be automatically restored.`)) {
      return;
    }

    try {
      const res = await api.cancelOrder(token, orderId);
      toast.success(res.message || `Order #${orderId} has been cancelled.`);
      loadOrders();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to cancel order.");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    setSavingPassword(true);
    try {
      await changePassword({
        newPassword,
        confirmPassword: confirmNewPassword
      });
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to change password.");
    } finally {
      setSavingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-xs text-muted-foreground">Loading your account...</p>
        </div>
      </div>
    );
  }

  // If Not Authenticated, prompt login
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center bg-card border border-border p-8 rounded-2xl shadow-xl space-y-5">
          <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-2">
            <User className="h-10 w-10" />
          </div>
          <h2 className="font-display text-2xl font-bold">Sign In to Your Account</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Sign in with your email & OTP to view your orders, download GST Tax Invoices, manage saved delivery addresses, and access your wishlist.
          </p>
          <Button
            onClick={openLoginModal}
            className="w-full rounded-full py-6 text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg btn-shimmer"
          >
            Sign In with Email & OTP
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* User Greeting & Header Card */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-400/30 text-white p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-display text-2xl font-black shadow-md border-2 border-amber-300">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold text-amber-300">
                  Hello, {user.name || "Book Lover"}!
                </h1>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Verified Member
                </span>
              </div>
              <p className="text-slate-300 text-xs mt-1 flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-amber-400" /> {user.email}
                {user.phone && (
                  <>
                    <span className="opacity-40">•</span>
                    <Phone className="h-3.5 w-3.5 text-amber-400" /> {user.phone}
                  </>
                )}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="rounded-full bg-white/10 hover:bg-white/20 text-white border-white/30 text-xs gap-1.5 font-bold"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </Button>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-border pb-1 overflow-x-auto scrollbar-none">
          {[
            { id: "orders", label: "My Orders & Invoices", icon: Package, count: orders.length },
            { id: "addresses", label: "Saved Addresses", icon: MapPin, count: addresses.length },
            { id: "wishlist", label: "My Wishlist", icon: Heart, count: wishlist.length },
            { id: "profile", label: "Account Settings", icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  navigate({ to: "/account", search: { tab: tab.id } });
                }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition border-b-2 whitespace-nowrap",
                  isActive
                    ? "border-primary text-slate-950 dark:text-amber-300 bg-amber-50/80 dark:bg-amber-950/30 shadow-2xs"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground")} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-black",
                      isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* TAB 1: MY ORDERS & INVOICES */}
        {/* ============================================================ */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {loadingOrders ? (
              <div className="py-16 text-center text-muted-foreground">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mb-2" />
                <p className="text-xs">Loading your order history...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-card border border-border rounded-2xl p-10 text-center space-y-3">
                <Package className="h-12 w-12 text-muted-foreground mx-auto stroke-[1.5]" />
                <h3 className="font-display text-lg font-bold">No Orders Placed Yet</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Looks like you haven't placed any orders yet. Discover timeless reads in our shop!
                </p>
                <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold">
                  <a href="/shop">Explore Books</a>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const isDelivered = order.status === "delivered";
                  const isCancelled = order.status === "cancelled";

                  return (
                    <div
                      key={order.id}
                      className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
                    >
                      {/* Order Header Bar */}
                      <div className="bg-muted/40 p-4 border-b border-border flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                          <div>
                            <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Order Placed</span>
                            <span className="font-semibold text-foreground">
                              {order.createdAt
                                ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                  })
                                : "Recent"}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Total Amount</span>
                            <span className="font-bold text-primary font-mono text-sm">₹{order.total}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Ship To</span>
                            <span className="font-medium text-foreground truncate max-w-[120px] block">
                              {order.customerName}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-muted-foreground">
                            #{order.id}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenInvoice(order.id)}
                            className="rounded-lg text-xs gap-1.5 h-8 border-primary/30 text-primary hover:bg-primary/10"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            Tax Invoice
                          </Button>
                          {(order.status === "pending" || order.status === "confirmed") && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCancelOrder(order.id)}
                              className="rounded-lg text-xs gap-1 h-8 border-rose-300 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                            >
                              <RotateCcw className="h-3.5 w-3.5" />
                              Cancel Order
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Order Body */}
                      <div className="p-5 space-y-4">
                        {/* Status Stepper Badge */}
                        <div className="flex items-center justify-between pb-3 border-b border-border/50">
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5",
                                isDelivered
                                  ? "bg-emerald-100 text-emerald-800"
                                  : isCancelled
                                  ? "bg-red-100 text-red-800"
                                  : "bg-amber-100 text-amber-900"
                              )}
                            >
                              {isDelivered ? (
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                              ) : (
                                <Clock className="h-3.5 w-3.5 text-amber-700" />
                              )}
                              Status: {order.status}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              • Payment: <strong className="text-foreground">{order.paymentMethod}</strong>
                            </span>
                          </div>
                        </div>

                        {/* Order Items List */}
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs py-1">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="h-10 w-8 bg-secondary rounded overflow-hidden flex-shrink-0 border border-border flex items-center justify-center">
                                  {(item as any).image || (item as any).cover ? (
                                    <img
                                      src={(item as any).image || (item as any).cover}
                                      alt={item.title}
                                      onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).style.display = "none";
                                      }}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <BookOpen className="h-full w-full p-2 text-muted-foreground" />
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <h4 className="font-bold text-foreground text-xs truncate">
                                    {item.title}
                                  </h4>
                                  <p className="text-[11px] text-muted-foreground">
                                    Qty: {item.quantity} × ₹{item.price}
                                  </p>
                                </div>
                              </div>
                              <span className="font-mono font-bold text-foreground">
                                ₹{item.price * item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Delivery Address Snapshot */}
                        <div className="bg-secondary/30 rounded-xl p-3 text-[11px] text-muted-foreground flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-foreground">Delivering to: </span>
                            {order.deliveryAddress}{order.city ? `, ${order.city}` : ""}{order.pincode ? ` - ${order.pincode}` : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: SAVED ADDRESSES (AMAZON STYLE) */}
        {/* ============================================================ */}
        {activeTab === "addresses" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold">Your Saved Addresses</h3>
                <p className="text-xs text-muted-foreground">
                  Manage delivery locations for fast 1-click checkout
                </p>
              </div>
              <Button
                onClick={handleOpenAddAddress}
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold gap-1.5"
              >
                <Plus className="h-4 w-4" /> Add New Address
              </Button>
            </div>

            {loadingAddresses ? (
              <div className="py-16 text-center text-muted-foreground">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mb-2" />
                <p className="text-xs">Loading addresses...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Add Address Card Button */}
                <button
                  type="button"
                  onClick={handleOpenAddAddress}
                  className="border-2 border-dashed border-border hover:border-primary/50 bg-card/50 hover:bg-card p-6 rounded-2xl flex flex-col items-center justify-center text-center transition min-h-[160px] group"
                >
                  <div className="p-3 rounded-full bg-secondary group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary transition mb-2">
                    <Plus className="h-6 w-6" />
                  </div>
                  <span className="font-bold text-sm text-foreground group-hover:text-primary transition">
                    Add New Delivery Address
                  </span>
                  <span className="text-[11px] text-muted-foreground mt-0.5">
                    Save home, office, or other locations
                  </span>
                </button>

                {/* Existing Address Cards */}
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={cn(
                      "bg-card border rounded-2xl p-5 shadow-sm space-y-3 relative flex flex-col justify-between",
                      addr.isDefault ? "border-primary/60 bg-primary/[0.02]" : "border-border"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-foreground">{addr.fullName}</span>
                          <span className="bg-secondary px-2 py-0.5 rounded text-[10px] font-semibold text-muted-foreground">
                            {addr.addressType}
                          </span>
                        </div>
                        {addr.isDefault && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Default Address
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {addr.flatHouse}, {addr.areaStreet}
                        {addr.landmark && `, Near ${addr.landmark}`}
                        <br />
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>

                      <p className="text-xs text-foreground font-medium mt-2">
                        Phone number: {addr.phone}
                        {addr.alternatePhone && ` | Alt: ${addr.alternatePhone}`}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleOpenEditAddress(addr)}
                          className="text-primary hover:underline font-semibold flex items-center gap-1"
                        >
                          <Edit2 className="h-3 w-3" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="text-destructive hover:underline font-medium flex items-center gap-1"
                        >
                          <Trash2 className="h-3 w-3" /> Delete
                        </button>
                      </div>

                      {!addr.isDefault && (
                        <button
                          onClick={() => handleSetDefaultAddress(addr.id)}
                          className="text-xs text-muted-foreground hover:text-foreground underline"
                        >
                          Set as default
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: MY WISHLIST */}
        {/* ============================================================ */}
        {activeTab === "wishlist" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold">Your Saved Wishlist</h3>
                <p className="text-xs text-muted-foreground">
                  {wishlist.length} {wishlist.length === 1 ? "book" : "books"} saved for later
                </p>
              </div>
            </div>

            {wishlist.length === 0 ? (
              <div className="bg-card border border-border rounded-2xl p-10 text-center space-y-3">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto stroke-[1.5]" />
                <h3 className="font-display text-lg font-bold">Your Wishlist is Empty</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Click the heart icon on any book card to save it here for future reading!
                </p>
                <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold">
                  <a href="/shop">Browse Catalog</a>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlist.map((book) => {
                  const price = Number(book.price) || 0;
                  const mrp = Number(book.mrp || book.old_price || book.oldPrice || price);
                  const discount = Number(book.discount_percent) || (mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0);

                  return (
                    <div
                      key={book.id}
                      className="bg-card border border-border rounded-2xl p-4 shadow-sm hover:shadow-md transition flex gap-4"
                    >
                      <div className="w-20 h-28 flex-shrink-0 overflow-hidden rounded-xl bg-secondary border border-border relative">
                        <img
                          src={book.cover || book.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"}
                          alt={book.title}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop";
                          }}
                          className="h-full w-full object-cover"
                        />
                        {discount > 0 && (
                          <span className="absolute top-1 left-1 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                            {discount}% OFF
                          </span>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          {book.sub_category && (
                            <span className="text-[10px] font-bold text-primary uppercase tracking-wider block truncate">
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

                        <div className="flex items-center gap-2 pt-2 mt-2 border-t border-border">
                          <Button
                            size="sm"
                            onClick={() => {
                              addToCart(book, 1);
                              removeFromWishlist(book.id);
                              toast.success(`Moved "${book.title}" to your Bag!`);
                            }}
                            className="flex-1 h-8 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold gap-1"
                          >
                            <ShoppingBag className="h-3 w-3" />
                            Move to Bag
                          </Button>
                          <button
                            onClick={() => removeFromWishlist(book.id)}
                            className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
                            title="Remove"
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
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: PROFILE & ACCOUNT SETTINGS */}
        {/* ============================================================ */}
        {activeTab === "profile" && (
          <div className="max-w-xl bg-card border border-border rounded-2xl p-6 shadow-sm space-y-5">
            <div>
              <h3 className="font-display text-lg font-bold">Profile Details</h3>
              <p className="text-xs text-muted-foreground">
                Update your contact information for orders and communications
              </p>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Registered Email Address (Locked)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-secondary/50 text-foreground text-xs cursor-not-allowed opacity-80"
                  />
                </div>
                <p className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Email is verified with OTP
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Primary Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={savingProfile}
                  className="w-full rounded-xl py-5 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow transition"
                >
                  {savingProfile ? "Saving Profile..." : "Save Changes"}
                </Button>
              </div>
            </form>

            {/* Account Security Card */}
            <div className="border-t border-border pt-6 space-y-4">
              <div>
                <h3 className="font-display text-lg font-bold flex items-center gap-2">
                  <Lock className="h-4 w-4 text-amber-600" />
                  Account Password Setup
                </h3>
                <p className="text-xs text-muted-foreground">
                  Set a password for your account to sign in securely from any device.
                </p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      New Password (min. 6 chars)
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type={showNewPwd ? "text" : "password"}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full pl-10 pr-11 py-2 rounded-xl border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPwd(!showNewPwd)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                      >
                        {showNewPwd ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      Again New Password (Confirm)
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type={showConfirmNewPwd ? "text" : "password"}
                        required
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        placeholder="Re-enter new password"
                        className="w-full pl-10 pr-11 py-2 rounded-xl border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmNewPwd(!showConfirmNewPwd)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                      >
                        {showConfirmNewPwd ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {newPassword && confirmNewPassword && newPassword !== confirmNewPassword && (
                  <p className="text-[11px] text-rose-500 font-medium">
                    ⚠️ Passwords do not match. Please ensure both fields are identical.
                  </p>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={savingPassword || !newPassword || !confirmNewPassword || newPassword !== confirmNewPassword}
                    className="w-full rounded-xl py-5 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow transition"
                  >
                    {savingPassword ? "Updating Password..." : "Save New Password"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Tax Invoice Modal */}
      {selectedInvoiceOrderId && (
        <TaxInvoiceModal
          orderId={selectedInvoiceOrderId}
          open={invoiceModalOpen}
          onOpenChange={setInvoiceModalOpen}
        />
      )}

      {/* Add / Edit Address Dialog Modal */}
      <Dialog open={addressModalOpen} onOpenChange={setAddressModalOpen}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-card border-border rounded-2xl shadow-2xl">
          <DialogHeader className="p-5 border-b border-border bg-secondary/30">
            <DialogTitle className="font-display text-lg font-bold">
              {editingAddressId ? "Edit Delivery Address" : "Add New Delivery Address"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Enter your exact delivery address for hassle-free shipping
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveAddress} className="p-5 space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={addrName}
                  onChange={(e) => setAddrName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={addrPhone}
                  onChange={(e) => setAddrPhone(e.target.value)}
                  placeholder="10-digit number"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                Flat, House No., Building, Apartment *
              </label>
              <input
                type="text"
                required
                value={addrFlat}
                onChange={(e) => setAddrFlat(e.target.value)}
                placeholder="e.g. Flat 301, Emerald Towers"
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                Area, Street, Sector *
              </label>
              <input
                type="text"
                required
                value={addrStreet}
                onChange={(e) => setAddrStreet(e.target.value)}
                placeholder="e.g. Jubilee Hills, Road No 36"
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
                  value={addrLandmark}
                  onChange={(e) => setAddrLandmark(e.target.value)}
                  placeholder="Near Metro"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={addrCity}
                  onChange={(e) => setAddrCity(e.target.value)}
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
                  value={addrPincode}
                  onChange={(e) => setAddrPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="500033"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-muted-foreground">Type:</span>
                {(["Home", "Work", "Other"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setAddrType(t)}
                    className={cn(
                      "px-2.5 py-1 rounded text-xs font-semibold border transition",
                      addrType === t
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary text-muted-foreground border-border hover:bg-secondary/80"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={addrDefault}
                  onChange={(e) => setAddrDefault(e.target.checked)}
                  className="rounded text-primary focus:ring-primary h-3.5 w-3.5"
                />
                Set as default
              </label>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAddressModalOpen(false)}
                className="rounded-xl text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={savingAddress}
                className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold"
              >
                {savingAddress ? "Saving..." : editingAddressId ? "Update Address" : "Save Address"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
