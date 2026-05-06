"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Tiers from "@/components/pages/Membership/Tiers";
import {
  DEFAULT_MEMBERSHIP_TIERS,
  fetchMembershipTiers,
} from "@/lib/membership";

export default function MembershipTiers() {
  const router = useRouter();
  const [membershipTiers, setMembershipTiers] = useState(
    DEFAULT_MEMBERSHIP_TIERS,
  );

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
    <Tiers
      membershipTiers={membershipTiers}
      onPurchaseTier={handlePurchaseTier}
    />
  );
}
