import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, Clock, Mail, MapPin, MessageCircle, Phone, Send, CheckCircle2 } from "lucide-react";
import { STORE, WHATSAPP_NUMBER, categories } from "@/lib/books";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SiteFooter() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setSubscribing(true);
    try {
      const res = await api.subscribeNewsletter(newsletterEmail.trim());
      setSubscribed(true);
      toast.success(res.message || "Thank you for subscribing!");
      setNewsletterEmail("");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to subscribe");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Newsletter Strip */}
      <div className="border-b border-primary-foreground/10 bg-primary/20">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold">Join the Readers' Circle</h3>
            <p className="text-xs text-primary-foreground/75 mt-1">Get monthly curated reading lists, author spotlights, and secret flash deals.</p>
          </div>
          <form onSubmit={handleNewsletter} className="w-full md:w-auto flex max-w-md gap-2">
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-4 py-2.5 rounded-full border border-emerald-800">
                <CheckCircle2 className="h-4 w-4" /> You're on our reading list!
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="h-11 rounded-full bg-background/10 border border-primary-foreground/20 px-4 text-xs text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:border-primary-foreground min-w-[240px] flex-1"
                />
                <Button type="submit" disabled={subscribing} className="h-11 rounded-full px-5 text-xs font-bold gap-1.5 shrink-0 bg-gold text-foreground hover:bg-gold/90">
                  <Send className="h-3.5 w-3.5" />
                  {subscribing ? "Joining..." : "Subscribe"}
                </Button>
              </>
            )}
          </form>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="flex items-center gap-2.5 font-display text-2xl font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground text-primary shadow">
              <BookOpen className="h-4 w-4" />
            </span>
            {STORE.name}
          </p>
          <p className="mt-3 text-sm leading-6 opacity-75">
            Stories that stay with you. Thoughtfully curated literature, academic essentials, and bestselling collections delivered right to your doorstep across India.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider opacity-60">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/" className="opacity-80 transition hover:opacity-100">Home</Link></li>
            <li><Link to="/shop" className="opacity-80 transition hover:opacity-100">Shop All Books</Link></li>
            <li><Link to="/about" className="opacity-80 transition hover:opacity-100">Our Story & Ethos</Link></li>
            <li><Link to="/contact" className="opacity-80 transition hover:opacity-100">Contact & Visit</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider opacity-60">Genres & Shelves</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.filter((c) => c !== "All").map((c) => (
              <li key={c}>
                <Link to="/shop" search={{ category: c }} className="opacity-80 transition hover:opacity-100">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider opacity-60">Visit or Call Us</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
              <span className="opacity-80 leading-snug">{STORE.address}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
              <span className="opacity-80">{STORE.phone}</span>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
              <span className="opacity-80">{STORE.email}</span>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
              <span className="opacity-80">{STORE.hours}</span>
            </li>
          </ul>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-xs font-bold text-primary-foreground transition hover:bg-whatsapp/90 shadow-md"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp Us Anytime
          </a>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 px-4 py-5 text-center text-xs opacity-60">
        © 2026 {STORE.name} · Curated Books Delivered Pan-India · Powered by Node.js & Express API
      </div>
    </footer>
  );
}
