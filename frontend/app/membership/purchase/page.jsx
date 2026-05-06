import MembershipPurchaseClient from "./MembershipPurchaseClient";
import { fetchMembershipTiers } from "@/lib/membership";
import { createDynamicPageMetadata, DEFAULT_OG_IMAGE } from "@/lib/metadata";

export async function generateMetadata({ searchParams }) {
  const tierId = String(searchParams?.tier || "")
    .trim()
    .toLowerCase();
  const tiers = tierId ? await fetchMembershipTiers() : [];
  const selectedTier = tiers.find(
    (tier) => String(tier.id || "").trim().toLowerCase() === tierId,
  );

  if (selectedTier) {
    return createDynamicPageMetadata({
      title: `${selectedTier.name} Purchase`,
      description:
        selectedTier.description ||
        "Complete your Own Holiday Club membership purchase and confirm your selected plan.",
      path: "/membership/purchase",
      image: DEFAULT_OG_IMAGE,
      noIndex: true,
    });
  }

  return createDynamicPageMetadata({
    title: "Membership Purchase",
    description:
      "Complete your Own Holiday Club membership purchase and confirm your selected plan.",
    path: "/membership/purchase",
    image: DEFAULT_OG_IMAGE,
    noIndex: true,
  });
}

export default function MembershipPurchasePage() {
  return <MembershipPurchaseClient />;
}
