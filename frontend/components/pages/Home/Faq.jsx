import React, { useState, useEffect } from "react";
import { Plus, Minus, Mail } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";
import { api } from "@/lib/api";

const SplitBackground = () => (
  <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 1000 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1000" height="600" fill="#ffffff" />
      <polygon points="0,0 460,0 0,340" fill="#fffdf7" />
      <polygon points="1000,600 1000,120 180,600" fill="#fffbeb" />
      <polygon points="1000,600 1000,300 540,600" fill="#fef3c7" opacity="0.6" />
      <polygon points="300,0 355,0 0,510 0,455" fill="#fde68a" opacity="0.25" />
      <polygon points="550,0 605,0 195,600 140,600" fill="#fde68a" opacity="0.18" />
    </svg>
    <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(245,158,11,0.11) 1.2px, transparent 1.2px)", backgroundSize: "30px 30px" }} />
  </div>
);

const DEFAULT_BG_IMAGE = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80";

const DEFAULT_FAQS = [
  {
    q: "How does the vacation membership work?",
    a: "Our membership gives you annual credits that can be used across 1,000+ resorts globally. You pay a one-time membership fee and enjoy wholesale rates forever.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    q: "Can I transfer my membership to family?",
    a: "Yes, our memberships are multi-generational. You can transfer your rights to immediate family members at no extra cost.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80",
  },
  {
    q: "What happens if I don't use my credits this year?",
    a: "No problem! Your credits roll over to the next year automatically, so you never lose the value of your investment.",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
  },
  {
    q: "Are there any hidden maintenance fees?",
    a: "Transparency is our core value. All nominal maintenance fees are clearly outlined in your membership tier and remain locked for 3 years at a time.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Faq() {
  const [openFaq, setOpenFaq] = useState(0);
  const [dynamicData, setDynamicData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/faq/home");
        if (response.data.success && response.data.data.heading) {
          setDynamicData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };
    fetchData();
  }, []);

  const faqs = dynamicData?.faqs?.length > 0 
    ? dynamicData.faqs.map(f => ({ q: f.question, a: f.answer, image: f.image }))
    : DEFAULT_FAQS;

  const subheading = dynamicData?.subheading || "Support Center";
  const heading = dynamicData?.heading || "Everything You Need to";
  const highlightedWord = dynamicData?.highlightedWord || "Know";
  const mainImage = dynamicData?.mainImage || DEFAULT_BG_IMAGE;

  const noneOpen = openFaq === -1 || openFaq === undefined || openFaq === null;
  const activeLabel = noneOpen ? "Your questions, answered." : (faqs[openFaq]?.q || "");
  const activeQuestionNum = noneOpen ? null : String(openFaq + 1).padStart(2, "0");

  return (
    <section className="py-12 overflow-hidden" style={{ position: "relative", background: "#ffffff" }}>
      <SplitBackground />

      <style>{`
        .faq-img-slot {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transform: scale(1.05);
          transition: opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1);
          will-change: opacity, transform;
          z-index: 1;
        }
        .faq-img-slot.faq-img-active {
          opacity: 1;
          transform: scale(1);
          z-index: 2;
        }
        .faq-answer-body {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.42s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
        }
        .faq-answer-body.faq-answer-open {
          max-height: 300px;
          opacity: 1;
        }
        @media (max-width: 900px) {
          .faq-outer-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .faq-sticky-col { position: relative !important; top: 0 !important; }
          .faq-sticky-img { position: relative !important; top: 0 !important; height: 200px !important; }
        }
      `}</style>

      <div className="site-width mx-auto px-4 md:px-8" style={{ position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <div className="mb-14">
          <ScrollAnimate variant="homeStandard">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ border: "1px solid #fcd34d", background: "#fffbeb" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
              <span style={{ fontSize: 11, letterSpacing: "0.28em", color: "#b45309", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, textTransform: "uppercase" }}>
                {subheading}
              </span>
            </div>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, color: "#1e293b", textTransform: "uppercase", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              {heading}{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "#f59e0b", fontFamily: "'DM Serif Display', serif" }}>{highlightedWord}</em>
            </h2>
            <div style={{ width: 44, height: 3, background: "#fcd34d", borderRadius: 2, marginTop: 16 }} />
          </ScrollAnimate>
        </div>

        {/* ── Main Grid ── */}
        <div
          className="faq-outer-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}
        >

          {/* LEFT: Sticky Image Panel */}
          <div className="faq-sticky-col" style={{ position: "sticky", top: 100 }}>
            <ScrollAnimate variant="homeStandard">
              <div
                className="faq-sticky-img"
                style={{ height: 320, overflow: "hidden", boxShadow: "0 20px 56px rgba(0,0,0,0.14)", position: "relative" }}
              >
                {/* Default image when nothing open */}
                <img
                  src={mainImage}
                  alt="FAQ default"
                  className={`faq-img-slot${noneOpen ? " faq-img-active" : ""}`}
                  style={{ zIndex: noneOpen ? 2 : 1 }}
                />

                {/* Each question's image */}
                {faqs.map((faq, idx) => (
                  <img
                    key={idx}
                    src={faq.image || DEFAULT_FAQS[idx % DEFAULT_FAQS.length]?.image}
                    alt={faq.q}
                    className={`faq-img-slot${openFaq === idx ? " faq-img-active" : ""}`}
                    style={{ zIndex: openFaq === idx ? 2 : 1 }}
                  />
                ))}

                {/* Gradient overlay */}
                <div style={{ position: "absolute", inset: 0, zIndex: 3, background: "linear-gradient(to top, rgba(10,8,5,0.82) 0%, rgba(10,8,5,0.12) 55%, transparent 100%)" }} />

                {/* Bottom label */}
                <div style={{ position: "absolute", bottom: 24, left: 24, right: 24, zIndex: 4 }}>
                  {!noneOpen && (
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 24, height: 2, background: "#f59e0b", borderRadius: 2 }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#f59e0b" }}>
                        Question {activeQuestionNum}
                      </span>
                    </div>
                  )}
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: noneOpen ? 20 : 16, fontWeight: 400, color: "#fff", lineHeight: 1.45, margin: 0 }}>
                    {activeLabel}
                  </p>
                </div>

                {/* Top badge */}
                <div style={{ position: "absolute", top: 20, right: 20, zIndex: 4, background: "rgba(255,255,255,0.14)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: 40, padding: "5px 13px" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.12em" }}>
                    {faqs.length} Questions
                  </span>
                </div>
              </div>
            </ScrollAnimate>

            {/* Email Support Section - Moved here or kept separate */}
            <div className="mt-8">
              <a href="mailto:info@ownholidayclub.com" className="block">
                <ScrollAnimate
                  variant="homeHero"
                  animation="fade-up"
                  className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center gap-4 hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">
                      Email Support
                    </p>
                    <p className="font-bold text-slate-900 underline decoration-slate-300 hover:text-amber-600 transition-colors">
                      info@ownholidayclub.com
                    </p>
                  </div>
                </ScrollAnimate>
              </a>
            </div>
          </div>

          {/* RIGHT: FAQ Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <ScrollAnimate key={idx} variant="homeStandard" delay={idx * 60}>
                  <div
                    style={{
                      background: "#fff",
                      border: isOpen ? "1.5px solid #f59e0b" : "1.5px solid #e2e8f0",
                      boxShadow: isOpen ? "0 8px 28px rgba(245,158,11,0.13)" : "0 2px 8px rgba(0,0,0,0.04)",
                      overflow: "hidden",
                      transition: "border-color 0.25s, box-shadow 0.25s",
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      style={{
                        width: "100%", textAlign: "left",
                        padding: "16px 18px",
                        display: "flex", alignItems: "center",
                        justifyContent: "space-between", gap: 12,
                        background: "transparent", border: "none", cursor: "pointer",
                      }}
                    >
                      {/* Number — always amber */}
                      <span style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: 26, fontWeight: 700,
                        color: "#f59e0b",
                        lineHeight: 1, flexShrink: 0, minWidth: 38,
                      }}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      {/* Question — always dark */}
                      <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13.5, fontWeight: 700,
                        color: "#1e293b",
                        lineHeight: 1.45, flex: 1,
                      }}>
                        {item.q}
                      </span>

                      {/* Plus / Minus — always amber circle */}
                      <div style={{
                        flexShrink: 0, width: 34, height: 34,
                        borderRadius: "50%",
                        background: "#f59e0b",
                        border: "2px solid #f59e0b",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "background 0.25s",
                      }}>
                        {isOpen
                          ? <Minus size={15} color="#fff" strokeWidth={2.5} />
                          : <Plus size={15} color="#fff" strokeWidth={2.5} />
                        }
                      </div>
                    </button>

                    {/* Answer */}
                    <div className={`faq-answer-body${isOpen ? " faq-answer-open" : ""}`}>
                      <div style={{ padding: "0 18px 20px 70px", borderTop: "1px solid #fef3c7" }}>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#1e293b", lineHeight: 1.85, margin: "14px 0 0" }}>
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollAnimate>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
