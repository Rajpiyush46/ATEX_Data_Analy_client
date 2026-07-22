import {
  GET_MECHANICAL_DASHBOARD_REQUEST,
  GET_MECHANICAL_DASHBOARD_SUCCESS,
  GET_MECHANICAL_DASHBOARD_FAILURE,
} from "./types";

const initialState = {
  dashboard: null,
  loading: false,
  error: null,
};

const mechanicalReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case GET_MECHANICAL_DASHBOARD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_MECHANICAL_DASHBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        dashboard: action.payload,
      };

    case GET_MECHANICAL_DASHBOARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default mechanicalReducer;