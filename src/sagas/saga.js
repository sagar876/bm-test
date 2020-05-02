import { delay } from "redux-saga";
import { takeLatest, put } from "redux-saga/effects";

function* getVendorBills(action) {
  //yield put({ type: "GET_VENDOR_BILLS", payload:action.payload });
}

export function* watchDashboard() {
  //yield takeLatest("GET_VENDOR_BILLS", getVendorBills);
}
