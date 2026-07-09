import {
  GET_OIL_REQUEST,
  GET_OIL_SUCCESS,
  GET_OIL_FAILURE,
} from "./types";

const initialState = {
  loading: false,
  charts: {},
  error: null,
};

const oilReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case GET_OIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_OIL_SUCCESS:
      return {
        ...state,
        loading: false,
        charts: {
          ...state.charts,
          [action.payload.parameterName]:
            action.payload.data?.data ||
            action.payload.data,
        },
      };

    case GET_OIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default oilReducer;