/**
 * Performance API Service
 *
 * Handles:
 * - BugSpeed
 * - BugTorque
 *
 * APIs:
 * POST /api/bugSpeed
 * POST /api/bugTorque
 */

const API_BASE_URL = "http://localhost:3000/api";

/**
 * Get Performance Data
 */
export const getPerformanceData = async (
  parameterName: string,
  filters: {
    fromDate?: string;
    toDate?: string;
    fromTime?: string;
    toTime?: string;
  }
) => {
  try {
    let endpoint = "";

    switch (parameterName) {
      case "BugSpeed":
        endpoint = "bug-speed";
        break;

      case "BugTorque":
        endpoint = "bug-torque";
        break;

      default:
        throw new Error(
          `Unsupported performance parameter: ${parameterName}`
        );
    }

    const response = await fetch(
      `${API_BASE_URL}/${endpoint}`,
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
      `[PERFORMANCE SERVICE] ${parameterName} Response`,
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
      `[PERFORMANCE SERVICE] ${parameterName} Error`,
      error
    );

    throw new Error(
      error?.message ||
        `Unable to load ${parameterName} data`
    );
  }
};