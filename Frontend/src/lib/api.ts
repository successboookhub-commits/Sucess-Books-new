import { books as fallbackBooks, type Book } from "./books";

function getApiUrl(path: string): URL {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (typeof window !== "undefined") {
    return new URL(cleanPath, window.location.origin);
  }
  const base = (typeof process !== "undefined" && process.env?.INTERNAL_API_URL)
    ? process.env.INTERNAL_API_URL
    : `http://127.0.0.1:${(typeof process !== "undefined" && process.env?.PORT) ? process.env.PORT : 5000}`;
  return new URL(cleanPath, base);
}

function getApiEndpoint(path: string): string {
  return getApiUrl(path).toString();
}

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
  async getBooks(params?: { category?: string; subCategory?: string; sub_category?: string; search?: string; sort?: string; featured?: boolean }): Promise<Book[]> {
    try {
      const url = getApiUrl("/api/books");
      if (params?.category && params.category !== "All") {
        url.searchParams.set("category", params.category);
      }
      const subCat = params?.subCategory || params?.sub_category;
      if (subCat && subCat !== "All") {
        url.searchParams.set("subCategory", subCat);
      }
      if (params?.search) {
        url.searchParams.set("search", params.search);
      }
      if (params?.sort) {
        url.searchParams.set("sort", params.sort);
      }
      if (params?.featured) {
        url.searchParams.set("featured", "true");
      }

      const res = await fetch(url.toString(), { signal: AbortSignal.timeout(4000) });
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
      const subCat = params?.subCategory || params?.sub_category;
      if (subCat && subCat !== "All") {
        result = result.filter(b => (b.subCategory === subCat || b.sub_category === subCat));
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        result = result.filter(b => `${b.title} ${b.author} ${b.category}`.toLowerCase().includes(q));
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
      const res = await fetch(getApiEndpoint(`/api/books/${id}`), { signal: AbortSignal.timeout(4000) });
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
    const res = await fetch(getApiEndpoint(`/api/books/${bookId}/reviews`), {
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
    const res = await fetch(getApiEndpoint("/api/orders"), {
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
    const res = await fetch(getApiEndpoint(`/api/orders/${encodeURIComponent(orderId)}`));
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Order not found");
    return data.data;
  },

  // Admin: Get all orders
  async getAllOrders(): Promise<OrderData[]> {
    const res = await fetch(getApiEndpoint("/api/orders"));
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch orders");
    return data.data;
  },

  // Admin: Update order status
  async updateOrderStatus(orderId: string, status: string) {
    const res = await fetch(getApiEndpoint(`/api/orders/${encodeURIComponent(orderId)}/status`), {
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
    const res = await fetch(getApiEndpoint("/api/books"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create book");
    return data.data;
  },

  // Admin: Update book
  async updateBook(id: number | string, book: Partial<Book>) {
    const res = await fetch(getApiEndpoint(`/api/books/${id}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update book");
    return data.data;
  },

  // Admin: Delete book
  async deleteBook(id: number | string) {
    const res = await fetch(getApiEndpoint(`/api/books/${id}`), {
      method: "DELETE"
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete book");
    return data;
  },

  // Contact form submission
  async sendContactMessage(payload: { name: string; email?: string; phone?: string; message: string }) {
    const res = await fetch(getApiEndpoint("/api/contact"), {
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
    const res = await fetch(getApiEndpoint("/api/contact"));
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch contact inquiries");
    return data.data || [];
  },

  // Newsletter subscription
  async subscribeNewsletter(email: string) {
    const res = await fetch(getApiEndpoint("/api/newsletter"), {
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
      const res = await fetch(getApiEndpoint("/api/store/info"), { signal: AbortSignal.timeout(3000) });
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
      const url = getApiUrl("/api/categories");
      if (params?.status && params.status !== "all") url.searchParams.set("status", params.status);
      if (params?.search) url.searchParams.set("search", params.search);
      const res = await fetch(url.toString(), { signal: AbortSignal.timeout(8000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
      if (list.length > 0) return list;
      return fallbackCategoryList;
    } catch (err) {
      console.warn("Using fallback categories due to fetch error/timeout:", err);
      return fallbackCategoryList;
    }
  },

  async createCategory(payload: { name: string; description?: string; image?: string; status?: string }): Promise<Category> {
    const res = await fetch(getApiEndpoint("/api/categories"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create category");
    return data.data;
  },

  async updateCategory(id: number, payload: Partial<Category>): Promise<Category> {
    const res = await fetch(getApiEndpoint(`/api/categories/${id}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update category");
    return data.data;
  },

  async deleteCategory(id: number): Promise<{ success: boolean; message: string }> {
    const res = await fetch(getApiEndpoint(`/api/categories/${id}`), { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete category");
    return data;
  },

  // Sub-Categories CRUD
  async getSubCategories(params?: { category_id?: number | string; status?: string; search?: string }): Promise<SubCategory[]> {
    try {
      const url = getApiUrl("/api/subcategories");
      if (params?.category_id && params.category_id !== "all") url.searchParams.set("category_id", String(params.category_id));
      if (params?.status && params.status !== "all") url.searchParams.set("status", params.status);
      if (params?.search) url.searchParams.set("search", params.search);
      const res = await fetch(url.toString(), { signal: AbortSignal.timeout(8000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
      return [];
    }
  },

  async createSubCategory(payload: { category_id: number; name: string; description?: string; image?: string; status?: string }): Promise<SubCategory> {
    const res = await fetch(getApiEndpoint("/api/subcategories"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create sub-category");
    return data.data;
  },

  async updateSubCategory(id: number, payload: Partial<SubCategory>): Promise<SubCategory> {
    const res = await fetch(getApiEndpoint(`/api/subcategories/${id}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update sub-category");
    return data.data;
  },

  async deleteSubCategory(id: number): Promise<{ success: boolean; message: string }> {
    const res = await fetch(getApiEndpoint(`/api/subcategories/${id}`), { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete sub-category");
    return data;
  },

  // Admin Authentication
  async sendAdminOtp(email: string): Promise<{ success: boolean; message: string; email?: string }> {
    const res = await fetch(getApiEndpoint("/api/auth/send-otp"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to send OTP email");
    return data;
  },

  async verifyAdminOtp(email: string, otp: string): Promise<{ success: boolean; token: string; user: { email: string; role: string; name: string }; message?: string }> {
    const res = await fetch(getApiEndpoint("/api/auth/verify-otp"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "OTP verification failed");
    return data;
  },

  async getAdminMe(token: string) {
    const res = await fetch(getApiEndpoint("/api/auth/me"), {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Session invalid");
    return data;
  },

  async adminLogout() {
    try {
      await fetch(getApiEndpoint("/api/auth/logout"), { method: "POST" });
    } catch {
      // ignore network error
    }
  },

  // Customer / User Authentication (Email & Password + OTP)
  async registerUser(payload: { name: string; phone: string; email: string; password: string; confirmPassword?: string }): Promise<{ success: boolean; token: string; user: UserProfile; message?: string }> {
    const res = await fetch(getApiEndpoint("/api/user/auth/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    return data;
  },

  async loginUser(payload: { email: string; password: string }): Promise<{ success: boolean; token: string; user: UserProfile; message?: string }> {
    const res = await fetch(getApiEndpoint("/api/user/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Invalid credentials");
    return data;
  },

  async changeUserPassword(token: string, payload: { currentPassword?: string | undefined; newPassword: string; confirmPassword?: string | undefined }): Promise<{ success: boolean; message: string }> {
    const res = await fetch(getApiEndpoint("/api/user/auth/change-password"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to change password");
    return data;
  },

  async sendUserOtp(email: string): Promise<{ success: boolean; message: string; email?: string; isExistingUser?: boolean }> {
    const res = await fetch(getApiEndpoint("/api/user/auth/send-otp"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to send verification email");
    return data;
  },

  async verifyUserOtp(email: string, otp: string, name?: string, phone?: string): Promise<{ success: boolean; token: string; user: UserProfile; message?: string }> {
    const res = await fetch(getApiEndpoint("/api/user/auth/verify-otp"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, name, phone })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "OTP verification failed");
    return data;
  },

  async getUserProfile(token: string): Promise<{ success: boolean; user: UserProfile }> {
    const res = await fetch(getApiEndpoint("/api/user/auth/profile"), {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Session invalid");
    return data;
  },

  async updateUserProfile(token: string, profileData: { name?: string; phone?: string; avatar?: string }): Promise<{ success: boolean; user: UserProfile; message?: string }> {
    const res = await fetch(getApiEndpoint("/api/user/auth/profile"), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update profile");
    return data;
  },

  // Persistent Database Cart Operations
  async getCart(token: string) {
    const res = await fetch(getApiEndpoint("/api/cart"), {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to load cart");
    return data;
  },

  async addToDbCart(token: string, bookId: number, quantity: number = 1) {
    const res = await fetch(getApiEndpoint("/api/cart"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ bookId, quantity })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to add to cart");
    return data;
  },

  async updateDbCartItem(token: string, bookId: number, quantity: number) {
    const res = await fetch(getApiEndpoint(`/api/cart/${bookId}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ quantity })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update cart");
    return data;
  },

  async removeFromDbCart(token: string, bookId: number) {
    const res = await fetch(getApiEndpoint(`/api/cart/${bookId}`), {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to remove item from cart");
    return data;
  },

  async clearDbCart(token: string) {
    const res = await fetch(getApiEndpoint("/api/cart"), {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to clear cart");
    return data;
  },

  async mergeGuestCart(token: string, items: Array<{ id: number; quantity: number }>) {
    const res = await fetch(getApiEndpoint("/api/cart/merge"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ items })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to merge cart");
    return data;
  },

  // Customer Order Cancellation (Restores inventory stock)
  async cancelOrder(token: string, orderId: string): Promise<{ success: boolean; message: string; orderId: string }> {
    const res = await fetch(getApiEndpoint(`/api/orders/${orderId}/cancel`), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to cancel order");
    return data;
  },

  // Multiple User Addresses Management
  async getUserAddresses(token: string): Promise<UserAddress[]> {
    const res = await fetch(getApiEndpoint("/api/user/addresses"), {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to load addresses");
    return data.data || [];
  },

  async addUserAddress(token: string, addressData: AddressInput): Promise<UserAddress> {
    const res = await fetch(getApiEndpoint("/api/user/addresses"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(addressData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to save address");
    return data.data;
  },

  async updateUserAddress(token: string, id: number, addressData: AddressInput): Promise<UserAddress> {
    const res = await fetch(getApiEndpoint(`/api/user/addresses/${id}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(addressData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update address");
    return data.data;
  },

  async deleteUserAddress(token: string, id: number): Promise<{ success: boolean; message: string }> {
    const res = await fetch(getApiEndpoint(`/api/user/addresses/${id}`), {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete address");
    return data;
  },

  async setDefaultUserAddress(token: string, id: number): Promise<{ success: boolean; message: string }> {
    const res = await fetch(getApiEndpoint(`/api/user/addresses/${id}/default`), {
      method: "PATCH",
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to set default address");
    return data;
  },

  // Wishlist API
  async getWishlist(token: string): Promise<{ data: Book[]; bookIds: number[]; count: number }> {
    const res = await fetch(getApiEndpoint("/api/wishlist"), {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch wishlist");
    return data;
  },

  async toggleWishlist(token: string, bookId: number): Promise<{ success: boolean; isWishlisted: boolean; message: string }> {
    const res = await fetch(getApiEndpoint("/api/wishlist/toggle"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ bookId })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update wishlist");
    return data;
  },

  // Customer Orders & Invoice
  async getMyOrders(token: string): Promise<OrderData[]> {
    const res = await fetch(getApiEndpoint("/api/orders/my-orders"), {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to load orders");
    return data.data || [];
  },

  async getOrderInvoice(orderId: string): Promise<TaxInvoiceData> {
    const res = await fetch(getApiEndpoint(`/api/orders/${orderId}/invoice`));
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to generate invoice");
    return data.data;
  },

  // Admin Management Endpoints
  async getAllCustomers(): Promise<any[]> {
    try {
      const res = await fetch(getApiEndpoint("/api/auth/all-customers"));
      const data = await res.json();
      return data.data || [];
    } catch {
      return [];
    }
  },

  async getAllCustomerAddresses(): Promise<any[]> {
    try {
      const res = await fetch(getApiEndpoint("/api/auth/all-addresses"));
      const data = await res.json();
      return data.data || [];
    } catch {
      return [];
    }
  },

  async getAllReviews(): Promise<any[]> {
    try {
      const res = await fetch(getApiEndpoint("/api/auth/all-reviews"));
      const data = await res.json();
      return data.data || [];
    } catch {
      return [];
    }
  },

  async deleteReview(reviewId: number): Promise<{ success: boolean; message: string }> {
    const res = await fetch(getApiEndpoint(`/api/auth/reviews/${reviewId}`), { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete review");
    return data;
  },

  async getDashboardStats(): Promise<any> {
    try {
      const res = await fetch(getApiEndpoint("/api/auth/dashboard-stats"));
      const data = await res.json();
      return data.stats || null;
    } catch {
      return null;
    }
  },

  async updateBookStock(bookId: number, stock: number): Promise<{ success: boolean; stock: number }> {
    const res = await fetch(getApiEndpoint(`/api/books/${bookId}/stock`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update stock");
    return data;
  },

  // Customer status update (active / blocked)
  async updateCustomerStatus(customerId: number, status: "active" | "blocked"): Promise<{ success: boolean; message: string }> {
    const res = await fetch(getApiEndpoint(`/api/auth/customers/${customerId}/status`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update customer status");
    return data;
  },

  // Coupons CRUD
  async getCoupons(): Promise<Coupon[]> {
    try {
      const res = await fetch(getApiEndpoint("/api/coupons"));
      const data = await res.json();
      return data.data || [];
    } catch {
      return [];
    }
  },

  async createCoupon(payload: {
    code: string;
    discountType?: "percentage" | "flat" | undefined;
    discountValue: number;
    minOrder?: number | undefined;
    maxDiscount?: number | undefined;
    status?: "active" | "inactive" | undefined;
  }): Promise<Coupon> {
    const res = await fetch(getApiEndpoint("/api/coupons"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create coupon");
    return data.data;
  },

  async updateCoupon(id: number, payload: Partial<Coupon>): Promise<Coupon> {
    const res = await fetch(getApiEndpoint(`/api/coupons/${id}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update coupon");
    return data.data;
  },

  async deleteCoupon(id: number): Promise<{ success: boolean; message: string }> {
    const res = await fetch(getApiEndpoint(`/api/coupons/${id}`), { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete coupon");
    return data;
  },

  async validateCoupon(code: string, orderAmount: number): Promise<{ success: boolean; discountAmount: number; finalTotal: number; coupon: Coupon; message: string }> {
    const res = await fetch(getApiEndpoint("/api/coupons/validate"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, orderAmount })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Invalid coupon code");
    return data;
  },

  // Settings API
  async getSettings(): Promise<StoreSettings> {
    try {
      const res = await fetch(getApiEndpoint("/api/settings"));
      const data = await res.json();
      return data.data || {};
    } catch {
      return {};
    }
  },

  async updateSettings(settings: Record<string, string>): Promise<{ success: boolean; message: string; data: StoreSettings }> {
    const res = await fetch(getApiEndpoint("/api/settings"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update settings");
    return data;
  },

  // Content Blocks CRUD (hero-banners, promo-banners, testimonials, blogs)
  async getContentBlocks(type?: string): Promise<ContentBlock[]> {
    try {
      const url = getApiUrl("/api/content");
      if (type) url.searchParams.set("type", type);
      const res = await fetch(url.toString());
      const data = await res.json();
      return data.data || [];
    } catch {
      return [];
    }
  },

  async createContentBlock(payload: Partial<ContentBlock>): Promise<ContentBlock> {
    const res = await fetch(getApiEndpoint("/api/content"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create content block");
    return data.data;
  },

  async updateContentBlock(id: number, payload: Partial<ContentBlock>): Promise<ContentBlock> {
    const res = await fetch(getApiEndpoint(`/api/content/${id}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update content block");
    return data.data;
  },

  async deleteContentBlock(id: number): Promise<{ success: boolean; message: string }> {
    const res = await fetch(getApiEndpoint(`/api/content/${id}`), { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete content block");
    return data;
  }
};

export type Coupon = {
  id: number;
  code: string;
  discountType: "percentage" | "flat";
  discount_type?: "percentage" | "flat" | undefined;
  discountValue: number;
  discount_value?: number | undefined;
  minOrder: number;
  min_order?: number | undefined;
  maxDiscount?: number | undefined;
  max_discount?: number | undefined;
  status: "active" | "inactive";
  usageCount: number;
  usage_count?: number | undefined;
  createdAt?: string | undefined;
  created_at?: string | undefined;
};

export type StoreSettings = {
  store_name?: string;
  store_tagline?: string;
  store_email?: string;
  store_phone?: string;
  whatsapp_number?: string;
  free_delivery_min?: string;
  standard_delivery_fee?: string;
  store_gstin?: string;
  store_address?: string;
  store_hours?: string;
  announcement?: string;
  [key: string]: string | undefined;
};

export type ContentBlock = {
  id: number;
  type: "hero-banners" | "promo-banners" | "testimonials" | "blogs" | string;
  title: string;
  subtitle?: string | undefined;
  image?: string | undefined;
  linkUrl?: string | undefined;
  link_url?: string | undefined;
  content?: string | undefined;
  status: "active" | "inactive";
  displayOrder: number;
  display_order?: number | undefined;
  createdAt?: string | undefined;
  created_at?: string | undefined;
};

export type UserProfile = {
  id: number;
  email: string;
  name: string;
  phone: string;
  avatar?: string;
  role?: string;
  created_at?: string;
  stats?: {
    ordersCount: number;
    wishlistCount: number;
    addressesCount: number;
  };
};

export type UserAddress = {
  id: number;
  fullName: string;
  phone: string;
  alternatePhone?: string;
  pincode: string;
  flatHouse: string;
  areaStreet: string;
  landmark?: string;
  city: string;
  state: string;
  addressType: "Home" | "Work" | "Other";
  isDefault: boolean;
  formattedAddress?: string;
  createdAt?: string;
};

export type AddressInput = {
  fullName: string;
  phone: string;
  alternatePhone?: string | undefined;
  pincode: string;
  flatHouse: string;
  areaStreet: string;
  landmark?: string | undefined;
  city: string;
  state?: string | undefined;
  addressType?: "Home" | "Work" | "Other" | undefined;
  isDefault?: boolean | undefined;
};

export type TaxInvoiceData = {
  invoiceNo: string;
  orderId: string;
  orderDate: string;
  invoiceDate: string;
  status: string;
  paymentMethod: string;
  seller: {
    name: string;
    tagline: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    gstin: string;
    pan: string;
    email: string;
    phone: string;
    website: string;
  };
  buyer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    addressType: string;
  };
  items: {
    srNo: number;
    id: number;
    title: string;
    author: string;
    hsn: string;
    quantity: number;
    mrp: number;
    unitPrice: number;
    discount: number;
    total: number;
  }[];
  pricing: {
    mrpTotal: number;
    discountTotal: number;
    subtotal: number;
    taxableAmount: number;
    cgst: number;
    sgst: number;
    deliveryFee: number;
    total: number;
    totalInWords: string;
  };
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

export const fallbackCategoryList: Category[] = [
  { id: 1, name: "Classics", slug: "classics", description: "Timeless masterworks of literature.", image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800&auto=format&fit=crop", status: "active" },
  { id: 2, name: "Self Help", slug: "self-help", description: "Personal growth and productivity.", image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop", status: "active" },
  { id: 3, name: "Science & Nature", slug: "science-nature", description: "Cosmology and natural sciences.", image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=800&auto=format&fit=crop", status: "active" },
  { id: 4, name: "Poetry & Letters", slug: "poetry-letters", description: "Poetry collections and correspondence.", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop", status: "active" },
  { id: 5, name: "Children & YA", slug: "children-ya", description: "Stories for young readers.", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop", status: "active" },
  { id: 6, name: "Philosophy", slug: "philosophy", description: "Philosophical treaties and wisdom.", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop", status: "active" },
  { id: 7, name: "Fiction", slug: "fiction", description: "Novels and contemporary fiction.", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop", status: "active" }
];

