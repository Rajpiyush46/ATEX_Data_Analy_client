/**
 * Ambient API Service
 *
 * Handles:
 * - Ambient_temperature
 * - Ambient_humidity
 * - Ambient_pressure
 *
 * API:
 * POST /api/ambient/:ambientName
 */

const API_BASE_URL = "http://localhost:3000/api";

export const getAmbientData = async (
  ambientName: string,
  filters: {
    fromDate?: string;
    toDate?: string;
    fromTime?: string;
    toTime?: string;
  }
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ambient/${ambientName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    });

    const data = await response.json();

    console.log(`[AMBIENT SERVICE] ${ambientName} Response`, data);

    if (!response.ok) {
      throw new Error(data?.message || `${ambientName} API failed`);
    }

    return data;
  } catch (error: any) {
    console.error(`[AMBIENT SERVICE] ${ambientName} Error`, error);
    throw new Error(error?.message || `Unable to load ${ambientName} data`);
  }
};
``;
