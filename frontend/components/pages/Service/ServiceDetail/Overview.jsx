"use client";

import React from "react";
import {
  CheckCircle2,
  Settings,
  Sparkles,
  Zap,
  ShieldCheck,
  Award,
} from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function Overview({ serviceData }) {
  return (
    <section className="pt-4 pb-10 md:pt-8 md:pb-16 relative bg-white">
      <div className="site-width mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7">
            <ScrollAnimate animation="reveal-left">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
                <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-[10px]">
                  The Experience
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-[1.1] mb-8 font-serif text-slate-900">
                Experience the <br />
                <span className="text-amber-500 italic font-light">
                  Pinnacle
                </span>{" "}
                of Professionalism
              </h2>

              <div 
                className="text-lg text-slate-600 font-light leading-relaxed rich-text-content text-justify" 
                dangerouslySetInnerHTML={{ __html: serviceData.fullDescription || serviceData.description || "" }} 
              />
            </ScrollAnimate>
          </div>

          <div className="lg:col-span-5">
            <ScrollAnimate animation="reveal-right" delay={200}>
              <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100">
                <h3 className="text-2xl font-bold font-serif mb-8 flex items-center gap-3">
                  <Sparkles className="text-amber-500" /> Key Highlights
                </h3>

                <div className="space-y-6 mb-10">
                  {serviceData.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <CheckCircle2
                        className="text-amber-500 shrink-0 mt-1"
                        size={20}
                      />
                      <span className="font-bold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>

                <hr className="border-slate-200 mb-8" />

                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
                  Our Standards
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <ShieldCheck size={16} />, label: "Full Secure" },
                    { icon: <Zap size={16} />, label: "Fast Delivery" },
                    { icon: <Settings size={16} />, label: "Customizable" },
                    { icon: <Award size={16} />, label: "VIP Quality" },
                  ].map((amenity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-slate-600"
                    >
                      <div className="text-slate-400">{amenity.icon}</div>
                      <span className="text-sm font-semibold">
                        {amenity.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </div>
    </section>
  );
}
