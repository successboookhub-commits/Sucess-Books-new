import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "../../data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "successbookhub.db");
export const db = new DatabaseSync(dbPath);

// Initialize Tables
export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      old_price REAL,
      rating REAL DEFAULT 4.5,
      reviews_count INTEGER DEFAULT 0,
      cover TEXT NOT NULL,
      label TEXT,
      description TEXT,
      stock INTEGER DEFAULT 50,
      featured INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      customer_name TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      customer_email TEXT,
      delivery_address TEXT NOT NULL,
      city TEXT,
      pincode TEXT,
      items_json TEXT NOT NULL,
      subtotal REAL NOT NULL,
      delivery_fee REAL DEFAULT 0,
      total REAL NOT NULL,
      payment_method TEXT DEFAULT 'COD',
      status TEXT DEFAULT 'pending',
      order_notes TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      book_id INTEGER NOT NULL,
      user_name TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'new',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      image TEXT,
      status TEXT DEFAULT 'active',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sub_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      slug TEXT NOT NULL,
      description TEXT,
      image TEXT,
      status TEXT DEFAULT 'active',
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
    );
  `);

  // Check if categories table is empty and seed
  const catCount = db.prepare("SELECT COUNT(*) as count FROM categories").get();
  if (catCount.count === 0) {
    seedCategoriesAndSubCategories();
  }

  // Check if books table is empty and seed
  const countRow = db.prepare("SELECT COUNT(*) as count FROM books").get();
  if (countRow.count === 0) {
    seedBooks();
  }
}

function seedBooks() {
  const initialBooks = [
    {
      title: "The Secret Garden",
      author: "Frances H. Burnett",
      category: "Classics",
      price: 349,
      old_price: 449,
      rating: 4.8,
      reviews_count: 34,
      cover: "bg-primary",
      label: "Bestseller",
      description: "A timeless tale of Mary Lennox, an orphan girl sent to Yorkshire who uncovers a locked, forgotten walled garden and finds magic, friendship, and renewal.",
      stock: 35,
      featured: 1
    },
    {
      title: "Letters to a Young Poet",
      author: "Rainer Maria Rilke",
      category: "Poetry",
      price: 299,
      old_price: null,
      rating: 4.7,
      reviews_count: 21,
      cover: "bg-maroon-soft",
      label: null,
      description: "Ten profound letters from Rilke offering timeless wisdom on loneliness, art, love, and living the questions rather than forcing immediate answers.",
      stock: 40,
      featured: 1
    },
    {
      title: "The Last Bookshop",
      author: "Madeline Martin",
      category: "Fiction",
      price: 429,
      old_price: 499,
      rating: 4.6,
      reviews_count: 18,
      cover: "bg-gold",
      label: "New",
      description: "An unforgettable story set against wartime London, exploring resilience, hope, and the incredible sanctuary that books create during the darkest times.",
      stock: 28,
      featured: 1
    },
    {
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      category: "Non-fiction",
      price: 499,
      old_price: null,
      rating: 4.9,
      reviews_count: 52,
      cover: "bg-foreground",
      label: null,
      description: "Hawking's legendary exploration of black holes, the big bang, general relativity, and the nature of our universe written for curious minds.",
      stock: 22,
      featured: 1
    },
    {
      title: "Little Women",
      author: "Louisa May Alcott",
      category: "Classics",
      price: 379,
      old_price: null,
      rating: 4.8,
      reviews_count: 40,
      cover: "bg-whatsapp",
      label: null,
      description: "Follow the beloved March sisters — Jo, Meg, Beth, and Amy — as they grow through love, ambition, heartache, and unbreakable sisterhood.",
      stock: 30,
      featured: 1
    },
    {
      title: "The Wild Robot",
      author: "Peter Brown",
      category: "Children",
      price: 329,
      old_price: 399,
      rating: 4.7,
      reviews_count: 27,
      cover: "bg-maroon-soft",
      label: "Popular",
      description: "Roz the robot opens her eyes for the very first time and discovers she is alone on a wild island. A heartwarming adventure of survival and connection.",
      stock: 45,
      featured: 1
    },
    {
      title: "Ikigai",
      author: "Héctor García & Francesc Miralles",
      category: "Self-help",
      price: 399,
      old_price: null,
      rating: 4.6,
      reviews_count: 65,
      cover: "bg-primary",
      label: null,
      description: "The Japanese secret to a long, purposeful and happy life. Discover your own intersection of passion, mission, vocation, and profession.",
      stock: 55,
      featured: 1
    },
    {
      title: "The Complete Poems",
      author: "Emily Dickinson",
      category: "Poetry",
      price: 449,
      old_price: null,
      rating: 4.9,
      reviews_count: 19,
      cover: "bg-foreground",
      label: null,
      description: "All the breathtaking, enigmatic, and revolutionary verses of Emily Dickinson, gathered in a definitive collector edition.",
      stock: 18,
      featured: 1
    },
    {
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      category: "Fiction",
      price: 549,
      old_price: 650,
      rating: 4.8,
      reviews_count: 48,
      cover: "bg-maroon-soft",
      label: "Staff pick",
      description: "The thrilling tale of Kvothe, a magically gifted young man who grows to be the most notorious wizard his world has ever known.",
      stock: 25,
      featured: 0
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      category: "Classics",
      price: 329,
      old_price: null,
      rating: 4.9,
      reviews_count: 88,
      cover: "bg-gold",
      label: null,
      description: "Jane Austen's sparkling romantic masterpiece tracing the spirited Elizabeth Bennet and proud Mr. Darcy.",
      stock: 50,
      featured: 0
    },
    {
      title: "Sapiens",
      author: "Yuval Noah Harari",
      category: "Non-fiction",
      price: 599,
      old_price: 699,
      rating: 4.7,
      reviews_count: 92,
      cover: "bg-primary",
      label: "Bestseller",
      description: "A narrative journey through the history of humankind: how an insignificant ape became the ruler of planet Earth.",
      stock: 40,
      featured: 0
    },
    {
      title: "The Gruffalo",
      author: "Julia Donaldson",
      category: "Children",
      price: 279,
      old_price: null,
      rating: 4.8,
      reviews_count: 31,
      cover: "bg-whatsapp",
      label: null,
      description: "Walk further into the deep dark wood and find what happens when a quick-thinking mouse comes face to face with an owl, snake, and a Gruffalo!",
      stock: 35,
      featured: 0
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self-help",
      price: 459,
      old_price: 550,
      rating: 4.8,
      reviews_count: 110,
      cover: "bg-foreground",
      label: "Popular",
      description: "An easy and proven way to build good habits and break bad ones. Small changes that deliver remarkable results.",
      stock: 60,
      featured: 0
    },
    {
      title: "Milk and Honey",
      author: "Rupi Kaur",
      category: "Poetry",
      price: 349,
      old_price: null,
      rating: 4.5,
      reviews_count: 24,
      cover: "bg-gold",
      label: null,
      description: "A collection of poetry and prose about survival, the experience of violence, abuse, love, loss, and femininity.",
      stock: 30,
      featured: 0
    },
    {
      title: "The Midnight Library",
      author: "Matt Haig",
      category: "Fiction",
      price: 399,
      old_price: null,
      rating: 4.6,
      reviews_count: 42,
      cover: "bg-primary",
      label: null,
      description: "Between life and death there is a library where every book offers a chance to try other lives you could have lived.",
      stock: 38,
      featured: 0
    },
    {
      title: "Charlotte's Web",
      author: "E.B. White",
      category: "Children",
      price: 299,
      old_price: 350,
      rating: 4.9,
      reviews_count: 37,
      cover: "bg-maroon-soft",
      label: null,
      description: "The classic story of friendship between a little pig named Wilbur and a clever spider named Charlotte.",
      stock: 32,
      featured: 0
    }
  ];

  const insertBook = db.prepare(`
    INSERT INTO books (title, author, category, price, old_price, rating, reviews_count, cover, label, description, stock, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const b of initialBooks) {
    insertBook.run(
      b.title,
      b.author,
      b.category,
      b.price,
      b.old_price,
      b.rating,
      b.reviews_count,
      b.cover,
      b.label,
      b.description,
      b.stock,
      b.featured
    );
  }

  // Seed sample reviews
  const insertReview = db.prepare(`
    INSERT INTO reviews (book_id, user_name, rating, comment, created_at)
    VALUES (?, ?, ?, ?, datetime('now', '-2 days'))
  `);

  insertReview.run(1, "Meera Roy", 5, "Received in gorgeous packaging with a handwritten note! What a joy to read.");
  insertReview.run(1, "Arjun Sen", 5, "The paper quality and cover feel so premium. Five stars!");
  insertReview.run(2, "Priya Nair", 5, "Rilke's words will change how you view solitude. Must read.");
  insertReview.run(7, "Vikram Patel", 4, "Clear, actionable and calming read. Fast delivery by Success Book Hub.");
  insertReview.run(13, "Sneha Bose", 5, "Best book on personal habits ever written. Highly recommend ordering!");
}

