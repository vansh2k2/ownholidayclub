import { getXmlSitemapEntries } from "@/lib/sitemap";

export const revalidate = 3600;

export default async function sitemap() {
  return getXmlSitemapEntries();
}
