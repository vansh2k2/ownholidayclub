"use client";

import React from "react";
import { Mail } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function Newsletter() {
  return (
    <section className="py-32 bg-slate-950 text-white relative overflow-hidden rounded-[4rem] md:rounded-[6rem] mx-4 md:mx-8 my-12 z-20 shadow-2xl">
      <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-screen pointer-events-none z-10"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-6 relative z-20 text-center">
        <ScrollAnimate animation="fade-up">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 shadow-sm mb-8 backdrop-blur-md">
            <Mail size={14} className="text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
              Join the Inner Circle
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black font-serif mb-6 leading-tight">
            Inspire Your Next <br />
            <span className="text-amber-500 italic font-light">Journey.</span>
          </h2>

          <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-sans mb-12 max-w-2xl mx-auto">
            Subscribe to our exclusive newsletter to receive curated travel
            guides, secret resort reveals, and premier event planning tips
            directly in your inbox.
          </p>

          <form
            className="max-w-xl mx-auto relative group"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address..."
              className="w-full pl-8 pr-40 py-5 rounded-full bg-white/5 border border-white/20 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-sans text-lg backdrop-blur-md"
              required
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-amber-500 text-white px-8 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors shadow-lg flex items-center gap-2"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-6 text-slate-500 text-xs font-sans">
            By subscribing, you agree to our Privacy Policy. No spam, just pure
            wanderlust.
          </p>
        </ScrollAnimate>
      </div>
    </section>
  );
}
