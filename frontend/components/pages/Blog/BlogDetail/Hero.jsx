"use client";

import React from "react";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  Share2,
  User,
} from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";
import Link from "next/link";

export default function Hero({ articleData, onImageError }) {
  // Common style for glassy buttons/panels
  const glassStyle =
    "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg";

  return (
    <section className="relative h-[85vh] mt-20 min-h-[600px] w-full bg-slate-900 flex flex-col justify-center items-center overflow-hidden">
      {/* 1. Enhanced Background Image: 
         We remove opacity and blend modes so it is fully visible. */}
      <img
        src={articleData.heroImage}
        alt={articleData.title}
        className="absolute inset-0 w-full h-full object-cover z-0"
        onError={onImageError}
      />

      {/* 2. Optimized Gradient Overlay: 
         Provides base contrast without completely hiding the image. */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-900/20 to-slate-950/70 z-10"></div>

      {/* 3. Top Navigation Bar Overlay */}
      <div className="absolute top-10 left-0 w-full z-50 px-6 md:px-10 flex justify-between items-center">
        <Link href="/blog">
          <button
            className={`group flex items-center gap-3 px-5 py-2.5 rounded-xl text-white transition-all duration-300 ${glassStyle}`}
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-sm font-medium tracking-wide">
              Back to Journal
            </span>
          </button>
        </Link>

        <div className="flex gap-3">
          <button
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all duration-300 ${glassStyle}`}
          >
            <Bookmark size={18} />
          </button>
          <button
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all duration-300 ${glassStyle}`}
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* 4. Main Glassy Hero Content Container */}
      <div
        className={`relative z-20 max-w-5xl mx-auto px-6 py-12 md:py-16 rounded-3xl text-center ${glassStyle}`}
      >
        <ScrollAnimate animation="fade-up">
          {/* Category Tag */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-8">
            {articleData.category}
          </div>

          {/* Main Title - Dark text for maximum contrast on light glass */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] tracking-tight text-slate-950 mb-10">
            {articleData.h1Title || articleData.title}
          </h1>

          {/* Metadata Footer: Inner glassy panel */}
          <div className="inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-8 py-4 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-white/10 text-slate-100 text-sm font-medium font-sans">
            <span className="flex items-center gap-2.5">
              <User size={16} className="text-amber-400" />
              {articleData.author.name}
            </span>
            <span className="flex items-center gap-2.5">
              <Calendar size={16} className="text-amber-400" />
              {articleData.date}
            </span>
            <span className="flex items-center gap-2.5">
              <Clock size={16} className="text-amber-400" />
              {articleData.readTime}
            </span>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
