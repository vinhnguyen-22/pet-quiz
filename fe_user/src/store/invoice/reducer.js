import {
  GET_INVOICES,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
} from "./actionType";

const INIT_STATE = {
  invoices: [],
  error: {},
};

const Invoice = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_INVOICES:
          return {
            ...state,
            invoices: action.payload.data,
          };
        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_INVOICES:
          return {
            ...state,
            error: action.payload.error,
          };
        default:
          return { ...state };
      }
    default:
      return { ...state };
  }
};

export default Invoice;