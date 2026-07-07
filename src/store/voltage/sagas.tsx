import { call, put, takeEvery } from "redux-saga/effects";

import { GET_VOLTAGE_REQUEST } from "./types";

import { getVoltageSuccess, getVoltageFailure } from "./actions";

import { getVoltageData } from "@/service/voltage.service";

/**
 * Worker Saga
 */
function* getVoltageSaga(action: any): any {
  try {
    const response = yield call(
      getVoltageData,
      action.payload.voltageName,
      action.payload.filters
    );

    yield put(
      getVoltageSuccess({
        voltageName: action.payload.voltageName,
        data: response.data,
      })
    );
  } catch (error: any) {
    yield put(getVoltageFailure(error.message));
  }
}

/**
 * Watcher Saga
 */
export default function* voltageSaga() {
  yield takeEvery(GET_VOLTAGE_REQUEST, getVoltageSaga);
}
