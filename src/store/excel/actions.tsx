import {
  UPLOAD_EXCEL_REQUEST,
  UPLOAD_EXCEL_SUCCESS,
  UPLOAD_EXCEL_FAILURE,
} from "./types";

/**
 * Upload Excel Request
 */
export const uploadExcelRequest = (file: File) => ({
  type: UPLOAD_EXCEL_REQUEST,
  payload: file,
});

/**
 * Upload Excel Success
 */
export const uploadExcelSuccess = (data: any) => ({
  type: UPLOAD_EXCEL_SUCCESS,
  payload: data,
});

/**
 * Upload Excel Failure
 */
export const uploadExcelFailure = (error: string) => ({
  type: UPLOAD_EXCEL_FAILURE,
  payload: error,
});
