import { putProfileSaga, fetchProfileSaga } from "../profile";
import { recordSaga } from "../../../shared/testUtils.js";
import {
    fetchProfileSuccess,
    fetchProfileFailure,
    putProfileSuccess,
    putProfileFailure,
} from "../profile";
import * as api from "../../../shared/api";

describe("profileSagas", () => {
    describe("putProfileSaga", () => {
        it("put profile success", async () => {
            api.putProfile = jest
                .fn()
                .mockImplementation(() => ({ success: true }));

            const initialAction = {
                payload: { profileData: "data" },
            };
            const state = {
                auth: {
                    token: "token",
                },
            };

            const dispatched = await recordSaga(
                putProfileSaga,
                initialAction,
                state
            );

            expect(dispatched).toContainEqual(
                putProfileSuccess({ profileData: "data" })
            );

            expect(api.putProfile).toHaveBeenCalledWith({
                profileData: "data",
                token: "token",
            });
        });

        it("put profile failed", async () => {
            api.putProfile = jest.fn().mockImplementation(() => ({
                success: false,
                error: "data error",
            }));

            const initialAction = {
                payload: { profileData: "data" },
            };

            const state = {
                auth: {
                    token: "token",
                },
            };

            const dispatched = await recordSaga(
                putProfileSaga,
                initialAction,
                state
            );

            expect(dispatched).toContainEqual(putProfileFailure("data error"));

            expect(api.putProfile).toHaveBeenCalledWith({
                profileData: "data",
                token: "token",
            });
        });

        it("put profile error", async () => {
            api.putProfile = jest.fn().mockImplementation(() => {
                throw new Error("server error");
            });

            const initialAction = {
                payload: { profileData: "data" },
            };

            const state = {
                auth: {
                    token: "token",
                },
            };

            const dispatched = await recordSaga(
                putProfileSaga,
                initialAction,
                state
            );

            expect(dispatched).toContainEqual(
                putProfileFailure("server error")
            );

            expect(api.putProfile).toHaveBeenCalledWith({
                profileData: "data",
                token: "token",
            });
        });
    });

    describe("fetchProfileSaga", () => {
        it("fetch profile success", async () => {
            api.fetchProfile = jest
                .fn()
                .mockImplementation(() => ({ data: "data" }));

            const initialAction = {};
            const state = {
                auth: {
                    token: "token",
                },
            };

            const dispatched = await recordSaga(
                fetchProfileSaga,
                initialAction,
                state
            );

            expect(dispatched).toContainEqual(
                fetchProfileSuccess({ data: "data" })
            );

            expect(api.fetchProfile).toHaveBeenCalledWith({ token: "token" });
        });

        it("fetch profile failed", async () => {
            api.fetchProfile = jest
                .fn()
                .mockImplementation(() => ({ error: "data error" }));

            const initialAction = {};
            const state = {
                auth: {
                    token: "token",
                },
            };

            const dispatched = await recordSaga(
                fetchProfileSaga,
                initialAction,
                state
            );

            expect(dispatched).toContainEqual(
                fetchProfileFailure("data error")
            );

            expect(api.fetchProfile).toHaveBeenCalledWith({ token: "token" });
        });

        it("fetch profile error", async () => {
            api.fetchProfile = jest.fn().mockImplementation(() => {
                throw new Error("server error");
            });

            const initialAction = {};
            const state = {
                auth: {
                    token: "token",
                },
            };

            const dispatched = await recordSaga(
                fetchProfileSaga,
                initialAction,
                state
            );

            expect(dispatched).toContainEqual(
                fetchProfileFailure("server error")
            );

            expect(api.fetchProfile).toHaveBeenCalledWith({ token: "token" });
        });
    });
});
