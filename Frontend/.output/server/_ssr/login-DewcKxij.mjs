import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-C7NRY3j5.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as Lock, N as Mail, Y as CircleCheck, at as ArrowRight, m as ShieldCheck, nt as BookOpen, ot as ArrowLeft, u as Sparkles, y as RefreshCw } from "../_libs/lucide-react.mjs";
import { n as useAdminAuth } from "./auth-DWcLTCAK.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DewcKxij.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLoginPage() {
	const navigate = useNavigate();
	const { isAuthenticated, isLoading, sendOtp, verifyOtp } = useAdminAuth();
	const [step, setStep] = (0, import_react.useState)("email");
	const [email, setEmail] = (0, import_react.useState)("successboookhub@gmail.com");
	const [otpDigits, setOtpDigits] = (0, import_react.useState)([
		"",
		"",
		"",
		"",
		"",
		""
	]);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [resendTimer, setResendTimer] = (0, import_react.useState)(0);
	const inputRefs = (0, import_react.useRef)([]);
	(0, import_react.useEffect)(() => {
		if (!isLoading && isAuthenticated) navigate({ to: "/admin" });
	}, [
		isAuthenticated,
		isLoading,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		let interval;
		if (resendTimer > 0) interval = setInterval(() => {
			setResendTimer((prev) => prev - 1);
		}, 1e3);
		return () => clearInterval(interval);
	}, [resendTimer]);
	const handleSendOtp = async (e) => {
		if (e) e.preventDefault();
		if (!email || !email.includes("@")) {
			toast.error("Please enter a valid admin email address.");
			return;
		}
		setIsSubmitting(true);
		try {
			if ((await sendOtp(email.trim().toLowerCase())).success) {
				toast.success("Verification code sent!", { description: `A 6-digit OTP has been sent to ${email}.` });
				setStep("otp");
				setResendTimer(60);
				setTimeout(() => {
					inputRefs.current[0]?.focus();
				}, 200);
			}
		} catch (err) {
			toast.error("Failed to send OTP", { description: err.message || "Please check your network and try again." });
		} finally {
			setIsSubmitting(false);
		}
	};
	const handleOtpChange = (index, value) => {
		const cleanVal = value.replace(/\D/g, "");
		if (!cleanVal && value !== "") return;
		const newDigits = [...otpDigits];
		if (cleanVal.length > 1) {
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
		if (cleanVal && index < 5) inputRefs.current[index + 1]?.focus();
	};
	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !otpDigits[index] && index > 0) inputRefs.current[index - 1]?.focus();
	};
	const handleVerifyOtp = async (e) => {
		if (e) e.preventDefault();
		const fullOtp = otpDigits.join("");
		if (fullOtp.length < 6) {
			toast.error("Please enter the complete 6-digit OTP.");
			return;
		}
		setIsSubmitting(true);
		try {
			if ((await verifyOtp(email.trim().toLowerCase(), fullOtp)).success) {
				toast.success("Welcome, Administrator!", { description: "Login verified successfully. Entering Admin Portal..." });
				navigate({ to: "/admin" });
			}
		} catch (err) {
			toast.error("Verification failed", { description: err.message || "Invalid or expired OTP. Please try again." });
		} finally {
			setIsSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/40 via-background to-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 ring-4 ring-primary/10 mb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-8 w-8" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground",
							children: "Admin Authentication"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto",
							children: step === "email" ? "Enter your authorized admin email to receive a secure login OTP." : `Enter the 6-digit passcode sent to ${email}`
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-foreground/5 backdrop-blur",
					children: [step === "email" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSendOtp,
						className: "space-y-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-foreground uppercase tracking-wider",
									children: "Admin Email Address"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										required: true,
										value: email,
										onChange: (e) => setEmail(e.target.value),
										placeholder: "successboookhub@gmail.com",
										className: "w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-muted-foreground pt-1 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3 w-3 text-primary/70 shrink-0" }), "Real-time OTP will be dispatched via Gmail SMTP."]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: isSubmitting || !email,
							className: "w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:bg-primary/90 transition flex items-center justify-center gap-2",
							children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sending Code..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Send Verification Code" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })] })
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleVerifyOtp,
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-bold text-foreground uppercase tracking-wider",
										children: "6-Digit Security Code"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setStep("email"),
										className: "text-xs text-primary hover:underline flex items-center gap-1 font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3" }), " Change"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-between gap-2 sm:gap-2.5",
									children: otpDigits.map((digit, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										ref: (el) => {
											inputRefs.current[idx] = el;
										},
										type: "text",
										inputMode: "numeric",
										maxLength: 1,
										value: digit,
										onChange: (e) => handleOtpChange(idx, e.target.value),
										onKeyDown: (e) => handleKeyDown(idx, e),
										className: "w-12 h-14 sm:w-13 sm:h-14 text-center text-xl sm:text-2xl font-mono font-bold rounded-xl border-2 border-border bg-background text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
									}, idx))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between pt-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-amber-500" }), "Valid for 10 minutes"]
									}), resendTimer > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground font-medium",
										children: ["Resend in ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
											className: "text-foreground",
											children: [resendTimer, "s"]
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										disabled: isSubmitting,
										onClick: () => handleSendOtp(),
										className: "text-primary hover:underline font-bold transition flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3 w-3" }), " Resend Code"]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: isSubmitting || otpDigits.join("").length < 6,
							className: "w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:bg-primary/90 transition flex items-center justify-center gap-2",
							children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verifying Code..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verify & Access Admin Portal" })] })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 pt-5 border-t border-border/60 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Return to Public Bookstore" })]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-[11px] text-muted-foreground/70",
					children: "Success Book Hub • Protected by End-to-End OTP Verification & Session Encryption"
				})
			]
		})
	});
}
//#endregion
export { AdminLoginPage as component };
