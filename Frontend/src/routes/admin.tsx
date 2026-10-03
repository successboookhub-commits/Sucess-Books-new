import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminViews } from "@/components/admin/admin-views";
import { type AdminSection } from "@/components/admin/admin-types";

export const Route = createFileRoute("/admin")({
  validateSearch: (search: Record<string, unknown>): { tab?: AdminSection } => ({
    tab: typeof search.tab === "string" ? (search.tab as AdminSection) : undefined,
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
  const searchParams = Route.useSearch();
  const [activeSection, setActiveSection] = useState<AdminSection>(searchParams.tab || "dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
