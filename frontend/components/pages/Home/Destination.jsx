"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";
import Link from "next/link";
import { fetchDestinations } from "@/lib/destinations";

/* ── Animated Counter ── */
const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) setHasStarted(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const end = parseInt(target.replace(/\D/g, ""));
    const isK = target.toLowerCase().includes("k");
    const isPlus = target.includes("+");
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  const isK = target.toLowerCase().includes("k");
  const isPlus = target.includes("+");
  const display = `${count}${isK ? "k" : ""}${isPlus ? "+" : ""}`;

  return <span ref={ref}>{display}</span>;
};

/* ── Liquid Fill Button ── */
const LiquidButton = ({ href, children, autoFill = false }) => {
  const [hovered, setHovered] = useState(false);
  const [fillLevel, setFillLevel] = useState(0);
  const autoRef = useRef(null);
  const hoverRef = useRef(null);
  const isVisible = useRef(false);
  const observerRef = useRef(null);
  const btnRef = useRef(null);

  // Auto-fill on scroll into view (slow: 3s)
  useEffect(() => {
    if (!autoFill) return;
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible.current) {
          isVisible.current = true;
          let start = null;
          const totalDuration = 3000;
          const animate = (ts) => {
            if (!start) start = ts;
            const elapsed = ts - start;
            const progress = Math.min(elapsed / totalDuration, 1);
            // Ease in-out cubic
            const eased = progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            setFillLevel(eased * 100);
            if (progress < 1) autoRef.current = requestAnimationFrame(animate);
          };
          autoRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.6 }
    );
    if (btnRef.current) observerRef.current.observe(btnRef.current);
    return () => {
      observerRef.current?.disconnect();
      cancelAnimationFrame(autoRef.current);
    };
  }, [autoFill]);

  // Hover: fast fill (400ms) / unfill (600ms)
  useEffect(() => {
    cancelAnimationFrame(hoverRef.current);
    if (hovered) {
      let start = null;
      const startLevel = fillLevel;
      const duration = 400;
      const animate = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setFillLevel(startLevel + (100 - startLevel) * eased);
        if (progress < 1) hoverRef.current = requestAnimationFrame(animate);
      };
      hoverRef.current = requestAnimationFrame(animate);
    } else {
      // Don't unfill below auto-fill level — keep it at 100 after auto-fill
      if (isVisible.current) return;
      let start = null;
      const startLevel = fillLevel;
      const duration = 600;
      const animate = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 2);
        setFillLevel(startLevel * (1 - eased));
        if (progress < 1) hoverRef.current = requestAnimationFrame(animate);
      };
      hoverRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(hoverRef.current);
  }, [hovered]);

  const filled = fillLevel >= 99;

  return (
    <Link href={href}>
      <button
        ref={btnRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative overflow-hidden flex items-center gap-3 px-5 py-2.5 border-2 border-red-600"
        style={{ borderRadius: 0 }}
      >
        {/* Liquid fill layer */}
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #dc2626 0%, #dc2626 100%)",
            transform: `translateY(${100 - fillLevel}%)`,
            transition: hovered ? "transform 0.05s linear" : "none",
          }}
        />

        {/* Liquid wave top edge */}
        <span
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            bottom: `${fillLevel}%`,
            height: "8px",
            transform: "translateY(50%)",
            background: "transparent",
            zIndex: 1,
          }}
        >
          <svg
            viewBox="0 0 200 8"
            preserveAspectRatio="none"
            className="w-full h-full"
            style={{
              opacity: fillLevel > 2 && fillLevel < 99 ? 1 : 0,
              transition: "opacity 0.2s",
            }}
          >
            <path
              d="M0,4 C30,0 70,8 100,4 C130,0 170,8 200,4 L200,8 L0,8 Z"
              fill="#dc2626"
            />
          </svg>
        </span>

        {/* Text */}
        <span
          className="relative z-10 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-200"
          style={{
            color: filled ? "#ffffff" : hovered ? "#ffffff" : "#dc2626",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {children}
        </span>

        {/* Arrow icon */}
        <span
          className="relative z-10 flex items-center justify-center transition-colors duration-200"
          style={{ color: filled ? "#ffffff" : hovered ? "#ffffff" : "#dc2626" }}
        >
          <ArrowRight
            size={14}
            className="group-hover:translate-x-0.5 transition-transform duration-300"
          />
        </span>
      </button>
    </Link>
  );
};

