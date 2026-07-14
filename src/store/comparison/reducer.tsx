import {
  GET_COMPARISON,
  GET_COMPARISON_SUCCESS,
  GET_COMPARISON_FAILURE,
} from "./types";

const INITIAL_STATE = {
  loading: false,
  comparisonData: [],
  error: null,
};

export default function reducer(
  state = INITIAL_STATE,
  action: any
) {
  switch (action.type) {
    case GET_COMPARISON:
      return {
        ...state,
        loading: true,
      };

    case GET_COMPARISON_SUCCESS:
      return {
        ...state,
        loading: false,
        comparisonData: action.payload,
      };

    case GET_COMPARISON_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}