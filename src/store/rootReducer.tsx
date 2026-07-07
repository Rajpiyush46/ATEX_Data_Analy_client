import { combineReducers } from "redux";

import excelReducer from "./excel/reducers";
import vtReducer from "./vt/reducers";
import voltageReducer from "./voltage/reducer";
import currentReducer from "./current/reducer";
import ambientReducer from "./ambient/reducer";

const rootReducer = combineReducers({
  excel: excelReducer,
  vt: vtReducer,
  voltage: voltageReducer,
  current: currentReducer,
  ambient: ambientReducer,
});

export default rootReducer;
