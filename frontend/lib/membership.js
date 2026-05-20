const API_BASE_URL =
  process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";

export const DEFAULT_MEMBERSHIP_TIERS = [
  {
    id: "ohc-privilege",
    name: "OHC Privilege",
    price: "Rs50,000",
    adminFee: "Rs3,789",
    bonusYears: 0,
    period: "5 YEARS ACCESS",
    description: "Special 5-year introductory offer for your luxury journey.",
    features: [
      "6 Nights / 7 Days Annual Stay",
      "Access to Premium Resorts",
      "Standard Concierge",
      "Transferable to Family",
    ],
    icon: "star",
    buttonText: "BUY PRIVILEGE",
    popular: false,
  },
  {
    id: "ohc-memorable",
    name: "OHC Memorable",
    price: "Rs2,00,000",
    adminFee: "Rs3,789",
    bonusYears: 0,
    period: "10 YEARS ACCESS",
    description: "Create memorable vacations for a full decade.",
    features: [
      "6 Nights / 7 Days Annual Stay",
      "Access to 4 & 5-Star Resorts",
      "Priority Booking",
      "Transferable to Family",
    ],
    icon: "crown",
    buttonText: "BUY MEMORABLE",
    popular: true,
  },
  {
    id: "ohc-golden",
    name: "OHC Golden",
    price: "Rs5,00,000",
    adminFee: "Rs3,789",
    bonusYears: 3,
    period: "20 YEARS ACCESS",
    description: "Two decades of elevated luxury experiences.",
    features: [
      "6 Nights / 7 Days Annual Stay",
      "All Premium Luxury Resorts",
      "Dedicated VIP Concierge",
      "Complimentary Breakfast",
    ],
    icon: "sparkles",
    buttonText: "BUY GOLDEN",
    popular: false,
  },
  {
    id: "ohc-diamond",
    name: "OHC Diamond",
    price: "Rs10,00,000",
    adminFee: "Rs3,789",
    bonusYears: 0,
    period: "30 YEARS ACCESS",
    description: "Three decades of ultimate luxury and exclusive global access.",
    features: [
      "6 Nights / 7 Days Annual Stay",
      "Access to Elite Global Resorts",
      "Personalized Travel Planning",
      "All Golden Benefits Included",
    ],
    icon: "gem",
    buttonText: "BUY DIAMOND",
    popular: false,
  },
];

const normalizeTier = (tier = {}, index = 0) => ({
  id: tier.id || `tier-${index + 1}`,
  name: tier.name || "",
  price: tier.price || "",
  priceType: tier.priceType || "regular",
  actuallyPrice: tier.actuallyPrice || "",
  adminFee: tier.adminFee || "",
  bonusYears: Number(tier.bonusYears || 0) || 0,
  period: tier.period || "",
  description: tier.description || "",
  features: Array.isArray(tier.features) ? tier.features.filter(Boolean) : [],
  icon: tier.icon || "star",
  buttonText: tier.buttonText || "BUY NOW",
  popular: Boolean(tier.popular),
  invoiceTerms: Array.isArray(tier.invoiceTerms) ? tier.invoiceTerms.filter(Boolean) : [],
});

export async function fetchMembershipTiers() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/membership/tiers`, {
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to fetch membership tiers.");
    }

    const tiers = Array.isArray(data?.tiers) ? data.tiers.map(normalizeTier) : [];
    return tiers.length > 0 ? tiers : DEFAULT_MEMBERSHIP_TIERS;
  } catch (error) {
    console.error("Failed to fetch membership tiers:", error);
    return DEFAULT_MEMBERSHIP_TIERS;
  }
}
