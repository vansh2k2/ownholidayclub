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
          <div className="flex items-center gap-2 sm:gap-3 md:gap-5 shrink-0">
            <a
              href={`mailto:${email}`}
              className="ohc-tb-link hidden min-[360px]:flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-white transition-colors"
              style={{ textDecoration: "none" }}
            >
              <Mail size={11} style={{ color: "#C8102E", flexShrink: 0 }} />
              <span className="hidden sm:inline">{email}</span>
              <span className="sm:hidden">Email</span>
            </a>

            <span className="hidden min-[360px]:block w-[1px] h-[14px] bg-white/15 shrink-0" />

            <a
              href={`tel:${phone}`}
              className="ohc-tb-link flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-white transition-colors"
              style={{ textDecoration: "none" }}
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
              className="inline-block px-2 py-1 sm:px-[14px] sm:py-[5px] text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.08em] text-white bg-[#C8102E] rounded-sm whitespace-nowrap transition-colors border border-white/15"
              style={{ textDecoration: "none" }}
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
