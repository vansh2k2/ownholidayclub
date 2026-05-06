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

export async function fetchDestinations() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/destinations`,
      {
        cache: "no-store",
      },
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result?.message || "Failed to fetch destinations.");
    }

    // Return the array of destinations directly from result.data
    return Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    console.error("Failed to fetch destinations:", error);
    return [];
  }
}

export async function fetchDestinationById(id) {
  const destinations = await fetchDestinations();
  const searchId = id?.toLowerCase();

  return (
    destinations.find(
      (dest) =>
        dest.slug === searchId ||
        dest._id === id || 
        dest.id === id ||
        slugifyValue(dest.name) === searchId
    ) || null
  );
}
