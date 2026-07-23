
import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import { uploadExcelSuccess, uploadExcelFailure } from "./actions";
import { UPLOAD_EXCEL_REQUEST } from "./types";
import { uploadExcelFile } from "@/service/excelImport.service";

function* uploadExcelSaga(action: any): any {
  try {
    const response = yield call(uploadExcelFile, action.payload);

    yield put(uploadExcelSuccess(response));

    if (response?.success) {
      toast.success(response?.message || "Excel Uploaded Successfully");
    }
  } catch (error: any) {
    toast.error(error?.message || "Excel Upload Failed");

    yield put(uploadExcelFailure(error.message));
  }
}

export default function* excelSaga() {
  yield takeLatest(UPLOAD_EXCEL_REQUEST, uploadExcelSaga);
}
