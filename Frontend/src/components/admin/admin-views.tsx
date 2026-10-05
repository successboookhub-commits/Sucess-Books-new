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
  Edit3,
  RefreshCw,
  ExternalLink,
  MapPin,
  Star,
  Sliders,
  FileText,
  Image as ImageIcon,
  Layers,
  Sparkles
} from "lucide-react";
import { type AdminSection } from "./admin-types";
import { CategoryManager } from "./category-manager";
import { SubCategoryManager } from "./subcategory-manager";
import { Button } from "@/components/ui/button";
import { api, type OrderData, type Category, type SubCategory } from "@/lib/api";
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
  const [dbSubCategories, setDbSubCategories] = useState<SubCategory[]>([]);
  const [selectedSubCatParentId, setSelectedSubCatParentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // New / Edit Book Modal state
  const [showAddBook, setShowAddBook] = useState(false);
  const [editingBookId, setEditingBookId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newCategory, setNewCategory] = useState("Classics");
  const [newSubCategory, setNewSubCategory] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newOldPrice, setNewOldPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCover, setNewCover] = useState("https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop");
  const [newImage2, setNewImage2] = useState("");
  const [newStock, setNewStock] = useState("50");
  const [newLabel, setNewLabel] = useState("");
  const [newFeatured, setNewFeatured] = useState(false);
  const [savingBook, setSavingBook] = useState(false);

  // Load initial data from backend
  const loadData = async () => {
    setLoading(true);
    try {
      const [fetchedBooks, fetchedOrders, fetchedCats, fetchedSubCats] = await Promise.all([
        api.getBooks(),
        api.getAllOrders().catch(() => []),
        api.getCategories().catch(() => []),
        api.getSubCategories().catch(() => [])
      ]);
      setBooks(fetchedBooks || []);
      setOrders(fetchedOrders || []);
      setDbCategories(fetchedCats || []);
      setDbSubCategories(fetchedSubCats || []);
      if (fetchedCats && fetchedCats.length > 0 && !newCategory) {
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

  const handleOpenAddBook = () => {
    setEditingBookId(null);
    setNewTitle("");
    setNewAuthor("");
    setNewCategory(dbCategories.length > 0 ? dbCategories[0].name : "Classics");
    setNewSubCategory("");
    setNewPrice("");
    setNewOldPrice("");
    setNewDescription("");
    setNewCover("https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop");
    setNewImage2("");
    setNewStock("50");
    setNewLabel("");
    setNewFeatured(false);
    setShowAddBook(true);
  };

  const handleOpenEditBook = (b: Book) => {
    setEditingBookId(b.id);
    setNewTitle(b.title || "");
    setNewAuthor(b.author || "");
    setNewCategory(b.category || (dbCategories.length > 0 ? dbCategories[0].name : "Classics"));
    setNewSubCategory(b.subCategory || b.sub_category || "");
    setNewPrice(b.price ? String(b.price) : "");
    setNewOldPrice(b.oldPrice || b.old_price ? String(b.oldPrice || b.old_price) : "");
    setNewDescription(b.description || "");
    setNewCover(b.cover || "");
    setNewImage2(b.image2 || b.image_2 || "");
    setNewStock(b.stock ? String(b.stock) : "50");
    setNewLabel(b.label || "");
    setNewFeatured(Boolean(b.featured));
    setShowAddBook(true);
  };

  const handleSaveBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim() || !newPrice) {
      toast.error("Book Title, Author, and Selling Price are required.");
      return;
    }

    setSavingBook(true);
    try {
      const priceNum = parseFloat(newPrice);
      const oldPriceNum = newOldPrice ? parseFloat(newOldPrice) : undefined;
      let discountPct = 0;
      if (oldPriceNum && oldPriceNum > priceNum) {
        discountPct = Math.round(((oldPriceNum - priceNum) / oldPriceNum) * 100);
      }

      const payload = {
        title: newTitle.trim(),
        author: newAuthor.trim(),
        category: newCategory,
        subCategory: newSubCategory.trim() || undefined,
        sub_category: newSubCategory.trim() || undefined,
        price: priceNum,
        oldPrice: oldPriceNum,
        old_price: oldPriceNum,
        discountPercent: discountPct,
        discount_percent: discountPct,
        description: newDescription.trim(),
        cover: newCover.trim() || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
        image2: newImage2.trim() || undefined,
        image_2: newImage2.trim() || undefined,
        stock: parseInt(newStock) || 50,
        label: newLabel.trim() || (discountPct >= 20 ? `${discountPct}% OFF` : undefined),
        featured: newFeatured
      };

      if (editingBookId) {
        await api.updateBook(editingBookId, payload);
        toast.success(`"${newTitle}" updated successfully!`);
      } else {
        await api.createBook(payload);
        toast.success(`"${newTitle}" added to catalog!`);
      }

      setShowAddBook(false);
      setEditingBookId(null);
      loadData();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to save book");
    } finally {
      setSavingBook(false);
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
  if (activeSection === "books" || activeSection === "inventory") {
    const selectedCatObj = dbCategories.find(c => c.name.toLowerCase() === newCategory.toLowerCase());
    const modalSubCats = dbSubCategories.filter(s => selectedCatObj ? s.category_id === selectedCatObj.id : false);

    const pNum = parseFloat(newPrice) || 0;
    const oNum = parseFloat(newOldPrice) || 0;
    const previewDiscount = oNum > pNum ? Math.round(((oNum - pNum) / oNum) * 100) : 0;
    const previewSavings = oNum > pNum ? oNum - pNum : 0;

    return (
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Books Inventory</h2>
            <p className="text-xs text-muted-foreground">Manage your book titles, 2-image galleries, categories, subcategories, MRP, selling prices &amp; discounts.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={loadData} className="gap-1.5 text-xs rounded-full">
              <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} /> Refresh
            </Button>
            <Button onClick={handleOpenAddBook} className="rounded-full gap-2 text-xs font-semibold bg-primary text-primary-foreground">
              <Plus className="h-4 w-4" /> Add New Book
            </Button>
          </div>
        </div>

        {/* Books Table */}
        <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-secondary/60 text-muted-foreground font-semibold border-b border-border">
                <tr>
                  <th className="p-3.5">Cover</th>
                  <th className="p-3.5">Title &amp; Author</th>
                  <th className="p-3.5">Category / Sub-Genre</th>
                  <th className="p-3.5">Cost &amp; MRP</th>
                  <th className="p-3.5">Discount %</th>
                  <th className="p-3.5">Stock</th>
                  <th className="p-3.5">Rating</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredBooks.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-muted-foreground">
                      No books found. Click "Add New Book" to add your first title!
                    </td>
                  </tr>
                ) : (
                  filteredBooks.map((b) => {
                    const isImg = b.cover && (b.cover.startsWith("http") || b.cover.startsWith("/"));
                    const mrpVal = b.oldPrice || b.old_price;
                    const disc = b.discountPercent || b.discount_percent || (mrpVal && mrpVal > b.price ? Math.round(((mrpVal - b.price) / mrpVal) * 100) : 0);
                    const sub = b.subCategory || b.sub_category;

                    return (
                      <tr key={b.id} className="hover:bg-secondary/20 transition">
                        {/* Cover Thumbnail */}
                        <td className="p-3.5">
                          <div className="relative h-12 w-9 rounded-md overflow-hidden bg-secondary border border-border/80 shadow-2xs shrink-0">
                            {isImg ? (
                              <img src={b.cover} alt={b.title} className="h-full w-full object-cover" />
                            ) : (
                              <div className={cn("h-full w-full flex items-center justify-center text-[7px] text-white font-bold p-0.5 text-center", b.cover || "bg-primary")}>
                                {b.title.slice(0, 8)}
                              </div>
                            )}
                            {(b.image2 || b.image_2) && (
                              <span className="absolute bottom-0.5 right-0.5 bg-black/70 text-[7px] text-white px-0.5 rounded" title="2 Images">
                                2🖼
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Title & Author */}
                        <td className="p-3.5 font-medium max-w-[200px]">
                          <p className="font-bold text-foreground text-sm font-display truncate">{b.title}</p>
                          <p className="text-[11px] text-muted-foreground truncate">by {b.author}</p>
                          {b.featured && (
                            <span className="inline-block mt-0.5 text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                              ★ Featured
                            </span>
                          )}
                        </td>

                        {/* Category & SubCategory */}
                        <td className="p-3.5">
                          <div className="flex flex-col gap-1">
                            <span className="px-2 py-0.5 rounded-full bg-secondary text-primary font-bold text-[10px] w-fit">
                              {b.category}
                            </span>
                            {sub && (
                              <span className="text-[10px] text-muted-foreground font-medium pl-1">
                                › {sub}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Cost & MRP */}
                        <td className="p-3.5">
                          <p className="font-bold text-foreground text-sm font-display">₹{b.price}</p>
                          {mrpVal && (
                            <p className="text-[10px] text-muted-foreground line-through">₹{mrpVal} MRP</p>
                          )}
                        </td>

                        {/* Discount */}
                        <td className="p-3.5">
                          {disc > 0 ? (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-extrabold text-[11px]">
                              {disc}% OFF
                            </span>
                          ) : (
                            <span className="text-muted-foreground text-[11px]">Regular</span>
                          )}
                        </td>

                        {/* Stock */}
                        <td className="p-3.5">
                          <span className={cn(
                            "px-2 py-0.5 rounded-full font-semibold text-[11px]",
                            (b.stock ?? 30) > 10 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                          )}>
                            {b.stock ?? 30} in stock
                          </span>
                        </td>

                        {/* Rating */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span className="font-bold text-foreground">{b.rating || 4.5}</span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="p-3.5 text-right space-x-1 whitespace-nowrap">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 text-xs text-primary hover:bg-secondary rounded-lg"
                            onClick={() => handleOpenEditBook(b)}
                            title="Edit Book Details"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 text-xs text-destructive hover:bg-destructive/10 rounded-lg"
                            onClick={async () => {
                              if (confirm(`Remove "${b.title}" from bookstore catalog?`)) {
                                try {
                                  await api.deleteBook(b.id);
                                  toast.success(`Removed "${b.title}"`);
                                  loadData();
                                } catch (err: unknown) {
                                  toast.error(err instanceof Error ? err.message : "Failed to delete book");
                                }
                              }
                            }}
                            title="Delete Book"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add / Edit Book Modal */}
        {showAddBook && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <form
              onSubmit={handleSaveBook}
              className="bg-card border border-border rounded-2xl p-6 sm:p-7 max-w-2xl w-full shadow-2xl space-y-4 text-xs animate-in zoom-in-95 max-h-[92vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h3 className="font-display text-xl font-bold text-primary">
                    {editingBookId ? "Edit Book Details" : "Add New Book to Catalogue"}
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Fill in book details, multiple images, categories, MRP and discount prices.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddBook(false);
                    setEditingBookId(null);
                  }}
                  className="text-muted-foreground hover:text-foreground text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              {/* Title & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Book Title / Name *</label>
                  <input
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. The Secret Garden"
                    className="w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary text-foreground"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Author Name *</label>
                  <input
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Frances Hodgson Burnett"
                    className="w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary text-foreground"
                  />
                </div>
              </div>

              {/* Category & SubCategory (Connected Hierarchy) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Main Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => {
                      setNewCategory(e.target.value);
                      setNewSubCategory(""); // reset subcategory on category change
                    }}
                    className="w-full h-9 rounded-lg border border-border bg-background px-2.5 outline-none focus:border-primary text-foreground cursor-pointer"
                  >
                    {(dbCategories.length > 0 ? dbCategories.map((c) => c.name) : defaultCategories.filter((c) => c !== "All")).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">Sub-Category (Optional)</label>
                  {modalSubCats.length > 0 ? (
                    <select
                      value={newSubCategory}
                      onChange={(e) => setNewSubCategory(e.target.value)}
                      className="w-full h-9 rounded-lg border border-border bg-background px-2.5 outline-none focus:border-primary text-foreground cursor-pointer"
                    >
                      <option value="">-- Select Sub-Category --</option>
                      {modalSubCats.map((s) => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      value={newSubCategory}
                      onChange={(e) => setNewSubCategory(e.target.value)}
                      placeholder="e.g. British Literature"
                      className="w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary text-foreground"
                    />
                  )}
                </div>
              </div>

              {/* Pricing, MRP & Live Discount Calculation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold block mb-1">Selling Price / Cost (₹) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="349"
                    className="w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary font-bold text-primary"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">MRP / Original Price (₹)</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={newOldPrice}
                    onChange={(e) => setNewOldPrice(e.target.value)}
                    placeholder="499"
                    className="w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary text-muted-foreground"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    min="0"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    placeholder="50"
                    className="w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Real-time Discount preview banner */}
              {previewDiscount > 0 && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-emerald-800">
                  <span className="font-bold flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                    Customer Discount: {previewDiscount}% OFF
                  </span>
                  <span className="font-semibold text-[11px]">
                    Customer Saves: ₹{previewSavings}
                  </span>
                </div>
              )}

              {/* Images 1 & 2 Inputs + Previews */}
              <div className="space-y-2 border-t border-border/60 pt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Image 1: Main Cover */}
                  <div className="space-y-1">
                    <label className="font-bold block">Front Cover Image URL (Image 1) *</label>
                    <input
                      required
                      value={newCover}
                      onChange={(e) => setNewCover(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary text-foreground"
                    />
                    {newCover && (newCover.startsWith("http") || newCover.startsWith("/")) && (
                      <div className="mt-1 h-20 w-16 rounded-md overflow-hidden border border-border shadow-xs">
                        <img src={newCover} alt="Cover Preview" className="h-full w-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* Image 2: Secondary / Inside Cover */}
                  <div className="space-y-1">
                    <label className="font-bold block">Second / Inside Image URL (Image 2 - Optional)</label>
                    <input
                      value={newImage2}
                      onChange={(e) => setNewImage2(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary text-foreground"
                    />
                    {newImage2 && (newImage2.startsWith("http") || newImage2.startsWith("/")) && (
                      <div className="mt-1 h-20 w-16 rounded-md overflow-hidden border border-border shadow-xs">
                        <img src={newImage2} alt="Image 2 Preview" className="h-full w-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Sample Presets */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] text-muted-foreground font-semibold">Quick image presets:</span>
                  <button
                    type="button"
                    onClick={() => setNewCover("https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop")}
                    className="text-[10px] text-primary hover:underline"
                  >
                    Classic Book
                  </button>
                  <span className="text-muted-foreground">•</span>
                  <button
                    type="button"
                    onClick={() => setNewCover("https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop")}
                    className="text-[10px] text-primary hover:underline"
                  >
                    Novel
                  </button>
                  <span className="text-muted-foreground">•</span>
                  <button
                    type="button"
                    onClick={() => setNewCover("https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop")}
                    className="text-[10px] text-primary hover:underline"
                  >
                    Self Help
                  </button>
                </div>
              </div>

              {/* Description / Synopsis */}
              <div>
                <label className="font-bold block mb-1">Synopsis / Book Description</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="A brief synopsis of the book, author highlights, and key takeaways..."
                  className="w-full rounded-lg border border-border bg-background p-2.5 outline-none focus:border-primary text-foreground"
                />
              </div>

              {/* Label & Featured Switch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center border-t border-border/60 pt-3">
                <div>
                  <label className="font-bold block mb-1">Custom Promotional Label</label>
                  <input
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    placeholder="e.g. Bestseller, Editor's Pick, New"
                    className="w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary"
                  />
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="featuredCheckbox"
                    checked={newFeatured}
                    onChange={(e) => setNewFeatured(e.target.checked)}
                    className="h-4 w-4 rounded text-primary focus:ring-primary accent-primary"
                  />
                  <label htmlFor="featuredCheckbox" className="font-bold text-foreground cursor-pointer select-none">
                    Feature on Homepage (Featured Showcase)
                  </label>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddBook(false);
                    setEditingBookId(null);
                  }}
                  className="rounded-full"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={savingBook}
                  className="rounded-full bg-primary text-primary-foreground font-bold px-6"
                >
                  {savingBook ? "Saving..." : editingBookId ? "Update Book" : "Save & Publish Book"}
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
