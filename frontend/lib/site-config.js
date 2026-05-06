const DEFAULT_SITE_URL = "https://ownholidayclub.com";

function normalizeSiteUrl(url) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || DEFAULT_SITE_URL,
);
