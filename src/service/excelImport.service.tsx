/**
 * Excel Import API Service
 * Uploads Excel file to backend
 */

const API_BASE_URL = "http://localhost:3000/api"; // these should be written in contraint .js >>>> piyush correct this

/**
 * Upload Excel File
 */
export const uploadExcelFile = async (file: File) => {
  try {
    // Create multipart form data
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${API_BASE_URL}/excel-import/import`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log("Excel upload Response", data);
    if (!response.ok) {
      throw new Error(data?.message || "Excel upload failed");
    }
    return data;
  } catch (error: any) {
    console.error("Excel Upload Service Error:", error);

    throw new Error(error?.message || "Unable to upload Excel file");
  }
};
