/**
 * VT API Service
 *
 * Handles:
 * - VT1
 * - VT2
 * - VT3
 * - VT4
 * - VT5
 * - VT6
 * - VT7
 * - VT8
 * - VT9
 *
 * API:
 * POST /api/vt/:vtName
 */

const API_BASE_URL = "http://localhost:3000/api";

/**
 * Get VT Data
 *
 * @param vtName
 * @param filters
 *
 * Example:
 *
 * getVTData("VT1", {
 *   fromDate: "2026-07-06",
 * });
 *
 * getVTData("VT2", {
 *   fromDate: "2026-07-01",
 *   toDate: "2026-07-06",
 * });
 *
 * getVTData("VT3", {
 *   fromDate: "2026-07-01",
 *   toDate: "2026-07-06",
 *   fromTime: "08:00:00",
 *   toTime: "18:00:00",
 * });
 */
export const getVTData = async (
  vtName: string,
  filters: {
    fromDate?: string;
    toDate?: string;
    fromTime?: string;
    toTime?: string;
  }
) => {
  try {
    /**
     * Call VT API
     */
    const response = await fetch(`${API_BASE_URL}/vt/${vtName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    });

    /**
     * Parse API Response
     */
    const data = await response.json();

    console.log(`[VT SERVICE] ${vtName} Response`, data);

    /**
     * Handle API Failure
     */
    if (!response.ok) {
      throw new Error(data?.message || `${vtName} API failed`);
    }

    /**
     * Return Success Response
     */
    return data;
  } catch (error: any) {
    console.error(`[VT SERVICE] ${vtName} Error`, error);

    throw new Error(error?.message || `Unable to load ${vtName} data`);
  }
};
