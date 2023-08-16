import {
  GET_PRODUCTS,
  GET_ORDERS,
  GET_SELLERS,
  GET_CUSTOMERS,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
} from "./actionType";

const INIT_STATE = {
  products: [],
  orders: [],
  sellers: [],
  customers: [],
  error: {},
};

const Ecommerce = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_PRODUCTS:
          return {
            ...state,
            products: action.payload.data,
          };
        case GET_ORDERS:
          return {
            ...state,
            orders: action.payload.data,
          };
        case GET_SELLERS:
          return {
            ...state,
            sellers: action.payload.data,
          };
        case GET_CUSTOMERS:
          return {
            ...state,
            customers: action.payload.data,
          };
        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_PRODUCTS:
          return {
            ...state,
            error: action.payload.error,
          };
        case GET_ORDERS:
          return {
            ...state,
            error: action.payload.error,
          };
        case GET_SELLERS:
          return {
            ...state,
            error: action.payload.error,
          };
        case GET_CUSTOMERS:
          return {
            ...state,
            error: action.payload.error,
          };
        default:
          return { ...state };
      }
    case GET_ORDERS: {
      return {
        ...state,
      };
    }
    case GET_SELLERS: {
      return {
        ...state,
      };
    }
    case GET_CUSTOMERS:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};

export default Ecommerce;
