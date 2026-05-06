"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Star,
  Users,
  MapPin,
  Clock,
  BadgeCheck,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────
   Rising Bubble Canvas (unchanged — you liked it)
───────────────────────────────────────── */
const BubbleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    let bubbles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const makeBubble = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      r: 2 + Math.random() * 14,
      speed: 0.3 + Math.random() * 0.6,
      drift: (Math.random() - 0.5) * 0.5,
      alpha: 0.06 + Math.random() * 0.2,
      pulse: Math.random() * Math.PI * 2,
    });

    const init = () => {
      resize();
      bubbles = Array.from({ length: 50 }, makeBubble);
      bubbles.forEach((b) => { b.y = Math.random() * canvas.height; });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubbles.forEach((b) => {
        b.pulse += 0.02;
        const r = b.r * (1 + Math.sin(b.pulse) * 0.03);
        const a = b.alpha * (0.85 + Math.sin(b.pulse) * 0.15);
        const grad = ctx.createRadialGradient(
          b.x - r * 0.3, b.y - r * 0.3, r * 0.05,
          b.x, b.y, r
        );
        grad.addColorStop(0, `rgba(255,255,255,${a * 0.6})`);
        grad.addColorStop(0.5, `rgba(255,255,255,${a * 0.25})`);
        grad.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.beginPath(); ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();
        ctx.beginPath(); ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${a * 1.4})`;
        ctx.lineWidth = 0.8; ctx.stroke();
        ctx.beginPath();
        ctx.arc(b.x - r * 0.28, b.y - r * 0.28, r * 0.18, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a * 1.8})`; ctx.fill();
        b.y -= b.speed; b.x += b.drift;
        if (b.y + r < 0)
          Object.assign(b, { ...makeBubble(), x: Math.random() * canvas.width });
      });
      animId = requestAnimationFrame(draw);
    };

    init(); draw();
    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

/* ─────────────────────────────────────────
   Scroll-in animation wrapper
───────────────────────────────────────── */
const ScrollAnimate = ({
  children,
  delay = 0,
  className = "",
}) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

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

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ─────────────────────────────────────────
   Animated Number Counter
───────────────────────────────────────── */
const NumberCounter = ({ value, color }) => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  // Extract number and suffix from string (e.g., "100+" -> { num: 100, suffix: "+" })
  const match = typeof value === 'string' ? value.match(/^(\d+)(.*)$/) : null;
  const targetNum = match ? parseInt(match[1]) : null;
  const suffix = match ? match[2] : value;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || targetNum === null) {
      if (targetNum === null) setCount(value);
      return;
    }

    let start = 0;
    const duration = 4000; // 4 seconds
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: easeOutExpo
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentCount = Math.floor(easedProgress * targetNum);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [visible, targetNum, value]);

  return (
    <div
      ref={ref}
      style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: 28,
        fontWeight: 400,
        color: color,
        lineHeight: 1,
        marginBottom: 6,
      }}
    >
      {targetNum !== null ? count : ""}{suffix}
    </div>
  );
};

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const stats = [
  {
    value: "100+",
    label: "Destinations",
    icon: MapPin,
    bg: "rgba(245,158,11,0.10)",
    border: "rgba(245,158,11,0.25)",
    color: "#f59e0b",
  },
  {
    value: "10K+",
    label: "Happy Members",
    icon: Users,
    bg: "rgba(56,189,248,0.10)",
    border: "rgba(56,189,248,0.25)",
    color: "#38bdf8",
  },
  {
    value: "35yr",
    label: "Max Validity",
    icon: Clock,
    bg: "rgba(167,139,250,0.10)",
    border: "rgba(167,139,250,0.25)",
    color: "#a78bfa",
  },
  {
    value: "Zero",
    label: "Hidden Fees",
    icon: BadgeCheck,
    bg: "rgba(52,211,153,0.10)",
    border: "rgba(52,211,153,0.25)",
    color: "#34d399",
  },
];

const steps = [
  {
    num: "01",
    title: "Choose a Plan",
    desc: "Select the membership tier that fits your family size and travel frequency — from 5 to 35 years.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.22)",
  },
  {
    num: "02",
    title: "Get Activated",
    desc: "Complete your profile and receive your exclusive member ID instantly. Zero waiting period.",
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.08)",
    border: "rgba(56,189,248,0.22)",
  },
  {
    num: "03",
    title: "Start Travelling",
    desc: "Book from 100+ destinations at locked-in member prices, year after year, with no price hike.",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.22)",
  },
];

