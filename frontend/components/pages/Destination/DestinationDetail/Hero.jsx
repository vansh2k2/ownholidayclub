"use client";

import React from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";
import Link from "next/link";

export default function Hero({ destinationData, onImageError }) {
  return (
    <section className="relative h-[70vh] md:h-[75vh] w-full overflow-hidden bg-slate-950">
      {/* Image Layer */}
      <img
        src={destinationData.image || destinationData.heroImage}
        alt={destinationData.name}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        style={{ transform: "scale(1.05)" }}
        onError={onImageError}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-slate-950/40"></div>
      
      {/* Content Layer */}
      <div className="absolute bottom-0 left-0 w-full pb-32 md:pb-48 z-20">
        <div className="site-width mx-auto px-6 md:px-12">
          <ScrollAnimate variant="homeDestination">
            <div className="flex items-center gap-2 mb-3 text-amber-400">
              <MapPin size={14} />
              <span className="text-[11px] md:text-[13px] font-bold uppercase tracking-[0.5em] font-sans">
                {destinationData.region || "Domestic"}
              </span>
            </div>
            
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[1] tracking-tight text-white mb-6 max-w-4xl"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {destinationData.name}
            </h1>
            
            <div className="flex items-center gap-5">
              <div className="h-[2px] w-10 bg-amber-500"></div>
              <p 
                className="text-base md:text-xl text-slate-100 font-normal tracking-wide opacity-90"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {destinationData.tagline || destinationData.shortDescription}
              </p>
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  );
}