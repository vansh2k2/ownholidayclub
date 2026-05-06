import AboutPage from "@/components/pages/About/AboutPage";
import { getCombinedMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return await getCombinedMetadata("/about");
}

export default function Page() {
  return <AboutPage />;
}
