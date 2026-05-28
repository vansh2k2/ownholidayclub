"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────
   Scroll-in animation wrapper
───────────────────────────────────────── */
const ScrollAnimate = ({ children, delay = 0, className = "" }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* ─────────────────────────────────────────
   Animated Number Counter
───────────────────────────────────────── */
const NumberCounter = ({ value }) => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  const match = typeof value === "string" ? value.match(/^(\d+)(.*)$/) : null;
  const targetNum = match ? parseInt(match[1]) : null;
  const suffix = match ? match[2] : value;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || targetNum === null) return;
    let startTime = null;
    const duration = 1800;
    const animate = (now) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * targetNum));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible, targetNum]);

  return (
    <span ref={ref}>
      {targetNum !== null ? count : ""}{suffix}
    </span>
  );
};

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const steps = [
  {
    num: "01",
    title: "Choose Your Plan",
    desc: "Pick a membership tier crafted around your lifestyle, from 5-year Privilege to 30-year Diamond.",
    circleColor: "#3b6fd4",
    circleBg: "linear-gradient(135deg, #4a7fe0 0%, #2d5bb5 100%)",
    topBar: "#3b6fd4",
    watermarkColor: "rgba(59,111,212,0.08)",
  },
  {
    num: "02",
    title: "Get Activated",
    desc: "Your concierge onboards you in under 24 hours. Verified membership, zero hidden fees.",
    circleColor: "#c4911a",
    circleBg: "linear-gradient(135deg, #d4a428 0%, #a87818 100%)",
    topBar: "#c4911a",
    watermarkColor: "rgba(196,145,26,0.08)",
  },
  {
    num: "03",
    title: "Start Travelling",
    desc: "Unlock curated luxury resorts, transferable stays, and bespoke itineraries — for decades.",
    circleColor: "#1aab7a",
    circleBg: "linear-gradient(135deg, #22c88e 0%, #138c60 100%)",
    topBar: "#1aab7a",
    watermarkColor: "rgba(26,171,122,0.08)",
  },
];

