import {
  call,
  put,
  takeLatest,
} from "redux-saga/effects";

import {
  GET_MECHANICAL_DASHBOARD_REQUEST,
} from "./types";

import {
  getMechanicalDashboardSuccess,
  getMechanicalDashboardFailure,
} from "./actions";

import {
  getMechanicalDashboardData,
} from "@/service/mechanical.service";

function* getMechanicalDashboardWorker(
  action: any
): Generator<any, void, any> {
  try {
    const response = yield call(
      getMechanicalDashboardData,
      action.payload
    );

    yield put(
      getMechanicalDashboardSuccess(
        response.data
      )
    );
  } catch (error: any) {
    yield put(
      getMechanicalDashboardFailure(
        error.message
      )
    );
  }
}

export default function* mechanicalSaga() {
  yield takeLatest(
    GET_MECHANICAL_DASHBOARD_REQUEST,
    getMechanicalDashboardWorker
  );
}