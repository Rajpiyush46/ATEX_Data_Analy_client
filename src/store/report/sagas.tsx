import { call, put, takeLatest } from "redux-saga/effects";

import { getReportSuccess, getReportFailure } from "./actions";

import { GET_REPORT_REQUEST } from "./types";

import { getReportSummary } from "@/service/report.service";

function* getReportSaga(): any {
  try {
    const response = yield call(
      getReportSummary
    );

    yield put(
      getReportSuccess(
        response.data
      )
    );
  } catch (error: any) {
    yield put(
      getReportFailure(
        error.message
      )
    );
  }
}

export default function* reportSaga() {
  yield takeLatest(GET_REPORT_REQUEST, getReportSaga);
}
