import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminViews } from "@/components/admin/admin-views";
import { type AdminSection } from "@/components/admin/admin-types";
import { useAdminAuth } from "@/lib/auth";
import { ShieldAlert, LogIn, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  validateSearch: (search: Record<string, unknown>): { tab?: AdminSection | undefined } => ({
    tab: typeof search["tab"] === "string" ? (search["tab"] as AdminSection) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Admin Portal — Success Book Hub" },
      { name: "description", content: "Comprehensive bookstore control panel, inventory, sales, and analytics." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayoutPage,
});

function AdminLayoutPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAdminAuth();

  const searchParams = Route.useSearch();
  const [activeSection, setActiveSection] = useState<AdminSection>(searchParams.tab || "dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-6 w-6 animate-spin text-primary" />
          <p className="text-xs text-muted-foreground font-semibold">Verifying admin credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center shadow-lg space-y-6">
          <div className="h-16 w-16 mx-auto rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-display text-foreground">Access Restricted</h2>
            <p className="text-xs text-muted-foreground">
              You must be authenticated with a verified administrator OTP session to access the Store Management Portal.
            </p>
          </div>
          <Button asChild className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold">
            <Link to="/login">
              <LogIn className="h-4 w-4 mr-2" /> Proceed to Admin Login
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex text-foreground">
      {/* Left Sidebar (Desktop persistent + Mobile drawer) */}
      <AdminSidebar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <AdminHeader
          activeSection={activeSection}
          onOpenMobileSidebar={() => setMobileOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Dynamic Content Panels */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <AdminViews
            activeSection={activeSection}
            searchQuery={searchQuery}
            onNavigateSection={setActiveSection}
          />
        </main>
      </div>
    </div>
  );
}

