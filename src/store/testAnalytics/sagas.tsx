import {
  call,
  put,
  takeLatest,
} from "redux-saga/effects";

import {
  GET_TEST_ANALYTICS_REQUEST,
} from "./types";

import {
  getTestAnalyticsSuccess,
  getTestAnalyticsFailure,
} from "./actions";

import {
  getTestAnalyticsData,
} from "@/service/testAnalytics.service";

function* getTestAnalyticsWorker(
  action: any
): Generator<any, void, any> {
  try {
    const response = yield call(
      getTestAnalyticsData,
      action.payload
    );

    yield put(
      getTestAnalyticsSuccess(
        response.data
      )
    );
  } catch (error: any) {
    yield put(
      getTestAnalyticsFailure(
        error.message
      )
    );
  }
}

export default function* testAnalyticsSaga() {
  yield takeLatest(
    GET_TEST_ANALYTICS_REQUEST,
    getTestAnalyticsWorker
  );
}