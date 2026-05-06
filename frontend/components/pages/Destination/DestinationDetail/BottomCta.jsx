"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function BottomCta({ destinationData, onScrollToForm }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let bubbles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const makeBubble = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 60,
      r: 3 + Math.random() * 10,
      speed: 0.35 + Math.random() * 0.55,
      drift: (Math.random() - 0.5) * 0.4,
      alpha: 0.08 + Math.random() * 0.18,
    });

    const init = () => {
      resize();
      bubbles = Array.from({ length: 38 }, makeBubble);
      bubbles.forEach((b) => { b.y = Math.random() * canvas.height; });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubbles.forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${b.alpha + 0.1})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,${b.alpha * 0.4})`;
        ctx.fill();
        b.y -= b.speed;
        b.x += b.drift;
        if (b.y + b.r < 0) Object.assign(b, { ...makeBubble(), x: Math.random() * canvas.width });
      });
      animId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", init);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", init); };
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-amber-500 text-center"
      style={{ padding: "3rem 1.5rem 2.5rem", minHeight: "280px", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* Bubble Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="relative z-10 max-w-xl mx-auto">
        <ScrollAnimate animation="fade-up">
          {/* Eyebrow */}
          <p
            className="uppercase tracking-[0.22em] text-[10px] font-semibold mb-2"
            style={{ color: "rgba(120,53,15,0.85)", fontFamily: "'Inter', sans-serif" }}
          >
            Curated Luxury Escapes
          </p>

          {/* Heading */}
          <h2
            className="text-slate-900 font-semibold leading-[1.08] mb-1"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 2.6rem)",
            }}
          >
            Ready for the
            <br />
            <em className="font-light text-white not-italic">
              {destinationData.name}?
            </em>
          </h2>

          {/* Subtext */}
          <p
            className="text-xs mb-6 font-normal"
            style={{
              color: "rgba(28,25,23,0.7)",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.01em",
            }}
          >
            Start your journey today and secure your luxury sanctuary.
          </p>

          {/* Button */}
          <button
            onClick={onScrollToForm}
            className="inline-flex items-center gap-2.5 bg-stone-900 text-white rounded-full transition-all duration-300 hover:bg-stone-800 active:scale-95"
            style={{
              padding: "0.55rem 0.55rem 0.55rem 1.2rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            <span>Request Itinerary</span>
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-amber-500 transition-all duration-300">
              <ArrowUpRight size={14} />
            </span>
          </button>
        </ScrollAnimate>
      </div>
    </section>
  );
}