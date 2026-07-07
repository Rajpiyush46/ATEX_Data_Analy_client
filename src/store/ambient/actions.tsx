import {
  GET_AMBIENT_REQUEST,
  GET_AMBIENT_SUCCESS,
  GET_AMBIENT_FAILURE,
} from "./types";

export const getAmbientRequest = (
  payload: any
) => ({
  type: GET_AMBIENT_REQUEST,
  payload,
});

export const getAmbientSuccess = (
  payload: any
) => ({
  type: GET_AMBIENT_SUCCESS,
  payload,
});

export const getAmbientFailure = (
  error: string
) => ({
  type: GET_AMBIENT_FAILURE,
  payload: error,
});