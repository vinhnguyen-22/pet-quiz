import { call, put, takeEvery, all, fork } from "redux-saga/effects";

// Ecoomerce Redux States
import { GET_INVOICES } from "./actionType";

import {
    invoiceApiResponseSuccess,
    invoiceApiResponseError,
} from "./action";

//Include Both Helper File with needed methods
import {
  getInvoices as getInvoicesApi,
} from "../../helpers/fakebackend_helper";

function* getInvoices() {
  try {
    const response = yield call(getInvoicesApi);
    yield put(invoiceApiResponseSuccess(GET_INVOICES, response));
  } catch (error) {
    yield put(invoiceApiResponseError(GET_INVOICES, error));
  }
}

export function* watchGetInvoices() {
  yield takeEvery(GET_INVOICES, getInvoices);
}

function* invoiceSaga() {
  yield all([
    fork(watchGetInvoices)
  ]);
}

export default invoiceSaga;