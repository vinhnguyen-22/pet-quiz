import { call, put, takeEvery, all, fork } from "redux-saga/effects";

// Ecoomerce Redux States
import {
  GET_CONTACTS,
  GET_COMPANIES,
  GET_DEALS,
  GET_LEADS,
} from "./actionType";

import {
  crmApiResponseSuccess,
  crmApiResponseError,
} from "./action";

//Include Both Helper File with needed methods
import {
  getContacts as getContactsApi,
  getCompanies as getCompaniesApi,
  getDeals as getDealsApi,
  getLeads as getLeadsApi,
} from "../../helpers/fakebackend_helper";

function* getContacts() {
  try {
    const response = yield call(getContactsApi);
    yield put(crmApiResponseSuccess(GET_CONTACTS, response));
  } catch (error) {
    yield put(crmApiResponseError(GET_CONTACTS, error));
  }
}

function* getCompanies() {
  try {
    const response = yield call(getCompaniesApi);
    yield put(crmApiResponseSuccess(GET_COMPANIES, response));
  } catch (error) {
    yield put(crmApiResponseError(GET_COMPANIES, error));
  }
}

function* getDeals() {
  try {
    const response = yield call(getDealsApi);
    yield put(crmApiResponseSuccess(GET_DEALS, response));
  } catch (error) {
    yield put(crmApiResponseError(GET_DEALS, error));
  }
}

function* getLeads() {
  try {
    const response = yield call(getLeadsApi);
    yield put(crmApiResponseSuccess(GET_LEADS, response));
  } catch (error) {
    yield put(crmApiResponseError(GET_LEADS, error));
  }
}

export function* watchGetContacts() {
  yield takeEvery(GET_CONTACTS, getContacts);
}

export function* watchGetComgetCompanies() {
  yield takeEvery(GET_COMPANIES, getCompanies);
}

export function* watchGetDeals() {
  yield takeEvery(GET_DEALS, getDeals);
}

export function* watchGetLeads() {
  yield takeEvery(GET_LEADS, getLeads);
}

function* crmSaga() {
  yield all([
    fork(watchGetContacts),
    fork(watchGetComgetCompanies),
    fork(watchGetDeals),
    fork(watchGetLeads),
  ]);
}

export default crmSaga;
