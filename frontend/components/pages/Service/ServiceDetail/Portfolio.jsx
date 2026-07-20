"use client";

import React from "react";
import { ArrowRight, Star } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function ServiceDetailPortfolioSection({
  serviceData,
  onImageError,
  setActiveModal,
  setModalFilter,
}) {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="site-width mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <ScrollAnimate animation="reveal-left">
            <h2 className="text-4xl md:text-5xl font-black font-serif text-slate-900 mb-4">
              Our{" "}
              <span className="text-amber-500 italic font-light">
                Portfolio
              </span>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl">
              A glimpse into some of the standout experiences and events we
              have crafted worldwide.
            </p>
          </ScrollAnimate>

          <ScrollAnimate animation="reveal-right">
            <button
              onClick={() => {
                setModalFilter("All");
                setActiveModal({ type: "all" });
              }}
              className="flex items-center gap-3 text-slate-900 font-bold uppercase tracking-widest text-xs hover:text-amber-600 transition-colors border-b-2 border-amber-500 pb-1"
            >
              View All Case Studies <ArrowRight size={14} />
            </button>
          </ScrollAnimate>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceData.portfolio.map((port, idx) => (
            <ScrollAnimate
              key={port.id}
              animation="fade-up"
              delay={idx * 150}
              className="group cursor-pointer"
            >
              <div
                onClick={() =>
                  setActiveModal({ type: "portfolio", data: port })
                }
                className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={port.image}
                    alt={port.name}
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    onError={onImageError}
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {port.scale}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2">
                    {port.type}
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-slate-900 mb-4">
                    {port.name}
                  </h3>

                  <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors">
                      Read Story
                    </span>
                    <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-white transition-all">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
}