const trustBadges = [
  {
    label: "Verified Membership",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    label: "10K+ Happy Members",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: "35 Years Validity",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: "Zero Hidden Fees",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function MembershipExplainer() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background: "#f5f0e8",
        backgroundImage:
          "radial-gradient(ellipse at 30% 0%, rgba(196,164,40,0.10) 0%, transparent 55%), " +
          "radial-gradient(ellipse at 80% 80%, rgba(196,164,40,0.07) 0%, transparent 50%)",
        padding: "40px 0 40px",
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,600&family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@400;500;600;700&display=swap');

        .me-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .me-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }

        .me-trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .me-step-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04), 0 12px 36px rgba(0,0,0,0.06);
          transition: all 0.3s ease;
          cursor: default;
          border: 2px solid #f3f4f6;
          height: 100%;
        }

        .me-step-card:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
          border-color: #C8102E;
        }

        .me-step-wrapper {
          height: 100%;
        }

        .me-step-top-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 4px;
          width: 0;
          background: #C8102E;
          transition: width 0.5s ease;
          z-index: 10;
        }
        .me-step-card:hover .me-step-top-bar {
          width: 100%;
        }

        .me-step-watermark {
          position: absolute;
          top: 8px;
          right: 12px;
          font-size: 80px;
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          color: #f3f4f6;
          line-height: 1;
          user-select: none;
          pointer-events: none;
          transition: color 0.3s ease;
          z-index: 0;
        }
        .me-step-card:hover .me-step-watermark {
          color: rgba(200, 16, 46, 0.06);
        }

        .me-step-icon-box {
          position: relative;
          z-index: 10;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(200, 16, 46, 0.05);
          border: 2px solid rgba(200, 16, 46, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #C8102E;
          margin-bottom: 16px;
          transition: all 0.3s ease;
        }
        .me-step-card:hover .me-step-icon-box {
          background: #C8102E;
          border-color: #C8102E;
          color: #ffffff;
        }

        .me-step-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c4a428;
          margin-bottom: 6px;
          position: relative;
          z-index: 10;
        }

        .me-step-title {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 700;
          color: #1a1612;
          margin: 0 0 12px;
          line-height: 1.2;
          letter-spacing: -0.01em;
          transition: color 0.3s ease;
          position: relative;
          z-index: 10;
        }
        .me-step-card:hover .me-step-title {
          color: #C8102E;
        }

        .me-step-divider {
          width: 32px;
          height: 2px;
          background: #e5e7eb;
          transition: all 0.5s ease;
          margin-bottom: 16px;
          position: relative;
          z-index: 10;
        }
        .me-step-card:hover .me-step-divider {
          width: 56px;
          background: #c4a428;
        }

        .me-step-desc {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 400;
          color: #6a6058;
          line-height: 1.7;
          margin: 0;
          position: relative;
          z-index: 10;
        }

        .me-step-triangle {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 0;
          border-left: 36px solid transparent;
          border-bottom: 36px solid rgba(200, 16, 46, 0.08);
          transition: border-bottom-color 0.3s ease;
          z-index: 1;
        }
        .me-step-card:hover .me-step-triangle {
          border-bottom-color: rgba(196, 164, 40, 0.2);
        }

        .me-trust-card {
          background: #ffffff;
          border-radius: 14px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.05);
          border: 1px solid rgba(255,255,255,0.9);
          transition: transform 0.2s ease;
        }

        .me-trust-card:hover {
          transform: translateY(-2px);
        }

        .me-learn-more {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #1a1612;
          text-decoration: none;
          margin-top: 20px;
          border-bottom: 1px solid rgba(26,22,18,0.25);
          padding-bottom: 2px;
          transition: color 0.2s, border-color 0.2s;
        }

        .me-learn-more:hover {
          color: #c4a428;
          border-color: #c4a428;
        }

        .me-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, #d4af37 0%, #b8960c 100%);
          border: none;
          border-radius: 999px;
          padding: 14px 32px;
          cursor: pointer;
          box-shadow: 0 6px 22px rgba(196,164,40,0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #fff;
          text-decoration: none;
        }

        .me-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(196,164,40,0.45);
        }

        @media (max-width: 900px) {
          .me-steps-grid { grid-template-columns: 1fr !important; }
          .me-trust-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 540px) {
          .me-trust-grid { grid-template-columns: 1fr !important; }
        }
      `}} />

      <div className="me-container">

        {/* ── HEADER ── */}
        <ScrollAnimate delay={0}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 44,
                  height: 1,
                  background: "linear-gradient(90deg, transparent, #c4a428)",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.42em",
                  textTransform: "uppercase",
                  color: "#c4a428",
                }}
              >
                The Journey
              </span>
              <span
                style={{
                  display: "block",
                  width: 44,
                  height: 1,
                  background: "linear-gradient(90deg, #c4a428, transparent)",
                }}
              />
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(36px, 5vw, 68px)",
                fontWeight: 700,
                color: "#1a1612",
                lineHeight: 1.1,
                margin: "0 0 18px",
                letterSpacing: "-0.01em",
              }}
            >
              How to Become a{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#c4a428",
                }}
              >
                Member
              </em>
            </h2>

            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 18,
                fontWeight: 300,
                color: "#7a6e5f",
                margin: 0,
                letterSpacing: "0.02em",
              }}
            >
              Three refined steps. A lifetime of curated escapes, crafted for you.
            </p>
          </div>
        </ScrollAnimate>

        {/* ── STEP CARDS ── */}
        <div className="me-steps-grid">
          {steps.map((step, i) => (
            <ScrollAnimate key={i} delay={100 + i * 80} className="me-step-wrapper">
              <div className="me-step-card">
                {/* Top colour bar */}
                <div className="me-step-top-bar" />

                {/* Watermark number */}
                <div className="me-step-watermark">
                  {step.num}
                </div>

                <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }}>
                  {/* Circle badge */}
                  <div className="me-step-icon-box">
                    {step.num}
                  </div>

                  {/* Step label */}
                  <div className="me-step-label">
                    Step {step.num}
                  </div>

                  {/* Title */}
                  <h3 className="me-step-title">
                    {step.title}
                  </h3>

                  {/* Animated divider */}
                  <div className="me-step-divider"></div>

                  {/* Description */}
                  <p className="me-step-desc">
                    {step.desc}
                  </p>
                </div>

                {/* Triangle Accent */}
                <div className="me-step-triangle"></div>
              </div>
            </ScrollAnimate>
          ))}
        </div>

        {/* ── CTA BUTTON ── */}
        <ScrollAnimate delay={380}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <Link href="/membership" className="me-cta-btn">
              View Membership Plans
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </ScrollAnimate>

        {/* ── TRUST BADGES ── */}
        <ScrollAnimate delay={460}>
          <div className="me-trust-grid">
            {trustBadges.map((badge, i) => (
              <div key={i} className="me-trust-card">
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(196,164,40,0.10)",
                    border: "1px solid rgba(196,164,40,0.20)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#c4a428",
                    flexShrink: 0,
                  }}
                >
                  {badge.icon}
                </div>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#1a1612",
                    lineHeight: 1.3,
                  }}
                >
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollAnimate>

      </div>
    </section>
  );
}