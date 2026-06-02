"use client";

import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, ShieldCheck, Star, Globe, Clock, Heart } from "lucide-react";

const ScrollAnimate = ({ children, animation, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const currentRef = domRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  const baseStyle = animation === "fade-up" ? "opacity-0 translate-y-8" : "opacity-0";
  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : baseStyle} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ── Same SplitBackground as Service/FAQ ── */
const SplitBackground = () => (
  <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 1000 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1000" height="600" fill="#ffffff" />
      <polygon points="0,0 460,0 0,340" fill="#fffdf7" />
      <polygon points="1000,600 1000,120 180,600" fill="#fffbeb" />
      <polygon points="1000,600 1000,300 540,600" fill="#fef3c7" opacity="0.6" />
      <polygon points="300,0 355,0 0,510 0,455" fill="#fde68a" opacity="0.22" />
      <polygon points="550,0 605,0 195,600 140,600" fill="#fde68a" opacity="0.16" />
    </svg>
    <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(245,158,11,0.09) 1.2px, transparent 1.2px)", backgroundSize: "30px 30px" }} />
  </div>
);

const membershipPoints = [
  "Programs starting from 5 years up to 35 years",
  "Member + Spouse + 2 kids (below 10 years) included",
  "Domestic and international destinations accessible",
  "Pay once, enjoy stress-free holidays with no price hike",
];

const infoCards = [
  {
    icon: Star,
    title: "What We Offer",
    text: "From holiday vacays to weddings, small parties to big corporate meetings — Own Holiday Club is just a call away.",
  },
  {
    icon: Heart,
    title: "Why This Membership",
    text: "Extra happiness, fun and adventure. A break from your daily hustle with impeccable, exquisite membership offers.",
  },
  {
    icon: Globe,
    title: "Accessibility",
    text: "Domestic or International — these memberships are accessible to every one of your favorite destinations worldwide.",
  },
  {
    icon: Clock,
    title: "Our Promise",
    text: "We take you to the best resorts and execute the best events, creating memories you will always cherish.",
  },
];

export default function Benefits() {
  const [settings, setSettings] = useState({
    membershipQuoteTitle: "Signature Thought",
    membershipQuoteMain: "Babumoshai zindagi badi honi chahiye, lambi nahi...",
    membershipQuoteDescription: "Surely yes, and to make your life king-size, Own Holiday Club is right here. The less stress, the more life — this is exactly what we believe in."
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081"}/api/settings`)
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data) {
          setSettings({
            membershipQuoteTitle: result.data.membershipQuoteTitle !== undefined ? result.data.membershipQuoteTitle : "Signature Thought",
            membershipQuoteMain: result.data.membershipQuoteMain !== undefined ? result.data.membershipQuoteMain : "Babumoshai zindagi badi honi chahiye, lambi nahi...",
            membershipQuoteDescription: result.data.membershipQuoteDescription !== undefined ? result.data.membershipQuoteDescription : "Surely yes, and to make your life king-size, Own Holiday Club is right here. The less stress, the more life — this is exactly what we believe in."
          });
        }
      })
      .catch(err => console.error("Settings fetch error:", err));
  }, []);

  return (
    <section className="relative py-20 overflow-hidden" style={{ background: "#ffffff" }}>
      <SplitBackground />

      <style>{`
        .benefit-card {
          transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
        }
        .benefit-card:hover {
          border-color: #f59e0b !important;
          box-shadow: 0 8px 28px rgba(245,158,11,0.13);
          transform: translateY(-2px);
        }
        .benefit-card:hover .benefit-icon-wrap {
          background: #1a1a1a !important;
          color: #f5b843 !important;
        }
      `}</style>

      <div className="site-width mx-auto px-4 md:px-8" style={{ position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <ScrollAnimate animation="fade-up">
          <div className="mb-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
              style={{ border: "1px solid #fcd34d", background: "#fffbeb" }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
              <span style={{ fontSize: 11, letterSpacing: "0.28em", color: "#b45309", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, textTransform: "uppercase" }}>
                About the Membership
              </span>
            </div>

            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, color: "#1e293b", textTransform: "uppercase", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 12 }}>
              Let's Know About{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "#f59e0b", fontFamily: "'DM Serif Display', serif" }}>the Membership</em>
            </h2>
            <div style={{ width: 44, height: 3, background: "#fcd34d", borderRadius: 2 }} />
          </div>
        </ScrollAnimate>

        {/* ── Two column layout ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}
          className="benefits-main-grid">

          {/* LEFT: 4 Info Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {infoCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <ScrollAnimate key={idx} animation="fade-up" delay={idx * 70}>
                  <div
                    className="benefit-card"
                    style={{
                      background: "#fff",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: 12,
                      padding: "18px 20px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 14,
                    }}
                  >
                    <div
                      className="benefit-icon-wrap"
                      style={{
                        width: 38, height: 38, flexShrink: 0,
                        borderRadius: 10,
                        background: "#fef3c7",
                        color: "#c9800c",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "background 0.22s, color 0.22s",
                      }}
                    >
                      <Icon size={17} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>
                        {card.title}
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: "#64748b", lineHeight: 1.65 }}>
                        {card.text}
                      </div>
                    </div>
                  </div>
                </ScrollAnimate>
              );
            })}
          </div>

          {/* RIGHT: Membership At A Glance */}
          <ScrollAnimate animation="fade-up" delay={120}>
            <div style={{
              background: "#fff",
              border: "1.5px solid #e2e8f0",
              borderRadius: 12,
              padding: "24px 24px",
              height: "100%",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Faint icon watermark */}
              <div style={{ position: "absolute", bottom: -20, right: -20, opacity: 0.05, pointerEvents: "none" }}>
                <ShieldCheck size={140} />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: "#fef3c7", color: "#c9800c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ShieldCheck size={17} />
                </div>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 800, color: "#1e293b", margin: 0, textTransform: "uppercase", letterSpacing: "0.02em" }}>
                  Membership At A Glance
                </h3>
              </div>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#64748b", lineHeight: 1.7, marginBottom: 18 }}>
                You choose the best for you and we offer the best of us. Join any program from 5 to 35 years duration and you are all set.
              </p>

              <ul style={{ display: "flex", flexDirection: "column", gap: 12, margin: 0, padding: 0, listStyle: "none" }}>
                {membershipPoints.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <CheckCircle2 size={16} style={{ color: "#f59e0b", flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1e293b", lineHeight: 1.6 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimate>
        </div>

        {/* ── Bottom Promise Banner ── */}
        <ScrollAnimate animation="fade-up" delay={200}>
          <div style={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
            borderRadius: 12,
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}>
            <div style={{ flexShrink: 0, width: 42, height: 42, borderRadius: 10, background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Heart size={18} color="#f59e0b" />
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "rgba(255,255,255,0.82)", lineHeight: 1.7, margin: 0, flex: 1 }}>
              We promise to fill your and your loved ones' special moments with amazing, venturesome memories to cherish for a lifetime.{" "}
              <span style={{ color: "#f5b843", fontWeight: 700 }}>Pay once and get ready for carefree, stress-free holidays at the best resorts for many years — with no price hike.</span>
            </p>
          </div>
        </ScrollAnimate>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .benefits-main-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}