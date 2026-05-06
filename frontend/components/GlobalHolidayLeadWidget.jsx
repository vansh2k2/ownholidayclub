"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, MessageSquare, X, Send, User, Mail, Smartphone, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createInitialLeadForm = () => ({
  name: "",
  email: "",
  phone: "",
  message: "",
});

export default function GlobalHolidayLeadWidget() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState(createInitialLeadForm);
  const [leadFeedback, setLeadFeedback] = useState({ type: "", message: "" });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

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
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [leadFeedback.message]);

  const openLeadModal = () => {
    setLeadFeedback({ type: "", message: "" });
    setIsLeadModalOpen(true);
  };

  const closeLeadModal = () => {
    if (isSubmittingLead) {
      return;
    }

    setIsLeadModalOpen(false);
    setLeadFeedback({ type: "", message: "" });
    setLeadForm(createInitialLeadForm());
  };

  const handleLeadFieldChange = (field, value) => {
    setLeadForm((prev) => ({
      ...prev,
      [field]:
        field === "phone"
          ? value.replace(/\D/g, "").slice(0, 10)
          : value,
    }));
  };

  const handleLeadSubmit = async (event) => {
    event.preventDefault();

    const name = String(leadForm.name || "").trim();
    const email = String(leadForm.email || "").trim().toLowerCase();
    const phone = String(leadForm.phone || "").replace(/\D/g, "");

    if (name.length < 2) {
      setLeadFeedback({
        type: "error",
        message: "Please enter your full name.",
      });
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      setLeadFeedback({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (phone.length !== 10) {
      setLeadFeedback({
        type: "error",
        message: "Please enter a valid 10-digit phone number.",
      });
      return;
    }

    setIsSubmittingLead(true);
    setLeadFeedback({ type: "", message: "" });

    try {
      const response = await fetch(`${API_BASE_URL}/api/holiday-leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message: leadForm.message,
          source: "callback-widget",
          contextType: "callback-request",
          contextName: "Floating Callback Widget"
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
      
      // Keep modal open to show success state, auto-close after 5 seconds
      setTimeout(() => {
        setIsLeadModalOpen(false);
        setLeadFeedback({ type: "", message: "" });
      }, 5000);
    } catch (error) {
      setLeadFeedback({
        type: "error",
        message: error.message || "Failed to submit lead.",
      });
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        .modal-luxury { font-family: 'Poppins', sans-serif; }
      ` }} />

      <AnimatePresence>
        {leadFeedback.message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed right-4 top-24 z-[100] w-full max-w-sm px-2 sm:right-6 sm:px-0 modal-luxury"
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
        className="fixed bottom-4 right-3 z-[90] flex flex-col items-center gap-1 group modal-luxury"
      >
        <span className="bg-white text-[#C8102E] text-[8px] font-black px-2 py-1 rounded-sm shadow-md transition-all duration-300 uppercase tracking-widest border border-red-100 mb-0.5 flex items-center gap-1.5">
          <MessageSquare size={10} />
          Request Call Back
        </span>
        <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#C8102E] text-white shadow-[0_10px_30px_rgba(200,16,46,0.25)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 md:h-14 md:w-14">
          <Mail size={24} strokeWidth={2.2} />
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
              initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20, rotateX: -5 }}
              transition={{ 
                type: "spring", 
                damping: 22, 
                stiffness: 150,
                mass: 1
              }}
              className="relative z-10 w-full max-w-2xl bg-white shadow-[0_50px_120px_rgba(0,0,0,0.6)] border border-white/20 overflow-hidden"
              style={{ perspective: "1000px" }}
            >
              <div className="flex flex-col md:flex-row min-h-[400px]">
                {/* Left Side - Visual Branding with Background Image and Logo */}
                <div className="md:w-5/12 relative flex flex-col justify-between overflow-hidden text-white p-8">
                  {/* Background Image with Overlay */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
                    style={{ 
                      backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1000')",
                    }}
                  />
                  {/* Subtle dark overlay for readability only */}
                  <div className="absolute inset-0 bg-black/30" />
                  
                  {/* Decorative glass elements */}
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                  
                  <div className="relative z-10">
                    <img src="/logo.png" className="w-32 invert brightness-0 underline" alt="Own Holiday Club" style={{ filter: "brightness(0) invert(1)" }} />
                    <h3 className="mt-10 text-4xl font-black leading-[1.05] tracking-tighter">
                      Your Next <br/>Grand <br/>Escape.
                    </h3>
                  </div>

                  <p className="relative z-10 text-[9px] leading-relaxed text-white/80 uppercase tracking-[0.2em] font-medium">
                    Professional curation for the discerning traveler.
                  </p>
                </div>

                {/* Right Side - Form or Success View */}
                <div className="md:w-7/12 p-8 md:p-10 bg-white relative flex flex-col justify-center">
                  <button
                    type="button"
                    onClick={closeLeadModal}
                    disabled={isSubmittingLead}
                    className="absolute right-6 top-6 text-[#C8102E] hover:scale-110 transition-transform"
                  >
                    <X size={20} />
                  </button>

                  <AnimatePresence mode="wait">
                    {leadFeedback.type === "success" ? (
                      <motion.div
                        key="success-content"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="text-center"
                      >
                        <div className="flex justify-center mb-6">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.1 }}
                            className="h-20 w-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500"
                          >
                            <CheckCircle2 size={48} strokeWidth={2.5} />
                          </motion.div>
                        </div>
                        <h4 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-3">Request Received!</h4>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                          Thank you for choosing Own Holiday Club. <br/>
                          Our luxury travel experts will reach out to you within 24 hours to plan your perfect escape.
                        </p>
                        
                        <button
                          onClick={closeLeadModal}
                          className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-[#C8102E] hover:underline"
                        >
                          Close Window
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="form-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="mb-6">
                          <h4 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Request Callback</h4>
                          <div className="h-1 w-12 bg-[#C8102E] mt-2" />
                        </div>

                        <form onSubmit={handleLeadSubmit} className="space-y-4">
                          <div className="space-y-3">
                            <div className="group">
                              <label className="block text-[8px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-1 ml-0.5">Full Name</label>
                              <div className="relative border-b border-slate-300 group-focus-within:border-[#C8102E] transition-all">
                                <User size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-[#C8102E]" />
                                <input
                                  type="text"
                                  value={leadForm.name}
                                  required
                                  onChange={(e) => handleLeadFieldChange("name", e.target.value)}
                                  placeholder="Full name"
                                  className="w-full h-9 pl-6 bg-transparent text-xs font-normal text-slate-800 outline-none placeholder:text-slate-400"
                                />
                              </div>
                            </div>

                            <div className="group">
                              <label className="block text-[8px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-1 ml-0.5">Email Address</label>
                              <div className="relative border-b border-slate-300 group-focus-within:border-[#C8102E] transition-all">
                                <Mail size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-[#C8102E]" />
                                <input
                                  type="email"
                                  value={leadForm.email}
                                  required
                                  onChange={(e) => handleLeadFieldChange("email", e.target.value)}
                                  placeholder="email@example.com"
                                  className="w-full h-9 pl-6 bg-transparent text-xs font-normal text-slate-800 outline-none placeholder:text-slate-400"
                                />
                              </div>
                            </div>

                            <div className="group">
                              <label className="block text-[8px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-1 ml-0.5">Phone Number</label>
                              <div className="relative border-b border-slate-300 group-focus-within:border-[#C8102E] transition-all">
                                <Smartphone size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-[#C8102E]" />
                                <input
                                  type="tel"
                                  value={leadForm.phone}
                                  required
                                  onChange={(e) => handleLeadFieldChange("phone", e.target.value)}
                                  placeholder="Phone number"
                                  className="w-full h-9 pl-6 bg-transparent text-xs font-normal text-slate-800 outline-none placeholder:text-slate-400"
                                />
                              </div>
                            </div>

                            <div className="group">
                              <label className="block text-[8px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-1 ml-0.5">Your Message (Optional)</label>
                              <div className="relative border-b border-slate-300 group-focus-within:border-[#C8102E] transition-all">
                                <MessageSquare size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-[#C8102E]" />
                                <textarea
                                  value={leadForm.message}
                                  onChange={(e) => handleLeadFieldChange("message", e.target.value)}
                                  placeholder="Write your message here..."
                                  rows={1}
                                  className="w-full min-h-[36px] py-2 pl-6 bg-transparent text-xs font-normal text-slate-800 outline-none placeholder:text-slate-400 resize-none"
                                />
                              </div>
                            </div>
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmittingLead}
                            className="group relative flex h-12 w-full items-center justify-center bg-[#C8102E] text-white hover:brightness-110 transition-all disabled:opacity-50 mt-6 shadow-[0_10px_20px_rgba(200,16,46,0.2)]"
                          >
                            <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em]">
                              {isSubmittingLead ? "Processing..." : "Confirm Request"}
                              {!isSubmittingLead && <Send size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                            </span>
                          </button>
                        </form>
                      </motion.div>
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
