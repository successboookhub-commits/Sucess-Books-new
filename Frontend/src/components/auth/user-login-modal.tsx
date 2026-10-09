import { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Sparkles,
  BookOpen,
  CheckCircle2,
  KeyRound
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserAuth } from "@/lib/user-auth";
import { toast } from "sonner";

export function UserLoginModal() {
  const {
    loginModalOpen,
    closeLoginModal,
    loginWithPassword,
    registerWithPassword,
    sendOtp,
    verifyOtp
  } = useUserAuth();

  const [activeTab, setActiveTab] = useState<"login" | "register" | "otp">("login");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  // OTP state
  const [otpStep, setOtpStep] = useState<"email" | "code">("email");
  const [otpEmail, setOtpEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpName, setOtpName] = useState("");
  const [otpPhone, setOtpPhone] = useState("");
  const [isExistingOtpUser, setIsExistingOtpUser] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
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
        setActiveTab("login");
        setLoginEmail("");
        setLoginPassword("");
        setRegName("");
        setRegPhone("");
        setRegEmail("");
        setRegPassword("");
        setRegConfirmPassword("");
        setOtpStep("email");
        setOtpCode("");
        setLoading(false);
      }, 300);
    }
  };

  // 1. Handle Email & Password Login
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!loginPassword) {
      toast.error("Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      await loginWithPassword({
        email: loginEmail.trim().toLowerCase(),
        password: loginPassword
      });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle New Customer Registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || regName.trim().length < 2) {
      toast.error("Please enter your full name (at least 2 characters).");
      return;
    }
    if (!regPhone.trim() || regPhone.replace(/\D/g, "").length < 10) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!regEmail.trim() || !regEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      toast.error("Passwords do not match. Please check and try again.");
      return;
    }

    setLoading(true);
    try {
      await registerWithPassword({
        name: regName.trim(),
        phone: regPhone.trim(),
        email: regEmail.trim().toLowerCase(),
        password: regPassword,
        confirmPassword: regConfirmPassword
      });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle OTP Request
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpEmail.trim() || !otpEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await sendOtp(otpEmail.trim().toLowerCase());
      setIsExistingOtpUser(Boolean(res.isExistingUser));
      setOtpStep("code");
      setCountdown(60);
      toast.success(res.message || "OTP passcode sent to your inbox!");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // 4. Handle OTP Verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 6) {
      toast.error("Please enter the complete 6-digit OTP passcode.");
      return;
    }

    if (!isExistingOtpUser && (!otpName.trim() || !otpPhone.trim())) {
      toast.error("Please provide your full name and phone number to complete account setup.");
      return;
    }

    setLoading(true);
    try {
      await verifyOtp(otpEmail.trim().toLowerCase(), otpCode.trim(), otpName.trim(), otpPhone.trim());
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Invalid or expired OTP code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    setLoading(true);
    try {
      const res = await sendOtp(otpEmail.trim().toLowerCase());
      setCountdown(60);
      toast.success("New OTP code sent! Check your inbox.");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Password strength helper
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, text: "", color: "bg-border" };
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd) || /[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 1) return { score: 25, text: "Weak", color: "bg-rose-500" };
    if (score === 2) return { score: 50, text: "Fair", color: "bg-amber-500" };
    if (score === 3) return { score: 75, text: "Good", color: "bg-blue-500" };
    return { score: 100, text: "Strong", color: "bg-emerald-500" };
  };

  const pwdStrength = getPasswordStrength(regPassword);

  return (
    <Dialog open={loginModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[460px] p-0 overflow-hidden border-border bg-card shadow-2xl rounded-3xl max-h-[92vh] flex flex-col">
        {/* Header Banner */}
        <div className="bg-gradient-to-br from-primary via-[#5a1224] to-[#3a0814] p-6 text-white text-center relative shrink-0">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/10 backdrop-blur-md mb-2.5 border border-white/20 shadow-md">
            <BookOpen className="h-6 w-6 text-amber-300" />
          </div>
          <DialogTitle className="font-display text-2xl font-bold tracking-tight text-amber-100">
            {activeTab === "login" && "Sign In to Your Account"}
            {activeTab === "register" && "Create Customer Account"}
            {activeTab === "otp" && (otpStep === "email" ? "Sign In with Email OTP" : "Verify 6-Digit Passcode")}
          </DialogTitle>
          <DialogDescription className="text-white/80 text-xs mt-1 max-w-xs mx-auto">
            {activeTab === "login" && "Access your orders, saved addresses, and express checkout"}
            {activeTab === "register" && "Join Success Book Hub for fast delivery, discounts & invoice tracking"}
            {activeTab === "otp" && (otpStep === "email" ? "Enter your email to receive a 1-time secure passcode" : `Sent to ${otpEmail}`)}
          </DialogDescription>

          {/* Navigation Tabs */}
          <div className="flex bg-black/25 backdrop-blur-sm p-1 rounded-xl mt-4 max-w-xs mx-auto border border-white/10 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-1.5 rounded-lg transition ${activeTab === "login" ? "bg-amber-400 text-slate-900 shadow-xs font-bold" : "text-white/80 hover:text-white"}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-1.5 rounded-lg transition ${activeTab === "register" ? "bg-amber-400 text-slate-900 shadow-xs font-bold" : "text-white/80 hover:text-white"}`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("otp")}
              className={`flex-1 py-1.5 rounded-lg transition ${activeTab === "otp" ? "bg-amber-400 text-slate-900 shadow-xs font-bold" : "text-white/80 hover:text-white"}`}
            >
              OTP Login
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB 1: EMAIL & PASSWORD LOGIN */}
          {activeTab === "login" && (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpEmail(loginEmail);
                      setActiveTab("otp");
                    }}
                    className="text-[11px] text-primary hover:underline font-medium"
                  >
                    Forgot or use OTP?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition p-1"
                    title={showLoginPassword ? "Hide password" : "Show password"}
                  >
                    {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading || !loginEmail || !loginPassword}
                  className="w-full rounded-xl py-6 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In & Continue
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-muted-foreground">
                  Don't have an account yet?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("register")}
                    className="font-bold text-primary hover:underline"
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* TAB 2: REGISTER NEW ACCOUNT */}
          {activeTab === "register" && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    autoFocus
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Create Password (min. 6 characters)
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type={showRegPassword ? "text" : "password"}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Create strong password"
                    className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition p-1"
                  >
                    {showRegPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {regPassword && (
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full ${pwdStrength.color} transition-all duration-300`}
                        style={{ width: `${pwdStrength.score}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-muted-foreground">{pwdStrength.text}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type={showRegConfirmPassword ? "text" : "password"}
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Re-type your password"
                    className={`w-full pl-10 pr-11 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition ${
                      regConfirmPassword && regConfirmPassword !== regPassword
                        ? "border-rose-500 focus:ring-rose-500/20"
                        : "border-input focus:ring-primary"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition p-1"
                  >
                    {showRegConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {regConfirmPassword && regConfirmPassword !== regPassword && (
                  <p className="text-[11px] text-rose-500 mt-1">Passwords do not match.</p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading || !regName || !regPhone || !regEmail || !regPassword || regPassword !== regConfirmPassword}
                  className="w-full rounded-xl py-6 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Complete Registration
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center pt-1">
                <p className="text-xs text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("login")}
                    className="font-bold text-primary hover:underline"
                  >
                    Sign In here
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* TAB 3: PASSWORDLESS EMAIL OTP */}
          {activeTab === "otp" && (
            <div>
              {otpStep === "email" ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Email Address for Verification
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        required
                        value={otpEmail}
                        onChange={(e) => setOtpEmail(e.target.value)}
                        placeholder="name@gmail.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        autoFocus
                      />
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1.5 flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      We'll dispatch a 1-time 6-digit passcode to your inbox.
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={loading || !otpEmail.trim()}
                      className="w-full rounded-xl py-6 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Sending Passcode...
                        </>
                      ) : (
                        <>
                          Send 6-Digit Passcode
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
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
                        onClick={() => setOtpStep("email")}
                        className="text-[11px] text-primary hover:underline"
                      >
                        Change Email
                      </button>
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                      placeholder="• • • • • •"
                      className="w-full text-center text-2xl tracking-[12px] font-mono py-3 rounded-xl border border-input bg-background font-bold text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                      autoFocus
                    />
                  </div>

                  {!isExistingOtpUser && (
                    <div className="space-y-3 pt-2 border-t border-border">
                      <div className="text-xs font-medium text-foreground">
                        Profile details for your new account:
                      </div>
                      <div>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            required
                            value={otpName}
                            onChange={(e) => setOtpName(e.target.value)}
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
                            value={otpPhone}
                            onChange={(e) => setOtpPhone(e.target.value)}
                            placeholder="10-digit Mobile Number"
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-muted-foreground">Didn't receive code?</span>
                    {countdown > 0 ? (
                      <span className="text-muted-foreground font-mono">Resend in {countdown}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={loading}
                        className="text-primary font-semibold hover:underline"
                      >
                        Resend Code
                      </button>
                    )}
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={loading || otpCode.length < 6}
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
