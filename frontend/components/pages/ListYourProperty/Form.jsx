"use client";

import React from "react";
import {
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  Image as ImageIcon,
  Send,
  UploadCloud,
  X,
} from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function Form({
  formStatus,
  formError,
  step,
  formData,
  amenitiesList,
  onInputChange,
  onToggleAmenity,
  onMockFileUpload,
  onRemovePhoto,
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
              Comprehensive Onboarding
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-serif mb-4">
              List Your{" "}
              <span className="text-amber-500 italic font-light">
                Property
              </span>
            </h2>
            <p className="text-slate-500 font-sans max-w-xl mx-auto">
              Provide comprehensive details about your luxury property. Once
              submitted, our admin team will review and approve your listing
              before it goes live.
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
                Listing Pending Approval
              </h3>
              <p className="text-slate-500 font-sans max-w-lg mx-auto mb-8 text-lg leading-relaxed">
                Your comprehensive property details and photos have been
                securely uploaded. Our administration team is currently
                reviewing your application against our 5-star standards.
                <br />
                <br />
                <strong className="text-slate-800">
                  You will be notified via email once your listing is approved
                  and live on the platform.
                </strong>
              </p>
              <button
                onClick={onReset}
                className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-amber-500 transition-colors shadow-lg"
              >
                List Another Property
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
                    Listing Setup
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
                        title: "Property Basics",
                        desc: "Location & Type",
                      },
                      {
                        num: 3,
                        title: "Amenities",
                        desc: "Features & Services",
                      },
                      {
                        num: 4,
                        title: "Media & Pricing",
                        desc: "Photos & Rates",
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
                      <p className="text-sm font-bold">Trusted Partner</p>
                    </div>
                    <p className="text-xs text-slate-400 mt-3">
                      Average listing approval time: 48 hours.
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

                  {/* STEP 2: Property Basics */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h4 className="text-2xl font-black font-serif text-slate-900 mb-6">
                        Property Details
                      </h4>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2 col-span-2 md:col-span-1 group">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            Property Name{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            required
                            name="propertyName"
                            value={formData.propertyName}
                            onChange={onInputChange}
                            type="text"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:bg-white focus:border-amber-500 outline-none transition-all text-slate-900 font-medium"
                            placeholder="Grand Azure Villa"
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

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2 group">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            City <span className="text-red-500">*</span>
                          </label>
                          <input
                            required
                            name="city"
                            value={formData.city}
                            onChange={onInputChange}
                            type="text"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:bg-white focus:border-amber-500 outline-none transition-all text-slate-900 font-medium"
                            placeholder="Ubud"
                          />
                        </div>
                        <div className="space-y-2 group">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            Country <span className="text-red-500">*</span>
                          </label>
                          <input
                            required
                            name="country"
                            value={formData.country}
                            onChange={onInputChange}
                            type="text"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:bg-white focus:border-amber-500 outline-none transition-all text-slate-900 font-medium"
                            placeholder="Indonesia"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 group">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Full Address
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
                          Property Description
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={onInputChange}
                          rows="3"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:bg-white focus:border-amber-500 outline-none transition-all text-slate-900 font-medium resize-none"
                          placeholder="Describe what makes your property unique..."
                        ></textarea>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Amenities */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h4 className="text-2xl font-black font-serif text-slate-900 mb-2">
                        Amenities & Services
                      </h4>
                      <p className="text-slate-500 text-sm mb-6">
                        Select the premium features available at your property.
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        {amenitiesList.map((amenity) => {
                          const isSelected = formData.amenities.includes(
                            amenity.id,
                          );
                          return (
                            <div
                              key={amenity.id}
                              onClick={() => onToggleAmenity(amenity.id)}
                              className={`cursor-pointer border-2 rounded-xl p-4 flex items-center gap-3 transition-all duration-300 ${
                                isSelected
                                  ? "border-amber-500 bg-amber-50/30 text-amber-900"
                                  : "border-slate-100 bg-white text-slate-600 hover:border-slate-300"
                              }`}
                            >
                              <div
                                className={`${
                                  isSelected
                                    ? "text-amber-500"
                                    : "text-slate-400"
                                }`}
                              >
                                {amenity.icon}
                              </div>
                              <span className="font-bold text-sm select-none">
                                {amenity.label}
                              </span>
                              {isSelected && (
                                <CheckCircle2
                                  size={16}
                                  className="ml-auto text-amber-500"
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Media & Pricing */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <h4 className="text-2xl font-black font-serif text-slate-900 mb-6">
                        Final Details
                      </h4>

                      <div className="space-y-2 group mb-8">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Average Base Nightly Rate (USD)
                        </label>
                        <input
                          name="basePrice"
                          value={formData.basePrice}
                          onChange={onInputChange}
                          type="number"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:bg-white focus:border-amber-500 outline-none transition-all text-slate-900 font-medium"
                          placeholder="$500"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Property Photos
                        </label>

                        {/* Mock Drag & Drop Area */}
                        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-slate-50 relative hover:bg-slate-100 transition-colors">
                          <input
                            type="file"
                            multiple
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            onChange={onMockFileUpload}
                            accept="image/*"
                          />
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-slate-400">
                            <UploadCloud size={24} />
                          </div>
                          <p className="font-bold text-slate-700 text-sm mb-1">
                            Click or drag images to upload
                          </p>
                          <p className="text-xs text-slate-500">
                            High resolution JPG or PNG. Max 2MB per file.
                          </p>
                        </div>

                        {/* Uploaded Files Preview */}
                        {formData.photos.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {formData.photos.map((photo, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100"
                              >
                                <div className="flex items-center gap-3">
                                  <ImageIcon
                                    size={16}
                                    className="text-slate-400"
                                  />
                                  <span className="text-sm font-medium text-slate-700 truncate max-w-[200px]">
                                    {photo.name}
                                  </span>
                                  <span className="text-xs text-slate-400">
                                    ({photo.size})
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => onRemovePhoto(i)}
                                  className="text-slate-400 hover:text-red-500 transition-colors"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
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

                    {step < 4 ? (
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
                          : "Submit Listing"}
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
