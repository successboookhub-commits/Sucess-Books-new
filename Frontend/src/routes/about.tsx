import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, HeartHandshake, Sparkles, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STORE } from "@/lib/books";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Success Book Hub" },
      { name: "description", content: "A dedicated independent bookstore in Kolkata, sending thoughtfully chosen books across India." },
      { property: "og:title", content: "About Us — Success Book Hub" },
      { property: "og:description", content: "Our story, our shelves, and how we deliver books across India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  const { catalog } = useCart();

  return (
    <main className="min-h-screen bg-background">
      <section className="paper-texture border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Our Legacy & Mission</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl leading-tight text-primary font-bold sm:text-5xl">
            A sanctuary for readers, learners, and dreamers.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            {STORE.name} began with a simple belief: that the right book at the right moment can alter the trajectory of a person's life. Located in the historic book district of College Street, Kolkata, we connect curious readers across every corner of India with timeless literature, academic excellence, and self-mastery titles.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [BookOpen, "Curated, Not Crowded", "Every title in our catalogue is vetted for intellectual substance and lasting joy."],
            [HeartHandshake, "Human Connection", "Personalized book recommendations via WhatsApp — our bibliophiles reply directly."],
            [Truck, "Pan-India Reach", "Free express delivery on all orders above ₹799 with real-time tracking."],
            [Sparkles, "Pristine Collector Care", "Carefully inspected, pristine editions wrapped with genuine bookmark keepsakes."],
          ].map(([Icon, title, text]) => {
            const IconComponent = Icon as typeof BookOpen;
            return (
              <div key={title as string} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <IconComponent className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{title as string}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{text as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 text-center sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            ["12+", "Years of Bookselling"],
            ["2,500+", "Satisfied Readers"],
            [`${catalog.length}`, "Curated Books on Shelves"]
          ].map(([stat, label]) => (
            <div key={label}>
              <p className="font-display text-5xl font-bold">{stat}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider opacity-75">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-foreground">Explore Our Shelves</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground leading-relaxed">
          {STORE.address} · {STORE.hours}
        </p>
        <Button size="lg" className="mt-6 rounded-full px-8 font-semibold shadow-sm" asChild>
          <Link to="/shop">Shop the Collection</Link>
        </Button>
      </section>
    </main>
  );
}
