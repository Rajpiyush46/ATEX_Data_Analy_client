/**
 * Voltage API Service
 *
 * Handles:
 * - Voltage1
 * - Voltage2
 * - Voltage3
 *
 * API:
 * POST /api/voltage/:voltageName
 */

const API_BASE_URL = "http://localhost:3000/api";

/**
 * Get Voltage Data
 *
 * @param voltageName
 * @param filters
 *
 * Example:
 *
 * getVoltageData("Voltage1", {
 *   fromDate: "2026-07-06",
 * });
 *
 * getVoltageData("Voltage2", {
 *   fromDate: "2026-07-01",
 *   toDate: "2026-07-06",
 * });
 *
 * getVoltageData("Voltage3", {
 *   fromDate: "2026-07-01",
 *   toDate: "2026-07-06",
 *   fromTime: "08:00:00",
 *   toTime: "18:00:00",
 * });
 */
export const getVoltageData = async (
  voltageName: string,
  filters: {
    fromDate?: string;
    toDate?: string;
    fromTime?: string;
    toTime?: string;
  }
) => {
  try {
    /**
     * Call Voltage API
     */
    const response = await fetch(`${API_BASE_URL}/voltage/${voltageName}`, {
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

    console.log(`[VOLTAGE SERVICE] ${voltageName} Response`, data);

    /**
     * Handle API Failure
     */
    if (!response.ok) {
      throw new Error(data?.message || `${voltageName} API failed`);
    }

    /**
     * Return Success Response
     */
    return data;
  } catch (error: any) {
    console.error(`[VOLTAGE SERVICE] ${voltageName} Error`, error);

    throw new Error(error?.message || `Unable to load ${voltageName} data`);
  }
};
