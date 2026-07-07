import {
  GET_CURRENT_REQUEST,
  GET_CURRENT_SUCCESS,
  GET_CURRENT_FAILURE,
} from "./types";

const initialState = {
  loading: false,
  charts: {},
  error: null,
};

const currentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_CURRENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_CURRENT_SUCCESS:
      return {
        ...state,
        loading: false,
        charts: {
          ...state.charts,
          [action.payload.currentName]: action.payload.data,
        },
      };

    case GET_CURRENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default currentReducer;
