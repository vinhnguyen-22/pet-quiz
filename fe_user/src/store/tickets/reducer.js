import {
    GET_TICKETS_LIST,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
} from "./actionType";

const INIT_STATE = {
    ticketsList: [],
};

const Tickets = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_TICKETS_LIST:
                    return {
                        ...state,
                        ticketsList: action.payload.data,
                    };

                default:
                    return { ...state };
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_TICKETS_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                default:
                    return { ...state };
            }

        case GET_TICKETS_LIST: {
            return {
                ...state,
            };
        }

        default:
            return { ...state };
    }
};

export default Tickets;