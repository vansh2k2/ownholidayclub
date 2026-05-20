import React, { useState, useEffect } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";

const STATIC_SLIDES = [
  { title: "Membership plans for every family", left: "Other travel companies", leftText: "Pay per trip with no long-term benefits. Prices change every season and family members are charged separately.", right: "Own Holiday Club", rightText: "One membership covers Member + Spouse + 2 kids with long-term validity and fixed pricing — no hidden surprises." },
  { title: "Domestic & international destinations", left: "Other travel companies", leftText: "Limited destinations and multiple vendors required for different locations.", right: "Own Holiday Club", rightText: "Access to multiple domestic and international destinations with curated resorts and hotels under one membership." },
  { title: "End-to-end travel planning", left: "Other travel companies", leftText: "You manage bookings, transport, and itinerary separately.", right: "Own Holiday Club", rightText: "Complete travel planning including stays, transport, and experiences handled by experts." },
  { title: "Pay once, travel for years", left: "Other travel companies", leftText: "Prices increase every year with no cost predictability.", right: "Own Holiday Club", rightText: "Fixed pricing membership lets you enjoy holidays every year without worrying about rising hotel costs." },
  { title: "Wide range of destinations", left: "Other travel companies", leftText: "Limited resort options and availability issues.", right: "Own Holiday Club", rightText: "Members get access to a wide range of destinations including beaches, hills, and international cities." },
  { title: "Exclusive member benefits", left: "Other travel companies", leftText: "No exclusive perks or loyalty advantages.", right: "Own Holiday Club", rightText: "Members enjoy special discounts, curated stays, and exclusive deals not available to regular travelers." },
  { title: "Hassle-free booking", left: "Other travel companies", leftText: "Complex booking processes with multiple confirmations.", right: "Own Holiday Club", rightText: "Simple and smooth booking experience with dedicated support team." },
  { title: "Family-friendly experiences", left: "Other travel companies", leftText: "Trips often not optimized for family needs.", right: "Own Holiday Club", rightText: "Designed for families with comfortable stays and experiences tailored for all age groups." },
  { title: "Cost savings on travel", left: "Other travel companies", leftText: "Repeated bookings increase overall travel expenses.", right: "Own Holiday Club", rightText: "Membership helps save significantly on hotels and travel costs over time with predictable pricing." },
  { title: "Long-term travel value", left: "Other travel companies", leftText: "No long-term value or investment in travel.", right: "Own Holiday Club", rightText: "A long-term travel solution that ensures memorable holidays with consistent quality and service." },
];

