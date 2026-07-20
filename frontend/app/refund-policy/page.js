import RefundPolicy from "@/components/pages/Refund/Refund";
import React from "react";
import { getStaticPageMetadata } from "@/lib/metadata";

export const metadata = getStaticPageMetadata("/refund-policy");

function page() {
  return (
    <div>
      <RefundPolicy />
    </div>
  );
}

export default page;
