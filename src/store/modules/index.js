import { combineReducers } from "redux";
import { fork } from "redux-saga/effects";
import auth from "./auth";
import profile from "./profile";
import routes from "./routes";
import { watchFetchProfileSaga, watchPutProfileSaga } from "./profile";
import {
    watchRouteSaga,
    watchAddressListSaga,
} from "./routes";
import {
    watchAuthorizationSaga,
    watchRegistrationSaga,
} from "./auth";

export default combineReducers({ auth, profile, routes });

export function* rootSaga() {
    yield fork(watchFetchProfileSaga);
    yield fork(watchPutProfileSaga);
    yield fork(watchRouteSaga);
    yield fork(watchAddressListSaga);
    yield fork(watchAuthorizationSaga);
    yield fork(watchRegistrationSaga);
}
