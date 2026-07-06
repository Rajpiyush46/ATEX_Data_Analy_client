import {
  UPLOAD_EXCEL_REQUEST,
  UPLOAD_EXCEL_SUCCESS,
  UPLOAD_EXCEL_FAILURE,
} from "./types";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const excelReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPLOAD_EXCEL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPLOAD_EXCEL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case UPLOAD_EXCEL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default excelReducer;
