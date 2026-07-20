const API_BASE_URL =
  process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";

const slugifyValue = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export async function fetchServices() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/cms/entries?collection=homepage`,
      {
        cache: "no-store",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to fetch services.");
    }

    const entriesByKey = (data?.entries || []).reduce((acc, entry) => {
      acc[entry.key] = entry.data;
      return acc;
    }, {});

    return Array.isArray(entriesByKey.services) ? entriesByKey.services : [];
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

export async function fetchServiceById(slug) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/service-details/slug/${slug}`, {
      cache: "no-store",
    });
    const data = await response.json();
    
    if (response.ok && data.success) {
      const service = data.data;
      // Map new model to existing component expectations
      return {
        ...service,
        title: service.serviceTitle,
        description: service.shortDescription,
        subtitle: service.shortDescription,
        heroImage: service.exploreImage || service.gallery?.[0] || "",
        stats: {
          capacity: service.quickStats?.bestTime || "N/A",
          venues: service.quickStats?.timezone || "N/A",
          duration: service.quickStats?.flight || "N/A",
          team: service.quickStats?.temp || "N/A",
        },
        portfolio: (service.gallery || []).map(url => ({ 
          image: url, 
          title: "Service View", 
          category: "All" 
        }))
      };
    }

    const services = await fetchServices();
    const serviceId = slugifyValue(slug);
    const fallbackService = services.find(
      (service) => slugifyValue(service.id || service.title) === serviceId,
    );

    if (fallbackService) {
      try {
        const exploreRes = await fetch(`${API_BASE_URL}/api/explore-services`, { cache: "no-store" });
        const exploreData = await exploreRes.json();
        if (exploreRes.ok && exploreData.success && exploreData.data?.services) {
          const matchingCard = exploreData.data.services.find(
            s => slugifyValue(s.title) === slugifyValue(fallbackService.title)
          );
          if (matchingCard) {
            fallbackService.subServicesConfig = matchingCard.subServicesConfig || {};
            fallbackService.subServices = matchingCard.subServices || [];
          }
        }
      } catch (err) {
        console.error("Failed to attach subservices to fallback:", err);
      }
      return fallbackService;
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch service by id:", error);
    return null;
  }
}

export async function fetchExploreServicesData() {
  try {
    const [servicesResponse, detailsResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/api/explore-services`, { cache: "no-store" }),
      fetch(`${API_BASE_URL}/api/service-details`, { cache: "no-store" })
    ]);

    const servicesData = await servicesResponse.json();
    const detailsData = await detailsResponse.json();

    if (!servicesResponse.ok || !servicesData.success) {
      throw new Error(servicesData?.message || "Failed to fetch explore services.");
    }

    const services = servicesData.data.services || [];
    const details = detailsData.success ? detailsData.data : [];

    // Attach slug to each service card if details exist
    const enhancedServices = services.map(service => {
      const detail = details.find(d => d.serviceTitle === service.title);
      return {
        ...service,
        slug: detail ? detail.slug : null,
        // Override buttonUrl if slug exists
        buttonUrl: detail ? `/services/${detail.slug}` : service.buttonUrl
      };
    });

    return {
      ...servicesData.data,
      services: enhancedServices
    };
  } catch (error) {
    console.error("Failed to fetch explore services:", error);
    return null;
  }
}
