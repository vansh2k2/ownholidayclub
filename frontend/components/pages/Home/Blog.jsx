"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchBlogPosts } from "@/lib/blogs";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const posts = await fetchBlogPosts();
      setBlogPosts(posts.slice(0, 3));
    };
    loadPosts();
  }, []);

  if (blogPosts.length === 0) return null;

  return (
    <section
      style={{ background: "#fafaf8", padding: "64px 0" }}
      className="relative"
    >
      <div className="site-width mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header row ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-3">
              <div
                style={{ width: "22px", height: "2px", background: "#b45309", borderRadius: "2px", flexShrink: 0 }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "10px", fontWeight: 600,
                  color: "#b45309", textTransform: "uppercase",
                  letterSpacing: "0.18em",
                }}
              >
                Travel Journal
              </span>
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(24px, 3.5vw, 34px)",
                fontWeight: 700,
                color: "#0f172a",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Inspiring Your Next{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "#b45309" }}>
                Adventure.
              </em>
            </h2>
          </div>

          {/* View all — desktop */}
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 group flex-shrink-0"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px", fontWeight: 600,
              color: "#64748b", textTransform: "uppercase",
              letterSpacing: "0.12em", textDecoration: "none",
              paddingBottom: "2px",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#b45309")}
            onMouseLeave={e => (e.currentTarget.style.color = "#64748b")}
          >
            View All Posts
            <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogPosts.map((post, index) => (
            <ScrollAnimate
              key={post.id}
              animation="fade-up"
              delay={(index + 1) * 120}
              className="h-full"
            >
              <Link href={`/blog/${post.id}`} className="block h-full" style={{ textDecoration: "none" }}>
                <article
                  className="flex flex-col h-full group"
                  style={{
                    background: "#ffffff",
                    border: "0.5px solid #e5e5e2",
                    borderRadius: 0,
                    overflow: "hidden",
                    position: "relative",
                    transition: "box-shadow 0.25s, transform 0.25s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = "0 16px 40px -12px rgba(0,0,0,0.1)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Image */}
                  <div
                    style={{ position: "relative", height: "188px", overflow: "hidden", flexShrink: 0 }}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      style={{ transition: "transform 0.65s", display: "block" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    />
                    {/* Category pill */}
                    {post.category && (
                      <div
                        style={{
                          position: "absolute", top: "12px", left: "12px",
                          background: "rgba(255,255,255,0.96)",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "9px", fontWeight: 700,
                          textTransform: "uppercase", letterSpacing: "0.12em",
                          color: "#0f172a",
                          padding: "3px 10px",
                          borderRadius: 0,
                        }}
                      >
                        {post.category}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div
                    className="flex flex-col flex-1"
                    style={{ padding: "18px 16px 16px", position: "relative" }}
                  >
                    {/* Large ghost number */}
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute", top: "8px", right: "12px",
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "36px", fontWeight: 700,
                        color: "#f1ede4", lineHeight: 1,
                        pointerEvents: "none",
                        userSelect: "none",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Date */}
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "10px", fontWeight: 600,
                        color: "#94a3b8", textTransform: "uppercase",
                        letterSpacing: "0.1em", margin: "0 0 8px",
                      }}
                    >
                      {post.date}
                    </p>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "15px", fontWeight: 700,
                        color: "#0f172a", lineHeight: 1.35,
                        margin: "0 0 8px",
                        transition: "color 0.2s",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                      className="group-hover:text-amber-700"
                    >
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "11px", color: "#64748b",
                        lineHeight: 1.7, flex: 1,
                        margin: "0 0 14px",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div
                      style={{
                        display: "flex", alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "12px",
                        borderTop: "0.5px solid #f1ede8",
                      }}
                    >
                      <span
                        className="flex items-center gap-1.5"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "10px", fontWeight: 700,
                          color: "#b45309", textTransform: "uppercase",
                          letterSpacing: "0.12em",
                        }}
                      >
                        Read Story
                        <ArrowRight
                          size={11}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </ScrollAnimate>
          ))}
        </div>

        {/* View all — mobile */}
        <Link href="/blog" className="md:hidden block mt-8">
          <button
            className="w-full flex items-center justify-center gap-2"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.14em",
              color: "#64748b",
              padding: "13px 0",
              background: "transparent",
              border: "0.5px solid #e2e0da",
              borderRadius: 0,
              cursor: "pointer",
            }}
          >
            View All Posts <ArrowRight size={13} />
          </button>
        </Link>

      </div>
    </section>
  );
}