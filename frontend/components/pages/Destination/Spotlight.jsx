"use client";

import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Palmtree,
  Sparkles,
  Sun,
} from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";
import Link from "next/link";

export default function Spotlight({ onImageError, featuredDestination }) {
  if (!featuredDestination) {
    return null;
  }

  const spotlightHighlights = featuredDestination.highlights?.slice(0, 4) || [];

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="site-width mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Spotlight Image Collage */}
          <div className="lg:col-span-6 relative h-[600px] md:h-[700px] w-full order-2 lg:order-1">
            <ScrollAnimate
              animation="reveal-left"
              className="w-full h-full relative"
            >
              <div className="absolute top-0 left-0 w-[85%] h-[85%] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 group">
                <img
                  src={featuredDestination.image}
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                  alt={`${featuredDestination.name} Spotlight`}
                  onError={onImageError}
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[60%] aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-[10px] border-white animate-float bg-white">
                <img
                  src={featuredDestination.gallery?.[0] || featuredDestination.image}
                  className="w-full h-full object-cover"
                  alt={`${featuredDestination.name} Detail`}
                  onError={onImageError}
                />
              </div>
              {/* Badge */}
              <div
                className="absolute top-12 -left-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-slate-100 animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-500">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <p className="font-bold font-serif text-slate-900">
                      Editor's Pick
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500">
                      This Month
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimate>
          </div>

          {/* Spotlight Content */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <ScrollAnimate animation="reveal-right">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
                <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-[10px] font-sans">
                  Destination Spotlight
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tight mb-8 font-serif text-slate-900">
                The{" "}
                <span className="text-amber-500 italic font-light">
                  {featuredDestination.name}
                </span>
              </h2>

              <p className="text-slate-600 text-lg leading-relaxed font-sans mb-8 border-l-2 border-amber-500/30 pl-6">
                {featuredDestination.desc || featuredDestination.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {spotlightHighlights.map((item, i) => {
                  const icons = [
                    <Palmtree key="palm" size={20} />,
                    <Sun key="sun" size={20} />,
                    <CheckCircle2 key="check" size={20} />,
                    <Compass key="compass" size={20} />,
                  ];

                  return (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-amber-200 transition-colors"
                  >
                    <div className="text-amber-500">{icons[i % icons.length]}</div>
                    <span className="font-bold text-sm text-slate-700">
                      {item}
                    </span>
                  </div>
                  );
                })}
              </div>
              <Link href={`/destinations/${featuredDestination.slug || featuredDestination._id || featuredDestination.id}`}>
                <button className="group flex items-center gap-4 bg-transparent text-slate-900 hover:text-amber-600 transition-colors font-sans">
                  <span className="text-sm font-black uppercase tracking-[0.2em] border-b-2 border-amber-500 pb-1">
                    View Itineraries
                  </span>
                  <div className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center group-hover:border-amber-500 transition-colors">
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </button>
              </Link>
            </ScrollAnimate>
          </div>
        </div>
      </div>
    </section>
  );
}

