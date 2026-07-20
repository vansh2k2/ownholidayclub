"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Benefits from "./Benefits";
import Faq from "./Faq";
import FinalCta from "./FinalCta";
import Hero from "./Hero";
import Testimonial from "./Testimonial";
import Tiers from "./Tiers";
import { createImageFallback } from "@/lib/createImageFallback";
import {
  DEFAULT_MEMBERSHIP_TIERS,
  fetchMembershipTiers,
} from "@/lib/membership";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80";
const handleImageError = createImageFallback(FALLBACK_IMAGE);

const membershipFaqs = [
  {
    q: "How does the vacation membership work?",
    a: "Our membership gives you annual credits that can be used across 1,000+ premium resorts globally. You pay a one-time membership fee and enjoy wholesale rates on luxury vacations forever.",
  },
  {
    q: "Can I transfer my membership to my children?",
    a: "Absolutely. Our memberships are multi-generational. You can transfer your rights and accumulated benefits to your immediate family members at no extra cost, creating a lifelong legacy of travel.",
  },
  {
    q: "What happens if I don't use my credits this year?",
    a: "Your vacation time is your asset. If you can't travel this year, your credits automatically roll over to the next year, ensuring you never lose the value of your investment.",
  },
  {
    q: "Are there any hidden maintenance fees?",
    a: "Transparency is our core value. All nominal maintenance fees are clearly outlined in your membership tier upon signing and remain locked for 3 years at a time.",
  },
];
import SignatureThought from "./SignatureThought";

export default function Membership() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(0);
  const [membershipTiers, setMembershipTiers] = useState(
    DEFAULT_MEMBERSHIP_TIERS,
  );

  const scrollToTiers = () => {
    document.getElementById("tiers")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let isMounted = true;

    const loadMembershipTiers = async () => {
      const tiers = await fetchMembershipTiers();

      if (isMounted) {
        setMembershipTiers(tiers);
      }
    };

    loadMembershipTiers();

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePurchaseTier = async (tier) => {
    router.push(`/membership/purchase?tier=${encodeURIComponent(tier.id || "")}`);
  };

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans text-slate-900 selection:bg-amber-100 selection:text-amber-900 overflow-hidden luxury-membership-container">
      <Hero onImageError={handleImageError} onScrollToTiers={scrollToTiers} />
      <SignatureThought />
      <Tiers
        membershipTiers={membershipTiers}
        onPurchaseTier={handlePurchaseTier}
      />
      <Benefits onImageError={handleImageError} />
      {/* <Comparison comparisonFeatures={comparisonFeatures} /> */}

      <Faq
        membershipFaqs={membershipFaqs}
        openFaq={openFaq}
        setOpenFaq={setOpenFaq}
      />
      <Testimonial />
      <FinalCta onScrollToTiers={scrollToTiers} />
    </div>
  );
}
