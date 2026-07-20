"use client";

import React from "react";
import { ArrowRight, BookOpen, Calendar, Clock, User } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";
import Link from "next/link";

export default function Posts({
  categories,
  activeCategory,
  setActiveCategory,
  filteredPosts,
  onImageError,
}) {
  return (
    <section className="py-24 bg-transparent relative z-10">
      <div className="site-width mx-auto">
        {/* Section Header & Filters */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-16 gap-8 border-b border-slate-200 pb-8">
          <ScrollAnimate animation="reveal-left" className="shrink-0">
            <h3 className="text-3xl font-black font-serif text-slate-900">
              Recent Stories
            </h3>
          </ScrollAnimate>

          <ScrollAnimate
            animation="fade-in"
            delay={150}
            className="w-full lg:w-auto overflow-x-auto pb-4 lg:pb-0 hide-scrollbar"
          >
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all duration-300 whitespace-nowrap border ${
                    activeCategory === category
                      ? "bg-slate-900 text-white border-slate-900 shadow-md"
                      : "bg-white text-slate-500 border-slate-200 hover:border-amber-500 hover:text-amber-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollAnimate>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-6 border border-amber-100">
              <BookOpen size={32} />
            </div>
            <h3 className="text-2xl font-bold font-serif text-slate-900 mb-2">
              No articles found
            </h3>
            <p className="text-slate-500 font-sans max-w-md">
              We haven't published any stories in this category yet. Check back
              soon!
            </p>
          </div>
        )}

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
          {filteredPosts.map((post, idx) => (
            <ScrollAnimate
              key={post.id}
              animation="fade-up"
              delay={(idx % 3) * 150}
              className="group cursor-pointer flex flex-col h-full"
            >
              <Link href={`/blog/${post.id}`} className="flex flex-col h-full">
                {/* Image Container */}
                <div className="relative h-64 md:h-72 rounded-[2rem] overflow-hidden mb-6 shadow-lg shadow-slate-200/50">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    onError={onImageError}
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>

                  {/* Category Badge Floating */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
                    <span className="text-[9px] font-black uppercase tracking-widest text-amber-600">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="flex flex-col flex-grow px-2">
                  <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-4 font-sans">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-amber-500" />
                      {post.date}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} className="text-amber-500" />
                      {post.readTime}
                    </span>
                    </div>

                  <h3 className="text-2xl font-bold tracking-tight mb-4 font-serif text-slate-900 group-hover:text-amber-600 transition-colors leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed font-sans mb-6 flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 overflow-hidden">
                        <User size={14} />
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        {post.author?.name || post.author}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                      Read <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollAnimate>
          ))}
        </div>

        {/* Load More (Static representation) */}
        {filteredPosts.length > 0 && (
          <div className="mt-20 flex justify-center">
            <ScrollAnimate animation="fade-in">
              <button className="px-8 py-4 bg-white border border-slate-200 rounded-full text-slate-600 font-bold uppercase tracking-widest text-sm hover:border-amber-500 hover:text-amber-500 transition-all duration-500 shadow-sm font-sans hover:-translate-y-1">
                Load More Stories
              </button>
            </ScrollAnimate>
          </div>
        )}
      </div>
    </section>
  );
}