export default function Destinations() {
  const [destTab, setDestTab] = useState("domestic");
  const [activeIndex, setActiveIndex] = useState(0);
  const [destinationsData, setDestinationsData] = useState({ domestic: [], international: [] });
  const [headings, setHeadings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const [destRes, headRes] = await Promise.all([
          fetchDestinations(),
          fetch(`${process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081"}/api/destinations/headings/public`).then((r) => r.json()),
        ]);
        setDestinationsData({
          domestic: destRes.filter((d) => d.region?.toLowerCase() === "domestic"),
          international: destRes.filter((d) => d.region?.toLowerCase() === "international"),
        });
        if (headRes.success) setHeadings(headRes.data);
      } finally {
        setIsLoading(false);
      }
    };
    loadDestinations();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 10);
    }, 3000);
    return () => clearInterval(interval);
  }, [destTab]);

  const handleTabChange = useCallback((tab) => {
    setDestTab(tab);
    setActiveIndex(0);
  }, []);

  const currentList = destinationsData[destTab] || [];

  if (isLoading || (destinationsData.domestic.length === 0 && destinationsData.international.length === 0)) return null;

  const getSlot = (offset) => currentList[(activeIndex + offset) % currentList.length];
  const hero = getSlot(0);
  const card1 = getSlot(1);
  const card2 = getSlot(2);

  return (
    <section
      id="destinations"
      className="pt-6 pb-20 bg-white overflow-hidden relative"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-50 rounded-full blur-[100px] opacity-40 pointer-events-none" />

      <div className="site-width mx-auto px-4 md:px-8 relative z-10">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-end">
          <div className="lg:col-span-7">
            <ScrollAnimate variant="homeDestination">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-[1.5px] bg-amber-500 rounded-full" />
                <span
                  className="text-amber-600 font-bold uppercase tracking-[0.3em] text-[13px]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {headings?.subheading || "Make every moment magical"}
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 uppercase"
                dangerouslySetInnerHTML={{
                  __html: headings?.heading || "DISCOVER YOUR <br /><span class='italic font-normal text-amber-500 normal-case'>Destinations.</span>",
                }}
              />
            </ScrollAnimate>
          </div>

          <div className="lg:col-span-5 lg:pb-2">
            <ScrollAnimate variant="homeDestination" delay={150}>
              <p
                className="text-slate-700 text-[14px] leading-relaxed mb-6 max-w-xs border-l-2 border-amber-200 pl-5 font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {headings?.description || "A world of your OWN experiences — authenticity and comfort that feels familiar."}
              </p>

              <div
                className="relative inline-flex items-center p-1 rounded-full border border-slate-200 shadow-sm overflow-hidden"
                style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: headings?.toggleBg || "#F8FAFC" }}
              >
                <div
                  className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-500 ease-in-out shadow-md"
                  style={{
                    left: destTab === "international" ? "50%" : "4px",
                    backgroundColor: headings?.toggleActiveBg || "#F59E0B",
                  }}
                />
                {["domestic", "international"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className="relative z-10 px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest transition-colors duration-500"
                    style={{
                      width: "140px",
                      color: destTab === tab
                        ? headings?.toggleActiveTextColor || "#0F172A"
                        : headings?.toggleTextColor || "#64748B",
                    }}
                  >
                    {tab === "domestic" ? "In India" : "International"}
                  </button>
                ))}
              </div>
            </ScrollAnimate>
          </div>
        </div>

        {/* ── Cards Grid ── */}
        {currentList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5" style={{ gridTemplateRows: "280px 280px" }}>
            <Link href={`/destinations/${hero.slug || hero._id || hero.id}`} className="md:col-span-7 md:row-span-2 relative rounded-3xl overflow-hidden bg-slate-900 shadow-xl group block">
              <DestCard data={hero} isHero />
            </Link>
            <Link href={`/destinations/${card1.slug || card1._id || card1.id}`} className="md:col-span-5 md:row-span-1 relative rounded-3xl overflow-hidden bg-slate-900 shadow-lg group block">
              <DestCard data={card1} />
            </Link>
            <Link href={`/destinations/${card2.slug || card2._id || card2.id}`} className="md:col-span-5 md:row-span-1 relative rounded-3xl overflow-hidden bg-slate-900 shadow-lg group block">
              <DestCard data={card2} />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white/30 backdrop-blur-md rounded-3xl border-2 border-dashed border-slate-200">
            <Sparkles className="w-10 h-10 text-amber-500 mb-4 opacity-50" />
            <p className="text-slate-400 font-medium italic tracking-wide">Magical destinations coming soon...</p>
          </div>
        )}

        {/* ── Stats + CTA ── */}
        <div
          className="mt-12 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-10"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <div className="flex gap-12 md:gap-20">
            <StatItem value="125+" label="Premier Resorts" />
            <StatItem value="280k" label="Happy Families" />
          </div>

          {/* Liquid Fill Button */}
          <LiquidButton href="/destinations" autoFill={true}>
            Explore All Escapes
          </LiquidButton>
        </div>
      </div>
    </section>
  );
}

/* ── Destination Card ── */
function DestCard({ data, isHero = false }) {
  return (
    <div className="absolute inset-0 transition-opacity duration-1000">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/10 to-transparent" />
      </div>
      <div className="absolute top-6 left-6 z-10">
        <span
          className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[8px] font-black uppercase tracking-widest text-white"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {data.tag || "Must Visit"}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 p-8">
        <div className="flex items-end justify-between gap-4">
          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center gap-2 mb-2 text-white/70" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <MapPin size={12} className="text-amber-500" />
              <span className="text-[10px] font-medium uppercase tracking-[0.2em]">{data.count}</span>
            </div>
            <h3
              className={`text-white font-bold tracking-tight leading-none uppercase ${isHero ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {data.name}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shrink-0 shadow-xl">
            <ArrowUpRight size={20} strokeWidth={3} />
          </div>
        </div>
        <div className="mt-6 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
          <div className="absolute inset-y-0 left-0 w-0 bg-amber-500 group-hover:w-full transition-all duration-700 ease-out" />
        </div>
      </div>
    </div>
  );
}

/* ── Stat Item ── */
function StatItem({ value, label }) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className="text-5xl font-black text-slate-900 tracking-tight tabular-nums leading-none"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <AnimatedCounter target={value} />
      </span>
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}