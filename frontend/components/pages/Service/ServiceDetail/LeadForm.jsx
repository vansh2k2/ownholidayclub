"use client";

import React, { useState, useEffect, useRef } from "react";
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
  MapPin,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollAnimate from "@/components/common/ScrollAnimate";
import { Layers } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



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
  <div className="flex flex-col gap-1">
    {label && (
      <label
        className="mb-1 block text-[10px] font-bold uppercase tracking-[0.05em] text-slate-800"
      >
        {label}
      </label>
    )}
    <div className="relative">
      {!textarea && Icon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={16} />
        </span>
      )}
      {textarea ? (
        <textarea
          rows={rows || 2}
          {...props}
          className="w-full rounded-none border border-slate-400 bg-white p-2.5 leading-tight text-[12px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]/10 disabled:opacity-50 resize-none"
        />
      ) : (
        <input
          {...props}
          className={`h-8 w-full rounded-none border border-slate-400 bg-white ${
            Icon ? "pl-10 pr-3" : "px-3"
          } py-0 leading-tight text-[12px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400`}
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

  const [dynamicServices, setDynamicServices] = useState([]);
  const [dynamicBudgets, setDynamicBudgets] = useState([]);

  useEffect(() => {
    const fetchServicesAndBudgets = async () => {
      try {
        const [servRes, budgRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/explore-services`),
          fetch(`${API_BASE_URL}/api/budgets`)
        ]);
        const servData = await servRes.json();
        const budgData = await budgRes.json();
        
        if (servData.success && servData.data) {
          const d = servData.data;
          setDynamicServices(Array.isArray(d) ? (d[0]?.services || []) : (d.services || []));
        }
        if (budgData.success) {
          setDynamicBudgets(budgData.data || []);
        }
      } catch (err) {
        console.error("Error fetching dynamic data:", err);
      }
    };
    fetchServicesAndBudgets();
  }, []);

  useEffect(() => {
    if (formStep === "success") {
      setFromLocationInput("");
      setToLocationInput("");
      setIsMobileVerified(false);
      setIsMobileOtpSent(false);
      setMobileOtp("");
      setIsEmailVerified(false);
      setIsEmailOtpSent(false);
      setEmailOtp("");
      setIsEmailSkipped(false);
      setLocalFeedback("");
    }
  }, [formStep]);

  const [fromLocationInput, setFromLocationInput] = useState(formData?.fromLocation || "");
  const [toLocationInput, setToLocationInput] = useState(formData?.toLocation || "");
  const [fromLocationOptions, setFromLocationOptions] = useState([]);
  const [toLocationOptions, setToLocationOptions] = useState([]);
  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
  const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);
  const skipFromFetch = useRef(false);
  const skipToFetch = useRef(false);

  const fetchLocationOptions = async (input, setOptions, setDropdown) => {
    if (!input || input.length < 2) { setOptions([]); setDropdown(false); return; }
    try {
      const res = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': 'AIzaSyDarNwOH5Gfi1KseDZ82fkh2b0wn66uudg' },
        body: JSON.stringify({ input })
      });
      const data = await res.json();
      if (data.suggestions) { setOptions(data.suggestions.map(s => s.placePrediction.text.text)); setDropdown(true); }
      else setOptions([]);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    if (skipFromFetch.current) { skipFromFetch.current = false; return; }
    const timer = setTimeout(() => fetchLocationOptions(fromLocationInput, setFromLocationOptions, setIsFromDropdownOpen), 300);
    return () => clearTimeout(timer);
  }, [fromLocationInput]);

  useEffect(() => {
    if (skipToFetch.current) { skipToFetch.current = false; return; }
    const timer = setTimeout(() => fetchLocationOptions(toLocationInput, setToLocationOptions, setIsToDropdownOpen), 300);
    return () => clearTimeout(timer);
  }, [toLocationInput]);

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

                      {/* Row 1: Name + Phone + Email */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <div className="flex flex-col gap-1">
                          <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.05em] text-slate-800">
                            Phone Number
                          </label>
                          <div className="flex gap-2 items-center">
                            <div className="relative flex-1">
                              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                <Phone size={16} />
                              </span>
                              <input
                                type="tel"
                                name="phone"
                                required
                                disabled={isMobileVerified || formStep === "submitting"}
                                value={formData?.phone || ""}
                                onChange={handleInputChange}
                                placeholder="10-digit mobile"
                                className="h-8 w-full rounded-none border border-slate-400 bg-white pl-10 pr-3 py-0 leading-tight text-[12px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                              />
                            </div>
                            {!isMobileVerified ? (
                              <button
                                type="button"
                                onClick={handleSendMobileOtp}
                                disabled={isSendingMobileOtp || !formData?.phone || formData.phone.length !== 10}
                                className="h-8 px-4 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-40 rounded-none shrink-0"
                              >
                                {isSendingMobileOtp ? "Wait..." : isMobileOtpSent ? "Resend" : "OTP"}
                              </button>
                            ) : (
                              <span className="h-8 px-3 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center rounded-none border border-emerald-200 shrink-0">
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
                                className="h-8 px-3 border border-slate-400 bg-white text-center text-xs font-bold w-full outline-none focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]/10 rounded-none placeholder:text-slate-400 text-slate-900"
                              />
                              <button
                                type="button"
                                onClick={handleVerifyMobileOtp}
                                disabled={isVerifyingMobileOtp || mobileOtp.length !== 6}
                                className="h-8 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-45 rounded-none shrink-0"
                              >
                                {isVerifyingMobileOtp ? "Verifying..." : "Verify"}
                              </button>
                            </motion.div>
                          )}
                        </div>

                        {/* Email & OTP */}
                        <div className="flex flex-col gap-1">
                          <div className="relative mb-1">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.05em] text-slate-800">
                              Email Address
                            </label>
                            {!isEmailVerified && !isEmailSkipped && (
                              <button
                                type="button"
                                onClick={handleSkipEmailOtp}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-[9px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600 transition-colors"
                              >
                                Skip
                              </button>
                            )}
                          </div>
                          <div className="flex gap-2 items-center">
                            <div className="relative flex-1">
                              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                <Mail size={16} />
                              </span>
                              <input
                                type="email"
                                name="email"
                                required
                                disabled={isEmailVerified || formStep === "submitting"}
                                value={formData?.email || ""}
                                onChange={handleInputChange}
                                placeholder="you@example.com"
                                className="h-8 w-full rounded-none border border-slate-400 bg-white pl-10 pr-3 py-0 leading-tight text-[12px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                              />
                            </div>
                            {!isEmailVerified && !isEmailSkipped ? (
                              <button
                                type="button"
                                onClick={handleSendEmailOtp}
                                disabled={isSendingEmailOtp || !formData?.email || !EMAIL_PATTERN.test(formData.email)}
                                className="h-8 px-4 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-40 rounded-none shrink-0"
                              >
                                {isSendingEmailOtp ? "Wait..." : isEmailOtpSent ? "Resend" : "OTP"}
                              </button>
                            ) : (
                              <span className={`h-8 px-3 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center rounded-none border shrink-0 ${isEmailVerified ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-500 border-slate-200"}`}>
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
                                className="h-8 px-3 border border-slate-400 text-center text-xs font-bold w-full outline-none focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]/10 rounded-none bg-white placeholder:text-slate-400 text-slate-900"
                              />
                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={handleVerifyEmailOtp}
                                  disabled={isVerifyingEmailOtp || emailOtp.length !== 6}
                                  className="h-8 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-45 rounded-none"
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
                      </div>

                      {/* Row 2: From Location + To Location + Service */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1 relative">
                          <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.05em] text-slate-800">
                            From Location
                          </label>
                          <div className="relative">
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                              <MapPin size={16} />
                            </span>
                            <input
                              type="text"
                              value={fromLocationInput}
                              onChange={(e) => {
                                setFromLocationInput(e.target.value);
                                handleInputChange({ target: { name: 'fromLocation', value: e.target.value } });
                              }}
                              onFocus={() => {
                                if (fromLocationOptions.length > 0) setIsFromDropdownOpen(true);
                              }}
                              onBlur={() => setTimeout(() => setIsFromDropdownOpen(false), 200)}
                              disabled={formStep === "submitting"}
                              placeholder="Where from?"
                              className="h-8 w-full rounded-none border border-slate-400 bg-white pl-10 pr-3 py-0 leading-tight text-[12px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                            />
                            <AnimatePresence>
                              {isFromDropdownOpen && fromLocationOptions.length > 0 && (
                                <motion.div
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-slate-200 shadow-xl max-h-48 overflow-y-auto"
                                  style={{ borderRadius: "0px" }}
                                >
                                  {fromLocationOptions.map((opt, i) => (
                                    <div
                                      key={i}
                                      className="px-3 py-2 text-[12px] text-slate-700 hover:bg-amber-50 cursor-pointer border-b border-slate-100 last:border-0"
                                      onClick={() => {
                                        skipFromFetch.current = true;
                                        setFromLocationInput(opt);
                                        handleInputChange({ target: { name: 'fromLocation', value: opt } });
                                        setIsFromDropdownOpen(false);
                                      }}
                                    >
                                      {opt}
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1 relative">
                          <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.05em] text-slate-800">
                            To Location
                          </label>
                          <div className="relative">
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                              <MapPin size={16} />
                            </span>
                            <input
                              type="text"
                              value={toLocationInput}
                              onChange={(e) => {
                                setToLocationInput(e.target.value);
                                handleInputChange({ target: { name: 'toLocation', value: e.target.value } });
                              }}
                              onFocus={() => {
                                if (toLocationOptions.length > 0) setIsToDropdownOpen(true);
                              }}
                              onBlur={() => setTimeout(() => setIsToDropdownOpen(false), 200)}
                              disabled={formStep === "submitting"}
                              placeholder="Where to?"
                              className="h-8 w-full rounded-none border border-slate-400 bg-white pl-10 pr-3 py-0 leading-tight text-[12px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                            />
                            <AnimatePresence>
                              {isToDropdownOpen && toLocationOptions.length > 0 && (
                                <motion.div
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-slate-200 shadow-xl max-h-48 overflow-y-auto"
                                  style={{ borderRadius: "0px" }}
                                >
                                  {toLocationOptions.map((opt, i) => (
                                    <div
                                      key={i}
                                      className="px-3 py-2 text-[12px] text-slate-700 hover:bg-amber-50 cursor-pointer border-b border-slate-100 last:border-0"
                                      onClick={() => {
                                        skipToFetch.current = true;
                                        setToLocationInput(opt);
                                        handleInputChange({ target: { name: 'toLocation', value: opt } });
                                        setIsToDropdownOpen(false);
                                      }}
                                    >
                                      {opt}
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* Select Service */}
                        <div className="flex flex-col gap-1">
                          <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.05em] text-slate-800">
                            Select Service
                          </label>
                          <div className="relative">
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                              <Compass size={16} />
                            </span>
                            <select
                              name="travelType"
                              value={formData?.travelType || ""}
                              onChange={handleInputChange}
                              disabled={formStep === "submitting"}
                              className="h-8 w-full appearance-none rounded-none border border-slate-400 bg-white pl-10 pr-9 py-0 leading-tight text-[12px] font-medium text-slate-900 outline-none transition focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                            >
                              <option value="" disabled>Select a service...</option>
                              {dynamicServices.length > 0 ? dynamicServices.map((srv, idx) => (
                                <option key={idx} value={srv.title}>{srv.title}</option>
                              )) : (
                                <>
                                  <option value="Holiday">Holiday</option>
                                  <option value="Events">Events</option>
                                  <option value="Wedding">Wedding</option>
                                  <option value="Outing">Outing</option>
                                </>
                              )}
                            </select>
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                              <ChevronDown size={14} />
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Row 3: Budget + Category */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Budget */}
                        <div className="flex flex-col gap-1">
                          <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.05em] text-slate-800">
                            Budget
                          </label>
                          <div className="relative">
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                              <IndianRupee size={16} />
                            </span>
                            <select
                              name="budget"
                              value={formData?.budget || ""}
                              onChange={handleInputChange}
                              disabled={formStep === "submitting"}
                              className="h-8 w-full appearance-none rounded-none border border-slate-400 bg-white pl-10 pr-9 py-0 leading-tight text-[12px] font-medium text-slate-900 outline-none transition focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                            >
                              <option value="">Select a budget...</option>
                              {(() => {
                                const matchedBudget = dynamicBudgets.find(b => b.title === formData?.travelType);
                                if (matchedBudget && matchedBudget.budgets.length > 0) {
                                  return matchedBudget.budgets.map((opt, idx) => (
                                    <option key={idx} value={opt}>{opt}</option>
                                  ));
                                }
                                return null;
                              })()}
                            </select>
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                              <ChevronDown size={14} />
                            </span>
                          </div>
                        </div>

                        {subEventsList.length > 0 && (
                          <div className={`grid ${serviceData?.title?.toLowerCase().includes("wedding") ? "grid-cols-2 gap-4" : "grid-cols-1"} md:col-span-2`}>
                            <div className="flex flex-col gap-1">
                              <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.05em] text-slate-800">
                                {serviceData?.title?.toLowerCase().includes("wedding") ? "Type of Marriage" : "Service Category"}
                              </label>
                              <div className="relative">
                                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                  <Layers size={16} />
                                </span>
                                <select
                                  name="subEvent"
                                  value={formData?.subEvent || ""}
                                  onChange={handleInputChange}
                                  disabled={formStep === "submitting"}
                                  className="h-8 w-full appearance-none rounded-none border border-slate-400 bg-white pl-10 pr-9 py-0 leading-tight text-[12px] font-medium text-slate-900 outline-none transition focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                                >
                                  <option value="">{serviceData?.title?.toLowerCase().includes("wedding") ? "Select a type..." : "Select a category..."}</option>
                                  {subEventsList.map((evt, idx) => (
                                    <option key={evt._id || idx} value={evt.title}>
                                      {evt.title}
                                    </option>
                                  ))}
                                </select>
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                  <ChevronDown size={14} />
                                </span>
                              </div>
                            </div>
                            
                            {serviceData?.title?.toLowerCase().includes("wedding") && (
                              <InputField
                                icon={Calendar}
                                label="Date of Marriage"
                                type="date"
                                name="marriageDate"
                                value={formData?.marriageDate || ""}
                                onChange={handleInputChange}
                                disabled={formStep === "submitting"}
                              />
                            )}
                          </div>
                        )}
                      </div>


                      {/* Row 4: Dates + Guests */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        {serviceData?.title?.toUpperCase().includes("OUTING") ? (
                          <div className="grid grid-cols-2 gap-2">
                            <InputField
                              icon={User}
                              label="Adults"
                              type="number"
                              name="adults"
                              min="1"
                              value={formData?.adults || ""}
                              onChange={handleInputChange}
                              disabled={formStep === "submitting"}
                              placeholder="2"
                            />
                            <InputField
                              icon={User}
                              label="Kids (<10 yrs)"
                              type="number"
                              name="kids"
                              min="0"
                              value={formData?.kids || ""}
                              onChange={handleInputChange}
                              disabled={formStep === "submitting"}
                              placeholder="0"
                            />
                          </div>
                        ) : (
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
                        )}
                      </div>

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
