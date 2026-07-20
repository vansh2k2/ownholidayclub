"use client";
import React from "react";
import {
  Instagram,
  ArrowUpRight,
  Camera,
  Sparkles,
  Share2,
} from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

const galleryImages = [
  [
    {
      src: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&w=800&q=80",
      height: "h-[300px]",
      tag: "Resort Life",
    },
    {
      src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      height: "h-[500px]",
      tag: "Serenity",
    },
  ],
  [
    {
      src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
      height: "h-[500px]",
      tag: "Infinity Pool",
    },
    {
      src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      height: "h-[350px]",
      tag: "Sunsets",
    },
  ],
  [
    {
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      height: "h-[400px]",
      tag: "Architecture",
    },
    {
      src: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&w=800&q=80",
      height: "h-[450px]",
      tag: "Wellness",
    },
  ],
  [
    {
      src: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80",
      height: "h-[500px]",
      tag: "Coastal",
    },
    {
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      height: "h-[300px]",
      tag: "Paradise",
    },
  ],
];

export default function App() {
  return (
    <div className="bg-slate-50 font-sans text-slate-900 overflow-x-hidden min-h-screen selection:bg-amber-100 selection:text-amber-900">
      {/* Advanced Gallery Section - Amber Theme */}
      <section className="py-24 md:py-40 relative overflow-hidden">
        {/* Dynamic Background Elements (Soft Amber Glows) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-5%] left-[-10%] w-[60%] h-[60%] bg-amber-100/50 rounded-full blur-[140px] animate-pulse" />
          <div
            className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-amber-50/40 rounded-full blur-[140px] animate-pulse"
            style={{ animationDuration: "8s" }}
          />

          {/* Subtle Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.4] mix-blend-multiply"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          {/* Header Content */}
          <div className="mb-24 flex flex-col items-center text-center">
            <ScrollAnimate variant="homeGallery" animation="fade-up">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8 group hover:border-amber-400 transition-colors duration-500 cursor-default">
                <Sparkles
                  size={16}
                  className="text-amber-500 group-hover:animate-spin"
                />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 font-sans">
                  Curated Experiences
                </span>
              </div>

              <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9] font-serif">
                Moments Worth <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400">
                  Rediscovering.
                </span>
              </h1>

              <p className="text-slate-500 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light font-sans">
                Explore a visual journey through our global retreats.{" "}
                <br className="hidden md:block" />
                Join the legacy using{" "}
                <span className="text-amber-500 font-semibold">
                  #OwnHolidayClub
                </span>
              </p>
            </ScrollAnimate>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {galleryImages.map((column, colIndex) => (
              <div
                key={colIndex}
                className={`flex flex-col gap-4 md:gap-8 ${colIndex % 2 !== 0 ? "md:mt-24" : "md:-mt-12"}`}
              >
                {column.map((img, imgIndex) => (
                  <ScrollAnimate
                    variant="homeGallery"
                    key={imgIndex}
                    animation="zoom-in"
                    delay={(colIndex + imgIndex) * 80}
                    className="group relative rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(245,158,11,0.15)] transition-all duration-700 bg-white"
                  >
                    <div
                      className={`${img.height} w-full relative transform-gpu overflow-hidden`}
                    >
                      {/* Image Layer */}
                      <img
                        src={img.src}
                        className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                        alt={img.tag}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80";
                        }}
                      />

                      {/* Glass Overlay (Amber Theme) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex flex-col justify-end p-6 md:p-10">
                        <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                          <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 block font-sans">
                            {img.tag}
                          </span>
                          <div className="flex items-center justify-between">
                            <h3 className="text-slate-900 text-xl md:text-2xl font-bold tracking-tight font-serif">
                              Luxury Escape
                            </h3>
                            <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-slate-900 transition-colors cursor-pointer shadow-lg shadow-amber-200">
                              <ArrowUpRight size={20} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Floating Badge (Amber Theme) */}
                      <div className="absolute top-4 left-4 md:top-8 md:left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <div className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/50 shadow-sm flex items-center gap-2">
                          <Camera size={14} className="text-amber-500" />
                          <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tighter font-sans">
                            Verified Stay
                          </span>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimate>
                ))}
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-32 flex flex-col md:flex-row items-center justify-center gap-6">
            <ScrollAnimate variant="homeGallery" animation="fade-up" delay={200}>
              <button className="group relative px-12 py-6 bg-amber-500 rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(245,158,11,0.3)] hover:-translate-y-1">
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <div className="relative flex items-center gap-3 text-white font-bold uppercase tracking-widest text-sm font-sans">
                  <Instagram size={18} />
                  Follow On Social
                </div>
              </button>
            </ScrollAnimate>

            <ScrollAnimate variant="homeGallery" animation="fade-up" delay={300}>
              <button className="px-12 py-6 bg-white border border-slate-200 rounded-full text-slate-600 font-bold uppercase tracking-widest text-sm hover:border-amber-500 hover:text-amber-500 transition-all duration-500 flex items-center gap-3 hover:-translate-y-1 shadow-sm font-sans">
                <Share2 size={18} />
                Invite Friends
              </button>
            </ScrollAnimate>
          </div>
        </div>

        {/* Decorative Vertical Accents */}
        <div
          className="absolute bottom-20 left-10 hidden lg:block opacity-30 animate-bounce"
          style={{ animationDuration: "4s" }}
        >
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-amber-400 to-transparent" />
        </div>
        <div
          className="absolute top-40 right-20 hidden lg:block opacity-30 animate-bounce"
          style={{ animationDuration: "6s" }}
        >
          <div className="w-px h-32 bg-gradient-to-b from-transparent via-amber-500 to-transparent" />
        </div>
      </section>
    </div>
  );
}
