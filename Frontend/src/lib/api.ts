import { books as fallbackBooks, type Book } from "./books";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export type OrderItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

export type CreateOrderPayload = {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  city?: string;
  pincode?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee?: number;
  paymentMethod?: string;
  orderNotes?: string;
};

export type OrderData = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  city?: string;
  pincode?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  status: "pending" | "confirmed" | "dispatched" | "delivered" | "cancelled";
  orderNotes?: string;
  createdAt?: string;
  whatsappUrl?: string;
};

export type Review = {
  id: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
};

export type BookDetail = Book & {
  reviews?: Review[];
};

export const api = {
  // Fetch all books with optional filters
  async getBooks(params?: { category?: string; search?: string; sort?: string }): Promise<Book[]> {
    try {
      const url = new URL(`${API_BASE}/books`);
      if (params?.category && params.category !== "All") {
        url.searchParams.set("category", params.category);
      }
      if (params?.search) {
        url.searchParams.set("search", params.search);
      }
      if (params?.sort) {
        url.searchParams.set("sort", params.sort);
      }

      const res = await fetch(url.toString(), { signal: AbortSignal.timeout(3500) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn("Backend API not reachable, using local catalog:", err);
      // Fallback filtering
      let result = [...fallbackBooks];
      if (params?.category && params.category !== "All") {
        result = result.filter(b => b.category === params.category);
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        result = result.filter(b => `${b.title} ${b.author}`.toLowerCase().includes(q));
      }
      if (params?.sort === "low") {
        result.sort((a, b) => a.price - b.price);
      } else if (params?.sort === "high") {
        result.sort((a, b) => b.price - a.price);
      } else if (params?.sort === "rating") {
        result.sort((a, b) => b.rating - a.rating);
      }
      return result;
    }
  },

  // Fetch single book details with reviews
  async getBook(id: number): Promise<BookDetail | null> {
    try {
      const res = await fetch(`${API_BASE}/books/${id}`, { signal: AbortSignal.timeout(3500) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn("Error fetching book details from API:", err);
      const found = fallbackBooks.find(b => b.id === id);
      return found ? { ...found, reviews: [] } : null;
    }
  },

  // Add review for a book
  async addReview(bookId: number, review: { userName: string; rating: number; comment: string }) {
    const res = await fetch(`${API_BASE}/books/${bookId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to submit review");
    return data;
  },

  // Place order
  async createOrder(payload: CreateOrderPayload): Promise<{ orderId: string; whatsappUrl: string; total: number }> {
    const res = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create order");
    return data.data;
  },

  // Track order by tracking ID
  async trackOrder(orderId: string): Promise<OrderData> {
    const res = await fetch(`${API_BASE}/orders/${encodeURIComponent(orderId)}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Order not found");
    return data.data;
  },

  // Admin: Get all orders
  async getAllOrders(): Promise<OrderData[]> {
    const res = await fetch(`${API_BASE}/orders`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch orders");
    return data.data;
  },

  // Admin: Update order status
  async updateOrderStatus(orderId: string, status: string) {
    const res = await fetch(`${API_BASE}/orders/${encodeURIComponent(orderId)}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update order status");
    return data;
  },

  // Admin: Add new book
  async createBook(book: Partial<Book> & { title: string; author: string; category: string; price: number }) {
    const res = await fetch(`${API_BASE}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create book");
    return data.data;
  },

  // Admin: Delete book
  async deleteBook(id: number | string) {
    const res = await fetch(`${API_BASE}/books/${id}`, {
      method: "DELETE"
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete book");
    return data;
  },

  // Contact form submission
  async sendContactMessage(payload: { name: string; email?: string; phone?: string; message: string }) {
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to send message");
    return data;
  },

  // Admin: Get contact messages
  async getContacts() {
    const res = await fetch(`${API_BASE}/contact`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch contact inquiries");
    return data.data || [];
  },

  // Newsletter subscription
  async subscribeNewsletter(email: string) {
    const res = await fetch(`${API_BASE}/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to subscribe");
    return data;
  },

  // Store information
  async getStoreInfo() {
    try {
      const res = await fetch(`${API_BASE}/store/info`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch {
      return null;
    }
  },

  // Categories CRUD
  async getCategories(params?: { status?: string; search?: string }): Promise<Category[]> {
    try {
      const url = new URL(`${API_BASE}/categories`);
      if (params?.status && params.status !== "all") url.searchParams.set("status", params.status);
      if (params?.search) url.searchParams.set("search", params.search);
      const res = await fetch(url.toString(), { signal: AbortSignal.timeout(4000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      console.error("Error fetching categories:", err);
      return [];
    }
  },

  async createCategory(payload: { name: string; description?: string; image?: string; status?: string }): Promise<Category> {
    const res = await fetch(`${API_BASE}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create category");
    return data.data;
  },

  async updateCategory(id: number, payload: Partial<Category>): Promise<Category> {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update category");
    return data.data;
  },

  async deleteCategory(id: number): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/categories/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete category");
    return data;
  },

  // Sub-Categories CRUD
  async getSubCategories(params?: { category_id?: number | string; status?: string; search?: string }): Promise<SubCategory[]> {
    try {
      const url = new URL(`${API_BASE}/subcategories`);
      if (params?.category_id && params.category_id !== "all") url.searchParams.set("category_id", String(params.category_id));
      if (params?.status && params.status !== "all") url.searchParams.set("status", params.status);
      if (params?.search) url.searchParams.set("search", params.search);
      const res = await fetch(url.toString(), { signal: AbortSignal.timeout(4000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      console.error("Error fetching subcategories:", err);
      return [];
    }
  },

  async createSubCategory(payload: { category_id: number; name: string; description?: string; image?: string; status?: string }): Promise<SubCategory> {
    const res = await fetch(`${API_BASE}/subcategories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create sub-category");
    return data.data;
  },

  async updateSubCategory(id: number, payload: Partial<SubCategory>): Promise<SubCategory> {
    const res = await fetch(`${API_BASE}/subcategories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update sub-category");
    return data.data;
  },

  async deleteSubCategory(id: number): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/subcategories/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete sub-category");
    return data;
  }
};

export type SubCategory = {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  status: "active" | "inactive";
  created_at?: string;
  category_name?: string;
  category_slug?: string;
  category_image?: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  status: "active" | "inactive";
  created_at?: string;
  sub_categories_count?: number;
  books_count?: number;
  subCategories?: SubCategory[];
};

