import HomePage from "@/components/pages/Home/HomePage";
import { getCombinedMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return await getCombinedMetadata("/");
}

export default function Page() {
  return <HomePage />;
}
