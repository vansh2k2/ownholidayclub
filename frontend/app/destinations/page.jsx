import DestinationsPage from "@/components/pages/Destination/DestinationsPage";
import { fetchDestinations } from "@/lib/destinations";
import {
  DESTINATIONS_OG_IMAGE,
  createDynamicPageMetadata,
} from "@/lib/metadata";

export async function generateMetadata() {
  const destinations = await fetchDestinations();
  const featuredImage =
    destinations[0]?.heroImage ||
    destinations[0]?.image ||
    destinations[0]?.gallery?.[0] ||
    DESTINATIONS_OG_IMAGE;

  return createDynamicPageMetadata({
    title: "Destinations",
    description:
      "Explore luxury holiday destinations, curated resorts, and memorable getaway ideas from Own Holiday Club.",
    path: "/destinations",
    image: featuredImage,
  });
}

export default function Page() {
  return <DestinationsPage />;
}
