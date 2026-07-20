"use client";

import React, { useEffect, useRef } from "react";
import { Star, Sparkles, Crown, Gem, ArrowRight, Check } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

const TIER_CONFIG = [
  {
    color: "#2563eb",
    colorBg: "rgba(37, 99, 235, 0.08)",
    borderTop: "#2563eb",
    Icon: Star,
    bubbleColor: "rgba(37, 99, 235, 0.12)",
    // Light blue card bg
    cardBg: "linear-gradient(145deg, #eff6ff 0%, #dbeafe 60%, #bfdbfe 100%)",
    cardBgSolid: "#eff6ff",
  },
  {
    color: "#b45309",
    colorBg: "rgba(180, 83, 9, 0.08)",
    borderTop: "#f59e0b",
    Icon: Sparkles,
    bubbleColor: "rgba(245, 158, 11, 0.15)",
    // Light amber card bg
    cardBg: "linear-gradient(145deg, #fffbeb 0%, #fef3c7 60%, #fde68a 100%)",
    cardBgSolid: "#fffbeb",
  },
  {
    color: "#059669",
    colorBg: "rgba(5, 150, 105, 0.08)",
    borderTop: "#10b981",
    Icon: Crown,
    bubbleColor: "rgba(16, 185, 129, 0.12)",
    // Light emerald card bg
    cardBg: "linear-gradient(145deg, #ecfdf5 0%, #d1fae5 60%, #a7f3d0 100%)",
    cardBgSolid: "#ecfdf5",
  },
  {
    color: "#7c3aed",
    colorBg: "rgba(124, 58, 237, 0.08)",
    borderTop: "#8b5cf6",
    Icon: Gem,
    bubbleColor: "rgba(139, 92, 246, 0.13)",
    // Light violet card bg
    cardBg: "linear-gradient(145deg, #f5f3ff 0%, #ede9fe 60%, #ddd6fe 100%)",
    cardBgSolid: "#f5f3ff",
  },
];

const getTierFallbackDetails = (tier, idx) => {
  const id = tier.id || "";
  const name = (tier.name || "").toLowerCase();

  if (id === "ohc-privilege" || name.includes("privilege") || idx === 0) {
    return {
      price: "₹ 1",
      actuallyPrice: "₹ 52,789",
      adminFee: "₹ 5,789",
      description: "Special 5-year introductory offer for your luxury journey.",
      features: [
        "3 Nights / 4 Days for 3 Years",
        "4 Nights / 5 Days for 2 Years",
        "Valid for 5 Years",
        "Standard Concierge",
      ],
      priceType: "offer",
      badge: "LIMITED OFFER",
    };
  }
  if (id === "ohc-memorable" || name.includes("memorable") || idx === 1) {
    return {
      price: "₹ 2,10,789",
      actuallyPrice: "",
      adminFee: "₹ 5,789",
      description: "Create memorable vacations for a full decade.",
      features: [
        "6 Nights / 7 Days for 10 Years",
        "Valid for 10 Years",
        "Special Offer 2 Year Extra",
        "Transferable to Family",
        "Access to Premium Resorts",
        "Priority Booking",
      ],
      priceType: "regular",
      badge: "",
    };
  }
  if (id === "ohc-golden" || name.includes("golden") || idx === 2) {
    return {
      price: "₹ 4,20,789",
      actuallyPrice: "",
      adminFee: "₹ 5,789",
      description: "Two decades of elevated luxury experiences.",
      features: [
        "6 Nights / 7 Days for 20 Years",
        "Valid for 20 Years",
        "Special Offer 3 Year Extra",
        "Transferable to Family",
        "All Premium Luxury Resorts",
        "Dedicated VIP Concierge",
      ],
      priceType: "regular",
      badge: "",
    };
  }
  if (id === "ohc-diamond" || name.includes("diamond") || idx === 3) {
    return {
      price: "₹ 6,30,789",
      actuallyPrice: "",
      adminFee: "₹ 5,789",
      description: "Three decades of ultimate luxury and exclusive global access.",
      features: [
        "6 Nights / 7 Days for 30 Years",
        "Valid for 30 Years",
        "Special Offer 5 Years Extra",
        "Transferable to Family",
        "All Golden Benefits Included",
        "Personalized Travel Planning",
        "Access to Elite Global Resorts",
      ],
      priceType: "regular",
      badge: "",
    };
  }
  return null;
};

