import {
  GET_TEST_ANALYTICS_REQUEST,
  GET_TEST_ANALYTICS_SUCCESS,
  GET_TEST_ANALYTICS_FAILURE,
} from "./types";

export const getTestAnalyticsRequest = (
  payload: any
) => ({
  type: GET_TEST_ANALYTICS_REQUEST,
  payload,
});

export const getTestAnalyticsSuccess = (
  payload: any
) => ({
  type: GET_TEST_ANALYTICS_SUCCESS,
  payload,
});

export const getTestAnalyticsFailure = (
  error: string
) => ({
  type: GET_TEST_ANALYTICS_FAILURE,
  payload: error,
});