/**
 * Overview API Service
 *
 * API:
 * POST /api/overview
 */

const API_BASE_URL = "http://localhost:3000/api";

export const getOverviewData = async (filters: {
  fromDate?: string;
  toDate?: string;
  fromTime?: string;
  toTime?: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/overview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    });

    const data = await response.json();

    console.log("[OVERVIEW SERVICE] Response", data);

    if (!response.ok) {
      throw new Error(data?.message || "Overview API Failed");
    }

    return data;
  } catch (error: any) {
    console.error("[OVERVIEW SERVICE] Error", error);

    throw new Error(error?.message || "Unable to load Overview Data");
  }
};
