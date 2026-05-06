const API_BASE_URL =
  process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";

export const api = {
  get: async (url) => {
    try {
      const res = await fetch(`${API_BASE_URL}${url}`);
      const data = await res.json();
      return { data, status: res.status };
    } catch (error) {
      console.error(`API GET error for ${url}:`, error);
      throw error;
    }
  },
  post: async (url, body) => {
    try {
      const res = await fetch(`${API_BASE_URL}${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      return { data, status: res.status };
    } catch (error) {
      console.error(`API POST error for ${url}:`, error);
      throw error;
    }
  },
};
