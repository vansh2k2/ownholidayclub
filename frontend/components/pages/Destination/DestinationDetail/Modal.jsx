"use client";

import React from "react";
import { ArrowRight, Sparkles, Star, X } from "lucide-react";

export default function Modal({
  activeModal,
  destinationData,
  modalFilter,
  onImageError,
  scrollToForm,
  setActiveModal,
  setModalFilter,
}) {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
        onClick={() => setActiveModal(null)}
      ></div>

      <div className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/50 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 transition-colors z-20 shadow-sm"
        >
          <X size={20} />
        </button>

        {/* Individual Property Detail View */}
        {activeModal.type === "property" && activeModal.data && (
          <div className="flex flex-col md:flex-row h-full overflow-y-auto">
            <div className="md:w-1/2 h-64 md:h-auto relative shrink-0">
              <img
                src={activeModal.data.image}
                alt={activeModal.data.name}
                className="w-full h-full object-cover"
                onError={onImageError}
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                <Star size={12} className="text-amber-500 fill-amber-500" />
                <span className="text-[10px] font-black">
                  {activeModal.data.rating}
                </span>
              </div>
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-3">
                {activeModal.data.type}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 mb-6">
                {activeModal.data.name}
              </h3>
              <p className="text-slate-600 font-sans leading-relaxed mb-8">
                Experience the ultimate luxury at {activeModal.data.name}. This
                exclusive property offers unparalleled service, breathtaking
                views, and world-class amenities designed to elevate your stay.
              </p>
              <button
                onClick={() => {
                  setActiveModal(null);
                  scrollToForm();
                }}
                className="w-full bg-slate-900 text-white px-8 py-4 rounded-xl hover:bg-amber-500 transition-colors font-sans font-black uppercase tracking-[0.1em] text-xs flex items-center justify-center gap-2"
              >
                Request to Book Property <ArrowRight size={16} />
              </button>

              {/* Button to go back to "All Resorts" if needed */}
              <button
                onClick={() => {
                  setModalFilter("All");
                  setActiveModal({ type: "all" });
                }}
                className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
              >
                Back to All Properties
              </button>
            </div>
          </div>
        )}

        {/* All Properties Grid View */}
        {activeModal.type === "all" && (
          <div className="flex flex-col h-full overflow-hidden bg-slate-50">
            {/* Enhanced Sticky Header */}
            <div className="bg-white p-8 md:p-12 border-b border-slate-100 shrink-0 relative overflow-hidden z-10 shadow-sm">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

              <h3 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 mb-3 relative z-10">
                Platinum Collection
              </h3>
              <p className="text-slate-500 font-sans relative z-10 max-w-xl">
                Browse our complete curated portfolio of {destinationData.name}{" "}
                properties, each handpicked for unparalleled luxury.
              </p>

              {/* Filter Pills */}
              <div className="flex gap-3 mt-8 overflow-x-auto pb-2 scrollbar-hide relative z-10 mask-fade-right">
                {[
                  "All",
                  "Ultra-Luxury",
                  "Family Premium",
                  "Couples Retreat",
                ].map((filterOption) => (
                  <button
                    key={filterOption}
                    onClick={() => setModalFilter(filterOption)}
                    className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
                      modalFilter === filterOption
                        ? "bg-slate-900 text-white shadow-md scale-100"
                        : "bg-slate-50 border border-slate-200 text-slate-600 hover:border-amber-500 hover:text-amber-600 hover:bg-white scale-95 hover:scale-100"
                    }`}
                  >
                    {filterOption}
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Grid Content */}
            <div className="p-8 md:p-12 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {destinationData.properties
                  .filter(
                    (prop) =>
                      modalFilter === "All" || prop.type.includes(modalFilter),
                  )
                  .map((prop) => (
                    <div
                      key={`modal-${prop._id || prop.id}`}
                      onClick={() =>
                        setActiveModal({ type: "property", data: prop })
                      }
                      className="group cursor-pointer bg-white border border-slate-100 rounded-[1.5rem] overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-500 flex flex-col"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={prop.image}
                          alt={prop.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms]"
                          onError={onImageError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                          <Star
                            size={12}
                            className="text-amber-500 fill-amber-500"
                          />
                          <span className="text-[10px] font-black">
                            {prop.rating}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <div className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2">
                          {prop.type}
                        </div>
                        <h4 className="font-bold font-serif text-slate-900 text-xl leading-tight mb-4 group-hover:text-amber-600 transition-colors">
                          {prop.name}
                        </h4>

                        <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
                            View Details
                          </span>
                          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-white transition-all duration-300">
                            <ArrowRight
                              size={14}
                              className="group-hover:translate-x-0.5 transition-transform"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Empty state for filters with no results */}
              {destinationData.properties.filter(
                (prop) =>
                  modalFilter === "All" || prop.type.includes(modalFilter),
              ).length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                    <Sparkles size={24} />
                  </div>
                  <h4 className="text-lg font-bold font-serif text-slate-900 mb-2">
                    No properties found
                  </h4>
                  <p className="text-slate-500 font-sans text-sm">
                    We're expanding our portfolio. Try a different category.
                  </p>
                  <button
                    onClick={() => setModalFilter("All")}
                    className="mt-6 text-[10px] font-black uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    View All Properties
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
