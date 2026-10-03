# Hostinger Business Hosting Deployment Guide (successbookhub.com)

This project is configured to automatically manage and migrate MySQL database tables on **Hostinger Business Hosting** with zero manual SQL imports needed.

---

## 🌟 Key Features of the Database Setup

1. **Auto-Table Creation**: When you deploy and the backend starts, it runs `CREATE TABLE IF NOT EXISTS` for all 7 tables in MySQL:
   - `categories` (Main categories)
   - `sub_categories` (Sub-categories with Foreign Keys)
   - `books` (Catalog with ratings, stock, discounts)
   - `orders` (Orders with customer details, item JSON, status)
   - `reviews` (Book reviews and ratings)
   - `contacts` (Customer contact inquiries)
   - `newsletter` (Email subscribers)
2. **Auto-Column Migration**: When you add new columns in code in the future and redeploy, the backend automatically detects missing columns using MySQL's `INFORMATION_SCHEMA` and executes `ALTER TABLE ... ADD COLUMN` without deleting or corrupting your existing data!
3. **Auto-Seeding**: If the database is freshly created and empty, it automatically seeds default categories, subcategories, and books into your Hostinger phpMyAdmin database.
4. **Zero-Config Local Fallback**: If MySQL server is offline locally, it falls back to local SQLite automatically so you can develop anytime without setup.

---

## 🔑 Your Hostinger MySQL Database Credentials

| Setting | Value |
| :--- | :--- |
| **MySQL Host** | `localhost` |
| **MySQL Port** | `3306` |
| **Database Name** | `u803044110_Successbookhub` |
| **Database User** | `u803044110_Successbookhub` |
| **Database Password** | `Successbookhub@123` |

---

## 🛠️ Step-by-Step Hostinger Deployment Instructions

### Step 1: Create Database in Hostinger hPanel
*(As per your screenshot)*:
1. Make sure you click the purple **Create** button in **Databases** ➔ **Management** with:
   - Database name: `Successbookhub` (`u803044110_Successbookhub`)
   - Username: `Successbookhub` (`u803044110_Successbookhub`)
   - Password: `Successbookhub@123`

---

### Step 2: Set Up Git in Hostinger
1. In Hostinger hPanel, go to **Advanced** ➔ **GIT**.
2. Click **Create a New Repository**:
   - **Repository URL**: `https://github.com/successboookhub-commits/Sucess-Books-new.git`
   - **Branch**: `main`
   - **Install path**: e.g., `public_html` or `app`
3. Click **Create** and **Deploy**.
4. Enable **Auto-Deployment** or click **Deploy** whenever you push updates.

---

### Step 3: Configure Node.js Application in Hostinger
1. In Hostinger hPanel, search and open **Node.js** (or Node.js App Manager).
2. Configure your Node.js application:
   - **Node.js Version**: 18.x, 20.x, or 22.x
   - **Application Root**: `Backend` (or `/home/u803044110/public_html/Backend`)
   - **Application Startup File**: `src/server.js`
   - **Application URL**: `successbookhub.com` (or `api.successbookhub.com`)
3. Add these **Environment Variables** in the Node.js settings (or inside `Backend/.env`):
   ```env
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://successbookhub.com
   WHATSAPP_NUMBER=919876543210

   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=u803044110_Successbookhub
   DB_USER=u803044110_Successbookhub
   DB_PASSWORD=Successbookhub@123
   ```
4. Click **NPM Install** (or `npm install mysql2`).
5. Click **Restart** Application.

---

### Step 4: Verify Tables in phpMyAdmin
1. In Hostinger hPanel, go to **Databases** ➔ **phpMyAdmin** and open `u803044110_Successbookhub`.
2. All 7 tables will be created automatically with all seeded books, categories, and initial data!
3. Visit `https://successbookhub.com/api/health` to confirm:
   ```json
   {
     "status": "ok",
     "service": "Success Book Hub API",
     "dbEngine": "MySQL (phpMyAdmin)"
   }
   ```
