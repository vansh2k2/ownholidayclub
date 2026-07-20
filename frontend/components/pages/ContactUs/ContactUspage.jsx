"use client";
import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

import ScrollAnimate from "@/components/common/ScrollAnimate";

/* ─── Diagonal stripe BG ─── */
const DiagonalBg = () => (
  <div
    aria-hidden="true"
    style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}
  >
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      viewBox="0 0 1000 700"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1000" height="700" fill="#ffffff" />
      <polygon points="1000,700 1000,100 160,700"  fill="#fffbeb" opacity="0.8"  />
      <polygon points="1000,700 1000,320 520,700"  fill="#fef3c7" opacity="0.55" />
      <polygon points="640,0 700,0 1000,530 1000,470" fill="#fde68a" opacity="0.2"  />
      <polygon points="800,0 860,0 1000,260 1000,200" fill="#fde68a" opacity="0.14" />
    </svg>
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(245,158,11,0.08) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }}
    />
  </div>
);

export default function ContactUspage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [isMounted, setIsMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [settings, setSettings] = useState({
    officeAddress: "Rigel Hospitality Services Pvt. Ltd. 27 C, Block A, Kailash Colony, Extension, New Delhi – 110048",
    contactPhone: "+91-96675 52445",
    contactEmail: "membership@ownholidayclub.com",
    workingHours: "Mon – Sat: 9:30 AM – 6:30 PM",
    mapIframe: "",
  });
  const [heroData, setHeroData] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";

  React.useEffect(() => {
    setIsMounted(true);
    fetch(`${API_BASE_URL}/api/settings`)
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data) {
          setSettings(result.data);
        }
      })
      .catch(err => console.error("Settings fetch error:", err));

    fetch(`${API_BASE_URL}/api/hero-images/page/Contact%20Us?t=${Date.now()}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data) {
          setHeroData(result.data);
        }
      })
      .catch(err => console.error("Failed to fetch hero image for Contact Us", err));
  }, [API_BASE_URL]);

  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.1]);
  const heroY     = useTransform(scrollY, [0, 400], [0, 45]);
  const heroOp    = useTransform(scrollY, [0, 320], [1, 0.58]);

  const backgroundImage = heroData?.backgroundImage || "/contact.jpg";
  const altText = heroData?.imageAltText || "Contact";
  const title = heroData?.title || "Contact";
  const highlightedText = heroData?.highlightedText || "Us.";
  const shortDescription = heroData?.shortDescription || "Our experts are ready to craft your next unforgettable journey.";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081"}/api/contact-enquiries`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
          setIsSuccess(false);
        }, 4000);
      } else {
        alert("Something went wrong: " + result.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Note: If the message failed to send, please ensure your backend server is running on port 8081.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isMounted) return <div style={{ minHeight: "100vh", background: "#fff" }} />;

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .ci-input {
          width: 100%; background: #f8f8f6;
          border: 1.5px solid #e3ddd5;
          padding: 11px 15px; font-size: 13.5px;
          font-family: 'Inter', sans-serif; color: #1a1a1a;
          outline: none; border-radius: 0;
          transition: border-color .2s, box-shadow .2s;
        }
        .ci-input::placeholder { color: #bbb; }
        .ci-input:focus {
          border-color: #c9800c;
          box-shadow: 0 0 0 3px rgba(201,128,12,.06);
        }
        .ci-label {
          display: block; font-family: 'Inter', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: .18em; text-transform: uppercase;
          color: #555; margin-bottom: 6px;
        }

        .ci-btn {
          width: 100%; background: #1a1a1a; color: #fff; border: none;
          padding: 14px 28px; font-family: 'Inter', sans-serif;
          font-weight: 700; font-size: 11px; letter-spacing: .2em;
          text-transform: uppercase; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          position: relative; overflow: hidden; border-radius: 0;
        }
        .ci-btn::after {
          content: ''; position: absolute; inset: 0;
          background: #c9800c;
          transform: translateY(100%);
          transition: transform .42s cubic-bezier(.77,0,.18,1);
        }
        .ci-btn:hover::after { transform: translateY(0); }
        .ci-btn > * { position: relative; z-index: 1; }
        .ci-btn:disabled { background: #ccc; cursor: not-allowed; }
        .ci-btn:disabled::after { display: none; }

        .ic {
          display: flex; align-items: flex-start; gap: 0;
          border-left: 4px solid #ede8e0;
          padding: 16px 18px; background: #fff;
          transition: border-color .22s, box-shadow .22s, transform .2s;
        }
        .ic:hover {
          border-left-color: #c9800c;
          box-shadow: 3px 3px 18px rgba(0,0,0,0.06);
          transform: translateX(3px);
        }
        .ic-icon {
          width: 38px; height: 38px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: #fdf3e3; color: #c9800c; margin-right: 14px;
          transition: background .22s, color .22s;
        }
        .ic:hover .ic-icon { background: #1a1a1a; color: #f5b843; }

        .eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 12px; font-weight: 800;
          letter-spacing: .28em; text-transform: uppercase; color: #c9800c;
          margin-bottom: 12px;
        }
        .eyebrow::before, .eyebrow::after {
          content: ''; display: block; width: 22px; height: 1.5px; background: #c9800c;
        }

        .map-shell { overflow: hidden; }
        .map-shell iframe { display: block; filter: grayscale(10%); transition: filter .5s; }
        .map-shell:hover iframe { filter: grayscale(0%); }

        .contact-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 52px; align-items: start;
        }
        .form-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;
        }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr; }
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        .pulse-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #22c55e;
          animation: pulse-dot 1.4s ease-in-out infinite;
        }

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative", height: "60vh", minHeight: 400,
          overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <motion.div style={{ scale: heroScale, y: heroY, opacity: heroOp, position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={backgroundImage} alt={altText} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,8,5,0.56)" }} />
        </motion.div>

        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 800,
              color: "#fff", lineHeight: 1.08, letterSpacing: "-.02em",
              textTransform: "uppercase", marginBottom: 12,
            }}>
              {title}{" "}
              {highlightedText && (
                <em style={{ color: "#f5b843", fontWeight: 800, fontStyle: "italic" }}>{highlightedText}</em>
              )}
            </h1>
            {shortDescription && (
              <p style={{ fontFamily: "'Inter',sans-serif", color: "rgba(255,255,255,0.62)", fontSize: 14, maxWidth: 450, margin: "0 auto", lineHeight: 1.78 }}>
                {shortDescription}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section style={{ position: "relative", padding: "70px 0 90px", overflow: "hidden" }}>
        <DiagonalBg />
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
          <div className="contact-grid">

            {/* LEFT: Info */}
            <div>
              <ScrollAnimate variant="homeStandard">
                <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <div className="eyebrow"><span>Reach Us</span></div>
                  <h2 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(24px, 2.5vw, 34px)", fontWeight: 800,
                    color: "#1a1a1a", lineHeight: 1.18, letterSpacing: "-.02em",
                    textTransform: "uppercase", marginBottom: 14,
                  }}>
                    Get in{" "}<span style={{ color: "#f5b843", fontWeight: 800 }}>Touch.</span>
                  </h2>
                  <p style={{ fontFamily: "'Inter',sans-serif", color: "#555", fontSize: 14, lineHeight: 1.85, maxWidth: 370, marginBottom: 32 }}>
                    Have questions about our membership or need help planning your next trip?
                    We're here every step of the way.
                  </p>
                </motion.div>
              </ScrollAnimate>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  {
                    Icon: MapPin, title: "Our Office",
                    body: <div style={{ whiteSpace: "pre-line" }}>{settings.officeAddress}</div>,
                  },
                  { Icon: Phone, title: "Phone", body: settings.contactPhone },
                  { Icon: Mail,  title: "Email", body: settings.contactEmail },
                  {
                    Icon: Clock, title: "Working Hours",
                    body: (
                      <>
                        <div style={{ whiteSpace: "pre-line" }}>{settings.workingHours}</div>
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#c9800c" }}>
                          Closed on Sundays
                        </span>
                      </>
                    ),
                  },
                ].map(({ Icon, title, body }, i) => (
                  <ScrollAnimate key={i} variant="homeStandard" delay={i * 75}>
                    <motion.div
                      className="ic"
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div className="ic-icon"><Icon size={17} /></div>
                      <div>
                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: "#666", marginBottom: 5 }}>
                          {title}
                        </div>
                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13.5, color: "#1a1a1a", lineHeight: 1.7 }}>
                          {body}
                        </div>
                      </div>
                    </motion.div>
                  </ScrollAnimate>
                ))}
              </div>
            </div>

            {/* RIGHT: Form with Success Animation */}
            <div>
              <ScrollAnimate variant="homeStandard" delay={100}>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  style={{
                    background: "#fff",
                    boxShadow: "0 16px 56px rgba(0,0,0,0.07)",
                    position: "relative",
                    borderTop: "3px solid #c9800c",
                    overflow: "hidden",
                    minHeight: 480,
                  }}
                >
                  <AnimatePresence mode="wait">

                    {/* SUCCESS STATE */}
                    {isSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        style={{
                          display: "flex", flexDirection: "column",
                          alignItems: "center", justifyContent: "center",
                          padding: "60px 42px", minHeight: 480, textAlign: "center",
                          border: "1px solid #bbf7d0", background: "#fff",
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
                          style={{ marginBottom: 24 }}
                        >
                          <CheckCircle style={{ width: 80, height: 80, color: "#22c55e" }} strokeWidth={1.5} />
                        </motion.div>

                        <motion.h3
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.28 }}
                          style={{
                            fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 800,
                            color: "#1a1a1a", letterSpacing: "-.02em", textTransform: "uppercase", marginBottom: 10,
                          }}
                        >
                          Message Sent!
                        </motion.h3>

                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.36 }}
                          style={{ fontFamily: "'Inter', sans-serif", color: "#666", fontSize: 14, lineHeight: 1.75, maxWidth: 320, marginBottom: 28 }}
                        >
                          Thank you for reaching out. Our team will get back to you within 24 hours.
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          style={{ display: "flex", alignItems: "center", gap: 8 }}
                        >
                          <div className="pulse-dot" />
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#999", letterSpacing: ".12em", textTransform: "uppercase" }}>
                            Form will reset automatically...
                          </span>
                        </motion.div>
                      </motion.div>

                    ) : (

                      /* FORM STATE */
                      <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ padding: "38px 42px" }}
                      >
                        <div style={{ marginBottom: 26 }}>
                          <div className="eyebrow"><span>Send a Message</span></div>
                          <h3 style={{
                            fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 800,
                            color: "#1a1a1a", letterSpacing: "-.02em", textTransform: "uppercase",
                          }}>
                            We'd love to hear from you
                          </h3>
                        </div>

                        <form onSubmit={handleSubmit}>
                          <div className="form-row">
                            <Field label="Your Name"    name="name"  value={formData.name}  onChange={handleChange} placeholder="Rajeev Sharma" />
                            <Field label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
                          </div>
                          <div style={{ marginBottom: 12 }}>
                            <Field label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                          </div>
                          <div style={{ marginBottom: 12 }}>
                            <label className="ci-label">Subject</label>
                            <select name="subject" value={formData.subject} onChange={handleChange} className="ci-input" style={{ appearance: "none", cursor: "pointer" }}>
                              <option value="">Select Topic</option>
                              <option value="Inquiry">New Membership Inquiry</option>
                              <option value="Support">Member Support</option>
                              <option value="Booking">Booking Assistance</option>
                            </select>
                          </div>
                          <div style={{ marginBottom: 22 }}>
                            <label className="ci-label">Message</label>
                            <textarea name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="How can we help you?" className="ci-input" style={{ resize: "none" }} />
                          </div>
                          <button type="submit" className="ci-btn" disabled={submitting}>
                            {submitting ? (
                              <>
                                <Loader2 style={{ width: 14, height: 14, animation: "spin 1s linear infinite" }} />
                                <span>Sending...</span>
                              </>
                            ) : (
                              <>
                                <span>Send Message</span>
                                <Send size={14} />
                              </>
                            )}
                          </button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ScrollAnimate>
            </div>

          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section style={{ background: "#fff" }}>
        <div style={{ width: "100%", margin: "0 auto" }}>
          <div className="map-shell">
            {settings.mapIframe ? (
              <div 
                className="w-full h-[320px]"
                dangerouslySetInnerHTML={{ 
                  __html: settings.mapIframe.replace(/width="[^"]*"/, 'width="100%"').replace(/height="[^"]*"/, 'height="320"') 
                }} 
              />
            ) : (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d224138.3954030454!2d77.242184!3d28.6248936!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1777451014159!5m2!1sen!2sin"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

function Field({ label, type = "text", ...rest }) {
  return (
    <div>
      <label className="ci-label">{label}</label>
      <input type={type} {...rest} required className="ci-input" />
    </div>
  );
}