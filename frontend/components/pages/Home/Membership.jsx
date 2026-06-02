"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { UserPlus, BadgeCheck, CreditCard, Gift, Palmtree, Headphones, ShieldCheck, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────
   Scroll-in animation wrapper
───────────────────────────────────────── */
const ScrollAnimate = ({ children, delay = 0, className = "" }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const steps = [
  {
    num: "01",
    title: "CREATE YOUR ACCOUNT",
    desc: <>Sign up with your details<br />and create your secure<br />member account.</>,
    icon: <UserPlus strokeWidth={1.5} size={28} className="text-[#0A1628]" />,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=400",
  },
  {
    num: "02",
    title: <>CHOOSE YOUR<br />MEMBERSHIP</>,
    desc: <>Select the membership tier<br />that fits your travel goals<br />and lifestyle.</>,
    icon: <BadgeCheck strokeWidth={1.5} size={28} className="text-[#0A1628]" />,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=400",
  },
  {
    num: "03",
    title: <>COMPLETE YOUR<br />PAYMENT</>,
    desc: <>Secure your membership<br />with a simple and<br />safe payment process.</>,
    icon: <CreditCard strokeWidth={1.5} size={28} className="text-[#0A1628]" />,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=400",
  },
  {
    num: "04",
    title: <>UNLOCK EXCLUSIVE<br />BENEFITS</>,
    desc: <>Enjoy member-only rates,<br />special offers, and<br />priority services.</>,
    icon: <Gift strokeWidth={1.5} size={28} className="text-[#0A1628]" />,
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=400",
  },
  {
    num: "05",
    title: "START EXPLORING",
    desc: <>Book your dream getaways<br />and create memories that<br />last a lifetime.</>,
    icon: <Palmtree strokeWidth={1.5} size={28} className="text-[#0A1628]" />,
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=400",
  },
];

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function MembershipExplainer() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background: "#ffffff",
        padding: "60px 0 60px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">

        {/* ── HEADER ── */}
        <ScrollAnimate delay={0}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="w-12 border-b border-dashed border-[#F59E0B]"></div>
              <ArrowRight size={12} className="text-[#F59E0B] -ml-4" />
              <span className="text-[#F59E0B] text-[14px] font-bold uppercase tracking-[0.2em]">HOW TO</span>
              <ArrowRight size={12} className="text-[#F59E0B] -mr-4 rotate-180" />
              <div className="w-12 border-b border-dashed border-[#F59E0B]"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-4 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Become a <span className="text-[#F59E0B]">Member</span> <span className="inline-block transform -rotate-45 ml-2 text-[#0A1628]">✈</span>
            </h2>
            
            <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
              Select the membership that best fits your lifestyle and unlock unforgettable luxury experiences across India.
            </p>
          </div>
        </ScrollAnimate>

        {/* ── 5 STEPS GRID ── */}
        <div className="relative mb-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-3 lg:gap-4 relative z-10">
            {steps.map((step, i) => (
              <ScrollAnimate key={i} delay={100 + i * 80} className="relative group">
                
                {/* Dashed Arrow (Hidden on mobile, visible between cards on desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-[15%] -right-4 lg:-right-6 z-0 items-center justify-center w-8 lg:w-12">
                    <div className="w-full border-b-[1.5px] border-dashed border-[#F59E0B]"></div>
                    <ArrowRight size={14} className="text-[#F59E0B] absolute right-0 translate-x-1/2 bg-white" />
                  </div>
                )}

                {/* Card Container */}
                <div 
                  className="bg-white rounded-2xl flex flex-col h-[320px] relative mt-6 transition-transform duration-300 group-hover:-translate-y-2"
                  style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
                >
                  
                  {/* Floating Number & Icon */}
                  <div className="absolute left-1/2 -top-6 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-6 h-6 bg-[#0A1628] text-white text-[9px] font-bold rounded-full flex items-center justify-center mb-1 shadow-md">
                      {step.num}
                    </div>
                    <div className="w-14 h-14 bg-white border border-[#F59E0B] rounded-full flex items-center justify-center shadow-sm relative">
                      {step.icon}
                      {/* Subtle yellow accent behind icon */}
                      <div className="absolute inset-0 bg-[#F59E0B]/10 rounded-full"></div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="px-4 pt-20 pb-4 text-center flex-1 relative z-10">
                    <h3 className="text-[13px] font-bold text-[#0A1628] uppercase tracking-wider mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[12px] text-slate-700 leading-relaxed max-w-[180px] mx-auto">
                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom Image */}
                  <div className="h-[120px] w-full relative rounded-b-2xl overflow-hidden mt-auto">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>

        {/* ── BOTTOM BANNER ── */}
        <ScrollAnimate delay={400}>
          <div className="bg-[#FAF9F6] border border-amber-100/50 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm max-w-5xl mx-auto">
            
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 flex-1">
              {/* Support */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center">
                  <Headphones size={28} className="text-[#F59E0B]" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#0A1628]">Need Help?</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Our concierge team is here for you 24/7.</p>
                </div>
              </div>

              {/* Separator */}
              <div className="hidden md:block w-px h-8 bg-slate-200"></div>

              {/* Secure */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center">
                  <ShieldCheck size={28} className="text-[#F59E0B]" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#0A1628]">Safe & Secure</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Your information and payments are always protected.</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link 
              href="/membership" 
              className="bg-[#F59E0B] hover:bg-[#d98b09] text-white text-[10px] font-black uppercase tracking-wider px-6 py-3.5 rounded flex items-center gap-2 transition-colors shrink-0"
            >
              BECOME A MEMBER TODAY
              <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollAnimate>

      </div>
    </section>
  );
}