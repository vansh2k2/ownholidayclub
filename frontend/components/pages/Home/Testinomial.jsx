"use client";

import React, { useState } from "react";
import { MapPin, Star } from "lucide-react";

const testimonialPages = [
  [
    {
      tag: "Family Travel",
      quote:
        "Every trip used to feel overwhelming — bookings, calls, comparisons. Own Holiday Club made it all sorted. Great property options for the whole family.",
      name: "Neha Arora",
      location: "Delhi",
      gradient: ["#0F6E56", "#085041"],
    },
    {
      tag: "Easy Planning",
      quote:
        "I only wanted proper service and clear responses. Team explained everything simply and our Manali stay was comfortable for the full family.",
      name: "Rohit Bansal",
      location: "Faridabad",
      gradient: ["#185FA5", "#0C447C"],
    },
    {
      tag: "Couples Escape",
      quote:
        "Both of us are working so planning every detail is tough. The experience felt smooth from start to finish, and the property was clean and nice.",
      name: "Pooja Malhotra",
      location: "Gurgaon",
      gradient: ["#993556", "#72243E"],
    },
    {
      tag: "Solo Explorer",
      quote:
        "Didn't expect this level of support. Got a customised Rajasthan itinerary in 24 hours. Everything was exactly as described on arrival.",
      name: "Aarav Sharma",
      location: "Noida",
      gradient: ["#854F0B", "#633806"],
    },
  ],
  [
    {
      tag: "Honeymoon",
      quote:
        "Our Kerala backwaters trip was absolutely perfect. Every detail was taken care of without us having to chase anyone. Truly memorable start.",
      name: "Priya & Karan",
      location: "Mumbai",
      gradient: ["#993556", "#72243E"],
    },
    {
      tag: "Group Trip",
      quote:
        "Planned a Goa trip for 12 friends through the membership. No one fights over bookings anymore. Smooth, hassle-free, and great value overall.",
      name: "Deepak Verma",
      location: "Pune",
      gradient: ["#185FA5", "#0C447C"],
    },
    {
      tag: "Senior Travel",
      quote:
        "We are in our 60s and needed extra support. The team was patient, explained slowly, and the Shimla property was accessible and comfortable.",
      name: "S. K. Gupta",
      location: "Lucknow",
      gradient: ["#0F6E56", "#085041"],
    },
    {
      tag: "Weekend Getaway",
      quote:
        "Even for a short 2-night trip the process was seamless. Found a lovely resort near Jaipur that we never would have discovered on our own.",
      name: "Megha Joshi",
      location: "Jaipur",
      gradient: ["#854F0B", "#633806"],
    },
  ],
];

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
}

function TestimonialCard({ card }) {
  return (
    <div className="flex flex-col bg-white border border-gray-100 rounded-2xl p-4 gap-3 h-full shadow-sm">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{ background: "#FAEEDA", color: "#854F0B" }}
        >
          {card.tag}
        </span>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={11} fill="#BA7517" color="#BA7517" />
          ))}
        </div>
      </div>

      {/* Quote block */}
      <div
        className="rounded-r-lg px-3 py-2.5 flex-1"
        style={{
          borderLeft: "2px solid #BA7517",
          background: "rgba(250,238,218,0.25)",
        }}
      >
        <span
          className="block text-2xl leading-none mb-1 font-serif"
          style={{ color: "#BA7517", opacity: 0.35 }}
        >
          "
        </span>
        <p className="text-xs text-gray-500 leading-relaxed italic">
          {card.quote}"
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-2.5 pt-2 border-t border-gray-100">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${card.gradient[0]}, ${card.gradient[1]})`,
          }}
        >
          {getInitials(card.name)}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800 leading-tight">
            {card.name}
          </p>
          <p className="text-[11px] text-gray-400 flex items-center gap-0.5 mt-0.5">
            <MapPin size={10} className="text-gray-400" />
            {card.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialSection() {
  const [page, setPage] = useState(0);

  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="h-0.5 w-7 rounded-full"
              style={{ background: "#BA7517" }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#BA7517" }}
            >
              What travellers say
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif uppercase">
            Real stories, real journeys
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonialPages[page].map((card, i) => (
            <TestimonialCard key={i} card={card} />
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mt-7">
          {testimonialPages.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: page === i ? "20px" : "7px",
                background: page === i ? "#BA7517" : "#D1D5DB",
                border: "none",
                cursor: "pointer",
              }}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}