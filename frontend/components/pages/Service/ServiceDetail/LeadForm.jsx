"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  CheckCircle2,
  Sparkles,
  Mail,
  Phone,
  Send,
  User,
  Star,
  Shield,
  CheckCircle,
  IndianRupee,
  Compass,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollAnimate from "@/components/common/ScrollAnimate";
import { Layers } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BUDGET_OPTIONS = {
  Holiday: [
    { label: "Below 5,000 (per day)", value: "Below 5000" },
    { label: "5,000 - 7,000 (per day)", value: "5000 - 7000" },
    { label: "7,000 - 10,000 (per day)", value: "7000 - 10000" },
    { label: "Above 10,000 (per day)", value: "Above 10000" },
  ],
  Events: [
    { label: "Below 1,000 (per person)", value: "Below 1000" },
    { label: "1,000 - 2,000 (per person)", value: "1000 - 2000" },
    { label: "2,000 - 3,000 (per person)", value: "2000 - 3000" },
    { label: "Above 3,000 (per person)", value: "Above 3000" },
  ],
  Wedding: [
    { label: "Below 1,500 (per person)", value: "Below 1500" },
    { label: "1,500 - 2,500 (per person)", value: "1500 - 2500" },
    { label: "2,500 - 3,500 (per person)", value: "2500 - 3500" },
    { label: "Above 3,500 (per person)", value: "Above 3500" },
  ],
  Outing: [
    { label: "Below 500 (per person)", value: "Below 500" },
    { label: "1,000 - 2,000 (per person)", value: "1000 - 2000" },
    { label: "3,000 - 5,000 (per person)", value: "3000 - 5000" },
    { label: "Above 5,000 (per person)", value: "Above 5000" },
  ],
};

