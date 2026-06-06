import React, { useEffect, useState } from "react";
import {
  Globe,
  ShieldCheck,
  Target,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// Injected advanced CSS animations
const PremiumStyles = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
    @keyframes shimmer {
      0% { background-position: 200% center; }
      100% { background-position: -200% center; }
    }
    .animate-shimmer {
      background-size: 200% auto;
      animation: shimmer 6s linear infinite;
    }
    @keyframes float-organic {
      0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
      33% { transform: translateY(-20px) rotate(2deg) scale(1.02); }
      66% { transform: translateY(10px) rotate(-1deg) scale(0.98); }
    }
    .animate-float-organic {
      animation: float-organic 8s ease-in-out infinite;
    }
    @keyframes glass-swipe {
      0% { left: -100%; }
      50%, 100% { left: 200%; }
    }
    .group:hover .glass-reflection {
      animation: glass-swipe 1.5s ease-in-out forwards;
    }
    @keyframes blob-spin {
      from { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(180deg) scale(1.2); }
      to { transform: rotate(360deg) scale(1); }
    }
    .animate-blob-spin {
      animation: blob-spin 20s infinite linear;
    }
  `,
    }}
  />
);

// Advanced Scroll Observer Hook (Mocked for immediate preview)
const ScrollAnimate = ({ children, animation, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulating intersection observer for standalone preview
    const timer = setTimeout(() => setIsVisible(true), 100 + delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const baseClasses =
    "transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)]";
  const variants = {
    "reveal-left": isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-12",
    "fade-up": isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-12",
    "scale-up": isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
  };

  return (
    <div className={`${baseClasses} ${variants[animation]} ${className}`}>
      {children}
    </div>
  );
};

export default function App() {
  return (
    <section className="py-32 bg-[#FAFAFA] text-slate-900 relative overflow-hidden rounded-t-[4rem] md:rounded-t-[6rem] -mt-12 z-20 shadow-[0_-30px_60px_rgba(0,0,0,0.04)] border-t border-white">
      <PremiumStyles />

      {/* Advanced Ambient Background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply pointer-events-none z-0"></div>

      {/* Animated Organic Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-amber-200/40 rounded-full blur-[120px] pointer-events-none animate-blob-spin origin-center z-0" />
      <div
        className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[100px] pointer-events-none animate-blob-spin origin-bottom-right shadow-2xl z-0"
        style={{ animationDirection: "reverse", animationDuration: "25s" }}
      />

      <div className="site-width mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Typography & Image */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <ScrollAnimate animation="reveal-left">
              {/* Premium Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8 hover:shadow-md transition-shadow duration-300 cursor-default">
                <Sparkles size={14} className="text-amber-500 animate-pulse" />
                <span className="text-slate-700 font-bold uppercase tracking-[0.2em] text-[10px] font-sans">
                  The Blueprint
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-black mb-8 font-serif leading-[0.95] tracking-tight text-slate-900">
                Beyond <br />
                <span className="inline-block mt-2  text-amber-500 italic font-serif">
                  Destinations.
                </span>
              </h2>

              <p className="text-slate-500 text-lg leading-relaxed max-w-md font-sans mb-12 relative">
                <span className="absolute -left-6 top-2 w-1.5 h-12 bg-gradient-to-b from-amber-400 to-transparent rounded-full" />
                We don't just book rooms; we architect memories. Our foundation
                is built on three unwavering principles that ensure your leisure
                is legendary.
              </p>

              {/* Enhanced Floating Visual Element */}
              <div className="relative max-w-[340px] hidden lg:block animate-float-organic">
                {/* 3D Glass Frame Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-white rounded-[2.5rem] translate-y-4 translate-x-4 blur-xl opacity-60"></div>

                <div className="rounded-[2.5rem] overflow-hidden border border-white/60 relative group bg-white shadow-2xl shadow-slate-300/60 p-2 z-10">
                  <div className="rounded-[2rem] overflow-hidden relative">
                    <div className="absolute inset-0 bg-amber-900/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-1000 z-10"></div>

                    {/* Glass swipe reflection */}
                    <div
                      className="glass-reflection absolute top-0 -bottom-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 z-20 pointer-events-none"
                      style={{ left: "-100%" }}
                    ></div>

                    <img
                      src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
                      alt="Architectural Design"
                      className="w-full aspect-[4/5] object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-[2000ms] scale-105 group-hover:scale-100"
                    />

                    {/* Premium Floating Inner Badge */}
                    <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-xl border border-white p-4 rounded-2xl z-30 flex items-center gap-4 transform translate-y-4 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 transition-all duration-700 shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
                      <div className="relative w-12 h-12 shrink-0">
                        <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-20"></div>
                        <div className="relative w-full h-full bg-gradient-to-br from-white to-slate-100 rounded-full flex items-center justify-center text-amber-600 border border-slate-200 shadow-sm">
                          <Globe
                            size={20}
                            className="group-hover:rotate-[360deg] transition-transform duration-[1500ms] ease-out"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-900 font-bold font-serif text-lg leading-tight">
                          Global Reach
                        </p>
                        <p className="text-amber-600 text-[10px] uppercase tracking-wider font-sans mt-0.5 font-bold">
                          Across Continents
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimate>
          </div>

          {/* Right Column: Advanced Interactive Cards */}
          <div className="lg:col-span-7 flex flex-col gap-8 relative z-20">
            {[
              {
                icon: <Users size={24} />,
                title: "Our Vision",
                subtitle: "An Extended Family",
                desc: "We plan to create not a clientele but an extended family by providing unforgettable experiences with nonmonetary value. To ensure the same, we have professionals who plan and execute everything flawlessly while keeping in mind your needs and pocket.",
              },
              {
                icon: <Target size={24} />,
                title: "Our Mission",
                subtitle: "Anecdotes in Your Life",
                desc: "We aim to create experiences that become anecdotes in your life. Keeping an eye for details and personalization, we strive to provide satiating experiences for each one of you, across the globe.",
              },
              {
                icon: <ShieldCheck size={24} />,
                title: "Our Promise",
                subtitle: "Dreams to Reality",
                desc: "We offer innovative and customized events planned extensively to leave a beautiful imprint on your mind. Focused on creating memorable experiences, we ensure that your dream transforms into reality. Whether you have a destination or theme in mind or not, our experts and selection of picturesque destinations will surely provide you with an experience of a lifetime!",
              },
            ].map((item, idx) => (
              <ScrollAnimate key={idx} animation="fade-up" delay={idx * 200}>
                <div className="group relative bg-white/60 backdrop-blur-3xl border border-white p-8 md:p-10 rounded-[2.5rem] overflow-hidden transition-all duration-700 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(245,158,11,0.1)] hover:-translate-y-2">
                  {/* Subtle Card Background Image Reveal */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000 mix-blend-luminosity"></div>

                  {/* Dynamic Gradient Border Reveal */}
                  <div className="absolute inset-0 rounded-[2.5rem] border-2 border-transparent group-hover:border-amber-400/20 transition-colors duration-700"></div>

                  {/* Left Accent Bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-400 to-amber-600 rounded-r-full scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />

                  <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                    {/* Advanced Icon Container */}
                    <div className="relative shrink-0 perspective-1000">
                      <div className="w-16 h-16 rounded-[1.25rem] bg-white border border-slate-100 text-slate-400 flex items-center justify-center group-hover:text-amber-600 transition-all duration-700 shadow-sm group-hover:shadow-amber-500/20 relative z-10 transform-style-3d group-hover:rotate-y-12 group-hover:-rotate-x-12">
                        {/* Inner gradient that fades in */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white opacity-0 group-hover:opacity-100 rounded-[1.25rem] transition-opacity duration-500"></div>
                        <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                          {item.icon}
                        </div>
                      </div>
                      <div className="absolute -inset-2 bg-amber-400/20 rounded-[1.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-90 group-hover:scale-100" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 transform group-hover:translate-x-2 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600/80 block group-hover:text-amber-600 transition-colors">
                          {item.subtitle}
                        </span>
                        <div className="h-px bg-slate-200 flex-1 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700"></div>
                        <ArrowRight className="w-4 h-4 text-amber-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700" />
                      </div>

                      <h3 className="text-3xl font-bold font-serif mb-4 text-slate-900 group-hover:text-amber-700 transition-colors duration-500">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 leading-relaxed font-sans text-base">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollAnimate>
            ))}

            {/* Stats Block - Origin Style */}
            <ScrollAnimate animation="fade-up" delay={600}>
              <div
                className="flex flex-wrap items-center justify-end gap-4 pt-5 mt-4"
                style={{ borderTop: "1px solid rgba(203,213,225,0.45)" }}
              >
                <div className="flex">
                  {[16, 17, 18].map((u, i) => (
                    <div
                      key={u}
                      className="overflow-hidden rounded-full"
                      style={{ width: 32, height: 32, border: "2px solid white", marginLeft: i === 0 ? 0 : -8 }}
                    >
                      <img src={`https://i.pravatar.cc/100?u=${u}`} alt="Member" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                {[{ num: "70,000+", lbl: "Members" }, { num: "12+", lbl: "Years Active" }, { num: "500+", lbl: "Properties" }].map((s, i) => (
                  <React.Fragment key={s.lbl}>
                    {i > 0 && <div style={{ width: 1, height: 32, background: "rgba(203,213,225,0.5)", flexShrink: 0 }} />}
                    <div className="text-left">
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "#0f172a", lineHeight: 1, marginBottom: 3 }}>{s.num}</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: "#b45309" }}>{s.lbl}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </div>
    </section>
  );
}

