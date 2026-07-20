"use client";
import React, { useState } from "react";
import { SOCIAL_LINKS } from "@/components/BrandSocialIcons";
import {
  MapPinned,
  Phone,
  ArrowRight,
  Globe,
  Award,
  ShieldCheck,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL ||
    "http://localhost:8081";

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setNewsletterState("error");
      setNewsletterMessage("Please enter your email address.");
      return;
    }
    setNewsletterState("submitting");
    setNewsletterMessage("");
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/newsletter-subscriptions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmedEmail, source: "footer" }),
        }
      );
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.message || "Unable to subscribe right now.");
      setNewsletterState("success");
      setNewsletterMessage(data?.message || "Thanks for subscribing to Own Holiday Club.");
      setEmail("");
    } catch (error) {
      setNewsletterState("error");
      setNewsletterMessage(error.message || "Unable to subscribe right now.");
    }
  };

  const handleNewsletterChange = (event) => {
    setEmail(event.target.value);
    if (newsletterState !== "idle") {
      setNewsletterState("idle");
      setNewsletterMessage("");
    }
  };

  const [settings, setSettings] = useState({
    logo: "/logo.png",
    footerDescription: "Since 2012, crafting unparalleled luxury experiences — from exclusive memberships to bespoke global retreats.",
    companyLinksTitle: "Company",
    experienceLinksTitle: "Experiences",
    companyLinks: [
      { label: "Our Story", path: "/about" },
      { label: "Membership", path: "/membership" },
      { label: "Partner With Us", path: "/list-your-property" },
      { label: "Blog", path: "/blog" },
      { label: "Contact Us", path: "/contactus" },
    ],
    experienceLinks: [
      { label: "Luxury Resorts", path: "/services/luxury-resorts" },
      { label: "Domestic Escapes", path: "/destinations" },
      { label: "International Holidays", path: "/destinations" },
      { label: "Destination Weddings", path: "/services/weddings" },
      { label: "Corporate Retreats", path: "/services/corporate-events" },
    ],
    officeAddress: "MR-01, Plot A 26, Block B, Mohan Cooperative Industry Estate, New Delhi - 110044",
    contactPhone: "+91-9871984074",
    contactEmail: "membership@ownholidayclub.com",
    workingHours: "Mon – Sat: 9:30 AM – 6:30 PM",
    globalPresence: "New Delhi · Dubai · London",
    footerBgImage: "/footerimage.jpg",
    footerContact: [
      { label: "New Delhi Office", content: "MR-01, Plot A 26, Block B, Mohan Cooperative Industry Estate, New Delhi - 110044" },
      { label: "24/7 Concierge", content: "+91-9871984074" }
    ]
  });

  const [socialMedia, setSocialMedia] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
  });

  React.useEffect(() => {
    // Fetch Settings
    fetch(`${API_BASE_URL}/api/settings`)
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data) {
          setSettings(result.data);
        }
      })
      .catch(err => console.error("Settings fetch error:", err));

    // Fetch Social Media
    fetch(`${API_BASE_URL}/api/social-media`)
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data) {
          setSocialMedia(result.data);
        }
      })
      .catch(err => console.error("Social media fetch error:", err));
  }, [API_BASE_URL]);

  const LEGAL_LINKS = [
    { text: "Privacy", link: "/privacy-policy" },
    { text: "Terms", link: "/terms&conditions" },
    { text: "Refunds", link: "/refund-policy" },
    { text: "Sitemap", link: "/sitemap" },
    { text: "Cookies", link: "/cookie-policy" },
  ];

  return (
    <footer
      style={{
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
        color: "#fff",
      }}
    >
      {/* Background Image with Parallax Effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${settings.footerBgImage || "/footerimage.jpg"}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          zIndex: 0,
        }}
      />
      {/* Dark Overlay for readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(10, 15, 25, 0.82)",
          zIndex: 1,
        }}
      />

      {/* Subtle top border accent */}
      <div style={{
        position: "relative",
        zIndex: 2,
        height: 2,
        background: "linear-gradient(90deg, transparent, #f59e0b55, #f59e0b, #f59e0b55, transparent)",
      }} />

      {/* Faint geometric bg pattern */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          backgroundImage: `radial-gradient(circle at 80% 20%, rgba(245,158,11,0.06) 0%, transparent 50%),
            radial-gradient(circle at 10% 80%, rgba(245,158,11,0.04) 0%, transparent 40%)`,
        }}
      />
      {/* Fine dot grid */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div className="site-width mx-auto px-4 md:px-8" style={{ position: "relative", zIndex: 5 }}>

        {/* ── MAIN GRID ── */}
        <div 
          className="grid grid-cols-12 gap-8 md:gap-6"
          style={{
            padding: "48px 0 36px",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
          }}
        >

          {/* Brand Column */}
          <div className="col-span-12 md:col-span-4">
            {/* Logo */}
            <div style={{ marginBottom: 20, marginTop: -14 }}>
              <Link href="/">
                <img
                  src={settings.logo}
                  alt="Own Holiday Club"
                  style={{
                    height: 52,
                    width: "auto",
                    background: "#fff",
                    padding: "6px 12px",
                    borderRadius: 12,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
              </Link>
            </div>

            <p style={{
              fontSize: 13,
              color: "#fff",
              lineHeight: 1.75,
              marginBottom: 20,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              maxWidth: "100%",
            }}>
              {settings.footerDescription}
            </p>



            {/* Social icons */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                { Icon: Facebook,  link: socialMedia.facebook },
                { Icon: Instagram, link: socialMedia.instagram },
                { Icon: Twitter,   link: socialMedia.twitter },
                { Icon: Linkedin,  link: socialMedia.linkedin },
                { Icon: Youtube,   link: socialMedia.youtube },
              ].filter(s => s.link).map(({ Icon, link }, i) => (
                <Link
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: "#f59e0b",
                    border: "1px solid #f59e0b",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", transition: "all 0.3s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#f59e0b";
                    e.currentTarget.style.borderColor = "#f59e0b";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#f59e0b";
                    e.currentTarget.style.borderColor = "#f59e0b";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="col-span-6 md:col-span-2">
            <div style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#f59e0b",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
              marginBottom: 18,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ width: 16, height: 1.5, background: "#f59e0b", display: "inline-block" }} />
              {settings.companyLinksTitle || "Company"}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11 }}>
              {settings.companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.path}
                    style={{
                      fontSize: 13,
                      color: "#ffffff",
                      textDecoration: "none",
                      fontFamily: "'Inter', sans-serif",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => e.target.style.color = "#f59e0b"}
                    onMouseLeave={e => e.target.style.color = "#ffffff"}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences Links */}
          <div className="col-span-6 md:col-span-2">
            <div style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#f59e0b",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
              marginBottom: 18,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ width: 16, height: 1.5, background: "#f59e0b", display: "inline-block" }} />
              {settings.experienceLinksTitle || "Experiences"}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11 }}>
              {settings.experienceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.path}
                    style={{
                      fontSize: 13,
                      color: "#ffffff",
                      textDecoration: "none",
                      fontFamily: "'Inter', sans-serif",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => e.target.style.color = "#f59e0b"}
                    onMouseLeave={e => e.target.style.color = "#ffffff"}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="col-span-12 md:col-span-4 flex flex-col gap-6">

            {/* Contact */}
            <div>
              <div style={{
                fontSize: 10, fontWeight: 700, color: "#f59e0b",
                letterSpacing: "0.2em", textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif", marginBottom: 16,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span style={{ width: 16, height: 1.5, background: "#f59e0b", display: "inline-block" }} />
                Contact
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {settings.footerContact?.map((item, idx) => {
                  const isAddress = /office|address|location|headquarters/i.test(item.label);
                  return (
                    <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: 7,
                        background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        {isAddress ? <MapPinned size={14} color="#f59e0b" /> : <Phone size={14} color="#f59e0b" />}
                      </div>
                      <div>
                        <div style={{ color: "#e2e8f0", fontSize: 12, fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: 2 }}>{item.label}</div>
                        <div style={{ color: "#fff", fontSize: 11, fontFamily: "'Inter', sans-serif", lineHeight: 1.5, whiteSpace: "pre-line" }}>
                          {item.content}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "18px 0 14px",
        }}>
          <div>
            <p style={{
              fontSize: 10, color: "rgba(255,255,255,0.9)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600, textTransform: "uppercase",
              letterSpacing: "0.12em", marginBottom: 3,
            }}>
              A Unit of Rigel Hospitality Services Pvt. Ltd.
            </p>
            <p style={{
              fontSize: 10, color: "rgba(255,255,255,0.6)",
              fontFamily: "'Inter', sans-serif", lineHeight: 1.5,
            }}>
              All vacations and events are subject to availability and member terms. Registered Trademark {new Date().getFullYear()}.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", alignItems: "center" }}>
            {LEGAL_LINKS.map((item, i) => (
              <React.Fragment key={item.text}>
                <Link
                  href={item.link}
                  style={{
                    fontSize: 11, color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.06em",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => e.target.style.color = "#f59e0b"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.7)"}
                >
                  {item.text}
                </Link>
                {i < LEGAL_LINKS.length - 1 && (
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <div style={{
          textAlign: "center",
          paddingBottom: 16,
          borderTop: "1px solid rgba(255,255,255,0.04)",
          paddingTop: 12,
        }}>
          <p style={{
            fontSize: 9,
            color: "rgba(255,255,255,0.45)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.45em",
          }}>
            Elevating Every Journey Since 2012
          </p>
        </div>

      </div>
    </footer>
  );
}