function seedCategoriesAndSubCategories() {
  const initialCategories = [
    {
      name: "Classics",
      slug: "classics",
      description: "Timeless masterworks of literature that have shaped human culture, imagination, and thought.",
      image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800&auto=format&fit=crop",
      subCategories: [
        { name: "British Literature", slug: "british-literature", description: "Masterpieces from the Victorian, Georgian, and Elizabethan eras.", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop" },
        { name: "World Classics", slug: "world-classics", description: "Celebrated stories spanning across continents and generations.", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop" },
        { name: "Historical Fiction", slug: "historical-fiction", description: "Narratives woven through pivotal epochs of history.", image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?q=80&w=600&auto=format&fit=crop" },
        { name: "Epics & Mythology", slug: "epics-mythology", description: "Grand mythological sagas and heroic poetry.", image: "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?q=80&w=600&auto=format&fit=crop" }
      ]
    },
    {
      name: "Self Help",
      slug: "self-help",
      description: "Actionable frameworks for personal growth, habit cultivation, emotional resilience, and financial wisdom.",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop",
      subCategories: [
        { name: "Productivity & Deep Work", slug: "productivity-deep-work", description: "Techniques to master time, attention, and high output.", image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=600&auto=format&fit=crop" },
        { name: "Habits & Discipline", slug: "habits-discipline", description: "Micro-habits, compounding routines, and behavior design.", image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop" },
        { name: "Mindset & Psychology", slug: "mindset-psychology", description: "Growth mindsets, cognitive reframing, and emotional mastery.", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop" },
        { name: "Financial Freedom", slug: "financial-freedom", description: "Wealth generation, investment psychology, and freedom.", image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600&auto=format&fit=crop" }
      ]
    },
    {
      name: "Science & Nature",
      slug: "science-nature",
      description: "From quantum mechanics to cosmic wonders and the evolutionary origins of life.",
      image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=800&auto=format&fit=crop",
      subCategories: [
        { name: "Astrophysics & Cosmos", slug: "astrophysics-cosmos", description: "Black holes, spacetime, and the evolution of the universe.", image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop" },
        { name: "Evolutionary Biology", slug: "evolutionary-biology", description: "Genetics, anthropology, and the history of living species.", image: "https://images.unsplash.com/photo-1530281700549-e82e7bf09467?q=80&w=600&auto=format&fit=crop" },
        { name: "History of Science", slug: "history-of-science", description: "The discoveries and pioneers that revolutionized human understanding.", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop" }
      ]
    },
    {
      name: "Poetry & Letters",
      slug: "poetry-letters",
      description: "Sublime verses, contemplative stanzas, and intimate letters written with enduring beauty.",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop",
      subCategories: [
        { name: "Romantic & Classical Poetry", slug: "romantic-classical-poetry", description: "Keats, Wordsworth, Shelley, and the romantic poets.", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop" },
        { name: "Modern & Free Verse", slug: "modern-free-verse", description: "Contemporary voices expressing modern human conditions.", image: "https://images.unsplash.com/photo-1499209974431-9dac3ada0047?q=80&w=600&auto=format&fit=crop" },
        { name: "Epistles & Literary Letters", slug: "epistles-literary-letters", description: "Heartfelt correspondence between artists, thinkers, and poets.", image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=600&auto=format&fit=crop" }
      ]
    },
    {
      name: "Children & YA",
      slug: "children-ya",
      description: "Whimsical illustrated wonders, bedtime classics, and inspiring adventures for young readers.",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
      subCategories: [
        { name: "Picture Books", slug: "picture-books", description: "Vibrant illustrated stories for early developmental years.", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop" },
        { name: "Fables & Folk Tales", slug: "fables-folk-tales", description: "Moral lessons and magical folklore from across cultures.", image: "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?q=80&w=600&auto=format&fit=crop" },
        { name: "Middle Grade Novels", slug: "middle-grade-novels", description: "Imaginative chapter books and coming-of-age quests.", image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?q=80&w=600&auto=format&fit=crop" }
      ]
    },
    {
      name: "Philosophy",
      slug: "philosophy",
      description: "Ancient Stoicism, Eastern wisdom traditions, ethics, and contemplative inquiries.",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop",
      subCategories: [
        { name: "Stoicism & Virtue", slug: "stoicism-virtue", description: "Marcus Aurelius, Seneca, Epictetus on living with calm resilience.", image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop" },
        { name: "Eastern Thought", slug: "eastern-thought", description: "Upanishadic philosophy, Zen, Taoism, and contemplative awareness.", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop" },
        { name: "Ethics & Existentialism", slug: "ethics-existentialism", description: "Moral philosophy, freedom, and the search for profound purpose.", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop" }
      ]
    }
  ];

  const insertCat = db.prepare(`
    INSERT INTO categories (name, slug, description, image, status)
    VALUES (?, ?, ?, ?, 'active')
  `);

  const insertSubCat = db.prepare(`
    INSERT INTO sub_categories (category_id, name, slug, description, image, status)
    VALUES (?, ?, ?, ?, ?, 'active')
  `);

  for (const cat of initialCategories) {
    const info = insertCat.run(cat.name, cat.slug, cat.description, cat.image);
    const catId = info.lastInsertRowid;
    for (const sub of cat.subCategories) {
      insertSubCat.run(catId, sub.name, sub.slug, sub.description, sub.image);
    }
  }
}

