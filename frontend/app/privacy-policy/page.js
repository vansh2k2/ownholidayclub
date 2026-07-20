import PrivacyPolicy from "@/components/pages/Privacy/Privacypage";
import React from "react";
import { getStaticPageMetadata } from "@/lib/metadata";

export const metadata = getStaticPageMetadata("/privacy-policy");

function page() {
  return (
    <div>
      <PrivacyPolicy />
    </div>
  );
}

export default page;
