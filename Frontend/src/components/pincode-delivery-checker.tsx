import { useState, useEffect } from "react";
import { MapPin, Truck, Zap, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PincodeDeliveryCheckerProps {
  compact?: boolean;
  className?: string;
}

export function PincodeDeliveryChecker({ compact = false, className = "" }: PincodeDeliveryCheckerProps) {
  const [pincode, setPincode] = useState("");
  const [checkedPincode, setCheckedPincode] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sbh_pincode");
      if (saved && /^\d{6}$/.test(saved)) {
        setPincode(saved);
        setCheckedPincode(saved);
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  const handleCheck = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = pincode.trim();
    if (!/^\d{6}$/.test(clean)) {
      setError("Please enter a valid 6-digit Indian PIN code.");
      return;
    }

    setError(null);
    setCheckedPincode(clean);
    setIsEditing(false);
    try {
      localStorage.setItem("sbh_pincode", clean);
    } catch {
      // ignore
    }
  };

  const getDeliveryInfo = (pin: string) => {
    const prefix2 = pin.slice(0, 2);
    if (prefix2 === "50") {
      return {
        zone: "Telangana & Hyderabad Metro",
        speed: "Express 24–48h Delivery",
        estimate: "Arrives Tomorrow or within 24–48 Hours",
        isExpress: true,
        codAvailable: true,
      };
    } else if (prefix2 === "51" || prefix2 === "52" || prefix2 === "53") {
      return {
        zone: "Andhra Pradesh Regional",
        speed: "Fast Regional Delivery",
        estimate: "Arrives in 2–3 Business Days",
        isExpress: false,
        codAvailable: true,
      };
    } else {
      return {
        zone: "Pan-India Standard Courier",
        speed: "Standard Delivery",
        estimate: "Estimated arrival in 3–5 Business Days",
        isExpress: false,
        codAvailable: true,
      };
    }
  };

  const deliveryInfo = checkedPincode ? getDeliveryInfo(checkedPincode) : null;

  return (
    <div className={`rounded-xl border border-border/80 bg-secondary/30 p-3 text-xs ${className}`}>
      {/* Header / Input Row */}
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold text-foreground flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
          <MapPin className="h-3.5 w-3.5 text-amber-600" />
          Check Delivery Date & COD:
        </span>

        {checkedPincode && !isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
          >
            Change ({checkedPincode})
          </button>
        )}
      </div>

      {(!checkedPincode || isEditing) ? (
        <form onSubmit={handleCheck} className="mt-2 flex gap-1.5">
          <div className="relative flex-1">
            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit PIN code (e.g. 500001)"
              value={pincode}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setPincode(val);
                if (error) setError(null);
              }}
              className="w-full h-8.5 px-3 rounded-lg border border-border bg-card text-xs font-semibold text-foreground focus:border-amber-500 focus:outline-none"
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="h-8.5 px-4 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer shadow-xs btn-shimmer"
          >
            Check
          </Button>
        </form>
      ) : null}

      {error && (
        <p className="mt-1.5 text-[11px] text-destructive flex items-center gap-1 font-medium">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}

      {deliveryInfo && !isEditing && (
        <div className="mt-2 space-y-1.5 animate-in fade-in-50">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
              deliveryInfo.isExpress
                ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30"
                : "bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-500/30"
            }`}>
              {deliveryInfo.isExpress ? <Zap className="h-3 w-3 fill-emerald-600 text-emerald-600" /> : <Truck className="h-3 w-3" />}
              {deliveryInfo.speed}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">to PIN {checkedPincode}</span>
          </div>

          <p className="text-[11px] font-semibold text-foreground flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>{deliveryInfo.estimate}</span>
          </p>

          <p className="text-[10px] text-muted-foreground">
            • Cash on Delivery (COD) Available • Free shipping over ₹499
          </p>
        </div>
      )}
    </div>
  );
}
