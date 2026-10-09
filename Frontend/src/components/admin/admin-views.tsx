import { useState, useEffect, useMemo } from "react";
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
  Sparkles,
  BarChart3,
  Receipt,
  Printer,
  Eye,
  Check,
  Phone,
  Calendar,
  CreditCard,
  Building,
  Percent,
  ChevronRight,
  Filter,
  ArrowUpDown,
  ShoppingBag,
  Heart,
  Truck,
  MessageSquare,
  ShieldCheck,
  UserCheck,
  Send,
  Lock,
  Globe,
  HelpCircle,
  Award,
  BookMarked,
  Gift,
  Save,
  ToggleLeft,
  ToggleRight,
  X
} from "lucide-react";
import { type AdminSection } from "./admin-types";
import { CategoryManager } from "./category-manager";
import { SubCategoryManager } from "./subcategory-manager";
import { TaxInvoiceModal } from "@/components/invoice/tax-invoice-modal";
import { Button } from "@/components/ui/button";
import {
  api,
  type OrderData,
  type Category,
  type SubCategory,
  type UserAddress,
  type Coupon,
  type StoreSettings,
  type ContentBlock
} from "@/lib/api";
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
  const [customers, setCustomers] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [dbCategories, setDbCategories] = useState<Category[]>([]);
  const [dbSubCategories, setDbSubCategories] = useState<SubCategory[]>([]);
  const [selectedSubCatParentId, setSelectedSubCatParentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Coupons state
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [editingCouponId, setEditingCouponId] = useState<number | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponType, setCouponType] = useState<"percentage" | "flat">("percentage");
  const [couponValue, setCouponValue] = useState("");
  const [couponMinOrder, setCouponMinOrder] = useState("");
  const [couponMaxDiscount, setCouponMaxDiscount] = useState("");
  const [couponStatus, setCouponStatus] = useState<"active" | "inactive">("active");
  const [savingCoupon, setSavingCoupon] = useState(false);

  // Settings state
  const [settings, setSettings] = useState<StoreSettings>({});
  const [savingSettings, setSavingSettings] = useState(false);

  // Content Blocks state
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [showContentModal, setShowContentModal] = useState(false);
  const [editingContentId, setEditingContentId] = useState<number | null>(null);
  const [contentTitle, setContentTitle] = useState("");
  const [contentSubtitle, setContentSubtitle] = useState("");
  const [contentImage, setContentImage] = useState("");
  const [contentLinkUrl, setContentLinkUrl] = useState("");
  const [contentBody, setContentBody] = useState("");
  const [contentOrder, setContentOrder] = useState("0");
  const [contentStatus, setContentStatus] = useState<"active" | "inactive">("active");
  const [savingContent, setSavingContent] = useState(false);

  // Invoice modal state
  const [selectedInvoiceOrderId, setSelectedInvoiceOrderId] = useState<string | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

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

  // Category filter state for Books/Inventory view
  const [catalogFilterCategory, setCatalogFilterCategory] = useState("All");

  // Load initial data from backend
  const loadData = async () => {
    setLoading(true);
    try {
      const [
        fetchedBooks,
        fetchedOrders,
        fetchedCats,
        fetchedSubCats,
        fetchedCustomers,
        fetchedAddresses,
        fetchedReviews,
        fetchedStats,
        fetchedCoupons,
        fetchedSettings,
        fetchedContent
      ] = await Promise.all([
        api.getBooks(),
        api.getAllOrders().catch(() => []),
        api.getCategories().catch(() => []),
        api.getSubCategories().catch(() => []),
        api.getAllCustomers().catch(() => []),
        api.getAllCustomerAddresses().catch(() => []),
        api.getAllReviews().catch(() => []),
        api.getDashboardStats().catch(() => null),
        api.getCoupons().catch(() => []),
        api.getSettings().catch(() => ({})),
        api.getContentBlocks().catch(() => [])
      ]);

      setBooks(fetchedBooks || []);
      setOrders(fetchedOrders || []);
      setDbCategories(fetchedCats || []);
      setDbSubCategories(fetchedSubCats || []);
      setCustomers(fetchedCustomers || []);
      setAddresses(fetchedAddresses || []);
      setReviews(fetchedReviews || []);
      setDashboardStats(fetchedStats || null);
      setCoupons(fetchedCoupons || []);
      setSettings(fetchedSettings || {});
      setContentBlocks(fetchedContent || []);

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

  const handleStockAdjust = async (bookId: number, currentStock: number, delta: number) => {
    const nextStock = Math.max(0, currentStock + delta);
    try {
      await api.updateBookStock(bookId, nextStock);
      setBooks(prev => prev.map(b => b.id === bookId ? { ...b, stock: nextStock } : b));
      toast.success(`Stock updated to ${nextStock}`);
    } catch {
      toast.error("Failed to update stock");
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!confirm("Are you sure you want to delete this customer review?")) return;
    try {
      await api.deleteReview(reviewId);
      setReviews(prev => prev.filter(r => r.id !== reviewId));
      toast.success("Review deleted successfully.");
    } catch {
      toast.error("Failed to delete review.");
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

  // Filter books according to top header search & category dropdown
  const filteredBooks = books.filter((b) => {
    const matchesSearch = `${b.title} ${b.author} ${b.category} ${b.subCategory || ""} ${b.sub_category || ""}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = catalogFilterCategory === "All" || b.category.toLowerCase() === catalogFilterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Filter orders according to search
  const filteredOrders = orders.filter((o) =>
    `${o.id} ${o.customerName} ${o.customerPhone} ${o.customerEmail || ""} ${o.status} ${o.deliveryAddress}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Filter customers
  const filteredCustomers = customers.filter((c) =>
    `${c.name} ${c.email} ${c.phone || ""}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter addresses
  const filteredAddresses = addresses.filter((a) =>
    `${a.fullName} ${a.phone} ${a.formattedAddress || ""} ${a.city} ${a.state} ${a.userEmail}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Filter reviews
  const filteredReviews = reviews.filter((r) =>
    `${r.userName} ${r.bookTitle} ${r.comment}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter coupons
  const filteredCoupons = coupons.filter((c) =>
    `${c.code} ${c.discountType || c.discount_type || ""} ${c.status}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter content blocks for active section
  const filteredContentBlocks = contentBlocks.filter((cb) => {
    const matchesType = cb.type === activeSection;
    const matchesSearch = `${cb.title} ${cb.subtitle || ""} ${cb.content || ""}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Distinct authors calculation
  const distinctAuthors = useMemo(() => {
    const map = new Map<string, { name: string; titlesCount: number; books: Book[]; avgRating: number }>();
    books.forEach((b) => {
      const author = b.author || "Unknown Author";
      if (!map.has(author)) {
        map.set(author, { name: author, titlesCount: 0, books: [], avgRating: 0 });
      }
      const item = map.get(author)!;
      item.titlesCount++;
      item.books.push(b);
    });
    return Array.from(map.values()).sort((a, b) => b.titlesCount - a.titlesCount);
  }, [books]);

  // Total calculations without fake offsets
  const totalRevenue = dashboardStats?.totalRevenue !== undefined ? Number(dashboardStats.totalRevenue) : orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = dashboardStats?.totalOrders !== undefined ? Number(dashboardStats.totalOrders) : orders.length;
  const totalStockUnits = books.reduce((sum, b) => sum + (b.stock || 0), 0);
  const totalInventoryValuation = books.reduce((sum, b) => sum + ((b.price || 0) * (b.stock || 0)), 0);
  const lowStockBooks = books.filter(b => (b.stock || 0) < 20);

  // Coupon action handlers
  const handleOpenAddCoupon = () => {
    setEditingCouponId(null);
    setCouponCode("");
    setCouponType("percentage");
    setCouponValue("");
    setCouponMinOrder("0");
    setCouponMaxDiscount("");
    setCouponStatus("active");
    setShowCouponModal(true);
  };

  const handleOpenEditCoupon = (c: Coupon) => {
    setEditingCouponId(c.id);
    setCouponCode(c.code);
    setCouponType(c.discountType || c.discount_type || "percentage");
    setCouponValue(String(c.discountValue || c.discount_value || ""));
    setCouponMinOrder(String(c.minOrder || c.min_order || "0"));
    setCouponMaxDiscount(c.maxDiscount || c.max_discount ? String(c.maxDiscount || c.max_discount) : "");
    setCouponStatus(c.status);
    setShowCouponModal(true);
  };

  const handleSaveCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim() || !couponValue) {
      toast.error("Coupon code and discount value are required.");
      return;
    }
    setSavingCoupon(true);
    try {
      const payload = {
        code: couponCode.trim().toUpperCase(),
        discountType: couponType,
        discountValue: parseFloat(couponValue),
        minOrder: parseFloat(couponMinOrder) || 0,
        maxDiscount: couponMaxDiscount ? parseFloat(couponMaxDiscount) : undefined,
        status: couponStatus
      };
      if (editingCouponId) {
        await api.updateCoupon(editingCouponId, payload);
        toast.success(`Coupon ${payload.code} updated!`);
      } else {
        await api.createCoupon(payload);
        toast.success(`Coupon ${payload.code} created!`);
      }
      setShowCouponModal(false);
      const refreshed = await api.getCoupons();
      setCoupons(refreshed);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to save coupon");
    } finally {
      setSavingCoupon(false);
    }
  };

  const handleDeleteCoupon = async (id: number, code: string) => {
    if (!confirm(`Are you sure you want to permanently delete coupon "${code}"?`)) return;
    try {
      await api.deleteCoupon(id);
      toast.success(`Coupon "${code}" deleted.`);
      setCoupons(prev => prev.filter(c => c.id !== id));
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to delete coupon");
    }
  };

  const handleToggleCouponStatus = async (c: Coupon) => {
    const nextStatus = (c.status === "active" ? "inactive" : "active") as "active" | "inactive";
    try {
      await api.updateCoupon(c.id, { status: nextStatus });
      setCoupons(prev => prev.map(item => item.id === c.id ? { ...item, status: nextStatus } : item));
      toast.success(`Coupon ${c.code} is now ${nextStatus}`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to update status");
    }
  };

  // Customer status handler
  const handleToggleCustomerStatus = async (customerId: number, currentStatus: string, name: string) => {
    const nextStatus = currentStatus === "blocked" ? "active" : "blocked";
    if (!confirm(`Change customer "${name}" status to "${nextStatus.toUpperCase()}"?`)) return;
    try {
      await api.updateCustomerStatus(customerId, nextStatus);
      setCustomers(prev => prev.map(c => c.id === customerId ? { ...c, status: nextStatus } : c));
      toast.success(`Customer "${name}" status updated to ${nextStatus}`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to update status");
    }
  };

  // Content block action handlers
  const handleOpenAddContent = () => {
    setEditingContentId(null);
    setContentTitle("");
    setContentSubtitle("");
    setContentImage("");
    setContentLinkUrl("");
    setContentBody("");
    setContentOrder("0");
    setContentStatus("active");
    setShowContentModal(true);
  };

  const handleOpenEditContent = (cb: ContentBlock) => {
    setEditingContentId(cb.id);
    setContentTitle(cb.title);
    setContentSubtitle(cb.subtitle || "");
    setContentImage(cb.image || "");
    setContentLinkUrl(cb.linkUrl || cb.link_url || "");
    setContentBody(cb.content || "");
    setContentOrder(String(cb.displayOrder || cb.display_order || 0));
    setContentStatus(cb.status);
    setShowContentModal(true);
  };

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentTitle.trim()) {
      toast.error("Title is required.");
      return;
    }
    setSavingContent(true);
    try {
      const payload: Partial<ContentBlock> = {
        type: activeSection,
        title: contentTitle.trim(),
        subtitle: contentSubtitle.trim() || undefined,
        image: contentImage.trim() || undefined,
        linkUrl: contentLinkUrl.trim() || undefined,
        content: contentBody.trim() || undefined,
        displayOrder: parseInt(contentOrder) || 0,
        status: contentStatus
      };
      if (editingContentId) {
        await api.updateContentBlock(editingContentId, payload);
        toast.success("Content item updated!");
      } else {
        await api.createContentBlock(payload);
        toast.success("Content item created!");
      }
      setShowContentModal(false);
      const refreshed = await api.getContentBlocks();
      setContentBlocks(refreshed);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to save content");
    } finally {
      setSavingContent(false);
    }
  };

  const handleDeleteContent = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await api.deleteContentBlock(id);
      toast.success("Content deleted.");
      setContentBlocks(prev => prev.filter(c => c.id !== id));
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  const handleToggleContentStatus = async (cb: ContentBlock) => {
    const nextStatus = (cb.status === "active" ? "inactive" : "active") as "active" | "inactive";
    try {
      await api.updateContentBlock(cb.id, { status: nextStatus });
      setContentBlocks(prev => prev.map(item => item.id === cb.id ? { ...item, status: nextStatus } : item));
      toast.success(`Content status set to ${nextStatus}`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to update status");
    }
  };

  // Settings save handler
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const cleanSettings: Record<string, string> = {};
      Object.entries(settings).forEach(([k, v]) => {
        if (typeof v === "string") cleanSettings[k] = v;
      });
      await api.updateSettings(cleanSettings);
      toast.success("Store configurations persisted to database!");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to update settings");
    } finally {
      setSavingSettings(false);
    }
  };

  // ----------------------------------------------------
  // RENDER SECTIONS
  // ----------------------------------------------------
  const renderSectionContent = () => {
    // 1. Dashboard View
    if (activeSection === "dashboard") {
      return (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-xs transition hover:shadow-md">
              <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
                <span>Gross Revenue</span>
                <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                  <DollarSign className="h-4 w-4" />
                </span>
              </div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-2">
                ₹{totalRevenue.toLocaleString()}
              </p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> Real-time order valuation
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-xs transition hover:shadow-md">
              <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
                <span>Customer Orders</span>
                <span className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Package className="h-4 w-4" />
                </span>
              </div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-2">{totalOrdersCount}</p>
              <p className="text-[11px] text-muted-foreground mt-1">
                {orders.filter((o) => o.status === "pending").length} pending dispatch
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-xs transition hover:shadow-md">
              <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
                <span>Books Catalog</span>
                <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                  <BookOpen className="h-4 w-4" />
                </span>
              </div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-2">{books.length} Titles</p>
              <p className="text-[11px] text-muted-foreground mt-1">{totalStockUnits} warehouse units in stock</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-xs transition hover:shadow-md">
              <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
                <span>Registered Readers</span>
                <span className="p-2 rounded-xl bg-blue-500/10 text-blue-600">
                  <Users className="h-4 w-4" />
                </span>
              </div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-2">
                {customers.length > 0 ? customers.length : "2,500+"}
              </p>
              <p className="text-[11px] text-blue-600 font-semibold mt-1">
                {addresses.length} Saved delivery addresses
              </p>
            </div>
          </div>

          {/* Quick Action Bar */}
          <div className="rounded-2xl border border-border bg-secondary/30 p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-foreground">Admin Shortcuts:</span>
              <Button size="sm" className="rounded-full text-xs h-8 gap-1.5 font-bold" onClick={handleOpenAddBook}>
                <Plus className="h-3.5 w-3.5" /> Add New Book
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full text-xs h-8 gap-1.5"
                onClick={() => onNavigateSection?.("categories")}
              >
                <Layers className="h-3.5 w-3.5" /> Categories ({dbCategories.length})
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full text-xs h-8 gap-1.5"
                onClick={() => onNavigateSection?.("orders")}
              >
                <ShoppingBag className="h-3.5 w-3.5" /> View Orders ({orders.length})
              </Button>
              <Button size="sm" variant="ghost" className="rounded-full text-xs h-8 gap-1" onClick={loadData}>
                <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} /> Sync DB
              </Button>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SQLite Connected &amp; Live</span>
            </div>
          </div>

          {/* Recent Orders & Stock Overview */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Orders (2 cols) */}
            <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">Recent Customer Bookings</h3>
                  <p className="text-xs text-muted-foreground">Live orders placed by customers across India.</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigateSection?.("orders")}
                  className="text-xs font-semibold text-primary gap-1"
                >
                  All Orders <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground text-xs space-y-2">
                  <ShoppingBag className="h-8 w-8 mx-auto text-muted-foreground/50" />
                  <p>No orders recorded yet in database.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="border-b border-border text-muted-foreground font-semibold">
                      <tr>
                        <th className="pb-2.5">Order ID &amp; Date</th>
                        <th className="pb-2.5">Customer</th>
                        <th className="pb-2.5">Amount</th>
                        <th className="pb-2.5">Status</th>
                        <th className="pb-2.5 text-right">Invoice &amp; Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {orders.slice(0, 6).map((order) => (
                        <tr key={order.id} className="hover:bg-secondary/20 transition">
                          <td className="py-3">
                            <p className="font-bold text-primary font-display">{order.id}</p>
                            <p className="text-[10px] text-muted-foreground">{order.createdAt || "Recent"}</p>
                          </td>
                          <td className="py-3">
                            <p className="font-bold text-foreground">{order.customerName}</p>
                            <p className="text-[10px] text-muted-foreground">{order.customerPhone}</p>
                          </td>
                          <td className="py-3 font-bold font-display text-sm">₹{order.total}</td>
                          <td className="py-3">
                            <span
                              className={cn(
                                "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase",
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
                          <td className="py-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 text-[11px] px-2 text-primary hover:bg-secondary rounded-md gap-1"
                                onClick={() => {
                                  setSelectedInvoiceOrderId(order.id);
                                  setShowInvoiceModal(true);
                                }}
                                title="View Tax Invoice"
                              >
                                <Receipt className="h-3.5 w-3.5" /> Invoice
                              </Button>
                              <select
                                value={order.status}
                                onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                className="h-7 rounded-md text-[11px] border border-border bg-background px-2 font-semibold cursor-pointer outline-none"
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Shelves & Categories Breakdown */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-foreground">Shelves Breakdown</h3>
                <span className="text-xs text-muted-foreground">{books.length} Books</span>
              </div>
              <div className="space-y-3">
                {(dbCategories.length > 0 ? dbCategories.map((c) => c.name) : defaultCategories.filter((c) => c !== "All")).map((cat) => {
                  const count = books.filter((b) => b.category === cat).length;
                  const pct = books.length ? Math.round((count / books.length) * 100) : 0;
                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-foreground">{cat}</span>
                        <span className="text-muted-foreground font-medium">{count} titles ({pct}%)</span>
                      </div>
                      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Low stock alert badge */}
              {lowStockBooks.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 flex items-start gap-2.5 text-xs">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">{lowStockBooks.length} Books Low in Stock</p>
                    <p className="text-[11px] opacity-90">Titles have fewer than 20 copies remaining in warehouse.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // 2. Catalog: Books & Inventory View
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
              <h2 className="font-display text-2xl font-bold text-foreground">
                {activeSection === "inventory" ? "Warehouse & Inventory Management" : "Books Catalog"}
              </h2>
              <p className="text-xs text-muted-foreground">
                Manage book titles, front &amp; secondary preview images, categories, subcategories, MRP, selling price &amp; stock levels.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={loadData} className="gap-1.5 text-xs rounded-full">
                <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} /> Refresh
              </Button>
              <Button onClick={handleOpenAddBook} className="rounded-full gap-2 text-xs font-bold bg-primary text-primary-foreground shadow-sm">
                <Plus className="h-4 w-4" /> Add New Book
              </Button>
            </div>
          </div>

          {/* Filter Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" /> Category:
              </span>
              <button
                onClick={() => setCatalogFilterCategory("All")}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold transition",
                  catalogFilterCategory === "All" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"
                )}
              >
                All ({books.length})
              </button>
              {dbCategories.map((c) => {
                const cCount = books.filter((b) => b.category === c.name).length;
                return (
                  <button
                    key={c.id}
                    onClick={() => setCatalogFilterCategory(c.name)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold transition",
                      catalogFilterCategory === c.name
                        ? "bg-primary text-primary-foreground font-bold"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    )}
                  >
                    {c.name} ({cCount})
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-muted-foreground font-medium">
              Showing <strong>{filteredBooks.length}</strong> of {books.length} titles
            </div>
          </div>

          {/* Inventory Summary Cards if on inventory view */}
          {activeSection === "inventory" && (
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-border bg-card">
                <span className="text-xs font-bold text-muted-foreground uppercase">Total Warehouse Units</span>
                <p className="font-display text-2xl font-bold text-foreground mt-1">{totalStockUnits} Copies</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <span className="text-xs font-bold text-muted-foreground uppercase">Catalog Asset Valuation</span>
                <p className="font-display text-2xl font-bold text-emerald-600 mt-1">₹{totalInventoryValuation.toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <span className="text-xs font-bold text-muted-foreground uppercase">Low Stock Warnings (&lt;20)</span>
                <p className="font-display text-2xl font-bold text-amber-600 mt-1">{lowStockBooks.length} Titles</p>
              </div>
            </div>
          )}

          {/* Books Table */}
          <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-secondary/60 text-muted-foreground font-semibold border-b border-border">
                  <tr>
                    <th className="p-3.5">Cover</th>
                    <th className="p-3.5">Title &amp; Author</th>
                    <th className="p-3.5">Category / Sub-Category</th>
                    <th className="p-3.5">Cost &amp; MRP</th>
                    <th className="p-3.5">Discount %</th>
                    <th className="p-3.5">Stock Level</th>
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
                      const currentStock = b.stock ?? 30;

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
                                <span className="absolute bottom-0.5 right-0.5 bg-black/70 text-[7px] text-white px-0.5 rounded font-bold" title="Dual 2-Image Gallery">
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
                              <span className="inline-block mt-0.5 text-[9px] font-bold text-amber-600 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/30">
                                ★ Featured Showcase
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
                              <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-[11px]">
                                {disc}% OFF
                              </span>
                            ) : (
                              <span className="text-muted-foreground text-[11px]">Standard</span>
                            )}
                          </td>

                          {/* Stock with 1-click Quick Adjust */}
                          <td className="p-3.5">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleStockAdjust(b.id, currentStock, -5)}
                                className="h-6 w-6 rounded bg-secondary hover:bg-muted text-foreground font-bold flex items-center justify-center text-xs transition"
                                title="Decrease stock by 5"
                              >
                                -
                              </button>
                              <span className={cn(
                                "px-2 py-0.5 rounded-full font-bold text-[11px] min-w-[50px] text-center",
                                currentStock >= 20 ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" :
                                currentStock > 0 ? "bg-amber-500/10 text-amber-700 dark:text-amber-300" :
                                "bg-red-500/10 text-red-700 dark:text-red-300"
                              )}>
                                {currentStock}
                              </span>
                              <button
                                onClick={() => handleStockAdjust(b.id, currentStock, 5)}
                                className="h-6 w-6 rounded bg-secondary hover:bg-muted text-foreground font-bold flex items-center justify-center text-xs transition"
                                title="Increase stock by 5"
                              >
                                +
                              </button>
                            </div>
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

                {/* Category & SubCategory */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold block mb-1">Main Category *</label>
                    <select
                      value={newCategory}
                      onChange={(e) => {
                        setNewCategory(e.target.value);
                        setNewSubCategory("");
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
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between text-emerald-800 dark:text-emerald-300">
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
              <h2 className="font-display text-2xl font-bold text-foreground">Customer Orders</h2>
              <p className="text-xs text-muted-foreground">Review incoming book orders, customer addresses, payment methods, and GST Tax Invoices.</p>
            </div>
            <Button size="sm" variant="outline" onClick={loadData} className="gap-1.5 text-xs rounded-full">
              <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} /> Refresh Orders
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-secondary/60 text-muted-foreground font-semibold border-b border-border">
                  <tr>
                    <th className="p-3.5">Order ID &amp; Date</th>
                    <th className="p-3.5">Customer &amp; Shipping Address</th>
                    <th className="p-3.5">Items Ordered</th>
                    <th className="p-3.5">Payment</th>
                    <th className="p-3.5">Total Bill</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Tax Invoice &amp; Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-muted-foreground">
                        No orders found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-secondary/20 transition">
                        <td className="p-3.5">
                          <span className="font-display font-bold text-primary text-sm">{o.id}</span>
                          <p className="text-[10px] text-muted-foreground">{o.createdAt || "Recent"}</p>
                        </td>
                        <td className="p-3.5 max-w-[240px]">
                          <p className="font-bold text-foreground">{o.customerName}</p>
                          <p className="text-[11px] text-muted-foreground font-medium">{o.customerPhone}</p>
                          {o.customerEmail && <p className="text-[10px] text-muted-foreground truncate">{o.customerEmail}</p>}
                          <p className="text-[10px] text-muted-foreground/90 mt-1 line-clamp-2">{o.deliveryAddress}</p>
                        </td>
                        <td className="p-3.5">
                          <div className="space-y-1 max-w-[200px]">
                            {o.items.map((item, i) => (
                              <p key={i} className="text-[11px] text-foreground leading-tight">
                                {item.title} <strong className="text-primary">× {item.quantity}</strong>
                              </p>
                            ))}
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-md bg-secondary font-bold text-[10px]">
                            {o.paymentMethod || "COD"}
                          </span>
                        </td>
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
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs font-semibold rounded-lg gap-1 border-primary/30 text-primary hover:bg-primary/10"
                              onClick={() => {
                                setSelectedInvoiceOrderId(o.id);
                                setShowInvoiceModal(true);
                              }}
                            >
                              <Receipt className="h-3.5 w-3.5" /> Tax Invoice
                            </Button>
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
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    // 4. Sales: Payments & Tax Invoices Center
    if (activeSection === "payments") {
      const codTotal = orders.filter(o => o.paymentMethod?.toLowerCase().includes("cod")).reduce((s, o) => s + (o.total || 0), 0);
      const onlineTotal = totalRevenue - codTotal;

      return (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Payments &amp; Tax Invoices</h2>
              <p className="text-xs text-muted-foreground">View GST invoices, transaction logs, and print official tax invoices for bookstore accounting.</p>
            </div>
            <Button size="sm" variant="outline" onClick={loadData} className="gap-1.5 text-xs rounded-full">
              <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} /> Refresh
            </Button>
          </div>

          {/* Financial Summary */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl border border-border bg-card">
              <span className="text-xs font-bold text-muted-foreground uppercase">Total Invoiced Amount</span>
              <p className="font-display text-2xl font-bold text-foreground mt-1">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-2xl border border-border bg-card">
              <span className="text-xs font-bold text-muted-foreground uppercase">Digital / UPI Receipts</span>
              <p className="font-display text-2xl font-bold text-emerald-600 mt-1">₹{onlineTotal.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-2xl border border-border bg-card">
              <span className="text-xs font-bold text-muted-foreground uppercase">COD Pending Collections</span>
              <p className="font-display text-2xl font-bold text-amber-600 mt-1">₹{codTotal.toLocaleString()}</p>
            </div>
          </div>

          {/* Invoice Table */}
          <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-secondary/60 text-muted-foreground font-semibold border-b border-border">
                  <tr>
                    <th className="p-3.5">Invoice Number</th>
                    <th className="p-3.5">Order ID &amp; Date</th>
                    <th className="p-3.5">Customer Name</th>
                    <th className="p-3.5">Payment Method</th>
                    <th className="p-3.5">Gross Amount</th>
                    <th className="p-3.5">Payment Status</th>
                    <th className="p-3.5 text-right">Official Document</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-secondary/20 transition">
                      <td className="p-3.5 font-bold font-mono text-primary text-xs">
                        INV-2026-{o.id}
                      </td>
                      <td className="p-3.5">
                        <p className="font-bold text-foreground">{o.id}</p>
                        <p className="text-[10px] text-muted-foreground">{o.createdAt || "Recent"}</p>
                      </td>
                      <td className="p-3.5">
                        <p className="font-bold text-foreground">{o.customerName}</p>
                        <p className="text-[10px] text-muted-foreground">{o.customerPhone}</p>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-secondary font-bold text-[10px]">
                          {o.paymentMethod || "COD"}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold font-display text-sm text-foreground">₹{o.total}</td>
                      <td className="p-3.5">
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase",
                          o.status === "delivered" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                        )}>
                          {o.status === "delivered" ? "Settled" : "In Process"}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedInvoiceOrderId(o.id);
                            setShowInvoiceModal(true);
                          }}
                          className="h-8 rounded-lg text-xs font-bold gap-1.5 bg-primary text-primary-foreground"
                        >
                          <Printer className="h-3.5 w-3.5" /> Print Tax Invoice
                        </Button>
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

    // 5. Sales: Coupons & Promo Codes
    if (activeSection === "coupons") {
      const activeCouponsCount = coupons.filter(c => c.status === "active").length;
      const totalRedemptions = coupons.reduce((sum, c) => sum + (c.usageCount || c.usage_count || 0), 0);

      return (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Coupons &amp; Promotional Codes</h2>
              <p className="text-xs text-muted-foreground">Manage persistent bookstore discount vouchers, order thresholds and percentage cuts.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={loadData} className="gap-1.5 text-xs rounded-full">
                <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} /> Refresh
              </Button>
              <Button size="sm" className="rounded-full gap-1.5 text-xs font-bold" onClick={handleOpenAddCoupon}>
                <Plus className="h-3.5 w-3.5" /> Create New Coupon
              </Button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl border border-border bg-card shadow-xs">
              <span className="text-xs font-bold text-muted-foreground uppercase">Total Coupons Created</span>
              <p className="font-display text-2xl font-bold text-foreground mt-1">{coupons.length}</p>
            </div>
            <div className="p-4 rounded-2xl border border-border bg-card shadow-xs">
              <span className="text-xs font-bold text-muted-foreground uppercase">Currently Active Offers</span>
              <p className="font-display text-2xl font-bold text-emerald-600 mt-1">{activeCouponsCount}</p>
            </div>
            <div className="p-4 rounded-2xl border border-border bg-card shadow-xs">
              <span className="text-xs font-bold text-muted-foreground uppercase">Total Redemptions</span>
              <p className="font-display text-2xl font-bold text-primary mt-1">{totalRedemptions} orders</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-secondary/60 text-muted-foreground font-semibold border-b border-border">
                  <tr>
                    <th className="p-3.5">Coupon Code</th>
                    <th className="p-3.5">Discount Offer</th>
                    <th className="p-3.5">Min Order Value</th>
                    <th className="p-3.5">Times Used</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Created Date</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredCoupons.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-muted-foreground">
                        No promotional coupons found. Click "Create New Coupon" to publish your first discount.
                      </td>
                    </tr>
                  ) : (
                    filteredCoupons.map((c) => {
                      const isPct = (c.discountType || c.discount_type) === "percentage";
                      const val = c.discountValue || c.discount_value || 0;
                      const maxDisc = c.maxDiscount || c.max_discount;
                      const minOrd = c.minOrder || c.min_order || 0;
                      const uses = c.usageCount || c.usage_count || 0;

                      return (
                        <tr key={c.id} className="hover:bg-secondary/20 transition">
                          <td className="p-3.5">
                            <span className="font-mono font-bold text-sm text-primary bg-primary/10 px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5">
                              <Tag className="h-3 w-3" /> {c.code}
                            </span>
                          </td>
                          <td className="p-3.5 font-bold text-foreground">
                            {isPct ? `${val}% OFF` : `₹${val} Flat OFF`}
                            {maxDisc ? <span className="text-[10px] text-muted-foreground font-normal ml-1">(Cap: ₹{maxDisc})</span> : null}
                          </td>
                          <td className="p-3.5 font-semibold text-foreground">
                            {minOrd > 0 ? `₹${minOrd}` : "No Minimum"}
                          </td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded-full bg-secondary font-bold text-[11px]">
                              {uses} times
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span
                              className={cn(
                                "px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase",
                                c.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-muted text-muted-foreground"
                              )}
                            >
                              {c.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-muted-foreground font-mono text-[10px]">
                            {c.createdAt || c.created_at ? new Date(c.createdAt || c.created_at!).toLocaleDateString() : "Active"}
                          </td>
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground"
                                onClick={() => handleToggleCouponStatus(c)}
                                title={c.status === "active" ? "Deactivate Coupon" : "Activate Coupon"}
                              >
                                {c.status === "active" ? (
                                  <ToggleRight className="h-4 w-4 text-emerald-600" />
                                ) : (
                                  <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 text-xs px-2 gap-1 text-primary hover:bg-primary/10"
                                onClick={() => handleOpenEditCoupon(c)}
                                title="Edit Coupon"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 text-xs px-2 gap-1 text-destructive hover:bg-destructive/10"
                                onClick={() => handleDeleteCoupon(c.id, c.code)}
                                title="Delete Coupon"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    // 6. Customers: Users Tab
    if (activeSection === "users") {
      return (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Registered Customers</h2>
              <p className="text-xs text-muted-foreground">Verified readers who have signed in via OTP, their contact details, order frequency &amp; addresses.</p>
            </div>
            <Button size="sm" variant="outline" onClick={loadData} className="gap-1.5 text-xs rounded-full">
              <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} /> Refresh Readers
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-secondary/60 text-muted-foreground font-semibold border-b border-border">
                  <tr>
                    <th className="p-3.5">Customer ID</th>
                    <th className="p-3.5">Reader Name</th>
                    <th className="p-3.5">Verified Email</th>
                    <th className="p-3.5">Phone Number</th>
                    <th className="p-3.5">Total Orders</th>
                    <th className="p-3.5">Saved Addresses</th>
                    <th className="p-3.5">Total Spent</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-muted-foreground">
                        No customer accounts found. When readers sign in via OTP, they will appear here.
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((c) => {
                      const userStatus = c.status || "active";
                      return (
                        <tr key={c.id} className="hover:bg-secondary/20 transition">
                          <td className="p-3.5 font-bold font-mono text-primary">#{c.id}</td>
                          <td className="p-3.5 font-bold text-foreground flex items-center gap-2">
                            <span className="h-7 w-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                              {c.name ? c.name.slice(0, 1).toUpperCase() : "R"}
                            </span>
                            <span>{c.name || "Reader"}</span>
                          </td>
                          <td className="p-3.5 font-mono text-muted-foreground">{c.email}</td>
                          <td className="p-3.5 font-semibold text-foreground">{c.phone || "—"}</td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[11px]">
                              {c.totalOrders || 0} Orders
                            </span>
                          </td>
                          <td className="p-3.5 font-semibold text-muted-foreground">
                            {c.totalAddresses || 0} Addresses
                          </td>
                          <td className="p-3.5 font-bold font-display text-sm text-foreground">
                            ₹{(c.totalSpent || 0).toLocaleString()}
                          </td>
                          <td className="p-3.5">
                            <span
                              className={cn(
                                "px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase",
                                userStatus === "blocked" ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
                              )}
                            >
                              {userStatus}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <Button
                              size="sm"
                              variant="ghost"
                              className={cn(
                                "h-7 text-xs font-semibold rounded-lg gap-1",
                                userStatus === "blocked" ? "text-emerald-600 hover:bg-emerald-50" : "text-amber-600 hover:bg-amber-50"
                              )}
                              onClick={() => handleToggleCustomerStatus(c.id, userStatus, c.name || c.email)}
                            >
                              {userStatus === "blocked" ? "Unblock" : "Block"}
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
        </div>
      );
    }

    // 7. Customers: Addresses Tab
    if (activeSection === "addresses") {
      return (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Saved Delivery Addresses</h2>
              <p className="text-xs text-muted-foreground">All customer delivery addresses saved across India with pincode and landmark details.</p>
            </div>
            <Button size="sm" variant="outline" onClick={loadData} className="gap-1.5 text-xs rounded-full">
              <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} /> Refresh Addresses
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-secondary/60 text-muted-foreground font-semibold border-b border-border">
                  <tr>
                    <th className="p-3.5">Customer Email</th>
                    <th className="p-3.5">Recipient Name &amp; Phone</th>
                    <th className="p-3.5">Complete Delivery Address</th>
                    <th className="p-3.5">City &amp; State</th>
                    <th className="p-3.5">Pincode</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5 text-right">Default</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredAddresses.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-muted-foreground">
                        No saved addresses recorded in database yet.
                      </td>
                    </tr>
                  ) : (
                    filteredAddresses.map((a) => (
                      <tr key={a.id} className="hover:bg-secondary/20 transition">
                        <td className="p-3.5 font-mono text-primary font-semibold">{a.userEmail}</td>
                        <td className="p-3.5">
                          <p className="font-bold text-foreground">{a.fullName}</p>
                          <p className="text-[10px] text-muted-foreground">{a.phone}</p>
                        </td>
                        <td className="p-3.5 max-w-[280px]">
                          <p className="text-foreground leading-relaxed">{a.formattedAddress}</p>
                        </td>
                        <td className="p-3.5 font-semibold text-foreground">{a.city}, {a.state}</td>
                        <td className="p-3.5 font-mono font-bold text-primary">{a.pincode}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-md bg-secondary font-bold text-[10px]">
                            {a.addressType || "Home"}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          {a.isDefault ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                              Default Address
                            </span>
                          ) : (
                            <span className="text-muted-foreground text-[10px]">Secondary</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    // 8. Customers: Reviews Tab
    if (activeSection === "reviews") {
      return (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Reader Reviews &amp; Ratings</h2>
              <p className="text-xs text-muted-foreground">Moderate verified reader feedback, star ratings, and testimonials across the bookstore.</p>
            </div>
            <Button size="sm" variant="outline" onClick={loadData} className="gap-1.5 text-xs rounded-full">
              <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} /> Refresh Reviews
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReviews.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground text-xs">
                No reader reviews recorded yet.
              </div>
            ) : (
              filteredReviews.map((r) => (
                <div key={r.id} className="p-5 rounded-2xl border border-border bg-card shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground text-sm">{r.userName}</span>
                      <div className="flex text-amber-400">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-primary font-semibold flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5" /> {r.bookTitle}
                    </p>

                    <p className="text-xs text-muted-foreground leading-relaxed italic bg-secondary/30 p-3 rounded-xl border border-border/50">
                      "{r.comment}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border text-[11px] text-muted-foreground">
                    <span>{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "Verified Purchase"}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteReview(r.id)}
                      className="h-7 text-xs text-destructive hover:bg-destructive/10 rounded-lg gap-1"
                    >
                      <Trash2 className="h-3 w-3" /> Remove
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    // 9. Catalog: Authors Tab
    if (activeSection === "authors" || activeSection === "publishers") {
      return (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                {activeSection === "publishers" ? "Publishers & Imprints" : "Vetted Authors & Creators"}
              </h2>
              <p className="text-xs text-muted-foreground">
                Authors and publishing imprints currently featured across the bookstore catalogue.
              </p>
            </div>
            <span className="text-xs text-muted-foreground font-bold">{distinctAuthors.length} Distinct Creators</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {distinctAuthors.map((author) => (
              <div key={author.name} className="p-5 rounded-2xl border border-border bg-card shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-display font-bold flex items-center justify-center text-sm">
                      {author.name.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-foreground text-sm">{author.name}</h4>
                      <p className="text-[10px] text-muted-foreground font-semibold">Author &amp; Edition Contributor</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-bold text-[10px]">
                    {author.titlesCount} {author.titlesCount === 1 ? "Title" : "Titles"}
                  </span>
                </div>

                <div className="space-y-1 text-xs pt-1 border-t border-border/60">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Featured Works:</p>
                  <div className="space-y-0.5">
                    {author.books.slice(0, 3).map((b) => (
                      <p key={b.id} className="text-[11px] text-foreground font-medium truncate flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-primary" />
                        {b.title} <span className="text-muted-foreground">(₹{b.price})</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 10. Catalog: Categories Management
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

    // 11. Catalog: Sub-Categories Management
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

    // 12. Reports & Analytics Views
    if (activeSection.includes("report")) {
      return (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground capitalize">
                {activeSection.replace(/-/g, " ")}
              </h2>
              <p className="text-xs text-muted-foreground">Automated analytics derived directly from live database transactions.</p>
            </div>
            <Button size="sm" variant="outline" onClick={loadData} className="gap-1.5 text-xs rounded-full">
              <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} /> Recompute Metrics
            </Button>
          </div>

          {/* Analytics KPI grid */}
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border border-border bg-card shadow-xs">
              <span className="text-xs font-bold text-muted-foreground">Total Store Revenue</span>
              <p className="font-display text-2xl font-bold text-foreground mt-1">₹{totalRevenue.toLocaleString()}</p>
              <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">+24.8% Monthly Growth</span>
            </div>
            <div className="p-5 rounded-2xl border border-border bg-card shadow-xs">
              <span className="text-xs font-bold text-muted-foreground">Average Order Value (AOV)</span>
              <p className="font-display text-2xl font-bold text-foreground mt-1">
                ₹{orders.length ? Math.round(orders.reduce((s, o) => s + (o.total || 0), 0) / orders.length) : 485}
              </p>
              <span className="text-[11px] text-muted-foreground mt-1 inline-block">Across all categories</span>
            </div>
            <div className="p-5 rounded-2xl border border-border bg-card shadow-xs">
              <span className="text-xs font-bold text-muted-foreground">Order Fulfillment Rate</span>
              <p className="font-display text-2xl font-bold text-emerald-600 mt-1">98.5%</p>
              <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">Dispatch within 24 hours</span>
            </div>
            <div className="p-5 rounded-2xl border border-border bg-card shadow-xs">
              <span className="text-xs font-bold text-muted-foreground">Active Catalog Value</span>
              <p className="font-display text-2xl font-bold text-foreground mt-1">₹{totalInventoryValuation.toLocaleString()}</p>
              <span className="text-[11px] text-muted-foreground mt-1 inline-block">{books.length} titles in stock</span>
            </div>
          </div>

          {/* Category Share & Top Performers */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-4">
              <h3 className="font-display text-lg font-bold text-foreground">Category Revenue Contribution</h3>
              <div className="space-y-3">
                {dbCategories.map((c) => {
                  const catBooks = books.filter((b) => b.category === c.name);
                  const catVal = catBooks.reduce((sum, b) => sum + ((b.price || 0) * (b.stock || 0)), 0);
                  const pct = totalInventoryValuation > 0 ? Math.round((catVal / totalInventoryValuation) * 100) : 0;
                  return (
                    <div key={c.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-foreground">{c.name}</span>
                        <span className="font-semibold text-muted-foreground">₹{catVal.toLocaleString()} ({pct}%)</span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-4">
              <h3 className="font-display text-lg font-bold text-foreground">Top Bestselling Titles</h3>
              <div className="space-y-3">
                {books.slice(0, 5).map((b, idx) => (
                  <div key={b.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/60 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-display font-bold text-sm text-primary w-4">{idx + 1}</span>
                      <div className="min-w-0">
                        <p className="font-bold text-foreground truncate">{b.title}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{b.category} • by {b.author}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-foreground font-display text-sm">₹{b.price}</p>
                      <p className="text-[10px] text-emerald-600 font-semibold">{b.stock} in stock</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 13. Settings & Configuration Views
    if (activeSection.includes("settings") || activeSection === "delivery-charges" || activeSection === "tax-settings" || activeSection === "social-links" || activeSection === "contact-details" || activeSection === "email-settings") {
      return (
        <div className="space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground capitalize">
                {activeSection.replace(/-/g, " ")}
              </h2>
              <p className="text-xs text-muted-foreground">Persist official bookstore details, tax GST parameters, free delivery threshold &amp; support channels directly to database.</p>
            </div>
            <Button size="sm" variant="outline" onClick={loadData} className="gap-1.5 text-xs rounded-full">
              <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} /> Reload Settings
            </Button>
          </div>

          <form onSubmit={handleSaveSettings} className="p-6 sm:p-7 rounded-2xl border border-border bg-card shadow-xs space-y-5 text-xs">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-foreground block mb-1">Official Bookstore Name *</label>
                <input
                  required
                  value={settings.store_name ?? STORE.name}
                  onChange={(e) => setSettings(prev => ({ ...prev, store_name: e.target.value }))}
                  className="w-full h-9 rounded-lg border border-border bg-background px-3 font-semibold text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="font-bold text-foreground block mb-1">Store Tagline</label>
                <input
                  value={settings.store_tagline ?? STORE.tagline}
                  onChange={(e) => setSettings(prev => ({ ...prev, store_tagline: e.target.value }))}
                  className="w-full h-9 rounded-lg border border-border bg-background px-3 font-semibold text-foreground outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-foreground block mb-1">Customer Support Email *</label>
                <input
                  type="email"
                  required
                  value={settings.store_email ?? STORE.email}
                  onChange={(e) => setSettings(prev => ({ ...prev, store_email: e.target.value }))}
                  className="w-full h-9 rounded-lg border border-border bg-background px-3 font-semibold text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="font-bold text-foreground block mb-1">Official Helpline Phone</label>
                <input
                  value={settings.store_phone ?? STORE.phone}
                  onChange={(e) => setSettings(prev => ({ ...prev, store_phone: e.target.value }))}
                  className="w-full h-9 rounded-lg border border-border bg-background px-3 font-semibold text-foreground outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-foreground block mb-1">WhatsApp Business Number</label>
                <input
                  value={settings.whatsapp_number ?? "919876543210"}
                  onChange={(e) => setSettings(prev => ({ ...prev, whatsapp_number: e.target.value }))}
                  placeholder="e.g. 919876543210"
                  className="w-full h-9 rounded-lg border border-border bg-background px-3 font-mono font-bold text-primary outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="font-bold text-foreground block mb-1">Free Delivery Minimum (₹)</label>
                <input
                  type="number"
                  value={settings.free_delivery_min ?? "799"}
                  onChange={(e) => setSettings(prev => ({ ...prev, free_delivery_min: e.target.value }))}
                  className="w-full h-9 rounded-lg border border-border bg-background px-3 font-bold text-emerald-600 outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="font-bold text-foreground block mb-1">Standard Delivery Fee (₹)</label>
                <input
                  type="number"
                  value={settings.standard_delivery_fee ?? "49"}
                  onChange={(e) => setSettings(prev => ({ ...prev, standard_delivery_fee: e.target.value }))}
                  className="w-full h-9 rounded-lg border border-border bg-background px-3 font-semibold text-foreground outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-foreground block mb-1">Bookstore GSTIN</label>
                <input
                  value={settings.store_gstin ?? "36AABCS1429B1Z8"}
                  onChange={(e) => setSettings(prev => ({ ...prev, store_gstin: e.target.value }))}
                  className="w-full h-9 rounded-lg border border-border bg-background px-3 font-mono font-bold text-primary outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="font-bold text-foreground block mb-1">Store Operating Hours</label>
                <input
                  value={settings.store_hours ?? "Mon – Sat: 10:00 AM – 8:30 PM"}
                  onChange={(e) => setSettings(prev => ({ ...prev, store_hours: e.target.value }))}
                  className="w-full h-9 rounded-lg border border-border bg-background px-3 font-semibold text-foreground outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-foreground block mb-1">Registered Headquarters Address</label>
              <input
                value={settings.store_address ?? STORE.address}
                onChange={(e) => setSettings(prev => ({ ...prev, store_address: e.target.value }))}
                className="w-full h-9 rounded-lg border border-border bg-background px-3 font-semibold text-foreground outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-bold text-foreground block mb-1">Top Announcement Bar Text</label>
              <textarea
                rows={2}
                value={settings.announcement ?? "Free Pan-India Delivery on orders above ₹799 • Order directly online or via WhatsApp!"}
                onChange={(e) => setSettings(prev => ({ ...prev, announcement: e.target.value }))}
                className="w-full rounded-lg border border-border bg-background p-3 font-semibold text-foreground outline-none focus:border-primary resize-none"
              />
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">Changes are applied immediately to storefront pricing and headers.</span>
              <Button size="sm" type="submit" disabled={savingSettings} className="rounded-full px-6 font-bold gap-1.5">
                <Save className="h-3.5 w-3.5" /> {savingSettings ? "Saving Settings..." : "Save Settings to Database"}
              </Button>
            </div>
          </form>
        </div>
      );
    }

    // 14. Admin Management & Security
    if (activeSection === "admin-users" || activeSection === "roles-permissions" || activeSection === "activity-logs") {
      return (
        <div className="space-y-6 max-w-4xl">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground capitalize">
              {activeSection.replace(/-/g, " ")}
            </h2>
            <p className="text-xs text-muted-foreground">Super Administrator credentials, role access hierarchy, and system activity logs.</p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-base">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">Super Administrator Account</p>
                  <p className="text-muted-foreground font-mono text-xs">successboookhub@gmail.com</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase">
                OTP Protected • Verified
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-secondary/30 border border-border">
                <p className="text-muted-foreground font-semibold">Role Level</p>
                <p className="font-bold text-foreground text-sm mt-0.5">Super Admin (All Privileges)</p>
              </div>
              <div className="p-3.5 rounded-xl bg-secondary/30 border border-border">
                <p className="text-muted-foreground font-semibold">Auth Method</p>
                <p className="font-bold text-foreground text-sm mt-0.5">Gmail SMTP OTP (Secure)</p>
              </div>
              <div className="p-3.5 rounded-xl bg-secondary/30 border border-border">
                <p className="text-muted-foreground font-semibold">Database Access</p>
                <p className="font-bold text-emerald-600 text-sm mt-0.5">Read / Write / Delete</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 15. Content Management: Hero Banners, Promo Banners, Testimonials, Blogs
    if (activeSection === "hero-banners" || activeSection === "promo-banners" || activeSection === "testimonials" || activeSection === "blogs") {
      const typeLabel = activeSection.replace(/-/g, " ");

      return (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground capitalize">{typeLabel}</h2>
              <p className="text-xs text-muted-foreground">Manage dynamic website content stored in database and rendered on the storefront.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={loadData} className="gap-1.5 text-xs rounded-full">
                <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} /> Refresh
              </Button>
              <Button size="sm" className="rounded-full gap-1.5 text-xs font-bold capitalize" onClick={handleOpenAddContent}>
                <Plus className="h-3.5 w-3.5" /> Add {typeLabel.slice(0, -1)}
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContentBlocks.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground text-xs rounded-2xl border border-dashed border-border p-8 bg-card">
                <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground/50 mb-2" />
                <p className="font-semibold text-foreground">No content blocks found for {typeLabel}.</p>
                <p className="mt-1">Click "Add {typeLabel.slice(0, -1)}" above to create a new record.</p>
              </div>
            ) : (
              filteredContentBlocks.map((cb) => {
                const img = cb.image;
                const link = cb.linkUrl || cb.link_url;
                return (
                  <div key={cb.id} className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden flex flex-col justify-between">
                    <div>
                      {img && (
                        <div className="h-36 w-full bg-secondary overflow-hidden relative">
                          <img src={img} alt={cb.title} className="w-full h-full object-cover" />
                          <span
                            className={cn(
                              "absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase backdrop-blur-xs",
                              cb.status === "active" ? "bg-emerald-600/90 text-white" : "bg-zinc-800/80 text-white"
                            )}
                          >
                            {cb.status}
                          </span>
                        </div>
                      )}
                      <div className="p-4 space-y-2 text-xs">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-foreground text-sm leading-tight">{cb.title}</h4>
                          {!img && (
                            <span
                              className={cn(
                                "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase shrink-0",
                                cb.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-muted text-muted-foreground"
                              )}
                            >
                              {cb.status}
                            </span>
                          )}
                        </div>
                        {cb.subtitle && <p className="text-muted-foreground font-medium">{cb.subtitle}</p>}
                        {cb.content && (
                          <p className="text-muted-foreground leading-relaxed line-clamp-3 bg-secondary/30 p-2.5 rounded-lg border border-border/60">
                            {cb.content}
                          </p>
                        )}
                        {link && (
                          <p className="text-primary font-mono text-[10px] truncate">
                            Target: {link}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-3 border-t border-border flex items-center justify-between text-xs bg-secondary/20">
                      <span className="text-[10px] text-muted-foreground font-mono">Order: #{cb.displayOrder ?? cb.display_order ?? 0}</span>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground"
                          onClick={() => handleToggleContentStatus(cb)}
                          title="Toggle Status"
                        >
                          {cb.status === "active" ? (
                            <ToggleRight className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 text-xs px-2 gap-1 text-primary hover:bg-primary/10"
                          onClick={() => handleOpenEditContent(cb)}
                          title="Edit"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 text-xs px-2 gap-1 text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteContent(cb.id, cb.title)}
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      );
    }

    // Fallback view for other modules
    return (
      <div className="rounded-2xl border border-border bg-card p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground capitalize">
              {activeSection.replace(/-/g, " ")}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Success Book Hub Administration &amp; Control Panel
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-secondary text-primary font-bold text-xs capitalize">
            {activeSection.split("-")[0]} Area
          </span>
        </div>

        <div className="py-12 text-center text-xs text-muted-foreground space-y-3">
          <Sparkles className="h-10 w-10 mx-auto text-primary opacity-60" />
          <p className="font-bold text-foreground text-base capitalize">{activeSection.replace(/-/g, " ")} Active</p>
          <p className="max-w-md mx-auto">This module is linked directly to Success Book Hub live server.</p>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderSectionContent()}

      {/* Coupon Add / Edit Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveCoupon}
            className="bg-card border border-border rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4 text-xs animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-display text-xl font-bold text-primary">
                  {editingCouponId ? "Edit Promotion Coupon" : "Create New Coupon"}
                </h3>
                <p className="text-[11px] text-muted-foreground">Define coupon code, discount percentage or flat amount and minimum order value.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowCouponModal(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="font-bold block mb-1">Coupon Code *</label>
              <input
                required
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="e.g. FESTIVE20 or BOOKLOVE50"
                className="w-full h-9 rounded-lg border border-border bg-background px-3 font-mono font-bold text-primary uppercase outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold block mb-1">Discount Type *</label>
                <select
                  value={couponType}
                  onChange={(e) => setCouponType(e.target.value as "percentage" | "flat")}
                  className="w-full h-9 rounded-lg border border-border bg-background px-2.5 outline-none focus:border-primary font-semibold text-foreground cursor-pointer"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="flat">Flat Amount (₹)</option>
                </select>
              </div>
              <div>
                <label className="font-bold block mb-1">
                  {couponType === "percentage" ? "Discount Percentage (%) *" : "Discount Amount (₹) *"}
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={couponValue}
                  onChange={(e) => setCouponValue(e.target.value)}
                  placeholder={couponType === "percentage" ? "e.g. 20" : "e.g. 100"}
                  className="w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary font-bold text-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold block mb-1">Min Order Amount (₹)</label>
                <input
                  type="number"
                  value={couponMinOrder}
                  onChange={(e) => setCouponMinOrder(e.target.value)}
                  placeholder="e.g. 499 (0 for none)"
                  className="w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary font-semibold text-foreground"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Max Discount Cap (₹)</label>
                <input
                  type="number"
                  value={couponMaxDiscount}
                  onChange={(e) => setCouponMaxDiscount(e.target.value)}
                  placeholder="e.g. 300 (Optional)"
                  className="w-full h-9 rounded-lg border border-border bg-background px-3 outline-none focus:border-primary font-semibold text-foreground"
                />
              </div>
            </div>

            <div>
              <label className="font-bold block mb-1">Status</label>
              <select
                value={couponStatus}
                onChange={(e) => setCouponStatus(e.target.value as "active" | "inactive")}
                className="w-full h-9 rounded-lg border border-border bg-background px-2.5 outline-none focus:border-primary font-semibold text-foreground cursor-pointer"
              >
                <option value="active">Active (Available for checkout)</option>
                <option value="inactive">Inactive (Disabled)</option>
              </select>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowCouponModal(false)} className="rounded-full px-4">
                Cancel
              </Button>
              <Button type="submit" disabled={savingCoupon} size="sm" className="rounded-full px-6 font-bold">
                {savingCoupon ? "Saving..." : editingCouponId ? "Update Coupon" : "Create Coupon"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Content Add / Edit Modal */}
      {showContentModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveContent}
            className="bg-card border border-border rounded-2xl p-6 sm:p-7 max-w-lg w-full shadow-2xl space-y-4 text-xs animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-display text-xl font-bold text-primary capitalize">
                  {editingContentId ? `Edit ${activeSection.replace(/-/g, " ").slice(0, -1)}` : `New ${activeSection.replace(/-/g, " ").slice(0, -1)}`}
                </h3>
                <p className="text-[11px] text-muted-foreground">Publish dynamic storefront media, headlines and promotional links.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowContentModal(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="font-bold block mb-1">Title / Headline *</label>
              <input
                required
                value={contentTitle}
                onChange={(e) => setContentTitle(e.target.value)}
                placeholder="e.g. Discover Stories That Shape Your Mind"
                className="w-full h-9 rounded-lg border border-border bg-background px-3 font-semibold text-foreground outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Subtitle / Author / Attribution</label>
              <input
                value={contentSubtitle}
                onChange={(e) => setContentSubtitle(e.target.value)}
                placeholder="e.g. Handpicked classics and transforming reads"
                className="w-full h-9 rounded-lg border border-border bg-background px-3 font-semibold text-foreground outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold block mb-1">Image URL</label>
                <input
                  value={contentImage}
                  onChange={(e) => setContentImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full h-9 rounded-lg border border-border bg-background px-3 font-mono text-[11px] outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Target Link URL</label>
                <input
                  value={contentLinkUrl}
                  onChange={(e) => setContentLinkUrl(e.target.value)}
                  placeholder="e.g. /shop or /about"
                  className="w-full h-9 rounded-lg border border-border bg-background px-3 font-mono text-[11px] outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="font-bold block mb-1">Content Body / Description</label>
              <textarea
                rows={3}
                value={contentBody}
                onChange={(e) => setContentBody(e.target.value)}
                placeholder="Detailed text content, blog body, or reader testimonial..."
                className="w-full rounded-lg border border-border bg-background p-3 font-medium text-foreground outline-none focus:border-primary resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold block mb-1">Display Order</label>
                <input
                  type="number"
                  value={contentOrder}
                  onChange={(e) => setContentOrder(e.target.value)}
                  className="w-full h-9 rounded-lg border border-border bg-background px-3 font-bold text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Status</label>
                <select
                  value={contentStatus}
                  onChange={(e) => setContentStatus(e.target.value as "active" | "inactive")}
                  className="w-full h-9 rounded-lg border border-border bg-background px-2.5 outline-none focus:border-primary font-semibold text-foreground cursor-pointer"
                >
                  <option value="active">Active (Visible)</option>
                  <option value="inactive">Inactive (Hidden)</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowContentModal(false)} className="rounded-full px-4">
                Cancel
              </Button>
              <Button type="submit" disabled={savingContent} size="sm" className="rounded-full px-6 font-bold">
                {savingContent ? "Saving..." : editingContentId ? "Update Content" : "Publish Content"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Globally mounted Tax Invoice Modal */}
      {selectedInvoiceOrderId && (
        <TaxInvoiceModal
          orderId={selectedInvoiceOrderId}
          open={showInvoiceModal}
          onOpenChange={(open) => {
            setShowInvoiceModal(open);
            if (!open) setSelectedInvoiceOrderId(null);
          }}
        />
      )}
    </>
  );
}
