"use client";

import React from "react";
import { Star, Sparkles, Crown, Gem, ArrowRight } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

const TIER_CONFIG = [
  {
    color: "#3b82f6",
    colorBg: "rgba(59,130,246,0.08)",
    Icon: Star,
  },
  {
    color: "#f59e0b",
    colorBg: "rgba(245,158,11,0.1)",
    Icon: Sparkles,
  },
  {
    color: "#10b981",
    colorBg: "rgba(16,185,129,0.08)",
    Icon: Crown,
  },
  {
    color: "#a78bfa",
    colorBg: "rgba(167,139,250,0.1)",
    Icon: Gem,
  },
];

export default function Tiers({
  membershipTiers,
  onPurchaseTier,
  processingTierId = "",
}) {
  return (
    <section
      id="tiers"
      className="relative overflow-hidden"
      style={{ background: "#0c0f1a", padding: "72px 0" }}
    >
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: "-80px", right: "-80px",
          width: "420px", height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          bottom: "-80px", left: "-80px",
          width: "360px", height: "360px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="site-width mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center mb-12">
          <ScrollAnimate animation="fade-up">
            <div
              className="inline-flex items-center gap-2 mb-5"
              style={{
                background: "rgba(251,191,36,0.08)",
                border: "0.5px solid rgba(251,191,36,0.22)",
                borderRadius: "20px",
                padding: "4px 16px",
              }}
            >
              <span
                style={{
                  fontSize: "10px", fontWeight: 700,
                  color: "#fbbf24", letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Direct Purchase
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 700,
                color: "#f8fafc",
                margin: "0 0 10px",
                lineHeight: 1.1,
              }}
            >
              Choose Your{" "}
              <em style={{ color: "#f59e0b", fontStyle: "italic", fontWeight: 400 }}>
                Tier.
              </em>
            </h2>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px", color: "#64748b",
                maxWidth: "460px", margin: "0 auto",
                lineHeight: 1.75,
              }}
            >
              Select the membership that fits your lifestyle. Enjoy immediate
              access to our portfolio of luxury resorts across India.
            </p>
          </ScrollAnimate>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {membershipTiers.map((tier, idx) => {
            const cfg = TIER_CONFIG[idx % TIER_CONFIG.length];
            const { Icon } = cfg;
            const isProcessing = processingTierId === tier.id;

            return (
              <ScrollAnimate
                key={tier.id || idx}
                animation="fade-up"
                delay={idx * 80}
                className="h-full"
              >
                <div
                  className="relative flex flex-col h-full group"
                  style={{
                    background: "#131929",
                    border: "0.5px solid rgba(255,255,255,0.06)",
                    borderRadius: 0,
                    transition: "border-color 0.25s",
                  }}
                  onMouseEnter={e =>
                    (e.currentTarget.style.borderColor = "rgba(255,255,255,0.13)")
                  }
                  onMouseLeave={e =>
                    (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")
                  }
                >
                  {/* Top accent bar */}
                  <div
                    style={{ height: "3px", width: "100%", background: cfg.color }}
                  />

                  {/* Popular badge */}
                  {tier.popular && (
                    <div
                      style={{
                        position: "absolute", top: "16px", right: "14px",
                        background: "#f59e0b", color: "#0c0f1a",
                        fontSize: "9px", fontWeight: 700,
                        textTransform: "uppercase", letterSpacing: "0.1em",
                        padding: "3px 10px", borderRadius: "20px",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Popular
                    </div>
                  )}

                  {/* ── Card Body ── */}
                  <div
                    className="flex flex-col flex-1"
                    style={{ padding: "20px 18px 18px" }}
                  >

                    {/* Icon box */}
                    <div
                      className="flex items-center justify-center flex-shrink-0 mb-4"
                      style={{
                        width: "40px", height: "40px",
                        background: cfg.colorBg,
                      }}
                    >
                      <Icon size={18} color={cfg.color} />
                    </div>

                    {/* Tier name */}
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "11px", fontWeight: 700,
                        color: "#f1f5f9",
                        textTransform: "uppercase",
                        letterSpacing: "0.16em",
                        margin: "0 0 5px",
                      }}
                    >
                      {tier.name}
                    </p>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "11px", color: "#475569",
                        lineHeight: 1.65,
                        margin: "0 0 16px",
                        minHeight: "36px",
                      }}
                    >
                      {tier.description}
                    </p>

                    {/* ── Price block — Inter for ₹ symbol ── */}
                    <div
                      style={{
                        marginBottom: "16px",
                        paddingBottom: "16px",
                        borderBottom: "0.5px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {/* Price: Inter so ₹ renders cleanly */}
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "22px", fontWeight: 700,
                          color: cfg.color,
                          lineHeight: 1,
                          margin: "0 0 5px",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {tier.price}
                      </p>

                      {/* Admin fee row */}
                      <div
                        className="flex items-center gap-1.5"
                        style={{ marginTop: "4px" }}
                      >
                        <div
                          style={{
                            width: "3px", height: "3px",
                            borderRadius: "50%",
                            background: "#475569",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "10px", color: "#475569",
                            letterSpacing: "0.04em",
                          }}
                        >
                          Admin Fee: {tier.adminFee || "₹5,789"}
                        </span>
                      </div>
                    </div>

                    {/* ── Features list ── */}
                    <ul
                      className="flex-1"
                      style={{
                        listStyle: "none", padding: 0,
                        margin: "0 0 20px",
                        display: "flex", flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      {tier.features.map((feature, i) => (
                        <li
                          key={i}
                          style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}
                        >
                          <div
                            style={{
                              width: "4px", height: "4px",
                              borderRadius: "50%",
                              background: cfg.color,
                              marginTop: "6px", flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "11px", color: "#94a3b8",
                              lineHeight: 1.55,
                            }}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* ── CTA Button ── */}
                    <button
                      type="button"
                      onClick={() => onPurchaseTier?.(tier)}
                      disabled={isProcessing}
                      className="flex items-center justify-center gap-2 w-full disabled:opacity-50"
                      style={{
                        padding: "11px 16px",
                        background: tier.popular
                          ? "#f59e0b"
                          : "rgba(255,255,255,0.05)",
                        color: tier.popular ? "#0c0f1a" : "#e2e8f0",
                        border: tier.popular
                          ? "none"
                          : "0.5px solid rgba(255,255,255,0.09)",
                        borderRadius: 0,
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "10px", fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        cursor: isProcessing ? "not-allowed" : "pointer",
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={e => {
                        if (!isProcessing) e.currentTarget.style.opacity = "0.82";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.opacity = "1";
                      }}
                    >
                      {isProcessing ? "Processing..." : "Select Tier"}
                      {!isProcessing && <ArrowRight size={12} />}
                    </button>

                  </div>
                </div>
              </ScrollAnimate>
            );
          })}
        </div>
      </div>
    </section>
  );
}