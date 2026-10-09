export const WHATSAPP_NUMBER = "919876543210";

export const STORE = {
  name: "Success Book Hub",
  tagline: "Curated Books & Timeless Stories",
  phone: "+91 98765 43210",
  email: "hello@successbookhub.com",
  address: "42, College Street, Book District, Kolkata, West Bengal 700073, India",
  hours: "Mon – Sat, 10:00 AM – 8:30 PM",
};

export type Book = {
  id: number;
  title: string;
  author: string;
  publisher?: string;
  category: string;
  subCategory?: string;
  sub_category?: string;
  price: number;
  oldPrice?: number | null;
  old_price?: number | null;
  discountPercent?: number;
  discount_percent?: number;
  rating: number;
  reviewsCount?: number;
  cover: string;
  image2?: string;
  image_2?: string;
  label?: string | null;
  description?: string;
  stock?: number;
  featured?: boolean;
};

export const books: Book[] = [
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

export const categories = ["All", "Fiction", "Classics", "Poetry", "Non-fiction", "Children", "Self-help"];
