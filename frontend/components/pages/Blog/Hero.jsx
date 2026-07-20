"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function Hero({ onImageError }) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
      {/* Subtle Background Elements with Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1920&q=80"
          alt="Travel Journal"
          className="w-full h-full object-cover opacity-[0.15]"
          onError={onImageError}
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[4px]"></div>

        <div className="absolute inset-0 opacity-[0.06] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-0 contrast-[200%] mix-blend-multiply"></div>
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] bg-amber-100/60 rounded-full blur-[120px]"></div>

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FDFDFD] to-transparent"></div>
      </div>

      <div className="site-width mx-auto relative z-10 text-center flex flex-col items-center">
        <ScrollAnimate animation="fade-up">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm mb-6">
            <BookOpen size={14} className="text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
              Stories & Insights
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.9] tracking-tighter font-serif text-slate-900 uppercase mb-6">
            The Travel <br />
            <span className="text-amber-500 italic font-light lowercase tracking-normal">
              Journal
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-sans font-medium">
            Curated guides, expert tips, and inspiring stories from the world
            of luxury travel and bespoke events.
          </p>
        </ScrollAnimate>
      </div>
    </section>
  );
}

