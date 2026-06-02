import React, { useState, useEffect } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";

const STATIC_SLIDES = [
  { title: "Membership plans for every family", left: "Other travel companies", leftText: "Pay per trip with no long-term benefits. Prices change every season and family members are charged separately.", right: "Own Holiday Club", rightText: "One membership covers Member + Spouse + 2 kids with long-term validity and fixed pricing — no hidden surprises." },
  { title: "Domestic & international destinations", left: "Other travel companies", leftText: "Limited destinations and multiple vendors required for different locations.", right: "Own Holiday Club", rightText: "Access to multiple domestic and international destinations with curated resorts and hotels under one membership." },
  { title: "End-to-end travel planning", left: "Other travel companies", leftText: "You manage bookings, transport, and itinerary separately.", right: "Own Holiday Club", rightText: "Complete travel planning including stays, transport, and experiences handled by experts." },
  { title: "Premium Resorts Only", left: "Other travel companies", leftText: "No quality guarantee — stays range from average to poor.", right: "Own Holiday Club", rightText: "Every property is handpicked for luxury, comfort, and consistent quality standards." },
  { title: "Pay once, travel for years", left: "Other travel companies", leftText: "Prices increase every year with no cost predictability.", right: "Own Holiday Club", rightText: "Fixed pricing membership lets you enjoy holidays every year without worrying about rising hotel costs." },
  { title: "Wide range of destinations", left: "Other travel companies", leftText: "Limited resort options and availability issues.", right: "Own Holiday Club", rightText: "Members get access to a wide range of destinations including beaches, hills, and international cities." },
  { title: "Exclusive member benefits", left: "Other travel companies", leftText: "No exclusive perks or loyalty advantages.", right: "Own Holiday Club", rightText: "Members enjoy special discounts, curated stays, and exclusive deals not available to regular travelers." },
  { title: "Flexible Holidays", left: "Other travel companies", leftText: "Fixed blackout dates", right: "Own Holiday Club", rightText: "Travel when life allows — anytime" },
  { title: "Cost savings on travel", left: "Other travel companies", leftText: "Repeated bookings increase overall travel expenses.", right: "Own Holiday Club", rightText: "Membership helps save significantly on hotels and travel costs over time with predictable pricing." },
  { title: "Long-term travel value", left: "Other travel companies", leftText: "No long-term value or investment in travel.", right: "Own Holiday Club", rightText: "A long-term travel solution that ensures memorable holidays with consistent quality and service." },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&display=swap');

  .ohc-root {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    background: #f5f0e8;
    background-image:
      radial-gradient(ellipse at 20% 50%, rgba(196,164,100,0.08) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 20%, rgba(196,164,100,0.06) 0%, transparent 50%);
    min-height: 100%;
    padding: 32px 16px 32px;
    box-sizing: border-box;
  }

  .ohc-header {
    text-align: center;
    margin-bottom: 24px;
  }

  .ohc-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-bottom: 18px;
  }

  .ohc-badge-line {
    width: 50px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #b8960c, transparent);
  }

  .ohc-badge-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #b8960c;
  }

  .ohc-heading {
    font-family: 'Playfair Display', 'Georgia', serif;
    font-size: clamp(36px, 5vw, 64px);
    font-weight: 700;
    color: #1a1612;
    line-height: 1.15;
    margin: 0 0 14px 0;
    letter-spacing: -0.01em;
  }

  .ohc-heading-italic {
    font-style: italic;
    color: #c4a428;
    font-weight: 400;
  }

  .ohc-subtext {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    color: #1a1612;
    font-weight: 500;
    letter-spacing: 0.02em;
    margin: 0;
  }

  /* ── Timeline ── */
  .ohc-timeline-wrap {
    max-width: 1100px;
    margin: 0 auto 32px;
    padding: 0 24px;
    position: relative;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  
  .ohc-timeline-wrap::-webkit-scrollbar {
    display: none;
  }

  .ohc-timeline-track {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 600px; /* Prevents squishing on mobile */
  }

  .ohc-timeline-bg-line {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(184, 150, 12, 0.2);
    transform: translateY(-50%);
    z-index: 0;
  }

  .ohc-timeline-progress-line {
    position: absolute;
    top: 50%;
    left: 0;
    height: 1px;
    background: linear-gradient(90deg, #b8960c, #d4af37);
    transform: translateY(-50%);
    z-index: 1;
    transition: width 0.5s ease;
  }

  .ohc-step-btn {
    position: relative;
    z-index: 2;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .ohc-step-circle {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.35s ease;
    border: 1.5px solid transparent;
  }

  .ohc-step-circle.done {
    background: rgba(196, 164, 40, 0.15);
    border-color: rgba(196, 164, 40, 0.4);
    color: #b8960c;
  }

  .ohc-step-circle.done svg {
    width: 14px;
    height: 14px;
    stroke: #b8960c;
    stroke-width: 2.5;
    fill: none;
  }

  .ohc-step-circle.active {
    background: linear-gradient(135deg, #d4af37 0%, #b8960c 100%);
    border-color: #b8960c;
    color: #fff;
    box-shadow: 0 0 0 6px rgba(184, 150, 12, 0.15), 0 4px 16px rgba(184, 150, 12, 0.3);
    transform: scale(1.12);
  }

  .ohc-step-circle.upcoming {
    background: rgba(245, 240, 232, 0.8);
    border-color: rgba(184, 150, 12, 0.2);
    color: #b0a090;
  }

  .ohc-step-circle.upcoming:hover {
    border-color: rgba(184, 150, 12, 0.5);
    color: #b8960c;
  }

  /* ── Card ── */
  .ohc-card-wrap {
    max-width: 1100px;
    margin: 0 auto;
  }

  .ohc-card {
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid rgba(184, 150, 12, 0.12);
    box-shadow:
      0 1px 3px rgba(0,0,0,0.04),
      0 8px 32px rgba(0,0,0,0.06),
      0 0 0 1px rgba(255,255,255,0.8) inset;
    overflow: hidden;
  }

  .ohc-card-top-strip {
    height: 3px;
    background: linear-gradient(90deg, #e8d48a, #c4a428, #d4af37, #b8960c, #e8d48a);
  }

  .ohc-card-body {
    padding: 40px 48px 32px;
    transition: opacity 0.3s ease;
  }

  .ohc-card-body.animating {
    opacity: 0;
  }

  .ohc-card-meta {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 32px;
    gap: 20px;
  }

  .ohc-reason-label {
    font-family: 'Cormorant Garamond', serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: #c4a428;
    margin-bottom: 8px;
  }

  .ohc-card-title {
    font-family: 'Playfair Display', 'Georgia', serif;
    font-size: clamp(24px, 3vw, 38px);
    font-weight: 700;
    color: #1a1612;
    margin: 0;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .ohc-counter {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px;
    font-weight: 400;
    color: #a09080;
    letter-spacing: 0.1em;
    white-space: nowrap;
    padding-top: 4px;
  }

  /* ── Comparison columns ── */
  .ohc-compare {
    display: grid;
    grid-template-columns: 1fr 60px 1fr;
    gap: 0;
    align-items: stretch;
    min-height: 200px;
  }

  @media (max-width: 640px) {
    .ohc-compare {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .ohc-vs-col {
      display: none !important;
    }
    .ohc-card-body {
      padding: 28px 20px 24px;
    }
    .ohc-card-footer {
      padding: 16px 20px 20px !important;
      flex-direction: column;
      gap: 16px;
      align-items: flex-start !important;
    }
    .ohc-nav-btns {
      width: 100%;
      justify-content: space-between;
    }
    .ohc-timeline-wrap {
      padding: 0 10px;
      overflow-x: visible;
    }
    .ohc-timeline-track {
      min-width: unset;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px 10px;
    }
    .ohc-timeline-bg-line,
    .ohc-timeline-progress-line {
      display: none;
    }
    .ohc-step-circle {
      width: 36px;
      height: 36px;
      font-size: 12px;
    }
  }

  .ohc-col {
    border-radius: 14px;
    padding: 28px 28px 28px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .ohc-col-left {
    background: #f8f6f2;
    border: 1px solid #ede8de;
  }

  .ohc-col-right {
    background: linear-gradient(135deg, #fdf9ee 0%, #faf4dd 100%);
    border: 1px solid rgba(196, 164, 40, 0.25);
  }

  .ohc-col-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
    flex-shrink: 0;
  }

  .ohc-col-icon.cross {
    background: #e8e4dc;
  }

  .ohc-col-icon.check {
    background: linear-gradient(135deg, #d4af37, #b8960c);
    box-shadow: 0 4px 12px rgba(184, 150, 12, 0.3);
  }

  .ohc-col-icon svg {
    width: 16px;
    height: 16px;
    stroke-width: 2.5;
    fill: none;
  }

  .ohc-col-icon.cross svg { stroke: #8a8278; }
  .ohc-col-icon.check svg { stroke: #fff; }

  .ohc-col-brand {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .ohc-col-brand.left-brand { color: #a09080; }
  .ohc-col-brand.right-brand { color: #b8960c; }

  .ohc-col-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 19px;
    font-weight: 600;
    line-height: 1.6;
    color: #3a3028;
  }

  .ohc-col-left .ohc-col-text { color: #6a6058; }

  .ohc-vs-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .ohc-vs-line {
    flex: 1;
    width: 1px;
    background: linear-gradient(to bottom, transparent, rgba(184,150,12,0.2), transparent);
  }

  .ohc-vs-badge {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid rgba(184,150,12,0.2);
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 11px;
    font-weight: 600;
    color: #c4a428;
    letter-spacing: 0.05em;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    flex-shrink: 0;
    margin: 10px 0;
  }

  /* ── Footer ── */
  .ohc-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 48px 20px;
    border-top: 1px solid rgba(184,150,12,0.1);
  }

  .ohc-autoplay-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .ohc-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #c4a428;
  }

  .ohc-dot.pulsing {
    animation: ohcPulse 2s infinite;
  }

  @keyframes ohcPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  .ohc-autoplay-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #b8960c;
  }

  .ohc-nav-btns {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .ohc-nav-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1.5px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.25s ease;
    background: transparent;
  }

  .ohc-nav-btn.prev {
    border-color: rgba(58,48,40,0.2);
    color: #3a3028;
  }

  .ohc-nav-btn.prev:hover {
    background: #f0ebe0;
    border-color: rgba(58,48,40,0.4);
  }

  .ohc-nav-btn.next {
    border-color: #c4a428;
    background: linear-gradient(135deg, #d4af37, #b8960c);
    color: #fff;
    box-shadow: 0 4px 12px rgba(184,150,12,0.3);
  }

  .ohc-nav-btn.next:hover {
    box-shadow: 0 6px 20px rgba(184,150,12,0.45);
    transform: translateY(-1px);
  }

  .ohc-nav-btn svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
  }

  .ohc-resume-btn {
    font-family: 'Cormorant Garamond', serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #b8960c;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0;
  }

`;

export default function OwnHolidayClubCarousel() {
  const [slides, setSlides] = useState(STATIC_SLIDES);
  const [headings, setHeadings] = useState({
    subheading: "WHY CHOOSE US",
    heading: "10 Reasons to",
    highlightedWord: "Become a Member",
  });
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const fetchWhyChooseUs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/why-choose-us/home`);
        const result = await response.json();
        if (result.success && result.data) {
          const wcuData = result.data;
          if (wcuData.heading) {
            setHeadings({
              subheading: wcuData.subheading || "WHY CHOOSE US",
              heading: wcuData.heading || "10 Reasons to",
              highlightedWord: wcuData.highlightedWord || "Become a Member",
            });
          }
          if (wcuData.items && wcuData.items.length > 0) {
            const mappedSlides = wcuData.items.map((item) => ({
              title: item.title,
              left: "Other travel companies",
              leftText: item.otherTravelCompanies,
              right: "Own Holiday Club",
              rightText: item.ownHolidayClub,
            }));
            setSlides(mappedSlides);
          }
        }
      } catch (error) {
        console.error("Error fetching Why Choose Us:", error);
      }
    };
    fetchWhyChooseUs();
  }, []);

  const goTo = (index, manual = false) => {
    if (animating || slides.length === 0) return;
    if (manual) setPaused(true);
    setAnimating(true);
    setTimeout(() => {
      setCurrent((index + slides.length) % slides.length);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    if (paused || slides.length === 0) return;
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setAnimating(false);
      }, 300);
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, current, slides.length]);

  const slide = slides[current] || STATIC_SLIDES[0];
  const progressPct =
    slides.length > 1 ? (current / (slides.length - 1)) * 100 : 0;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section className="ohc-root">
        {/* ── Header ── */}
        <div className="ohc-header">
          <div className="ohc-badge">
            <span className="ohc-badge-line" />
            <span className="ohc-badge-text">{headings.subheading}</span>
            <span className="ohc-badge-line" />
          </div>
          <h2 className="ohc-heading">
            {headings.heading}{" "}
            <em className="ohc-heading-italic">{headings.highlightedWord}</em>
          </h2>
          <p className="ohc-subtext">
            Side by side. See exactly what sets the Own Holiday Club apart.
          </p>
        </div>

        {/* ── Timeline ── */}
        <div className="ohc-timeline-wrap">
          <div className="ohc-timeline-track">
            <div className="ohc-timeline-bg-line" />
            <div
              className="ohc-timeline-progress-line"
              style={{ width: `${progressPct}%` }}
            />
            {slides.map((_, i) => {
              const state =
                i === current ? "active" : i < current ? "done" : "upcoming";
              return (
                <button
                  key={i}
                  className="ohc-step-btn"
                  onClick={() => goTo(i, true)}
                  aria-label={`Go to reason ${i + 1}`}
                >
                  <div className={`ohc-step-circle ${state}`}>
                    {state === "done" ? (
                      <svg viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Card ── */}
        <div className="ohc-card-wrap">
          <div className="ohc-card">
            <div className="ohc-card-top-strip" />

            <div className={`ohc-card-body${animating ? " animating" : ""}`}>
              {/* Meta row */}
              <div className="ohc-card-meta">
                <div>
                  <p className="ohc-reason-label">
                    Reason {String(current + 1).padStart(2, "0")}
                  </p>
                  <h3 className="ohc-card-title">{slide.title}</h3>
                </div>
                <div className="ohc-counter">
                  {String(current + 1).padStart(2, "0")} /{" "}
                  {String(slides.length).padStart(2, "0")}
                </div>
              </div>

              {/* Comparison */}
              <div className="ohc-compare">
                {/* Left */}
                <div className="ohc-col ohc-col-left">
                  <div className="ohc-col-icon cross">
                    <svg viewBox="0 0 24 24">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                  <p className="ohc-col-brand left-brand">
                    {slide.left || "Other travel companies"}
                  </p>
                  <p className="ohc-col-text">{slide.leftText}</p>
                </div>

                {/* VS */}
                <div className="ohc-vs-col">
                  <div className="ohc-vs-line" />
                  <div className="ohc-vs-badge">VS</div>
                  <div className="ohc-vs-line" />
                </div>

                {/* Right */}
                <div className="ohc-col ohc-col-right">
                  <div className="ohc-col-icon check">
                    <svg viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="ohc-col-brand right-brand">
                    {slide.right || "Own Holiday Club"}
                  </p>
                  <p className="ohc-col-text">{slide.rightText}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="ohc-card-footer">
              {paused ? (
                <button
                  className="ohc-resume-btn"
                  onClick={() => setPaused(false)}
                >
                  <svg
                    width="10"
                    height="12"
                    viewBox="0 0 10 12"
                    fill="#b8960c"
                  >
                    <polygon points="0,0 10,6 0,12" />
                  </svg>
                  Resume
                </button>
              ) : (
                <div className="ohc-autoplay-indicator">
                  <span className="ohc-dot pulsing" />
                  <span className="ohc-autoplay-text">Auto-playing</span>
                </div>
              )}

              <div className="ohc-nav-btns">
                <button
                  className="ohc-nav-btn prev"
                  onClick={() => goTo(current - 1, true)}
                  aria-label="Previous"
                >
                  <svg viewBox="0 0 24 24">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  className="ohc-nav-btn next"
                  onClick={() => goTo(current + 1, true)}
                  aria-label="Next"
                >
                  <svg viewBox="0 0 24 24">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}