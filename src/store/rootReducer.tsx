import { combineReducers } from "redux";

import excelReducer from "./excel/reducers";
import vtReducer from "./vt/reducers";
import voltageReducer from "./voltage/reducer";
import currentReducer from "./current/reducer";

const rootReducer = combineReducers({
  excel: excelReducer,
  vt: vtReducer,
  voltage: voltageReducer,
  current: currentReducer,
});

export default rootReducer;
