"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

const bubbles = [
  { w: 70, top: "50%", left: "4%", duration: 4.2, delay: 0, type: 0 },
  { w: 44, top: "22%", left: "11%", duration: 3.5, delay: 0.5, type: 1 },
  { w: 30, top: "72%", left: "18%", duration: 5.1, delay: 1.2, type: 2 },
  { w: 60, top: "32%", left: "27%", duration: 3.8, delay: 0.3, type: 0 },
  { w: 28, top: "66%", left: "36%", duration: 4.6, delay: 0.9, type: 1 },
  { w: 50, top: "18%", left: "45%", duration: 3.2, delay: 0.7, type: 2 },
  { w: 65, top: "56%", left: "53%", duration: 4.9, delay: 0.2, type: 0 },
  { w: 36, top: "28%", left: "61%", duration: 3.6, delay: 1.0, type: 1 },
  { w: 55, top: "70%", left: "69%", duration: 4.3, delay: 0.4, type: 2 },
  { w: 32, top: "24%", left: "77%", duration: 5.0, delay: 0.8, type: 0 },
  { w: 62, top: "52%", left: "84%", duration: 3.9, delay: 0.1, type: 1 },
  { w: 40, top: "34%", left: "91%", duration: 4.7, delay: 0.6, type: 2 },
  { w: 22, top: "68%", left: "97%", duration: 3.3, delay: 1.3, type: 0 },
];

const getBubbleStyle = (type, w) => {
  if (type === 0)
    return {
      background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55), rgba(255,180,180,0.12))`,
      border: "1.5px solid rgba(255,255,255,0.55)",
      boxShadow: `inset 0 0 ${w * 0.4}px rgba(255,255,255,0.2), 0 0 ${
        w * 0.35
      }px rgba(255,255,255,0.15)`,
    };
  if (type === 1)
    return {
      background: `radial-gradient(circle at 35% 35%, rgba(251,191,36,0.5), rgba(251,191,36,0.08))`,
      border: "1.5px solid rgba(251,191,36,0.5)",
      boxShadow: `inset 0 0 ${w * 0.4}px rgba(251,191,36,0.2), 0 0 ${
        w * 0.35
      }px rgba(251,191,36,0.12)`,
    };
  return {
    background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.35), rgba(180,60,60,0.06))`,
    border: "1.5px solid rgba(255,255,255,0.35)",
    boxShadow: `inset 0 0 ${w * 0.4}px rgba(255,255,255,0.12), 0 0 ${
      w * 0.3
    }px rgba(255,255,255,0.08)`,
  };
};

export default function ServiceDetailBottomCtaSection({
  serviceData,
  onScrollToForm,
}) {
  return (
    <section
      className="relative overflow-hidden bg-red-700 text-center"
      style={{
        padding: "2.5rem 1.5rem",
        minHeight: "260px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ── Fine dot grid overlay ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1.5" fill="#fff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* ── Enhanced Animated Bubbles ── */}
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: b.w,
            height: b.w,
            top: b.top,
            left: b.left,
            translateY: "-50%",
            translateX: "-50%",
            opacity: 0.78,
            ...getBubbleStyle(b.type, b.w),
          }}
          animate={{
            y: [0, -(b.w * 0.35), b.w * 0.15, -(b.w * 0.25), 0],
            x: [0, b.w * 0.18, -(b.w * 0.12), b.w * 0.1, 0],
            scale: [1, 1.18, 0.93, 1.12, 1],
            opacity: [0.78, 1, 0.62, 0.95, 0.78],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 max-w-xl mx-auto">
        <ScrollAnimate animation="fade-up">
          {/* Eyebrow */}
          <p
            className="uppercase tracking-[0.22em] text-[10px] font-semibold mb-2"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Curated Luxury Experiences
          </p>

          {/* Heading */}
          <h2
            className="text-white font-semibold leading-[1.08] mb-1"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 2.6rem)",
            }}
          >
            Ready for the
            <br />
            <em className="font-light text-amber-300 not-italic">
              {serviceData.title}?
            </em>
          </h2>

          {/* Subtext */}
          <p
            className="text-xs mb-6 font-normal max-w-md mx-auto"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.01em",
            }}
          >
            Start planning your event today and ensure a premium execution.
          </p>

          {/* Button */}
          <button
            onClick={onScrollToForm}
            className="inline-flex items-center gap-2.5 bg-stone-900 text-white rounded-full transition-all duration-300 hover:bg-stone-800 active:scale-95 group shadow-xl"
            style={{
              padding: "0.55rem 0.55rem 0.55rem 1.2rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            <span>Request Consultation</span>
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-stone-900 transition-all duration-300">
              <ArrowUpRight size={14} />
            </span>
          </button>
        </ScrollAnimate>
      </div>
    </section>
  );
}
