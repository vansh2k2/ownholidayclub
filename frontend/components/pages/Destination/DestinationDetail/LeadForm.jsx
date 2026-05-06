"use client";

import React from "react";
import {
  Calendar,
  CheckCircle2,
  Compass,
  Mail,
  Phone,
  Send,
  User,
  Star,
  Shield,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollAnimate from "@/components/common/ScrollAnimate";

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
        style={{ fontFamily: "'DM Sans', sans-serif" }}
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
          style={{ fontFamily: "'DM Sans', sans-serif", borderRadius: "6px" }}
        />
      ) : (
        <input
          {...props}
          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all text-[12px] text-slate-900 placeholder:text-slate-300 disabled:opacity-50"
          style={{ fontFamily: "'DM Sans', sans-serif", borderRadius: "6px" }}
        />
      )}
    </div>
  </div>
);

export default function LeadForm({
  destinationData = {},
  formData = {},
  formStep,
  formError,
  handleInputChange,
  handleSubmitLead,
}) {
  return (
    <section
      id="inquiry-form"
      className="py-8 md:py-12 relative z-20 scroll-mt-20"
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
                <Compass size={20} className="text-amber-500" />
              </div>

              <h2
                className="text-2xl md:text-3xl font-bold text-slate-900 leading-[1.1] mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Plan Your Trip
                <br />
                <span className="italic font-normal text-amber-600">
                  to {destinationData?.name}
                </span>
              </h2>

              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
                <div className="w-2 h-[2px] bg-amber-300 rounded-full" />
              </div>

              <p
                className="text-slate-500 text-[13px] leading-relaxed mb-10"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Our concierge team will craft a personalized itinerary and
                unlock exclusive member benefits for you.
              </p>

              <div className="space-y-4">
                {["Personalized Planning", "Room Upgrades", "VIP Transfers"].map(
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
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
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
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Trusted by{" "}
                <span className="font-bold text-slate-800">280,000+</span>{" "}
                luxury travellers.
              </p>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8">
            <ScrollAnimate variant="homeDestination">
              <AnimatePresence mode="wait">
                {formStep === "success" ? (
                  /* ── SUCCESS STATE — same as Career page ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="border-2 border-green-500 p-12 bg-green-50 shadow-lg flex flex-col items-center justify-center min-h-[420px]"
                    style={{ borderRadius: "10px" }}
                  >
                    {/* Spring-in checkmark */}
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
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      Successfully Sent!
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-slate-500 text-center mb-8 max-w-xs mx-auto text-[13px] leading-relaxed"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Thank you,{" "}
                      <span className="font-semibold text-slate-800">
                        {formData?.name}
                      </span>
                      . Our experts will contact you within 24 hours.
                    </motion.p>

                    {/* Pulse dot — same as Career */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-2 text-sm text-slate-400"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
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
                    {/* Form header */}
                    <div className="mb-5">
                      <h3
                        className="text-lg font-bold text-slate-900 mb-0.5"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                      >
                        Inquiry Details
                      </h3>
                      <p
                        className="text-[11px] text-slate-400 font-medium"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Please provide your travel details for a custom proposal.
                      </p>
                    </div>

                    <form onSubmit={handleSubmitLead} className="space-y-3.5">
                      {formError && (
                        <div
                          className="border border-red-200 bg-red-50 px-4 py-3 text-[12px] font-medium text-red-600"
                          style={{
                            borderRadius: "8px",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          {formError}
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
                        <InputField
                          icon={Phone}
                          label="Phone Number"
                          type="tel"
                          name="phone"
                          required
                          value={formData?.phone || ""}
                          onChange={handleInputChange}
                          disabled={formStep === "submitting"}
                          placeholder="+91 00000 00000"
                        />
                      </div>

                      {/* Email */}
                      <InputField
                        icon={Mail}
                        label="Email Address"
                        type="email"
                        name="email"
                        required
                        value={formData?.email || ""}
                        onChange={handleInputChange}
                        disabled={formStep === "submitting"}
                        placeholder="you@example.com"
                      />

                      {/* Check-in + Check-out */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputField
                          icon={Calendar}
                          label="Arrival"
                          type="datetime-local"
                          name="checkIn"
                          value={formData?.checkIn || ""}
                          onChange={handleInputChange}
                          disabled={formStep === "submitting"}
                        />
                        <InputField
                          icon={Calendar}
                          label="Departure"
                          type="datetime-local"
                          name="checkOut"
                          value={formData?.checkOut || ""}
                          onChange={handleInputChange}
                          disabled={formStep === "submitting"}
                        />
                      </div>

                      {/* Adults + Kids */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                          label="Kids"
                          type="number"
                          name="kids"
                          min="0"
                          value={formData?.kids || ""}
                          onChange={handleInputChange}
                          disabled={formStep === "submitting"}
                          placeholder="0"
                        />
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
                          disabled={formStep === "submitting"}
                          className="w-full md:flex-1 flex items-center justify-center gap-3 bg-red-600 text-white px-6 py-2.5 hover:bg-red-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-red-600/10"
                          style={{ borderRadius: "7px", fontFamily: "'DM Sans', sans-serif" }}
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
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
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