"use client";

import React from "react";
import {
  Calendar,
  Camera,
  Music,
  Sparkles,
  Users,
  Utensils,
} from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function ServiceExpertiseSection({ onImageError }) {
  return (
    <section className="py-32 bg-slate-950 text-white relative overflow-hidden rounded-[4rem] md:rounded-[6rem] mx-4 md:mx-8 z-20 shadow-2xl">
      <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-screen pointer-events-none z-10"></div>
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="site-width mx-auto relative z-20">
        <div className="text-center mb-20">
          <ScrollAnimate animation="fade-up">
            <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-[10px] font-sans mb-4 block">
              How We Deliver
            </span>
            <h2 className="text-4xl md:text-6xl font-black font-serif mb-6 leading-none">
              Comprehensive{" "}
              <span className="text-amber-500 italic font-light">
                Expertise
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-sans">
              Our in-house specialists meticulously craft every element of your
              event, ensuring flawless execution from concept to conclusion.
            </p>
          </ScrollAnimate>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[240px]">
          {/* Planning & Management (Large Block) */}
          <ScrollAnimate
            animation="fade-up"
            delay={0}
            className="md:col-span-2 lg:col-span-2 row-span-2 group"
          >
            <div className="h-full bg-slate-900 border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden hover:border-amber-500/30 transition-all duration-500 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
                alt="Planning Background"
                className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700 z-0"
                onError={onImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 to-slate-900/50 z-0"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none translate-x-1/2 -translate-y-1/2 z-0" />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 text-amber-500 flex items-center justify-center mb-8 border border-white/5 backdrop-blur-md shadow-lg">
                  <Calendar size={28} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold font-serif mb-4 text-white">
                    Planning & Management
                  </h3>
                  <p className="text-slate-300 font-sans leading-relaxed">
                    End-to-end event conceptualization, budgeting, and
                    execution. Our dedicated managers act as your single point
                    of contact, coordinating every moving piece seamlessly.
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimate>

          {/* Theme & Decor */}
          <ScrollAnimate
            animation="fade-up"
            delay={100}
            className="md:col-span-1 lg:col-span-2 row-span-1 group"
          >
            <div className="h-full bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 flex items-center gap-6 hover:border-amber-500/30 transition-colors duration-500 relative overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80"
                alt="Decor Background"
                className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700 z-0"
                onError={onImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-slate-900/60 z-0"></div>

              <div className="relative z-10 flex items-center gap-6">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-800/80 border border-white/5 text-white flex items-center justify-center group-hover:text-amber-400 group-hover:border-amber-500/30 transition-colors backdrop-blur-md shadow-lg">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif mb-2 text-white">
                    Theme & Decor
                  </h3>
                  <p className="text-slate-400 font-sans text-sm">
                    Bespoke spatial design, floral arrangements, and atmospheric
                    lighting.
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimate>

          {/* Hospitality & Guests */}
          <ScrollAnimate
            animation="fade-up"
            delay={200}
            className="md:col-span-1 lg:col-span-1 row-span-1 group"
          >
            <div className="h-full bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-center hover:border-amber-500/30 transition-colors duration-500 relative overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
                alt="Hospitality Background"
                className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700 z-0"
                onError={onImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-slate-900/60 z-0"></div>

              <div className="relative z-10">
                <Users size={28} className="text-amber-500 mb-4" />
                <h3 className="text-xl font-bold font-serif mb-2 text-white">
                  Hospitality
                </h3>
                <p className="text-slate-400 font-sans text-sm">
                  VIP guest management and logistics.
                </p>
              </div>
            </div>
          </ScrollAnimate>

          {/* Entertainment */}
          <ScrollAnimate
            animation="fade-up"
            delay={300}
            className="md:col-span-1 lg:col-span-1 row-span-1 group"
          >
            <div className="h-full bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-center hover:border-amber-500/30 transition-colors duration-500 relative overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"
                alt="Entertainment Background"
                className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-[0.15] transition-opacity duration-700 z-0"
                onError={onImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-slate-900/60 z-0"></div>

              <div className="relative z-10">
                <Music size={28} className="text-amber-500 mb-4" />
                <h3 className="text-xl font-bold font-serif mb-2 text-white">
                  Entertainment
                </h3>
                <p className="text-slate-400 font-sans text-sm">
                  Live bands, artists, and DJ curation.
                </p>
              </div>
            </div>
          </ScrollAnimate>

          {/* Photography & Videography */}
          <ScrollAnimate
            animation="fade-up"
            delay={400}
            className="md:col-span-1 lg:col-span-2 row-span-1 group"
          >
            <div className="h-full bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 flex items-center gap-6 hover:border-amber-500/30 transition-colors duration-500 relative overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1520390116089-6bd686d1cc57?auto=format&fit=crop&w=800&q=80"
                alt="Photo Background"
                className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-[0.15] transition-opacity duration-700 z-0"
                onError={onImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-slate-900/60 z-0"></div>

              <div className="relative z-10 flex items-center gap-6">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-800/80 border border-white/5 text-white flex items-center justify-center group-hover:text-amber-400 group-hover:border-amber-500/30 transition-colors backdrop-blur-md shadow-lg">
                  <Camera size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif mb-2 text-white">
                    Photo & Videography
                  </h3>
                  <p className="text-slate-400 font-sans text-sm">
                    Cinematic storytelling capturing every emotion and milestone
                    in stunning detail.
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimate>

          {/* Catering Services */}
          <ScrollAnimate
            animation="fade-up"
            delay={500}
            className="md:col-span-1 lg:col-span-2 row-span-1 group relative overflow-hidden"
          >
            <div className="h-full bg-slate-900 border border-white/10 rounded-[2.5rem] relative overflow-hidden hover:border-amber-500/30 transition-colors duration-500 shadow-xl">
              <div className="absolute inset-0 bg-amber-900/80 mix-blend-multiply z-10 transition-colors duration-500 group-hover:bg-amber-800/80"></div>
              <img
                src="https://images.unsplash.com/photo-1414235077428-338988a2e8c0?auto=format&fit=crop&w=800&q=80"
                alt="Catering Background"
                className="absolute inset-0 w-full h-full object-cover opacity-60 z-0 group-hover:scale-105 transition-transform duration-1000"
                onError={onImageError}
              />

              <div className="relative z-20 h-full p-8 flex items-center gap-6">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/10 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg">
                  <Utensils size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-white mb-2">
                    Gourmet Catering
                  </h3>
                  <p className="text-white/90 font-sans text-sm font-medium">
                    Global cuisines curated by master chefs.
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  );
}

