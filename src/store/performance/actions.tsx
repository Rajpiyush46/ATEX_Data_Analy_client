import {
  GET_PERFORMANCE_REQUEST,
  GET_PERFORMANCE_SUCCESS,
  GET_PERFORMANCE_FAILURE,
} from "./types";

/**
 * Request
 */
export const getPerformanceRequest = (payload: any) => ({
  type: GET_PERFORMANCE_REQUEST,
  payload,
});

/**
 * Success
 */
export const getPerformanceSuccess = (payload: any) => ({
  type: GET_PERFORMANCE_SUCCESS,
  payload,
});

/**
 * Failure
 */
export const getPerformanceFailure = (error: string) => ({
  type: GET_PERFORMANCE_FAILURE,
  payload: error,
});