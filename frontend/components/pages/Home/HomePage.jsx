"use client";
import React from "react";
import Testinomial from "./Testinomial";
import Carousel from "./Carousel";
import MarqueeStrip from "./MarqueeStrip";
import Service from "./Service";
import Destination from "./Destination";
import Faq from "./Faq";
import Hero from "./Hero";
import Blog from "./Blog";
import Membership from "./Membership";
import MembershipTiers from "./MembershipTiers";

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-slate-800 selection:bg-amber-100 selection:text-amber-900">
      <Hero />
      <Service />
      <Destination />
      <MarqueeStrip />
      <MembershipTiers />
      <Carousel />
      <Membership />
      <Faq />
      <Testinomial />
      <Blog />

      {/* <MembershipCta /> */}

      {/* <Photogallery /> */}
    </div>
  );
}
