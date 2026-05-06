"use client";

import React from "react";
import { MapPin } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";
import Link from "next/link";

export default function ServiceHighlightSection() {
  return (
    <section className="py-24 bg-white">
      <div className="site-width mx-auto text-center">
        <ScrollAnimate animation="zoom-out">
          <div className="inline-flex items-center gap-2 text-amber-500 font-bold uppercase tracking-widest text-xs mb-6 font-sans">
            <MapPin size={16} /> Over 1,000 Global Venues
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-serif text-slate-900 mb-10">
            The Perfect Canvas for <br className="hidden md:block" /> Your
            Imagination
          </h2>
          <div className="flex justify-center">
            <Link href="/destinations">
              <button className="px-8 py-4 bg-white border border-slate-200 rounded-full text-slate-600 font-bold uppercase tracking-widest text-sm hover:border-amber-500 hover:text-amber-500 transition-all duration-500 flex items-center gap-3 shadow-sm font-sans hover:-translate-y-1">
                Explore Destinations
              </button>
            </Link>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}

