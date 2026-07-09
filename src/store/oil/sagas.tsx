import {
  call,
  put,
  takeEvery,
} from "redux-saga/effects";

import {
  GET_OIL_REQUEST,
} from "./types";

import {
  getOilSuccess,
  getOilFailure,
} from "./actions";

import {
  getOilData,
} from "@/service/oil.service";

function* getOilSaga(
  action: any
): Generator<any, void, any> {
  try {
    const response = yield call(
      getOilData,
      action.payload.parameterName,
      action.payload.filters
    );

    yield put(
      getOilSuccess({
        parameterName:
          action.payload.parameterName,
        data: response,
      })
    );
  } catch (error: any) {
    yield put(
      getOilFailure(
        error?.message ||
          "Failed to fetch oil data"
      )
    );
  }
}

export default function* oilSaga() {
  yield takeEvery(
    GET_OIL_REQUEST,
    getOilSaga
  );
}