const trustBadges = [
  {
    icon: ShieldCheck,
    iconColor: "#0f172a",
    iconBg: "linear-gradient(135deg,#f59e0b,#d97706)",
    iconShadow: "0 4px 14px rgba(245,158,11,0.30)",
    title: "Verified Membership",
    sub: "100% Transparent Pricing",
  },
  {
    icon: Star,
    iconColor: "#fbbf24",
    iconBg: "rgba(245,158,11,0.12)",
    iconShadow: "none",
    filled: true,
    title: "4.9 / 5 Rating",
    sub: "10,000+ Happy Members",
  },
  {
    icon: CheckCircle,
    iconColor: "#34d399",
    iconBg: "rgba(52,211,153,0.12)",
    iconShadow: "none",
    title: "No Hidden Charges",
    sub: "Pay once, travel forever",
  },
];

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function MembershipExplainer() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #060b18 0%, #0c1425 45%, #0f1a2e 100%)",
        padding: "88px 0 80px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Background layers ── */}
      <BubbleCanvas />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,rgba(255,255,255,0.018) 0px,rgba(255,255,255,0.018) 1px,transparent 1px,transparent 72px)," +
            "repeating-linear-gradient(90deg,rgba(255,255,255,0.018) 0px,rgba(255,255,255,0.018) 1px,transparent 1px,transparent 72px)",
          zIndex: 0,
        }}
      />

      {/* Ambient glows */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: -160, left: -100,
          width: 560, height: 560,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(245,158,11,0.09) 0%,transparent 68%)",
          zIndex: 0,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: -120, right: -100,
          width: 460, height: 460,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(56,189,248,0.07) 0%,transparent 68%)",
          zIndex: 0,
        }}
      />

      {/* ── Content ── */}
      <div
        className="relative mx-auto px-5 w-full"
        style={{ maxWidth: 1020, zIndex: 2 }}
      >

        {/* ── HEADER ── */}
        <ScrollAnimate delay={0}>
          <div className="text-center" style={{ marginBottom: 52 }}>
            {/* Pill badge */}
            <div
              className="inline-flex items-center gap-2 mb-5"
              style={{
                background: "rgba(245,158,11,0.07)",
                border: "1px solid rgba(245,158,11,0.30)",
                borderRadius: 999,
                padding: "5px 16px",
              }}
            >
              <Sparkles size={10} style={{ color: "#fbbf24" }} />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "#fbbf24",
                }}
              >
                Own Holiday Club
              </span>
            </div>

            {/* Headline */}
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(32px, 4.5vw, 50px)",
                fontWeight: 400,
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: 16,
                letterSpacing: "-0.01em",
              }}
            >
              How to Become a{" "}
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  color: "#f59e0b",
                  fontStyle: "italic",
                }}
              >
                Member.
                <span
                  style={{
                    position: "absolute",
                    bottom: -3,
                    left: 0,
                    right: "15%",
                    height: "1.5px",
                    background:
                      "linear-gradient(90deg,#f59e0b 0%,transparent 100%)",
                    borderRadius: 2,
                  }}
                />
              </span>
            </h2>

            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.42)",
                maxWidth: 430,
                margin: "0 auto",
                lineHeight: 1.85,
              }}
            >
              Stop paying retail prices. One membership unlocks luxury travel
              for your entire family —{" "}
              <span style={{ color: "rgba(255,255,255,0.72)", fontWeight: 600 }}>
                forever.
              </span>
            </p>
          </div>
        </ScrollAnimate>

        {/* ── STAT CARDS ── */}
        <ScrollAnimate delay={80}>
          <div className="stat-grid" style={{ marginBottom: 40 }}>
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="stat-card-item"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 18,
                    padding: "26px 16px 22px",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    backdropFilter: "blur(10px)",
                    transition: "border-color 0.2s, transform 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      s.border;
                    e.currentTarget.style.transform =
                      "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.07)";
                    e.currentTarget.style.transform =
                      "translateY(0)";
                  }}
                >
                  {/* top accent */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0, left: "25%", right: "25%",
                      height: "2px",
                      background: s.color,
                      borderRadius: "0 0 3px 3px",
                      opacity: 0.8,
                    }}
                  />

                  {/* icon */}
                  <div
                    style={{
                      width: 44, height: 44,
                      borderRadius: 12,
                      background: s.bg,
                      border: `1px solid ${s.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 14px",
                    }}
                  >
                    <Icon size={18} style={{ color: s.color }} />
                  </div>

                  <NumberCounter value={s.value} color={s.color} />
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.35)",
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      fontWeight: 700,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollAnimate>

        {/* ── STEP CARDS ── */}
        <div className="steps-grid" style={{ marginBottom: 36 }}>
          {steps.map((step, i) => (
            <ScrollAnimate key={i} delay={160 + i * 70}>
              <div
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 20,
                  padding: "32px 26px 28px",
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                  backdropFilter: "blur(10px)",
                  transition: "border-color 0.2s, transform 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    `${step.color}44`;
                  e.currentTarget.style.transform =
                    "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.07)";
                  e.currentTarget.style.transform =
                    "translateY(0)";
                }}
              >
                {/* Top colored line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, ${step.color} 0%, transparent 80%)`,
                  }}
                />

                {/* Watermark number */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -16, right: 14,
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: 88,
                    fontWeight: 400,
                    color: step.color,
                    opacity: 0.06,
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {step.num}
                </div>

                {/* Step label */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    background: step.bg,
                    border: `1px solid ${step.border}`,
                    borderRadius: 999,
                    padding: "4px 13px",
                    marginBottom: 22,
                  }}
                >
                  <span
                    style={{
                      fontSize: 9.5,
                      fontWeight: 800,
                      color: step.color,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Step {step.num}
                  </span>
                </div>

                {/* Circle number */}
                <div
                  style={{
                    width: 42, height: 42,
                    borderRadius: "50%",
                    background: step.bg,
                    border: `1.5px solid ${step.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: 18,
                    color: step.color,
                    marginBottom: 18,
                  }}
                >
                  {parseInt(step.num)}
                </div>

                <h3
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: 10,
                    letterSpacing: "0.01em",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "rgba(255,255,255,0.40)",
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>

                {/* Arrow connector */}
                {i < 2 && (
                  <div
                    className="arrow-connector"
                    style={{
                      position: "absolute",
                      right: -18, top: "42%",
                      transform: "translateY(-50%)",
                      zIndex: 5,
                      width: 34, height: 34,
                      borderRadius: "50%",
                      background: "#0c1425",
                      border: "1px solid rgba(255,255,255,0.10)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ArrowRight size={13} style={{ color: step.color }} />
                  </div>
                )}
              </div>
            </ScrollAnimate>
          ))}
        </div>

        {/* ── TRUST + CTA BAR ── */}
        <ScrollAnimate delay={420}>
          <div
            className="cta-bar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: "24px 28px",
              backdropFilter: "blur(14px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Ambient left glow inside bar */}
            <div
              style={{
                position: "absolute",
                left: -50, top: -50,
                width: 200, height: 200,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle,rgba(245,158,11,0.07) 0%,transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Trust badges */}
            <div
              className="trust-badges"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 22,
                flexWrap: "wrap",
              }}
            >
              {trustBadges.map((b, i) => {
                const Icon = b.icon;
                return (
                  <React.Fragment key={i}>
                    {i > 0 && (
                      <div
                        className="trust-divider"
                        style={{
                          width: 1, height: 40,
                          background: "rgba(255,255,255,0.08)",
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          width: 44, height: 44,
                          borderRadius: 13,
                          background: b.iconBg,
                          boxShadow: b.iconShadow,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon
                          size={18}
                          style={{ color: b.iconColor }}
                          {...(b.filled ? { fill: b.iconColor } : {})}
                          strokeWidth={2}
                        />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#ffffff",
                            letterSpacing: "0.01em",
                            marginBottom: 2,
                          }}
                        >
                          {b.title}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "rgba(255,255,255,0.35)",
                          }}
                        >
                          {b.sub}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            {/* CTA Button */}
            <Link href="/membership" style={{ flexShrink: 0 }}>
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0,
                  background:
                    "linear-gradient(135deg,#f59e0b 0%,#d97706 100%)",
                  border: "none",
                  borderRadius: 999,
                  padding: "9px 9px 9px 22px",
                  cursor: "pointer",
                  boxShadow:
                    "0 6px 22px rgba(245,158,11,0.28), 0 2px 6px rgba(0,0,0,0.22)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "scale(1.035)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 28px rgba(245,158,11,0.38), 0 2px 8px rgba(0,0,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 22px rgba(245,158,11,0.28), 0 2px 6px rgba(0,0,0,0.22)";
                }}
              >
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 800,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#0f172a",
                    marginRight: 14,
                  }}
                >
                  View Membership Plans
                </span>
                <div
                  style={{
                    width: 32, height: 32,
                    borderRadius: "50%",
                    background: "#0f172a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ArrowRight
                    size={14}
                    style={{ color: "#f59e0b" }}
                    strokeWidth={2.5}
                  />
                </div>
              </button>
            </Link>
          </div>
        </ScrollAnimate>
      </div>

      {/* ── Responsive styles ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');

        .stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .arrow-connector {
          display: flex;
        }

        @media (max-width: 900px) {
          .stat-grid  { grid-template-columns: repeat(2, 1fr) !important; }
          .cta-bar    { flex-wrap: wrap; justify-content: center; text-align: center; }
          .trust-badges { justify-content: center; }
          .arrow-connector { display: none !important; }
        }
        @media (max-width: 640px) {
          .steps-grid { grid-template-columns: 1fr !important; }
          .stat-grid  { grid-template-columns: repeat(2, 1fr) !important; }
          .trust-divider { display: none !important; }
        }
      ` }} />
    </section>
  );
}