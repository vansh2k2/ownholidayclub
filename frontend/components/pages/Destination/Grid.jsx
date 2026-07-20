"use client";

import React from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
} from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";
import Link from "next/link";

export default function Grid({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  currentDestinations,
  currentPage,
  totalPages,
  setCurrentPage,
  onImageError,
}) {
  return (
    <section className="py-12 bg-transparent relative z-10 min-h-screen">
      <div className="site-width mx-auto">
        {/* Controls Bar: Title, Search, and Tabs */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-16 gap-6 w-full border-b border-slate-200 pb-8">
          <ScrollAnimate animation="reveal-left" className="shrink-0">
            <h3 className="text-2xl font-bold font-serif text-slate-900">
              Featured Locations
            </h3>
          </ScrollAnimate>

          <ScrollAnimate
            animation="fade-in"
            delay={150}
            className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            {/* Search Bar */}
            <div className="relative w-full sm:w-64 md:w-80 group">
              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors"
              />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3.5 rounded-full border border-slate-200 bg-white shadow-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-sans text-sm text-slate-700 placeholder:text-slate-400"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-white p-1.5 rounded-full border border-slate-200 shadow-sm w-full sm:w-fit overflow-x-auto">
              {["All", "Domestic", "International"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-5 md:px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${
                    filter === tab
                      ? "bg-slate-900 text-white shadow-md scale-100"
                      : "text-slate-500 hover:text-amber-600 bg-transparent"
                  }`}
                >
                  {tab === "Domestic" ? "In India" : tab}
                </button>
              ))}
            </div>
          </ScrollAnimate>
        </div>

        {/* Empty State / No Results */}
        {currentDestinations.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-6 border border-amber-100">
              <Search size={32} />
            </div>
            <h3 className="text-2xl font-bold font-serif text-slate-900 mb-2">
              No destinations found
            </h3>
            <p className="text-slate-500 font-sans max-w-md">
              We couldn't find any locations matching "{searchQuery}". Try
              adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilter("All");
              }}
              className="mt-6 px-6 py-3 bg-white border border-slate-200 rounded-full font-bold text-sm tracking-widest uppercase text-slate-700 hover:border-amber-500 hover:text-amber-600 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentDestinations.map((dest, idx) => (
            <ScrollAnimate
              key={dest.slug || dest._id || dest.id || idx}
              animation="fade-up"
              delay={(idx % 3) * 150}
              className="group cursor-pointer"
            >
              <Link href={`/destinations/${dest.slug || dest._id || dest.id}`} className="block">
                <div className="relative h-[480px] rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-xl shadow-slate-200/50 group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-700">
                  {/* Image Background */}
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    onError={onImageError}
                  />
                  {/* Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-950/90 transition-opacity duration-500 group-hover:opacity-80"></div>
                  <div className="absolute inset-0 bg-amber-900/40 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  {/* Top Tags */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
                    <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2 shadow-sm">
                      {dest.icon} {dest.tag}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-4 group-hover:translate-x-0 shadow-sm">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform transition-transform duration-500 translate-y-6 group-hover:translate-y-0">
                    <div className="flex items-center gap-2 mb-2 text-white/90">
                      <MapPin size={14} className="text-amber-400" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                        {dest.count}
                      </span>
                    </div>

                    <h3 className="text-4xl font-bold tracking-tight mb-3 font-serif text-white drop-shadow-lg">
                      {dest.name}
                    </h3>

                    {/* Hidden Description Revealed on Hover */}
                    <div className="h-0 opacity-0 group-hover:h-[60px] group-hover:opacity-100 group-hover:mt-2 transition-all duration-500 overflow-hidden">
                      <p className="text-slate-200 text-sm font-medium leading-relaxed font-sans line-clamp-2">
                        {dest.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollAnimate>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <ScrollAnimate animation="fade-in" delay={200}>
            <div className="mt-20 flex justify-center items-center gap-6 font-sans">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center bg-white text-slate-600 shadow-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 hover:shadow-lg transition-all disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-600 disabled:hover:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed group"
              >
                <ChevronLeft
                  size={24}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </button>

              <div className="flex flex-col items-center justify-center">
                <span className="font-bold text-slate-900 text-sm tracking-widest uppercase">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex gap-1.5 mt-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-500 ${currentPage === i + 1 ? "w-6 bg-amber-500" : "w-1.5 bg-slate-200"}`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center bg-white text-slate-600 shadow-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 hover:shadow-lg transition-all disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-600 disabled:hover:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed group"
              >
                <ChevronRight
                  size={24}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </ScrollAnimate>
        )}
      </div>
    </section>
  );
}

