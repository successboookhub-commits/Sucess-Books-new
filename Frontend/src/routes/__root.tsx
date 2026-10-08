import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";
import { AuthProvider } from "@/lib/auth";
import { UserAuthProvider } from "@/lib/user-auth";
import { WishlistProvider } from "@/lib/wishlist";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { UserLoginModal } from "@/components/auth/user-login-modal";
import { StickyContactWidget } from "@/components/sticky-contact-widget";
import { BookOpen, Home, MessageSquare, ShoppingBag } from "lucide-react";


function NotFoundComponent() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-background px-4 py-16">
      <div className="max-w-md w-full text-center space-y-5 bg-card p-8 sm:p-10 rounded-3xl border border-border shadow-xl">
        <div className="mx-auto h-20 w-20 rounded-3xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg font-black ring-4 ring-primary/20">
          <BookOpen className="h-10 w-10" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Error 404</span>
          <h1 className="mt-1 text-3xl sm:text-4xl font-bold text-foreground font-display">
            Page Not Found
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            The page or shelf you are looking for has been moved, removed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 h-11 text-xs font-bold text-primary-foreground transition-all hover:bg-primary/90 shadow-xs btn-shimmer gap-2"
          >
            <Home className="h-4 w-4" /> Go to Home
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 h-11 text-xs font-bold text-foreground transition-colors hover:bg-secondary gap-2"
          >
            <ShoppingBag className="h-4 w-4" /> Browse Catalog
          </Link>
        </div>

        <div className="pt-2 border-t border-border/50 text-[11px] text-muted-foreground">
          Need help finding a book?{" "}
          <Link to="/contact" className="text-amber-600 font-bold hover:underline">
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground font-display">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const bookstoreSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BookStore",
  "name": "Success Book Hub",
  "image": "https://successbookhub.com/favicon.svg",
  "url": "https://successbookhub.com",
  "telephone": "+91-9876543210",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "42, College Street, Book District",
    "addressLocality": "Kolkata",
    "addressRegion": "West Bengal",
    "postalCode": "700073",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "22.5744",
    "longitude": "88.3629"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "10:00",
    "closes": "20:30"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://successbookhub.com/shop?query={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Success Book Hub — Curated Books & Timeless Stories" },
      { name: "description", content: "Browse fiction, classics, poetry, self-help, and academic books. Order online or on WhatsApp with fast Pan-India delivery." },
      { name: "author", content: "Success Book Hub" },
      { property: "og:site_name", content: "Success Book Hub" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "alternate icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: bookstoreSchema,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const context = Route.useRouteContext();
  const queryClient = context?.queryClient || new QueryClient();
  const routerState = useRouterState();
  const isAdmin = Boolean(routerState?.location?.pathname?.startsWith("/admin"));

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserAuthProvider>
          <WishlistProvider>
            <CartProvider>
              <div className="min-h-screen w-full relative flex flex-col">
                {!isAdmin && <SiteHeader />}
                <div className="flex-1 w-full max-w-[100vw] overflow-x-clip">
                  <Outlet />
                </div>
                {!isAdmin && <SiteFooter />}
                {!isAdmin && <StickyContactWidget />}
                <UserLoginModal />
                <Toaster richColors position="top-right" closeButton />
              </div>
            </CartProvider>
          </WishlistProvider>
        </UserAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
