"use client";

import React from "react";
import Cta from "./Cta";
import Hero from "./Hero";
import Origin from "./Origin";
import Philosophy from "./Philosophy";
import Services from "./Services";
import Stats from "./Stats";

export default function About() {
  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans text-slate-900 selection:bg-slate-900 selection:text-white overflow-hidden luxury-about-container">
      <Hero />
      <Origin />
      <Philosophy />
      <Services />
      {/* <Stats /> */}
      <Cta />
    </div>
  );
}
