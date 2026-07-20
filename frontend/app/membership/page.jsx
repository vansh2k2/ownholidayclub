import MembershipPage from "@/components/pages/Membership/MembershipPage";
import { getStaticPageMetadata } from "@/lib/metadata";

export const metadata = getStaticPageMetadata("/membership");

export default function Page() {
  return <MembershipPage />;
}
