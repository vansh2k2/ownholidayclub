import CookiesPolicy from "@/components/pages/Cookies/CookiesPage";
import React from "react";
import { getStaticPageMetadata } from "@/lib/metadata";

export const metadata = getStaticPageMetadata("/cookie-policy");

function page() {
  return (
    <div>
      <CookiesPolicy />
    </div>
  );
}

export default page;
