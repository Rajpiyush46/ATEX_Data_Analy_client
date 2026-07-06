import { combineReducers } from "redux";

import excelReducer from "./excel/reducers";

const rootReducer = combineReducers({
  excel: excelReducer,
});

export default rootReducer;
