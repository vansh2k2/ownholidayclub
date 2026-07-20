import { siteUrl } from "./site-config";
import { fetchSeoByPath } from "./seo";

export const SITE_NAME = "Own Holiday Club";
export const DEFAULT_SITE_DESCRIPTION =
  "For Stay & Celebration on Earth. Luxury travel memberships, curated holidays, and destination experiences with Own Holiday Club.";
export const DEFAULT_OG_IMAGE = "/og-image.jpeg";
export const BLOG_OG_IMAGE =
  "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1200&q=80";
export const DESTINATIONS_OG_IMAGE =
  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80";
export const SERVICES_OG_IMAGE =
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80";

const STATIC_PAGE_METADATA = {
  "/": {
    absoluteTitle: SITE_NAME,
    description: DEFAULT_SITE_DESCRIPTION,
    image: DEFAULT_OG_IMAGE,
  },
  "/about": {
    title: "About",
    description:
      "Learn about Own Holiday Club, our story, and our approach to curated luxury travel and memberships.",
    image: DEFAULT_OG_IMAGE,
  },
  "/blog": {
    title: "Travel Blog",
    description:
      "Read destination guides, travel inspiration, honeymoon ideas, and member-focused stories from Own Holiday Club.",
    image: BLOG_OG_IMAGE,
  },
  "/contactus": {
    title: "Contact Us",
    description:
      "Contact Own Holiday Club for memberships, travel planning, partnerships, and concierge support.",
    image: DEFAULT_OG_IMAGE,
  },
  "/cookie-policy": {
    title: "Cookie Policy",
    description:
      "Read the cookie policy for Own Holiday Club and learn how cookies support your browsing experience.",
    image: DEFAULT_OG_IMAGE,
  },
  "/destinations": {
    title: "Destinations",
    description:
      "Explore luxury holiday destinations, curated resorts, and memorable getaway ideas from Own Holiday Club.",
    image: DESTINATIONS_OG_IMAGE,
  },
  "/list-your-property": {
    title: "List Your Property",
    description:
      "Partner with Own Holiday Club and list your property for premium holiday memberships and curated stays.",
    image: DEFAULT_OG_IMAGE,
  },
  "/membership": {
    title: "Membership Plans",
    description:
      "Compare Own Holiday Club membership plans, benefits, and long-term luxury holiday access.",
    image: DEFAULT_OG_IMAGE,
  },
  "/membership/purchase": {
    title: "Membership Purchase",
    description:
      "Complete your Own Holiday Club membership purchase and confirm your selected plan.",
    image: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    description:
      "Read the privacy policy for Own Holiday Club and understand how we collect, use, and protect your information.",
    image: DEFAULT_OG_IMAGE,
  },
  "/profile": {
    title: "Profile",
    description:
      "Manage your Own Holiday Club member profile, membership details, and booking information.",
    image: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
  "/refund-policy": {
    title: "Refund Policy",
    description:
      "Review the refund policy for Own Holiday Club memberships, bookings, and related services.",
    image: DEFAULT_OG_IMAGE,
  },
  "/services": {
    title: "Services",
    description:
      "Discover destination weddings, corporate retreats, private parties, and curated travel services from Own Holiday Club.",
    image: SERVICES_OG_IMAGE,
  },
  "/sitemap": {
    title: "Sitemap",
    description:
      "Browse the public pages and sections available on the Own Holiday Club website.",
    image: DEFAULT_OG_IMAGE,
  },
  "/terms&conditions": {
    title: "Terms and Conditions",
    description:
      "Read the terms and conditions for Own Holiday Club memberships, services, and website usage.",
    image: DEFAULT_OG_IMAGE,
  },
};

function buildAbsoluteUrl(path = "") {
  if (!path) {
    return siteUrl;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function normalizeText(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateText(value, maxLength = 170) {
  const normalized = normalizeText(value);

  if (!normalized) {
    return "";
  }

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trim()}...`;
}

function buildShareTitle({ title, absoluteTitle }) {
  const baseTitle = absoluteTitle || title || SITE_NAME;

  if (baseTitle === SITE_NAME) {
    return SITE_NAME;
  }

  return `${baseTitle} | ${SITE_NAME}`;
}

export function resolveMetadataImage(...candidates) {
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return buildAbsoluteUrl(candidate.trim());
    }
  }

  return buildAbsoluteUrl(DEFAULT_OG_IMAGE);
}

export function createPageMetadata({
  title,
  absoluteTitle,
  description = DEFAULT_SITE_DESCRIPTION,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noIndex = false,
  keywords,
  publishedTime,
  modifiedTime,
}) {
  const resolvedDescription =
    truncateText(description) || DEFAULT_SITE_DESCRIPTION;
  const canonicalUrl = buildAbsoluteUrl(path === "/" ? "" : path);
  const shareTitle = buildShareTitle({ title, absoluteTitle });
  const imageUrl = resolveMetadataImage(image);
  const metadata = {
    description: resolvedDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type,
      url: canonicalUrl,
      title: shareTitle,
      description: resolvedDescription,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: shareTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: resolvedDescription,
      images: [imageUrl],
    },
  };

  if (absoluteTitle) {
    metadata.title = {
      absolute: absoluteTitle,
    };
  } else if (title) {
    metadata.title = title;
  }

  if (Array.isArray(keywords) && keywords.length > 0) {
    metadata.keywords = keywords;
  }

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    };
  }

  if (publishedTime) {
    metadata.openGraph.publishedTime = new Date(publishedTime).toISOString();
  }

  if (modifiedTime) {
    metadata.openGraph.modifiedTime = new Date(modifiedTime).toISOString();
  }

  return metadata;
}

export async function getCombinedMetadata(path) {
  const dbSeo = await fetchSeoByPath(path);
  const staticMeta = STATIC_PAGE_METADATA[path] || {};

  if (dbSeo && dbSeo.isActive) {
    return createPageMetadata({
      path,
      absoluteTitle: dbSeo.metaTitle || staticMeta.absoluteTitle || staticMeta.title,
      description: dbSeo.metaDescription || staticMeta.description,
      image: dbSeo.ogImage || staticMeta.image,
      keywords: dbSeo.metaKeywords ? dbSeo.metaKeywords.split(",").map(k => k.trim()) : undefined,
    });
  }

  return getStaticPageMetadata(path);
}

export function getStaticPageMetadata(path) {
  return createPageMetadata({
    path,
    ...(STATIC_PAGE_METADATA[path] || {}),
  });
}

export function createDynamicPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
}) {
  return createPageMetadata({
    title,
    description,
    path,
    image,
    type,
    noIndex,
    publishedTime,
    modifiedTime,
  });
}

export function getTextExcerpt(value, maxLength = 170) {
  return truncateText(value, maxLength);
}