export default function Tiers({
  membershipTiers,
  onPurchaseTier,
  processingTierId = "",
}) {
  const formatPrice = (val) => {
    if (!val) return "";
    const str = String(val).trim();
    if (str.startsWith("₹") || str.toLowerCase().startsWith("rs")) {
      if (str.toLowerCase().startsWith("rs")) return `₹ ${str.slice(2).trim()}`;
      return str;
    }
    const parsedNum = parseInt(str.replace(/[^\d]/g, ""), 10);
    if (!isNaN(parsedNum)) return `₹ ${new Intl.NumberFormat("en-IN").format(parsedNum)}`;
    return `₹ ${str}`;
  };

  return (
    <section
      id="tiers"
      className="relative overflow-hidden"
      style={{ background: "#ffffff", padding: "80px 0" }}
    >
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="site-width mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 1 }}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollAnimate animation="fade-up">
            <div
              className="inline-flex items-center gap-2 mb-4"
              style={{
                background: "#fef3c7",
                borderRadius: "20px",
                padding: "6px 18px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#d97706",
                  letterSpacing: "0.15em",
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
                fontSize: "clamp(32px, 4vw, 44px)",
                fontWeight: 750,
                color: "#0f172a",
                margin: "0 0 16px",
                lineHeight: 1.1,
              }}
            >
              Choose Your <span style={{ color: "#ea580c" }}>Tier</span>
            </h2>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#475569",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.7,
                fontWeight: 500,
              }}
            >
              Select the membership that best fits your lifestyle and unlock unforgettable luxury experiences across India.
            </p>
          </ScrollAnimate>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {membershipTiers.map((tier, idx) => {
            const cfg = TIER_CONFIG[idx % TIER_CONFIG.length];
            const { Icon } = cfg;
            const isProcessing = processingTierId === tier.id;

            const fallback = getTierFallbackDetails(tier, idx);
            const isDefaultDbPrice =
              tier.price === "Rs50,000" ||
              tier.price === "Rs2,00,000" ||
              tier.price === "Rs5,00,000" ||
              tier.price === "Rs10,00,000";
            const isDefaultDbFeatures =
              tier.features &&
              tier.features.length === 4 &&
              tier.features[0] === "6 Nights / 7 Days Annual Stay";

            const displayPrice = isDefaultDbPrice ? fallback.price : (tier.price || fallback.price);
            const displayActuallyPrice = isDefaultDbPrice ? fallback.actuallyPrice : (tier.actuallyPrice || fallback.actuallyPrice);
            const displayAdminFee =
              tier.adminFee && tier.adminFee !== "Rs3,789" ? tier.adminFee : fallback.adminFee;
            const displayDescription = tier.description || fallback.description;
            const displayFeatures = isDefaultDbFeatures
              ? fallback.features
              : tier.features && tier.features.length > 0
              ? tier.features
              : fallback.features;
            const displayPriceType = isDefaultDbPrice ? fallback.priceType : (tier.priceType || fallback.priceType);

            const hasOffer = displayPriceType === "offer" && displayActuallyPrice;
            const isPopular = tier.popular || idx === 1;

            return (
              <ScrollAnimate
                key={tier.id || idx}
                animation="fade-up"
                delay={idx * 80}
                className="h-full"
              >
                <div
                  className="relative flex flex-col h-full group tier-card"
                  style={{
                    background: cfg.cardBg,
                    borderRadius: "24px",
                    borderTop: `3px solid ${cfg.borderTop}`,
                    borderLeft: `1px solid ${cfg.borderTop}22`,
                    borderRight: `1px solid ${cfg.borderTop}22`,
                    borderBottom: `1px solid ${cfg.borderTop}22`,
                    boxShadow: `0 4px 24px ${cfg.bubbleColor}`,
                    transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1)",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = `0 24px 48px ${cfg.bubbleColor}, 0 0 0 1px ${cfg.color}22`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 4px 24px ${cfg.bubbleColor}`;
                  }}
                >
                  {/* Decorative circle bg element */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      bottom: "-40px",
                      right: "-40px",
                      width: "140px",
                      height: "140px",
                      borderRadius: "50%",
                      background: cfg.bubbleColor,
                      pointerEvents: "none",
                      zIndex: 0,
                    }}
                  />

                  {/* Popular badge */}
                  {isPopular && (
                    <div
                      style={{
                        position: "absolute",
                        top: "18px",
                        right: "16px",
                        background: "#fff7ed",
                        color: "#ea580c",
                        fontSize: "10px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontFamily: "'Inter', sans-serif",
                        border: "1px solid #ffedd5",
                        zIndex: 2,
                      }}
                    >
                      Popular
                    </div>
                  )}

                  {/* Card Body */}
                  <div
                    className="flex flex-col flex-1"
                    style={{ padding: "24px 20px 20px", position: "relative", zIndex: 1 }}
                  >
                    {/* Icon box */}
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        background: "rgba(255,255,255,0.7)",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "14px",
                        flexShrink: 0,
                        boxShadow: `0 2px 8px ${cfg.bubbleColor}`,
                      }}
                    >
                      <Icon size={22} color={cfg.color} strokeWidth={2.2} />
                    </div>

                    {/* Tier name */}
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "15px",
                        fontWeight: 800,
                        color: cfg.color,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        margin: "0 0 6px",
                      }}
                    >
                      {tier.name}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12.5px",
                        color: "#1e293b",
                        lineHeight: 1.55,
                        margin: "0 0 14px",
                        fontWeight: 500,
                        minHeight: "38px",
                      }}
                    >
                      {displayDescription}
                    </p>

                    {/* Price block */}
                    <div style={{ minHeight: "72px", marginBottom: "4px" }}>
                      {hasOffer ? (
                        <div>
                          {fallback?.badge && (
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                background: "rgba(255,255,255,0.6)",
                                borderRadius: "4px",
                                padding: "3px 9px",
                                marginBottom: "8px",
                                border: "1px solid rgba(22,163,74,0.2)",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: "9px",
                                  fontWeight: 700,
                                  color: "#16a34a",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.1em",
                                }}
                              >
                                {fallback.badge}
                              </span>
                            </div>
                          )}
                          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
                            <span
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "16px",
                                fontWeight: 500,
                                color: "#94a3b8",
                                textDecoration: "line-through",
                                textDecorationColor: "#ef4444",
                                textDecorationThickness: "2px",
                                alignSelf: "center",
                              }}
                            >
                              {formatPrice(displayActuallyPrice)}
                            </span>
                            <span
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "17px",
                                fontWeight: 700,
                                color: "#1e293b",
                              }}
                            >
                              Pay
                            </span>
                            <span
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "30px",
                                fontWeight: 800,
                                color: cfg.color,
                                lineHeight: 1,
                                letterSpacing: "-0.02em",
                              }}
                            >
                              {formatPrice(displayPrice)}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "28px",
                            fontWeight: 800,
                            color: cfg.color,
                            lineHeight: 1,
                            letterSpacing: "-0.02em",
                            marginBottom: "6px",
                          }}
                        >
                          {formatPrice(displayPrice)}
                        </div>
                      )}

                      {/* Admin fee */}
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "12px",
                            color: "#e11d48",
                            fontWeight: 700,
                          }}
                        >
                          + Admin Fee: {formatPrice(displayAdminFee)}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div
                      style={{
                        height: "1px",
                        background: `${cfg.color}22`,
                        margin: "10px 0",
                        width: "100%",
                      }}
                    />

                    {/* Features */}
                    <ul
                      className="flex-1"
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "0 0 22px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "7px",
                      }}
                    >
                      {displayFeatures.map((feature, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                          <div style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: "1px",
                            boxShadow: `0 1px 4px ${cfg.bubbleColor}`,
                          }}>
                            <Check
                              size={11}
                              color={cfg.color}
                              strokeWidth={3}
                            />
                          </div>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "13px",
                              color: "#1e293b",
                              lineHeight: 1.4,
                              fontWeight: 500,
                            }}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      type="button"
                      onClick={() => onPurchaseTier?.(tier)}
                      disabled={isProcessing}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        width: "100%",
                        padding: "11px 16px",
                        background: isPopular ? cfg.color : "rgba(255,255,255,0.7)",
                        color: isPopular ? "#ffffff" : cfg.color,
                        border: `1.5px solid ${cfg.color}`,
                        borderRadius: "6px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        cursor: isProcessing ? "not-allowed" : "pointer",
                        opacity: isProcessing ? 0.5 : 1,
                        transition: "all 0.25s ease",
                        boxShadow: isPopular ? `0 4px 16px ${cfg.color}40` : "none",
                        backdropFilter: "blur(4px)",
                      }}
                      onMouseEnter={(e) => {
                        if (!isProcessing) {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          if (isPopular) {
                            e.currentTarget.style.boxShadow = `0 8px 24px ${cfg.color}55`;
                          } else {
                            e.currentTarget.style.background = cfg.color;
                            e.currentTarget.style.color = "#ffffff";
                            e.currentTarget.style.boxShadow = `0 4px 16px ${cfg.color}40`;
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        if (isPopular) {
                          e.currentTarget.style.boxShadow = `0 4px 16px ${cfg.color}40`;
                          e.currentTarget.style.background = cfg.color;
                          e.currentTarget.style.color = "#ffffff";
                        } else {
                          e.currentTarget.style.background = "rgba(255,255,255,0.7)";
                          e.currentTarget.style.color = cfg.color;
                          e.currentTarget.style.boxShadow = "none";
                        }
                      }}
                    >
                      {isProcessing ? "Processing..." : "Select Plan"}
                      {!isProcessing && <ArrowRight size={13} strokeWidth={2.5} />}
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