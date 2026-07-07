import {
  GET_VOLTAGE_REQUEST,
  GET_VOLTAGE_SUCCESS,
  GET_VOLTAGE_FAILURE,
} from "./types";

const initialState = {
  loading: false,
  charts: {},
  error: null,
};

const voltageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_VOLTAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_VOLTAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        charts: {
          ...state.charts,
          [action.payload.voltageName]: action.payload.data,
        },
      };

    case GET_VOLTAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default voltageReducer;
