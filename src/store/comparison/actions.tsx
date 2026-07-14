import {
  GET_COMPARISON,
  GET_COMPARISON_SUCCESS,
  GET_COMPARISON_FAILURE,
} from "./types";

export const getComparison = (payload: any) => ({
  type: GET_COMPARISON,
  payload,
});

export const getComparisonSuccess = (
  payload: any
) => ({
  type: GET_COMPARISON_SUCCESS,
  payload,
});

export const getComparisonFailure = (
  payload: any
) => ({
  type: GET_COMPARISON_FAILURE,
  payload,
});