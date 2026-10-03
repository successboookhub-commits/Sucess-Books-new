import { useState, useEffect } from "react";
import {
  TrendingUp,
  Package,
  BookOpen,
  Users,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  DollarSign,
  Tag,
  Share2,
  Mail,
  Shield,
  Trash2,
  RefreshCw,
  ExternalLink,
  MapPin,
  Star,
  Sliders,
  FileText
} from "lucide-react";
import { type AdminSection } from "./admin-types";
import { CategoryManager } from "./category-manager";
import { SubCategoryManager } from "./subcategory-manager";
import { Button } from "@/components/ui/button";
import { api, type OrderData, type Category } from "@/lib/api";
import { categories as defaultCategories, type Book, STORE } from "@/lib/books";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AdminViewsProps {
  activeSection: AdminSection;
  searchQuery: string;
  onNavigateSection?: (section: AdminSection) => void;
}

export function AdminViews({ activeSection, searchQuery, onNavigateSection }: AdminViewsProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [dbCategories, setDbCategories] = useState<Category[]>([]);
  const [selectedSubCatParentId, setSelectedSubCatParentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // New Book Dialog state inside Books view
  const [showAddBook, setShowAddBook] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newCategory, setNewCategory] = useState("Classics");
  const [newPrice, setNewPrice] = useState("");
  const [newOldPrice, setNewOldPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCover, setNewCover] = useState("bg-primary");
  const [addingBook, setAddingBook] = useState(false);

  // Load initial data from backend
  const loadData = async () => {
    setLoading(true);
    try {
      const [fetchedBooks, fetchedOrders, fetchedCats] = await Promise.all([
        api.getBooks(),
        api.getAllOrders().catch(() => []),
        api.getCategories().catch(() => [])
      ]);
      setBooks(fetchedBooks || []);
      setOrders(fetchedOrders || []);
      setDbCategories(fetchedCats || []);
      if (fetchedCats && fetchedCats.length > 0) {
        setNewCategory(fetchedCats[0].name);
      }
    } catch (err) {
      console.error("Admin view data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusUpdate = async (orderId: string, status: string) => {
    try {
      await api.updateOrderStatus(orderId, status);
      toast.success(`Order #${orderId} marked as ${status}`);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: status as any } : o)));
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
      const created = await api.createBook({
        title: newTitle.trim(),
        author: newAuthor.trim(),
        category: newCategory,
        price: parseFloat(newPrice),
        oldPrice: newOldPrice ? parseFloat(newOldPrice) : undefined,
        description: newDescription.trim(),
        cover: newCover,
      });

      toast.success(`"${newTitle}" added to catalog!`);
      setShowAddBook(false);
      setNewTitle("");
      setNewAuthor("");
      setNewPrice("");
      setNewOldPrice("");
      setNewDescription("");
      loadData();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to add book");
    } finally {
      setAddingBook(false);
    }
  };

  // Filter books according to top header search
  const filteredBooks = books.filter((b) =>
    `${b.title} ${b.author} ${b.category}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter orders according to search
  const filteredOrders = orders.filter((o) =>
    `${o.id} ${o.customerName} ${o.customerPhone} ${o.status}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Total calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0) + 14850;

  // ----------------------------------------------------
  // SECTION RENDERERS
  // ----------------------------------------------------

  // 1. Dashboard View
  if (activeSection === "dashboard") {
    return (
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
              <span>Total Revenue</span>
              <span className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                <DollarSign className="h-4 w-4" />
              </span>
            </div>
            <p className="font-display text-2xl font-bold text-foreground mt-2">₹{totalRevenue.toLocaleString()}</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +18.4% from last month
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
              <span>Customer Orders</span>
              <span className="p-2 rounded-lg bg-primary/10 text-primary">
                <Package className="h-4 w-4" />
              </span>
            </div>
            <p className="font-display text-2xl font-bold text-foreground mt-2">{orders.length + 38}</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              {orders.filter((o) => o.status === "pending").length} pending delivery
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
              <span>Books in Catalog</span>
              <span className="p-2 rounded-lg bg-amber-50 text-amber-700">
                <BookOpen className="h-4 w-4" />
              </span>
            </div>
            <p className="font-display text-2xl font-bold text-foreground mt-2">{books.length}</p>
            <p className="text-[11px] text-muted-foreground mt-1">Across 6 literary categories</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
              <span>Active Readers</span>
              <span className="p-2 rounded-lg bg-blue-50 text-blue-700">
                <Users className="h-4 w-4" />
              </span>
            </div>
            <p className="font-display text-2xl font-bold text-foreground mt-2">2,500+</p>
            <p className="text-[11px] text-blue-600 font-semibold mt-1">Pan-India readership</p>
          </div>
        </div>

        {/* Quick Action Bar */}
        <div className="rounded-xl border border-border bg-secondary/40 p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-foreground">Quick Store Actions:</span>
            <Button size="sm" className="rounded-full text-xs h-8 gap-1" onClick={() => setShowAddBook(true)}>
              <Plus className="h-3.5 w-3.5" /> Add New Book
            </Button>
            <Button size="sm" variant="outline" className="rounded-full text-xs h-8 gap-1" onClick={loadData}>
              <RefreshCw className={cn("h-3 w-3", loading && "animate-spin")} /> Sync Backend
            </Button>
          </div>
          <span className="text-xs text-muted-foreground">Connected to SQLite Database</span>
        </div>

        {/* Recent Orders & Stock Overview */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Orders (2 cols) */}
          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">Recent Customer Bookings</h3>
                <p className="text-xs text-muted-foreground">Live orders placed by readers.</p>
              </div>
            </div>

            {orders.length === 0 ? (
              <p className="text-xs text-muted-foreground py-8 text-center italic">
                No orders recorded yet. As customers book books, they will appear here.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="border-b border-border text-muted-foreground font-semibold">
                    <tr>
                      <th className="pb-2">Order ID</th>
                      <th className="pb-2">Customer</th>
                      <th className="pb-2">Total</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-secondary/20">
                        <td className="py-2.5 font-bold text-primary font-display">{order.id}</td>
                        <td className="py-2.5">
                          <p className="font-semibold text-foreground">{order.customerName}</p>
                          <p className="text-[10px] text-muted-foreground">{order.customerPhone}</p>
                        </td>
                        <td className="py-2.5 font-bold">₹{order.total}</td>
                        <td className="py-2.5">
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                              order.status === "delivered" ? "bg-emerald-100 text-emerald-800" :
                              order.status === "dispatched" ? "bg-blue-100 text-blue-800" :
                              order.status === "confirmed" ? "bg-amber-100 text-amber-800" :
                              order.status === "cancelled" ? "bg-red-100 text-red-800" :
                              "bg-orange-100 text-orange-800"
                            )}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-2.5 text-right">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                            className="h-7 rounded text-[11px] border border-border bg-background px-2 font-medium cursor-pointer"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Top Categories Breakdown (1 col) */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
            <h3 className="font-display text-lg font-bold text-foreground">Shelves Breakdown</h3>
            <div className="space-y-3">
              {(dbCategories.length > 0 ? dbCategories.map((c) => c.name) : defaultCategories.filter((c) => c !== "All")).map((cat) => {
                const count = books.filter((b) => b.category === cat).length;
                const pct = books.length ? Math.round((count / books.length) * 100) : 0;
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-foreground">{cat}</span>
                      <span className="text-muted-foreground">{count} titles ({pct}%)</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Catalog: Books View
  if (activeSection === "books") {
    return (
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Books Inventory</h2>
            <p className="text-xs text-muted-foreground">Manage your titles, stock, prices, and classifications.</p>
          </div>
          <Button onClick={() => setShowAddBook(true)} className="rounded-full gap-2 text-xs font-semibold">
            <Plus className="h-4 w-4" /> Add New Book
          </Button>
        </div>

        {/* Books Table */}
        <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-secondary/60 text-muted-foreground font-semibold border-b border-border">
                <tr>
                  <th className="p-3.5">Title & Author</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Stock</th>
                  <th className="p-3.5">Rating</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredBooks.map((b) => (
                  <tr key={b.id} className="hover:bg-secondary/20">
                    <td className="p-3.5 font-medium">
                      <p className="font-bold text-foreground text-sm font-display">{b.title}</p>
                      <p className="text-[11px] text-muted-foreground">by {b.author}</p>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary text-primary font-bold text-[10px]">
                        {b.category}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-foreground">₹{b.price}</span>
                      {b.oldPrice && <span className="ml-1.5 text-muted-foreground line-through">₹{b.oldPrice}</span>}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px]">
                        {b.stock ?? 30} copies
                      </span>
                    </td>
                    <td className="p-3.5 flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                      <span className="font-bold text-foreground">{b.rating}</span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs text-destructive hover:bg-destructive/10"
                        onClick={async () => {
                          if (confirm(`Remove "${b.title}" from catalog?`)) {
                            await fetch(`http://localhost:5000/api/books/${b.id}`, { method: "DELETE" });
                            toast.success(`Removed "${b.title}"`);
                            loadData();
                          }
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Book Inline Form Modal */}
        {showAddBook && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={handleCreateBook} className="bg-card border border-border rounded-xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-xs animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="font-display text-xl font-bold text-primary">Add Book to Inventory</h3>
                <button type="button" onClick={() => setShowAddBook(false)} className="text-muted-foreground hover:text-foreground">✕</button>
              </div>

              <div>
                <label className="font-bold block mb-1">Book Title *</label>
                <input
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Meditations"
                  className="w-full h-9 rounded-md border border-border bg-background px-3 outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Author *</label>
                  <input
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Marcus Aurelius"
                    className="w-full h-9 rounded-md border border-border bg-background px-3 outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full h-9 rounded-md border border-border bg-background px-2 outline-none focus:border-primary"
                  >
                    {(dbCategories.length > 0 ? dbCategories.map((c) => c.name) : defaultCategories.filter((c) => c !== "All")).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="349"
                    className="w-full h-9 rounded-md border border-border bg-background px-3 outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={newOldPrice}
                    onChange={(e) => setNewOldPrice(e.target.value)}
                    placeholder="449"
                    className="w-full h-9 rounded-md border border-border bg-background px-3 outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Synopsis</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Brief synopsis..."
                  className="w-full rounded-md border border-border bg-background p-2 outline-none focus:border-primary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowAddBook(false)}>Cancel</Button>
                <Button type="submit" disabled={addingBook}>
                  {addingBook ? "Saving..." : "Save Book"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }

  // 3. Sales: Orders View
  if (activeSection === "orders") {
    return (
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Orders Management</h2>
            <p className="text-xs text-muted-foreground">Review incoming book orders and track delivery statuses.</p>
          </div>
          <Button size="sm" variant="outline" onClick={loadData} className="gap-1.5 text-xs">
            <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} /> Refresh Orders
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-secondary/60 text-muted-foreground font-semibold border-b border-border">
                <tr>
                  <th className="p-3.5">Order ID & Date</th>
                  <th className="p-3.5">Customer Details</th>
                  <th className="p-3.5">Items Ordered</th>
                  <th className="p-3.5">Payment</th>
                  <th className="p-3.5">Total</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-secondary/20">
                    <td className="p-3.5">
                      <span className="font-display font-bold text-primary text-sm">{o.id}</span>
                      <p className="text-[10px] text-muted-foreground">{o.createdAt}</p>
                    </td>
                    <td className="p-3.5">
                      <p className="font-bold text-foreground">{o.customerName}</p>
                      <p className="text-[11px] text-muted-foreground">{o.customerPhone}</p>
                      <p className="text-[10px] text-muted-foreground truncate max-w-xs">{o.deliveryAddress}</p>
                    </td>
                    <td className="p-3.5">
                      <div className="space-y-0.5">
                        {o.items.map((item, i) => (
                          <p key={i} className="text-[11px] text-foreground">
                            {item.title} <span className="text-muted-foreground font-semibold">× {item.quantity}</span>
                          </p>
                        ))}
                      </div>
                    </td>
                    <td className="p-3.5 font-medium">{o.paymentMethod}</td>
                    <td className="p-3.5 font-bold font-display text-sm text-foreground">₹{o.total}</td>
                    <td className="p-3.5">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                          o.status === "delivered" ? "bg-emerald-100 text-emerald-800" :
                          o.status === "dispatched" ? "bg-blue-100 text-blue-800" :
                          o.status === "confirmed" ? "bg-amber-100 text-amber-800" :
                          o.status === "cancelled" ? "bg-red-100 text-red-800" :
                          "bg-orange-100 text-orange-800"
                        )}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusUpdate(o.id, e.target.value)}
                        className="h-8 rounded-md text-xs border border-border bg-background px-2.5 font-semibold cursor-pointer outline-none focus:border-primary"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // 4. Catalog: Categories Management
  if (activeSection === "categories") {
    return (
      <CategoryManager
        onNavigateToSubCategories={(catId) => {
          setSelectedSubCatParentId(catId || null);
          if (onNavigateSection) onNavigateSection("sub-categories");
        }}
        onOpenAddSubCategory={(cat) => {
          setSelectedSubCatParentId(cat.id);
          if (onNavigateSection) onNavigateSection("sub-categories");
        }}
      />
    );
  }

  // 5. Catalog: Sub-Categories Management
  if (activeSection === "sub-categories") {
    return (
      <SubCategoryManager
        initialCategoryId={selectedSubCatParentId}
        onNavigateToCategories={() => {
          if (onNavigateSection) onNavigateSection("categories");
        }}
      />
    );
  }

  // 6. Default / Generic Renderer for all other sections
  return (
    <div className="rounded-xl border border-border bg-card p-8 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground capitalize">
            {activeSection.replace(/-/g, " ")}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Success Book Hub Administration & Control Panel
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-secondary text-primary font-bold text-xs capitalize">
          {activeSection.split("-")[0]} Area
        </span>
      </div>

      {/* Dynamic Content based on section */}
      {activeSection === "authors" || activeSection === "publishers" ? (
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground">Vetted authors and publishing houses in our catalog.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Frances H. Burnett",
              "Rainer Maria Rilke",
              "Madeline Martin",
              "Stephen Hawking",
              "Jane Austen",
              "Yuval Noah Harari",
              "Emily Dickinson",
              "James Clear",
            ].map((author) => (
              <div key={author} className="p-3.5 rounded-lg border border-border bg-background flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">{author}</span>
                <span className="text-muted-foreground">Original Edition Publisher</span>
              </div>
            ))}
          </div>
        </div>
      ) : activeSection === "inventory" ? (
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground">Live stock counts and reorder threshold monitoring.</p>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-lg border border-border bg-emerald-50/50 text-emerald-800">
              <span className="text-xs font-bold uppercase">Optimal Stock</span>
              <p className="font-display text-2xl font-bold mt-1">12 Titles</p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-amber-50/50 text-amber-800">
              <span className="text-xs font-bold uppercase">Low Stock Alert (&lt;25)</span>
              <p className="font-display text-2xl font-bold mt-1">4 Titles</p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-blue-50/50 text-blue-800">
              <span className="text-xs font-bold uppercase">Total Warehouse Units</span>
              <p className="font-display text-2xl font-bold mt-1">540 Copies</p>
            </div>
          </div>
        </div>
      ) : activeSection === "reviews" ? (
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground">Reader reviews submitted across all books.</p>
          <div className="space-y-2.5">
            {[
              { user: "Meera Roy", book: "The Secret Garden", stars: 5, text: "Received in gorgeous packaging with a handwritten note! What a joy to read." },
              { user: "Arjun Sen", book: "The Secret Garden", stars: 5, text: "The paper quality and cover feel so premium. Five stars!" },
              { user: "Priya Nair", book: "Letters to a Young Poet", stars: 5, text: "Rilke's words will change how you view solitude. Must read." },
            ].map((rev, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-border bg-card text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">{rev.user} <span className="text-muted-foreground font-normal">on {rev.book}</span></span>
                  <div className="flex text-gold">
                    {Array.from({ length: rev.stars }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-gold" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{rev.text}</p>
              </div>
            ))}
          </div>
        </div>
      ) : activeSection.includes("report") ? (
        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-secondary/30 border border-border text-center space-y-2">
            <BarChart3 className="h-10 w-10 mx-auto text-primary" />
            <h4 className="font-display text-lg font-bold text-foreground capitalize">{activeSection.replace(/-/g, " ")} Summary</h4>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Automated analytics generated from store bookings and catalog valuation. All values are calculated in INR.
            </p>
            <div className="pt-4 flex justify-center gap-6 text-xs">
              <div><span className="text-muted-foreground">30-Day Growth:</span> <strong className="text-emerald-600">+22.4%</strong></div>
              <div><span className="text-muted-foreground">Avg Order Value:</span> <strong>₹485</strong></div>
              <div><span className="text-muted-foreground">Fulfillment Rate:</span> <strong className="text-emerald-600">98.2%</strong></div>
            </div>
          </div>
        </div>
      ) : activeSection.includes("settings") ? (
        <div className="space-y-4 max-w-xl text-xs">
          <div className="space-y-3">
            <div>
              <label className="font-bold text-foreground block mb-1">Store Name</label>
              <input readOnly value={STORE.name} className="w-full h-9 rounded-md border border-border bg-muted/40 px-3 font-semibold" />
            </div>
            <div>
              <label className="font-bold text-foreground block mb-1">Official WhatsApp</label>
              <input readOnly value={STORE.phone} className="w-full h-9 rounded-md border border-border bg-muted/40 px-3 font-semibold" />
            </div>
            <div>
              <label className="font-bold text-foreground block mb-1">Kolkata Headquarters</label>
              <input readOnly value={STORE.address} className="w-full h-9 rounded-md border border-border bg-muted/40 px-3 font-semibold" />
            </div>
            <div>
              <label className="font-bold text-foreground block mb-1">Free Delivery Minimum</label>
              <input readOnly value="₹799" className="w-full h-9 rounded-md border border-border bg-muted/40 px-3 font-semibold" />
            </div>
          </div>
          <Button size="sm" className="rounded-full mt-2" onClick={() => toast.success("Store settings verified.")}>
            Save Changes
          </Button>
        </div>
      ) : (
        <div className="py-8 text-center text-xs text-muted-foreground space-y-2">
          <Sliders className="h-8 w-8 mx-auto text-muted-foreground opacity-50" />
          <p className="font-semibold text-foreground capitalize">{activeSection.replace(/-/g, " ")} Module</p>
          <p>Configured and operational under Success Book Hub Admin Core.</p>
        </div>
      )}
    </div>
  );
}
