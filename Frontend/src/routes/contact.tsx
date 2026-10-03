import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STORE, WHATSAPP_NUMBER } from "@/lib/books";
import { api } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Success Book Hub" },
      { name: "description", content: "Find our Kolkata bookstore, call us, or message us on WhatsApp. We assist every book lover." },
      { property: "og:title", content: "Contact Us — Success Book Hub" },
      { property: "og:description", content: "Address, phone, WhatsApp and opening hours for Success Book Hub." },
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
    if (!name.trim() || !message.trim()) {
      toast.error("Please enter your name and message.");
      return;
    }

    setSubmitting(true);
    try {
      await api.sendContactMessage({
        name,
        email,
        phone,
        message,
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
      <section className="paper-texture border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Get in Touch</p>
          <h1 className="mt-2 font-display text-4xl text-primary font-bold sm:text-5xl">Contact Success Book Hub</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            Questions regarding a book title, custom order, school/college wholesale, or recommendation? Reach out to us — our booksellers reply promptly.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-4">
          {[
            [MapPin, "Visit Our Bookstore", STORE.address],
            [Phone, "Customer Support", STORE.phone],
            [Mail, "Official Email", STORE.email],
            [Clock, "Opening Hours", STORE.hours],
          ].map(([Icon, title, text]) => {
            const IconComponent = Icon as typeof MapPin;
            return (
              <div key={title as string} className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                  <IconComponent className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg text-foreground font-semibold">{title as string}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{text as string}</p>
                </div>
              </div>
            );
          })}

          {/* Map Preview */}
          <div className="overflow-hidden rounded-xl border border-border shadow-sm">
            <iframe
              title="Map to Success Book Hub"
              src="https://www.google.com/maps?q=College+Street,+Kolkata&output=embed"
              className="h-60 w-full"
              loading="lazy"
            />
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <h2 className="flex items-center gap-2 font-display text-2xl text-foreground font-bold">
            Send an Inquiry or Message
          </h2>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Messages are directly saved in our system. You can also send directly via WhatsApp.
          </p>

          {sent ? (
            <div className="mt-8 text-center p-8 rounded-xl bg-secondary/50 border border-border space-y-3">
              <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
              <h3 className="font-display text-xl font-bold text-foreground">Message Dispatched!</h3>
              <p className="text-xs text-muted-foreground">We have safely received your note and will get back to you shortly.</p>
              <Button variant="outline" className="rounded-full mt-2" onClick={() => setSent(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">Your Name *</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 w-full rounded-md border border-border bg-background px-4 text-xs outline-none transition focus:border-primary"
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
                    className="h-11 w-full rounded-md border border-border bg-background px-4 text-xs outline-none transition focus:border-primary"
                    placeholder="e.g. 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 w-full rounded-md border border-border bg-background px-4 text-xs outline-none transition focus:border-primary"
                    placeholder="priya@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">Your Message *</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full rounded-md border border-border bg-background p-3 text-xs outline-none transition focus:border-primary"
                  placeholder="Tell us about the book you are looking for or your order question…"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button type="submit" disabled={submitting} className="h-12 rounded-full flex-1 gap-2 text-xs font-bold">
                  <Send className="h-4 w-4" />
                  {submitting ? "Sending..." : "Submit Inquiry Online"}
                </Button>

                <Button asChild variant="outline" className="h-12 rounded-full flex-1 border-whatsapp/40 text-whatsapp hover:bg-whatsapp hover:text-white transition gap-2 text-xs font-bold">
                  <a href={sendWhatsAppUrl} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                  </a>
                </Button>
              </div>

              <p className="text-center text-[11px] text-muted-foreground pt-1">
                We usually reply within an hour during shop hours (10:00 AM – 8:30 PM).
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
