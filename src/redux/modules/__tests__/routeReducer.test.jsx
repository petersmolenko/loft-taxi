import routes, {fetchRoute,
    clearRoute,
    fetchRouteSuccess,
    fetchRouteFailure,
    fetchAddressListSuccess,
    fetchAddressListFailure, } from "../routes";

describe("Routes Reducer", () => {
    it("loft-taxi/routes/CLEAR_ROUTE", () => {
        expect(
            routes({route: {}}, clearRoute())
        ).toEqual({route: null});
    });

    it("loft-taxi/routes/FETCH_ROUTE", () => {
        expect(
            routes({isLoaded: false}, fetchRoute())
        ).toEqual({isLoaded: true});
    });

    it("loft-taxi/auth/FETCH_ROUTE_SUCCESS", () => {
        expect(
            routes(
                {error: 'error', isLoaded: true},
                fetchRouteSuccess('route')
            )
        ).toEqual({
            route: 'route',
            error: null,
            isLoaded: false
        });
    });

    it("loft-taxi/auth/FETCH_ROUTE_FAILURE", () => {
        expect(
            routes(
                {error: null, isLoaded: true, route: 'route'},
                fetchRouteFailure('error')
            )
        ).toEqual({
            route: null,
            error: 'error',
            isLoaded: false
        });
    });

    it("loft-taxi/auth/FETCH_ADDRESS_LIST_SUCCESS", () => {
        expect(
            routes(
                {error: 'error'},
                fetchAddressListSuccess({addresses: 'addresses'})
            )
        ).toEqual({
            addresses: 'addresses',
            error: null,
        });
    });

    it("loft-taxi/auth/FETCH_ADDRESS_LIST_FAILURE", () => {
        expect(
            routes(
                {error: null},
                fetchAddressListFailure('error')
            )
        ).toEqual({
            error: 'error'
        });
    });

    it("Action type null", () => {
        expect(routes({}, { type: null })).toEqual({});
    });
});
