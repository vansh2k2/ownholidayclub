import ServicesPage from "@/components/pages/Service/ServicesPage";
import { fetchServices } from "@/lib/services";
import { SERVICES_OG_IMAGE, createDynamicPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const services = await fetchServices();
  const featuredImage =
    services[0]?.heroImage || services[0]?.image || SERVICES_OG_IMAGE;

  return createDynamicPageMetadata({
    title: "Services",
    description:
      "Discover destination weddings, corporate retreats, private parties, and curated travel services from Own Holiday Club.",
    path: "/services",
    image: featuredImage,
  });
}

export default function Page() {
  return <ServicesPage />;
}