/* ── Floating particles ── */
function Particles() {
  const dots = [
    { top: "10%", left: "10%", size: 2, opacity: 0.3 },
    { top: "20%", left: "80%", size: 3, opacity: 0.2 },
    { top: "45%", left: "20%", size: 2, opacity: 0.4 },
    { top: "70%", left: "70%", size: 4, opacity: 0.15 },
    { top: "85%", left: "30%", size: 2, opacity: 0.25 },
    { top: "35%", left: "60%", size: 3, opacity: 0.1 },
    { top: "15%", left: "40%", size: 2, opacity: 0.2 },
    { top: "60%", left: "90%", size: 3, opacity: 0.3 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-amber-500/40"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            filter: "blur(1px)",
            animation: `float-particle ${4 + i * 0.8}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes float-particle {
          0%   { transform: translate(0, 0) scale(1);    opacity: 0.2; }
          50%  { transform: translate(10px, -15px) scale(1.2); opacity: 0.4; }
          100% { transform: translate(-5px, -30px) scale(1); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}

/* ── Input Field ── */
const InputField = ({ icon: Icon, label, textarea, rows, ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label
        className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500"
        
      >
        {label}
      </label>
    )}
    <div className="relative group">
      {!textarea && Icon && (
        <Icon
          size={14}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors z-10"
        />
      )}
      {textarea ? (
        <textarea
          rows={rows || 2}
          {...props}
          className="w-full p-2.5 bg-white border border-slate-300 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all text-[12px] text-slate-900 placeholder:text-slate-300 resize-none disabled:opacity-50"
          style={{ borderRadius: "6px" }}
        />
      ) : (
        <input
          {...props}
          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all text-[12px] text-slate-900 placeholder:text-slate-300 disabled:opacity-50"
          style={{ borderRadius: "6px" }}
        />
      )}
    </div>
  </div>
);

export default function LeadForm({
  serviceData = {},
  formData = {},
  formStep,
  formError,
  handleInputChange,
  handleSubmitLead,
}) {
  const [mobileOtp, setMobileOtp] = useState("");
  const [isSendingMobileOtp, setIsSendingMobileOtp] = useState(false);
  const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [isVerifyingMobileOtp, setIsVerifyingMobileOtp] = useState(false);

  const [emailOtp, setEmailOtp] = useState("");
  const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false);
  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerifyingEmailOtp, setIsVerifyingEmailOtp] = useState(false);
  const [isEmailSkipped, setIsEmailSkipped] = useState(false);

  const [localFeedback, setLocalFeedback] = useState("");

  const subEventsList = serviceData?.subServices 
    ? [...serviceData.subServices].sort((a, b) => (a.order || 0) - (b.order || 0)) 
    : [];

  // Reset verification if phone/email changes
  useEffect(() => {
    setIsMobileVerified(false);
    setIsMobileOtpSent(false);
    setMobileOtp("");
  }, [formData?.phone]);

  useEffect(() => {
    setIsEmailVerified(false);
    setIsEmailOtpSent(false);
    setEmailOtp("");
    setIsEmailSkipped(false);
  }, [formData?.email]);

  const handleSendMobileOtp = async () => {
    if (!formData?.phone || formData.phone.length !== 10) {
      setLocalFeedback("Please enter a valid 10-digit phone number.");
      return;
    }
    try {
      setIsSendingMobileOtp(true);
      setLocalFeedback("");
      const res = await fetch(`${API_BASE_URL}/api/holiday-leads/mobile/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: formData.phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP.");
      setIsMobileOtpSent(true);
      setLocalFeedback("OTP sent to your mobile number.");
    } catch (err) {
      setLocalFeedback(err.message);
    } finally {
      setIsSendingMobileOtp(false);
    }
  };

  const handleVerifyMobileOtp = async () => {
    if (mobileOtp.length !== 6) {
      setLocalFeedback("Please enter the 6-digit OTP.");
      return;
    }
    try {
      setIsVerifyingMobileOtp(true);
      setLocalFeedback("");
      const res = await fetch(`${API_BASE_URL}/api/holiday-leads/mobile/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: formData.phone, otp: mobileOtp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid OTP code.");
      setIsMobileVerified(true);
      setLocalFeedback("Phone number verified successfully!");
    } catch (err) {
      setLocalFeedback(err.message);
    } finally {
      setIsVerifyingMobileOtp(false);
    }
  };

  const handleSendEmailOtp = async () => {
    if (!formData?.email || !EMAIL_PATTERN.test(formData.email)) {
      setLocalFeedback("Please enter a valid email address.");
      return;
    }
    try {
      setIsSendingEmailOtp(true);
      setLocalFeedback("");
      const res = await fetch(`${API_BASE_URL}/api/holiday-leads/email/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP.");
      setIsEmailOtpSent(true);
      setLocalFeedback("OTP sent to your email.");
    } catch (err) {
      setLocalFeedback(err.message);
    } finally {
      setIsSendingEmailOtp(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    if (emailOtp.length !== 6) {
      setLocalFeedback("Please enter the 6-digit OTP.");
      return;
    }
    try {
      setIsVerifyingEmailOtp(true);
      setLocalFeedback("");
      const res = await fetch(`${API_BASE_URL}/api/holiday-leads/email/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: emailOtp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid OTP code.");
      setIsEmailVerified(true);
      setLocalFeedback("Email address verified successfully!");
    } catch (err) {
      setLocalFeedback(err.message);
    } finally {
      setIsVerifyingEmailOtp(false);
    }
  };

  const handleSkipEmailOtp = () => {
    setIsEmailVerified(false);
    setIsEmailOtpSent(false);
    setIsEmailSkipped(true);
    setLocalFeedback("Email OTP verification skipped.");
  };

  return (
    <section
      id="inquiry-form"
      className="pt-2 pb-8 md:pt-4 md:pb-12 relative z-20 scroll-mt-20"
    >
      <div className="site-width mx-auto px-4 md:px-8 max-w-[48rem]">
        <div
          className="grid lg:grid-cols-12 overflow-hidden border border-slate-200 shadow-2xl"
          style={{ borderRadius: "10px" }}
        >
          {/* ── Left Panel ── */}
          <div
            className="lg:col-span-4 relative overflow-hidden flex flex-col justify-between p-7 md:p-9"
            style={{
              background: "linear-gradient(145deg, #ffffff 0%, #fff9e6 100%)",
              borderRight: "1px solid #f1f5f9",
            }}
          >
            <Particles />

            <div className="relative z-10">
              <div
                className="w-11 h-11 bg-slate-900 flex items-center justify-center mb-8 shadow-lg shadow-slate-900/10"
                style={{ borderRadius: "10px" }}
              >
                <Sparkles size={20} className="text-amber-500" />
              </div>

              <h2
                className="text-2xl md:text-3xl font-bold text-slate-900 leading-[1.1] mb-3"
                
              >
                Plan Your Event
                <br />
                <span className="italic font-normal text-amber-600">
                  for {serviceData?.title}
                </span>
              </h2>

              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
                <div className="w-2 h-[2px] bg-amber-300 rounded-full" />
              </div>

              <p
                className="text-slate-500 text-[13px] leading-relaxed mb-10"
                
              >
                Connect with our dedicated experience team. We'll understand your goals and curate a tailored proposal.
              </p>

              <div className="space-y-4">
                {["Personalized Curation", "VIP Coordination", "End-to-End Planning"].map(
                  (perk, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 bg-amber-100 flex items-center justify-center shrink-0"
                        style={{ borderRadius: "6px" }}
                      >
                        <CheckCircle2 size={12} className="text-amber-600" />
                      </div>
                      <span
                        className="text-[12px] text-slate-600 font-semibold"
                        
                      >
                        {perk}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="relative z-10 mt-12 pt-6 border-t border-amber-200/50">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    className="text-amber-500 fill-amber-500"
                  />
                ))}
              </div>
              <p
                className="text-[12px] text-slate-500 leading-relaxed"
                
              >
                Trusted by{" "}
                <span className="font-bold text-slate-800">280,000+</span>{" "}
                luxury clients.
              </p>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8">
            <ScrollAnimate variant="homeDestination">
              <AnimatePresence mode="wait">
                {formStep === "success" ? (
                  /* ── SUCCESS STATE ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="border-2 border-green-500 p-12 bg-green-50 shadow-lg flex flex-col items-center justify-center min-h-[420px]"
                    style={{ borderRadius: "10px" }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl font-bold text-slate-900 mb-3 text-center"
                      
                    >
                      Successfully Sent!
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-slate-500 text-center mb-8 max-w-xs mx-auto text-[13px] leading-relaxed"
                      
                    >
                      Thank you,{" "}
                      <span className="font-semibold text-slate-800">
                        {formData?.name}
                      </span>
                      . Our experts will contact you within 24 hours.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-2 text-sm text-slate-400"
                      
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Form will reset automatically...
                    </motion.div>
                  </motion.div>
                ) : (
                  /* ── FORM STATE ── */
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-5">
                      <h3
                        className="text-lg font-bold text-slate-900 mb-0.5"
                        
                      >
                        Inquiry Details
                      </h3>
                      <p
                        className="text-[11px] text-slate-400 font-medium"
                        
                      >
                        Please provide your event details for a custom proposal.
                      </p>
                    </div>

                    <form onSubmit={handleSubmitLead} className="space-y-3.5">
                      {formError && (
                        <div
                          className="border border-red-200 bg-red-50 px-4 py-3 text-[12px] font-medium text-red-600"
                          style={{
                            borderRadius: "8px",
                            }}
                        >
                          {formError}
                        </div>
                      )}
                      {localFeedback && (
                        <div
                          className="border border-blue-200 bg-blue-50 px-4 py-3 text-[12px] font-medium text-blue-600"
                          style={{
                            borderRadius: "8px",
                            }}
                        >
                          {localFeedback}
                        </div>
                      )}

                      {/* Name + Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputField
                          icon={User}
                          label="Full Name"
                          type="text"
                          name="name"
                          required
                          value={formData?.name || ""}
                          onChange={handleInputChange}
                          disabled={formStep === "submitting"}
                          placeholder="Enter your full name"
                        />
                        
                        {/* Mobile Number & OTP */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500"
                            
                          >
                            Phone Number
                          </label>
                          <div className="flex gap-2 items-start">
                            <div className="relative group flex-1">
                              <Phone
                                size={14}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors z-10"
                              />
                              <input
                                type="tel"
                                name="phone"
                                required
                                disabled={isMobileVerified || formStep === "submitting"}
                                value={formData?.phone || ""}
                                onChange={handleInputChange}
                                placeholder="10-digit mobile"
                                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all text-[12px] text-slate-900 placeholder:text-slate-300 disabled:opacity-50"
                                style={{ borderRadius: "6px" }}
                              />
                            </div>
                            {!isMobileVerified ? (
                              <button
                                type="button"
                                onClick={handleSendMobileOtp}
                                disabled={isSendingMobileOtp || !formData?.phone || formData.phone.length !== 10}
                                className="h-[38px] px-3 bg-slate-900 hover:bg-amber-600 text-white text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-40 rounded"
                              >
                                {isSendingMobileOtp ? "Wait..." : isMobileOtpSent ? "Resend" : "OTP"}
                              </button>
                            ) : (
                              <span className="h-[38px] px-3 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center rounded border border-emerald-200">
                                ✓ Verified
                              </span>
                            )}
                          </div>
                          {isMobileOtpSent && !isMobileVerified && (
                            <motion.div 
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex gap-2 items-center mt-1"
                            >
                              <input
                                type="text"
                                maxLength={6}
                                placeholder="6-digit OTP"
                                value={mobileOtp}
                                onChange={(e) => setMobileOtp(e.target.value.replace(/\D/g, ""))}
                                className="h-8 px-3 border border-slate-300 text-center text-xs font-bold w-full outline-none focus:border-amber-500 rounded"
                              />
                              <button
                                type="button"
                                onClick={handleVerifyMobileOtp}
                                disabled={isVerifyingMobileOtp || mobileOtp.length !== 6}
                                className="h-8 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-45 rounded shrink-0"
                              >
                                {isVerifyingMobileOtp ? "Verifying..." : "Verify"}
                              </button>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Email & OTP */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500"
                          
                        >
                          Email Address
                        </label>
                        <div className="flex gap-2 items-start">
                          <div className="relative group flex-1">
                            <Mail
                              size={14}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors z-10"
                            />
                            <input
                              type="email"
                              name="email"
                              required
                              disabled={isEmailVerified || formStep === "submitting"}
                              value={formData?.email || ""}
                              onChange={handleInputChange}
                              placeholder="you@example.com"
                              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all text-[12px] text-slate-900 placeholder:text-slate-300 disabled:opacity-50"
                              style={{ borderRadius: "6px" }}
                            />
                          </div>
                          {!isEmailVerified && !isEmailSkipped ? (
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={handleSendEmailOtp}
                                disabled={isSendingEmailOtp || !formData?.email || !EMAIL_PATTERN.test(formData.email)}
                                className="h-[38px] px-3 bg-slate-900 hover:bg-amber-600 text-white text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-40 rounded"
                              >
                                {isSendingEmailOtp ? "Wait..." : isEmailOtpSent ? "Resend" : "OTP"}
                              </button>
                              <button
                                type="button"
                                onClick={handleSkipEmailOtp}
                                className="h-[38px] px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600 transition-colors"
                              >
                                Skip
                              </button>
                            </div>
                          ) : (
                            <span className={`h-[38px] px-3 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center rounded border ${isEmailVerified ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-500 border-slate-200"}`}>
                              {isEmailVerified ? "✓ Verified" : "Skipped"}
                            </span>
                          )}
                        </div>
                        {isEmailOtpSent && !isEmailVerified && (
                          <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex gap-2 items-center mt-1"
                          >
                            <input
                              type="text"
                              maxLength={6}
                              placeholder="6-digit OTP"
                              value={emailOtp}
                              onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, ""))}
                              className="h-8 px-3 border border-slate-300 text-center text-xs font-bold w-full outline-none focus:border-amber-500 rounded"
                            />
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={handleVerifyEmailOtp}
                                disabled={isVerifyingEmailOtp || emailOtp.length !== 6}
                                className="h-8 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-45 rounded"
                              >
                                {isVerifyingEmailOtp ? "Verifying..." : "Verify"}
                              </button>
                              <button
                                type="button"
                                onClick={handleSkipEmailOtp}
                                className="h-8 px-2 text-[10px] font-black uppercase text-slate-400 hover:text-slate-600"
                              >
                                Skip
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Dates */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputField
                          icon={Calendar}
                          label="Check-in Date"
                          type="datetime-local"
                          name="checkIn"
                          value={formData?.checkIn || ""}
                          onChange={handleInputChange}
                          disabled={formStep === "submitting"}
                        />
                        <InputField
                          icon={Calendar}
                          label="Check-out Date (Optional)"
                          type="datetime-local"
                          name="checkOut"
                          value={formData?.checkOut || ""}
                          onChange={handleInputChange}
                          disabled={formStep === "submitting"}
                        />
                      </div>

                      {/* Guests */}
                      <div className="grid grid-cols-1 gap-5">
                        <InputField
                          icon={User}
                          label="No of Guests"
                          type="number"
                          name="adults"
                          min="1"
                          value={formData?.adults || ""}
                          onChange={handleInputChange}
                          disabled={formStep === "submitting"}
                          placeholder="2"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Travel Type */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500"
                            
                          >
                            Select Service
                          </label>
                          <div className="relative group">
                            <Compass
                              size={14}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors z-10"
                            />
                            <select
                              name="travelType"
                              value={formData?.travelType || ""}
                              onChange={handleInputChange}
                              disabled={formStep === "submitting"}
                              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all text-[12px] text-slate-900 disabled:opacity-50 appearance-none"
                              style={{ borderRadius: "6px" }}
                            >
                              <option value="" disabled>Select a service...</option>
                              <option value="Holiday">Holiday</option>
                              <option value="Events">Events</option>
                              <option value="Wedding">Wedding</option>
                              <option value="Outing">Outing</option>
                            </select>
                          </div>
                        </div>

                        {/* Budget */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500"
                            
                          >
                            Budget
                          </label>
                          <div className="relative group">
                            <IndianRupee
                              size={14}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors z-10"
                            />
                            <select
                              name="budget"
                              value={formData?.budget || ""}
                              onChange={handleInputChange}
                              disabled={formStep === "submitting"}
                              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all text-[12px] text-slate-900 disabled:opacity-50 appearance-none"
                              style={{ borderRadius: "6px" }}
                            >
                              <option value="">Select a budget...</option>
                              {formData?.travelType && BUDGET_OPTIONS[formData?.travelType]?.map((opt, idx) => (
                                <option key={idx} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      {subEventsList.length > 0 && (
                        <div className="flex flex-col gap-1.5">
                          <label
                            className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500"
                            
                          >
                            Service Category
                          </label>
                          <div className="relative group">
                            <Layers
                              size={14}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors z-10"
                            />
                            <select
                              name="subEvent"
                              value={formData?.subEvent || ""}
                              onChange={handleInputChange}
                              disabled={formStep === "submitting"}
                              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all text-[12px] text-slate-900 disabled:opacity-50 appearance-none"
                              style={{ borderRadius: "6px" }}
                            >
                              <option value="">Select a category...</option>
                              {subEventsList.map((evt, idx) => (
                                <option key={evt._id || idx} value={evt.title}>
                                  {evt.title}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}


                      {/* Message */}
                      <InputField
                        icon={null}
                        label="Special Requests (Optional)"
                        textarea
                        rows={2}
                        name="message"
                        value={formData?.message || ""}
                        onChange={handleInputChange}
                        disabled={formStep === "submitting"}
                        placeholder="Any specific needs or occasions..."
                      />

                      {/* Submit row */}
                      <div className="flex flex-col md:flex-row items-center gap-4 pt-1">
                        <button
                          type="submit"
                          disabled={formStep === "submitting" || !isMobileVerified || (!isEmailVerified && !isEmailSkipped)}
                          className="w-full md:flex-1 flex items-center justify-center gap-3 bg-red-600 text-white px-6 py-2.5 hover:bg-red-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-red-600/10"
                          style={{ borderRadius: "7px", }}
                        >
                          <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                            {formStep === "submitting"
                              ? "Processing..."
                              : "Submit Inquiry"}
                          </span>
                          {formStep !== "submitting" && <Send size={13} />}
                        </button>

                        <div className="flex items-center gap-2 shrink-0">
                          <Shield size={14} className="text-green-600" />
                          <span
                            className="text-[10px] text-slate-400 font-medium uppercase tracking-widest"
                            
                          >
                            100% Secure
                          </span>
                        </div>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </ScrollAnimate>
          </div>
        </div>
      </div>
    </section>
  );
}
