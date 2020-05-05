import {createAction} from 'redux-actions'
export const fetchRoute = createAction('loft-taxi/routes/FETCH_ROUTE')
export const clearRoute = createAction('loft-taxi/routes/CLEARE_ROUTE')
export const fetchRouteSuccess = createAction('loft-taxi/routes/FETCH_ROUTE_SUCCESS')
export const fetchRouteFailure = createAction('loft-taxi/routes/FETCH_ROUTE_FAILURE')
export const fetchAddressList = createAction('loft-taxi/routes/FETCH_ADDRESS_LIST')
export const fetchAddressListSuccess = createAction('loft-taxi/routes/FETCH_ADDRESS_LIST_SUCCESS')
export const fetchAddressListFailure = createAction('loft-taxi/routes/FETCH_ADDRESS_LIST_FAILURE')