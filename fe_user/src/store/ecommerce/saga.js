import { call, put, takeEvery, all, fork } from "redux-saga/effects";

// Ecoomerce Redux States
import { GET_PRODUCTS, GET_ORDERS,GET_SELLERS,GET_CUSTOMERS } from "./actionType";

import {
  ecommerceApiResponseSuccess,
  ecommerceApiResponseError,
} from "./action";

//Include Both Helper File with needed methods
import {
  getProducts as getProductsApi,
  getOrders as getOrdersApi,
  getSellers as getSellersApi,
  getCustomers as getCustomersApi,
} from "../../helpers/fakebackend_helper";

function* getProducts() {
  try {
    const response = yield call(getProductsApi);
    yield put(ecommerceApiResponseSuccess(GET_PRODUCTS, response));
  } catch (error) {
    yield put(ecommerceApiResponseError(GET_PRODUCTS, error));
  }
}

function* getOrders() {
  try {
    const response = yield call(getOrdersApi);
    yield put(ecommerceApiResponseSuccess(GET_ORDERS, response));
  } catch (error) {
    yield put(ecommerceApiResponseError(GET_ORDERS, error));
  }
}

function* getSellers() {
  try {
    const response = yield call(getSellersApi);
    yield put(ecommerceApiResponseSuccess(GET_SELLERS, response));
  } catch (error) {
    yield put(ecommerceApiResponseError(GET_SELLERS, error));
  }
}

function* getCustomers() {
  try {
    const response = yield call(getCustomersApi);
    yield put(ecommerceApiResponseSuccess(GET_CUSTOMERS, response));
  } catch (error) {
    yield put(ecommerceApiResponseError(GET_CUSTOMERS, error));
  }
}

export function* watchGetProducts() {
  yield takeEvery(GET_PRODUCTS, getProducts);
}

export function* watchGetOrders() {
  yield takeEvery(GET_ORDERS, getOrders);
}

export function* watchGetSellers() {
  yield takeEvery(GET_SELLERS, getSellers);
}

export function* watchGetCustomers() {
  yield takeEvery(GET_CUSTOMERS, getCustomers);
}

function* ecommerceSaga() {
  yield all([
    fork(watchGetProducts), 
    fork(watchGetOrders),
    fork(watchGetSellers),
    fork(watchGetCustomers)
  ]);
}

export default ecommerceSaga;
