import { all } from "redux-saga/effects";

import excelSaga from "./excel/sagas";
import vtSaga from "./vt/sagas";

export default function* rootSaga() {
  yield all([excelSaga(), vtSaga()]);
}
