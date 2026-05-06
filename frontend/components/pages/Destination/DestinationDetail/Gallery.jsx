"use client";

import React, { useState } from "react";

const photos = [
  { src: "img1.jpg", label: "Mountain peaks" },
  { src: "img2.jpg", label: "Lakeside calm" },
  { src: "img3.jpg", label: "Forest trails" },
];

export default function Gallery({ destinationData, onImageError }) {
  const [zoomSrc, setZoomSrc] = useState(null);

  const gallery = destinationData?.gallery?.map((src, i) => ({
    src,
    label: `Photo ${i + 1}`,
  })) ?? photos;

  return (
    <>
      {/* Section with Diagonal Split Background */}
      <section
        className="py-12 md:py-20 relative"
        style={{
          background:
            "linear-gradient(135deg, #fff8ed 0%, #fff8ed 48%, #ffffff 52%, #ffffff 100%)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-10 px-4">
          <p
            className="uppercase tracking-[0.4em] text-base md:text-lg font-black text-amber-700/80 mb-2"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Gallery
          </p>
          <h2
            className="text-xl md:text-2xl font-bold text-slate-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Visual{" "}
            <em className="font-light text-amber-700 not-italic">Journey</em>
          </h2>
          <div className="w-12 h-0.5 bg-amber-500/30 mx-auto mt-4 mb-2" />
          <p
            className="text-[10px] text-slate-400 uppercase tracking-widest font-black"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Experience the destination through our lens
          </p>
        </div>

        {/* Masonry Grid */}
        <div
          className="w-full px-2"
          style={{
            columns: "3 280px",
            gap: "10px",
          }}
        >
          {gallery.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => setZoomSrc(photo.src)}
              className="group relative cursor-pointer rounded-xl overflow-hidden mb-2.5 bg-stone-200"
              style={{ breakInside: "avoid" }}
            >
              <img
                src={photo.src}
                alt={photo.label}
                className="w-full block object-cover transition-transform duration-500 group-hover:scale-105"
                onError={onImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <span className="absolute bottom-2.5 left-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wide">
                {photo.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Zoom Modal */}
      {zoomSrc && (
        <div
          onClick={() => setZoomSrc(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 transition-opacity"
        >
          <button
            onClick={() => setZoomSrc(null)}
            className="absolute top-4 right-5 text-white text-2xl opacity-70 hover:opacity-100 transition"
          >
            ✕
          </button>
          <img
            src={zoomSrc}
            alt="Zoomed"
            onClick={(e) => e.stopPropagation()}
            className="max-w-[88vw] max-h-[88vh] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
}