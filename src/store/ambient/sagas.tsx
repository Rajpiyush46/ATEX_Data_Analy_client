import { call, put, takeEvery } from "redux-saga/effects";
import { GET_AMBIENT_REQUEST } from "./types";
import { getAmbientSuccess, getAmbientFailure } from "./actions";
import { getAmbientData } from "@/service/ambient.service";

function* getAmbientSaga(action: any): any {
  try {
    const response = yield call(
      getAmbientData,
      action.payload.ambientName,
      action.payload.filters
    );

    yield put(
      getAmbientSuccess({
        ambientName: action.payload.ambientName,
        data: response.data,
      })
    );
  } catch (error: any) {
    yield put(getAmbientFailure(error.message));
  }
}

export default function* ambientSaga() {
  yield takeEvery(GET_AMBIENT_REQUEST, getAmbientSaga);
}
