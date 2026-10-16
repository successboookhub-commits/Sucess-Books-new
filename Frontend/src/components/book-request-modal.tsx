import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles, Send, MessageCircle, CheckCircle2, ShieldCheck, Clock } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/books";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface BookRequestModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  initialBookTitle?: string;
}

export function BookRequestModal({
  open,
  onOpenChange,
  trigger,
  initialBookTitle = "",
}: BookRequestModalProps) {
  const [title, setTitle] = useState(initialBookTitle);
  const [author, setAuthor] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Keep title updated if initialBookTitle changes
  useState(() => {
    if (initialBookTitle) setTitle(initialBookTitle);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter the book title you are looking for.");
      return;
    }
    if (!name.trim() || !phone.trim()) {
      toast.error("Please enter your name and phone number so we can notify you.");
      return;
    }

    setSubmitting(true);
    try {
      await api.sendContactMessage({
        name: name.trim(),
        phone: phone.trim(),
        email: "concierge-request@successbookhub.com",
        message: `[SPECIAL BOOK PROCUREMENT REQUEST]\nTitle: ${title.trim()}\nAuthor: ${author.trim() || "Not specified"}\nCustomer: ${name.trim()} (${phone.trim()})\nNotes: ${notes.trim() || "None"}`,
      });

      setSubmitted(true);
      toast.success("Book request received! Our bookseller will search shelves and reply promptly.");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to submit request.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setAuthor("");
    setName("");
    setPhone("");
    setNotes("");
    setSubmitted(false);
  };

  const whatsappMessage = `*Special Book Request — Success Book Hub*\n\n` +
    `Hello Concierge! I am looking for a book not listed on your store:\n\n` +
    `📖 *Title:* ${title.trim() || "[Book Title]"}\n` +
    (author.trim() ? `✍️ *Author:* ${author.trim()}\n` : "") +
    (name.trim() ? `👤 *My Name:* ${name.trim()}\n` : "") +
    (phone.trim() ? `📞 *Phone:* ${phone.trim()}\n` : "") +
    (notes.trim() ? `📝 *Notes:* ${notes.trim()}\n` : "") +
    `\nCould you please check availability, quote the best price, and share delivery timeline?`;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg p-0 border border-amber-500/30 bg-card rounded-3xl shadow-2xl">
        {/* Luxury Header */}
        <DialogHeader className="p-5 pb-4 border-b border-border/80 bg-gradient-to-r from-[#21050b] via-[#3d0b17] to-[#1a0409] text-white rounded-t-3xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/40">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="font-serif text-lg sm:text-xl font-bold text-amber-100 flex items-center gap-1.5">
                Can't Find Your Book? <Sparkles className="h-4 w-4 text-amber-400" />
              </DialogTitle>
              <p className="text-[11px] text-amber-200/80 mt-0.5 font-sans">
                Our College Street Bookseller Concierge will source it within 24 hours.
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="p-5 sm:p-6 space-y-4 text-xs">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="h-14 w-14 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground">
                Request Dispatched to Our Booksellers!
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. We have queued your request for &quot;<strong>{title}</strong>&quot;. Our procurement team will verify distributor stocks and contact you on <strong>{phone}</strong> with pricing and delivery details.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  asChild
                  className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-1.5 h-10 px-5 text-xs shadow cursor-pointer"
                >
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4" /> Also Ping on WhatsApp
                  </a>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="rounded-full h-10 px-5 text-xs font-semibold cursor-pointer"
                >
                  Request Another Book
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="bg-amber-500/10 border border-amber-300/40 dark:border-amber-700/40 rounded-xl p-3 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <Clock className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Looking for rare literature, UPSC/academic textbooks, regional translations, or out-of-stock editions? Tell us and we will hunt down original publisher copies for you.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Book Title / Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Sapiens, Wings of Fire, NCERT Chemistry Class 12"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl border border-border bg-background text-xs font-medium focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Author / Publication / ISBN (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Yuval Noah Harari, HarperCollins, 2024 Edition"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl border border-border bg-background text-xs font-medium focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-2xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Rahul Reddy"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl border border-border bg-background text-xs font-medium focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl border border-border bg-background text-xs font-medium focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Special Notes / Urgency (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need urgently before next Monday for exam preparation..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-medium focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-2xs"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 h-11 rounded-full font-bold text-xs bg-amber-600 hover:bg-amber-700 text-white shadow-md btn-shimmer cursor-pointer gap-2"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? "Submitting..." : "Submit Book Request"}
                </Button>

                <Button
                  type="button"
                  asChild
                  variant="outline"
                  className="flex-1 h-11 rounded-full font-bold text-xs border-emerald-500/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/10 cursor-pointer gap-2"
                >
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4 text-emerald-600" />
                    Request via WhatsApp
                  </a>
                </Button>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-600" /> 100% Genuine Publisher Sourcing
                </span>
                <span>Response in 1–2 hours</span>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
