import { combineReducers } from "redux";

import excelReducer from "./excel/reducers";
import vtReducer from "./vt/reducers";

const rootReducer = combineReducers({
  excel: excelReducer,
  vt: vtReducer,
});

export default rootReducer;
