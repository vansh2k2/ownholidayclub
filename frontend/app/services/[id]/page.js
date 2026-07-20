import React from "react";
import ServiceDetail from "@/components/pages/Service/ServiceDetail/ServiceDetail";
import { fetchServiceById } from "@/lib/services";
import { SERVICES_OG_IMAGE, createDynamicPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const slug = params?.id || "";
  const service = await fetchServiceById(slug);

  if (!service) {
    return createDynamicPageMetadata({
      title: "Service Not Found",
      description: "This service is not available right now.",
      path: `/services/${slug}`,
      image: SERVICES_OG_IMAGE,
    });
  }

  return createDynamicPageMetadata({
    title: service.title || "Service",
    description: service.subtitle || service.description,
    path: `/services/${slug}`,
    image:
      service.heroImage ||
      service.image ||
      service.portfolio?.[0]?.image ||
      SERVICES_OG_IMAGE,
  });
}

function Page({ params }) {
  return (
    <div>
      <ServiceDetail serviceId={params?.id} />
    </div>
  );
}

export default Page;
