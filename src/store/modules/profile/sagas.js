import {
    fetchProfile,
    fetchProfileSuccess,
    fetchProfileFailure,
    putProfile,
    putProfileSuccess,
    putProfileFailure,
} from "./actions";
import {getToken} from '../auth'
import { call, put, takeLatest, select } from "redux-saga/effects";
import {putProfile as apiPutProfile, fetchProfile as apiFetchProfile} from '../../../shared/api'

export function* putProfileSaga(action) {
    try {
        const token = yield select(getToken);
        const data = yield call(apiPutProfile, {...action.payload, token});

        if (data.success === true) {
            yield put(putProfileSuccess(action.payload));
        } else {
            yield put(putProfileFailure(data.error));
        }
    } catch (e) {
        yield put(putProfileFailure(e.message));
    }
}

export function* watchPutProfileSaga() {
    yield takeLatest(putProfile.toString(), putProfileSaga);
}

export function* fetchProfileSaga(action) {
    try {
        const token = yield select(getToken);
        const data = yield call(apiFetchProfile, {token});
        
        if (!data.error) {
            yield put(fetchProfileSuccess(data));
        } else {
            yield put(fetchProfileFailure(data.error));
        }
    } catch (e) {
        yield put(fetchProfileFailure(e.message));
    }
}

export function* watchFetchProfileSaga() {
    yield takeLatest(fetchProfile.toString(), fetchProfileSaga);
}
