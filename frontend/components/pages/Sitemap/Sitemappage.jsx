import Link from "next/link";
import React from "react";

function formatDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function Sitemappage({ routes = [] }) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffaf0_0%,#ffffff_35%,#f8fafc_100%)] pt-28 pb-20 selection:bg-amber-100 selection:text-amber-900">
      <section className="mx-auto site-width">
        <div className="rounded-[2rem] border border-amber-200/60 bg-white/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur md:p-12">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-amber-600">
              Search-Friendly Navigation
            </p>
            <h1 className="font-serif text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Sitemap
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
              This page and the XML sitemap are generated from your current
              routes, so new public pages appear here automatically.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/sitemap.xml"
                className="inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-amber-600"
              >
                Open XML Sitemap
              </Link>
              <p className="text-sm text-slate-500">
                Search engines use
                <span className="mx-1 font-semibold text-slate-700">
                  /sitemap.xml
                </span>
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {routes.map((route) => (
              <Link
                key={route.route}
                href={route.route}
                className="group rounded-3xl border border-slate-200 bg-slate-50/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:bg-white hover:shadow-[0_18px_45px_rgba(245,158,11,0.14)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-bold text-slate-900">
                      {route.label}
                    </p>
                    <p className="mt-2 break-all text-sm text-slate-500">
                      {route.route}
                    </p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">
                    Page
                  </span>
                </div>

                <div className="mt-5 border-t border-slate-200 pt-4 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  Updated {formatDate(route.lastModified)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Sitemappage;

