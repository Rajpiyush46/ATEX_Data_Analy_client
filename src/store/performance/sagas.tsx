import { call, put, takeEvery } from "redux-saga/effects";

import { GET_PERFORMANCE_REQUEST } from "./types";

import {
  getPerformanceSuccess,
  getPerformanceFailure,
} from "./actions";

import { getPerformanceData } from "@/service/performance.service";

/**
 * Worker Saga
 */
function* getPerformanceSaga(action: any): any {
  try {
    const response = yield call(
      getPerformanceData,
      action.payload.parameterName,
      action.payload.filters
    );

    yield put(
      getPerformanceSuccess({
        parameterName: action.payload.parameterName,
        data: response.data,
      })
    );
  } catch (error: any) {
    yield put(getPerformanceFailure(error.message));
  }
}

/**
 * Watcher Saga
 */
export default function* performanceSaga() {
  yield takeEvery(
    GET_PERFORMANCE_REQUEST,
    getPerformanceSaga
  );
}