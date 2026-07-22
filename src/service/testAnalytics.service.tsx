const API_BASE_URL = "http://localhost:3000/api";

/**
 * Get Test Analytics Dashboard Data
 *
 * Example:
 *
 * getTestAnalyticsData({});
 *
 * getTestAnalyticsData({
 *   fromDate: "04-06-2026",
 *   toDate: "04-06-2026",
 * });
 */
export const getTestAnalyticsData = async (
  filters: {
    fromDate?: string;
    toDate?: string;
  }
) => {
  try {
    /**
     * Call Test Analytics API
     */
    const response = await fetch(
      `${API_BASE_URL}/test-analytics/dashboard`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      }
    );

    /**
     * Parse Response
     */
    const data = await response.json();

    console.log(
      "[TEST ANALYTICS SERVICE] Response",
      data
    );

    /**
     * Handle API Failure
     */
    if (!response.ok) {
      throw new Error(
        data?.message ||
          "Test Analytics API Failed"
      );
    }

    /**
     * Return Response
     */
    return data;
  } catch (error: any) {
    console.error(
      "[TEST ANALYTICS SERVICE] Error",
      error
    );

    throw new Error(
      error?.message ||
        "Unable to load Test Analytics Data"
    );
  }
};