import {
  GET_OIL_REQUEST,
  GET_OIL_SUCCESS,
  GET_OIL_FAILURE,
} from "./types";

export const getOilRequest = (
  payload: {
    parameterName: string;
    filters: {
      fromDate?: string;
      toDate?: string;
      fromTime?: string;
      toTime?: string;
    };
  }
) => ({
  type: GET_OIL_REQUEST,
  payload,
});

export const getOilSuccess = (
  payload: {
    parameterName: string;
    data: any;
  }
) => ({
  type: GET_OIL_SUCCESS,
  payload,
});

export const getOilFailure = (
  error: any
) => ({
  type: GET_OIL_FAILURE,
  payload: error,
});