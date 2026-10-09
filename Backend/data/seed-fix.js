import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "successbookhub.db");

const db = new DatabaseSync(dbPath);

const updates = [
  {
    id: 1,
    title: "The Secret Garden",
    author: "Frances H. Burnett",
    category: "Classics",
    sub_category: "World Classics",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Letters to a Young Poet",
    author: "Rainer Maria Rilke",
    category: "Poetry & Letters",
    sub_category: "Epistles & Literary Letters",
    cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "The Last Bookshop",
    author: "Madeline Martin",
    category: "Fiction",
    sub_category: "Historical Fiction",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science & Nature",
    sub_category: "Astrophysics & Cosmos",
    cover: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "Little Women",
    author: "Louisa May Alcott",
    category: "Classics",
    sub_category: "British Literature",
    cover: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    title: "The Wild Robot",
    author: "Peter Brown",
    category: "Children & YA",
    sub_category: "Middle Grade Novels",
    cover: "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    title: "Ikigai",
    author: "Héctor García & Francesc Miralles",
    category: "Self Help",
    sub_category: "Mindset & Psychology",
    cover: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 8,
    title: "The Complete Poems",
    author: "Emily Dickinson",
    category: "Poetry & Letters",
    sub_category: "Romantic & Classical Poetry",
    cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 9,
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    category: "Fiction",
    sub_category: "Contemporary Fiction",
    cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 10,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Classics",
    sub_category: "British Literature",
    cover: "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 11,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "Science & Nature",
    sub_category: "Evolutionary Biology",
    cover: "https://images.unsplash.com/photo-1530281700549-e82e7bf09467?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 12,
    title: "The Gruffalo",
    author: "Julia Donaldson",
    category: "Children & YA",
    sub_category: "Picture Books",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 13,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    sub_category: "Habits & Discipline",
    cover: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 14,
    title: "Milk and Honey",
    author: "Rupi Kaur",
    category: "Poetry & Letters",
    sub_category: "Modern & Free Verse",
    cover: "https://images.unsplash.com/photo-1499209974431-9dac3ada0047?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 15,
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Fiction",
    sub_category: "Literary Fiction",
    cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 16,
    title: "Charlotte's Web",
    author: "E.B. White",
    category: "Children & YA",
    sub_category: "Fables & Folk Tales",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"
  }
];

const stmt = db.prepare("UPDATE books SET title = ?, author = ?, category = ?, sub_category = ?, cover = ? WHERE id = ?");
for (const b of updates) {
  stmt.run(b.title, b.author, b.category, b.sub_category, b.cover, b.id);
}

// Update any non-http or broken covers to valid high-res cover
db.prepare("UPDATE books SET cover = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800' WHERE cover NOT LIKE 'http%' AND cover NOT LIKE '/%'").run();

// Fix any broken image for Alchemist
db.prepare("UPDATE books SET cover = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800' WHERE title LIKE '%Alchemist%' AND (cover LIKE '%broken%' OR cover LIKE '%26%' OR cover NOT LIKE 'https%')").run();

// Add Philosophy book if missing
const philRow = db.prepare("SELECT COUNT(*) as count FROM books WHERE category = 'Philosophy'").get();
if (philRow && philRow.count === 0) {
  db.prepare(`
    INSERT INTO books (title, author, category, sub_category, price, old_price, rating, reviews_count, cover, label, description, stock, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "Meditations",
    "Marcus Aurelius",
    "Philosophy",
    "Stoicism & Virtue",
    399,
    499,
    4.9,
    56,
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    "Classic",
    "Timeless personal writings of the Roman Emperor Marcus Aurelius on Stoic philosophy, resilience, duty, and peace of mind.",
    45,
    1
  );
}

// Ensure default categories in DB have valid images
const defaultCatImages = {
  "Classics": "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800&auto=format&fit=crop",
  "Self Help": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop",
  "Science & Nature": "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=800&auto=format&fit=crop",
  "Poetry & Letters": "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop",
  "Children & YA": "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
  "Philosophy": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop",
  "Fiction": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop"
};

for (const [name, img] of Object.entries(defaultCatImages)) {
  db.prepare("UPDATE categories SET image = ? WHERE name = ? AND (image IS NULL OR image = '')").run(img, name);
}

const allBooks = db.prepare("SELECT id, title, category, sub_category, cover FROM books").all();
console.log("SUCCESSFULLY UPDATED BOOKS COUNT:", allBooks.length);
for (const b of allBooks) {
  console.log(`[${b.id}] ${b.title} | Cat: ${b.category} | Cover: ${b.cover?.slice(0, 50)}...`);
}
