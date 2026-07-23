import {
  GET_REPORT_REQUEST,
  GET_REPORT_SUCCESS,
  GET_REPORT_FAILURE,
} from "./types";

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default function reportReducer(
  state = INITIAL_STATE,
  action: any
) {
  switch (action.type) {
    case GET_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case GET_REPORT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}