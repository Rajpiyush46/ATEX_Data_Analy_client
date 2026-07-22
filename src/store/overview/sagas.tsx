import {
  call,
  put,
  takeLatest,
} from "redux-saga/effects";

import {
  GET_OVERVIEW_REQUEST,
} from "./types";

import {
  getOverviewSuccess,
  getOverviewFailure,
} from "./actions";

import {
  getOverviewData,
} from "../../service/overview.service";

function* getOverviewSaga(
  action: any
): any {
  try {
    const response = yield call(
      getOverviewData,
      action.payload
    );

    yield put(
      getOverviewSuccess(
        response
      )
    );
  } catch (error: any) {
    yield put(
      getOverviewFailure(
        error.message
      )
    );
  }
}

export default function* overviewWatcher() {
  yield takeLatest(
    GET_OVERVIEW_REQUEST,
    getOverviewSaga
  );
}