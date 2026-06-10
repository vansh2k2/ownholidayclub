"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserSquare2, ShieldCheck, Mail, Lock, KeyRound, Globe, EyeOff, Eye, ChevronLeft, ArrowRight } from "lucide-react";
import Swal from "sweetalert2";
import { createImageFallback } from "@/lib/createImageFallback";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80";
const handleImageError = createImageFallback(FALLBACK_IMAGE);
const API_BASE_URL =
  process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";

// ─── Bubble config — same pattern as MarqueeStrip ────────────────────────────
const bubbles = [
  { w: 90,  top: "12%",  left: "6%",   duration: 4.2, delay: 0,   type: 0 },
  { w: 55,  top: "55%",  left: "3%",   duration: 3.5, delay: 0.5, type: 1 },
  { w: 36,  top: "82%",  left: "10%",  duration: 5.1, delay: 1.2, type: 2 },
  { w: 70,  top: "25%",  left: "88%",  duration: 3.8, delay: 0.3, type: 1 },
  { w: 42,  top: "70%",  left: "92%",  duration: 4.6, delay: 0.9, type: 0 },
  { w: 28,  top: "90%",  left: "50%",  duration: 3.2, delay: 0.7, type: 2 },
  { w: 60,  top: "8%",   left: "55%",  duration: 4.9, delay: 0.2, type: 0 },
  { w: 32,  top: "78%",  left: "75%",  duration: 3.6, delay: 1.0, type: 1 },
  { w: 48,  top: "42%",  left: "96%",  duration: 4.3, delay: 0.4, type: 2 },
  { w: 22,  top: "5%",   left: "30%",  duration: 5.0, delay: 0.8, type: 0 },
  { w: 38,  top: "92%",  left: "22%",  duration: 3.9, delay: 0.1, type: 1 },
  { w: 65,  top: "60%",  left: "48%",  duration: 4.7, delay: 0.6, type: 2 },
];

const getBubbleStyle = (type, w) => {
  if (type === 0) return {
    background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.60), rgba(255,180,180,0.14))`,
    border: "1.5px solid rgba(255,255,255,0.60)",
    boxShadow: `inset 0 0 ${w * 0.4}px rgba(255,255,255,0.22), 0 0 ${w * 0.35}px rgba(255,255,255,0.18)`,
  };
  if (type === 1) return {
    background: `radial-gradient(circle at 35% 35%, rgba(251,191,36,0.62), rgba(251,191,36,0.10))`,
    border: "1.5px solid rgba(251,191,36,0.62)",
    boxShadow: `inset 0 0 ${w * 0.4}px rgba(251,191,36,0.28), 0 0 ${w * 0.35}px rgba(251,191,36,0.18)`,
  };
  return {
    background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.38), rgba(220,38,38,0.08))`,
    border: "1.5px solid rgba(255,255,255,0.40)",
    boxShadow: `inset 0 0 ${w * 0.4}px rgba(255,255,255,0.14), 0 0 ${w * 0.3}px rgba(255,255,255,0.12)`,
  };
};