export default function OwnHolidayClubCarousel() {
  const [slides, setSlides] = useState(STATIC_SLIDES);
  const [headings, setHeadings] = useState({
    subheading: "WHY CHOOSE US",
    heading: "10 REASONS TO",
    highlightedWord: "Become a Member."
  });

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const fetchWhyChooseUs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/why-choose-us/home`);
        const result = await response.json();
        if (result.success && result.data) {
          const wcuData = result.data;
          
          if (wcuData.heading) {
            setHeadings({
              subheading: wcuData.subheading || "WHY CHOOSE US",
              heading: wcuData.heading || "10 REASONS TO",
              highlightedWord: wcuData.highlightedWord || "Become a Member."
            });
          }
          
          if (wcuData.items && wcuData.items.length > 0) {
            const mappedSlides = wcuData.items.map(item => ({
              title: item.title,
              left: "Other travel companies",
              leftText: item.otherTravelCompanies,
              right: "Own Holiday Club",
              rightText: item.ownHolidayClub
            }));
            setSlides(mappedSlides);
          }
        }
      } catch (error) {
        console.error("Error fetching Why Choose Us:", error);
      }
    };
    fetchWhyChooseUs();
  }, []);

  const goTo = (index, manual = false) => {
    if (animating || slides.length === 0) return;
    if (manual) setPaused(true);
    setAnimating(true);
    setTimeout(() => {
      setCurrent((index + slides.length) % slides.length);
      setAnimating(false);
    }, 280);
  };

  useEffect(() => {
    if (paused || slides.length === 0) return;
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setAnimating(false);
      }, 280);
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, current, slides.length]);

  const slide = slides[current] || STATIC_SLIDES[0];

  return (
    <section
      className="w-full py-10 px-4 bg-slate-100 text-slate-900"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* ── Header ── */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-px bg-amber-400" />
          <span
            className="text-[9px] font-semibold tracking-[0.4em] uppercase text-amber-600 animate-pulse"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", letterSpacing: "0.4em" }}
          >
            {headings.subheading}
          </span>
          <span className="w-8 h-px bg-amber-400" />
        </div>
        <h2
          className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug uppercase tracking-tight"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {headings.heading}{" "}
          <span className="text-amber-500 italic font-normal normal-case">{headings.highlightedWord}</span>
        </h2>
      </div>

      {/* ── Timeline ── */}
      <div className="w-full max-w-[800px] mx-auto mb-10 px-4 relative">
        {/* Background Line */}
        <div className="absolute top-[18px] md:top-[22px] left-8 right-8 h-[2px] bg-slate-200 z-0" />
        
        {/* Progress Line */}
        <div
          className="absolute top-[18px] md:top-[22px] left-8 h-[2px] bg-amber-400 z-0 transition-all duration-500"
          style={{
            width: slides.length > 1 ? `calc(${(current / (slides.length - 1)) * 100}% - 0px)` : '0%',
            right: 'auto',
          }}
        />

        <div className="relative flex items-center justify-between w-full z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, true)}
              className="flex flex-col items-center group transition-transform duration-300"
              style={{ width: '0', flex: '0 0 auto', overflow: 'visible' }}
            >
              <div
                className={`w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center text-[8px] md:text-[10px] font-bold border-2 transition-all duration-300 ${
                  i === current
                    ? "bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-200 scale-110"
                    : i < current
                    ? "bg-amber-100 border-amber-300 text-amber-700"
                    : "bg-white border-slate-200 text-slate-400 group-hover:border-amber-300 group-hover:text-amber-500"
                }`}
                style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
              >
                {i < current ? "✓" : i + 1}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Card ── */}
      <div className="w-full max-w-[800px] mx-auto">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">

          {/* Amber top strip */}
          <div className="h-[3px] w-full bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300" />

          {/* Progress bar */}
          <div className="w-full h-[2px] bg-slate-100">
            <div
              className="h-full bg-amber-400"
              style={{
                width: paused ? "0%" : "100%",
                transition: paused ? "none" : "width 4000ms linear",
              }}
              key={`${current}-${paused}`}
            />
          </div>

          {/* Content */}
          <div
            className="px-6 pt-6 pb-5"
            style={{ opacity: animating ? 0 : 1, transition: "opacity 0.28s ease" }}
          >
            {/* Title + counter */}
            <div className="flex items-center justify-between mb-5 gap-4">
              <h3
                className="text-base md:text-lg font-bold text-slate-800 leading-snug"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {slide.title}
              </h3>
              <span
                className="text-[9px] font-semibold tracking-[0.18em] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-full flex-shrink-0 uppercase"
                style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
              >
                {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
            </div>

            {/* Comparison columns */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_44px_1fr] gap-0">

              {/* Left — Other companies */}
              <div className="flex flex-col items-center text-center px-4 py-4 rounded-xl bg-slate-100 border border-slate-200">
                <div className="w-7 h-7 rounded-full bg-slate-400 flex items-center justify-center mb-2 flex-shrink-0">
                  <span className="text-[10px] font-bold text-white">✕</span>
                </div>
                <p
                  className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2"
                  style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                >
                  {slide.left || "Other travel companies"}
                </p>
                <p
                  className="text-[12px] leading-relaxed text-slate-600"
                  style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                >
                  {slide.leftText}
                </p>
              </div>

              {/* VS */}
              <div className="flex md:flex-col items-center justify-center py-3 md:py-0">
                <div className="hidden md:block flex-1 w-px bg-slate-200" />
                <div
                  className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[9px] font-bold text-slate-400 flex-shrink-0 md:my-2 shadow-sm"
                  style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                >
                  VS
                </div>
                <div className="hidden md:block flex-1 w-px bg-slate-200" />
              </div>

              {/* Right — Own Holiday Club */}
              <div className="flex flex-col items-center text-center px-4 py-4 rounded-xl bg-amber-50 border border-amber-200">
                <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center mb-2 flex-shrink-0">
                  <span className="text-[10px] font-bold text-white">✓</span>
                </div>
                <p
                  className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-700 mb-2"
                  style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                >
                  {slide.right || "Own Holiday Club"}
                </p>
                <p
                  className="text-[12px] leading-relaxed text-slate-700"
                  style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                >
                  {slide.rightText}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-slate-50"
            style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          >
            {paused ? (
              <button
                onClick={() => setPaused(false)}
                className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-amber-600 hover:text-amber-700 transition-colors"
              >
                ▶ Resume
              </button>
            ) : (
              <span className="text-[9px] font-bold tracking-widest uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm">
                Auto-playing
              </span>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={() => goTo(current - 1, true)}
                className="w-8 h-8 bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-all text-sm shadow-sm"
              >
                ←
              </button>
              <button
                onClick={() => goTo(current + 1, true)}
                className="w-8 h-8 bg-amber-500 flex items-center justify-center text-white hover:bg-amber-600 transition-all text-sm shadow-sm"
              >
                →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}