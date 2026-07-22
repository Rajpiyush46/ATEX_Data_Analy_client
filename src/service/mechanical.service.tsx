const API_BASE_URL = "http://localhost:3000/api";

/**
 * Get Mechanical Dashboard Data
 *
 * Example:
 *
 * getMechanicalDashboardData({});
 *
 * getMechanicalDashboardData({
 *   fromDate: "04-06-2026",
 *   toDate: "04-06-2026",
 * });
 */
export const getMechanicalDashboardData = async (
  filters: {
    fromDate?: string;
    toDate?: string;
  }
) => {
  try {
    /**
     * Call Mechanical Dashboard API
     */
    const response = await fetch(
      `${API_BASE_URL}/mechanical/dashboard`,
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
      "[MECHANICAL SERVICE] Response",
      data
    );

    /**
     * Handle API Failure
     */
    if (!response.ok) {
      throw new Error(
        data?.message ||
          "Mechanical Dashboard API Failed"
      );
    }

    /**
     * Return Response
     */
    return data;
  } catch (error: any) {
    console.error(
      "[MECHANICAL SERVICE] Error",
      error
    );

    throw new Error(
      error?.message ||
        "Unable to load Mechanical Dashboard Data"
    );
  }
};