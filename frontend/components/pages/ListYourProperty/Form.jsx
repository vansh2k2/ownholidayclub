"use client";

import React from "react";
import {
  ArrowRight,
  Award,
  Check,
  Send,
} from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function Form({
  formStatus,
  formError,
  step,
  formData,
  onInputChange,
  onNext,
  onPrev,
  onSubmit,
  onReset,
  validateStep,
}) {
  return (
    <section
      id="partner-form"
      className="py-24 bg-slate-50 relative overflow-hidden z-30"
    >
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <ScrollAnimate animation="fade-up">
            <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-[10px] font-sans mb-4 block">
              B2B Partner Onboarding
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-serif mb-4">
              Get Verified{" "}
              <span className="text-amber-500 italic font-light">
                Leads
              </span>
            </h2>
            <p className="text-slate-500 font-sans max-w-xl mx-auto">
              Partner with Own Holiday Club to receive premium, verified guest leads for your destination.
            </p>
          </ScrollAnimate>
        </div>

        <div className="bg-white rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden flex flex-col">
          {formStatus === "success" ? (
            <div className="p-16 flex flex-col items-center justify-center text-center animate-fade-in min-h-[500px]">
              <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-6 border-8 border-amber-100">
                <Check size={40} />
              </div>
              <h3 className="text-4xl font-black font-serif text-slate-900 mb-4">
                Request Pending Approval
              </h3>
              <p className="text-slate-500 font-sans max-w-lg mx-auto mb-8 text-lg leading-relaxed">
                Your partnership request has been received securely. Our team is reviewing your application.
                <br />
                <br />
                <strong className="text-slate-800">
                  We will contact you shortly to finalize your lead package and activate your account.
                </strong>
              </p>
              <button
                onClick={onReset}
                className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-amber-500 transition-colors shadow-lg"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row">
              {/* Left Sidebar - Steps Progress */}
              <div className="md:w-1/3 bg-slate-950 p-10 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-900/50 to-slate-950"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-serif font-black mb-10">
                    Partnership Setup
                  </h3>

                  <div className="space-y-8 font-sans">
                    {[
                      {
                        num: 1,
                        title: "Contact Details",
                        desc: "Manager info",
                      },
                      {
                        num: 2,
                        title: "Partnership Details",
                        desc: "Location & Property",
                      },
                      {
                        num: 3,
                        title: "Lead Package",
                        desc: "Pricing Selection",
                      },
                    ].map((s) => (
                      <div
                        key={s.num}
                        className={`flex items-start gap-4 transition-opacity duration-300 ${
                          step === s.num
                            ? "opacity-100"
                            : step > s.num
                              ? "opacity-60"
                              : "opacity-30"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 border-2 ${
                            step === s.num
                              ? "bg-amber-500 border-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                              : step > s.num
                                ? "bg-white border-white text-slate-900"
                                : "border-slate-700 text-slate-500"
                          }`}
                        >
                          {step > s.num ? <Check size={16} /> : s.num}
                        </div>
                        <div>
                          <p
                            className={`font-bold ${
                              step === s.num ? "text-white" : "text-slate-400"
                            }`}
                          >
                            {s.title}
                          </p>
                          <p className="text-xs text-slate-500">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3 text-amber-400">
                      <Award size={18} />
                      <p className="text-sm font-bold">Verified Partners</p>
                    </div>
                    <p className="text-xs text-slate-400 mt-3">
                      High-converting leads delivered directly to you.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Form Fields */}
              <div className="md:w-2/3 p-10 md:p-14">
                <form onSubmit={onSubmit}>
                  {formError && (
                    <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
                      {formError}
                    </div>
                  )}

                  {/* STEP 1: Contact Details */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <h4 className="text-2xl font-black font-serif text-slate-900 mb-6">
                        Contact Information
                      </h4>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2 group">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            required
                            name="firstName"
                            value={formData.firstName}
                            onChange={onInputChange}
                            type="text"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:bg-white focus:border-amber-500 outline-none transition-all text-slate-900 font-medium"
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-2 group">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            required
                            name="lastName"
                            value={formData.lastName}
                            onChange={onInputChange}
                            type="text"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:bg-white focus:border-amber-500 outline-none transition-all text-slate-900 font-medium"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2 group">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            Email Address{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            required
                            name="email"
                            value={formData.email}
                            onChange={onInputChange}
                            type="email"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:bg-white focus:border-amber-500 outline-none transition-all text-slate-900 font-medium"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div className="space-y-2 group">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            Phone Number{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={onInputChange}
                            type="tel"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:bg-white focus:border-amber-500 outline-none transition-all text-slate-900 font-medium"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Partnership Details */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h4 className="text-2xl font-black font-serif text-slate-900 mb-6">
                        Partnership Details
                      </h4>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2 col-span-2 md:col-span-1 group">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            Hotel / Property Name{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            required
                            name="propertyName"
                            value={formData.propertyName}
                            onChange={onInputChange}
                            type="text"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:bg-white focus:border-amber-500 outline-none transition-all text-slate-900 font-medium"
                            placeholder="Grand Azure Resort"
                          />
                        </div>
                        <div className="space-y-2 col-span-2 md:col-span-1 group">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            Property Type{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            required
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={onInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:bg-white focus:border-amber-500 outline-none transition-all text-slate-900 font-medium appearance-none"
                          >
                            <option value="" disabled>
                              Select Type
                            </option>
                            <option value="resort">Luxury Resort</option>
                            <option value="hotel">Boutique Hotel</option>
                            <option value="villa">Private Villa</option>
                            <option value="estate">Private Estate</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2 group">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Target Destination (Where do you need leads for?){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          name="targetDestination"
                          value={formData.targetDestination}
                          onChange={onInputChange}
                          type="text"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:bg-white focus:border-amber-500 outline-none transition-all text-slate-900 font-medium"
                          placeholder="e.g. Manali, Goa, Maldives"
                        />
                      </div>

                      <div className="space-y-2 group">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Full Hotel Address
                        </label>
                        <input
                          name="address"
                          value={formData.address}
                          onChange={onInputChange}
                          type="text"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:bg-white focus:border-amber-500 outline-none transition-all text-slate-900 font-medium"
                          placeholder="Street name, Area"
                        />
                      </div>

                      <div className="space-y-2 group">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Additional Notes
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={onInputChange}
                          rows="3"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:bg-white focus:border-amber-500 outline-none transition-all text-slate-900 font-medium resize-none"
                          placeholder="Any specific types of guests or leads you are looking for?"
                        ></textarea>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Lead Package */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h4 className="text-2xl font-black font-serif text-slate-900 mb-2">
                        Select Lead Package
                      </h4>
                      <p className="text-slate-500 text-sm mb-6">
                        Choose how you would like to receive your leads. Pricing varies based on destination and exclusivity.
                      </p>

                      <div className="space-y-4">
                        <label
                          className={`cursor-pointer border-2 rounded-xl p-6 flex flex-col gap-2 transition-all duration-300 ${
                            formData.leadPackage === "pay-per-lead"
                              ? "border-amber-500 bg-amber-50/30"
                              : "border-slate-100 bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="leadPackage"
                                value="pay-per-lead"
                                checked={formData.leadPackage === "pay-per-lead"}
                                onChange={onInputChange}
                                className="w-5 h-5 text-amber-500 focus:ring-amber-500 border-gray-300"
                              />
                              <span className="font-bold text-lg text-slate-900">
                                Pay Per Lead
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-slate-500 pl-8">
                            Pay only for the leads you receive. Ideal for specific campaigns or flexible occupancy needs.
                          </p>
                        </label>

                        <label
                          className={`cursor-pointer border-2 rounded-xl p-6 flex flex-col gap-2 transition-all duration-300 ${
                            formData.leadPackage === "monthly-subscription"
                              ? "border-amber-500 bg-amber-50/30"
                              : "border-slate-100 bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="leadPackage"
                                value="monthly-subscription"
                                checked={formData.leadPackage === "monthly-subscription"}
                                onChange={onInputChange}
                                className="w-5 h-5 text-amber-500 focus:ring-amber-500 border-gray-300"
                              />
                              <span className="font-bold text-lg text-slate-900">
                                Monthly Subscription
                              </span>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                              Best Value
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 pl-8">
                            Get unlimited access to shared leads in your destination for a flat monthly fee.
                          </p>
                        </label>
                        
                        <label
                          className={`cursor-pointer border-2 rounded-xl p-6 flex flex-col gap-2 transition-all duration-300 ${
                            formData.leadPackage === "exclusive"
                              ? "border-amber-500 bg-amber-50/30"
                              : "border-slate-100 bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="leadPackage"
                                value="exclusive"
                                checked={formData.leadPackage === "exclusive"}
                                onChange={onInputChange}
                                className="w-5 h-5 text-amber-500 focus:ring-amber-500 border-gray-300"
                              />
                              <span className="font-bold text-lg text-slate-900">
                                Exclusive Leads
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-slate-500 pl-8">
                            Premium pricing for exclusive leads sent ONLY to your hotel. Guarantee maximum conversion.
                          </p>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Bottom Navigation */}
                  <div className="mt-12 flex items-center justify-between pt-6 border-t border-slate-100">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={onPrev}
                        className="px-6 py-3 font-bold text-sm uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        Back
                      </button>
                    ) : (
                      <div></div>
                    )}

                    {step < 3 ? (
                      <button
                        key={`next-step-${step}`}
                        type="button"
                        onClick={onNext}
                        disabled={!validateStep()}
                        className="bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-amber-500 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                      >
                        Next Step <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button
                        key="submit-listing"
                        type="submit"
                        disabled={formStatus === "submitting"}
                        className="bg-amber-500 text-slate-950 px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/30 flex items-center gap-2 disabled:opacity-70 ml-auto"
                      >
                        {formStatus === "submitting"
                          ? "Submitting..."
                          : "Submit Request"}
                        {formStatus !== "submitting" && <Send size={16} />}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
