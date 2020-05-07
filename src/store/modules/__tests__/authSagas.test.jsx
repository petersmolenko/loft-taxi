import { authorizationSaga, registrationSaga } from "../auth";
import { recordSaga } from "../../../shared/testUtils.js";
import { loggedInSuccess, loggedInFailure } from "../auth";
import { fetchProfile } from "../profile/actions";
import { fetchAddressList } from "../routes/actions";
import * as api from "../../../shared/api";

describe("authSagas", () => {
    describe("authorizationSaga", () => {
        it("auth success", async () => {
            api.auth = jest.fn().mockImplementation(() => ({ success: true }));
            const initialAction = {
                payload: { email: "email", password: "password" },
            };
            const dispatched = await recordSaga(
                authorizationSaga,
                initialAction
            );

            expect(dispatched).toContainEqual(loggedInSuccess());
            expect(dispatched).toContainEqual(fetchProfile());
            expect(dispatched).toContainEqual(fetchAddressList());
            expect(api.auth).toHaveBeenCalledWith({
                email: "email",
                password: "password",
            });
        });

        it("auth failed", async () => {
            api.auth = jest.fn().mockImplementation(() => ({
                success: false,
                error: "error",
            }));
            const initialAction = {
                payload: { email: "email", password: "password" },
            };
            const dispatched = await recordSaga(
                authorizationSaga,
                initialAction
            );

            expect(dispatched).toContainEqual(loggedInFailure("error"));
            expect(api.auth).toHaveBeenCalledWith({
                email: "email",
                password: "password",
            });
        });

        it("auth error", async () => {
            api.auth = jest.fn().mockImplementation(() => {
                throw new Error("error");
            });
            const initialAction = {
                payload: { email: "email", password: "password" },
            };
            const dispatched = await recordSaga(
                authorizationSaga,
                initialAction
            );
            expect(dispatched).toContainEqual(loggedInFailure("error"));
            expect(api.auth).toHaveBeenCalledWith({
                email: "email",
                password: "password",
            });
        });
    });

    describe("registrationSaga", () => {
        it("register success", async () => {
            api.register = jest
                .fn()
                .mockImplementation(() => ({ success: true }));
            const initialAction = {
                payload: { regData: "regData" },
            };
            const dispatched = await recordSaga(
                registrationSaga,
                initialAction
            );

            expect(dispatched).toContainEqual(loggedInSuccess());
            expect(dispatched).toContainEqual(fetchAddressList());
            expect(api.register).toHaveBeenCalledWith({ regData: "regData" });
        });

        it("register failed", async () => {
            api.register = jest.fn().mockImplementation(() => ({
                success: false,
                error: "error",
            }));
            const initialAction = {
                payload: { regData: "regData" },
            };
            const dispatched = await recordSaga(
                registrationSaga,
                initialAction
            );

            expect(dispatched).toContainEqual(loggedInFailure("error"));
            expect(api.register).toHaveBeenCalledWith({ regData: "regData" });
        });

        it("register error", async () => {
            api.register = jest.fn().mockImplementation(() => {
                throw new Error("error");
            });
            const initialAction = {
                payload: { regData: "regData" },
            };
            const dispatched = await recordSaga(
                registrationSaga,
                initialAction
            );

            expect(dispatched).toContainEqual(loggedInFailure("error"));
            expect(api.register).toHaveBeenCalledWith({ regData: "regData" });
        });
    });
});
