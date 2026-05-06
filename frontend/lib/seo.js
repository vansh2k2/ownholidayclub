const API_BASE_URL =
  process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";

export async function fetchSeoByPath(path) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/seo/page/${encodeURIComponent(path)}`,
      {
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return null;
    }

    return data.data;
  } catch (error) {
    console.error(`Failed to fetch SEO for ${path}:`, error);
    return null;
  }
}
