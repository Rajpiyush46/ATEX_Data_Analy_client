// import { combineReducers } from "redux";

// import excelReducer from "./excel/reducers";
// import vtReducer from "./vt/reducers";
// import voltageReducer from "./voltage/reducer";
// import currentReducer from "./current/reducer";

// const rootReducer = combineReducers({
//   excel: excelReducer,
//   vt: vtReducer,
//   voltage: voltageReducer,
//   current: currentReducer,
// });

// export default rootReducer;

import { combineReducers } from "redux";

import excelReducer from "./excel/reducers";
import vtReducer from "./vt/reducers";
import voltageReducer from "./voltage/reducer";
import currentReducer from "./current/reducer";
import ambientReducer from "./ambient/reducer";
import performanceReducer from "./performance/reducer";
import oilReducer from "./oil/reducer";
import comparisonReducer from "./comparison/reducer";
import overviewReducer from "./overview/reducer";
import testAnalyticsReducer from "./testAnalytics/reducer";
import mechanicalReducer from "./mechanical/reducer";
import reportReducer from "./report/reducer";


const rootReducer = combineReducers({
  excel: excelReducer,
  vt: vtReducer,
  voltage: voltageReducer,
  current: currentReducer,
  ambient: ambientReducer,
  performance: performanceReducer,
  oil: oilReducer,
  comparison: comparisonReducer,
  overview: overviewReducer,
  testAnalytics: testAnalyticsReducer,
  mechanical: mechanicalReducer,
  report: reportReducer,
});


export default rootReducer;
