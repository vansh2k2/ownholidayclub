"use client";

import React from "react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function Stats() {
  return (
    <section className="py-24 bg-white">
      <div className="site-width mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <ScrollAnimate
            animation="zoom-out"
            delay={0}
            className="flex flex-col items-center justify-center pt-8 md:pt-0 group"
          >
            <div className="overflow-hidden">
              <span className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter mb-2 font-serif tabular-nums inline-block group-hover:-translate-y-2 transition-transform duration-500">
                14<span className="text-amber-500">+</span>
              </span>
            </div>
            <span className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400 font-sans mt-4">
              Years of Excellence
            </span>
          </ScrollAnimate>

          <ScrollAnimate
            animation="zoom-out"
            delay={150}
            className="flex flex-col items-center justify-center pt-8 md:pt-0 group"
          >
            <div className="overflow-hidden">
              <span className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter mb-2 font-serif tabular-nums inline-block group-hover:-translate-y-2 transition-transform duration-500">
                70<span className="text-amber-500">K</span>
              </span>
            </div>
            <span className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400 font-sans mt-4">
              Privileged Members
            </span>
          </ScrollAnimate>

          <ScrollAnimate
            animation="zoom-out"
            delay={300}
            className="flex flex-col items-center justify-center pt-8 md:pt-0 group"
          >
            <div className="overflow-hidden">
              <span className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter mb-2 font-serif tabular-nums inline-block group-hover:-translate-y-2 transition-transform duration-500">
                1K<span className="text-amber-500">+</span>
              </span>
            </div>
            <span className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400 font-sans mt-4">
              Partner Resorts
            </span>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  );
}

