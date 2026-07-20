"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";
import Link from "next/link";

export default function ServiceCtaSection() {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200/50"></div>
      <div className="absolute top-0 left-1/2 w-px h-full bg-slate-200/50"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <ScrollAnimate animation="fade-up">
          <h2 className="text-6xl md:text-[5.5rem] font-black text-slate-900 tracking-tighter mb-8 font-serif leading-[0.9]">
            Let's Plan Your <br />
            <span className="text-amber-500 italic font-light">
              Next Event.
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto font-sans font-light">
            Connect with our dedicated concierge team to begin crafting an
            unforgettable experience tailored to your vision.
          </p>
          <Link href="/contact">
            <button className="group relative inline-flex items-center gap-8 bg-slate-950 text-white pl-12 pr-4 py-4 rounded-full hover:bg-amber-500 transition-all duration-700 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.4)] active:scale-95 font-sans">
              <span className="text-sm font-black uppercase tracking-[0.2em]">
                Request a Consultation
              </span>
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-amber-500 transition-all duration-500">
                <ArrowRight
                  size={24}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </button>
          </Link>{" "}
        </ScrollAnimate>
      </div>
    </section>
  );
}
