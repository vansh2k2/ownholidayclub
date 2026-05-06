"use client";

import React from "react";
import { Plus } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function Faq({ partnerFaqs, openFaq, setOpenFaq }) {
  return (
    <section className="py-24 bg-white relative pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <ScrollAnimate animation="fade-up">
            <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block font-sans border border-slate-200">
              Partner FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-serif">
              Common{" "}
              <span className="text-amber-500 italic font-light">
                Questions
              </span>
            </h2>
          </ScrollAnimate>
        </div>

        <div className="space-y-4 font-sans">
          {partnerFaqs.map((item, idx) => (
            <ScrollAnimate
              key={idx}
              animation="fade-up"
              delay={idx * 100}
              className={`transition-all duration-300 rounded-3xl border-2 ${
                openFaq === idx
                  ? "border-amber-500 bg-amber-50/30 shadow-md"
                  : "border-slate-100 bg-white hover:border-slate-200 shadow-sm"
              }`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full text-left p-6 md:p-8 flex items-center justify-between group"
              >
                <span
                  className={`text-lg md:text-xl font-bold transition-colors font-serif ${
                    openFaq === idx
                      ? "text-amber-700"
                      : "text-slate-700 group-hover:text-slate-900"
                  }`}
                >
                  {item.q}
                </span>
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    openFaq === idx
                      ? "bg-amber-500 text-white rotate-45"
                      : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                  }`}
                >
                  <Plus size={24} />
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 md:px-8 pb-8">
                  <div className="h-px bg-amber-200/50 mb-6"></div>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
}
