import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  Mail,
  KeyRound,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  BookOpen,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Admin Login — Success Book Hub" },
      { name: "description", content: "Secure OTP-based administrator login portal for Success Book Hub." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, sendOtp, verifyOtp } = useAdminAuth();

  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("successboookhub@gmail.com");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // If already authenticated, redirect to /admin
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate({ to: "/admin" });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Resend countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Handle Step 1: Send OTP
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid admin email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await sendOtp(email.trim().toLowerCase());
      if (res.success) {
        toast.success("Verification code sent!", {
          description: `A 6-digit OTP has been sent to ${email}.`,
        });
        setStep("otp");
        setResendTimer(60);
        // Focus first OTP input
        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 200);
      }
    } catch (err: any) {
      toast.error("Failed to send OTP", {
        description: err.message || "Please check your network and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle OTP digit changes
  const handleOtpChange = (index: number, value: string) => {
    // Only accept numeric
    const cleanVal = value.replace(/\D/g, "");
    if (!cleanVal && value !== "") return;

    const newDigits = [...otpDigits];

    if (cleanVal.length > 1) {
      // Handle paste of whole OTP
      const pasted = cleanVal.slice(0, 6).split("");
      pasted.forEach((char, i) => {
        if (i < 6) newDigits[i] = char;
      });
      setOtpDigits(newDigits);
      const nextIndex = Math.min(pasted.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    newDigits[index] = cleanVal.slice(-1);
    setOtpDigits(newDigits);

    // Auto-focus next input
    if (cleanVal && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle Step 2: Verify OTP
  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const fullOtp = otpDigits.join("");
    if (fullOtp.length < 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await verifyOtp(email.trim().toLowerCase(), fullOtp);
      if (res.success) {
        toast.success("Welcome, Administrator!", {
          description: "Login verified successfully. Entering Admin Portal...",
        });
        navigate({ to: "/admin" });
      }
    } catch (err: any) {
      toast.error("Verification failed", {
        description: err.message || "Invalid or expired OTP. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/40 via-background to-background">
      <div className="w-full max-w-md space-y-5 sm:space-y-6">
        {/* Top Branding Card */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 ring-4 ring-primary/10 mb-1">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground">
            Admin Authentication
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto">
            {step === "email"
              ? "Enter your authorized admin email to receive a secure login OTP."
              : `Enter the 6-digit passcode sent to ${email}`}
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-foreground/5 backdrop-blur">
          {step === "email" ? (
            /* STEP 1: Enter Email Form */
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider">
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="successboookhub@gmail.com"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  />
                </div>
                <p className="text-[11px] text-muted-foreground pt-1 flex items-center gap-1.5">
                  <Lock className="h-3 w-3 text-primary/70 shrink-0" />
                  Real-time OTP will be dispatched via Gmail SMTP.
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:bg-primary/90 transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          ) : (
            /* STEP 2: Enter 6-Digit OTP Form */
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider">
                    6-Digit Security Code
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold"
                  >
                    <ArrowLeft className="h-3 w-3" /> Change
                  </button>
                </div>

                {/* 6-box input */}
                <div className="flex justify-between gap-2 sm:gap-2.5">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        inputRefs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="w-12 h-14 sm:w-13 sm:h-14 text-center text-xl sm:text-2xl font-mono font-bold rounded-xl border-2 border-border bg-background text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    Valid for 10 minutes
                  </span>

                  {resendTimer > 0 ? (
                    <span className="text-muted-foreground font-medium">
                      Resend in <strong className="text-foreground">{resendTimer}s</strong>
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => handleSendOtp()}
                      className="text-primary hover:underline font-bold transition flex items-center gap-1"
                    >
                      <RefreshCw className="h-3 w-3" /> Resend Code
                    </button>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || otpDigits.join("").length < 6}
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:bg-primary/90 transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Verify & Access Admin Portal</span>
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Footer inside card */}
          <div className="mt-6 pt-5 border-t border-border/60 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition font-medium"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Return to Public Bookstore</span>
            </Link>
          </div>
        </div>

        {/* Security watermark */}
        <p className="text-center text-[11px] text-muted-foreground/70">
          Success Book Hub &bull; Protected by End-to-End OTP Verification &amp; Session Encryption
        </p>
      </div>
    </div>
  );
}
