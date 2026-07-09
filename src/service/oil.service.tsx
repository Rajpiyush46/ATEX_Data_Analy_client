/**
 * Oil API Service
 *
 * Handles:
 * - BugOilPressure
 * - BugOilOutPressure
 * - BugOilTemperature
 * - BugOilOutTemperature
 * - BugOilOutFlow
 *
 * Backend Route:
 * POST /api/oil/:oilName
 */

const API_BASE_URL = "http://localhost:3000/api";

/**
 * Get Oil Data
 */
export const getOilData = async (
  parameterName: string,
  filters: {
    fromDate?: string;
    toDate?: string;
    fromTime?: string;
    toTime?: string;
  }
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/oil/${parameterName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      }
    );

    const data = await response.json();

    console.log(
      `[OIL SERVICE] ${parameterName} Response`,
      data
    );

    if (!response.ok) {
      throw new Error(
        data?.message ||
          `${parameterName} API failed`
      );
    }

    return data;
  } catch (error: any) {
    console.error(
      `[OIL SERVICE] ${parameterName} Error`,
      error
    );

    throw new Error(
      error?.message ||
        `Unable to load ${parameterName} data`
    );
  }
};