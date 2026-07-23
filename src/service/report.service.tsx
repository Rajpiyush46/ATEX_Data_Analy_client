/**
 * Report API Service
 *
 * API:
 * GET /api/report/summary
 */

const API_BASE_URL = "http://localhost:3000/api";

export const getReportSummary = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/report/summary`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log("[REPORT SERVICE] Response", data);

    if (!response.ok) {
      throw new Error(data?.message || "Report API Failed");
    }

    return data;
  } catch (error: any) {
    console.error("[REPORT SERVICE] Error", error);

    throw new Error(error?.message || "Unable to load Report Data");
  }
};
