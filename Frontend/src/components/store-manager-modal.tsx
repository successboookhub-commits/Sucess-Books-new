import { useState, useEffect } from "react";
import { Settings, Package, BookPlus, RefreshCw, CheckCircle2, MessageSquare, ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { api, type OrderData } from "@/lib/api";
import { categories, type Book } from "@/lib/books";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";

interface StoreManagerModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function StoreManagerModal({ open, onOpenChange, trigger }: StoreManagerModalProps) {
  const { refreshCatalog } = useCart();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingContacts, setLoadingContacts] = useState(false);

  // New Book form state
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newCategory, setNewCategory] = useState("Fiction");
  const [newPrice, setNewPrice] = useState("");
  const [newOldPrice, setNewOldPrice] = useState("");
  const [newCover, setNewCover] = useState("bg-primary");
  const [newLabel, setNewLabel] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [addingBook, setAddingBook] = useState(false);

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const data = await api.getAllOrders();
      setOrders(data);
    } catch {
      toast.error("Failed to load orders from backend.");
    } finally {
      setLoadingOrders(false);
    }
  };

  const loadContacts = async () => {
    setLoadingContacts(true);
    try {
      const res = await fetch("http://localhost:5000/api/contact");
      const data = await res.json();
      if (data.data) setContacts(data.data);
    } catch {
      // ignore
    } finally {
      setLoadingContacts(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadOrders();
      loadContacts();
    }
  }, [open]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      toast.success(`Order #${orderId} set to ${newStatus}`);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o));
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to update status");
    }
  };

  const handleCreateBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim() || !newPrice) {
      toast.error("Title, Author, and Price are required.");
      return;
    }

    setAddingBook(true);
    try {
      await api.createBook({
        title: newTitle.trim(),
        author: newAuthor.trim(),
        category: newCategory,
        price: parseFloat(newPrice),
        oldPrice: newOldPrice ? parseFloat(newOldPrice) : undefined,
        cover: newCover,
        label: newLabel.trim() || undefined,
        description: newDescription.trim() || undefined
      });

      toast.success(`"${newTitle}" added to store inventory!`);
      setNewTitle("");
      setNewAuthor("");
      setNewPrice("");
      setNewOldPrice("");
      setNewLabel("");
      setNewDescription("");
      await refreshCatalog();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to add book");
    } finally {
      setAddingBook(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl p-0">
        <DialogHeader className="p-6 pb-4 border-b border-border flex flex-row items-center justify-between">
          <DialogTitle className="font-display text-2xl text-primary flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" /> Store Management Console
          </DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <Tabs defaultValue="orders" className="space-y-5">
            <TabsList className="grid grid-cols-3 bg-secondary">
              <TabsTrigger value="orders" className="gap-2">
                <Package className="h-4 w-4" /> Live Orders ({orders.length})
              </TabsTrigger>
              <TabsTrigger value="add-book" className="gap-2">
                <BookPlus className="h-4 w-4" /> Add New Book
              </TabsTrigger>
              <TabsTrigger value="messages" className="gap-2">
                <MessageSquare className="h-4 w-4" /> Inquiries ({contacts.length})
              </TabsTrigger>
            </TabsList>

            {/* Orders Management */}
            <TabsContent value="orders" className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Manage customer book bookings and fulfillment status.</p>
                <Button size="sm" variant="ghost" onClick={loadOrders} disabled={loadingOrders} className="h-8 gap-1 text-xs">
                  <RefreshCw className={cn("h-3.5 w-3.5", loadingOrders && "animate-spin")} /> Refresh
                </Button>
              </div>

              {loadingOrders ? (
                <div className="py-12 text-center text-xs text-muted-foreground">Loading orders from backend...</div>
              ) : orders.length === 0 ? (
                <div className="py-12 text-center rounded-lg border border-dashed border-border p-6">
                  <Package className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm font-semibold">No orders yet</p>
                  <p className="text-xs text-muted-foreground">Orders placed by customers will appear here in real-time.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="rounded-lg border border-border bg-card p-4 space-y-3 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-base font-bold text-primary">{order.id}</span>
                          <span className="text-muted-foreground">• {order.createdAt}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-muted-foreground">Status:</span>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={cn(
                              "h-7 rounded-md px-2 font-bold text-xs border border-border cursor-pointer outline-none",
                              order.status === "delivered" ? "bg-emerald-50 text-emerald-800" :
                              order.status === "dispatched" ? "bg-blue-50 text-blue-800" :
                              order.status === "confirmed" ? "bg-amber-50 text-amber-800" :
                              order.status === "cancelled" ? "bg-red-50 text-red-800" :
                              "bg-orange-50 text-orange-800"
                            )}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 text-muted-foreground">
                        <div>
                          <strong className="text-foreground">{order.customerName}</strong> ({order.customerPhone})
                          <p className="text-[11px]">{order.deliveryAddress}{order.city ? `, ${order.city}` : ""}{order.pincode ? ` - ${order.pincode}` : ""}</p>
                        </div>
                        <div className="text-right sm:text-right">
                          <p>Payment: <strong className="text-foreground">{order.paymentMethod}</strong></p>
                          <p className="text-foreground font-bold text-sm">Total: ₹{order.total}</p>
                        </div>
                      </div>

                      <div className="bg-secondary/40 rounded p-2 text-[11px] text-muted-foreground">
                        <strong>Items:</strong> {order.items.map(i => `${i.title} (x${i.quantity})`).join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Add Book Tab */}
            <TabsContent value="add-book">
              <form onSubmit={handleCreateBook} className="rounded-lg border border-border bg-card p-5 space-y-4 text-xs">
                <p className="text-xs text-muted-foreground">Add a new book title directly into the SQLite database. It will instantly appear on the store catalog.</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-foreground block mb-1">Book Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Beyond the Far Mountains"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full h-9 rounded-md border border-border bg-background px-3 outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-foreground block mb-1">Author Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arundhati Sharma"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full h-9 rounded-md border border-border bg-background px-3 outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-foreground block mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full h-9 rounded-md border border-border bg-background px-2 outline-none focus:border-primary"
                    >
                      {categories.filter(c => c !== "All").map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-foreground block mb-1">Price (₹) *</label>
                    <input
                      type="number"
                      required
                      placeholder="399"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full h-9 rounded-md border border-border bg-background px-3 outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-foreground block mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      placeholder="499"
                      value={newOldPrice}
                      onChange={(e) => setNewOldPrice(e.target.value)}
                      className="w-full h-9 rounded-md border border-border bg-background px-3 outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-foreground block mb-1">Cover Aesthetic</label>
                    <select
                      value={newCover}
                      onChange={(e) => setNewCover(e.target.value)}
                      className="w-full h-9 rounded-md border border-border bg-background px-2 outline-none focus:border-primary"
                    >
                      <option value="bg-primary">Deep Maroon (Primary)</option>
                      <option value="bg-maroon-soft">Soft Crimson</option>
                      <option value="bg-gold">Amber Gold</option>
                      <option value="bg-foreground">Charcoal Midnight</option>
                      <option value="bg-whatsapp">Emerald Green</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-foreground block mb-1">Badge / Label (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. New Release / Bestseller"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      className="w-full h-9 rounded-md border border-border bg-background px-3 outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">Synopsis / Description</label>
                  <textarea
                    rows={3}
                    placeholder="Short description of the book..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full rounded-md border border-border bg-background p-2.5 outline-none focus:border-primary"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" disabled={addingBook} className="h-10 rounded-full px-7 text-xs">
                    {addingBook ? "Saving to Database..." : "Add Book to Inventory"}
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* Inquiries Tab */}
            <TabsContent value="messages" className="space-y-3">
              {loadingContacts ? (
                <div className="py-12 text-center text-xs text-muted-foreground">Loading inquiries...</div>
              ) : contacts.length === 0 ? (
                <div className="py-12 text-center text-xs text-muted-foreground">No customer inquiries yet.</div>
              ) : (
                <div className="space-y-3">
                  {contacts.map((c) => (
                    <div key={c.id} className="rounded-lg border border-border bg-card p-4 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between font-bold text-foreground">
                        <span>{c.name} {c.phone && `(${c.phone})`}</span>
                        <span className="text-muted-foreground text-[10px]">{c.created_at}</span>
                      </div>
                      {c.email && <p className="text-muted-foreground text-[11px]">{c.email}</p>}
                      <p className="bg-secondary/40 rounded p-2.5 text-foreground leading-relaxed">{c.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
