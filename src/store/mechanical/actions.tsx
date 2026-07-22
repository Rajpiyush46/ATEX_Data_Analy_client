import {
  GET_MECHANICAL_DASHBOARD_REQUEST,
  GET_MECHANICAL_DASHBOARD_SUCCESS,
  GET_MECHANICAL_DASHBOARD_FAILURE,
} from "./types";

export const getMechanicalDashboardRequest = (
  payload?: any
) => ({
  type: GET_MECHANICAL_DASHBOARD_REQUEST,
  payload,
});

export const getMechanicalDashboardSuccess = (
  payload: any
) => ({
  type: GET_MECHANICAL_DASHBOARD_SUCCESS,
  payload,
});

export const getMechanicalDashboardFailure = (
  payload: any
) => ({
  type: GET_MECHANICAL_DASHBOARD_FAILURE,
  payload,
});