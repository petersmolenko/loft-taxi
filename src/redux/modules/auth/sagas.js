import { call, put, takeLatest } from "redux-saga/effects";
import { loggedIn, loggedInSuccess, loggedInFailure, signUp } from "./actions";
import { fetchProfile } from "../profile/actions";
import {fetchAddressList} from '../routes/actions';
import {auth as apiAuth, register as apiRegister} from '../../../shared/api'

export function* authorizationSaga(action) {
    try {
        const auth = yield call(apiAuth, action.payload);

        if (auth.success === true) {
            yield put(loggedInSuccess(auth.token));
            yield put(fetchProfile());
            yield put(fetchAddressList());
        } else {
            yield put(loggedInFailure(auth.error));
        }
    } catch (e) {
        yield put(loggedInFailure(e.message));
    }
}

export function* watchAuthorizationSaga() {
    yield takeLatest(loggedIn.toString(), authorizationSaga);
}

export function* registrationSaga(action) {
    try {
        const auth = yield call(apiRegister, action.payload);
        
        if (auth.success === true) {
            yield put(loggedInSuccess(auth.token));
            yield put(fetchAddressList());
        } else {
            yield put(loggedInFailure(auth.error));
        }
    } catch (e) {
        yield put(loggedInFailure(e.message));
    }
}

export function* watchRegistrationSaga() {
    yield takeLatest(signUp.toString(), registrationSaga);
}
