"use client";

import React from "react";
import { Calendar, Heart, Shield, Clock } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function QuickFacts({ serviceData, selectedSubEvent }) {
  const facts = [
    {
      label: "Duration",
      value: serviceData.quickFacts?.duration || "Customizable",
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      label: "Category",
      value: selectedSubEvent || serviceData.category || "Premium",
      icon: Heart,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      label: "Service Type",
      value: serviceData.type || "Full Execution",
      icon: Shield,
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      label: "Planning",
      value: serviceData.quickFacts?.planning || "End-to-end",
      icon: Calendar,
      color: "text-indigo-500",
      bg: "bg-indigo-50"
    }
  ];

  return (
    <div className="relative z-30 site-width mx-auto -mt-12 md:-mt-16 mb-16 px-4 md:px-12">
      <ScrollAnimate variant="homeDestination">
        <div className="bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-200">
            {facts.map((fact, index) => (
              <div key={index} className="p-5 md:p-6 flex items-center gap-4 group hover:bg-slate-50 transition-colors duration-300">
                <div className={`w-10 h-10 ${fact.bg} ${fact.color} rounded flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}>
                  <fact.icon size={18} strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-black mb-0.5 font-sans">
                    {fact.label}
                  </p>
                  <p 
                    className="text-xs md:text-sm font-semibold text-slate-800 truncate"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {fact.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollAnimate>
    </div>
  );
}
