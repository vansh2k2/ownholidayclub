import React from "react";
import DestinationDetail from "@/components/pages/Destination/DestinationDetail/DestinationDetail";
import { fetchDestinationById } from "@/lib/destinations";
import {
  DESTINATIONS_OG_IMAGE,
  createDynamicPageMetadata,
} from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const slug = params?.id || "";
  const destination = await fetchDestinationById(slug);

  if (!destination) {
    return createDynamicPageMetadata({
      title: "Destination Not Found",
      description: "This destination is not available right now.",
      path: `/destinations/${slug}`,
      image: DESTINATIONS_OG_IMAGE,
    });
  }

  return createDynamicPageMetadata({
    title: destination.name || "Destination",
    description: destination.shortDescription || destination.desc || destination.description,
    path: `/destinations/${slug}`,
    image:
      destination.image ||
      destination.heroImage ||
      destination.gallery?.[0] ||
      destination.properties?.[0]?.image ||
      DESTINATIONS_OG_IMAGE,
  });
}

function Page({ params }) {
  return <DestinationDetail destinationId={params?.id} />;
}

export default Page;
