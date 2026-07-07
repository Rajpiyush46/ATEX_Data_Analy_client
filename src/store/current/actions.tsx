import {
  GET_CURRENT_REQUEST,
  GET_CURRENT_SUCCESS,
  GET_CURRENT_FAILURE,
} from "./types";

/**
 * Request
 */
export const getCurrentRequest = (payload: any) => ({
  type: GET_CURRENT_REQUEST,
  payload,
});

/**
 * Success
 */
export const getCurrentSuccess = (payload: any) => ({
  type: GET_CURRENT_SUCCESS,
  payload,
});

/**
 * Failure
 */
export const getCurrentFailure = (error: string) => ({
  type: GET_CURRENT_FAILURE,
  payload: error,
});
