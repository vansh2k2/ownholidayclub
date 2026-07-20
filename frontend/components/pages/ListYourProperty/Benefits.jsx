"use client";

import React from "react";
import { Globe, ShieldCheck, Users } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function Benefits() {
  return (
    <section className="py-24 bg-white relative z-10 border-b border-slate-100">
      <div className="site-width mx-auto">
        <div className="text-center mb-16">
          <ScrollAnimate animation="fade-up">
            <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-[10px] font-sans mb-4 block">
              The Advantage
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-serif mb-4">
              Why Partner With{" "}
              <span className="text-amber-500 italic font-light">Us?</span>
            </h2>
          </ScrollAnimate>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Users size={28} />,
              title: "Elite Clientele",
              desc: "Gain direct access to an exclusive community of 70,000+ discerning travelers.",
              delay: 0,
            },
            {
              icon: <Globe size={28} />,
              title: "Global Marketing",
              desc: "Benefit from our multimillion-dollar marketing engine and private member portal.",
              delay: 150,
            },
            {
              icon: <ShieldCheck size={28} />,
              title: "Guaranteed Revenue",
              desc: "Stabilize your cash flow with consistent, reliable bookings year-round.",
              delay: 300,
            },
          ].map((benefit, idx) => (
            <ScrollAnimate
              key={idx}
              animation="fade-up"
              delay={benefit.delay}
              className="h-full"
            >
              <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-200 h-full hover:bg-white hover:shadow-xl hover:border-amber-200 transition-all duration-500 group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-amber-500 mb-8 group-hover:scale-110 group-hover:bg-amber-50 transition-all duration-500 shadow-sm">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold font-serif text-slate-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 font-sans leading-relaxed text-sm font-medium">
                  {benefit.desc}
                </p>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
}

