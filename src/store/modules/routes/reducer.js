import {
    fetchRoute,
    clearRoute,
    fetchRouteSuccess,
    fetchRouteFailure,
    fetchAddressListSuccess,
    fetchAddressListFailure,
} from "./actions";
export default (state = {}, action) => {
    switch (action.type) {
        case clearRoute.toString():
            return { ...state, route: null };
        case fetchRoute.toString():
            return { ...state, isLoaded: true };
        case fetchRouteSuccess.toString():
            return {
                ...state,
                route: action.payload,
                error: null,
                isLoaded: false,
            };
        case fetchRouteFailure.toString():
            return {
                ...state,
                route: null,
                error: action.payload,
                isLoaded: false,
            };
        case fetchAddressListSuccess.toString():
            return { ...state, ...action.payload, error: null };
        case fetchAddressListFailure.toString():
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
