"use client";

import React from "react";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";
import Link from "next/link";

export default function Featured({ featuredPost, onImageError }) {
  return (
    <section className="py-12 bg-transparent relative z-10">
      <div className="site-width mx-auto">
        <ScrollAnimate animation="zoom-out">
          <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl group cursor-pointer border border-slate-200/50">
            <div className="absolute inset-0 w-full h-[600px] md:h-[700px]">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105 opacity-80"
                onError={onImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-transparent"></div>
            </div>

            <div className="relative z-10 flex flex-col justify-end h-[600px] md:h-[700px] p-8 md:p-16">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="px-4 py-2 rounded-full bg-amber-500 text-[10px] font-black uppercase tracking-widest text-white shadow-sm">
                    Featured | {featuredPost.category}
                  </span>
                  <div className="flex items-center gap-2 text-white/80 text-xs font-bold tracking-widest uppercase font-sans">
                    <Calendar size={14} className="text-amber-400" />
                    {featuredPost.date}
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-white leading-[1.1] mb-6 drop-shadow-lg group-hover:text-amber-50 transition-colors duration-500">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-200 text-lg md:text-xl font-medium leading-relaxed font-sans mb-10 max-w-2xl border-l-2 border-amber-500/50 pl-6">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center backdrop-blur-md text-white overflow-hidden">
                      <img
                        src={featuredPost.author?.image}
                        alt={featuredPost.author?.name || featuredPost.author}
                        className="w-full h-full object-cover"
                        onError={onImageError}
                      />
                    </div>
                    <div>
                      <p className="text-white font-bold font-sans text-sm">
                        {featuredPost.author?.name || featuredPost.author}
                      </p>
                      <p className="text-amber-400 text-[10px] uppercase tracking-widest font-sans flex items-center gap-1 mt-0.5">
                        <Clock size={10} /> {featuredPost.readTime}
                      </p>
                    </div>
                  </div>

                  <Link href={`/blog/${featuredPost.id}`}>
                    <button className="flex items-center gap-3 bg-white text-slate-900 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-xl group-hover:pr-4">
                      Read Article
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-white/20 group-hover:text-white transition-colors">
                        <ArrowUpRight size={16} />
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}

