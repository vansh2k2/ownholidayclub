"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import MembershipPurchasePageContent from "@/components/pages/Membership/MembershipPurchasePageContent";
import {
  DEFAULT_MEMBERSHIP_TIERS,
  fetchMembershipTiers,
} from "@/lib/membership";

export default function MembershipPurchaseClient() {
  return (
    <Suspense fallback={<PurchasePageLoadingState />}>
      <MembershipPurchasePageInner />
    </Suspense>
  );
}

function MembershipPurchasePageInner() {
  const searchParams = useSearchParams();
  const tierId = String(searchParams.get("tier") || "")
    .trim()
    .toLowerCase();
  const [membershipTiers, setMembershipTiers] = useState(DEFAULT_MEMBERSHIP_TIERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadMembershipTiers = async () => {
      const tiers = await fetchMembershipTiers();

      if (isMounted) {
        setMembershipTiers(tiers);
        setLoading(false);
      }
    };

    loadMembershipTiers();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedTier = useMemo(
    () => membershipTiers.find((tier) => String(tier.id || "").trim().toLowerCase() === tierId),
    [membershipTiers, tierId],
  );

  if (!tierId && !loading) {
    return (
      <EmptyState
        title="Choose a membership plan first"
        description="Open the membership page and click a plan to start your two-step purchase form."
      />
    );
  }

  if (!selectedTier && loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA] px-4">
        <div className="rounded-[1.6rem] border border-amber-100 bg-white px-6 py-5 text-center shadow-sm">
          <div className="text-lg font-semibold text-slate-900">Loading membership form...</div>
          <div className="mt-2 text-sm text-slate-500">
            Preparing the selected plan and purchase details.
          </div>
        </div>
      </div>
    );
  }

  if (!selectedTier) {
    return (
      <EmptyState
        title="Membership plan not found"
        description="The selected plan could not be matched. Please go back and choose a valid membership tier."
      />
    );
  }

  return <MembershipPurchasePageContent key={selectedTier.id} tier={selectedTier} />;
}

function PurchasePageLoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA] px-4">
      <div className="site-width max-w-lg rounded-[1.6rem] border border-amber-100 bg-white py-5 text-center shadow-sm">
        <div className="text-lg font-semibold text-slate-900">
          Loading membership form...
        </div>
        <div className="mt-2 text-sm text-slate-500">
          Preparing the selected package and purchase details.
        </div>
      </div>
    </div>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA] px-4">
      <div className="site-width max-w-lg rounded-[1.8rem] border border-amber-100 bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
        <Link
          href="/membership#tiers"
          className="mt-6 inline-flex items-center rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
        >
          Back to Membership Plans
        </Link>
      </div>
    </div>
  );
}
