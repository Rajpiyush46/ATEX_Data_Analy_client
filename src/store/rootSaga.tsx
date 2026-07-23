// import { all } from "redux-saga/effects";

// import excelSaga from "./excel/sagas";
// import vtSaga from "./vt/sagas";
// import voltageSaga from "./voltage/sagas";
// import currentSaga from "./current/sagas";

// export default function* rootSaga() {
//   yield all([excelSaga(), vtSaga(), voltageSaga(), currentSaga()]);
// }

import { all } from "redux-saga/effects";

import excelSaga from "./excel/sagas";
import vtSaga from "./vt/sagas";
import voltageSaga from "./voltage/sagas";
import currentSaga from "./current/sagas";
import ambientSaga from "./ambient/sagas";
import performanceSaga from "./performance/sagas";
import oilSaga from "./oil/sagas";
import watchComparison from "./comparison/sagas";
import overviewWatcher from "./overview/sagas";
import testAnalyticsSaga from "./testAnalytics/sagas";
import mechanicalSaga from "./mechanical/sagas";
import reportSaga from "./report/sagas";

export default function* rootSaga() {
  yield all([
    excelSaga(),
    vtSaga(),
    voltageSaga(),
    currentSaga(),
    ambientSaga(),
    performanceSaga(),
    oilSaga(),
    watchComparison(),
    overviewWatcher(),
    testAnalyticsSaga(),
    mechanicalSaga(),
    reportSaga(),
  ]);
}
