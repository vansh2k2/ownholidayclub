"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CheckCircle2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mock ScrollAnimate to ensure the preview runs independently
const ScrollAnimate = ({ children, animation, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100 + delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return (
    <div
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const createInitialLeadForm = () => ({
  name: "",
  email: "",
  phone: "",
});

const STATIC_SLIDES = [
  {
    subtitle: "Welcome to Luxury",
    title1: "Stay & Celebration",
    title2: "on Earth",
    description: "Experience the pinnacle of luxury with our exclusive members-only holiday packages tailored for unforgettable memories.",
    image: "/hero_image.png",
    button1Text: "Book Holiday",
    button1Link: "/",
    button2Text: "Memberships",
    button2Link: "/membership",
    button3Text: "Plan Event",
    button3Link: "/services",
  },
  {
    subtitle: "Explore the World",
    title1: "Paradise Found",
    title2: "in Every Journey",
    description: "Discover untouched beaches and majestic mountains across India and beyond with our curated travel experiences.",
    image: "https://images.unsplash.com/photo-1506929197321-462325848842?auto=format&fit=crop&q=80&w=1920",
    button1Text: "Book Holiday",
    button1Link: "/",
    button2Text: "Memberships",
    button2Link: "/membership",
    button3Text: "Plan Event",
    button3Link: "/services",
  },
];

export default function Hero() {
  const [slides, setSlides] = useState([]);
  const [isLoadingSlides, setIsLoadingSlides] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState(createInitialLeadForm);
  const [leadFeedback, setLeadFeedback] = useState({ type: "", message: "" });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/hero-slides`);
      const result = await response.json();
      if (result.success && result.data.length > 0) {
        setSlides(result.data);
      } else {
        // Fallback to static slides if no dynamic data found
        setSlides(STATIC_SLIDES);
      }
    } catch (error) {
      console.error("Error fetching slides:", error);
      setSlides(STATIC_SLIDES);
    } finally {
      setIsLoadingSlides(false);
    }
  };

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (!isLeadModalOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeLeadModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
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
    window.dispatchEvent(new Event("openGlobalLeadModal"));
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
        field === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value,
    }));
  };

  const handleLeadSubmit = async (event) => {
    event.preventDefault();

    const name = String(leadForm.name || "").trim();
    const email = String(leadForm.email || "")
      .trim()
      .toLowerCase();
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
          source: "home-hero",
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to submit lead.");
      }

      setIsLeadModalOpen(false);
      setLeadFeedback({
        type: "success",
        message: "Thanks you , Our team will contact you in 24 hrs.",
      });
      setLeadForm(createInitialLeadForm());
    } catch (error) {
      setLeadFeedback({
        type: "error",
        message: error.message || "Failed to submit lead.",
      });
    } finally {
      setIsSubmittingLead(false);
    }
  };

  if (isLoadingSlides && slides.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const activeSlide = slides[currentSlide];

  return (
    <div className="relative bg-slate-50">
      {leadFeedback.message ? (
        <div className="fixed right-4 top-24 z-[110] w-full max-w-sm px-2 sm:right-6 sm:px-0">
          <div
            className={`rounded-2xl border px-5 py-4 text-sm font-medium shadow-[0_18px_45px_rgba(15,23,42,0.18)] ${
              leadFeedback.type === "error"
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {leadFeedback.type === "success" ? (
              <span className="mr-2 inline-flex align-middle">
                <CheckCircle2 size={16} />
              </span>
            ) : null}
            {leadFeedback.message}
          </div>
        </div>
      ) : null}

      <section
        id="home"
        className="relative flex min-h-[580px] aspect-auto items-center justify-center overflow-hidden bg-slate-900 pt-28 pb-20 sm:min-h-[75vh] sm:aspect-auto sm:pt-0 sm:pb-0 md:min-h-screen"
      >
        <div className="absolute inset-0 z-0 ">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <motion.img
                src={activeSlide?.image}
                alt={activeSlide?.altText || ""}
                initial={{ scale: 1 }}
                animate={{ scale: 1.15 }}
                transition={{ duration: 7, ease: "linear" }}
                className="h-full w-full object-cover brightness-[0.98] saturate-[1.1]"
              />
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-black/10" />
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 58% 36% at 50% 42%, rgba(20, 22, 30, 0.15) 0%, rgba(20, 22, 30, 0.05) 26%, rgba(20, 22, 30, 0) 48%, rgba(20, 22, 30, 0) 72%),
                linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.2) 100%)
              `,
            }}
          />
        </div>

        <div className="site-width relative z-10 mx-auto w-full px-4 text-center mt-8 md:mt-10 md:px-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-vibes text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-amber-500 mb-1 sm:mb-1.5"
              >
                {activeSlide?.subtitle}
              </motion.div>
              
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`${(activeSlide?.description && activeSlide.description.replace(/<[^>]*>?/gm, '').trim().length > 0) ? 'mb-4 sm:mb-6' : 'mb-6 sm:mb-8'} font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white tracking-tight uppercase [&_p]:m-0`}
              >
                <span className="block mb-2" dangerouslySetInnerHTML={{ __html: activeSlide?.title1 || activeSlide?.title?.[0] }}></span>
                <span className="block text-white/80 font-medium" dangerouslySetInnerHTML={{ __html: activeSlide?.title2 || activeSlide?.title?.[1] }}></span>
              </motion.h1>

              {(activeSlide?.description && activeSlide.description.replace(/<[^>]*>?/gm, '').trim().length > 0) && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="max-w-xl text-white/70 text-xs md:text-sm mb-6 sm:mb-8 md:mb-10 leading-relaxed mx-auto"
                  dangerouslySetInnerHTML={{ __html: activeSlide.description }}
                />
              )}

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-row flex-nowrap items-center justify-center gap-1 sm:gap-4 w-full px-1"
              >
                <button
                  type="button"
                  onClick={openLeadModal}
                  className="shrink-0 whitespace-nowrap rounded-full bg-amber-500 px-2 py-1.5 sm:px-8 sm:py-3.5 text-[7px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-900 transition-all duration-300 hover:bg-amber-400 hover:scale-105 shadow-xl shadow-amber-500/20"
                >
                  {activeSlide?.button1Text || "Book Holiday"}
                </button>
                {activeSlide?.button2Link && (
                  <Link href={activeSlide.button2Link}>
                    <button className="shrink-0 whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-2 py-1.5 sm:px-8 sm:py-3.5 text-[7px] sm:text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-slate-900 hover:scale-105">
                      {activeSlide?.button2Text || "Memberships"}
                    </button>
                  </Link>
                )}
                {activeSlide?.button3Link && (
                  <Link href={activeSlide.button3Link}>
                    <button className="shrink-0 whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-2 py-1.5 sm:px-8 sm:py-3.5 text-[7px] sm:text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-slate-900 hover:scale-105">
                      {activeSlide?.button3Text || "Plan Event"}
                    </button>
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-0 left-0 z-20 h-[55px] w-full translate-y-[1px] pointer-events-none md:h-40 lg:h-40">
          <div
            className="absolute inset-0 z-10"
            style={{
              clipPath: "url(#wave-clip)",
              WebkitClipPath: "url(#wave-clip)",
            }}
          >
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-amber-200 opacity-40 blur-[150px]" />
          </div>

          <img
            src="/curveline.png"
            alt=""
            className="absolute inset-0 z-20 h-full w-full"
          />

          <div className="absolute bottom-0 right-0 z-30 flex w-full items-end justify-end px-2.5 pb-1 pointer-events-none md:hidden">
            <div className="relative flex w-fit flex-col items-end pointer-events-auto">
              <p className="mb-1 w-full text-right text-[9px] font-black uppercase leading-none tracking-[0.18em] text-[#e3235b]">
                Since 2012
              </p>

              <div className="flex w-full items-center justify-center gap-1">
                <Link
                  href="https://play.google.com/store/apps/details?id=rigel.ownholiday.club"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Get it on Google Play"
                  className="inline-flex items-center justify-center overflow-hidden rounded-[4px] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-[18px] w-auto object-contain"
                  />
                </Link>
                <Link
                  href="https://apps.apple.com/in/app/own-holiday-club/id6741328417"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Download on the App Store"
                  className="inline-flex items-center justify-center overflow-hidden rounded-[4px] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="Download on the App Store"
                    className="h-[18px] w-auto object-contain"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 right-[70px] z-30 hidden w-full items-end justify-end px-6 pb-6 pointer-events-none md:flex md:px-12 md:pb-8">
            <div className="relative flex w-fit flex-col pointer-events-auto">
              <h2 className="mb-2 flex w-full items-center justify-between text-[12px] font-black uppercase leading-none text-[#e3235b] md:text-[20px]">
                <span>S</span>
                <span>I</span>
                <span>N</span>
                <span>C</span>
                <span>E</span>
                <span className="w-4 md:w-5"></span>
                <span>2</span>
                <span>0</span>
                <span>1</span>
                <span>2</span>
              </h2>

              <div className="flex w-full items-center justify-between gap-3">
                <Link
                  href="https://play.google.com/store/apps/details?id=rigel.ownholiday.club"
                  target="_blank"
                  className="flex items-center justify-center overflow-hidden rounded-md  shadow-sm transition-transform duration-300 hover:-translate-y-1"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-12 w-16 cursor-pointer object-contain p-0.5 md:h-11 md:w-[88px] lg:h-12 lg:w-24"
                  />
                </Link>
                <Link
                  href="https://apps.apple.com/in/app/own-holiday-club/id6741328417"
                  target="_blank"
                  className="flex items-center justify-center overflow-hidden rounded-md  shadow-sm transition-transform duration-300 hover:-translate-y-1"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="Download on the App Store"
                    className="h-12 w-16 cursor-pointer object-contain p-0.5 md:h-11 md:w-[88px] lg:h-12 lg:w-24"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isLeadModalOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            onClick={closeLeadModal}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.45)]">
            <div className="bg-slate-950 px-6 py-5 text-white">
              <button
                type="button"
                onClick={closeLeadModal}
                disabled={isSubmittingLead}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 disabled:opacity-60"
                aria-label="Close popup"
              >
                <X size={18} />
              </button>

              <div className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300">
                Book Holiday
              </div>
              <h3 className="mt-4 text-3xl font-bold leading-tight">
                Request a callback
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Share your details and our holiday team will contact you.
              </p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4 px-6 py-6">
              {leadFeedback.type === "error" && leadFeedback.message ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {leadFeedback.message}
                </div>
              ) : null}

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-600">
                  Full Name
                </span>
                <input
                  type="text"
                  value={leadForm.name}
                  onChange={(event) =>
                    handleLeadFieldChange("name", event.target.value)
                  }
                  placeholder="Enter your full name"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-600">
                  Email Address
                </span>
                <input
                  type="email"
                  value={leadForm.email}
                  onChange={(event) =>
                    handleLeadFieldChange("email", event.target.value)
                  }
                  placeholder="Enter your email"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-600">
                  Phone Number
                </span>
                <input
                  type="tel"
                  value={leadForm.phone}
                  onChange={(event) =>
                    handleLeadFieldChange("phone", event.target.value)
                  }
                  placeholder="Enter your phone number"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/10"
                />
              </label>

              <button
                type="submit"
                disabled={isSubmittingLead}
                className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-amber-500 px-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmittingLead ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
