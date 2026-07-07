import { GET_VT_REQUEST, GET_VT_SUCCESS, GET_VT_FAILURE } from "./types";

/**
 * Request
 */
export const getVTRequest = (payload: { vtName: string; filters: any }) => ({
  type: GET_VT_REQUEST,
  payload,
});

/**
 * Success
 */
export const getVTSuccess = (data: any) => ({
  type: GET_VT_SUCCESS,
  payload: data,
});

/**
 * Failure
 */
export const getVTFailure = (error: string) => ({
  type: GET_VT_FAILURE,
  payload: error,
});
