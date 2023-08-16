import { call, put, takeEvery, all, fork } from "redux-saga/effects";

// Crypto Redux States
import {
    GET_TICKETS_LIST,
} from "./actionType";
import {
    TicketsApiResponseSuccess,
    TicketsApiResponseError
} from "./action";

//Include Both Helper File with needed methods
import {
    getTicketsList as getTicketsListApi,
}
    from "../../helpers/fakebackend_helper";

function* getTicketsList() {
    try {
        const response = yield call(getTicketsListApi);
        yield put(TicketsApiResponseSuccess(GET_TICKETS_LIST, response));
    } catch (error) {
        yield put(TicketsApiResponseError(GET_TICKETS_LIST, error));
    }
}

export function* watchGetTicketsList() {
    yield takeEvery(GET_TICKETS_LIST, getTicketsList);
}

function* ticketsSaga() {
    yield all(
        [fork(watchGetTicketsList)]
    );
}

export default ticketsSaga;
