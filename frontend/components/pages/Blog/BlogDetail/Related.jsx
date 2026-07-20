"use client";

import React from "react";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";
import Link from "next/link";

export default function Related({ articleData, onImageError }) {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="site-width mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <ScrollAnimate animation="reveal-left">
            <h2 className="text-4xl md:text-5xl font-black font-serif text-slate-900 mb-4">
              Read{" "}
              <span className="text-amber-500 italic font-light">Next</span>
            </h2>
          </ScrollAnimate>
          <ScrollAnimate animation="reveal-right">
            <Link
              href="/blog"
              className="flex items-center gap-3 text-slate-900 font-bold uppercase tracking-widest text-xs hover:text-amber-600 transition-colors border-b-2 border-amber-500 pb-1"
            >
              Back to Journal <ArrowRight size={14} />
            </Link>
          </ScrollAnimate>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articleData?.relatedPosts?.map((post, idx) => (
            <ScrollAnimate
              key={post.id}
              animation="fade-up"
              delay={idx * 150}
              className="group cursor-pointer flex flex-col md:flex-row gap-6 bg-slate-50 rounded-[2rem] p-4 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <Link
                href={`/blog/${post.id}`}
                className="group flex flex-col md:flex-row gap-6"
              >
                <div className="w-full md:w-48 h-48 rounded-[1.5rem] overflow-hidden shrink-0 relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    onError={onImageError}
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                    <span className="text-[9px] font-black uppercase tracking-widest text-amber-600">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-center py-2 pr-4">
                  <div className="flex items-center gap-2 text-slate-400 text-[9px] font-bold tracking-widest uppercase mb-3 font-sans">
                    <Calendar size={12} className="text-amber-500" />
                    {post.date}
                  </div>
                  <h3 className="text-xl font-bold font-serif text-slate-900 mb-4 group-hover:text-amber-600 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <div className="mt-auto flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest group-hover:text-slate-900 transition-colors">
                    Read Story{" "}
                    <ArrowUpRight
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
}

