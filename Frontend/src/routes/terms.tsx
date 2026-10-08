import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, ArrowLeft, Truck, RefreshCw, ShieldCheck } from "lucide-react";
import { STORE } from "@/lib/books";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Success Book Hub" },
      { name: "description", content: "Terms of service, shipping policies, and replacement terms for Success Book Hub." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
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
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Terms & Conditions</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Effective: October 2026</p>
            </div>
          </div>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-3.5 leading-relaxed text-xs sm:text-sm">
          <section className="space-y-2 bg-card p-4 sm:p-5 rounded-2xl border border-border">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> 1. Overview & Catalog Integrity
            </h2>
            <p>
              By accessing or purchasing from <strong>{STORE.name}</strong>, you agree to comply with these terms. All books listed on our website are guaranteed original publisher prints. Cover designs or edition reprints may vary slightly depending on distributor batches.
            </p>
          </section>

          <section className="space-y-2 bg-card p-4 sm:p-5 rounded-2xl border border-border">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" /> 2. Pan-India Shipping & Delivery
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Orders with a subtotal of ₹499 and above qualify for <strong>FREE Delivery</strong> across India.</li>
              <li>A nominal flat delivery charge of ₹49 applies to orders under ₹499.</li>
              <li>Orders placed before 2:00 PM are typically dispatched on the same business day from our Kolkata distribution center.</li>
              <li>Estimated transit times: Metro cities (2–3 days), Non-metro locations (4–6 business days).</li>
            </ul>
          </section>

          <section className="space-y-2 bg-card p-4 sm:p-5 rounded-2xl border border-border">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-primary" /> 3. Replacement & Return Policy
            </h2>
            <p>
              We take utmost care in packaging every book using moisture-resistant bubble wraps. However, if your book arrives in damaged condition, defective binding, or with missing pages:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Contact us on WhatsApp ({STORE.phone}) within <strong>7 days</strong> of delivery with your Order ID and photo of the defect.</li>
              <li>We will arrange a free replacement dispatched with priority tracking, or issue a 100% full refund to your original payment mode.</li>
            </ul>
          </section>

          <section className="space-y-2 bg-card p-4 sm:p-5 rounded-2xl border border-border">
            <h2 className="text-base font-bold text-foreground">4. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of India. Any disputes arising in connection with orders shall be subject to the exclusive jurisdiction of the courts in Kolkata, West Bengal.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
