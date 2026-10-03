import { useState } from "react";
import { Search, Package, CheckCircle2, Clock, Truck, MapPin, AlertCircle, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { api, type OrderData } from "@/lib/api";
import { WHATSAPP_NUMBER } from "@/lib/books";
import { cn } from "@/lib/utils";

interface OrderTrackerModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialOrderId?: string;
  trigger?: React.ReactNode;
}

export function OrderTrackerModal({ open, onOpenChange, initialOrderId = "", trigger }: OrderTrackerModalProps) {
  const [orderIdInput, setOrderIdInput] = useState(initialOrderId);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (idToSearch?: string) => {
    const id = (idToSearch || orderIdInput).trim();
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const data = await api.trackOrder(id);
      setOrder(data);
    } catch (err: unknown) {
      setOrder(null);
      setError(err instanceof Error ? err.message : `Order ${id} could not be found.`);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { key: "pending", label: "Order Placed", icon: Clock },
    { key: "confirmed", label: "Confirmed", icon: CheckCircle2 },
    { key: "dispatched", label: "Dispatched", icon: Truck },
    { key: "delivered", label: "Delivered", icon: Package },
  ];

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const statusOrder = ["pending", "confirmed", "dispatched", "delivered"];
    const currentIndex = statusOrder.indexOf(currentStatus.toLowerCase());
    const stepIndex = statusOrder.indexOf(stepKey);

    if (currentStatus === "cancelled") return "cancelled";
    if (stepIndex <= currentIndex) return "completed";
    return "upcoming";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl p-0">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="font-display text-2xl text-primary flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" /> Track Your Book Order
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Search Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTrack();
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. SBH-9734)"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value.toUpperCase())}
                className="w-full h-11 pl-10 pr-3 rounded-full border border-border bg-card text-sm font-semibold outline-none focus:border-primary uppercase tracking-wider"
              />
            </div>
            <Button type="submit" disabled={loading} className="rounded-full px-6 h-11">
              {loading ? "Searching..." : "Track"}
            </Button>
          </form>

          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-xs text-destructive flex items-center gap-3">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {order && (
            <div className="space-y-6 animate-in fade-in-50">
              {/* Status Header */}
              <div className="rounded-xl bg-secondary/50 border border-border p-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Tracking Code</span>
                  <p className="font-display text-2xl font-bold text-primary">{order.id}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Current Status</span>
                  <p className={cn(
                    "text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block mt-0.5",
                    order.status === "delivered" ? "bg-emerald-100 text-emerald-800" :
                    order.status === "dispatched" ? "bg-blue-100 text-blue-800" :
                    order.status === "confirmed" ? "bg-amber-100 text-amber-800" :
                    order.status === "cancelled" ? "bg-red-100 text-red-800" :
                    "bg-orange-100 text-orange-800"
                  )}>
                    {order.status}
                  </p>
                </div>
              </div>

              {/* Progress Steps */}
              {order.status !== "cancelled" ? (
                <div className="py-2">
                  <div className="grid grid-cols-4 gap-1 relative text-center">
                    {steps.map((step, idx) => {
                      const status = getStepStatus(step.key, order.status);
                      const StepIcon = step.icon;
                      return (
                        <div key={step.key} className="flex flex-col items-center space-y-1.5 z-10">
                          <div className={cn(
                            "h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold transition",
                            status === "completed"
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "bg-muted text-muted-foreground border border-border"
                          )}>
                            <StepIcon className="h-4 w-4" />
                          </div>
                          <span className={cn(
                            "text-[10px] font-semibold",
                            status === "completed" ? "text-foreground font-bold" : "text-muted-foreground"
                          )}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p className="text-center text-xs text-destructive font-semibold">
                  This order was cancelled. Please contact customer care for assistance.
                </p>
              )}

              {/* Order Info & Delivery Address */}
              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div className="rounded-lg border border-border p-3.5 space-y-1.5 bg-card">
                  <p className="font-bold text-foreground flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> Delivery Address
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>{order.customerName}</strong> ({order.customerPhone})<br />
                    {order.deliveryAddress}
                    {order.city ? `, ${order.city}` : ""}
                    {order.pincode ? ` - ${order.pincode}` : ""}
                  </p>
                </div>

                <div className="rounded-lg border border-border p-3.5 space-y-1.5 bg-card">
                  <p className="font-bold text-foreground">Payment & Summary</p>
                  <div className="space-y-1 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Method:</span>
                      <strong className="text-foreground">{order.paymentMethod}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{order.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery:</span>
                      <span>{order.deliveryFee === 0 ? "FREE" : `₹${order.deliveryFee}`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-foreground border-t border-border pt-1">
                      <span>Total Amount:</span>
                      <span className="text-primary font-display text-sm">₹{order.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="border border-border rounded-lg p-4 space-y-2 bg-card">
                <p className="font-bold text-xs text-foreground uppercase tracking-wider">Ordered Books ({order.items.length})</p>
                <div className="divide-y divide-border text-xs">
                  {order.items.map((item, i) => (
                    <div key={i} className="py-2 flex items-center justify-between">
                      <span className="font-medium text-foreground">{item.title} <span className="text-muted-foreground">× {item.quantity}</span></span>
                      <span className="font-bold text-primary">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Need Help WhatsApp Button */}
              <Button
                variant="outline"
                className="w-full rounded-full gap-2 text-whatsapp border-whatsapp/30 hover:bg-whatsapp/10"
                asChild
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hello Success Book Hub! I have a question regarding my order #${order.id}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="h-4 w-4 text-whatsapp" /> Query on WhatsApp regarding Order #{order.id}
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
