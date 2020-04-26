import profile, { fetchProfileSuccess, fetchProfileFailure } from "../profile";

describe("Auth Reducer", () => {
    it("loft-taxi/auth/FETCH_PROFILE_SUCCESS", () => {
        expect(
            profile(
                {},
                fetchProfileSuccess({
                    cardNumber: "0000 0000 0000 0000",
                    expiryDate: "12/20",
                    cardName: "Mark Kram",
                    cvc: "123",
                    error: null,
                })
            )
        ).toEqual({
            cardNumber: "0000 0000 0000 0000",
            expiryDate: "12/20",
            cardName: "Mark Kram",
            cvc: "123",
            error: null,
        });
    });

    it("loft-taxi/auth/FETCH_PROFILE_FAILURE", () => {
        expect(profile({ error: null }, fetchProfileFailure("error"))).toEqual({
            error: "error",
        });
    });

    it("Action type null", () => {
        expect(profile({}, { type: null })).toEqual({});
    });
});
