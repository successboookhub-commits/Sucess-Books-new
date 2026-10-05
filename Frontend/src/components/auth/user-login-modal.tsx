import { useState, useEffect } from "react";
import { Mail, ShieldCheck, ArrowRight, RefreshCw, X, User, Phone, CheckCircle2, Sparkles, BookOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserAuth } from "@/lib/user-auth";
import { toast } from "sonner";

export function UserLoginModal() {
  const { loginModalOpen, closeLoginModal, sendOtp, verifyOtp } = useUserAuth();

  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Reset modal state on close
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeLoginModal();
      setTimeout(() => {
        setStep("email");
        setOtp("");
        setName("");
        setPhone("");
        setLoading(false);
      }, 300);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await sendOtp(email.trim());
      setIsExistingUser(Boolean(res.isExistingUser));
      setStep("otp");
      setCountdown(60);
      toast.success(res.message || "OTP sent successfully! Check your inbox.");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }

    if (!isExistingUser && (!name.trim() || !phone.trim())) {
      toast.error("Please provide your full name and phone number to complete registration.");
      return;
    }

    setLoading(true);
    try {
      await verifyOtp(email.trim(), otp.trim(), name.trim(), phone.trim());
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    setLoading(true);
    try {
      const res = await sendOtp(email.trim());
      setCountdown(60);
      toast.success("New OTP sent! Please check your inbox.");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={loginModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden border-border bg-card shadow-2xl rounded-2xl">
        {/* Header Banner */}
        <div className="bg-gradient-to-br from-primary via-[#5a1224] to-[#3a0814] p-6 text-white text-center relative">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/10 backdrop-blur-md mb-3 border border-white/20">
            <BookOpen className="h-7 w-7 text-amber-300" />
          </div>
          <DialogTitle className="font-display text-2xl font-bold tracking-tight text-amber-100">
            {step === "email" ? "Sign In to Success Book Hub" : "Verify Verification Code"}
          </DialogTitle>
          <DialogDescription className="text-white/80 text-xs mt-1.5 max-w-xs mx-auto">
            {step === "email"
              ? "Access your personal dashboard, track live orders, and manage saved addresses"
              : `Enter the 6-digit passcode sent to ${email}`}
          </DialogDescription>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {step === "email" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    autoFocus
                  />
                </div>
                <p className="text-[11px] text-muted-foreground mt-1.5 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  We'll send a 1-time secure verification passcode to this email.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="w-full rounded-xl py-6 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Sending Verification Code...
                    </>
                  ) : (
                    <>
                      Continue with OTP
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>

              <div className="bg-secondary/40 rounded-xl p-3.5 border border-border text-xs text-muted-foreground space-y-1.5">
                <div className="font-semibold text-foreground flex items-center gap-1.5 text-xs">
                  <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                  Benefits of an Account:
                </div>
                <ul className="list-disc pl-4 space-y-1 text-[11px]">
                  <li>Track order status & download GST Tax Invoices</li>
                  <li>Save multiple addresses for fast checkout</li>
                  <li>Sync your Wishlist across devices</li>
                </ul>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    6-Digit Security Passcode
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="text-[11px] text-primary hover:underline"
                  >
                    Change Email
                  </button>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="• • • • • •"
                  className="w-full text-center text-2xl tracking-[12px] font-mono py-3 rounded-xl border border-input bg-background font-bold text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  autoFocus
                />
              </div>

              {!isExistingUser && (
                <div className="space-y-3 pt-2 border-t border-border">
                  <div className="text-xs font-medium text-foreground">
                    Complete your profile:
                  </div>
                  <div>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Full Name"
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit Mobile Number"
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-muted-foreground">
                  Didn't receive code?
                </span>
                {countdown > 0 ? (
                  <span className="text-muted-foreground font-mono">
                    Resend in {countdown}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="text-primary font-semibold hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading || otp.length < 6}
                  className="w-full rounded-xl py-6 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Verify & Sign In
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
