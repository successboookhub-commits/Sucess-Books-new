import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STORE, WHATSAPP_NUMBER } from "@/lib/books";
import { api } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Success Book Hub" },
      {
        name: "description",
        content: "Find our Kolkata bookstore, call us, or message us on WhatsApp. We assist every book lover.",
      },
      { property: "og:title", content: "Contact Us — Success Book Hub" },
      {
        property: "og:description",
        content: "Address, phone, WhatsApp and opening hours for Success Book Hub.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();
    const cleanMessage = message.trim();

    if (!cleanName || cleanName.length < 2) {
      toast.error("Please enter a valid name (at least 2 characters).");
      return;
    }

    if (!cleanEmail && !cleanPhone) {
      toast.error("Please provide either your phone number or email address so we can reply.");
      return;
    }

    if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (cleanPhone && !/^\+?[0-9\s-]{8,15}$/.test(cleanPhone)) {
      toast.error("Please enter a valid phone number (at least 8-10 digits).");
      return;
    }

    if (!cleanMessage || cleanMessage.length < 5) {
      toast.error("Please enter your message (at least 5 characters).");
      return;
    }

    setSubmitting(true);
    try {
      await api.sendContactMessage({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        message: cleanMessage,
      });

      setSent(true);
      toast.success("Thank you! Your message has been saved. We will contact you soon.");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  const sendWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Success Book Hub! My name is ${name || "a reader"}.\n\n${message || "I have a question about books / my order."}`
  )}`;

  return (
    <main className="min-h-screen bg-background">
      {/* 1. Header Section (Left-Aligned, Tight Gaps) */}
      <section className="paper-texture border-b border-border bg-gradient-to-b from-amber-50/20 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:py-7 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            Get in Touch
          </p>
          <h1 className="mt-1.5 font-display text-2xl sm:text-3xl lg:text-4xl text-foreground font-bold">
            Contact Success Book Hub
          </h1>
          <p className="mt-2 max-w-4xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
            Looking for a specific title, bulk book orders, custom recommendations, or order inquiries? Reach out to our College Street booksellers — we reply promptly.
          </p>
        </div>
      </section>

      {/* 2. Content Grid (2 Columns, Tightened Padding & Clean Cards) */}
      <section className="mx-auto grid max-w-7xl gap-5 sm:gap-6 px-4 py-5 sm:py-7 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:px-8 items-start">
        {/* Left Column: Direct Contact Info & Map */}
        <div className="space-y-3">
          {[
            [MapPin, "Visit Our Bookstore", STORE.address, "College Street, Kolkata"],
            [Phone, "Phone & Support", STORE.phone, "Available 10 AM – 8:30 PM"],
            [Mail, "Official Email", STORE.email, "For general queries & bulk inquiries"],
            [Clock, "Opening Hours", STORE.hours, "Open Monday through Saturday"],
          ].map(([Icon, title, text, sub]) => {
            const IconComponent = Icon as typeof MapPin;
            return (
              <div
                key={title as string}
                className="flex items-start gap-3.5 rounded-2xl border border-border/80 bg-card p-4 shadow-xs hover:border-amber-300 hover:shadow-md transition-all"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-400/15 text-amber-700 dark:text-amber-400 font-bold border border-amber-300/40">
                  <IconComponent className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base text-foreground font-bold leading-tight">
                    {title as string}
                  </h3>
                  <p className="mt-0.5 text-xs text-foreground font-semibold leading-relaxed">
                    {text as string}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 font-normal">
                    {sub as string}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Map Preview (Embedded, Rounded) */}
          <div className="overflow-hidden rounded-2xl border border-border/80 shadow-xs bg-muted/20">
            <iframe
              title="Map to Success Book Hub"
              src="https://www.google.com/maps?q=College+Street,+Kolkata&output=embed"
              className="h-48 w-full border-0"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-7 shadow-xs">
          <div className="text-left space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              Direct Inquiry
            </p>
            <h2 className="font-display text-xl sm:text-2xl text-foreground font-bold">
              Send an Inquiry or Message
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Fill in your details below and our team will get back to you promptly.
            </p>
          </div>

          {sent ? (
            <div className="mt-6 text-center p-6 sm:p-8 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 space-y-3">
              <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
              <h3 className="font-display text-xl font-bold text-foreground">Message Dispatched!</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                We have safely received your note. A member of our bookstore team will reply shortly.
              </p>
              <Button
                variant="outline"
                className="rounded-full mt-2 font-bold cursor-pointer"
                onClick={() => setSent(false)}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">Your Full Name *</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3.5 text-xs outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 text-foreground shadow-2xs"
                  placeholder="e.g. Priya Sharma"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-10 w-full rounded-xl border border-border bg-background px-3.5 text-xs outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 text-foreground shadow-2xs"
                    placeholder="e.g. 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 w-full rounded-xl border border-border bg-background px-3.5 text-xs outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 text-foreground shadow-2xs"
                    placeholder="priya@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">Your Message or Title Request *</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 text-foreground shadow-2xs"
                  placeholder="Tell us about the book you are looking for, order assistance, or wholesale inquiries…"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-11 rounded-full flex-1 gap-2 text-xs font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 shadow-md hover:shadow-lg transition-all active:scale-95 justify-center cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? "Sending..." : "Submit Inquiry Online"}
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-full flex-1 border-[#25D366]/40 hover:bg-[#25D366]/10 text-emerald-700 dark:text-emerald-400 transition gap-2 text-xs font-bold justify-center cursor-pointer"
                >
                  <a href={sendWhatsAppUrl} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4 text-[#25D366] fill-[#25D366]" /> Chat on WhatsApp
                  </a>
                </Button>
              </div>

              <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground flex-wrap gap-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
                  Fast 1-hour reply during shop hours
                </span>
                <span>Hours: 10:00 AM – 8:30 PM</span>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
