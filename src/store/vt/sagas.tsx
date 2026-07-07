import { call, put, takeEvery } from "redux-saga/effects";
import { GET_VT_REQUEST } from "./types";
import { getVTSuccess, getVTFailure } from "./actions";
import { getVTData } from "@/service/vt.service";

/**
 * Worker Saga
 */
function* getVTSaga(action: any): any {
  try {
    const response = yield call(
      getVTData,
      action.payload.vtName,
      action.payload.filters
    );

    yield put(
      getVTSuccess({
        vtName: action.payload.vtName,
        data: response.data,
      })
    );
  } catch (error: any) {
    yield put(getVTFailure(error.message));
  }
}

/**
 * Watcher Saga
 */
export default function* vtSaga() {
  yield takeEvery(GET_VT_REQUEST, getVTSaga);
}
