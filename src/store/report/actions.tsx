import {
  GET_REPORT_REQUEST,
  GET_REPORT_SUCCESS,
  GET_REPORT_FAILURE,
} from "./types";

export const getReportRequest = (payload?: any) => ({
  type: GET_REPORT_REQUEST,
  payload,
});

export const getReportSuccess = (payload: any) => ({
  type: GET_REPORT_SUCCESS,
  payload,
});

export const getReportFailure = (payload: any) => ({
  type: GET_REPORT_FAILURE,
  payload,
});
