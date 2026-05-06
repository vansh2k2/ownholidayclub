import Profile from "@/components/pages/Profile/Profilepage";
import React, { Suspense } from "react";
import { getStaticPageMetadata } from "@/lib/metadata";

export const metadata = getStaticPageMetadata("/profile");

function page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA] mt-20 p-4 md:p-8 lg:p-12 text-slate-600">Loading profile...</div>}>
      <div>
        <Profile />
      </div>
    </Suspense>
  );
}

export default page;
