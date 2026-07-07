import { call, put, takeEvery } from "redux-saga/effects";

import { GET_CURRENT_REQUEST } from "./types";

import { getCurrentSuccess, getCurrentFailure } from "./actions";

import { getCurrentData } from "@/service/current.service";

/**
 * Worker Saga
 */
function* getCurrentSaga(action: any): any {
  try {
    const response = yield call(
      getCurrentData,
      action.payload.currentName,
      action.payload.filters
    );

    yield put(
      getCurrentSuccess({
        currentName: action.payload.currentName,
        data: response.data,
      })
    );
  } catch (error: any) {
    yield put(getCurrentFailure(error.message));
  }
}

/**
 * Watcher Saga
 */
export default function* currentSaga() {
  yield takeEvery(GET_CURRENT_REQUEST, getCurrentSaga);
}
