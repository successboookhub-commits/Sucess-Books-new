import mysql from "mysql2/promise";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Schema definitions for all tables and their columns
export const SCHEMA_DEFINITIONS = {
  categories: {
    mysqlCreate: `
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        image TEXT,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
    sqliteCreate: `
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        slug TEXT NOT NULL UNIQUE,
        description TEXT,
        image TEXT,
        status TEXT DEFAULT 'active',
        created_at TEXT DEFAULT (datetime('now'))
      );
    `,
    columns: [
      { name: "id", mysqlType: "INT AUTO_INCREMENT PRIMARY KEY", sqliteType: "INTEGER PRIMARY KEY AUTOINCREMENT" },
      { name: "name", mysqlType: "VARCHAR(255) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "slug", mysqlType: "VARCHAR(255) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "description", mysqlType: "TEXT", sqliteType: "TEXT" },
      { name: "image", mysqlType: "TEXT", sqliteType: "TEXT" },
      { name: "status", mysqlType: "VARCHAR(50) DEFAULT 'active'", sqliteType: "TEXT DEFAULT 'active'" },
      { name: "created_at", mysqlType: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", sqliteType: "TEXT DEFAULT (datetime('now'))" }
    ]
  },
  sub_categories: {
    mysqlCreate: `
      CREATE TABLE IF NOT EXISTS sub_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        description TEXT,
        image TEXT,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_category_id (category_id),
        FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
    sqliteCreate: `
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
    `,
    columns: [
      { name: "id", mysqlType: "INT AUTO_INCREMENT PRIMARY KEY", sqliteType: "INTEGER PRIMARY KEY AUTOINCREMENT" },
      { name: "category_id", mysqlType: "INT NOT NULL", sqliteType: "INTEGER NOT NULL" },
      { name: "name", mysqlType: "VARCHAR(255) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "slug", mysqlType: "VARCHAR(255) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "description", mysqlType: "TEXT", sqliteType: "TEXT" },
      { name: "image", mysqlType: "TEXT", sqliteType: "TEXT" },
      { name: "status", mysqlType: "VARCHAR(50) DEFAULT 'active'", sqliteType: "TEXT DEFAULT 'active'" },
      { name: "created_at", mysqlType: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", sqliteType: "TEXT DEFAULT (datetime('now'))" }
    ]
  },
  books: {
    mysqlCreate: `
      CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        sub_category VARCHAR(100) NULL,
        price DECIMAL(10,2) NOT NULL,
        old_price DECIMAL(10,2) NULL,
        discount_percent INT DEFAULT 0,
        rating DECIMAL(3,2) DEFAULT 4.5,
        reviews_count INT DEFAULT 0,
        cover TEXT NOT NULL,
        image_2 TEXT NULL,
        label VARCHAR(100) NULL,
        description TEXT,
        stock INT DEFAULT 50,
        featured TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
    sqliteCreate: `
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        category TEXT NOT NULL,
        sub_category TEXT,
        price REAL NOT NULL,
        old_price REAL,
        discount_percent INTEGER DEFAULT 0,
        rating REAL DEFAULT 4.5,
        reviews_count INTEGER DEFAULT 0,
        cover TEXT NOT NULL,
        image_2 TEXT,
        label TEXT,
        description TEXT,
        stock INTEGER DEFAULT 50,
        featured INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now'))
      );
    `,
    columns: [
      { name: "id", mysqlType: "INT AUTO_INCREMENT PRIMARY KEY", sqliteType: "INTEGER PRIMARY KEY AUTOINCREMENT" },
      { name: "title", mysqlType: "VARCHAR(255) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "author", mysqlType: "VARCHAR(255) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "category", mysqlType: "VARCHAR(100) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "sub_category", mysqlType: "VARCHAR(100) NULL", sqliteType: "TEXT" },
      { name: "price", mysqlType: "DECIMAL(10,2) NOT NULL", sqliteType: "REAL NOT NULL" },
      { name: "old_price", mysqlType: "DECIMAL(10,2) NULL", sqliteType: "REAL" },
      { name: "discount_percent", mysqlType: "INT DEFAULT 0", sqliteType: "INTEGER DEFAULT 0" },
      { name: "rating", mysqlType: "DECIMAL(3,2) DEFAULT 4.5", sqliteType: "REAL DEFAULT 4.5" },
      { name: "reviews_count", mysqlType: "INT DEFAULT 0", sqliteType: "INTEGER DEFAULT 0" },
      { name: "cover", mysqlType: "TEXT NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "image_2", mysqlType: "TEXT NULL", sqliteType: "TEXT" },
      { name: "label", mysqlType: "VARCHAR(100) NULL", sqliteType: "TEXT" },
      { name: "description", mysqlType: "TEXT", sqliteType: "TEXT" },
      { name: "stock", mysqlType: "INT DEFAULT 50", sqliteType: "INTEGER DEFAULT 50" },
      { name: "featured", mysqlType: "TINYINT(1) DEFAULT 0", sqliteType: "INTEGER DEFAULT 0" },
      { name: "created_at", mysqlType: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", sqliteType: "TEXT DEFAULT (datetime('now'))" }
    ]
  },
  orders: {
    mysqlCreate: `
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(50) PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50) NOT NULL,
        customer_email VARCHAR(255),
        delivery_address TEXT NOT NULL,
        city VARCHAR(100),
        pincode VARCHAR(20),
        items_json LONGTEXT NOT NULL,
        subtotal DECIMAL(10,2) NOT NULL,
        delivery_fee DECIMAL(10,2) DEFAULT 0,
        total DECIMAL(10,2) NOT NULL,
        payment_method VARCHAR(50) DEFAULT 'COD',
        status VARCHAR(50) DEFAULT 'pending',
        order_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
    sqliteCreate: `
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
    `,
    columns: [
      { name: "id", mysqlType: "VARCHAR(50) PRIMARY KEY", sqliteType: "TEXT PRIMARY KEY" },
      { name: "customer_name", mysqlType: "VARCHAR(255) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "customer_phone", mysqlType: "VARCHAR(50) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "customer_email", mysqlType: "VARCHAR(255)", sqliteType: "TEXT" },
      { name: "delivery_address", mysqlType: "TEXT NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "city", mysqlType: "VARCHAR(100)", sqliteType: "TEXT" },
      { name: "pincode", mysqlType: "VARCHAR(20)", sqliteType: "TEXT" },
      { name: "items_json", mysqlType: "LONGTEXT NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "subtotal", mysqlType: "DECIMAL(10,2) NOT NULL", sqliteType: "REAL NOT NULL" },
      { name: "delivery_fee", mysqlType: "DECIMAL(10,2) DEFAULT 0", sqliteType: "REAL DEFAULT 0" },
      { name: "total", mysqlType: "DECIMAL(10,2) NOT NULL", sqliteType: "REAL NOT NULL" },
      { name: "payment_method", mysqlType: "VARCHAR(50) DEFAULT 'COD'", sqliteType: "TEXT DEFAULT 'COD'" },
      { name: "status", mysqlType: "VARCHAR(50) DEFAULT 'pending'", sqliteType: "TEXT DEFAULT 'pending'" },
      { name: "order_notes", mysqlType: "TEXT", sqliteType: "TEXT" },
      { name: "created_at", mysqlType: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", sqliteType: "TEXT DEFAULT (datetime('now'))" }
    ]
  },
  reviews: {
    mysqlCreate: `
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        book_id INT NOT NULL,
        user_name VARCHAR(255) NOT NULL,
        rating INT NOT NULL,
        comment TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_book_id (book_id),
        FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
    sqliteCreate: `
      CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        book_id INTEGER NOT NULL,
        user_name TEXT NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE
      );
    `,
    columns: [
      { name: "id", mysqlType: "INT AUTO_INCREMENT PRIMARY KEY", sqliteType: "INTEGER PRIMARY KEY AUTOINCREMENT" },
      { name: "book_id", mysqlType: "INT NOT NULL", sqliteType: "INTEGER NOT NULL" },
      { name: "user_name", mysqlType: "VARCHAR(255) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "rating", mysqlType: "INT NOT NULL", sqliteType: "INTEGER NOT NULL" },
      { name: "comment", mysqlType: "TEXT NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "created_at", mysqlType: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", sqliteType: "TEXT DEFAULT (datetime('now'))" }
    ]
  },
  contacts: {
    mysqlCreate: `
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
    sqliteCreate: `
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'new',
        created_at TEXT DEFAULT (datetime('now'))
      );
    `,
    columns: [
      { name: "id", mysqlType: "INT AUTO_INCREMENT PRIMARY KEY", sqliteType: "INTEGER PRIMARY KEY AUTOINCREMENT" },
      { name: "name", mysqlType: "VARCHAR(255) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "email", mysqlType: "VARCHAR(255)", sqliteType: "TEXT" },
      { name: "phone", mysqlType: "VARCHAR(50)", sqliteType: "TEXT" },
      { name: "message", mysqlType: "TEXT NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "status", mysqlType: "VARCHAR(50) DEFAULT 'new'", sqliteType: "TEXT DEFAULT 'new'" },
      { name: "created_at", mysqlType: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", sqliteType: "TEXT DEFAULT (datetime('now'))" }
    ]
  },
  newsletter: {
    mysqlCreate: `
      CREATE TABLE IF NOT EXISTS newsletter (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
    sqliteCreate: `
      CREATE TABLE IF NOT EXISTS newsletter (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        created_at TEXT DEFAULT (datetime('now'))
      );
    `,
    columns: [
      { name: "id", mysqlType: "INT AUTO_INCREMENT PRIMARY KEY", sqliteType: "INTEGER PRIMARY KEY AUTOINCREMENT" },
      { name: "email", mysqlType: "VARCHAR(255) NOT NULL UNIQUE", sqliteType: "TEXT NOT NULL UNIQUE" },
      { name: "created_at", mysqlType: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", sqliteType: "TEXT DEFAULT (datetime('now'))" }
    ]
  },
  admin_otps: {
    mysqlCreate: `
      CREATE TABLE IF NOT EXISTS admin_otps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        otp VARCHAR(10) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
    sqliteCreate: `
      CREATE TABLE IF NOT EXISTS admin_otps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        otp TEXT NOT NULL,
        expires_at TEXT NOT NULL,
        used INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now'))
      );
    `,
    columns: [
      { name: "id", mysqlType: "INT AUTO_INCREMENT PRIMARY KEY", sqliteType: "INTEGER PRIMARY KEY AUTOINCREMENT" },
      { name: "email", mysqlType: "VARCHAR(255) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "otp", mysqlType: "VARCHAR(10) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "expires_at", mysqlType: "TIMESTAMP NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "used", mysqlType: "TINYINT(1) DEFAULT 0", sqliteType: "INTEGER DEFAULT 0" },
      { name: "created_at", mysqlType: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", sqliteType: "TEXT DEFAULT (datetime('now'))" }
    ]
  }
};


let pool = null;
let sqliteDb = null;
export let isMySQL = false;

// Always attempt MySQL connection first using Hostinger credentials with SQLite fallback
const hasMySQLConfig = true;

// Unified Database Adapter
export const db = {
  isMySQL: false,

  async query(sql, params = []) {
    if (isMySQL && pool) {
      const [rows] = await pool.query(sql, params);
      return rows;
    } else {
      const stmt = sqliteDb.prepare(sql);
      return stmt.all(...params);
    }
  },

  async all(sql, params = []) {
    if (isMySQL && pool) {
      const [rows] = await pool.query(sql, params);
      return rows;
    } else {
      const stmt = sqliteDb.prepare(sql);
      return stmt.all(...params);
    }
  },

  async get(sql, params = []) {
    if (isMySQL && pool) {
      const [rows] = await pool.query(sql, params);
      return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    } else {
      const stmt = sqliteDb.prepare(sql);
      const row = stmt.get(...params);
      return row || null;
    }
  },

  async run(sql, params = []) {
    if (isMySQL && pool) {
      const [result] = await pool.query(sql, params);
      return {
        lastInsertRowid: result.insertId,
        insertId: result.insertId,
        changes: result.affectedRows,
        affectedRows: result.affectedRows
      };
    } else {
      const stmt = sqliteDb.prepare(sql);
      const info = stmt.run(...params);
      return {
        lastInsertRowid: info.lastInsertRowid,
        insertId: info.lastInsertRowid,
        changes: info.changes,
        affectedRows: info.changes
      };
    }
  },

  // Prepared-statement compatible wrapper for smooth transitions
  prepare(sql) {
    return {
      all: async (...params) => db.all(sql, params.length === 1 && Array.isArray(params[0]) ? params[0] : params),
      get: async (...params) => db.get(sql, params.length === 1 && Array.isArray(params[0]) ? params[0] : params),
      run: async (...params) => db.run(sql, params.length === 1 && Array.isArray(params[0]) ? params[0] : params)
    };
  }
};

// Initialize Connection & Schema
export async function initDatabase() {
  if (hasMySQLConfig) {
    try {
      console.log("[Database] Connecting to MySQL server...");
      const poolConfig = {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "u803044110_Successbookhub",
        password: process.env.DB_PASSWORD || "Successbookhub@123",
        database: process.env.DB_NAME || "u803044110_Successbookhub",
        port: Number(process.env.DB_PORT) || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
        charset: "utf8mb4"
      };

      pool = mysql.createPool(poolConfig);
      // Test connection
      const connection = await pool.getConnection();
      connection.release();
      isMySQL = true;
      db.isMySQL = true;
      console.log(`[Database] Connected successfully to MySQL (${poolConfig.database} on ${poolConfig.host})`);
    } catch (err) {
      console.error("[Database] MySQL Connection failed:", err.message);
      console.log("[Database] Falling back to local SQLite database...");
      await initSQLite();
    }
  } else {
    console.log("[Database] No MySQL credentials found in environment. Using local SQLite database.");
    await initSQLite();
  }

  // Create tables & auto-migrate columns
  await setupSchema();

  // Check and seed initial data if tables are empty
  await seedInitialData();
}

async function initSQLite() {
  const { DatabaseSync } = await import("node:sqlite");
  const dataDir = path.join(__dirname, "../../data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const dbPath = path.join(dataDir, "successbookhub.db");
  sqliteDb = new DatabaseSync(dbPath);
  isMySQL = false;
  db.isMySQL = false;
  console.log(`[Database] SQLite initialized at: ${dbPath}`);
}

async function setupSchema() {
  console.log("[Database] Checking and syncing tables & columns...");

  for (const [tableName, def] of Object.entries(SCHEMA_DEFINITIONS)) {
    // 1. Create table if not exists
    if (isMySQL && pool) {
      await pool.query(def.mysqlCreate);
    } else if (sqliteDb) {
      sqliteDb.exec(def.sqliteCreate);
    }

    // 2. Auto-migrate missing columns for future schema evolution
    await autoMigrateColumns(tableName, def);
  }

  console.log("[Database] Schema sync completed successfully. All tables and columns are up to date.");
}

async function autoMigrateColumns(tableName, def) {
  try {
    if (isMySQL && pool) {
      const dbName = process.env.DB_NAME || "successbookhub";
      const [existingCols] = await pool.query(
        `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
        [dbName, tableName]
      );
      const existingColNames = new Set(existingCols.map((c) => c.COLUMN_NAME.toLowerCase()));

      for (const col of def.columns) {
        if (!existingColNames.has(col.name.toLowerCase())) {
          console.log(`[Auto-Migration] Adding missing column '${col.name}' to table '${tableName}' in MySQL...`);
          const cleanType = col.mysqlType.replace(/AUTO_INCREMENT|PRIMARY KEY/gi, "").trim();
          await pool.query(`ALTER TABLE \`${tableName}\` ADD COLUMN \`${col.name}\` ${cleanType}`);
          console.log(`[Auto-Migration] Successfully added column '${col.name}' to '${tableName}'.`);
        }
      }
    } else if (sqliteDb) {
      const pragmaRows = sqliteDb.prepare(`PRAGMA table_info(${tableName})`).all();
      const existingColNames = new Set(pragmaRows.map((r) => r.name.toLowerCase()));

      for (const col of def.columns) {
        if (!existingColNames.has(col.name.toLowerCase())) {
          console.log(`[Auto-Migration] Adding missing column '${col.name}' to table '${tableName}' in SQLite...`);
          try {
            sqliteDb.exec(`ALTER TABLE ${tableName} ADD COLUMN ${col.name} ${col.sqliteType || "TEXT"}`);
            console.log(`[Auto-Migration] SQLite: Added '${col.name}' to '${tableName}'.`);
          } catch (err) {
            console.warn(`[Auto-Migration] SQLite note on '${col.name}':`, err.message);
          }
        }
      }
    }
  } catch (err) {
    console.error(`[Auto-Migration] Error syncing columns for table '${tableName}':`, err.message);
  }
}

async function seedInitialData() {
  try {
    const catCountRow = await db.get("SELECT COUNT(*) as count FROM categories");
    const catCount = Number(catCountRow?.count || 0);
    if (catCount === 0) {
      console.log("[Database] Seeding default categories and sub-categories...");
      await seedCategoriesAndSubCategories();
    }

    const bookCountRow = await db.get("SELECT COUNT(*) as count FROM books");
    const bookCount = Number(bookCountRow?.count || 0);
    if (bookCount === 0) {
      console.log("[Database] Seeding default books and reviews catalog...");
      await seedBooksAndReviews();
    }
  } catch (err) {
    console.error("[Database] Error checking/seeding initial data:", err.message);
  }
}

async function seedCategoriesAndSubCategories() {
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

  for (const cat of initialCategories) {
    const res = await db.run(
      "INSERT INTO categories (name, slug, description, image, status) VALUES (?, ?, ?, ?, 'active')",
      [cat.name, cat.slug, cat.description, cat.image]
    );
    const catId = res.lastInsertRowid;
    for (const sub of cat.subCategories) {
      await db.run(
        "INSERT INTO sub_categories (category_id, name, slug, description, image, status) VALUES (?, ?, ?, ?, ?, 'active')",
        [catId, sub.name, sub.slug, sub.description, sub.image]
      );
    }
  }
}

async function seedBooksAndReviews() {
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

  for (const b of initialBooks) {
    await db.run(
      `INSERT INTO books (title, author, category, price, old_price, rating, reviews_count, cover, label, description, stock, featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [b.title, b.author, b.category, b.price, b.old_price, b.rating, b.reviews_count, b.cover, b.label, b.description, b.stock, b.featured]
    );
  }

  // Seed sample reviews
  await db.run("INSERT INTO reviews (book_id, user_name, rating, comment) VALUES (?, ?, ?, ?)", [1, "Meera Roy", 5, "Received in gorgeous packaging with a handwritten note! What a joy to read."]);
  await db.run("INSERT INTO reviews (book_id, user_name, rating, comment) VALUES (?, ?, ?, ?)", [1, "Arjun Sen", 5, "The paper quality and cover feel so premium. Five stars!"]);
  await db.run("INSERT INTO reviews (book_id, user_name, rating, comment) VALUES (?, ?, ?, ?)", [2, "Priya Nair", 5, "Rilke's words will change how you view solitude. Must read."]);
  await db.run("INSERT INTO reviews (book_id, user_name, rating, comment) VALUES (?, ?, ?, ?)", [7, "Vikram Patel", 4, "Clear, actionable and calming read. Fast delivery by Success Book Hub."]);
  await db.run("INSERT INTO reviews (book_id, user_name, rating, comment) VALUES (?, ?, ?, ?)", [13, "Sneha Bose", 5, "Best book on personal habits ever written. Highly recommend ordering!"]);
}
