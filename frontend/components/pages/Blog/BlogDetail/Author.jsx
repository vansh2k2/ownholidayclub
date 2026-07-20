"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function Author({ articleData }) {
  return (
    <section className="py-16 bg-[#FDFDFD]">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollAnimate animation="fade-in">
          <div className="bg-slate-50 border border-slate-100 rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-xl shadow-slate-200/40">
            <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={articleData.author.image}
                alt={articleData.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left flex-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2 block">
                Written By
              </span>
              <h3 className="text-2xl font-bold font-serif text-slate-900 mb-1">
                {articleData.author.name}
              </h3>
              <p className="text-sm font-bold text-slate-500 mb-4 font-sans">
                {articleData.author.role}
              </p>
              <p className="text-slate-600 leading-relaxed font-sans mb-6">
                {articleData.author.bio}
              </p>
              <button className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 hover:text-amber-600 transition-colors border-b-2 border-amber-500 pb-1">
                More From {articleData.author.name.split(" ")[0]} <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
