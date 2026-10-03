# Hostinger Business Hosting Deployment Guide (Git & MySQL / phpMyAdmin)

This project is configured to automatically manage and migrate MySQL database tables on **Hostinger Business Hosting** with zero manual SQL imports needed.

---

## 🌟 Key Features of the Database Setup

1. **Auto-Table Creation**: When you deploy and the backend starts, it runs `CREATE TABLE IF NOT EXISTS` for all 7 tables:
   - `categories` (Main categories)
   - `sub_categories` (Sub-categories with Foreign Keys)
   - `books` (Catalog with ratings, stock, discounts)
   - `orders` (Orders with customer details, item JSON, status)
   - `reviews` (Book reviews and ratings)
   - `contacts` (Customer contact inquiries)
   - `newsletter` (Email subscribers)
2. **Auto-Column Migration**: When you add new columns in code in the future and redeploy, the backend automatically detects missing columns using MySQL's `INFORMATION_SCHEMA` and executes `ALTER TABLE ... ADD COLUMN` without deleting or corrupting your existing data!
3. **Auto-Seeding**: If the database is freshly created and empty, it automatically seeds default categories, subcategories, and books into your Hostinger phpMyAdmin database.
4. **Zero-Config Local Fallback**: If MySQL credentials are not provided locally, it falls back to local SQLite automatically so you can test anytime without setup.

---

## 🛠️ Step-by-Step Hostinger Deployment Instructions

### Step 1: Create MySQL Database in Hostinger hPanel
1. Log in to your **Hostinger hPanel**.
2. Go to **Databases** ➔ **MySQL Databases**.
3. Create a new database:
   - **Database Name**: e.g., `u123456789_successbooks`
   - **Username**: e.g., `u123456789_dbuser`
   - **Password**: Enter a strong password (copy this).
4. Click **Create**. Note down the Database Name, User, and Password.

---

### Step 2: Set Up Git in Hostinger
1. In Hostinger hPanel, go to **Advanced** ➔ **GIT**.
2. Click **Create a New Repository**:
   - **Repository URL**: `https://github.com/successboookhub-commits/Sucess-Books-new.git`
   - **Branch**: `main`
   - **Install path**: e.g., `public_html` or `app`
3. Click **Create** and **Deploy**.
4. Whenever you push to GitHub, you just click **Auto-Deployment** or click **Deploy** in Hostinger Git to pull the latest changes.

---

### Step 3: Configure Node.js Application in Hostinger
1. In Hostinger hPanel, search and click on **Node.js** (or Node.js App Manager).
2. Create/Configure Node.js Application:
   - **Node.js Version**: 18.x, 20.x, or 22.x
   - **Application Root**: `Backend` (or `/home/uXXXXXXX/public_html/Backend`)
   - **Application Startup File**: `src/server.js`
   - **Application URL**: Select your domain or subdomain (e.g. `api.yourdomain.com` or `yourdomain.com`)
3. Add **Environment Variables** in the Node.js settings or create `.env` inside `Backend/`:
   ```env
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://yourdomain.com
   WHATSAPP_NUMBER=919876543210

   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=u123456789_successbooks
   DB_USER=u123456789_dbuser
   DB_PASSWORD=your_mysql_password
   ```
4. Click **NPM Install** (or run `npm install` in Terminal).
5. Click **Restart** Application.

---

### Step 4: Verify Tables in phpMyAdmin
1. In Hostinger hPanel, go to **Databases** ➔ **phpMyAdmin** and open your database.
2. You will see all tables (`categories`, `sub_categories`, `books`, `orders`, `reviews`, `contacts`, `newsletter`) already created and populated!
3. Visit `https://your-api-domain.com/api/health` to confirm:
   ```json
   {
     "status": "ok",
     "service": "Success Book Hub API",
     "dbEngine": "MySQL (phpMyAdmin)"
   }
   ```

---

## 🔄 Future Updates (Adding New Tables / Columns)
1. Add new table or column in `Backend/src/db/database.js` under `SCHEMA_DEFINITIONS`.
2. Commit and push:
   ```bash
   git add .
   git commit -m "Add new table / column"
   git push origin main
   ```
3. In Hostinger, pull/redeploy Git and restart Node.js.
4. Hostinger MySQL will automatically create the new table or column without touching existing records!
