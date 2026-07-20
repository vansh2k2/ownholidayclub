import Sitemap from "@/components/pages/Sitemap/Sitemappage";
import React from "react";
import { getSitemapRoutes } from "@/lib/sitemap";
import { getStaticPageMetadata } from "@/lib/metadata";

export const metadata = getStaticPageMetadata("/sitemap");

async function page() {
  const routes = await getSitemapRoutes();

  return (
    <div>
      <Sitemap routes={routes} />
    </div>
  );
}

export default page;
