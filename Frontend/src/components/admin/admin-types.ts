export type AdminSection =
  | "dashboard"
  // Catalog
  | "categories"
  | "sub-categories"
  | "authors"
  | "publishers"
  | "books"
  | "inventory"
  // Sales
  | "orders"
  | "payments"
  | "coupons"
  // Customers
  | "users"
  | "addresses"
  | "reviews"
  // Content
  | "hero-banners"
  | "promo-banners"
  | "testimonials"
  | "blogs"
  // Reports
  | "sales-report"
  | "revenue-report"
  | "inventory-report"
  | "customer-report"
  // Settings
  | "website-settings"
  | "delivery-charges"
  | "tax-settings"
  | "social-links"
  | "contact-details"
  | "email-settings"
  // Admin Management
  | "admin-users"
  | "roles-permissions"
  | "activity-logs";

export type AdminMenuCategory = {
  id: string;
  title: string;
  icon: any;
  items: {
    id: AdminSection;
    label: string;
    badge?: string | number;
  }[];
};
