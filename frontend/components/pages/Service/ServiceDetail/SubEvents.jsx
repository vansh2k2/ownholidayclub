"use client";

import React from "react";
import { motion } from "framer-motion";
import ScrollAnimate from "@/components/common/ScrollAnimate";
import subEventsData from "@/lib/subEvents.json";
import { ArrowRight } from "lucide-react";

export default function ServiceDetailSubEvents({ serviceData, onSelectCategory }) {
  // Map service slug to the event_name in JSON
  const slugToEventName = {
    "weddings": "Weddings",
    "corporate-events": "Corporate Events",
    "private-parties": "Parties",
    "parties": "Parties",
    "outings": "Outing",
    "outing": "Outing",
  };

  const slug = serviceData?.slug || serviceData?.title?.toLowerCase()?.replace(/\s+/g, "-");
  const mappedEventName = slugToEventName[slug];

  if (!mappedEventName) {
    return null; // Don't show if there are no sub events mapping
  }

  const subEvents = subEventsData.filter((event) => event.event_name === mappedEventName && event.status !== "De Active");

  if (!subEvents || subEvents.length === 0) {
    return null;
  }

  const handleCardClick = (subEvent) => {
    if (onSelectCategory) {
      onSelectCategory(subEvent);
    }
  };

  return (
    <section className="pt-16 pb-8 md:pt-24 md:pb-8 bg-white relative z-20 font-sans border-t border-slate-100">
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
              {mappedEventName} <span className="text-amber-500">Categories</span> <span className="inline-block transform -rotate-45 ml-2 text-slate-900">✨</span>
            </h2>
            <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
              Discover our curated {mappedEventName.toLowerCase()} experiences tailored specifically to your needs.
            </p>
          </div>
        </ScrollAnimate>

        <div className="relative mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
            {subEvents.map((subEvent, i) => (
              <ScrollAnimate key={subEvent.id} variant="homeDestination" className="relative group">
                {/* Card Container */}
                <div 
                  className="bg-white rounded-2xl flex flex-col h-[380px] relative mt-6 transition-transform duration-300 group-hover:-translate-y-2 cursor-pointer"
                  style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 4px 12px 0px, rgba(27, 31, 35, 0.08) 0px 0px 0px 1px" }}
                  onClick={() => handleCardClick(subEvent)}
                >
                  {/* Floating Number */}
                  <div className="absolute left-1/2 -top-4 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-8 h-8 bg-slate-900 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="px-6 pt-12 pb-6 text-center flex-1 relative z-10 flex flex-col">
                    <h3 className="text-[14px] font-bold text-slate-900 uppercase tracking-wider mb-3">
                      {subEvent.sub_event_name}
                    </h3>
                    <div 
                      className="text-[12px] text-slate-600 leading-relaxed mx-auto line-clamp-3 mb-4 flex-1"
                      dangerouslySetInnerHTML={{ __html: subEvent.description }}
                    />
                    <div className="inline-flex items-center justify-center gap-2 text-amber-600 text-[11px] font-bold uppercase tracking-wider group-hover:text-amber-700 transition-colors mt-auto">
                      Plan this event
                      <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom Image */}
                  <div className="h-[160px] w-full relative rounded-b-2xl overflow-hidden mt-auto">
                    <img 
                      src={`https://www.ownholidayclub.com/assets/images/event/${subEvent.thumbnail_image}`} 
                      alt={subEvent.alt || subEvent.sub_event_name}
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
