import {
  GET_VOLTAGE_REQUEST,
  GET_VOLTAGE_SUCCESS,
  GET_VOLTAGE_FAILURE,
} from "./types";

export const getVoltageRequest = (payload: any) => ({
  type: GET_VOLTAGE_REQUEST,
  payload,
});

export const getVoltageSuccess = (payload: any) => ({
  type: GET_VOLTAGE_SUCCESS,
  payload,
});

export const getVoltageFailure = (error: string) => ({
  type: GET_VOLTAGE_FAILURE,
  payload: error,
});
