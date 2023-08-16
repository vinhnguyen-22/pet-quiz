import {
    GET_CONTACTS,
    GET_COMPANIES,
    GET_DEALS,
    GET_LEADS,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
  } from "./actionType";
  
  const INIT_STATE = {
    crmcontacts: [],
    companies: [],
    deals: [],
    leads: [],
    error: {},
  };
  
  const Crm = (state = INIT_STATE, action) => {
    switch (action.type) {
      case API_RESPONSE_SUCCESS:
        switch (action.payload.actionType) {
          case GET_CONTACTS:
            return {
              ...state,
              crmcontacts: action.payload.data,
            };
          case GET_COMPANIES:
            return {
              ...state,
              companies: action.payload.data,
            };
          case GET_DEALS:
            return {
              ...state,
              deals: action.payload.data,
            };
          case GET_LEADS:
            return {
              ...state,
              leads: action.payload.data,
            };
          default:
            return { ...state };
        }
      case API_RESPONSE_ERROR:
        switch (action.payload.actionType) {
          case GET_CONTACTS:
            return {
              ...state,
              error: action.payload.error,
            };
          case GET_COMPANIES:
            return {
              ...state,
              error: action.payload.error,
            };
          case GET_DEALS:
            return {
              ...state,
              error: action.payload.error,
            };
          case GET_LEADS:
            return {
              ...state,
              error: action.payload.error,
            };
          default:
            return { ...state };
        }
      case GET_COMPANIES: {
        return {
          ...state,
        };
      }
      case GET_DEALS: {
        return {
          ...state,
        };
      }
      case GET_LEADS:
        return {
          ...state,
        };
      default:
        return { ...state };
    }
  };
  
  export default Crm;
  