"use client";

import React from "react";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function Body({ articleData }) {
  const contentMarkup = articleData.content || `<p>${articleData.excerpt}</p>`;

  return (
    <section className="py-20 md:py-32 relative bg-white">
      <div className="hidden xl:flex flex-col gap-4 absolute top-32 left-12 sticky-share">
        <div
          className="text-[9px] font-black uppercase tracking-widest text-slate-400 rotate-180"
          style={{ writingMode: "vertical-rl" }}
        >
          Share Story
        </div>
        <div className="w-px h-12 bg-slate-200 mx-auto my-2"></div>
        <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-amber-500 hover:border-amber-500 transition-colors">
          <Twitter size={16} />
        </button>
        <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-amber-500 hover:border-amber-500 transition-colors">
          <Facebook size={16} />
        </button>
        <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-amber-500 hover:border-amber-500 transition-colors">
          <Linkedin size={16} />
        </button>
      </div>

      <div className="max-w-[720px] mx-auto px-6">
        <ScrollAnimate animation="fade-up" delay={200}>
          <p className="text-2xl md:text-3xl font-serif italic text-slate-600 leading-relaxed mb-16 text-center">
            "{articleData.excerpt}"
          </p>

          <div
            className="article-body text-lg md:text-xl text-slate-700 leading-loose font-sans font-light"
            dangerouslySetInnerHTML={{ __html: contentMarkup }}
          />

          <style jsx>{`
            .article-body :global(p) {
              margin-bottom: 1.75rem;
            }

            .article-body :global(h2),
            .article-body :global(h3),
            .article-body :global(h4) {
              color: rgb(15 23 42);
              font-family: serif;
              font-weight: 700;
              line-height: 1.2;
              margin-top: 3.5rem;
              margin-bottom: 1.25rem;
            }

            .article-body :global(h2) {
              font-size: 2rem;
            }

            .article-body :global(h3) {
              font-size: 1.65rem;
            }

            .article-body :global(h4) {
              font-size: 1.3rem;
            }

            .article-body :global(ul),
            .article-body :global(ol) {
              margin: 1.5rem 0;
              padding-left: 1.5rem;
            }

            .article-body :global(li) {
              margin-bottom: 0.75rem;
            }

            .article-body :global(a) {
              color: rgb(217 119 6);
              text-decoration: underline;
              text-underline-offset: 0.18em;
            }

            .article-body :global(img) {
              width: 100%;
              height: auto;
              border-radius: 1.5rem;
              margin: 2rem 0;
            }
          `}</style>

          <div className="mt-20 pt-10 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {articleData.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Share:
              </span>
              <button className="text-slate-400 hover:text-amber-500 transition-colors">
                <Twitter size={18} />
              </button>
              <button className="text-slate-400 hover:text-amber-500 transition-colors">
                <Facebook size={18} />
              </button>
              <button className="text-slate-400 hover:text-amber-500 transition-colors">
                <Linkedin size={18} />
              </button>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
