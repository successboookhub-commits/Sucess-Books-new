import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { STORE } from "@/lib/books";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Success Book Hub" },
      { name: "description", content: "Privacy policy for Success Book Hub. Learn how we handle your order information, delivery addresses, and personal data." },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-5">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Store
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-xs">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Privacy Policy</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Last updated: October 2026</p>
            </div>
          </div>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-3.5 leading-relaxed text-xs sm:text-sm">
          <section className="space-y-2 bg-card p-4 sm:p-5 rounded-2xl border border-border">
            <h2 className="text-base font-bold text-foreground">1. Introduction</h2>
            <p>
              At <strong>{STORE.name}</strong>, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy describes how we collect, use, and protect your information when you browse our website, place orders, or contact us via WhatsApp.
            </p>
          </section>

          <section className="space-y-2 bg-card p-4 sm:p-5 rounded-2xl border border-border">
            <h2 className="text-base font-bold text-foreground">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Contact Information:</strong> Your name, phone number, email address, and delivery shipping address when placing book orders or inquiries.</li>
              <li><strong>Order Data:</strong> Details of titles purchased, quantities, pricing, and invoice records for GST compliance.</li>
              <li><strong>Technical Information:</strong> Standard browser user-agent and log information to ensure web security and prevent malicious traffic.</li>
            </ul>
          </section>

          <section className="space-y-2 bg-card p-4 sm:p-5 rounded-2xl border border-border">
            <h2 className="text-base font-bold text-foreground">3. How We Use Your Data</h2>
            <p>We use your information exclusively to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Process, dispatch, and track your book packages with our courier partners.</li>
              <li>Send automated order confirmations, tax invoices, and shipping updates via SMS or WhatsApp.</li>
              <li>Respond promptly to customer support requests and book inquiries.</li>
            </ul>
            <p className="font-semibold text-foreground mt-2">
              We never sell, rent, or trade your personal data to third-party advertisers.
            </p>
          </section>

          <section className="space-y-2 bg-card p-4 sm:p-5 rounded-2xl border border-border">
            <h2 className="text-base font-bold text-foreground">4. Payment Security</h2>
            <p>
              Online transactions are securely processed through encrypted UPI gateways and certified payment gateways. We never store credit/debit card numbers or CVV credentials on our servers.
            </p>
          </section>

          <section className="space-y-2 bg-card p-4 sm:p-5 rounded-2xl border border-border">
            <h2 className="text-base font-bold text-foreground">5. Contact Information</h2>
            <p>
              If you have any questions or data removal requests regarding this policy, please contact our Data Protection Officer at:
            </p>
            <p className="text-foreground font-semibold">
              {STORE.name}<br />
              Email: {STORE.email}<br />
              Phone: {STORE.phone}<br />
              Address: {STORE.address}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
