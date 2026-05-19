"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, Plane, MapPin, Star, Crown, Home } from "lucide-react";
import { useState, useEffect } from "react";

// ─── Contact ──────────────────────────────────────────────────────────────────
const EMAIL = "info@ownholidayclub.com";
const PHONE = "+91 98765 43210";

// ─── Marquee items with Lucide icons ─────────────────────────────────────────
const MARQUEE_ITEMS = [
  { icon: Plane,  text: "Explore India's Finest Destinations" },
  { icon: Crown,  text: "Exclusive Memberships for Premium Travellers" },
  { icon: MapPin, text: "50+ Destinations Across India & Abroad" },
  { icon: Star,   text: "Luxury Stays at Members-Only Prices" },
  { icon: Home,   text: "List Your Property with Own Holiday Club" },
  { icon: Plane,  text: "Book Your Dream Holiday — Since 2012" },
];

// ─── Topbar ────────────────────────────────────────────────────────────────────
const Topbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081"}/api/settings`);
        const data = await res.json();
        if (data.success) {
          setSettings(data.data);
        }
      } catch (err) {
        console.error("Topbar settings fetch failed:", err);
      }
    };
    fetchSettings();
  }, []);

  const email = settings?.topBarEmail || EMAIL;
  const phone = settings?.topBarPhone || PHONE;
  const marqueeItems = settings?.topBarMarquee?.length > 0 
    ? settings.topBarMarquee.map(text => ({ icon: Star, text }))
    : MARQUEE_ITEMS;

  return (
    <>
      <style>{`
        @keyframes ohc-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ohc-scroll-track {
          display: flex;
          align-items: center;
          white-space: nowrap;
          animation: ohc-scroll 35s linear infinite;
        }
        .ohc-scroll-track:hover { animation-play-state: paused; }
        .ohc-tb-link:hover { color: #ffffff !important; }
      `}</style>

      {/* Topbar — in document flow, scrolls away naturally */}
      <div
        style={{
          height: "36px",
          background: "linear-gradient(90deg,#1a0500 0%,#2b0d00 55%,#1a0500 100%)",
          borderBottom: "1px solid rgba(200,16,46,0.45)",
        }}
      >
        <div
          className="mx-auto flex items-center justify-between px-4 md:px-8"
          style={{ maxWidth: "1400px", height: "36px" }}
        >
          {/* ── LEFT: Email + Phone ── */}
          <div className="flex items-center gap-3 md:gap-5 shrink-0">
            <a
              href={`mailto:${email}`}
              className="ohc-tb-link flex items-center gap-1.5"
              style={{ color: "#ffffff", fontSize: "11px", fontWeight: 600, textDecoration: "none", transition: "color 0.2s" }}
            >
              <Mail size={11} style={{ color: "#C8102E", flexShrink: 0 }} />
              <span className="hidden sm:inline">{email}</span>
              <span className="sm:hidden">Email Us</span>
            </a>

            <span style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.15)", flexShrink: 0 }} />

            <a
              href={`tel:${phone}`}
              className="ohc-tb-link flex items-center gap-1.5"
              style={{ color: "#ffffff", fontSize: "11px", fontWeight: 600, textDecoration: "none", transition: "color 0.2s" }}
            >
              <Phone size={11} style={{ color: "#C8102E", flexShrink: 0 }} />
              <span>{phone}</span>
            </a>
          </div>

          {/* ── CENTER: Marquee with Lucide icons (desktop only) ── */}
          <div
            className="hidden lg:block overflow-hidden"
            style={{ width: "560px", height: "36px" }}
          >
            <div style={{ display: "flex", alignItems: "center", height: "100%", overflow: "hidden" }}>
              <div className="ohc-scroll-track">
                {/* Render twice for seamless loop */}
                {[...marqueeItems, ...marqueeItems].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <span
                      key={i}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        marginRight: "16px",
                        color: "#ffffff",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={11} style={{ color: "#C8102E", flexShrink: 0 }} />
                      {item.text}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── RIGHT: CTA Button ── */}
          <div className="shrink-0">
            <Link
              href="/membership"
              style={{
                display: "inline-block",
                padding: "5px 14px",
                fontSize: "10px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#fff",
                background: "#C8102E",
                borderRadius: "2px",
                border: "1px solid rgba(255,255,255,0.15)",
                transition: "background 0.2s",
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
            >
              Get Membership
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
