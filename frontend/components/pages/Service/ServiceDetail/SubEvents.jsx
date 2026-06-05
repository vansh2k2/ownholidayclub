"use client";

import React from "react";
import { motion } from "framer-motion";
import ScrollAnimate from "@/components/common/ScrollAnimate";
import { ArrowRight } from "lucide-react";

export default function ServiceDetailSubEvents({ serviceData, onSelectCategory }) {
  const subEvents = serviceData?.subServices || [];

  if (!subEvents || subEvents.length === 0) {
    return null;
  }
  
  // Sort by order
  const sortedEvents = [...subEvents].sort((a, b) => (a.order || 0) - (b.order || 0));

  const headingText = serviceData?.subServicesConfig?.heading || `${serviceData?.serviceTitle || "Explore"} Categories ✨`;
  const descText = serviceData?.subServicesConfig?.description || `Discover our curated ${serviceData?.serviceTitle?.toLowerCase() || "service"} experiences tailored specifically to your needs.`;

  const handleCardClick = (subEvent) => {
    if (onSelectCategory) {
      onSelectCategory(subEvent);
    }
  };

  return (
    <section className="pt-8 pb-8 md:pt-12 md:pb-8 bg-white relative z-20 font-sans border-t border-slate-100">
      <div className="site-width mx-auto px-4 sm:px-6">
        <ScrollAnimate variant="homeSection">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="w-12 border-b border-dashed border-amber-500"></div>
              <ArrowRight size={12} className="text-amber-500 -ml-4" />
              <span className="text-amber-500 text-[14px] font-bold uppercase tracking-[0.2em]">EXPLORE</span>
              <ArrowRight size={12} className="text-amber-500 -mr-4 rotate-180" />
              <div className="w-12 border-b border-dashed border-amber-500"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {headingText}
            </h2>
            <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
              {descText}
            </p>
          </div>
        </ScrollAnimate>

        <div className="relative mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
            {sortedEvents.map((subEvent, i) => (
              <ScrollAnimate key={subEvent._id || i} variant="homeDestination" className="relative group pt-4 mt-2">
                {/* Floating Number (Outside of overflow-hidden container) */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center z-20 transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="w-8 h-8 bg-slate-900 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md border-2 border-white">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Card Container */}
                <div 
                  className="bg-white rounded-2xl flex flex-col h-full relative transition-transform duration-300 group-hover:-translate-y-2 cursor-pointer overflow-hidden"
                  style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 4px 12px 0px, rgba(27, 31, 35, 0.08) 0px 0px 0px 1px" }}
                  onClick={() => handleCardClick(subEvent)}
                >

                  {/* Text Content */}
                  <div className="px-6 pt-12 pb-6 text-center flex-1 relative z-10 flex flex-col bg-white">
                    <h3 className="text-[14px] font-bold text-slate-900 tracking-wider mb-3">
                      {subEvent.title}
                    </h3>
                    <div 
                      className="text-[12px] text-slate-600 leading-relaxed mx-auto line-clamp-3 mb-4 flex-1 text-justify"
                      dangerouslySetInnerHTML={{ __html: subEvent.description }}
                    />
                    <div className="inline-flex items-center justify-center gap-2 text-amber-600 text-[11px] font-bold uppercase tracking-wider group-hover:text-amber-700 transition-colors mt-auto">
                      {subEvent.buttonText || "Plan this event"}
                      <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom Image */}
                  <div className="h-[160px] w-full relative mt-auto bg-slate-100">
                    <img 
                      src={subEvent.image} 
                      alt={subEvent.altText || subEvent.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
