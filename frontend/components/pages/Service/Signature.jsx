"use client";

import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";
import Link from "next/link";

export default function ServiceSignatureSection({ services, onImageError }) {
  return (
    <section className="py-24 bg-transparent relative z-10">
      <div className="site-width mx-auto flex flex-col gap-32">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;

          return (
            <div className="">
              <Link href={`/services/${service.id}`}>
                <div
                  key={service.id}
                  className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center"
                >
                  {/* Image Side */}
                  <div
                    className={`lg:col-span-6 relative h-[500px] md:h-[650px] w-full ${isEven ? "order-1" : "order-1 lg:order-2"}`}
                  >
                    <ScrollAnimate
                      animation={isEven ? "reveal-left" : "reveal-right"}
                      className="w-full h-full"
                    >
                      <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl group border border-slate-200 bg-white p-2">
                        <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
                          <img
                            src={service.image}
                            className="w-full h-full object-cover transition-transform duration-[2000ms] scale-105 group-hover:scale-100"
                            alt={service.title}
                            onError={onImageError}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60"></div>

                          {/* Hover Overlay Icon */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-amber-900/20 mix-blend-overlay"></div>
                        </div>
                      </div>

                      {/* Floating Decorative Elements */}
                      <div
                        className={`absolute -bottom-8 ${isEven ? "-right-8" : "-left-8"} w-48 h-48 bg-amber-100 rounded-full blur-[60px] -z-10`}
                      ></div>
                      <div
                        className={`absolute top-12 ${isEven ? "-left-6" : "-right-6"} z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 animate-float`}
                      >
                        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                          {service.icon}
                        </div>
                      </div>
                    </ScrollAnimate>
                  </div>

                  {/* Text Side */}
                  <div
                    className={`lg:col-span-6 ${isEven ? "order-2" : "order-2 lg:order-1"}`}
                  >
                    <ScrollAnimate
                      animation={isEven ? "reveal-right" : "reveal-left"}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
                        <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-[10px] font-sans">
                          {service.subtitle}
                        </span>
                      </div>

                      <h2 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight mb-8 font-serif text-slate-900">
                        {service.title.split(" ")[0]} <br />
                        <span className="text-amber-500 italic font-light">
                          {service.title.split(" ").slice(1).join(" ")}
                        </span>
                      </h2>

                      <p className="text-slate-600 text-lg leading-relaxed font-sans mb-10 border-l-2 border-amber-500/30 pl-6">
                        {service.description}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-y-5 gap-x-8 font-sans mb-12">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle2
                              size={18}
                              className="text-amber-500 shrink-0 mt-0.5"
                            />
                            <span className="text-slate-700 font-medium text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                      <button className="group flex items-center gap-4 bg-transparent text-slate-900 hover:text-amber-600 transition-colors font-sans">
                        <span className="text-sm font-black uppercase tracking-[0.2em] border-b-2 border-amber-500 pb-1">
                          Explore Options
                        </span>
                        <div className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center group-hover:border-amber-500 transition-colors">
                          <ArrowRight size={16} />
                        </div>
                      </button>
                    </ScrollAnimate>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

