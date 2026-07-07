import { all } from "redux-saga/effects";

import excelSaga from "./excel/sagas";
import vtSaga from "./vt/sagas";
import voltageSaga from "./voltage/sagas";
import currentSaga from "./current/sagas";
import ambientSaga from "./ambient/sagas";

export default function* rootSaga() {
  yield all([
    excelSaga(),
    vtSaga(),
    voltageSaga(),
    currentSaga(),
    ambientSaga(),
  ]);
}