export default function Auth({ onClose }) {
  const [mode, setMode] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [form, setForm] = useState({
    identifier: "",
    password: "",
    otp: "",
    newPassword: "",
  });

  useEffect(() => {
    setFeedback({ type: "", message: "" });
    setIsLoading(false);
    setShowPassword(false);
    setForm({ identifier: "", password: "", otp: "", newPassword: "" });
  }, [mode]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // ─── API handlers — completely unchanged ──────────────────────────────────
  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setFeedback({ type: "", message: "" });
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: form.identifier, password: form.password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "Unable to sign in.");
      if (typeof window !== "undefined") {
        window.localStorage.setItem("ohc_user_id", String(data?.user?._id || ""));
        window.localStorage.setItem("ohc_user", JSON.stringify(data?.user || {}));
        window.dispatchEvent(new Event("ohc-auth-changed"));
      }
      
      Swal.fire({
        title: '<div style="font-family: \'Playfair Display\', serif; font-size: 28px; font-weight: 900; color: #0A1628; margin-top: 10px;">Welcome Aboard</div>',
        html: '<div style="font-family: \'Inter\', sans-serif; font-size: 14px; color: #64748b; line-height: 1.6; margin-top: 15px;">Your authentication was successful.<br/>Redirecting to your exclusive member portal...</div>',
        icon: 'success',
        timer: 2200,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#ffffff',
        iconColor: '#16a34a',
        backdrop: `rgba(10, 22, 40, 0.45) backdrop-filter: blur(8px)`,
        padding: '2.5rem',
        customClass: {
          popup: 'premium-auth-alert',
        }
      }).then(() => {
        if (onClose) onClose();
        window.location.href = '/profile';
      });

    } catch (error) {
      setFeedback({ type: "error", message: error.message || "Unable to sign in." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setFeedback({ type: "", message: "" });
    try {
      const endpoint =
        mode === "recover"
          ? "/api/auth/forgot-password/send-otp"
          : mode === "verify-reset"
          ? "/api/auth/forgot-password/verify-otp"
          : "/api/auth/forgot-password/reset";

      const payload =
        mode === "recover"
          ? { identifier: form.identifier }
          : mode === "verify-reset"
          ? { identifier: form.identifier, otp: form.otp }
          : { identifier: form.identifier, otp: form.otp, password: form.newPassword };

      const method = mode === "reset-password" ? "PUT" : "POST";
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "Unable to complete this step.");

      if (mode === "recover") {
        setFeedback({ type: "success", message: "OTP sent to your registered email." });
        setMode("verify-reset");
      } else if (mode === "verify-reset") {
        setFeedback({ type: "success", message: "OTP verified. Set a new password now." });
        setMode("reset-password");
      } else {
        setFeedback({ type: "success", message: "Password changed successfully. Please sign in." });
        setMode("login");
      }
    } catch (error) {
      setFeedback({ type: "error", message: error.message || "Unable to complete this step." });
    } finally {
      setIsLoading(false);
    }
  };

  const isLogin = mode === "login";

  const leftContent = {
    login: {
      heading: "Member access for your next journey.",
      sub: "Sign in with your membership ID or registered email. Your exclusive benefits await.",
    },
    recover: {
      heading: "Reset your member password.",
      sub: "Enter your membership ID or email to receive a secure one-time code.",
    },
    "verify-reset": {
      heading: "Check your inbox.",
      sub: "Enter the OTP sent to your registered email to proceed.",
    },
    "reset-password": {
      heading: "Almost done.",
      sub: "Create a strong new password to restore full access to your account.",
    },
  };

  const { heading, sub } = leftContent[mode] || leftContent.login;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        .ohc-auth-root *, .ohc-auth-root *::before, .ohc-auth-root *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
        }

        .ohc-auth-root {
          min-height: 100vh;
          /* ── Changed to a premium light shade ── */
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        /* Fine dot grid - darker dots for light bg */
        .ohc-dot-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image: radial-gradient(circle, rgba(0,0,0,0.05) 1.2px, transparent 1.2px);
          background-size: 20px 20px;
        }

        /* Radial depth — softer neutral tones */
        .ohc-bg-grad {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(ellipse at 15% 50%, rgba(220,38,38,0.05) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 15%, rgba(251,191,36,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 60% 85%, rgba(203,213,225,0.4) 0%, transparent 50%);
        }

        /* Edge fades - removed or made very subtle for light bg */
        .ohc-fade-left {
          position: absolute;
          inset-y: 0; left: 0;
          width: 140px;
          background: linear-gradient(to right, rgba(248,250,252,0.9), transparent);
          pointer-events: none;
          z-index: 1;
        }
        .ohc-fade-right {
          position: absolute;
          inset-y: 0; right: 0;
          width: 140px;
          background: linear-gradient(to left, rgba(248,250,252,0.9), transparent);
          pointer-events: none;
          z-index: 1;
        }

        /* Back button - prominent red style */
        .ohc-back-btn {
          position: absolute;
          top: 28px; left: 32px;
          z-index: 30;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fff;
          border: 1px solid #dc2626;
          border-radius: 999px;
          padding: 7px 16px 7px 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #dc2626;
          cursor: pointer;
          box-shadow: 0 4px 6px -1px rgba(220,38,38,0.1);
          transition: all 0.15s;
        }
        .ohc-back-btn:hover {
          background: #dc2626;
          color: #fff;
          box-shadow: 0 10px 15px -3px rgba(220,38,38,0.25);
        }

        /* Main card */
        .ohc-card {
          position: relative;
          z-index: 20;
          width: 100%;
          max-width: 920px;
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          overflow: hidden;
          box-shadow: 0 32px 100px rgba(0,0,0,0.30), 0 0 0 1px rgba(255,255,255,0.12);
        }

        @media (max-width: 680px) {
          .ohc-card { grid-template-columns: 1fr; }
          .ohc-card-left { display: none; }
        }

        /* Left panel — premium red with image */
        .ohc-card-left {
          background: #C8102E;
          background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('/mem1.jpg');
          background-size: cover;
          background-position: center;
          border: 1px solid rgba(255,255,255,0.1);
          border-right: none;
          padding: 42px 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .ohc-card-left::before {
          content: '';
          position: absolute;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(251,191,36,0.24) 0%, transparent 70%);
          top: -80px; right: -90px;
          pointer-events: none;
        }
        .ohc-card-left::after {
          content: '';
          position: absolute;
          width: 180px; height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(251,191,36,0.16) 0%, transparent 70%);
          bottom: -55px; left: -55px;
          pointer-events: none;
        }

        .ohc-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 1;
        }
        .ohc-brand-icon {
          width: 38px; height: 38px;
          background: #fbbf24;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ohc-brand-icon svg { width: 18px; height: 18px; color: #7f1d1d; }
        .ohc-brand-name {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.025em;
        }

        .ohc-left-body { position: relative; z-index: 1; }
        .ohc-left-heading {
          font-size: 24px;
          font-weight: 800;
          color: #fff;
          line-height: 1.3;
          letter-spacing: -0.022em;
          margin-bottom: 14px;
        }
        .ohc-left-sub {
          font-size: 12.5px;
          color: rgba(255,255,255,0.55);
          line-height: 1.75;
          font-weight: 400;
        }

        .ohc-left-footer {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ohc-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.50);
        }
        .ohc-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #fbbf24;
          flex-shrink: 0;
          box-shadow: 0 0 7px rgba(251,191,36,0.75);
        }

        /* Right panel */
        .ohc-card-right {
          padding: 42px 48px;
          background: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .ohc-step-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #dc2626;
          margin-bottom: 8px;
        }
        .ohc-form-title {
          font-size: 26px;
          font-weight: 800;
          color: #1a1a1a;
          letter-spacing: -0.025em;
          margin-bottom: 6px;
          line-height: 1.2;
        }
        .ohc-form-sub {
          font-size: 12.5px;
          color: #888;
          margin-bottom: 20px;
          line-height: 1.65;
          font-weight: 400;
        }

        /* Feedback - adjusted to prevent layout jumps */
        .ohc-feedback-area {
          min-height: 44px;
          margin-bottom: 8px;
        }
        .ohc-feedback {
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 600;
          border-left: 3px solid;
          animation: ohcFadeIn 0.2s ease-out;
        }
        @keyframes ohcFadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ohc-feedback.error {
          background: #fff1f2;
          border-color: #dc2626;
          color: #991b1b;
        }
        .ohc-feedback.success {
          background: #f0fff4;
          border-color: #16a34a;
          color: #166534;
        }

        /* Fields */
        .ohc-fields { display: flex; flex-direction: column; gap: 16px; }

        .ohc-field-label {
          display: block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #000;
          margin-bottom: 7px;
        }
        .ohc-field-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1.5px solid #e8e8e8;
          background: #fafafa;
          padding: 12px 14px;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .ohc-field-wrap:focus-within {
          border-color: #dc2626;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(220,38,38,0.10);
        }
        .ohc-field-icon {
          width: 16px; height: 16px;
          color: #bbb;
          flex-shrink: 0;
        }
        .ohc-field-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-size: 16px;
          font-weight: 500;
          color: #111;
          font-family: 'Inter', sans-serif;
        }
        .ohc-field-input::placeholder { color: #ccc; font-weight: 400; }
        .ohc-eye-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          color: #ccc;
          display: flex;
          align-items: center;
          transition: color 0.15s;
        }
        .ohc-eye-btn:hover { color: #dc2626; }

        /* ── CHANGED: Submit button — amber/gold as default, red on hover ── */
        .ohc-submit {
          margin-top: 24px;
          width: 100%;
          background: #fbbf24;
          color: #7f1d1d;
          border: none;
          padding: 14px 20px;
          font-size: 11.5px;
          font-weight: 800;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: 'Inter', sans-serif;
          transition: background 0.15s, color 0.15s;
        }
        .ohc-submit:hover { background: #dc2626; color: #fff; }
        .ohc-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .ohc-bottom-row {
          margin-top: 16px;
          display: flex;
          align-items: center;
        }
        .ohc-text-link {
          background: none;
          border: none;
          font-size: 11.5px;
          font-weight: 600;
          color: #dc2626;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: opacity 0.15s;
          letter-spacing: 0.01em;
        }
        .ohc-text-link:hover { opacity: 0.7; }

        .ohc-enc-row {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid #f0f0f0;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #2563eb;
        }
        .ohc-enc-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #fbbf24;
          flex-shrink: 0;
          box-shadow: 0 0 5px rgba(251,191,36,0.65);
        }
      ` }} />

      <div className="ohc-auth-root">
        {/* Dot grid overlay */}
        <div className="ohc-dot-grid" />

        {/* Bg radial depth */}
        <div className="ohc-bg-grad" />

        {/* Edge fades */}
        <div className="ohc-fade-left" />
        <div className="ohc-fade-right" />

        {/* ── Animated bubbles — same as MarqueeStrip ── */}
        {bubbles.map((b, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: b.w,
              height: b.w,
              top: b.top,
              left: b.left,
              borderRadius: "50%",
              translateY: "-50%",
              translateX: "-50%",
              zIndex: 2,
              pointerEvents: "none",
              opacity: 0.75,
              ...getBubbleStyle(b.type, b.w),
            }}
            animate={{
              y: [0, -(b.w * 0.35), b.w * 0.15, -(b.w * 0.25), 0],
              x: [0, b.w * 0.18, -(b.w * 0.12), b.w * 0.1, 0],
              scale: [1, 1.18, 0.93, 1.12, 1],
              opacity: [0.75, 0.98, 0.58, 0.90, 0.75],
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Back button */}
        <button type="button" onClick={onClose} className="ohc-back-btn">
          <ChevronLeft size={14} />
          Return Home
        </button>

        {/* ── Card ── */}
        <div className="ohc-card">
          {/* Left panel */}
          <div className="ohc-card-left">
            <div className="ohc-brand">
              <img 
                src="/logo.png" 
                className="ohc-logo-img" 
                alt="Own Holiday Club" 
                style={{ 
                  width: '140px',
                  filter: 'drop-shadow(0px 0px 10px rgba(255, 255, 255, 1)) drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.9)) drop-shadow(0px 0px 30px rgba(255, 255, 255, 0.6))'
                }} 
              />
            </div>

            <div className="ohc-left-body">
              <div className="ohc-left-heading">{heading}</div>
              <div className="ohc-left-sub">{sub}</div>
            </div>

            <div className="ohc-left-footer">
              <div className="ohc-badge">
                <div className="ohc-badge-dot" />
                Exclusive Member Benefits
              </div>
              <div className="ohc-badge">
                <div className="ohc-badge-dot" />
                Priority Booking Access
              </div>
              <div className="ohc-badge">
                <div className="ohc-badge-dot" />
                Worldwide Destinations
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="ohc-card-right">
            <div className="ohc-step-label">
              {isLogin ? "Member Portal" : "Account Recovery"}
            </div>
            <div className="ohc-form-title">
              {isLogin
                ? "Welcome back"
                : mode === "recover"
                ? "Forgot password"
                : mode === "verify-reset"
                ? "Verify OTP"
                : "Set new password"}
            </div>
            <div className="ohc-form-sub">
              {isLogin
                ? "Use your email or membership ID with your password."
                : "We'll help you restore access in a few quick steps."}
            </div>

            <div className="ohc-feedback-area">
              <AnimatePresence mode="wait">
                {feedback.message && (
                  <motion.div
                    key={feedback.message}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className={`ohc-feedback ${feedback.type}`}
                  >
                    {feedback.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <form
              onSubmit={isLogin ? handleLogin : handleForgotPassword}
              className="ohc-fields"
            >
              <OhcInputField
                icon={<UserSquare2 size={16} />}
                label="Membership ID / Email"
                value={form.identifier}
                onChange={(v) => updateField("identifier", v)}
              />

              {isLogin && (
                <OhcInputField
                  icon={<Lock size={16} />}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(v) => updateField("password", v)}
                  trailingButton={
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="ohc-eye-btn"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                />
              )}

              {mode === "verify-reset" && (
                <OhcInputField
                  icon={<Mail size={16} />}
                  label="OTP Code"
                  value={form.otp}
                  onChange={(v) => updateField("otp", v)}
                />
              )}

              {mode === "reset-password" && (
                <>
                  <OhcInputField
                    icon={<Mail size={16} />}
                    label="OTP Code"
                    value={form.otp}
                    onChange={(v) => updateField("otp", v)}
                  />
                  <OhcInputField
                    icon={<KeyRound size={16} />}
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    value={form.newPassword}
                    onChange={(v) => updateField("newPassword", v)}
                    trailingButton={
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="ohc-eye-btn"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    }
                  />
                </>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="ohc-submit"
              >
                {isLoading
                  ? "Please wait..."
                  : isLogin
                  ? "Sign In"
                  : mode === "recover"
                  ? "Send OTP"
                  : mode === "verify-reset"
                  ? "Verify OTP"
                  : "Update Password"}
                <ArrowRight size={15} />
              </button>
            </form>

            <div className="ohc-bottom-row">
              {isLogin ? (
                <button
                  type="button"
                  onClick={() => setMode("recover")}
                  className="ohc-text-link"
                >
                  Forgot Password?
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="ohc-text-link"
                >
                  ← Back to Login
                </button>
              )}
            </div>

            <div className="ohc-enc-row">
              <div className="ohc-enc-dot" />
              <ShieldCheck size={12} style={{ color: "#2563eb" }} />
              Bank-Grade 256-bit Encryption
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function OhcInputField({
  icon,
  label,
  value,
  onChange,
  type = "text",
  trailingButton = null,
}) {
  return (
    <label style={{ display: "block" }}>
      <span className="ohc-field-label">{label}</span>
      <div className="ohc-field-wrap">
        <span className="ohc-field-icon">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="ohc-field-input"
        />
        {trailingButton}
      </div>
    </label>
  );
}