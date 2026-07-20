"use client";

import React from "react";
import { Globe, Users, Calendar, CheckCircle2 } from "lucide-react";

// Mocking the ScrollAnimate component to ensure the file runs standalone
// If you have your own, you can replace this with: import ScrollAnimate from "@/components/common/ScrollAnimate";
const ScrollAnimate = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export default function StatsSection() {
  return (
    <section className="bg-white py-16 border-b border-slate-200 font-sans text-slate-900 overflow-hidden">
      <div className="site-width mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ScrollAnimate variant="homeStandard" animation="fade-up" delay={0}>
          <div className="h-full bg-gradient-to-br from-amber-50 to-white p-8 rounded-3xl flex flex-col items-center justify-center text-center border border-amber-100 shadow-sm transition-transform hover:scale-[1.02]">
            <Calendar className="text-amber-500 mb-4" size={32} />
            <h2 className="text-slate-900 text-5xl font-extrabold tracking-tight font-serif">
              Since
              <br />
              2012
            </h2>
            <p className="text-amber-600 mt-4 font-semibold uppercase tracking-wider text-sm font-sans">
              Own Holiday Club
            </p>
          </div>
        </ScrollAnimate>

        <ScrollAnimate variant="homeStandard" animation="zoom-in" delay={150}>
          <div className="relative rounded-3xl overflow-hidden h-[280px] group shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt="Holidays"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8">
              <span className="text-white font-bold text-xl tracking-wide flex items-center gap-2 font-serif">
                <CheckCircle2 size={20} className="text-amber-400" />
                Timeless Family Holidays
              </span>
            </div>
          </div>
        </ScrollAnimate>

        <ScrollAnimate variant="homeStandard" animation="fade-up" delay={300}>
          <div className="h-full bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-8">
              <div className="text-center flex-1">
                <div className="flex items-center justify-center gap-2 text-amber-500 mb-1">
                  <Users size={18} />
                  <span className="text-3xl font-bold text-slate-900 font-sans">
                    70k+
                  </span>
                </div>
                <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest font-sans">
                  Community
                </div>
              </div>
              <div className="w-px h-12 bg-slate-200 mx-4"></div>
              <div className="text-center flex-1">
                <div className="flex items-center justify-center gap-2 text-amber-500 mb-1">
                  <Globe size={18} />
                  <span className="text-3xl font-bold text-slate-900 font-sans">
                    1k+
                  </span>
                </div>
                <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest font-sans">
                  Resorts
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <div className="flex justify-between items-center">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm"
                    >
                      <img
                        src={`https://i.pravatar.cc/100?u=${i + 40}`}
                        alt="user"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  <div className="text-slate-900 text-xl font-black italic font-serif">
                    One Lakh +
                  </div>
                  <div className="text-amber-600 text-[10px] uppercase font-bold tracking-widest font-sans">
                    Happy Holidayers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}

