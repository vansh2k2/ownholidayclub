"use client";

import React from "react";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function SignatureThought() {
  return (
    <section className="relative py-20 overflow-hidden bg-[#FDFDFD]">
      {/* Background accents */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-50 rounded-full blur-[100px] opacity-60 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-50/50 rounded-full blur-[80px] opacity-60 -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="site-width mx-auto px-4 md:px-8 relative z-10 w-full">
        <ScrollAnimate animation="fade-up">
          <div className="w-full">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-[1px] bg-amber-400"></span>
              <span className="text-amber-600 font-bold tracking-[0.2em] uppercase text-xs font-sans">
                Signature Thought
              </span>
              <span className="w-8 h-[1px] bg-amber-400"></span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-normal text-slate-800 mb-8 leading-tight italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="text-amber-500 mr-2">“</span>
              Babumoshai zindagi badi honi chahiye, lambi nahi...
              <span className="text-amber-500 ml-2">”</span>
            </h2>
            
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-8"></div>
            
            <div className="text-[15px] md:text-[17px] text-slate-600 leading-relaxed font-medium space-y-4 text-justify" style={{ fontFamily: "'Inter', sans-serif" }}>
              <p>
                <span className="font-bold text-slate-800">"The less stress, the more life"</span> this is exactly what we believe in. We offer our services to each and every event which matters to you the most because you matter to us the most. From planning your Holiday vacays to Weddings, Small Parties to Big corporate meetings - Own Holiday Club is just a call away to lend the best of our services.
              </p>
              <p>
                To add some extra happiness, fun and adventure and to get you a break from your hustle and bustle of daily routine, we have come up with some impeccable, exquisite membership offers for you.
              </p>
              <p>
                You choose the best for you and we will offer the best of us. Yes, you could join any of the following Membership programs, starting from 5 years of duration to that of 35 years and you are all set to go for it. And to add some bling to your happiness, we also add your spouse along with two of your children (below 10 years) to our membership offers.
              </p>
              <p className="font-bold text-amber-600 bg-amber-50 p-4 rounded-lg inline-block">
                Note: The membership offer applies on "Member + Spouse + 2 kids (below 10 years of age)"
              </p>
              <p className="font-bold text-slate-800 text-lg mt-6">
                Don't worry about the accessibility!
              </p>
              <p>
                Domestic or International, tell us your plan. For your surprise, these Memberships are accessible to every one of your favorite destinations. It's our responsibility to make your trip the most memorable one. We will take you to the best resorts and execute the best events that you would always keep in your good memories. We promise to fill your and your loved ones' special moments with the amazing, venturesome memories to cherish for a lifetime.
              </p>
              <p className="font-semibold text-slate-700">
                Pay once and get ready to have a carefree, stress free holiday at the best resorts, destinations for many more years ahead without any price hike.
              </p>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
