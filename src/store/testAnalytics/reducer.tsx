import {
  GET_TEST_ANALYTICS_REQUEST,
  GET_TEST_ANALYTICS_SUCCESS,
  GET_TEST_ANALYTICS_FAILURE,
} from "./types";

const initialState = {
  loading: false,
  dashboard: null,
  error: null,
};

const testAnalyticsReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case GET_TEST_ANALYTICS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_TEST_ANALYTICS_SUCCESS:
      return {
        ...state,
        loading: false,
        dashboard: action.payload,
      };

    case GET_TEST_ANALYTICS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default testAnalyticsReducer;