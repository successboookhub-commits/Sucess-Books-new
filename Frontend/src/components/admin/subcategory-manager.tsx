import { useState, useEffect, useMemo } from "react";
import {
  Layers,
  Search,
  RefreshCw,
  Edit2,
  Trash2,
  Plus,
  CheckCircle2,
  AlertTriangle,
  FolderOpen,
  Filter,
  Upload,
  Sparkles,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { api, type Category, type SubCategory, fallbackCategoryList } from "@/lib/api";
import { uploadImageToServer } from "@/lib/image-compress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SubCategoryManagerProps {
  initialCategoryId?: number | null;
  categories?: Category[];
  autoOpenCreate?: boolean;
  onModalClosed?: () => void;
  onNavigateToCategories?: () => void;
}

const PRESET_SUB_IMAGES = [
  { label: "Modern Fiction", url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop" },
  { label: "Classic Poetry", url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop" },
  { label: "Manga & Art", url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop" },
  { label: "Space & Physics", url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop" },
  { label: "Habits & Routine", url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop" },
  { label: "Mindfulness", url: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop" }
];

export function SubCategoryManager({
  initialCategoryId,
  categories: passedCategories,
  autoOpenCreate,
  onModalClosed,
  onNavigateToCategories
}: SubCategoryManagerProps) {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>(
    passedCategories && passedCategories.length > 0 ? passedCategories : fallbackCategoryList
  );
  const [loading, setLoading] = useState(true);

  // Fallback resilient categories
  const effectiveCategories = useMemo(() => {
    if (categories && categories.length > 0) return categories;
    if (passedCategories && passedCategories.length > 0) return passedCategories;
    return fallbackCategoryList;
  }, [categories, passedCategories]);

  // Filters
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>(
    initialCategoryId ? String(initialCategoryId) : "all"
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState<SubCategory | null>(null);
  const [deletingSub, setDeletingSub] = useState<SubCategory | null>(null);

  // Form states
  const [categoryId, setCategoryId] = useState<number>(() => {
    if (initialCategoryId) return initialCategoryId;
    if (passedCategories && passedCategories.length > 0) return passedCategories[0].id;
    return fallbackCategoryList[0]?.id || 1;
  });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Modal close handler
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (onModalClosed) onModalClosed();
  };

  // Sync passedCategories if updated by parent
  useEffect(() => {
    if (passedCategories && passedCategories.length > 0) {
      setCategories(passedCategories);
      setCategoryId((prev) => (prev > 0 ? prev : (initialCategoryId || passedCategories[0].id)));
    }
  }, [passedCategories, initialCategoryId]);

  // Load Categories & SubCategories
  const loadData = async () => {
    setLoading(true);
    try {
      const [cats, subs] = await Promise.all([
        api.getCategories(),
        api.getSubCategories()
      ]);
      if (cats && cats.length > 0) {
        setCategories(cats);
        setCategoryId((prev) => (prev > 0 ? prev : (initialCategoryId || cats[0].id)));
      } else if (passedCategories && passedCategories.length > 0) {
        setCategories(passedCategories);
      }
      setSubCategories(subs || []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load sub-categories");
      if (passedCategories && passedCategories.length > 0) {
        setCategories(passedCategories);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered sub-categories
  const filteredSubCategories = useMemo(() => {
    return subCategories.filter((sub) => {
      const matchesCategory =
        selectedCategoryFilter === "all" ||
        String(sub.category_id) === String(selectedCategoryFilter);
      const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
      const matchesSearch =
        sub.name.toLowerCase().includes(search.toLowerCase()) ||
        (sub.description && sub.description.toLowerCase().includes(search.toLowerCase())) ||
        (sub.category_name && sub.category_name.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [subCategories, selectedCategoryFilter, statusFilter, search]);

  // Open Create Modal
  const handleOpenCreate = (presetCategoryId?: number) => {
    setEditingSub(null);
    const filterCatId = selectedCategoryFilter !== "all" ? Number(selectedCategoryFilter) : 0;
    const targetCatId =
      presetCategoryId ||
      filterCatId ||
      initialCategoryId ||
      (effectiveCategories.length > 0 ? effectiveCategories[0].id : 1);
    setCategoryId(targetCatId);
    setName("");
    setDescription("");
    setImage(PRESET_SUB_IMAGES[0].url);
    setStatus("active");
    setIsModalOpen(true);
  };

  // Sync initialCategoryId if passed
  useEffect(() => {
    if (initialCategoryId) {
      setSelectedCategoryFilter(String(initialCategoryId));
      setCategoryId(initialCategoryId);
      if (autoOpenCreate) {
        handleOpenCreate(initialCategoryId);
      }
    }
  }, [initialCategoryId, autoOpenCreate]);

  // Open Edit Modal
  const handleOpenEdit = (sub: SubCategory) => {
    setEditingSub(sub);
    setCategoryId(sub.category_id);
    setName(sub.name);
    setDescription(sub.description || "");
    setImage(sub.image || "");
    setStatus(sub.status);
    setIsModalOpen(true);
  };

  // Handle local image file upload -> compress client-side & upload to server
  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size is too large (max 10MB)");
      return;
    }

    setUploadingImage(true);
    const toastId = toast.loading("Optimizing and uploading image...");
    try {
      const prefix = name ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "subcat";
      const uploadedUrl = await uploadImageToServer(file, prefix);
      if (uploadedUrl) {
        setImage(uploadedUrl);
        toast.success("Image updated successfully", { id: toastId });
      }
    } catch (err: any) {
      toast.error("Failed to process image: " + (err.message || "Unknown error"), { id: toastId });
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  // Save SubCategory (Create or Edit)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalCatId = categoryId || (effectiveCategories.length > 0 ? effectiveCategories[0].id : 1);
    if (!finalCatId) {
      toast.error("Please select a parent category");
      return;
    }
    if (!name.trim()) {
      toast.error("Sub-category name is required");
      return;
    }

    setSaving(true);
    try {
      if (editingSub) {
        const updated = await api.updateSubCategory(editingSub.id, {
          category_id: finalCatId,
          name: name.trim(),
          description: description.trim(),
          image: image.trim(),
          status
        });
        setSubCategories((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
        toast.success(`Sub-category "${updated.name}" updated successfully`);
      } else {
        const created = await api.createSubCategory({
          category_id: finalCatId,
          name: name.trim(),
          description: description.trim(),
          image: image.trim(),
          status
        });
        setSubCategories((prev) => [...prev, created]);
        toast.success(`Sub-category "${created.name}" created successfully`);
      }
      handleCloseModal();
    } catch (err: any) {
      toast.error(err.message || "Failed to save sub-category");
    } finally {
      setSaving(false);
    }
  };

  // Confirm Delete
  const handleDelete = async () => {
    if (!deletingSub) return;
    try {
      await api.deleteSubCategory(deletingSub.id);
      setSubCategories((prev) => prev.filter((s) => s.id !== deletingSub.id));
      toast.success(`Sub-category "${deletingSub.name}" deleted`);
      setDeletingSub(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete sub-category");
    }
  };

  const activeCount = subCategories.filter((s) => s.status === "active").length;
  const categoriesCovered = new Set(subCategories.map((s) => s.category_id)).size;

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Sub-Categories Catalog</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Create and organize granular sub-genres linked dynamically to parent book categories.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={loadData}
            className="rounded-full text-xs h-9 gap-1.5"
            disabled={loading}
          >
            <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
            Sync
          </Button>
          <Button
            size="sm"
            onClick={() => handleOpenCreate()}
            className="rounded-full text-xs h-9 gap-1.5 shadow-sm font-semibold"
          >
            <Plus className="h-4 w-4" />
            Create Sub-Category
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
            <span>Total Sub-Categories</span>
            <span className="p-2 rounded-lg bg-primary/10 text-primary">
              <Layers className="h-4 w-4" />
            </span>
          </div>
          <p className="font-display text-2xl font-bold text-foreground mt-2">{subCategories.length}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Granular literary taxonomy</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
            <span>Categories Mapped</span>
            <span className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <FolderOpen className="h-4 w-4" />
            </span>
          </div>
          <p className="font-display text-2xl font-bold text-foreground mt-2">
            {categoriesCovered} / {effectiveCategories.length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Parent categories enriched</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
            <span>Active Sub-Categories</span>
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
            </span>
          </div>
          <p className="font-display text-2xl font-bold text-foreground mt-2">{activeCount}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Available for book tagging</p>
        </div>
      </div>

      {/* Filters Bar: Parent Category Select + Search + Status */}
      <div className="rounded-xl border border-border bg-card p-3 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Parent Category Filter */}
          <div className="flex items-center gap-1.5 min-w-[200px]">
            <Filter className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="h-8.5 rounded-lg border border-border bg-background px-2.5 text-xs font-semibold outline-none focus:border-primary w-full cursor-pointer text-foreground"
            >
              <option value="all">All Parent Categories ({effectiveCategories.length})</option>
              {effectiveCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sub-categories..."
              className="w-full h-8.5 rounded-lg border border-border bg-background pl-9 pr-3 text-xs outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 shrink-0">
          {(["all", "active", "inactive"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors",
                statusFilter === filter
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-Categories Table & Visual List */}
      {loading ? (
        <div className="py-16 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
          <RefreshCw className="h-6 w-6 animate-spin text-primary" />
          <span>Loading sub-categories...</span>
        </div>
      ) : filteredSubCategories.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center text-xs text-muted-foreground space-y-3">
          <Layers className="h-10 w-10 mx-auto text-muted-foreground/60" />
          <p className="font-bold text-foreground text-sm">No sub-categories found</p>
          <p className="max-w-md mx-auto">
            {search || selectedCategoryFilter !== "all"
              ? "No sub-categories match your current filters. Try changing the parent category or clearing search."
              : "No sub-categories have been created yet. Click 'Create Sub-Category' to get started."}
          </p>
          <Button size="sm" onClick={() => handleOpenCreate()} className="rounded-full text-xs">
            <Plus className="h-3.5 w-3.5 mr-1" /> Add Sub-Category Now
          </Button>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-secondary/60 text-muted-foreground font-semibold border-b border-border">
                <tr>
                  <th className="p-3.5">Sub-Category & Thumbnail</th>
                  <th className="p-3.5">Parent Category</th>
                  <th className="p-3.5">Description</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredSubCategories.map((sub) => (
                  <tr key={sub.id} className="hover:bg-secondary/20 transition-colors">
                    {/* Sub-Category Name & Image */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg overflow-hidden border border-border bg-muted shrink-0">
                          <img
                            src={
                              !sub.image || (sub.image.startsWith("data:image/") && sub.image.length >= 65530)
                                ? PRESET_SUB_IMAGES[0].url
                                : sub.image
                            }
                            alt={sub.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = PRESET_SUB_IMAGES[0].url;
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-sm leading-tight">{sub.name}</p>
                          <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                            slug: {sub.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Parent Category Badge */}
                    <td className="p-3.5">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-border bg-secondary/40">
                        {sub.category_image && (
                          <img
                            src={sub.category_image}
                            alt=""
                            className="h-4 w-4 rounded-full object-cover"
                          />
                        )}
                        <span className="font-semibold text-foreground text-[11px]">
                          {sub.category_name || "Unknown"}
                        </span>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="p-3.5 max-w-xs">
                      <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                        {sub.description || "—"}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="p-3.5">
                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase",
                          sub.status === "active"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                        )}
                      >
                        {sub.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(sub)}
                          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          title="Edit Sub-Category"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingSub(sub)}
                          className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          title="Delete Sub-Category"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE / EDIT SUB-CATEGORY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSave}
            className="bg-card border border-border rounded-xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-xs animate-in zoom-in-95 my-8"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-display text-xl font-bold text-primary">
                  {editingSub ? "Edit Sub-Category" : "Create Sub-Category"}
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Link this sub-genre dynamically to a parent book category.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-muted-foreground hover:text-foreground text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Parent Category Selector */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-foreground block text-xs">Parent Category *</label>
                {effectiveCategories.length === 0 && (
                  <span className="text-[10px] text-amber-600 font-semibold animate-pulse">
                    Loading categories...
                  </span>
                )}
              </div>
              <select
                required
                value={categoryId || (effectiveCategories[0]?.id ?? "")}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="w-full h-9 rounded-md border border-border bg-background px-3 text-xs font-semibold outline-none focus:border-primary cursor-pointer text-foreground"
              >
                {effectiveCategories.length === 0 ? (
                  <option value="" disabled>Loading categories from database...</option>
                ) : (
                  effectiveCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.status !== "active" ? "(Inactive)" : ""}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Sub-Category Name */}
            <div>
              <label className="font-bold text-foreground block mb-1">Sub-Category Name *</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Manga & Anime, Historical Fiction, Stoicism"
                className="w-full h-9 rounded-md border border-border bg-background px-3 text-xs outline-none focus:border-primary"
              />
              {name && (
                <p className="text-[10px] text-muted-foreground mt-1">
                  Slug: <code className="font-mono text-primary font-bold">{name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}</code>
                </p>
              )}
            </div>

            {/* Image URL & Upload */}
            <div className="space-y-2">
              <label className="font-bold text-foreground block">Thumbnail Image *</label>
              
              <div className="flex gap-2">
                <input
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Paste thumbnail URL or select preset/upload..."
                  className="flex-1 h-9 rounded-md border border-border bg-background px-3 text-xs outline-none focus:border-primary"
                />
                <label className={cn(
                  "h-9 px-3 rounded-md border border-border bg-secondary/70 hover:bg-secondary cursor-pointer flex items-center gap-1.5 text-xs font-semibold text-foreground transition-all",
                  uploadingImage && "opacity-60 pointer-events-none"
                )}>
                  {uploadingImage ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                  ) : (
                    <Upload className="h-3.5 w-3.5" />
                  )}
                  <span>{uploadingImage ? "Uploading..." : "Upload"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingImage}
                    className="hidden"
                    onChange={handleImageFileUpload}
                  />
                </label>
              </div>

              {/* Quick Image Presets */}
              <div className="pt-1">
                <span className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1 mb-1.5">
                  <Sparkles className="h-3 w-3 text-gold" /> Quick Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_SUB_IMAGES.map((preset) => (
                    <button
                      type="button"
                      key={preset.label}
                      onClick={() => setImage(preset.url)}
                      className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] border transition-colors",
                        image === preset.url
                          ? "border-primary bg-primary/10 text-primary font-bold"
                          : "border-border bg-background hover:bg-secondary text-muted-foreground"
                      )}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Preview Box */}
              {image && (
                <div className="mt-2 rounded-lg border border-border p-2 bg-secondary/30 flex items-center gap-3">
                  <img
                    src={image}
                    alt="Preview"
                    className="h-14 w-14 rounded-md object-cover border border-border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PRESET_SUB_IMAGES[0].url;
                    }}
                  />
                  <div>
                    <span className="text-[10px] font-bold text-gold uppercase tracking-wider">Preview</span>
                    <p className="font-bold text-foreground text-xs">{name || "Sub-Category Title"}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="font-bold text-foreground block mb-1">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of books cataloged under this sub-category..."
                className="w-full rounded-md border border-border bg-background p-2 text-xs outline-none focus:border-primary leading-relaxed"
              />
            </div>

            {/* Status */}
            <div>
              <label className="font-bold text-foreground block mb-1">Publication Status</label>
              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="subStatus"
                    checked={status === "active"}
                    onChange={() => setStatus("active")}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="font-semibold text-foreground">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="subStatus"
                    checked={status === "inactive"}
                    onChange={() => setStatus("inactive")}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="font-semibold text-muted-foreground">Inactive</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-3 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseModal}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : editingSub ? "Update Sub-Category" : "Create Sub-Category"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingSub && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-destructive/30 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-destructive">
              <div className="p-2 rounded-full bg-destructive/10">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">Delete Sub-Category?</h3>
                <p className="text-[11px] text-muted-foreground">This action will remove it from the catalog.</p>
              </div>
            </div>

            <p className="text-foreground leading-relaxed">
              Are you sure you want to delete <strong className="text-primary">"{deletingSub.name}"</strong> from parent category <em>{deletingSub.category_name}</em>?
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDeletingSub(null)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
              >
                Yes, Delete Sub-Category
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
