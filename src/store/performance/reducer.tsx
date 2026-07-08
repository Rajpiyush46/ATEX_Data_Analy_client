// import {
//   GET_PERFORMANCE_REQUEST,
//   GET_PERFORMANCE_SUCCESS,
//   GET_PERFORMANCE_FAILURE,
// } from "./types";

// const initialState = {
//   loading: false,
//   charts: {},
//   error: null,
// };

// export default function performanceReducer(
//   state = initialState,
//   action: any
// ) {
//   switch (action.type) {
//     case GET_PERFORMANCE_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };

//     case GET_PERFORMANCE_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         charts: {
//           ...state.charts,
//           [action.payload.key]: action.payload.data,
//         },
//       };

//     case GET_PERFORMANCE_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     default:
//       return state;
//   }
// }

import {
  GET_PERFORMANCE_REQUEST,
  GET_PERFORMANCE_SUCCESS,
  GET_PERFORMANCE_FAILURE,
} from "./types";

const initialState = {
  loading: false,
  charts: {},
  error: null,
};

export default function performanceReducer(
  state = initialState,
  action: any
) {
  switch (action.type) {
    case GET_PERFORMANCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_PERFORMANCE_SUCCESS:
      console.log(
        "PERFORMANCE REDUCER SUCCESS",
        action.payload
      );

      return {
        ...state,
        loading: false,
        charts: {
          ...state.charts,
          [action.payload.parameterName]:
            action.payload.data,
        },
      };

    case GET_PERFORMANCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}