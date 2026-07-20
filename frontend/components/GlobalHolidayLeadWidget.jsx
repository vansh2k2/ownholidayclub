"use client";

import React, { useEffect, useState, useRef } from "react";
import { 
  CheckCircle2, MessageSquare, X, Send, User, Mail, 
  Smartphone, PhoneCall, ChevronRight, ChevronLeft, 
  Calendar, Users, Check 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";

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

const createInitialLeadForm = () => ({
  name: "",
  email: "",
  phone: "",
  location: "",
  locationType: "Domestic",
  checkIn: "",
  checkOut: "",
  adults: 1,
  kids: 0,
  travelType: "Holiday",
  budget: "",
  message: "",
});

export default function GlobalHolidayLeadWidget() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [leadForm, setLeadForm] = useState(createInitialLeadForm);
  const [leadFeedback, setLeadFeedback] = useState({ type: "", message: "" });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  // Destinations and Budgets from API
  const [destinations, setDestinations] = useState([]);
  const [isLoadingDestinations, setIsLoadingDestinations] = useState(false);
  const [callbackBudgets, setCallbackBudgets] = useState([]);

  // OTP Verification States
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

  const [fromLocationInput, setFromLocationInput] = useState("");
  const [fromLocationOptions, setFromLocationOptions] = useState([]);
  const [isFromLocationDropdownOpen, setIsFromLocationDropdownOpen] = useState(false);
  const skipFromFetch = useRef(false);

  const [toLocationInput, setToLocationInput] = useState("");
  const [toLocationOptions, setToLocationOptions] = useState([]);
  const [isToLocationDropdownOpen, setIsToLocationDropdownOpen] = useState(false);
  const skipToFetch = useRef(false);

  // Fetch destinations and budgets from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingDestinations(true);
        const [resDest, resBudget] = await Promise.all([
          fetch(`${API_BASE_URL}/api/destinations`),
          fetch(`${API_BASE_URL}/api/budgets`)
        ]);
        const destResult = await resDest.json();
        const budgetResult = await resBudget.json();
        
        if (destResult.success && Array.isArray(destResult.data)) {
          setDestinations(destResult.data);
        }
        if (budgetResult.success && Array.isArray(budgetResult.data)) {
          const cbBudget = budgetResult.data.find(b => b.type === 'callback');
          if (cbBudget && cbBudget.budgets) {
            setCallbackBudgets(cbBudget.budgets.map(b => ({ label: b, value: b })));
          } else {
            setCallbackBudgets(BUDGET_OPTIONS.Holiday);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setCallbackBudgets(BUDGET_OPTIONS.Holiday);
      } finally {
        setIsLoadingDestinations(false);
      }
    };
    if (isLeadModalOpen) {
      fetchData();
    }
  }, [isLeadModalOpen]);

  // Sync default budget when category changes
  useEffect(() => {
    const defaultBudget = "";
    setLeadForm((prev) => ({ ...prev, budget: defaultBudget }));
  }, [leadForm.travelType]);

  useEffect(() => {
    const handleOpenGlobalModal = () => openLeadModal();
    window.addEventListener("openGlobalLeadModal", handleOpenGlobalModal);
    return () => window.removeEventListener("openGlobalLeadModal", handleOpenGlobalModal);
  }, []);

  useEffect(() => {
    if (!isLeadModalOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeLeadModal();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [isLeadModalOpen]);

  useEffect(() => {
    if (!leadFeedback.message) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setLeadFeedback({ type: "", message: "" });
    }, 6000);

    return () => window.clearTimeout(timeoutId);
  }, [leadFeedback.message]);

  const openLeadModal = () => {
    setLeadForm(createInitialLeadForm());
    setLeadFeedback({ type: "", message: "" });
    setStep(1);
    setIsLeadModalOpen(true);
    setMobileOtp("");
    setEmailOtp("");
    setIsMobileOtpSent(false);
    setIsMobileVerified(false);
    setIsEmailOtpSent(false);
    setIsEmailVerified(false);
    setIsEmailSkipped(false);
    setFromLocationInput("");
    setToLocationInput("");
  };

  const closeLeadModal = () => {
    if (isSubmittingLead) {
      return;
    }

    setIsLeadModalOpen(false);
    setLeadFeedback({ type: "", message: "" });
    setLeadForm(createInitialLeadForm());
    setFromLocationInput("");
    setToLocationInput("");
  };

  const handleLeadFieldChange = (field, value) => {
    setLeadForm((prev) => ({
      ...prev,
      [field]:
        field === "phone"
          ? value.replace(/\D/g, "").slice(0, 10)
          : value,
    }));

    // Reset verification if phone changes
    if (field === "phone") {
      setIsMobileVerified(false);
      setIsMobileOtpSent(false);
      setMobileOtp("");
    }
    // Reset verification if email changes
    if (field === "email") {
      setIsEmailVerified(false);
      setIsEmailOtpSent(false);
      setEmailOtp("");
      setIsEmailSkipped(false);
    }
  };

  useEffect(() => {
    if (skipFromFetch.current) {
      skipFromFetch.current = false;
      return;
    }
    if (!fromLocationInput || fromLocationInput.length < 2) {
      setFromLocationOptions([]);
      setIsFromLocationDropdownOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': 'AIzaSyDarNwOH5Gfi1KseDZ82fkh2b0wn66uudg'
          },
          body: JSON.stringify({ input: fromLocationInput })
        });
        const data = await res.json();
        if (data.suggestions) {
          setFromLocationOptions(data.suggestions.map(s => s.placePrediction.text.text));
          setIsFromLocationDropdownOpen(true);
        } else {
          setFromLocationOptions([]);
        }
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [fromLocationInput]);

  useEffect(() => {
    if (skipToFetch.current) {
      skipToFetch.current = false;
      return;
    }
    if (!toLocationInput || toLocationInput.length < 2) {
      setToLocationOptions([]);
      setIsToLocationDropdownOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': 'AIzaSyDarNwOH5Gfi1KseDZ82fkh2b0wn66uudg'
          },
          body: JSON.stringify({ input: toLocationInput })
        });
        const data = await res.json();
        if (data.suggestions) {
          setToLocationOptions(data.suggestions.map(s => s.placePrediction.text.text));
          setIsToLocationDropdownOpen(true);
        } else {
          setToLocationOptions([]);
        }
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [toLocationInput]);

  // OTP Sending & Verification Actions
  const handleSendMobileOtp = async () => {
    if (leadForm.phone.length !== 10) {
      setLeadFeedback({ type: "error", message: "Please enter a valid 10-digit phone number." });
      return;
    }
    try {
      setIsSendingMobileOtp(true);
      setLeadFeedback({ type: "", message: "" });
      const res = await fetch(`${API_BASE_URL}/api/holiday-leads/mobile/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: leadForm.phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP.");
      setIsMobileOtpSent(true);
      setLeadFeedback({ 
        type: "success", 
        message: "Verification OTP sent to your mobile number." 
      });
    } catch (err) {
      setLeadFeedback({ type: "error", message: err.message });
    } finally {
      setIsSendingMobileOtp(false);
    }
  };

  const handleVerifyMobileOtp = async () => {
    if (mobileOtp.length !== 6) {
      setLeadFeedback({ type: "error", message: "Please enter the 6-digit OTP." });
      return;
    }
    try {
      setIsVerifyingMobileOtp(true);
      setLeadFeedback({ type: "", message: "" });
      const res = await fetch(`${API_BASE_URL}/api/holiday-leads/mobile/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: leadForm.phone, otp: mobileOtp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid OTP code.");
      setIsMobileVerified(true);
      setLeadFeedback({ type: "success", message: "Phone number verified successfully!" });
    } catch (err) {
      setLeadFeedback({ type: "error", message: err.message });
    } finally {
      setIsVerifyingMobileOtp(false);
    }
  };

  const handleSendEmailOtp = async () => {
    if (!EMAIL_PATTERN.test(leadForm.email)) {
      setLeadFeedback({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    try {
      setIsSendingEmailOtp(true);
      setLeadFeedback({ type: "", message: "" });
      const res = await fetch(`${API_BASE_URL}/api/holiday-leads/email/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: leadForm.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP.");
      setIsEmailOtpSent(true);
      setLeadFeedback({ 
        type: "success", 
        message: "Verification OTP sent to your email." 
      });
    } catch (err) {
      setLeadFeedback({ type: "error", message: err.message });
    } finally {
      setIsSendingEmailOtp(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    if (emailOtp.length !== 6) {
      setLeadFeedback({ type: "error", message: "Please enter the 6-digit OTP." });
      return;
    }
    try {
      setIsVerifyingEmailOtp(true);
      setLeadFeedback({ type: "", message: "" });
      const res = await fetch(`${API_BASE_URL}/api/holiday-leads/email/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: leadForm.email, otp: emailOtp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid OTP code.");
      setIsEmailVerified(true);
      setLeadFeedback({ type: "success", message: "Email address verified successfully!" });
    } catch (err) {
      setLeadFeedback({ type: "error", message: err.message });
    } finally {
      setIsVerifyingEmailOtp(false);
    }
  };

  const handleSkipEmailOtp = () => {
    setIsEmailVerified(false);
    setIsEmailOtpSent(false);
    setIsEmailSkipped(true);
    setLeadFeedback({ type: "success", message: "Email OTP verification skipped." });
  };

  const handleNextStep = () => {
    const name = String(leadForm.name || "").trim();
    if (name.length < 2) {
      setLeadFeedback({ type: "error", message: "Please enter your full name." });
      return;
    }
    if (!isMobileVerified) {
      setLeadFeedback({ type: "error", message: "Please verify your mobile number with OTP first." });
      return;
    }
    if (!EMAIL_PATTERN.test(leadForm.email)) {
      setLeadFeedback({ type: "error", message: "Please enter your email address." });
      return;
    }
    if (!isEmailVerified && !isEmailSkipped) {
      setLeadFeedback({ type: "error", message: "Please verify your email or click Skip." });
      return;
    }
    setStep(2);
    setLeadFeedback({ type: "", message: "" });
  };

  const handleLeadSubmit = async (event) => {
    event.preventDefault();

    if (!leadForm.budget) {
      setLeadFeedback({ type: "error", message: "Please select a budget." });
      return;
    }

    try {
      setIsSubmittingLead(true);
      setLeadFeedback({ type: "", message: "" });

      const response = await fetch(`${API_BASE_URL}/api/holiday-leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: leadForm.name,
          email: leadForm.email,
          phone: leadForm.phone,
          location: fromLocationInput,
          searchLocation: toLocationInput,
          locationType: leadForm.locationType,
          checkIn: leadForm.checkIn,
          checkOut: leadForm.checkOut,
          adults: leadForm.adults,
          kids: leadForm.kids,
          travelType: leadForm.travelType,
          budget: leadForm.budget,
          message: leadForm.message,
          source: "callback-widget",
          contextType: "callback-request",
          contextName: "Floating Callback Widget",
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to submit lead.");
      }

      setLeadFeedback({
        type: "success",
        message: "Thanks you, Our team will contact you in 24 hrs.",
      });
      setLeadForm(createInitialLeadForm());
      setFromLocationInput("");
      setToLocationInput("");
      setMobileOtp("");
      setIsMobileOtpSent(false);
      setIsMobileVerified(false);
      setEmailOtp("");
      setIsEmailOtpSent(false);
      setIsEmailVerified(false);
      setIsEmailSkipped(false);
      
      // Auto-close modal after success
      setTimeout(() => {
        setIsLeadModalOpen(false);
        setStep(1);
        setLeadFeedback({ type: "", message: "" });
      }, 3000);
    } catch (error) {
      setLeadFeedback({
        type: "error",
        message: error.message || "Failed to submit lead.",
      });
    } finally {
      setIsSubmittingLead(false);
    }
  };

  // Filter locations by Domestic/International region toggle
  const filteredLocations = destinations.filter(
    (dest) => dest.region?.toLowerCase() === leadForm.locationType.toLowerCase()
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
        .modal-luxury { font-family: 'Poppins', sans-serif; }
        .modal-right-roboto { font-family: 'Roboto', sans-serif; }
      ` }} />

      <AnimatePresence>
        {leadFeedback.message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed right-4 top-24 z-[120] w-full max-w-sm px-2 sm:right-6 sm:px-0 modal-luxury"
          >
            <div
              className={`border-l-4 px-5 py-3 text-xs font-bold shadow-2xl backdrop-blur-md ${
                leadFeedback.type === "error"
                  ? "border-red-600 bg-red-50/90 text-red-800"
                  : "border-emerald-600 bg-emerald-50/90 text-emerald-800"
              }`}
            >
              <div className="flex items-center gap-3">
                {leadFeedback.type === "success" ? (
                  <CheckCircle2 size={16} className="text-emerald-600" />
                ) : null}
                {leadFeedback.message}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={openLeadModal}
        aria-label="Open holiday lead form"
        className="fixed bottom-20 sm:bottom-4 right-3 z-[90] flex flex-col items-end gap-1 group modal-luxury"
      >
        <span className="bg-white text-[#C8102E] text-[7px] md:text-[8px] font-black px-2 py-1 rounded-sm shadow-md transition-all duration-300 uppercase tracking-widest border border-red-100 mb-0.5 flex items-center gap-1.5 whitespace-nowrap">
          <MessageSquare className="w-3 h-3 md:w-4 md:h-4" />
          Request Call Back
        </span>
        <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#C8102E] text-white shadow-[0_10px_30px_rgba(200,16,46,0.25)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 md:h-14 md:w-14">
          <Mail className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.2} />
          <div className="absolute inset-0 rounded-full bg-[#C8102E] opacity-20 animate-ping" />
        </div>
      </button>

      <AnimatePresence>
        {isLeadModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 modal-luxury">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLeadModal}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ type: "spring", damping: 22, stiffness: 150 }}
              className="relative z-10 w-full max-w-3xl bg-white shadow-[0_50px_120px_rgba(0,0,0,0.6)] border border-white/20 overflow-hidden rounded-2xl"
            >
              <div className="flex flex-col md:flex-row min-h-[500px]">
                {/* Left Side - Visual Branding */}
                <div className="hidden md:flex md:w-5/12 relative flex-col justify-between overflow-hidden text-white p-8 bg-slate-950">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110 opacity-70"
                    style={{ 
                      backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1000')",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-red-950/80" />
                  
                  <div className="relative z-10">
                    <img src="/logo.png" className="w-36" alt="Own Holiday Club" />
                    <h3 className="mt-10 text-3xl font-black leading-[1.1] tracking-tighter uppercase">
                      Your Next <br/>Grand <br/>Escape.
                    </h3>
                  </div>

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full border flex items-center justify-center text-xs font-black transition-all ${step === 1 ? "bg-white text-slate-950 border-white" : "bg-emerald-500 border-emerald-500 text-white"}`}>
                        {step === 1 ? "1" : <Check size={14} />}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/95">Verify Identity</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full border flex items-center justify-center text-xs font-black transition-all ${step === 2 ? "bg-white text-slate-950 border-white" : step > 2 ? "bg-emerald-500 border-emerald-500 text-white" : "border-white/30 text-white/40"}`}>
                        {step > 2 ? <Check size={14} /> : "2"}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= 2 ? "text-white" : "text-white/40"}`}>Preferences</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full border flex items-center justify-center text-xs font-black transition-all ${step === 3 ? "bg-white text-slate-950 border-white" : "border-white/30 text-white/40"}`}>
                        3
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${step === 3 ? "text-white" : "text-white/40"}`}>Final Details</span>
                    </div>
                  </div>

                  <p className="relative z-10 text-[8px] leading-relaxed text-white/70 uppercase tracking-[0.2em] font-medium mt-6">
                    Professional curation for the discerning traveler.
                  </p>
                </div>

                {/* Right Side - Form wizard */}
                <div className="w-full md:w-7/12 p-6 md:p-10 bg-white relative flex flex-col justify-between max-h-[90vh] md:max-h-none overflow-y-auto modal-right-roboto">
                  <button
                    type="button"
                    onClick={closeLeadModal}
                    disabled={isSubmittingLead}
                    className="absolute right-6 top-6 text-slate-400 hover:text-[#C8102E] transition-colors"
                  >
                    <X size={20} />
                  </button>

                  <AnimatePresence mode="wait">
                    {leadFeedback.type === "success" && leadForm.name === "" ? (
                      <motion.div
                        key="success-content"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="text-center py-10 my-auto"
                      >
                        <div className="flex justify-center mb-6">
                          <div className="h-20 w-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-lg shadow-emerald-100">
                            <CheckCircle2 size={48} strokeWidth={2.5} />
                          </div>
                        </div>
                        <h4 className="text-2xl font-black text-slate-950 tracking-tighter uppercase mb-3">Request Received!</h4>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                          Thank you for choosing Own Holiday Club. <br/>
                          Our luxury travel experts will reach out to you within 24 hours to plan your perfect escape.
                        </p>
                        
                        <button
                          onClick={closeLeadModal}
                          className="mt-8 px-6 py-2.5 bg-[#C8102E] text-white rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#9a0c22] transition-colors shadow-lg shadow-red-500/20"
                        >
                          Close Window
                        </button>
                      </motion.div>
                    ) : (
                      <div className="my-auto space-y-6">
                        {/* HEADER */}
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#C8102E]">Own Holiday Club</span>
                          <h4 className="text-2xl font-black text-slate-950 tracking-tighter uppercase leading-none mt-1">
                            {step === 1 ? "SEND YOUR QUERY" : step === 2 ? "Holiday Preferences" : "Final Details"}
                          </h4>
                          <div className="h-1 w-12 bg-[#C8102E] mt-3" />
                        </div>

                        {/* STEP 1: VERIFICATIONS */}
                        {step === 1 && (
                          <motion.div
                            key="step1-fields"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="space-y-4"
                          >
                            {/* Full Name */}
                            <div className="group">
                              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-1 ml-0.5">Full Name</label>
                              <div className="relative border-b border-slate-200 group-focus-within:border-[#C8102E] transition-all">
                                <User size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#C8102E]" />
                                <input
                                  type="text"
                                  value={leadForm.name}
                                  onChange={(e) => handleLeadFieldChange("name", e.target.value)}
                                  placeholder="Full name"
                                  className="w-full h-10 pl-6 bg-transparent text-xs font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                                />
                              </div>
                            </div>

                            {/* Mobile Number & OTP */}
                            <div className="space-y-2">
                              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-1 ml-0.5">Mobile Number</label>
                              <div className="flex gap-2 items-end">
                                <div className="relative border-b border-slate-200 group focus-within:border-[#C8102E] transition-all flex-1">
                                  <Smartphone size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#C8102E]" />
                                  <input
                                    type="tel"
                                    disabled={isMobileVerified}
                                    value={leadForm.phone}
                                    onChange={(e) => handleLeadFieldChange("phone", e.target.value)}
                                    placeholder="10-digit mobile"
                                    className="w-full h-10 pl-6 bg-transparent text-xs font-bold text-slate-800 outline-none placeholder:text-slate-400 disabled:text-slate-400"
                                  />
                                </div>
                                {!isMobileVerified ? (
                                  <button
                                    type="button"
                                    onClick={handleSendMobileOtp}
                                    disabled={isSendingMobileOtp || leadForm.phone.length !== 10}
                                    className="h-8 px-4 bg-slate-900 hover:bg-[#C8102E] text-white text-[9px] font-bold uppercase tracking-widest transition-all disabled:opacity-40 rounded"
                                  >
                                    {isSendingMobileOtp ? "Sending..." : isMobileOtpSent ? "Resend OTP" : "Get OTP"}
                                  </button>
                                ) : (
                                  <span className="h-8 px-4 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center rounded border border-emerald-200">
                                    ✓ Verified
                                  </span>
                                )}
                              </div>

                              {isMobileOtpSent && !isMobileVerified && (
                                <motion.div 
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="flex gap-2 items-center bg-slate-50 p-2.5 border border-slate-200"
                                >
                                  <input
                                    type="text"
                                    maxLength={6}
                                    placeholder="Enter 6-digit OTP"
                                    value={mobileOtp}
                                    onChange={(e) => setMobileOtp(e.target.value.replace(/\D/g, ""))}
                                    className="h-8 px-3 border border-slate-300 text-center text-xs font-bold w-36 outline-none tracking-widest"
                                  />
                                  <button
                                    type="button"
                                    onClick={handleVerifyMobileOtp}
                                    disabled={isVerifyingMobileOtp || mobileOtp.length !== 6}
                                    className="h-8 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-bold uppercase tracking-widest transition-all disabled:opacity-45 rounded"
                                  >
                                    {isVerifyingMobileOtp ? "Verifying..." : "Verify"}
                                  </button>
                                </motion.div>
                              )}
                            </div>

                            {/* Email & OTP */}
                            <div className="space-y-2">
                              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-1 ml-0.5">Email Address</label>
                              <div className="flex gap-2 items-end">
                                <div className="relative border-b border-slate-200 group focus-within:border-[#C8102E] transition-all flex-1">
                                  <Mail size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#C8102E]" />
                                  <input
                                    type="email"
                                    disabled={isEmailVerified}
                                    value={leadForm.email}
                                    onChange={(e) => handleLeadFieldChange("email", e.target.value)}
                                    placeholder="email@example.com"
                                    className="w-full h-10 pl-6 bg-transparent text-xs font-semibold text-slate-800 outline-none placeholder:text-slate-400 disabled:text-slate-400"
                                  />
                                </div>
                                {!isEmailVerified && !isEmailSkipped ? (
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={handleSendEmailOtp}
                                      disabled={isSendingEmailOtp || !EMAIL_PATTERN.test(leadForm.email)}
                                      className="h-8 px-4 bg-slate-900 hover:bg-[#C8102E] text-white text-[9px] font-bold uppercase tracking-widest transition-all disabled:opacity-40 rounded"
                                    >
                                      {isSendingEmailOtp ? "Sending..." : isEmailOtpSent ? "Resend" : "Get OTP"}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={handleSkipEmailOtp}
                                      className="text-[9px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                      Skip
                                    </button>
                                  </div>
                                ) : (
                                  <span className={`h-8 px-4 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center rounded border ${isEmailVerified ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-500 border-slate-200"}`}>
                                    {isEmailVerified ? "✓ Verified" : "Skipped"}
                                  </span>
                                )}
                              </div>

                              {isEmailOtpSent && !isEmailVerified && (
                                <motion.div 
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="flex gap-2 items-center bg-slate-50 p-2.5 border border-slate-200"
                                >
                                  <input
                                    type="text"
                                    maxLength={6}
                                    placeholder="Enter 6-digit OTP"
                                    value={emailOtp}
                                    onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, ""))}
                                    className="h-8 px-3 border border-slate-300 text-center text-xs font-bold w-36 outline-none tracking-widest"
                                  />
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={handleVerifyEmailOtp}
                                      disabled={isVerifyingEmailOtp || emailOtp.length !== 6}
                                      className="h-8 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-bold uppercase tracking-widest transition-all disabled:opacity-45 rounded"
                                    >
                                      {isVerifyingEmailOtp ? "Verifying..." : "Verify"}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={handleSkipEmailOtp}
                                      className="text-[9px] font-black uppercase text-slate-400 hover:text-[#C8102E]"
                                    >
                                      Skip OTP
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </div>

                            {/* NEXT STEP BUTTON */}
                            <button
                              type="button"
                              onClick={handleNextStep}
                              disabled={!isMobileVerified || (!isEmailVerified && !isEmailSkipped)}
                              className="group w-full h-12 bg-slate-950 hover:bg-[#C8102E] disabled:bg-slate-200 text-white disabled:text-slate-400 text-xs font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-all mt-6"
                            >
                              Preferences
                              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                          </motion.div>
                        )}

                        {/* STEP 2: PREFERENCES */}
                        {step === 2 && (
                          <motion.div
                            key="step2-fields"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-4"
                          >
                            {/* Specific Locations (Google API) */}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1 relative">
                                <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-1">Your Current Location</label>
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={fromLocationInput}
                                    onChange={(e) => setFromLocationInput(e.target.value)}
                                    placeholder="Where are you now?"
                                    className="w-full h-10 px-3 border border-slate-200 text-xs font-semibold bg-transparent text-slate-800 focus:border-[#C8102E] outline-none placeholder:text-slate-400"
                                  />
                                </div>
                                {isFromLocationDropdownOpen && fromLocationOptions.length > 0 && (
                                  <ul className="absolute z-50 w-full bg-white border border-slate-200 mt-1 shadow-lg max-h-48 overflow-y-auto">
                                    {fromLocationOptions.map((opt, i) => (
                                      <li
                                        key={i}
                                        onClick={() => {
                                          skipFromFetch.current = true;
                                          setFromLocationInput(opt);
                                          handleLeadFieldChange("location", opt);
                                          setIsFromLocationDropdownOpen(false);
                                        }}
                                        className="px-4 py-2 hover:bg-amber-50 cursor-pointer text-[12px] text-slate-700 font-medium border-b border-slate-50 last:border-0"
                                      >
                                        {opt}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                              <div className="space-y-1 relative">
                                <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-1">Where do you want to go?</label>
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={toLocationInput}
                                    onChange={(e) => setToLocationInput(e.target.value)}
                                    placeholder="Search destination..."
                                    className="w-full h-10 px-3 border border-slate-200 text-xs font-semibold bg-transparent text-slate-800 focus:border-[#C8102E] outline-none placeholder:text-slate-400"
                                  />
                                </div>
                                {isToLocationDropdownOpen && toLocationOptions.length > 0 && (
                                  <ul className="absolute z-50 w-full bg-white border border-slate-200 mt-1 shadow-lg max-h-48 overflow-y-auto">
                                    {toLocationOptions.map((opt, i) => (
                                      <li
                                        key={i}
                                        onClick={() => {
                                          skipToFetch.current = true;
                                          setToLocationInput(opt);
                                          handleLeadFieldChange("searchLocation", opt);
                                          setIsToLocationDropdownOpen(false);
                                        }}
                                        className="px-4 py-2 hover:bg-amber-50 cursor-pointer text-[12px] text-slate-700 font-medium border-b border-slate-50 last:border-0"
                                      >
                                        {opt}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-1 ml-0.5 flex items-center gap-1"><Calendar size={11} /> Check-in</label>
                                <input
                                  type="date"
                                  required
                                  value={leadForm.checkIn}
                                  onChange={(e) => handleLeadFieldChange("checkIn", e.target.value)}
                                  className="w-full h-10 px-3 border border-slate-200 text-xs font-semibold text-slate-800 focus:border-[#C8102E] outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-1 ml-0.5 flex items-center gap-1"><Calendar size={11} /> Check-out</label>
                                <input
                                  type="date"
                                  required
                                  value={leadForm.checkOut}
                                  onChange={(e) => handleLeadFieldChange("checkOut", e.target.value)}
                                  className="w-full h-10 px-3 border border-slate-200 text-xs font-semibold text-slate-800 focus:border-[#C8102E] outline-none"
                                />
                              </div>
                            </div>

                            {/* Guests */}
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-1 ml-0.5 flex items-center gap-1"><Users size={11} /> Adults</label>
                                <select
                                  value={leadForm.adults}
                                  onChange={(e) => handleLeadFieldChange("adults", Number(e.target.value))}
                                  className="w-full h-10 px-3 border border-slate-200 text-xs font-bold text-slate-800 focus:border-[#C8102E] outline-none"
                                >
                                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                    <option key={n} value={n}>{n} Adult{n > 1 ? "s" : ""}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-1 ml-0.5">Kids (Below 10 years)</label>
                                <select
                                  value={leadForm.kids}
                                  onChange={(e) => handleLeadFieldChange("kids", Number(e.target.value))}
                                  className="w-full h-10 px-3 border border-slate-200 text-xs font-bold text-slate-800 focus:border-[#C8102E] outline-none"
                                >
                                  {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                                    <option key={n} value={n}>{n} Kid{n !== 1 ? "s" : ""}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* ACTION BUTTONS (Back & Next Step) */}
                            <div className="flex gap-3 pt-2">
                              <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="h-12 px-6 border border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-900 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1 transition-all rounded-md"
                              >
                                <ChevronLeft size={14} /> Back
                              </button>
                              <button
                                type="button"
                                onClick={() => setStep(3)}
                                className="group flex-1 h-12 bg-slate-950 hover:bg-[#C8102E] text-white text-xs font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-all rounded-md"
                              >
                                Next Step
                                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 3: FINAL DETAILS */}
                        {step === 3 && (
                          <motion.div
                            key="step3-fields"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-4"
                          >
                            {/* Category selector & budget dropdown options */}
                            <div className="space-y-2">
                              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-1">Travel Type & Budget</label>
                              <div className="flex gap-1.5 flex-wrap">
                                {["Holiday"].map((cat) => (
                                  <button
                                    key={cat}
                                    type="button"
                                    onClick={() => handleLeadFieldChange("travelType", cat)}
                                    className={`px-3 py-1 border text-[9px] font-bold uppercase tracking-wider transition-all ${leadForm.travelType === cat ? "bg-red-700 border-red-700 text-white" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"}`}
                                  >
                                    {cat}
                                  </button>
                                ))}
                              </div>
                              <select
                                value={leadForm.budget}
                                required
                                onChange={(e) => handleLeadFieldChange("budget", e.target.value)}
                                className="w-full h-10 px-3 border border-slate-200 text-xs font-bold bg-transparent text-slate-800 focus:border-[#C8102E] outline-none tracking-wide"
                              >
                                <option value="" disabled>Select your budget</option>
                                {callbackBudgets.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Special requests (message) */}
                            <div className="group">
                              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-1 ml-0.5">Special Demands/Message</label>
                              <div className="relative border-b border-slate-200 group focus-within:border-[#C8102E] transition-all">
                                <MessageSquare size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#C8102E]" />
                                <input
                                  type="text"
                                  value={leadForm.message}
                                  onChange={(e) => handleLeadFieldChange("message", e.target.value)}
                                  placeholder="Any special demands? Let us know!"
                                  className="w-full h-10 pl-6 bg-transparent text-xs font-medium text-slate-800 outline-none placeholder:text-slate-400"
                                />
                              </div>
                            </div>

                            {/* ACTION BUTTONS (Back & Submit) */}
                            <div className="flex gap-3 pt-2">
                              <button
                                type="button"
                                onClick={() => setStep(2)}
                                className="h-12 px-6 border border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-900 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1 transition-all rounded-md"
                              >
                                <ChevronLeft size={14} /> Back
                              </button>
                              <button
                                type="button"
                                onClick={handleLeadSubmit}
                                disabled={isSubmittingLead}
                                className="group flex-1 h-12 bg-[#C8102E] hover:brightness-110 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-all rounded-md shadow-lg shadow-red-500/10"
                              >
                                {isSubmittingLead ? "Processing..." : "Confirm Request"}
                                {!isSubmittingLead && <Send size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
