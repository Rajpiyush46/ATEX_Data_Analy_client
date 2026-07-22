import {
  GET_OVERVIEW_REQUEST,
  GET_OVERVIEW_SUCCESS,
  GET_OVERVIEW_FAILURE,
} from "./types";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const overviewReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_OVERVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_OVERVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };

    case GET_OVERVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default overviewReducer;
