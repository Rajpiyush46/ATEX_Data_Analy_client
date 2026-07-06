import { call, put, takeLatest } from "redux-saga/effects";

import { uploadExcelSuccess, uploadExcelFailure } from "./actions";

import { UPLOAD_EXCEL_REQUEST } from "./types";

import { uploadExcelFile } from "@/service/excelImport.service";

/**
 * Upload Excel Worker
 */
function* uploadExcelSaga(action: any): any {
  try {
    const response = yield call(uploadExcelFile, action.payload);

    yield put(uploadExcelSuccess(response));
  } catch (error: any) {
    yield put(uploadExcelFailure(error.message));
  }
}

/**
 * Watch Upload Excel
 */
export default function* excelSaga() {
  yield takeLatest(UPLOAD_EXCEL_REQUEST, uploadExcelSaga);
}
