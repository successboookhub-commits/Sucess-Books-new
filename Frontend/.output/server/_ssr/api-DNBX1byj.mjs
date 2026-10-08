import { r as books } from "./books-L-o23q6K.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-DNBX1byj.js
function getApiUrl(path) {
	const cleanPath = path.startsWith("/") ? path : `/${path}`;
	if (typeof window !== "undefined") return new URL(cleanPath, window.location.origin);
	const base = typeof process !== "undefined" && process.env?.INTERNAL_API_URL ? process.env.INTERNAL_API_URL : `http://127.0.0.1:${typeof process !== "undefined" && process.env?.PORT ? process.env.PORT : 5e3}`;
	return new URL(cleanPath, base);
}
function getApiEndpoint(path) {
	return getApiUrl(path).toString();
}
var api = {
	async getBooks(params) {
		try {
			const url = getApiUrl("/api/books");
			if (params?.category && params.category !== "All") url.searchParams.set("category", params.category);
			const subCat = params?.subCategory || params?.sub_category;
			if (subCat && subCat !== "All") url.searchParams.set("subCategory", subCat);
			if (params?.search) url.searchParams.set("search", params.search);
			if (params?.sort) url.searchParams.set("sort", params.sort);
			if (params?.featured) url.searchParams.set("featured", "true");
			const res = await fetch(url.toString(), { signal: AbortSignal.timeout(4e3) });
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			return (await res.json()).data;
		} catch (err) {
			console.warn("Backend API not reachable, using local catalog:", err);
			let result = [...books];
			if (params?.category && params.category !== "All") result = result.filter((b) => b.category === params.category);
			const subCat = params?.subCategory || params?.sub_category;
			if (subCat && subCat !== "All") result = result.filter((b) => b.subCategory === subCat || b.sub_category === subCat);
			if (params?.search) {
				const q = params.search.toLowerCase();
				result = result.filter((b) => `${b.title} ${b.author} ${b.category}`.toLowerCase().includes(q));
			}
			if (params?.sort === "low") result.sort((a, b) => a.price - b.price);
			else if (params?.sort === "high") result.sort((a, b) => b.price - a.price);
			else if (params?.sort === "rating") result.sort((a, b) => b.rating - a.rating);
			return result;
		}
	},
	async getBook(id) {
		try {
			const res = await fetch(getApiEndpoint(`/api/books/${id}`), { signal: AbortSignal.timeout(4e3) });
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			return (await res.json()).data;
		} catch (err) {
			console.warn("Error fetching book details from API:", err);
			const found = books.find((b) => b.id === id);
			return found ? {
				...found,
				reviews: []
			} : null;
		}
	},
	async addReview(bookId, review) {
		const res = await fetch(getApiEndpoint(`/api/books/${bookId}/reviews`), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(review)
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to submit review");
		return data;
	},
	async createOrder(payload) {
		const res = await fetch(getApiEndpoint("/api/orders"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to create order");
		return data.data;
	},
	async trackOrder(orderId) {
		const res = await fetch(getApiEndpoint(`/api/orders/${encodeURIComponent(orderId)}`));
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Order not found");
		return data.data;
	},
	async getAllOrders() {
		const res = await fetch(getApiEndpoint("/api/orders"));
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to fetch orders");
		return data.data;
	},
	async updateOrderStatus(orderId, status) {
		const res = await fetch(getApiEndpoint(`/api/orders/${encodeURIComponent(orderId)}/status`), {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ status })
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to update order status");
		return data;
	},
	async createBook(book) {
		const res = await fetch(getApiEndpoint("/api/books"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(book)
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to create book");
		return data.data;
	},
	async updateBook(id, book) {
		const res = await fetch(getApiEndpoint(`/api/books/${id}`), {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(book)
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to update book");
		return data.data;
	},
	async deleteBook(id) {
		const res = await fetch(getApiEndpoint(`/api/books/${id}`), { method: "DELETE" });
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to delete book");
		return data;
	},
	async sendContactMessage(payload) {
		const res = await fetch(getApiEndpoint("/api/contact"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to send message");
		return data;
	},
	async getContacts() {
		const res = await fetch(getApiEndpoint("/api/contact"));
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to fetch contact inquiries");
		return data.data || [];
	},
	async subscribeNewsletter(email) {
		const res = await fetch(getApiEndpoint("/api/newsletter"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email })
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to subscribe");
		return data;
	},
	async getStoreInfo() {
		try {
			const res = await fetch(getApiEndpoint("/api/store/info"), { signal: AbortSignal.timeout(3e3) });
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			return (await res.json()).data;
		} catch {
			return null;
		}
	},
	async getCategories(params) {
		try {
			const url = getApiUrl("/api/categories");
			if (params?.status && params.status !== "all") url.searchParams.set("status", params.status);
			if (params?.search) url.searchParams.set("search", params.search);
			const res = await fetch(url.toString(), { signal: AbortSignal.timeout(4e3) });
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			return (await res.json()).data || [];
		} catch (err) {
			console.error("Error fetching categories:", err);
			return [];
		}
	},
	async createCategory(payload) {
		const res = await fetch(getApiEndpoint("/api/categories"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to create category");
		return data.data;
	},
	async updateCategory(id, payload) {
		const res = await fetch(getApiEndpoint(`/api/categories/${id}`), {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to update category");
		return data.data;
	},
	async deleteCategory(id) {
		const res = await fetch(getApiEndpoint(`/api/categories/${id}`), { method: "DELETE" });
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to delete category");
		return data;
	},
	async getSubCategories(params) {
		try {
			const url = getApiUrl("/api/subcategories");
			if (params?.category_id && params.category_id !== "all") url.searchParams.set("category_id", String(params.category_id));
			if (params?.status && params.status !== "all") url.searchParams.set("status", params.status);
			if (params?.search) url.searchParams.set("search", params.search);
			const res = await fetch(url.toString(), { signal: AbortSignal.timeout(4e3) });
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			return (await res.json()).data || [];
		} catch (err) {
			console.error("Error fetching subcategories:", err);
			return [];
		}
	},
	async createSubCategory(payload) {
		const res = await fetch(getApiEndpoint("/api/subcategories"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to create sub-category");
		return data.data;
	},
	async updateSubCategory(id, payload) {
		const res = await fetch(getApiEndpoint(`/api/subcategories/${id}`), {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to update sub-category");
		return data.data;
	},
	async deleteSubCategory(id) {
		const res = await fetch(getApiEndpoint(`/api/subcategories/${id}`), { method: "DELETE" });
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to delete sub-category");
		return data;
	},
	async sendAdminOtp(email) {
		const res = await fetch(getApiEndpoint("/api/auth/send-otp"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email })
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to send OTP email");
		return data;
	},
	async verifyAdminOtp(email, otp) {
		const res = await fetch(getApiEndpoint("/api/auth/verify-otp"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email,
				otp
			})
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "OTP verification failed");
		return data;
	},
	async getAdminMe(token) {
		const res = await fetch(getApiEndpoint("/api/auth/me"), { headers: { "Authorization": `Bearer ${token}` } });
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Session invalid");
		return data;
	},
	async adminLogout() {
		try {
			await fetch(getApiEndpoint("/api/auth/logout"), { method: "POST" });
		} catch {}
	},
	async sendUserOtp(email) {
		const res = await fetch(getApiEndpoint("/api/user/auth/send-otp"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email })
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to send verification email");
		return data;
	},
	async verifyUserOtp(email, otp, name, phone) {
		const res = await fetch(getApiEndpoint("/api/user/auth/verify-otp"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email,
				otp,
				name,
				phone
			})
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "OTP verification failed");
		return data;
	},
	async getUserProfile(token) {
		const res = await fetch(getApiEndpoint("/api/user/auth/profile"), { headers: { "Authorization": `Bearer ${token}` } });
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Session invalid");
		return data;
	},
	async updateUserProfile(token, profileData) {
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
	async getUserAddresses(token) {
		const res = await fetch(getApiEndpoint("/api/user/addresses"), { headers: { "Authorization": `Bearer ${token}` } });
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to load addresses");
		return data.data || [];
	},
	async addUserAddress(token, addressData) {
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
	async updateUserAddress(token, id, addressData) {
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
	async deleteUserAddress(token, id) {
		const res = await fetch(getApiEndpoint(`/api/user/addresses/${id}`), {
			method: "DELETE",
			headers: { "Authorization": `Bearer ${token}` }
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to delete address");
		return data;
	},
	async setDefaultUserAddress(token, id) {
		const res = await fetch(getApiEndpoint(`/api/user/addresses/${id}/default`), {
			method: "PATCH",
			headers: { "Authorization": `Bearer ${token}` }
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to set default address");
		return data;
	},
	async getWishlist(token) {
		const res = await fetch(getApiEndpoint("/api/wishlist"), { headers: { "Authorization": `Bearer ${token}` } });
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to fetch wishlist");
		return data;
	},
	async toggleWishlist(token, bookId) {
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
	async getMyOrders(token) {
		const res = await fetch(getApiEndpoint("/api/orders/my-orders"), { headers: { "Authorization": `Bearer ${token}` } });
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to load orders");
		return data.data || [];
	},
	async getOrderInvoice(orderId) {
		const res = await fetch(getApiEndpoint(`/api/orders/${orderId}/invoice`));
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to generate invoice");
		return data.data;
	},
	async getAllCustomers() {
		try {
			return (await (await fetch(getApiEndpoint("/api/auth/all-customers"))).json()).data || [];
		} catch {
			return [];
		}
	},
	async getAllCustomerAddresses() {
		try {
			return (await (await fetch(getApiEndpoint("/api/auth/all-addresses"))).json()).data || [];
		} catch {
			return [];
		}
	},
	async getAllReviews() {
		try {
			return (await (await fetch(getApiEndpoint("/api/auth/all-reviews"))).json()).data || [];
		} catch {
			return [];
		}
	},
	async deleteReview(reviewId) {
		const res = await fetch(getApiEndpoint(`/api/auth/reviews/${reviewId}`), { method: "DELETE" });
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to delete review");
		return data;
	},
	async getDashboardStats() {
		try {
			return (await (await fetch(getApiEndpoint("/api/auth/dashboard-stats"))).json()).stats || null;
		} catch {
			return null;
		}
	},
	async updateBookStock(bookId, stock) {
		const res = await fetch(getApiEndpoint(`/api/books/${bookId}/stock`), {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ stock })
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to update stock");
		return data;
	}
};
//#endregion
export { api as t };
