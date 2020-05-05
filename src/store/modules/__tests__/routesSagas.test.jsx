import { routeSaga, addressListSaga } from "../routes";
import { recordSaga } from "../../../shared/testUtils.js";
import {
    fetchRouteSuccess,
    fetchRouteFailure,
    fetchAddressListSuccess,
    fetchAddressListFailure,
} from "../routes";
import * as api from "../../../shared/api";

describe("routesSagas", () => {
    describe("routeSaga", () => {
        it("get route success", async () => {
            api.getRoute = jest
                .fn()
                .mockImplementation(() => ({ route: "route" }));

            const initialAction = {
                payload: { start: "address1", end: "address2" },
            };

            const dispatched = await recordSaga(routeSaga, initialAction);

            expect(dispatched).toContainEqual(
                fetchRouteSuccess({ route: "route" })
            );

            expect(api.getRoute).toHaveBeenCalledWith({
                address1: "address1",
                address2: "address2",
            });
        });

        it("get route error", async () => {
            api.getRoute = jest.fn().mockImplementation(() => {
                throw new Error("server error");
            });

            const initialAction = {
                payload: { start: "address1", end: "address2" },
            };

            const dispatched = await recordSaga(routeSaga, initialAction);

            expect(dispatched).toContainEqual(
                fetchRouteFailure("server error")
            );

            expect(api.getRoute).toHaveBeenCalledWith({
                address1: "address1",
                address2: "address2",
            });
        });
    });
    describe("addressListSaga", () => {
        it("get address list success", async () => {
            api.getAddressList = jest
                .fn()
                .mockImplementation(() => ({ addresses: "addresses" }));

            const dispatched = await recordSaga(addressListSaga);

            expect(dispatched).toContainEqual(
                fetchAddressListSuccess({ addresses: "addresses" })
            );

            expect(api.getAddressList).toHaveBeenCalled();
        });

        it("get address list error", async () => {
            api.getAddressList = jest.fn().mockImplementation(() => {
                throw new Error("server error");
            });

            const dispatched = await recordSaga(addressListSaga);

            expect(dispatched).toContainEqual(
                fetchAddressListFailure("server error")
            );

            expect(api.getAddressList).toHaveBeenCalled();
        });
    });
});
