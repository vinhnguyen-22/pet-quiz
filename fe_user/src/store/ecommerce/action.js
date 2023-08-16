import {
  GET_PRODUCTS,
  GET_ORDERS,
  GET_SELLERS,
  GET_CUSTOMERS,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
} from "./actionType";

// common success
export const ecommerceApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const ecommerceApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getProducts = () => ({
  type: GET_PRODUCTS,
});

export const getOrders = () => ({
  type: GET_ORDERS,
});

export const getSellers = () => ({
  type: GET_SELLERS,
});

export const getCustomers = () => ({
  type: GET_CUSTOMERS,
})