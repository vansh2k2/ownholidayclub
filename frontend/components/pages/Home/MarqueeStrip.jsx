"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Star, Zap, Plane, ShieldCheck } from "lucide-react";

const bubbles = [
  { w: 70,  top: "50%", left: "4%",  duration: 4.2, delay: 0,   type: 0 },
  { w: 44,  top: "22%", left: "11%", duration: 3.5, delay: 0.5, type: 1 },
  { w: 30,  top: "72%", left: "18%", duration: 5.1, delay: 1.2, type: 2 },
  { w: 60,  top: "32%", left: "27%", duration: 3.8, delay: 0.3, type: 0 },
  { w: 28,  top: "66%", left: "36%", duration: 4.6, delay: 0.9, type: 1 },
  { w: 50,  top: "18%", left: "45%", duration: 3.2, delay: 0.7, type: 2 },
  { w: 65,  top: "56%", left: "53%", duration: 4.9, delay: 0.2, type: 0 },
  { w: 36,  top: "28%", left: "61%", duration: 3.6, delay: 1.0, type: 1 },
  { w: 55,  top: "70%", left: "69%", duration: 4.3, delay: 0.4, type: 2 },
  { w: 32,  top: "24%", left: "77%", duration: 5.0, delay: 0.8, type: 0 },
  { w: 62,  top: "52%", left: "84%", duration: 3.9, delay: 0.1, type: 1 },
  { w: 40,  top: "34%", left: "91%", duration: 4.7, delay: 0.6, type: 2 },
  { w: 22,  top: "68%", left: "97%", duration: 3.3, delay: 1.3, type: 0 },
];

const getBubbleStyle = (type, w) => {
  if (type === 0) return {
    background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55), rgba(255,180,180,0.12))`,
    border: "1.5px solid rgba(255,255,255,0.55)",
    boxShadow: `inset 0 0 ${w * 0.4}px rgba(255,255,255,0.2), 0 0 ${w * 0.35}px rgba(255,255,255,0.15)`,
  };
  if (type === 1) return {
    background: `radial-gradient(circle at 35% 35%, rgba(251,191,36,0.5), rgba(251,191,36,0.08))`,
    border: "1.5px solid rgba(251,191,36,0.5)",
    boxShadow: `inset 0 0 ${w * 0.4}px rgba(251,191,36,0.2), 0 0 ${w * 0.35}px rgba(251,191,36,0.12)`,
  };
  return {
    background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.35), rgba(180,60,60,0.06))`,
    border: "1.5px solid rgba(255,255,255,0.35)",
    boxShadow: `inset 0 0 ${w * 0.4}px rgba(255,255,255,0.12), 0 0 ${w * 0.3}px rgba(255,255,255,0.08)`,
  };
};

const MarqueeStrip = () => {
  const marqueeItems = [
    { text: "Exclusive Domestic & International Destinations", icon: <Plane size={13} /> },
    { text: "Flat 50% Off on Luxury Memberships", icon: <Zap size={13} /> },
    { text: "24/7 Concierge & Travel Assistance", icon: <ShieldCheck size={13} /> },
    { text: "Trusted by 280,000+ Luxury Travellers", icon: <Star size={13} /> },
    { text: "Become a Member Today & Save on Every Holiday", icon: <Sparkles size={13} /> },
  ];

  const duplicatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section className="relative bg-red-700 py-3.5 overflow-hidden border-y border-red-900/50 shadow-xl z-20">

      {/* ── Fine dot grid ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
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

      {/* ── Edge fades ── */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-red-700 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-red-700 to-transparent z-10 pointer-events-none" />

      {/* ── Marquee track ── */}
      <div className="flex whitespace-nowrap relative z-[5]">
        <motion.div
          animate={{ x: [0, -1060] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex items-center"
        >
          {duplicatedItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 px-1">

              {/* Icon */}
              <span
                className="flex items-center justify-center w-[26px] h-[26px] rounded-full border border-white/25 text-amber-300 flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                {item.icon}
              </span>

              {/* Label */}
              <span
                className="text-white font-semibold text-[10px] md:text-[11px] uppercase tracking-[0.24em]"
                style={{ fontFamily: "'DM Sans', sans-serif", textShadow: "0 1px 4px rgba(0,0,0,0.25)" }}
              >
                {item.text}
              </span>

              {/* Separator */}
              <span className="flex items-center gap-[3px] mx-5">
                <span className="w-[3px] h-[3px] rounded-full bg-amber-400 opacity-60" />
                <span className="w-[5px] h-[5px] rounded-full bg-white opacity-30" />
                <span className="w-[3px] h-[3px] rounded-full bg-amber-400 opacity-60" />
              </span>

            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default MarqueeStrip;