import Contact from "@/components/pages/ContactUs/ContactUspage";
import React from "react";
import { getCombinedMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return await getCombinedMetadata("/contactus");
}

function page() {
  return (
    <div>
      <Contact />
    </div>
  );
}

export default page;
