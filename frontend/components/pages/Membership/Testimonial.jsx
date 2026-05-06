"use client";

import React, { useState, useEffect, useRef } from "react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

const TESTIMONIALS = [
  {
    quote: "Joining Own Holiday Club was the single best move we made for our family. The wholesale rates paid for the membership within the first three trips.",
    name: "James & Sarah Windsor",
    role: "Platinum Members since 2018",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    quote: "We've travelled to 12 destinations in 4 years — all at rates we never imagined possible. The concierge team treats you like royalty every single time.",
    name: "Priya & Arjun Mehta",
    role: "Gold Members since 2020",
    avatar: "https://i.pravatar.cc/150?u=b042581f4e29026704e",
  },
  {
    quote: "Best investment for our family. The kids love every resort and we love the zero-stress planning. Own Holiday Club handles everything beautifully.",
    name: "Rajesh & Sunita Sharma",
    role: "Platinum Members since 2019",
    avatar: "https://i.pravatar.cc/150?u=c042581f4e29026704f",
  },
  {
    quote: "From Goa to Bali to Europe — our membership opened doors we didn't know existed. Exceptional value and truly world-class service at every turn.",
    name: "David & Emma Collins",
    role: "Silver Members since 2021",
    avatar: "https://i.pravatar.cc/150?u=d042581f4e29026704g",
  },
  {
    quote: "The 25-year membership is a gift to our children. We've already passed unforgettable memories and know they will continue this tradition with their families.",
    name: "Suresh & Kavitha Nair",
    role: "Lifetime Members since 2017",
    avatar: "https://i.pravatar.cc/150?u=e042581f4e29026704h",
  },
];

// Show 2 per page → pages: [0,1], [2,3], [4]
const PAGES = [
  [0, 1],
  [2, 3],
  [4],
];

export default function Testimonial() {
  const [page, setPage] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setPage((p) => (p + 1) % PAGES.length);
    }, 4500);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleDot = (i) => {
    setPage(i);
    startTimer();
  };

  const currentPair = PAGES[page].map((i) => TESTIMONIALS[i]);

  return (
    <section style={{ position: "relative", background: "#0f172a", padding: "72px 0", overflow: "hidden" }}>

      {/* BG image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.10,
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#0f172a 0%,#1a1a2e 50%,#0f172a 100%)", opacity: 0.9 }} />

      <style>{`
        @keyframes bubbleFloat {
          0%   { transform: translateY(0px)   scale(1);    }
          50%  { transform: translateY(-50px) scale(1.12); }
          100% { transform: translateY(0px)   scale(1);    }
        }
        @keyframes bubbleFloat2 {
          0%   { transform: translateY(0px) translateX(0px);    }
          33%  { transform: translateY(-35px) translateX(18px); }
          66%  { transform: translateY(-15px) translateX(-12px);}
          100% { transform: translateY(0px) translateX(0px);    }
        }
        @keyframes bubblePulse {
          0%, 100% { opacity: 0.55; transform: scale(1);    }
          50%       { opacity: 0.85; transform: scale(1.15); }
        }
        @keyframes tSlide {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .t-slide { animation: tSlide 0.45s cubic-bezier(0.4,0,0.2,1) both; }
        @media (max-width: 700px) {
          .testi-pair { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── VISIBLE BUBBLES ── */}
      {/* Large amber glow top-left */}
      <div style={{
        position: "absolute", width: 320, height: 320,
        top: -80, left: -80, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.55) 0%, rgba(245,158,11,0.0) 70%)",
        animation: "bubbleFloat 6s ease-in-out infinite",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* Medium amber ring top-left */}
      <div style={{
        position: "absolute", width: 180, height: 180,
        top: 40, left: 60, borderRadius: "50%",
        border: "2px solid rgba(245,158,11,0.45)",
        background: "transparent",
        animation: "bubblePulse 4s ease-in-out 0.5s infinite",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* Large blue glow top-right */}
      <div style={{
        position: "absolute", width: 380, height: 380,
        top: -100, right: -100, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.40) 0%, rgba(99,102,241,0.0) 70%)",
        animation: "bubbleFloat2 8s ease-in-out infinite",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* Amber glow bottom-left */}
      <div style={{
        position: "absolute", width: 260, height: 260,
        bottom: -80, left: "25%", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.38) 0%, rgba(245,158,11,0.0) 70%)",
        animation: "bubbleFloat 7s ease-in-out 1.5s infinite",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* Small amber circle mid-right */}
      <div style={{
        position: "absolute", width: 120, height: 120,
        top: "45%", right: "6%", borderRadius: "50%",
        border: "2px solid rgba(245,158,11,0.50)",
        background: "rgba(245,158,11,0.10)",
        animation: "bubblePulse 5s ease-in-out 0.8s infinite",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* Indigo glow bottom-right */}
      <div style={{
        position: "absolute", width: 200, height: 200,
        bottom: -40, right: "10%", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.30) 0%, rgba(99,102,241,0.0) 70%)",
        animation: "bubbleFloat2 9s ease-in-out 2s infinite",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* Small white ring top-center */}
      <div style={{
        position: "absolute", width: 80, height: 80,
        top: "18%", left: "48%", borderRadius: "50%",
        border: "1.5px solid rgba(255,255,255,0.18)",
        background: "transparent",
        animation: "bubblePulse 3.5s ease-in-out 1s infinite",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* ── CONTENT ── */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto", padding: "0 28px" }}>

        <ScrollAnimate animation="fade-up">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 16px", borderRadius: 40,
              background: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(245,158,11,0.35)",
              marginBottom: 16,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#f59e0b" }}>
                Member Stories
              </span>
            </div>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(24px,3vw,36px)", fontWeight: 800,
              color: "#fff", textTransform: "uppercase",
              lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0,
            }}>
              What Our{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "#f59e0b", fontFamily: "'DM Serif Display', serif" }}>
                Members Say
              </em>
            </h2>
          </div>
        </ScrollAnimate>

        {/* Cards — 2 per row */}
        <div
          key={page}
          className="t-slide testi-pair"
          style={{
            display: "grid",
            gridTemplateColumns: currentPair.length === 1 ? "minmax(0,520px)" : "1fr 1fr",
            gap: 20,
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          {currentPair.map((t, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(245,158,11,0.20)",
                borderRadius: 16,
                padding: "28px 28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle amber corner glow inside card */}
              <div style={{
                position: "absolute", top: -30, right: -30,
                width: 120, height: 120, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />

              {/* Quote mark */}
              <div style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 56, color: "#f59e0b",
                lineHeight: 0.7, opacity: 0.6,
                userSelect: "none",
              }}>
                &ldquo;
              </div>

              {/* Quote text */}
              <p style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(14px,1.5vw,17px)",
                fontWeight: 400, fontStyle: "italic",
                color: "rgba(255,255,255,0.90)",
                lineHeight: 1.7, margin: 0, flex: 1,
              }}>
                {t.quote}
              </p>

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(245,158,11,0.20)", borderRadius: 1 }} />

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  border: "2px solid #f59e0b",
                  overflow: "hidden", flexShrink: 0,
                }}>
                  <img src={t.avatar} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: 700, color: "#fff", marginBottom: 3 }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9.5, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#f59e0b" }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
          {PAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              style={{
                width: i === page ? 28 : 8,
                height: 8, borderRadius: 4,
                border: "none", cursor: "pointer", padding: 0,
                background: i === page ? "#f59e0b" : "rgba(255,255,255,0.22)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}