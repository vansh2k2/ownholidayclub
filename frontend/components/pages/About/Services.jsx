"use client";

import React from "react";
import {
  Briefcase,
  Camera,
  CheckCircle2,
  Heart,
  Music,
  Plane,
  Sparkles,
  Users,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function Services() {
  return (
    <section className="py-32 bg-slate-50 relative z-10 border-b border-slate-200">
      <div className="site-width mx-auto">
        <div className="text-center mb-20">
          <ScrollAnimate animation="fade-up">
            <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-[10px] font-sans mb-4 block">
              Portfolio
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 font-serif mb-6 leading-none">
              Services &{" "}
              <span className="text-amber-500 italic font-light">
                Expertise
              </span>
            </h2>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto font-sans">
              Extending our wings since 2012, we have created an array of services to cater to your needs.
            </p>
          </ScrollAnimate>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[auto] gap-6">
          {/* Main Travel Block */}
          <ScrollAnimate animation="fade-up" className="md:col-span-8 group">
            <div className="h-full bg-white rounded-[3rem] p-10 md:p-16 border border-slate-200 shadow-lg shadow-slate-200/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-8 border border-amber-100 group-hover:scale-105 transition-transform duration-500">
                  <Plane size={28} />
                </div>
                <h3 className="text-4xl font-black font-serif text-slate-900 mb-8">
                  Travel & Memberships
                </h3>

                <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12 font-sans">
                  {[
                    "Membership",
                    "Domestic Holidays",
                    "International Holidays",
                    "Hotels, Resorts, Club Promotions",
                    "Outings",
                  ].map((service, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 text-slate-600 font-medium text-lg"
                    >
                      <CheckCircle2
                        size={20}
                        className="text-amber-500 shrink-0 mt-1"
                      />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimate>

          {/* Accent Block: What We Do (Visual) */}
          <ScrollAnimate
            animation="fade-up"
            delay={150}
            className="md:col-span-4 group relative rounded-[3rem] overflow-hidden shadow-xl min-h-[400px]"
          >
            <img
              src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80"
              alt="Celebration"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <Heart className="text-amber-400 mb-4" size={32} />
              <h3 className="text-3xl font-black font-serif text-white mb-2">
                Events & Celebrations
              </h3>
              <p className="text-slate-300 font-sans">
                Making every milestone monumental.
              </p>
            </div>
          </ScrollAnimate>

          {/* Tags / Sub-services Block */}
          <ScrollAnimate
            animation="fade-up"
            delay={100}
            className="md:col-span-12"
          >
            <div className="bg-slate-900 rounded-[3rem] p-10 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-screen pointer-events-none"></div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
                <div className="flex-1">
                  <h4 className="text-sm font-black uppercase tracking-[0.3em] text-amber-500 mb-6 font-sans">
                    Our Expertise Grid
                  </h4>
                  <div className="flex flex-wrap gap-4 font-sans">
                    {[
                      { name: "Wedding Planning", url: "/services/weddings" },
                      { name: "Corporate Events", url: "/services/corporate-events" },
                      { name: "Destination Weddings", url: "/services/destination-weddings" },
                      { name: "Parties", url: "/services/private-parties" },
                    ].map((tag, i) => (
                      <Link
                        key={i}
                        href={tag.url}
                        className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold text-white border border-white/20 hover:bg-amber-500 hover:border-amber-500 transition-colors cursor-pointer"
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-px h-px md:h-32 bg-slate-700/50 shrink-0" />

                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6 font-sans">
                  {[
                    { text: "Planning", icon: <Briefcase size={20} /> },
                    { text: "Decor", icon: <Sparkles size={20} /> },
                    { text: "Entertainment", icon: <Music size={20} /> },
                    { text: "Hospitality", icon: <Users size={20} /> },
                    { text: "Photo/Video", icon: <Camera size={20} /> },
                    { text: "Catering", icon: <Utensils size={20} /> },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-2 text-slate-400 group cursor-default hover:text-white transition-colors"
                    >
                      <div className="text-amber-500/70 group-hover:text-amber-400 transition-colors">
                        {item.icon}
                      </div>
                      <span className="text-sm font-bold tracking-wide">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  );
}

