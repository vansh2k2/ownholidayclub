"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function Origin() {
  return (
    <section
      className="py-20 relative z-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #fdf8f0 0%, #fef9f2 45%, #eff6ff 100%)",
      }}
    >
      {/* Soft ambient blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-24 w-[420px] h-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(253,230,138,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-20 w-[340px] h-[340px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(191,219,254,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="site-width mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Left: Text */}
          <div className="order-2 lg:order-1">
            <ScrollAnimate animation="reveal-left">

              <div className="flex items-center gap-3 mb-5">
                <div
                  className="flex-shrink-0"
                  style={{ width: "24px", height: "2px", background: "#b45309", borderRadius: "2px" }}
                />
                <span
                  style={{ fontSize: "11px", fontFamily: "'Inter', sans-serif", color: "#b45309", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em" }}
                >
                  The Origin
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(34px, 4.5vw, 52px)",
                  fontWeight: 700,
                  lineHeight: 1.08,
                  color: "#0f172a",
                  margin: "0 0 6px",
                }}
              >
                Redefining
                <br />
                <em style={{ fontStyle: "italic", fontWeight: 400, color: "#b45309" }}>
                  Hospitality.
                </em>
              </h2>

              <p style={{ fontSize: "12px", fontFamily: "'Inter', sans-serif", color: "#94a3b8", letterSpacing: "0.06em", margin: "0 0 18px" }}>
                Own Holiday Club &nbsp;·&nbsp; Est. 2012
              </p>

              <div style={{ width: "36px", height: "1.5px", background: "#fde68a", borderRadius: "2px", marginBottom: "20px" }} />

              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { label: "20+ years experience", accent: true },
                  { label: "Hotels & Resorts" },
                  { label: "Pan India" },
                ].map(({ label, accent }) => (
                  <span
                    key={label}
                    style={{
                      fontSize: "11px", fontFamily: "'Inter', sans-serif", fontWeight: 500,
                      padding: "4px 12px", borderRadius: "20px",
                      background: accent ? "#fefce8" : "rgba(255,255,255,0.75)",
                      border: `0.5px solid ${accent ? "#fcd34d" : "#e5e5e2"}`,
                      color: accent ? "#92400e" : "#64625e",
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="space-y-4 mb-7" style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: 1.8, color: "#64748b" }}>
                <p>
                  A world of your <strong style={{ color: "#1e293b", fontWeight: 600 }}>OWN</strong> experiences. A taste of authenticity. A touch of comfort that feels oh! So familiar. Welcome to <strong style={{ color: "#1e293b", fontWeight: 600 }}>OWN HOLIDAY CLUB</strong> your home away from home.
                </p>
                <p>
                  <strong style={{ color: "#1e293b", fontWeight: 600 }}>Own Holiday Club</strong> is a fast growing and well known company in hospitality sector in India. We have 20 year of experience in promoting Hotels, Clubs, Resorts all over India.
                </p>
                <p>
                  <strong style={{ color: "#1e293b", fontWeight: 600 }}>Own Holiday Club</strong> started in 2012, originally known as <strong style={{ color: "#1e293b", fontWeight: 600 }}>Rigel Hospitality Services Pvt Ltd.</strong> Specialized in creating Vacation experiences, we customize events and holidays to fit your needs and taste.
                </p>
                <p>
                  With 20 years of experience, <strong style={{ color: "#1e293b", fontWeight: 600 }}>Own Holiday Club</strong> is a proven name in the holidays and Vacation industry today. While painting India as never envisioned, we were able to create our mark as a Vacation and event management expert with over 10,000 privilege members. We strive to provide only the best of imagination for our guests from all over the world. We are known for providing an excellent standard of customer service with highly experienced and a professional team of staff.
                </p>
              </div>


            </ScrollAnimate>
          </div>

          {/* Right: Image Collage */}
          <div className="order-1 lg:order-2 relative h-[420px] sm:h-[500px]">
            <ScrollAnimate animation="zoom-out" className="w-full h-full relative">

              {/* Main image — no border radius */}
              <div
                className="absolute right-0 top-0 overflow-hidden"
                style={{
                  width: "84%", height: "86%",
                  borderRadius: 0,
                  border: "3px solid white",
                  boxShadow: "0 20px 48px -12px rgba(0,0,0,0.14)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=90"
                  alt="Luxury Resort"
                  className="w-full h-full object-cover transition-transform duration-[1500ms] hover:scale-105"
                />
              </div>

              {/* Small inset image — no border radius */}
              <div
                className="absolute bottom-0 left-0 overflow-hidden"
                style={{
                  width: "48%", height: "50%",
                  borderRadius: 0,
                  border: "3px solid white",
                  boxShadow: "0 12px 28px -6px rgba(0,0,0,0.14)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
                  alt="Family Holiday"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Amber pill tag */}
              <div
                className="absolute z-20"
                style={{
                  bottom: "52%", right: 0,
                  background: "#b45309", color: "white",
                  fontSize: 10, fontFamily: "'Inter', sans-serif",
                  fontWeight: 600, padding: "5px 14px",
                  borderRadius: "20px", whiteSpace: "nowrap",
                  letterSpacing: "0.04em",
                }}
              >
                India's Trusted Travel Partner
              </div>

              {/* Glass badge bottom-right */}
              <div
                className="absolute z-20 flex items-center gap-3"
                style={{
                  bottom: 10, right: 0,
                  background: "rgba(255,255,255,0.92)",
                  border: "0.5px solid #e2e8f0",
                  borderRadius: 10,
                  padding: "10px 14px",
                }}
              >
                <div
                  style={{ width: 30, height: 30, background: "#fef3c7", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                >
                  <ShieldCheck size={15} color="#b45309" />
                </div>
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: "#0f172a", lineHeight: 1, marginBottom: 3 }}>Trusted Since 2012</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "#b45309" }}>Verified Members</p>
                </div>
              </div>

            </ScrollAnimate>
          </div>

        </div>
      </div>
    </section>
  );
}