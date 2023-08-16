import { call, put, takeEvery, all, fork } from "redux-saga/effects";

// Crypto Redux States
import {
    GET_TASK_LIST,
} from "./actionType";
import { TaskApiResponseSuccess, TaskApiResponseError } from "./action";

//Include Both Helper File with needed methods
import {
    getTaskList as getTaskListApi,
}
    from "../../helpers/fakebackend_helper";

function* getTaskList() {
    try {
        const response = yield call(getTaskListApi);
        yield put(TaskApiResponseSuccess(GET_TASK_LIST, response));
    } catch (error) {
        yield put(TaskApiResponseError(GET_TASK_LIST, error));
    }
}

export function* watchGetTaskList() {
    yield takeEvery(GET_TASK_LIST, getTaskList);
}

function* taskSaga() {
    yield all(
        [fork(watchGetTaskList)]
    );
}

export default taskSaga;
