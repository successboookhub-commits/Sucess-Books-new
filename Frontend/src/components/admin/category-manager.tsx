import { useState, useEffect, useMemo } from "react";
import {
  FolderPlus,
  Search,
  RefreshCw,
  Edit2,
  Trash2,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Image as ImageIcon,
  Layers,
  BookOpen,
  ArrowRight,
  Upload,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { api, type Category } from "@/lib/api";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CategoryManagerProps {
  onNavigateToSubCategories?: (categoryId?: number) => void;
  onOpenAddSubCategory?: (category: Category) => void;
}

// Curated high quality presets to help admins quickly choose aesthetic cover art
const PRESET_IMAGES = [
  { label: "Classics", url: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800&auto=format&fit=crop" },
  { label: "Graphic Novels", url: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=800&auto=format&fit=crop" },
  { label: "Self Help", url: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop" },
  { label: "Science", url: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=800&auto=format&fit=crop" },
  { label: "Poetry", url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop" },
  { label: "Biography", url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop" },
  { label: "Philosophy", url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop" },
  { label: "Children", url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop" }
];

export function CategoryManager({ onNavigateToSubCategories, onOpenAddSubCategory }: CategoryManagerProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [saving, setSaving] = useState(false);

  // Fetch categories
  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Filtered categories
  const filteredCategories = useMemo(() => {
    return categories.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        (c.description && c.description.toLowerCase().includes(search.toLowerCase()));
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [categories, search, statusFilter]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingCategory(null);
    setName("");
    setDescription("");
    setImage(PRESET_IMAGES[0].url);
    setStatus("active");
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setDescription(cat.description || "");
    setImage(cat.image || "");
    setStatus(cat.status);
    setIsModalOpen(true);
  };

  // Handle local image file upload -> convert to base64 Data URL
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      toast.error("File size is too large (max 4MB)");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
        toast.success("Image loaded successfully");
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Category (Create or Edit)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    setSaving(true);
    try {
      if (editingCategory) {
        const updated = await api.updateCategory(editingCategory.id, {
          name: name.trim(),
          description: description.trim(),
          image: image.trim(),
          status
        });
        setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
        toast.success(`Category "${updated.name}" updated successfully`);
      } else {
        const created = await api.createCategory({
          name: name.trim(),
          description: description.trim(),
          image: image.trim(),
          status
        });
        setCategories((prev) => [...prev, created]);
        toast.success(`Category "${created.name}" created successfully`);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  // Confirm Delete
  const handleDelete = async () => {
    if (!deletingCategory) return;
    try {
      await api.deleteCategory(deletingCategory.id);
      setCategories((prev) => prev.filter((c) => c.id !== deletingCategory.id));
      toast.success(`Category "${deletingCategory.name}" and sub-categories deleted`);
      setDeletingCategory(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete category");
    }
  };

  // Metrics
  const totalSubcategories = categories.reduce((sum, c) => sum + (c.sub_categories_count || 0), 0);
  const activeCount = categories.filter((c) => c.status === "active").length;

  return (
    <div className="space-y-6">
      {/* Top Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Categories Taxonomy</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Create and curate bookstore departments, shelf headers, and dynamic hierarchies.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={loadCategories}
            className="rounded-full text-xs h-9 gap-1.5"
            disabled={loading}
          >
            <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
            Sync
          </Button>
          <Button
            size="sm"
            onClick={handleOpenCreate}
            className="rounded-full text-xs h-9 gap-1.5 shadow-sm font-semibold"
          >
            <Plus className="h-4 w-4" />
            Create Category
          </Button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
            <span>Total Categories</span>
            <span className="p-2 rounded-lg bg-primary/10 text-primary">
              <FolderPlus className="h-4 w-4" />
            </span>
          </div>
          <p className="font-display text-2xl font-bold text-foreground mt-2">{categories.length}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Literature & Genre Shelves</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
            <span>Active Categories</span>
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
            </span>
          </div>
          <p className="font-display text-2xl font-bold text-foreground mt-2">{activeCount}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Live on online storefront</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
            <span>Sub-Categories Linked</span>
            <span className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <Layers className="h-4 w-4" />
            </span>
          </div>
          <p className="font-display text-2xl font-bold text-foreground mt-2">{totalSubcategories}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Deep taxonomy branches</p>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-border bg-card p-3 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories by name or description..."
            className="w-full h-8.5 rounded-lg border border-border bg-background pl-9 pr-3 text-xs outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
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

      {/* Category Grid Cards */}
      {loading ? (
        <div className="py-16 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
          <RefreshCw className="h-6 w-6 animate-spin text-primary" />
          <span>Loading bookstore categories...</span>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center text-xs text-muted-foreground space-y-3">
          <FolderPlus className="h-10 w-10 mx-auto text-muted-foreground/60" />
          <p className="font-bold text-foreground text-sm">No categories found</p>
          <p className="max-w-md mx-auto">
            {search
              ? `No categories match your search "${search}". Try clearing the search filter.`
              : "No categories have been created yet. Click 'Create Category' to add the first one!"}
          </p>
          <Button size="sm" onClick={handleOpenCreate} className="rounded-full text-xs">
            <Plus className="h-3.5 w-3.5 mr-1" /> Add Category Now
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="group rounded-xl border border-border bg-card overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              {/* Category Cover Image with Overlay Badges */}
              <div className="relative h-40 w-full overflow-hidden bg-muted">
                <img
                  src={cat.image || PRESET_IMAGES[0].url}
                  alt={cat.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to placeholder image
                    (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Status Pill */}
                <span
                  className={cn(
                    "absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs",
                    cat.status === "active"
                      ? "bg-emerald-500/90 text-white"
                      : "bg-zinc-700/90 text-zinc-200"
                  )}
                >
                  {cat.status}
                </span>

                {/* Subcategories count badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
                  <Layers className="h-3 w-3 text-gold" />
                  {cat.sub_categories_count || 0} Sub-categories
                </div>

                {/* Title and slug pinned to image bottom */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-display text-lg font-bold drop-shadow-sm leading-tight">{cat.name}</h3>
                  <p className="text-[10px] text-zinc-300 font-mono">/category/{cat.slug}</p>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {cat.description || "No description provided for this literature department."}
                </p>

                {/* Subcategories preview tags */}
                {cat.subCategories && cat.subCategories.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Sub-categories:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cat.subCategories.slice(0, 3).map((sub) => (
                        <span
                          key={sub.id}
                          className="px-2 py-0.5 rounded-md bg-secondary/80 text-foreground text-[10px] font-medium"
                        >
                          {sub.name}
                        </span>
                      ))}
                      {cat.subCategories.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-secondary text-muted-foreground text-[10px]">
                          +{cat.subCategories.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Bar */}
                <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 text-xs gap-1 text-primary hover:bg-primary/10"
                      onClick={() => {
                        if (onOpenAddSubCategory) {
                          onOpenAddSubCategory(cat);
                        } else if (onNavigateToSubCategories) {
                          onNavigateToSubCategories(cat.id);
                        }
                      }}
                    >
                      <Plus className="h-3 w-3" />
                      Add Sub
                    </Button>
                    {onNavigateToSubCategories && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-[11px] text-muted-foreground hover:text-foreground"
                        onClick={() => onNavigateToSubCategories(cat.id)}
                      >
                        View Subs <ArrowRight className="h-3 w-3 ml-0.5" />
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(cat)}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      title="Edit Category"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setDeletingCategory(cat)}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT CATEGORY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSave}
            className="bg-card border border-border rounded-xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-xs animate-in zoom-in-95 my-8"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-display text-xl font-bold text-primary">
                  {editingCategory ? "Edit Category" : "Create Dynamic Category"}
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Specify category name, curated cover image, and description.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Category Name */}
            <div>
              <label className="font-bold text-foreground block mb-1">Category Name *</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Graphic Novels & Manga"
                className="w-full h-9 rounded-md border border-border bg-background px-3 text-xs outline-none focus:border-primary"
              />
              {name && (
                <p className="text-[10px] text-muted-foreground mt-1">
                  URL slug will be: <code className="font-mono text-primary font-bold">/category/{name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}</code>
                </p>
              )}
            </div>

            {/* Image URL & Preview */}
            <div className="space-y-2">
              <label className="font-bold text-foreground block">Category Cover Image *</label>
              
              <div className="flex gap-2">
                <input
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Paste image URL or choose preset/upload..."
                  className="flex-1 h-9 rounded-md border border-border bg-background px-3 text-xs outline-none focus:border-primary"
                />
                <label className="h-9 px-3 rounded-md border border-border bg-secondary/70 hover:bg-secondary cursor-pointer flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageFileUpload}
                  />
                </label>
              </div>

              {/* Quick Image Presets */}
              <div className="pt-1">
                <span className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1 mb-1.5">
                  <Sparkles className="h-3 w-3 text-gold" /> Quick Presets (Click to apply):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_IMAGES.map((preset) => (
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

              {/* Live Preview Card */}
              {image && (
                <div className="mt-2 rounded-lg border border-border overflow-hidden bg-muted relative h-28 flex items-end p-3">
                  <img
                    src={image}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="relative z-10 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold">Live Preview</span>
                    <p className="font-display font-bold text-sm leading-tight">{name || "Category Title"}</p>
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
                placeholder="A short overview of the books and themes featured in this category..."
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
                    name="status"
                    checked={status === "active"}
                    onChange={() => setStatus("active")}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="font-semibold text-foreground">Active (Visible in Store)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    checked={status === "inactive"}
                    onChange={() => setStatus("inactive")}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="font-semibold text-muted-foreground">Inactive (Hidden)</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-3 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : editingCategory ? "Update Category" : "Create Category"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingCategory && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-destructive/30 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-destructive">
              <div className="p-2 rounded-full bg-destructive/10">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">Delete Category?</h3>
                <p className="text-[11px] text-muted-foreground">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-foreground leading-relaxed">
              Are you sure you want to delete <strong className="text-primary">"{deletingCategory.name}"</strong>?
              {deletingCategory.sub_categories_count ? (
                <span className="block mt-2 font-bold text-destructive">
                  ⚠️ This category contains {deletingCategory.sub_categories_count} sub-categories which will also be deleted.
                </span>
              ) : null}
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDeletingCategory(null)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
              >
                Yes, Delete Category
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
