import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime, r as Slot } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-C1OU8w0U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WHATSAPP_NUMBER = "919876543210";
var STORE = {
	name: "Success Book Hub",
	tagline: "Curated Books & Timeless Stories",
	phone: "+91 98765 43210",
	email: "hello@successbookhub.com",
	address: "42, College Street, Book District, Kolkata, West Bengal 700073, India",
	hours: "Mon – Sat, 10:00 AM – 8:30 PM"
};
var books = [
	{
		id: 1,
		title: "The Secret Garden",
		author: "Frances H. Burnett",
		category: "Classics",
		price: 349,
		oldPrice: 449,
		rating: 4.8,
		reviewsCount: 34,
		cover: "bg-primary",
		label: "Bestseller",
		description: "A timeless tale of Mary Lennox, an orphan girl sent to Yorkshire who uncovers a locked, forgotten walled garden and finds magic, friendship, and renewal.",
		stock: 35,
		featured: true
	},
	{
		id: 2,
		title: "Letters to a Young Poet",
		author: "Rainer Maria Rilke",
		category: "Poetry",
		price: 299,
		rating: 4.7,
		reviewsCount: 21,
		cover: "bg-maroon-soft",
		description: "Ten profound letters from Rilke offering timeless wisdom on loneliness, art, love, and living the questions rather than forcing immediate answers.",
		stock: 40,
		featured: true
	},
	{
		id: 3,
		title: "The Last Bookshop",
		author: "Madeline Martin",
		category: "Fiction",
		price: 429,
		oldPrice: 499,
		rating: 4.6,
		reviewsCount: 18,
		cover: "bg-gold",
		label: "New",
		description: "An unforgettable story set against wartime London, exploring resilience, hope, and the incredible sanctuary that books create during the darkest times.",
		stock: 28,
		featured: true
	},
	{
		id: 4,
		title: "A Brief History of Time",
		author: "Stephen Hawking",
		category: "Non-fiction",
		price: 499,
		rating: 4.9,
		reviewsCount: 52,
		cover: "bg-foreground",
		description: "Hawking's legendary exploration of black holes, the big bang, general relativity, and the nature of our universe written for curious minds.",
		stock: 22,
		featured: true
	},
	{
		id: 5,
		title: "Little Women",
		author: "Louisa May Alcott",
		category: "Classics",
		price: 379,
		rating: 4.8,
		reviewsCount: 40,
		cover: "bg-whatsapp",
		description: "Follow the beloved March sisters — Jo, Meg, Beth, and Amy — as they grow through love, ambition, heartache, and unbreakable sisterhood.",
		stock: 30,
		featured: true
	},
	{
		id: 6,
		title: "The Wild Robot",
		author: "Peter Brown",
		category: "Children",
		price: 329,
		oldPrice: 399,
		rating: 4.7,
		reviewsCount: 27,
		cover: "bg-maroon-soft",
		label: "Popular",
		description: "Roz the robot opens her eyes for the very first time and discovers she is alone on a wild island. A heartwarming adventure of survival and connection.",
		stock: 45,
		featured: true
	},
	{
		id: 7,
		title: "Ikigai",
		author: "Héctor García & Francesc Miralles",
		category: "Self-help",
		price: 399,
		rating: 4.6,
		reviewsCount: 65,
		cover: "bg-primary",
		description: "The Japanese secret to a long, purposeful and happy life. Discover your own intersection of passion, mission, vocation, and profession.",
		stock: 55,
		featured: true
	},
	{
		id: 8,
		title: "The Complete Poems",
		author: "Emily Dickinson",
		category: "Poetry",
		price: 449,
		rating: 4.9,
		reviewsCount: 19,
		cover: "bg-foreground",
		description: "All the breathtaking, enigmatic, and revolutionary verses of Emily Dickinson, gathered in a definitive collector edition.",
		stock: 18,
		featured: true
	},
	{
		id: 9,
		title: "The Name of the Wind",
		author: "Patrick Rothfuss",
		category: "Fiction",
		price: 549,
		oldPrice: 650,
		rating: 4.8,
		reviewsCount: 48,
		cover: "bg-maroon-soft",
		label: "Staff pick",
		description: "The thrilling tale of Kvothe, a magically gifted young man who grows to be the most notorious wizard his world has ever known.",
		stock: 25
	},
	{
		id: 10,
		title: "Pride and Prejudice",
		author: "Jane Austen",
		category: "Classics",
		price: 329,
		rating: 4.9,
		reviewsCount: 88,
		cover: "bg-gold",
		description: "Jane Austen's sparkling romantic masterpiece tracing the spirited Elizabeth Bennet and proud Mr. Darcy.",
		stock: 50
	},
	{
		id: 11,
		title: "Sapiens",
		author: "Yuval Noah Harari",
		category: "Non-fiction",
		price: 599,
		oldPrice: 699,
		rating: 4.7,
		reviewsCount: 92,
		cover: "bg-primary",
		label: "Bestseller",
		description: "A narrative journey through the history of humankind: how an insignificant ape became the ruler of planet Earth.",
		stock: 40
	},
	{
		id: 12,
		title: "The Gruffalo",
		author: "Julia Donaldson",
		category: "Children",
		price: 279,
		rating: 4.8,
		reviewsCount: 31,
		cover: "bg-whatsapp",
		description: "Walk further into the deep dark wood and find what happens when a quick-thinking mouse comes face to face with an owl, snake, and a Gruffalo!",
		stock: 35
	},
	{
		id: 13,
		title: "Atomic Habits",
		author: "James Clear",
		category: "Self-help",
		price: 459,
		oldPrice: 550,
		rating: 4.8,
		reviewsCount: 110,
		cover: "bg-foreground",
		label: "Popular",
		description: "An easy and proven way to build good habits and break bad ones. Small changes that deliver remarkable results.",
		stock: 60
	},
	{
		id: 14,
		title: "Milk and Honey",
		author: "Rupi Kaur",
		category: "Poetry",
		price: 349,
		rating: 4.5,
		reviewsCount: 24,
		cover: "bg-gold",
		description: "A collection of poetry and prose about survival, the experience of violence, abuse, love, loss, and femininity.",
		stock: 30
	},
	{
		id: 15,
		title: "The Midnight Library",
		author: "Matt Haig",
		category: "Fiction",
		price: 399,
		rating: 4.6,
		reviewsCount: 42,
		cover: "bg-primary",
		description: "Between life and death there is a library where every book offers a chance to try other lives you could have lived.",
		stock: 38
	},
	{
		id: 16,
		title: "Charlotte's Web",
		author: "E.B. White",
		category: "Children",
		price: 299,
		oldPrice: 350,
		rating: 4.9,
		reviewsCount: 37,
		cover: "bg-maroon-soft",
		description: "The classic story of friendship between a little pig named Wilbur and a clever spider named Charlotte.",
		stock: 32
	}
];
var categories = [
	"All",
	"Fiction",
	"Classics",
	"Poetry",
	"Non-fiction",
	"Children",
	"Self-help"
];
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
			if (params?.search) url.searchParams.set("search", params.search);
			if (params?.sort) url.searchParams.set("sort", params.sort);
			const res = await fetch(url.toString(), { signal: AbortSignal.timeout(4e3) });
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			return (await res.json()).data;
		} catch (err) {
			console.warn("Backend API not reachable, using local catalog:", err);
			let result = [...books];
			if (params?.category && params.category !== "All") result = result.filter((b) => b.category === params.category);
			if (params?.search) {
				const q = params.search.toLowerCase();
				result = result.filter((b) => `${b.title} ${b.author}`.toLowerCase().includes(q));
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
	}
};
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
export { books as a, api as i, STORE as n, categories as o, WHATSAPP_NUMBER as r, cn as s, Button as t };
