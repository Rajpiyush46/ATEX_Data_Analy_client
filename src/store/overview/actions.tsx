import {
  GET_OVERVIEW_REQUEST,
  GET_OVERVIEW_SUCCESS,
  GET_OVERVIEW_FAILURE,
} from "./types";

export const getOverviewRequest = (payload: any) => ({
  type: GET_OVERVIEW_REQUEST,
  payload,
});

export const getOverviewSuccess = (payload: any) => ({
  type: GET_OVERVIEW_SUCCESS,
  payload,
});

export const getOverviewFailure = (payload: any) => ({
  type: GET_OVERVIEW_FAILURE,
  payload,
});
