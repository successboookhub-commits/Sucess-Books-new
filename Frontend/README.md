# Success Book Hub

A modern, responsive e-commerce bookstore with rich aesthetics (maroon, gold, cream), interactive book previews, reader reviews, direct two-step checkout, real-time order tracking, and WhatsApp order synchronization.

## Features
- **Curated Catalogue**: Browse by categories (Fiction, Classics, Poetry, Non-fiction, Children, Self-help) with live search and price/rating sorting.
- **Book Preview & Reviews**: Modal dialogs showing book summaries, stock counts, and verified reader reviews, plus instant "Write a Review" capability.
- **Two-Stage Checkout**: Bag summary with free delivery progress bar (orders >= ₹799) and delivery address details.
- **Order Tracking**: Real-time status lookup using auto-generated order IDs (`SBH-XXXX`).
- **Store Manager Console**: Admin dashboard to manage orders, update fulfillment statuses, and add new books to the inventory.
- **WhatsApp Integration**: Instant 1-click order transmission directly to the bookstore's WhatsApp number.

## Getting Started

### 1. Start Backend API
```sh
cd ../Backend
npm install
npm start
```
The backend will run on `http://localhost:5000`.

### 2. Start Frontend
```sh
npm install
npm run dev
```
The frontend will run on `http://localhost:8080`.
