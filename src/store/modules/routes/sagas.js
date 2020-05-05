import {
    fetchRoute,
    fetchRouteSuccess,
    fetchRouteFailure,
    fetchAddressList,
    fetchAddressListSuccess,
    fetchAddressListFailure
} from "./actions";
import { call, put, takeLatest } from "redux-saga/effects";
import {getAddressList as apiGetAddressList, getRoute as apiGetRoute} from '../../../shared/api'

export function* addressListSaga(action) {
    try {
        const data = yield call(apiGetAddressList)

        yield put(fetchAddressListSuccess(data));
    } catch (e) {
        yield put(fetchAddressListFailure(e.message));
    }
}

export function* watchAddressListSaga () {
    yield takeLatest(fetchAddressList.toString(), addressListSaga);
}

export function*  routeSaga(action) {
    try {
        const data = yield call(apiGetRoute, {address1: action.payload.start, address2: action.payload.end});

        yield put(fetchRouteSuccess(data));
    } catch (e) {
        yield put(fetchRouteFailure(e.message));
    }
}

export function* watchRouteSaga () {
    yield takeLatest(fetchRoute.toString(), routeSaga);
}