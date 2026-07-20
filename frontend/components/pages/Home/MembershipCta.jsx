"use client";

import React from "react";
import {
  ShieldCheck,
  ChevronRight,
  Infinity,
  Sparkles,
  ArrowRight,
  Globe,
  Command,
} from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function App() {
  return (
    <div className="relative font-sans text-slate-950 overflow-hidden selection:bg-slate-900 selection:text-white bg-[#FDFDFD]">
<div className="luxury-cta-container relative w-full">
        {/* TEXTURE & BACKGROUND LAYER - Changed from 'fixed' to 'absolute' to contain it within this section */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* High-Visibility Grain/Noise Texture */}
          <div className="absolute inset-0 opacity-[0.08] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-0 contrast-[200%] mix-blend-multiply"></div>

          {/* Reinforced Architectural Grid */}
          <div className="absolute inset-0 border-x border-slate-200/60 mx-auto site-width"></div>
          <div className="absolute top-0 left-1/4 w-px h-full bg-slate-200/40"></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-slate-200/40"></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-slate-200/30"></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-slate-200/30"></div>

          {/* Intersection Markers (Tiny Dots) */}
          <div className="absolute top-1/3 left-1/4 w-2 h-2 -translate-x-1 -translate-y-1 bg-slate-300 rounded-full"></div>
          <div className="absolute top-2/3 left-3/4 w-2 h-2 -translate-x-1 -translate-y-1 bg-slate-300 rounded-full"></div>

          {/* VISIBLE CURVE DYNAMICS */}
          <svg
            className="absolute top-0 left-0 w-full h-full opacity-[0.25]"
            viewBox="0 0 1440 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M-100 700C200 650 400 850 800 750C1200 650 1500 800 1600 850"
              stroke="url(#luxury-grad-1)"
              strokeWidth="6"
              className="animate-dash"
            />
            <path
              d="M1600 100C1300 150 1100 -50 700 50C300 150 0 0 -100 -50"
              stroke="url(#luxury-grad-2)"
              strokeWidth="4"
              className="animate-dash-reverse"
            />
            <defs>
              <linearGradient id="luxury-grad-1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="luxury-grad-2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#94a3b8" stopOpacity="0" />
                <stop offset="50%" stopColor="#94a3b8" stopOpacity="1" />
                <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Large Background Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[24vw] font-black text-slate-100/60 select-none whitespace-nowrap tracking-tighter leading-none z-0 mix-blend-darken font-sans">
            SIGNATURE
          </div>

          {/* Color Orbs */}
          <div className="absolute top-[10%] right-[-5%] w-[40rem] h-[40rem] bg-amber-100/30 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[35rem] h-[35rem] bg-amber-50/50 rounded-full blur-[100px]"></div>
        </div>

        {/* Main Content Section */}
        <section className="relative min-h-screen flex items-center py-20 md:py-32 z-10">
          <div className="site-width mx-auto w-full">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-0 items-center">
              {/* Left Content */}
              <div className="lg:col-span-7 pr-0 lg:pr-20">
                <ScrollAnimate variant="homeMembership" animation="fade-up">
                  <div className="flex items-center gap-3 mb-10 group cursor-pointer w-fit">
                    <div className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-500 shadow-lg relative overflow-hidden bg-white">
                      <div className="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <Command size={20} className="relative z-10" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-500 group-hover:text-slate-900 transition-colors font-sans">
                      The Exclusive Access
                    </span>
                  </div>

                  <h2 className="text-7xl md:text-9xl font-black leading-[0.8] tracking-tighter mb-12 font-serif">
                    OWN YOUR <br />
                    <span className="text-transparent stroke-text font-serif">
                      LIFE
                    </span>{" "}
                    <br />
                    <span className="inline-block translate-x-12 md:translate-x-24 text-amber-500 italic font-serif font-light">
                      Style
                    </span>
                  </h2>

                  <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-xl mb-16 drop-shadow-sm font-sans">
                    Experience the pinnacle of global travel. A single,
                    perpetual membership designed for those who refuse to
                    compromise on discovery.
                  </p>
                </ScrollAnimate>

                <ScrollAnimate
                  variant="homeMembership"
                  animation="fade-up"
                  delay={300}
                >
                  <button className="group flex items-center gap-10 bg-slate-950 text-white pl-12 pr-6 py-6 rounded-full hover:bg-amber-500 transition-all duration-700 shadow-[0_40px_80px_-20px_rgba(15,23,42,0.4)] active:scale-95 font-sans">
                    <span className="text-sm font-black uppercase tracking-[0.3em]">
                      Inquire Now
                    </span>
                    <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-amber-500 transition-all duration-500">
                      <ChevronRight size={24} />
                    </div>
                  </button>
                </ScrollAnimate>
              </div>

              {/* Right Visual Collage */}
              <div className="lg:col-span-5 relative">
                <ScrollAnimate
                  variant="homeMembership"
                  animation="zoom-out"
                  className="relative"
                >
                  {/* Floating Ring Overlay */}
                  <div className="absolute -top-16 -left-16 w-80 h-80 border-2 border-amber-200/50 rounded-full animate-spin-slow opacity-60 pointer-events-none"></div>

                  {/* Primary Image Container */}
                  <div className="relative z-10 w-full aspect-[3/4] overflow-hidden rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] group border border-slate-200 bg-white p-3">
                    <div className="w-full h-full overflow-hidden rounded-[2.2rem]">
                      <img
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=90"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100"
                        alt="Luxury Hotel"
                      />
                    </div>
                    <div className="absolute inset-0 bg-amber-900/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  </div>

                  {/* Secondary Inset Image */}
                  <div className="absolute -bottom-16 -left-12 md:-left-24 w-3/4 aspect-square z-20 overflow-hidden rounded-[3rem] border-[16px] border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] animate-float bg-white">
                    <img
                      src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80"
                      className="w-full h-full object-cover"
                      alt="Resort Pool"
                    />
                  </div>

                  {/* Floating Data Badge */}
                  <div className="absolute top-1/4 -right-16 z-30 bg-white/95 backdrop-blur-xl p-10 rounded-[3rem] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.15)] border border-white/50 hidden md:block group-hover:-translate-y-4 transition-transform duration-700 font-sans">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="p-3 bg-amber-50 rounded-xl">
                        <Sparkles className="text-amber-500" size={24} />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                        Authentic Luxury
                      </span>
                    </div>
                    <p className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">
                      70K+
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-tight">
                      Verified Global
                      <br />
                      Ambassadors
                    </p>
                  </div>
                </ScrollAnimate>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


