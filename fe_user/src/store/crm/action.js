import {
    GET_CONTACTS,
    GET_COMPANIES,
    GET_DEALS,
    GET_LEADS,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
  } from "./actionType";

  // common success
export const crmApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
  });
  // common error
  export const crmApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
  });
  
  export const getContacts = () => ({
    type: GET_CONTACTS,
  });
  
  export const getCompanies = () => ({
    type: GET_COMPANIES,
  });
  
  export const getDeals = () => ({
    type: GET_DEALS,
  });
  
  export const getLeads = () => ({
    type: GET_LEADS,
  })