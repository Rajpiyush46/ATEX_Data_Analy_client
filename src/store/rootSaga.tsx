import { all } from "redux-saga/effects";

import excelSaga from "./excel/sagas";

export default function* rootSaga() {
  yield all([excelSaga()]);
}
