import { MessageCircle, Phone } from "lucide-react";
import { WHATSAPP_NUMBER, STORE } from "@/lib/books";

export function StickyContactWidget() {
  const prefilledText = encodeURIComponent(
    "Hello Success Book Hub! I would like to inquire about book availability, recommendations, and order delivery."
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${prefilledText}`;
  const callUrl = `tel:${STORE.phone.replace(/[^\d+]/g, "")}`;

  return (
    <aside
      aria-label="Quick Contact and Support"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 print:hidden select-none"
    >
      {/* WhatsApp Button (Top) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Direct WhatsApp chat"
        className="group flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white px-3.5 py-2.5 sm:px-4 sm:py-2.5 shadow-xl hover:shadow-2xl transition-all duration-200 font-bold text-xs tracking-wide border-2 border-white hover:scale-105 active:scale-95 shadow-[0_4px_14px_rgba(37,211,102,0.4)]"
      >
        <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <MessageCircle className="h-3.5 w-3.5 fill-current" />
        </div>
        <span className="font-semibold whitespace-nowrap">WhatsApp Chat</span>
      </a>

      {/* Call Store Button (Stacked vertically directly below WhatsApp - paina paina) */}
      <a
        href={callUrl}
        aria-label={`Call Success Book Hub at ${STORE.phone}`}
        className="group flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 px-3.5 py-2.5 sm:px-4 sm:py-2.5 shadow-xl hover:shadow-2xl transition-all duration-200 font-bold text-xs tracking-wide border-2 border-white hover:scale-105 active:scale-95 shadow-[0_4px_14px_rgba(251,191,36,0.4)]"
      >
        <div className="h-6 w-6 rounded-full bg-slate-950/15 flex items-center justify-center shrink-0">
          <Phone className="h-3.5 w-3.5 fill-current" />
        </div>
        <span className="font-semibold whitespace-nowrap">Call Store</span>
      </a>
    </aside>
  );
}
