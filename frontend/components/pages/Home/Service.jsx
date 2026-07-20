"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight, Compass, Music, Heart, Briefcase, Sparkles } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";
import Link from "next/link";
import { fetchExploreServicesData } from "@/lib/services";

const getServiceIcon = (title = "", category = "") => {
  const value = `${title} ${category}`.toLowerCase();
  if (value.includes("wedding")) return <Heart size={18} />;
  if (value.includes("corporate") || value.includes("business")) return <Briefcase size={18} />;
  if (value.includes("music") || value.includes("entertainment")) return <Music size={18} />;
  if (value.includes("outing") || value.includes("excursion")) return <Compass size={18} />;
  return <Sparkles size={18} />;
};

/* ── Liquid Fill Button ── */
const LiquidButton = ({ href, children, autoFill = false }) => {
  const [hovered, setHovered] = React.useState(false);
  const [fillLevel, setFillLevel] = React.useState(0);
  const autoRef = React.useRef(null);
  const hoverRef = React.useRef(null);
  const isVisible = React.useRef(false);
  const observerRef = React.useRef(null);
  const btnRef = React.useRef(null);

  React.useEffect(() => {
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
            const eased =
              progress < 0.5
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

  React.useEffect(() => {
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

  return (
    <Link href={href}>
      <button
        ref={btnRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative overflow-hidden flex items-center gap-3 px-6 py-3 border-2 border-amber-500"
        style={{ borderRadius: 0 }}
      >
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #f59e0b 0%, #f59e0b 100%)",
            transform: `translateY(${100 - fillLevel}%)`,
            transition: hovered ? "transform 0.05s linear" : "none",
          }}
        />
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
              fill="#f59e0b"
            />
          </svg>
        </span>
        <span
          className="relative z-10 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300"
          style={{
            color: fillLevel > 50 ? "#ffffff" : "#000000",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {children}
        </span>
        <span
          className="relative z-10 flex items-center justify-center transition-colors duration-300"
          style={{ color: fillLevel > 50 ? "#ffffff" : "#000000" }}
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

/* ── Split BG: two parallel diagonal stripes ── */
const SplitBackground = () => (
  <div
    aria-hidden="true"
    style={{
      position: "absolute",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
      overflow: "hidden",
    }}
  >
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* White base */}
      <rect width="1000" height="600" fill="#ffffff" />

      {/* Top-left soft cream zone */}
      <polygon points="0,0 460,0 0,340" fill="#fffdf7" />

      {/* Bottom-right light amber zone */}
      <polygon points="1000,600 1000,120 180,600" fill="#fffbeb" />

      {/* Deeper amber corner */}
      <polygon points="1000,600 1000,300 540,600" fill="#fef3c7" opacity="0.6" />

      {/* ── Diagonal Stripe 1 ── */}
      <polygon
        points="300,0 355,0 0,510 0,455"
        fill="#fde68a"
        opacity="0.25"
      />

      {/* ── Diagonal Stripe 2 — Increased gap to the right ── */}
      <polygon
        points="550,0 605,0 195,600 140,600"
        fill="#fde68a"
        opacity="0.18"
      />
    </svg>

    {/* Dot grid overlay */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "radial-gradient(circle, rgba(245,158,11,0.11) 1.2px, transparent 1.2px)",
        backgroundSize: "30px 30px",
      }}
    />
  </div>
);

export default function Service() {
  const [exploreData, setExploreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchExploreServicesData();
        setExploreData(data);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  if (isLoading || !exploreData) return null;

  const servicesList = exploreData.services || [];

  return (
    <section
      id="services"
      className="pt-12 pb-24 overflow-hidden"
      style={{ position: "relative", background: "#ffffff" }}
    >
      {/* Split Background */}
      <SplitBackground />

      <div
        className="site-width mx-auto px-4 md:px-8"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <ScrollAnimate variant="homeStandard" className="max-w-2xl">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                border: "1px solid #fcd34d",
                background: "#fffbeb",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#f59e0b",
                  display: "inline-block",
                }}
              />
              <span
                className="font-bold uppercase"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.28em",
                  color: "#b45309",
                }}
              >
                {exploreData.subheading}
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-2xl md:text-4xl font-bold mb-5 leading-tight tracking-tight font-serif uppercase"
              style={{ color: "#1e293b" }}
              dangerouslySetInnerHTML={{ __html: exploreData.heading }}
            />

            {/* Divider */}
            <div
              style={{
                width: 44,
                height: 3,
                background: "#fcd34d",
                borderRadius: 2,
                marginBottom: 20,
              }}
            />

            <p
              className="text-sm md:text-base leading-relaxed font-medium max-w-lg"
              style={{ color: "#94a3b8" }}
            >
              {exploreData.description}
            </p>
          </ScrollAnimate>

          {/* Explore All Button */}
          <ScrollAnimate variant="homeStandard" delay={200}>
            <LiquidButton href="/services" autoFill={true}>
              Explore All
            </LiquidButton>
          </ScrollAnimate>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.slice(0, 4).map((service, index) => {
            const description = service.description || "";
            const image =
              service.image ||
              "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80";

            return (
              <ScrollAnimate
                variant="homeStandard"
                key={service.id || index}
                delay={index * 120}
                className="group relative h-[400px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                style={{ borderRadius: "20px" }}
              >
                <Link
                  href={service.buttonUrl || `/services/${service.id}`}
                  className="block h-full w-full"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
                    <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>

                  {/* Index Number */}
                  <div className="absolute top-6 left-6 z-10">
                    <span
                      className="text-4xl font-bold font-serif leading-none group-hover:text-amber-500/40 transition-colors duration-500"
                      style={{ color: "rgba(255,255,255,0.13)" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content Bottom */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-8">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-amber-500 group-hover:border-amber-400 transition-all duration-500 shadow-2xl">
                        {getServiceIcon(service.title, service.category)}
                      </div>
                      <h3 className="text-xl font-bold text-white leading-tight uppercase group-hover:text-amber-400 transition-colors duration-500">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description on hover */}
                    <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-48 group-hover:opacity-100 transition-all duration-700 ease-in-out">
                      <p className="text-white/70 text-[13px] leading-relaxed mb-6 font-medium">
                        {description}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-3">
                      <div
                        className="h-[2px] bg-amber-500 group-hover:w-12 transition-all duration-500"
                        style={{ width: 28 }}
                      />
                      <span className="text-white font-bold text-[10px] uppercase tracking-[0.2em] opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        {service.buttonText || "Learn More"}
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollAnimate>
            );
          })}
        </div>
      </div>
    </section>
  );
}