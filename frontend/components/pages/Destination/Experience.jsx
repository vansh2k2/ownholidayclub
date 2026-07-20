"use client";

import React from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function Experience({ onImageError }) {
  return (
    <section className="py-32 bg-slate-950 text-white relative overflow-hidden rounded-[4rem] md:rounded-[6rem] mx-4 md:mx-8 my-12 z-20 shadow-2xl">
      <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-screen pointer-events-none z-10"></div>
      <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-slate-400/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="site-width mx-auto relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Side */}
          <div>
            <ScrollAnimate animation="reveal-left">
              <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-[10px] font-sans mb-4 block">
                The Platinum Standard
              </span>
              <h2 className="text-4xl md:text-6xl font-black font-serif mb-8 leading-[1.1]">
                Resorts that <br />
                <span className="text-amber-500 italic font-light">
                  Redefine
                </span>{" "}
                Luxury
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed font-sans mb-10 border-l-2 border-amber-500/30 pl-6">
                Every property in the Own Holiday Club portfolio is strictly
                vetted for unparalleled service, breathtaking architecture, and
                premium amenities. We don't just book you a room; we secure a
                sanctuary.
              </p>

              <div className="space-y-6">
                {[
                  "Priority Access During Peak Seasons",
                  "Complimentary Upgrades & Concierge",
                  "Zero Hidden Maintenance Fees",
                  "Multi-Generational Transferable Rights",
                ].map((perk, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-200">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-amber-500 shrink-0">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="font-bold text-sm tracking-wide font-sans">
                      {perk}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollAnimate>
          </div>

          {/* Image Collage Side */}
          <div className="relative h-[600px]">
            <ScrollAnimate animation="zoom-out" className="w-full h-full relative">
              {/* Main Image */}
              <div className="absolute right-0 top-0 w-[80%] h-[75%] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                  alt="Luxury Room"
                  onError={onImageError}
                />
                <div className="absolute inset-0 bg-slate-900/20 mix-blend-overlay"></div>
              </div>

              {/* Overlapping Image */}
              <div className="absolute bottom-4 left-0 w-[60%] h-[55%] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-slate-950 animate-float bg-slate-900 group">
                <img
                  src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                  alt="Poolside"
                  onError={onImageError}
                />
              </div>

              {/* Floating Stats */}
              <div
                className="absolute top-[20%] -left-6 bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-2xl animate-float"
                style={{ animationDelay: "2s" }}
              >
                <div className="flex items-center gap-4">
                  <Sparkles className="text-amber-500" size={24} />
                  <div>
                    <p className="text-white font-bold font-serif text-xl">
                      5-Star
                    </p>
                    <p className="text-slate-400 text-[9px] uppercase tracking-widest">
                      Guaranteed Quality
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </div>
    </section>
  );
}

