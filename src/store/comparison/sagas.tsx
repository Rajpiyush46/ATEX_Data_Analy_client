import { call, put, takeEvery } from "redux-saga/effects";

import { getComparisonData } from "../../service/comparison.service";

import { GET_COMPARISON } from "./types";

import { getComparisonSuccess, getComparisonFailure } from "./actions";

function* comparisonSaga(action: any): Generator<any, any, any> {
  try {
    console.log("COMPARISON SAGA TRIGGERED", action.payload);
    const response = yield call(getComparisonData, action.payload);

    yield put(getComparisonSuccess(response.data));
  } catch (error: any) {
    yield put(getComparisonFailure(error.message));
  }
}

export default function* watchComparison() {
  yield takeEvery(GET_COMPARISON, comparisonSaga);
}
