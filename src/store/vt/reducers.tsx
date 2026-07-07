import {
  GET_VT_REQUEST,
  GET_VT_SUCCESS,
  GET_VT_FAILURE,
} from "./types";

const initialState = {
  loading: false,
  charts: {},
  error: null,
};

const vtReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case GET_VT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_VT_SUCCESS:
      return {
        ...state,
        loading: false,
        charts: {
          ...state.charts,
          [action.payload.vtName]:
            action.payload.data,
        },
      };

    case GET_VT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default vtReducer;