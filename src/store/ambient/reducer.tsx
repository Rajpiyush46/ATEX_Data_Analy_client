import {
  GET_AMBIENT_REQUEST,
  GET_AMBIENT_SUCCESS,
  GET_AMBIENT_FAILURE,
} from "./types";

const initialState = {
  loading: false,
  charts: {},
  error: null,
};

const ambientReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_AMBIENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_AMBIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        charts: {
          ...state.charts,
          [action.payload.ambientName]: action.payload.data,
        },
      };
    case GET_AMBIENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default ambientReducer;
