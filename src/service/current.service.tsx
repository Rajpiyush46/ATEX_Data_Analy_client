/**
 * Current API Service
 *
 * Handles:
 * - Current1
 * - Current2
 * - Current3
 *
 * API:
 * POST /api/current/:currentName
 */

const API_BASE_URL = "http://localhost:3000/api";

/**
 * Get Current Data
 *
 * @param currentName
 * @param filters
 */
export const getCurrentData = async (
  currentName: string,
  filters: {
    fromDate?: string;
    toDate?: string;
    fromTime?: string;
    toTime?: string;
  }
) => {
  try {
    /**
     * Call Current API
     */
    const response = await fetch(
      `${API_BASE_URL}/current/${currentName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      }
    );

    /**
     * Parse API Response
     */
    const data = await response.json();

    console.log(
      `[CURRENT SERVICE] ${currentName} Response`,
      data
    );

    /**
     * Handle API Failure
     */
    if (!response.ok) {
      throw new Error(
        data?.message || `${currentName} API failed`
      );
    }

    /**
     * Return Success Response
     */
    return data;
  } catch (error: any) {
    console.error(
      `[CURRENT SERVICE] ${currentName} Error`,
      error
    );

    throw new Error(
      error?.message ||
        `Unable to load ${currentName} data`
    );
  }
};