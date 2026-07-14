/**
 * Comparison API Service
 *
 * Handles:
 * - Any X Parameter
 * - Any Y Parameter
 * - Date Filters
 * - Time Filters
 *
 * API:
 * POST /api/comparison
 */

const API_BASE_URL = "http://localhost:3000/api";

export const getComparisonData = async (filters: {
  xParameter: string;
  yParameter: string;
  fromDate?: string;
  toDate?: string;
  fromTime?: string;
  toTime?: string;
}) => {
  try {
    console.log("[COMPARISON SERVICE] Request Payload", filters);

    const response = await fetch(`${API_BASE_URL}/comparison`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    });

    const data = await response.json();

    console.log("[COMPARISON SERVICE] Response", data);

    /**
     * API Failure
     */
    if (!response.ok) {
      throw new Error(data?.message || "Failed to fetch comparison data");
    }

    return data;
  } catch (error: any) {
    console.error("[COMPARISON SERVICE] Error", error);

    throw new Error(error?.message || "Unable to load comparison data");
  }
};

export default {
  getComparisonData,
};
