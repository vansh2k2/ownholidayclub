import TermsAndConditions from "@/components/pages/Terms/TermsPage";
import React from "react";
import { getStaticPageMetadata } from "@/lib/metadata";

export const metadata = getStaticPageMetadata("/terms&conditions");

function page() {
  return (
    <div>
      <TermsAndConditions />
    </div>
  );
}

export default page;
