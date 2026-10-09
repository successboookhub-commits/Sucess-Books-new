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
        image MEDIUMTEXT,
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
      { name: "image", mysqlType: "MEDIUMTEXT", sqliteType: "TEXT" },
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
        image MEDIUMTEXT,
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
      { name: "image", mysqlType: "MEDIUMTEXT", sqliteType: "TEXT" },
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
        cover MEDIUMTEXT NOT NULL,
        image_2 MEDIUMTEXT NULL,
        label VARCHAR(100) NULL,
        publisher VARCHAR(255) NULL,
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
        publisher TEXT,
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
      { name: "cover", mysqlType: "MEDIUMTEXT NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "image_2", mysqlType: "MEDIUMTEXT NULL", sqliteType: "TEXT" },
      { name: "label", mysqlType: "VARCHAR(100) NULL", sqliteType: "TEXT" },
      { name: "publisher", mysqlType: "VARCHAR(255) NULL", sqliteType: "TEXT" },
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
        user_id INT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50) NOT NULL,
        customer_email VARCHAR(255),
        delivery_address TEXT NOT NULL,
        city VARCHAR(100),
        state VARCHAR(100) DEFAULT 'Telangana',
        pincode VARCHAR(20),
        address_type VARCHAR(50) DEFAULT 'Home',
        items_json LONGTEXT NOT NULL,
        mrp_total DECIMAL(10,2) DEFAULT 0,
        discount_total DECIMAL(10,2) DEFAULT 0,
        subtotal DECIMAL(10,2) NOT NULL,
        delivery_fee DECIMAL(10,2) DEFAULT 0,
        total DECIMAL(10,2) NOT NULL,
        payment_method VARCHAR(50) DEFAULT 'COD',
        status VARCHAR(50) DEFAULT 'pending',
        invoice_no VARCHAR(100) NULL,
        order_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
    sqliteCreate: `
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        user_id INTEGER,
        customer_name TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        customer_email TEXT,
        delivery_address TEXT NOT NULL,
        city TEXT,
        state TEXT DEFAULT 'Telangana',
        pincode TEXT,
        address_type TEXT DEFAULT 'Home',
        items_json TEXT NOT NULL,
        mrp_total REAL DEFAULT 0,
        discount_total REAL DEFAULT 0,
        subtotal REAL NOT NULL,
        delivery_fee REAL DEFAULT 0,
        total REAL NOT NULL,
        payment_method TEXT DEFAULT 'COD',
        status TEXT DEFAULT 'pending',
        invoice_no TEXT,
        order_notes TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      );
    `,
    columns: [
      { name: "id", mysqlType: "VARCHAR(50) PRIMARY KEY", sqliteType: "TEXT PRIMARY KEY" },
      { name: "user_id", mysqlType: "INT NULL", sqliteType: "INTEGER" },
      { name: "customer_name", mysqlType: "VARCHAR(255) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "customer_phone", mysqlType: "VARCHAR(50) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "customer_email", mysqlType: "VARCHAR(255)", sqliteType: "TEXT" },
      { name: "delivery_address", mysqlType: "TEXT NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "city", mysqlType: "VARCHAR(100)", sqliteType: "TEXT" },
      { name: "state", mysqlType: "VARCHAR(100) DEFAULT 'Telangana'", sqliteType: "TEXT DEFAULT 'Telangana'" },
      { name: "pincode", mysqlType: "VARCHAR(20)", sqliteType: "TEXT" },
      { name: "address_type", mysqlType: "VARCHAR(50) DEFAULT 'Home'", sqliteType: "TEXT DEFAULT 'Home'" },
      { name: "items_json", mysqlType: "LONGTEXT NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "mrp_total", mysqlType: "DECIMAL(10,2) DEFAULT 0", sqliteType: "REAL DEFAULT 0" },
      { name: "discount_total", mysqlType: "DECIMAL(10,2) DEFAULT 0", sqliteType: "REAL DEFAULT 0" },
      { name: "subtotal", mysqlType: "DECIMAL(10,2) NOT NULL", sqliteType: "REAL NOT NULL" },
      { name: "delivery_fee", mysqlType: "DECIMAL(10,2) DEFAULT 0", sqliteType: "REAL DEFAULT 0" },
      { name: "total", mysqlType: "DECIMAL(10,2) NOT NULL", sqliteType: "REAL NOT NULL" },
      { name: "payment_method", mysqlType: "VARCHAR(50) DEFAULT 'COD'", sqliteType: "TEXT DEFAULT 'COD'" },
      { name: "status", mysqlType: "VARCHAR(50) DEFAULT 'pending'", sqliteType: "TEXT DEFAULT 'pending'" },
      { name: "invoice_no", mysqlType: "VARCHAR(100) NULL", sqliteType: "TEXT" },
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
  },
  users: {
    mysqlCreate: `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(50) NULL,
        avatar TEXT NULL,
        role VARCHAR(50) DEFAULT 'customer',
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
    sqliteCreate: `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT NOT NULL UNIQUE,
        phone TEXT,
        avatar TEXT,
        role TEXT DEFAULT 'customer',
        status TEXT DEFAULT 'active',
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );
    `,
    columns: [
      { name: "id", mysqlType: "INT AUTO_INCREMENT PRIMARY KEY", sqliteType: "INTEGER PRIMARY KEY AUTOINCREMENT" },
      { name: "name", mysqlType: "VARCHAR(255) NULL", sqliteType: "TEXT" },
      { name: "email", mysqlType: "VARCHAR(255) NOT NULL UNIQUE", sqliteType: "TEXT NOT NULL UNIQUE" },
      { name: "phone", mysqlType: "VARCHAR(50) NULL", sqliteType: "TEXT" },
      { name: "avatar", mysqlType: "TEXT NULL", sqliteType: "TEXT" },
      { name: "role", mysqlType: "VARCHAR(50) DEFAULT 'customer'", sqliteType: "TEXT DEFAULT 'customer'" },
      { name: "status", mysqlType: "VARCHAR(50) DEFAULT 'active'", sqliteType: "TEXT DEFAULT 'active'" },
      { name: "created_at", mysqlType: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", sqliteType: "TEXT DEFAULT (datetime('now'))" },
      { name: "updated_at", mysqlType: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", sqliteType: "TEXT DEFAULT (datetime('now'))" }
    ]
  },
  user_otps: {
    mysqlCreate: `
      CREATE TABLE IF NOT EXISTS user_otps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        otp VARCHAR(10) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
    sqliteCreate: `
      CREATE TABLE IF NOT EXISTS user_otps (
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
  },
  user_addresses: {
    mysqlCreate: `
      CREATE TABLE IF NOT EXISTS user_addresses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NULL,
        user_email VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        alternate_phone VARCHAR(50) NULL,
        pincode VARCHAR(20) NOT NULL,
        flat_house VARCHAR(255) NOT NULL,
        area_street TEXT NOT NULL,
        landmark VARCHAR(255) NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL DEFAULT 'Telangana',
        address_type VARCHAR(50) DEFAULT 'Home',
        is_default TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
    sqliteCreate: `
      CREATE TABLE IF NOT EXISTS user_addresses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        user_email TEXT NOT NULL,
        full_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        alternate_phone TEXT,
        pincode TEXT NOT NULL,
        flat_house TEXT NOT NULL,
        area_street TEXT NOT NULL,
        landmark TEXT,
        city TEXT NOT NULL,
        state TEXT NOT NULL DEFAULT 'Telangana',
        address_type TEXT DEFAULT 'Home',
        is_default INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now'))
      );
    `,
    columns: [
      { name: "id", mysqlType: "INT AUTO_INCREMENT PRIMARY KEY", sqliteType: "INTEGER PRIMARY KEY AUTOINCREMENT" },
      { name: "user_id", mysqlType: "INT NULL", sqliteType: "INTEGER" },
      { name: "user_email", mysqlType: "VARCHAR(255) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "full_name", mysqlType: "VARCHAR(255) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "phone", mysqlType: "VARCHAR(50) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "alternate_phone", mysqlType: "VARCHAR(50) NULL", sqliteType: "TEXT" },
      { name: "pincode", mysqlType: "VARCHAR(20) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "flat_house", mysqlType: "VARCHAR(255) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "area_street", mysqlType: "TEXT NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "landmark", mysqlType: "VARCHAR(255) NULL", sqliteType: "TEXT" },
      { name: "city", mysqlType: "VARCHAR(100) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "state", mysqlType: "VARCHAR(100) NOT NULL DEFAULT 'Telangana'", sqliteType: "TEXT NOT NULL DEFAULT 'Telangana'" },
      { name: "address_type", mysqlType: "VARCHAR(50) DEFAULT 'Home'", sqliteType: "TEXT DEFAULT 'Home'" },
      { name: "is_default", mysqlType: "TINYINT(1) DEFAULT 0", sqliteType: "INTEGER DEFAULT 0" },
      { name: "created_at", mysqlType: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", sqliteType: "TEXT DEFAULT (datetime('now'))" }
    ]
  },
  wishlists: {
    mysqlCreate: `
      CREATE TABLE IF NOT EXISTS wishlists (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NULL,
        user_email VARCHAR(255) NOT NULL,
        book_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY user_book_uniq (user_email, book_id),
        INDEX idx_user_email (user_email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
    sqliteCreate: `
      CREATE TABLE IF NOT EXISTS wishlists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        user_email TEXT NOT NULL,
        book_id INTEGER NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        UNIQUE(user_email, book_id)
      );
    `,
    columns: [
      { name: "id", mysqlType: "INT AUTO_INCREMENT PRIMARY KEY", sqliteType: "INTEGER PRIMARY KEY AUTOINCREMENT" },
      { name: "user_id", mysqlType: "INT NULL", sqliteType: "INTEGER" },
      { name: "user_email", mysqlType: "VARCHAR(255) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "book_id", mysqlType: "INT NOT NULL", sqliteType: "INTEGER NOT NULL" },
      { name: "created_at", mysqlType: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", sqliteType: "TEXT DEFAULT (datetime('now'))" }
    ]
  },
  coupons: {
    mysqlCreate: `
      CREATE TABLE IF NOT EXISTS coupons (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(50) NOT NULL UNIQUE,
        discount_type VARCHAR(20) DEFAULT 'percentage',
        discount_value DECIMAL(10,2) NOT NULL,
        min_order DECIMAL(10,2) DEFAULT 0,
        max_discount DECIMAL(10,2) NULL,
        status VARCHAR(20) DEFAULT 'active',
        usage_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
    sqliteCreate: `
      CREATE TABLE IF NOT EXISTS coupons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT NOT NULL UNIQUE,
        discount_type TEXT DEFAULT 'percentage',
        discount_value REAL NOT NULL,
        min_order REAL DEFAULT 0,
        max_discount REAL,
        status TEXT DEFAULT 'active',
        usage_count INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now'))
      );
    `,
    columns: [
      { name: "id", mysqlType: "INT AUTO_INCREMENT PRIMARY KEY", sqliteType: "INTEGER PRIMARY KEY AUTOINCREMENT" },
      { name: "code", mysqlType: "VARCHAR(50) NOT NULL UNIQUE", sqliteType: "TEXT NOT NULL UNIQUE" },
      { name: "discount_type", mysqlType: "VARCHAR(20) DEFAULT 'percentage'", sqliteType: "TEXT DEFAULT 'percentage'" },
      { name: "discount_value", mysqlType: "DECIMAL(10,2) NOT NULL", sqliteType: "REAL NOT NULL" },
      { name: "min_order", mysqlType: "DECIMAL(10,2) DEFAULT 0", sqliteType: "REAL DEFAULT 0" },
      { name: "max_discount", mysqlType: "DECIMAL(10,2) NULL", sqliteType: "REAL" },
      { name: "status", mysqlType: "VARCHAR(20) DEFAULT 'active'", sqliteType: "TEXT DEFAULT 'active'" },
      { name: "usage_count", mysqlType: "INT DEFAULT 0", sqliteType: "INTEGER DEFAULT 0" },
      { name: "created_at", mysqlType: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", sqliteType: "TEXT DEFAULT (datetime('now'))" }
    ]
  },
  settings: {
    mysqlCreate: `
      CREATE TABLE IF NOT EXISTS settings (
        key_name VARCHAR(100) PRIMARY KEY,
        value_text TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
    sqliteCreate: `
      CREATE TABLE IF NOT EXISTS settings (
        key_name TEXT PRIMARY KEY,
        value_text TEXT NOT NULL,
        updated_at TEXT DEFAULT (datetime('now'))
      );
    `,
    columns: [
      { name: "key_name", mysqlType: "VARCHAR(100) PRIMARY KEY", sqliteType: "TEXT PRIMARY KEY" },
      { name: "value_text", mysqlType: "TEXT NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "updated_at", mysqlType: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", sqliteType: "TEXT DEFAULT (datetime('now'))" }
    ]
  },
  content_blocks: {
    mysqlCreate: `
      CREATE TABLE IF NOT EXISTS content_blocks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        title VARCHAR(255) NOT NULL,
        subtitle TEXT NULL,
        image MEDIUMTEXT NULL,
        link_url TEXT NULL,
        content LONGTEXT NULL,
        status VARCHAR(20) DEFAULT 'active',
        display_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_type (type)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
    sqliteCreate: `
      CREATE TABLE IF NOT EXISTS content_blocks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        subtitle TEXT,
        image TEXT,
        link_url TEXT,
        content TEXT,
        status TEXT DEFAULT 'active',
        display_order INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now'))
      );
    `,
    columns: [
      { name: "id", mysqlType: "INT AUTO_INCREMENT PRIMARY KEY", sqliteType: "INTEGER PRIMARY KEY AUTOINCREMENT" },
      { name: "type", mysqlType: "VARCHAR(50) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "title", mysqlType: "VARCHAR(255) NOT NULL", sqliteType: "TEXT NOT NULL" },
      { name: "subtitle", mysqlType: "TEXT NULL", sqliteType: "TEXT" },
      { name: "image", mysqlType: "MEDIUMTEXT NULL", sqliteType: "TEXT" },
      { name: "link_url", mysqlType: "TEXT NULL", sqliteType: "TEXT" },
      { name: "content", mysqlType: "LONGTEXT NULL", sqliteType: "TEXT" },
      { name: "status", mysqlType: "VARCHAR(20) DEFAULT 'active'", sqliteType: "TEXT DEFAULT 'active'" },
      { name: "display_order", mysqlType: "INT DEFAULT 0", sqliteType: "INTEGER DEFAULT 0" },
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
  activeHost: null,
  activeDatabase: null,
  activeUser: null,
  lastError: null,

  async query(sql, params = []) {
    const cleanParams = (params || []).map(p => (p === undefined ? null : p));
    if (isMySQL && pool) {
      const [rows] = await pool.query(sql, cleanParams);
      return rows;
    } else {
      const stmt = sqliteDb.prepare(sql);
      return stmt.all(...cleanParams);
    }
  },

  async all(sql, params = []) {
    const cleanParams = (params || []).map(p => (p === undefined ? null : p));
    if (isMySQL && pool) {
      const [rows] = await pool.query(sql, cleanParams);
      return rows;
    } else {
      const stmt = sqliteDb.prepare(sql);
      return stmt.all(...cleanParams);
    }
  },

  async get(sql, params = []) {
    const cleanParams = (params || []).map(p => (p === undefined ? null : p));
    if (isMySQL && pool) {
      const [rows] = await pool.query(sql, cleanParams);
      return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    } else {
      const stmt = sqliteDb.prepare(sql);
      const row = stmt.get(...cleanParams);
      return row || null;
    }
  },

  async run(sql, params = []) {
    const cleanParams = (params || []).map(p => (p === undefined ? null : p));
    if (isMySQL && pool) {
      const [result] = await pool.query(sql, cleanParams);
      return {
        lastInsertRowid: result.insertId,
        insertId: result.insertId,
        changes: result.affectedRows,
        affectedRows: result.affectedRows
      };
    } else {
      const stmt = sqliteDb.prepare(sql);
      const info = stmt.run(...cleanParams);
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
  },

  // Atomic database transaction execution wrapper
  async transaction(callback) {
    if (isMySQL && pool) {
      const connection = await pool.getConnection();
      await connection.beginTransaction();
      try {
        const transDb = {
          isMySQL: true,
          query: async (sql, params = []) => {
            const [rows] = await connection.query(sql, params);
            return rows;
          },
          all: async (sql, params = []) => {
            const [rows] = await connection.query(sql, params);
            return rows;
          },
          get: async (sql, params = []) => {
            const [rows] = await connection.query(sql, params);
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
          },
          run: async (sql, params = []) => {
            const [result] = await connection.query(sql, params);
            return {
              lastInsertRowid: result.insertId,
              insertId: result.insertId,
              changes: result.affectedRows,
              affectedRows: result.affectedRows
            };
          }
        };
        const result = await callback(transDb);
        await connection.commit();
        return result;
      } catch (err) {
        await connection.rollback();
        throw err;
      } finally {
        connection.release();
      }
    } else if (sqliteDb) {
      sqliteDb.exec("BEGIN TRANSACTION;");
      try {
        const result = await callback(db);
        sqliteDb.exec("COMMIT;");
        return result;
      } catch (err) {
        sqliteDb.exec("ROLLBACK;");
        throw err;
      }
    } else {
      return await callback(db);
    }
  }
};

// Initialize Connection & Schema
export async function initDatabase() {
  const isHostinger =
    process.cwd().includes("successbookhub.com") ||
    process.cwd().includes("u803044110") ||
    Boolean(process.env.HOSTINGER) ||
    Boolean(process.env.OPENLITESPEED);
  const isProduction = process.env.NODE_ENV === "production" || isHostinger;
  const forceSqlite = (process.env.USE_SQLITE === "true" || process.env.DB_ENGINE === "sqlite") && !isHostinger;

  if (forceSqlite) {
    console.log("[Database] Local SQLite engine explicitly requested (USE_SQLITE=true).");
    await initSQLite();
  } else {
    // Attempt MySQL connection using multiple candidate hosts and casing variations.
    // On Linux/Hostinger, 127.0.0.1 is required for TCP loopback (localhost resolves to IPv6 ::1 or attempts Unix socket).
    const candidateHosts = [
      "127.0.0.1",
      process.env.DB_HOST && process.env.DB_HOST !== "localhost" ? process.env.DB_HOST : null,
      "localhost"
    ].filter(Boolean);
    const uniqueHosts = [...new Set(candidateHosts)];

    const rawUser = process.env.DB_USER || "u803044110_Successbookhub";
    const candidateUsers = [
      "u803044110_Successbookhub",
      rawUser.replace(/^U(\d+)/i, "u$1"),
      rawUser.toLowerCase(),
      rawUser
    ];
    const uniqueUsers = [...new Set(candidateUsers)];

    const rawDb = process.env.DB_NAME || "u803044110_Successbookhub";
    const candidateDbs = [
      "u803044110_Successbookhub",
      rawDb.replace(/^U(\d+)/i, "u$1"),
      rawDb.toLowerCase(),
      rawDb
    ];
    const uniqueDbs = [...new Set(candidateDbs)];

    const candidatePasswords = [
      process.env.DB_PASSWORD,
      "Successbookhub@123"
    ].filter(Boolean);
    const uniquePasswords = [...new Set(candidatePasswords)];

    const port = Number(process.env.DB_PORT) || 3306;

    let connected = false;
    let lastErr = null;

    connectionAttempt:
    for (const host of uniqueHosts) {
      for (const user of uniqueUsers) {
        for (const database of uniqueDbs) {
          for (const password of uniquePasswords) {
            try {
              console.log(`[Database] Attempting MySQL connection to ${database} as ${user} on ${host}:${port}...`);
              const poolConfig = {
                host,
                user,
                password,
                database,
                port,
                connectTimeout: 4000,
                waitForConnections: true,
                connectionLimit: 15,
                queueLimit: 0,
                enableKeepAlive: true,
                keepAliveInitialDelay: 0,
                charset: "utf8mb4"
              };

              const testPool = mysql.createPool(poolConfig);
              const connection = await testPool.getConnection();
              connection.release();

              pool = testPool;
              isMySQL = true;
              db.isMySQL = true;
              db.activeHost = host;
              db.activeDatabase = database;
              db.activeUser = user;
              db.lastError = null;
              connected = true;
              console.log(`[Database] MySQL connected successfully: ${database} as ${user} on ${host}:${port}`);
              break connectionAttempt;
            } catch (err) {
              lastErr = err;
              console.warn(`[Database] MySQL attempt failed (${user}@${host}):`, err.message);
            }
          }
        }
      }
    }

    if (!connected) {
      db.lastError = lastErr ? lastErr.message : "Unknown connection error";
      console.warn(`[Database] All MySQL connection candidates failed (${db.lastError}). Initializing SQLite fallback...`);
      await initSQLite();
    }
  }

  // Create tables & auto-migrate columns safely
  await setupSchema();

  // Check and seed initial data if tables are empty
  await seedInitialData();

  // If connected to MySQL, sync any categories/subcategories from local SQLite to MySQL so zero data is lost!
  if (isMySQL) {
    await syncSqliteToMySQL();
  }
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

  // 3. Upgrade existing MySQL columns storing media/images to MEDIUMTEXT
  if (isMySQL && pool) {
    const mediumTextUpgrades = [
      { table: "categories", column: "image" },
      { table: "sub_categories", column: "image" },
      { table: "books", column: "cover" },
      { table: "books", column: "image_2" },
      { table: "content_blocks", column: "image" }
    ];
    for (const item of mediumTextUpgrades) {
      try {
        await pool.query(`ALTER TABLE \`${item.table}\` MODIFY COLUMN \`${item.column}\` MEDIUMTEXT`);
        console.log(`[Auto-Migration] Verified/Upgraded ${item.table}.${item.column} to MEDIUMTEXT in MySQL.`);
      } catch (err) {
        // Table or column already modified or not yet initialized
      }
    }
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
    } else {
      // Ensure Fiction category is present in MySQL categories table
      const fictionExists = await db.get("SELECT id FROM categories WHERE LOWER(name) IN ('fiction', 'ficton')");
      if (!fictionExists) {
        console.log("[Database] Ensuring Fiction category is present in database...");
        const res = await db.run(
          "INSERT INTO categories (name, slug, description, image, status) VALUES (?, ?, ?, ?, 'active')",
          [
            "Fiction",
            "fiction",
            "Imaginative stories featuring memorable characters, compelling plots, and fictional worlds.",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop"
          ]
        );
        const catId = res.lastInsertRowid;
        if (catId) {
          await db.run(
            "INSERT INTO sub_categories (category_id, name, slug, description, image, status) VALUES (?, ?, ?, ?, ?, 'active')",
            [
              catId,
              "Contemporary Fiction",
              "contemporary-fiction",
              "Modern literature exploring the nuances of human experience.",
              "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"
            ]
          );
        }
      }

      // Check and repair any category with corrupted truncated base64 image (length >= 65530)
      try {
        const corruptedCategories = await db.all(
          "SELECT id, name, image FROM categories WHERE image LIKE 'data:image/%' AND LENGTH(image) >= 65530"
        );
        for (const cat of (corruptedCategories || [])) {
          await db.run("UPDATE categories SET image = ? WHERE id = ?", [
            "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800&auto=format&fit=crop",
            cat.id
          ]);
          console.log(`[Database] Repaired corrupted truncated image for category "${cat.name}" (id: ${cat.id})`);
        }
      } catch (e) {
        // Table or query check
      }
    }

    const bookCountRow = await db.get("SELECT COUNT(*) as count FROM books");
    const bookCount = Number(bookCountRow?.count || 0);
    if (bookCount === 0) {
      console.log("[Database] Seeding default books and reviews catalog...");
      await seedBooksAndReviews();
    }

    const couponCountRow = await db.get("SELECT COUNT(*) as count FROM coupons");
    const couponCount = Number(couponCountRow?.count || 0);
    if (couponCount === 0) {
      console.log("[Database] Seeding default coupons...");
      await seedCoupons();
    }

    const settingsCountRow = await db.get("SELECT COUNT(*) as count FROM settings");
    const settingsCount = Number(settingsCountRow?.count || 0);
    if (settingsCount === 0) {
      console.log("[Database] Seeding default store settings...");
      await seedSettings();
    }

    const contentCountRow = await db.get("SELECT COUNT(*) as count FROM content_blocks");
    const contentCount = Number(contentCountRow?.count || 0);
    if (contentCount === 0) {
      console.log("[Database] Seeding default content blocks...");
      await seedContentBlocks();
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
    },
    {
      name: "Fiction",
      slug: "fiction",
      description: "Imaginative stories featuring memorable characters, compelling plots, and fictional worlds.",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
      subCategories: [
        { name: "Contemporary Fiction", slug: "contemporary-fiction", description: "Modern literature exploring the nuances of human experience.", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop" },
        { name: "Literary Fiction", slug: "literary-fiction", description: "Character-driven narratives with rich stylistic prose.", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop" }
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

// Synchronize any categories/sub-categories from local SQLite database into MySQL
async function syncSqliteToMySQL() {
  try {
    const dataDir = path.join(__dirname, "../../data");
    const dbPath = path.join(dataDir, "successbookhub.db");
    if (!fs.existsSync(dbPath)) return;

    const { DatabaseSync } = await import("node:sqlite");
    const localDb = new DatabaseSync(dbPath);

    // 1. Sync Categories from SQLite to MySQL
    try {
      const sqliteCategories = localDb.prepare("SELECT * FROM categories").all();
      for (const cat of sqliteCategories) {
        const existing = await db.get(
          "SELECT id FROM categories WHERE LOWER(name) = LOWER(?) OR slug = ?",
          [cat.name, cat.slug]
        );
        if (!existing) {
          console.log(`[Sync] Migrating category "${cat.name}" from SQLite to MySQL...`);
          await db.run(
            "INSERT INTO categories (name, slug, description, image, status) VALUES (?, ?, ?, ?, ?)",
            [cat.name, cat.slug, cat.description || "", cat.image || "", cat.status || "active"]
          );
        }
      }
    } catch (err) {
      console.warn("[Sync] Category sync warning:", err.message);
    }

    // 2. Sync Sub-Categories from SQLite to MySQL
    try {
      const sqliteSubs = localDb.prepare("SELECT * FROM sub_categories").all();
      for (const sub of sqliteSubs) {
        let targetCatId = sub.category_id;
        try {
          const parentRow = localDb.prepare("SELECT name FROM categories WHERE id = ?").get(sub.category_id);
          if (parentRow) {
            const parentInMySQL = await db.get("SELECT id FROM categories WHERE LOWER(name) = LOWER(?)", [parentRow.name]);
            if (parentInMySQL) targetCatId = parentInMySQL.id;
          }
        } catch {}

        const existingSub = await db.get(
          "SELECT id FROM sub_categories WHERE (LOWER(name) = LOWER(?) OR slug = ?) AND category_id = ?",
          [sub.name, sub.slug, targetCatId]
        );
        if (!existingSub) {
          console.log(`[Sync] Migrating sub-category "${sub.name}" from SQLite to MySQL...`);
          await db.run(
            "INSERT INTO sub_categories (category_id, name, slug, description, image, status) VALUES (?, ?, ?, ?, ?, ?)",
            [targetCatId, sub.name, sub.slug, sub.description || "", sub.image || "", sub.status || "active"]
          );
        }
      }
    } catch (err) {
      console.warn("[Sync] SubCategory sync warning:", err.message);
    }

    console.log("[Sync] SQLite to MySQL migration check completed.");
  } catch (err) {
    console.error("[Sync] Error syncing SQLite data to MySQL:", err.message);
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

async function seedCoupons() {
  const initialCoupons = [
    { code: "WELCOME100", discount_type: "flat", discount_value: 100, min_order: 599, max_discount: 100, status: "active", usage_count: 142 },
    { code: "FESTIVE20", discount_type: "percentage", discount_value: 20, min_order: 899, max_discount: 300, status: "active", usage_count: 89 },
    { code: "FREESHIP", discount_type: "flat", discount_value: 49, min_order: 499, max_discount: 49, status: "active", usage_count: 310 },
    { code: "SUCCESS10", discount_type: "percentage", discount_value: 10, min_order: 349, max_discount: 150, status: "active", usage_count: 64 }
  ];

  for (const c of initialCoupons) {
    await db.run(
      `INSERT INTO coupons (code, discount_type, discount_value, min_order, max_discount, status, usage_count)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [c.code, c.discount_type, c.discount_value, c.min_order, c.max_discount, c.status, c.usage_count]
    );
  }
}

async function seedSettings() {
  const initialSettings = [
    { key: "store_name", val: "Success Book Hub" },
    { key: "store_tagline", val: "Curated Books & Timeless Stories" },
    { key: "store_email", val: "contact@successbookhub.com" },
    { key: "store_phone", val: "+91 98765 43210" },
    { key: "whatsapp_number", val: "919876543210" },
    { key: "free_delivery_min", val: "799" },
    { key: "standard_delivery_fee", val: "49" },
    { key: "store_gstin", val: "36AABCS1429B1Z8" },
    { key: "store_address", val: "42, College Street, Book District, Kolkata, WB 700073, India" },
    { key: "store_hours", val: "Mon – Sat: 10:00 AM – 8:30 PM" },
    { key: "announcement", val: "Free Pan-India Delivery on orders above ₹799 • Order directly online or via WhatsApp!" }
  ];

  for (const s of initialSettings) {
    await db.run(
      `INSERT INTO settings (key_name, value_text) VALUES (?, ?)`,
      [s.key, s.val]
    );
  }
}

async function seedContentBlocks() {
  const initialBlocks = [
    {
      type: "hero-banners",
      title: "Discover Stories That Shape Your Mind",
      subtitle: "Handpicked classics, bestselling philosophy, and transformative self-help delivered across India.",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop",
      link_url: "/shop",
      status: "active",
      display_order: 1
    },
    {
      type: "promo-banners",
      title: "College Street Literary Curation",
      subtitle: "Experience the magic of historic bookshops from the comfort of your home.",
      image: "https://images.unsplash.com/photo-1507842229450-705295c5520e?q=80&w=800&auto=format&fit=crop",
      link_url: "/shop",
      status: "active",
      display_order: 2
    },
    {
      type: "testimonials",
      title: "Reader Delight",
      subtitle: "Meera Roy, Kolkata",
      content: "Success Book Hub sends books with unmatched care. Beautiful covers, crisp paper quality and super fast dispatch!",
      status: "active",
      display_order: 1
    },
    {
      type: "blogs",
      title: "10 Books That Will Redefine How You Think in 2026",
      subtitle: "Curated by Success Book Hub Editorial Desk",
      content: "From Marcus Aurelius to James Clear, here are the essential reads for building lifelong clarity and resilience.",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop",
      link_url: "/about",
      status: "active",
      display_order: 1
    }
  ];

  for (const b of initialBlocks) {
    await db.run(
      `INSERT INTO content_blocks (type, title, subtitle, image, link_url, content, status, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [b.type, b.title, b.subtitle, b.image, b.link_url, b.content || "", b.status, b.display_order]
    );
  }
}

