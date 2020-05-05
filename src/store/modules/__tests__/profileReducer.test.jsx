import profile, {
    fetchProfileSuccess,
    fetchProfileFailure,
    fetchProfile,
    putProfileSuccess,
    putProfileFailure,
    putProfile,
} from "../profile";

describe("Profile Reducer", () => {
    it("loft-taxi/auth/PUT_PROFILE", () => {
        expect(profile({ isLoaded: false }, putProfile())).toEqual({
            isLoaded: true,
        });
    });

    it("loft-taxi/auth/PUT_PROFILE_SUCCESS", () => {
        expect(
            profile(
                { error: null, isLoaded: true },
                putProfileSuccess({
                    cardNumber: "0000 0000 0000 0000",
                    expiryDate: "12/20",
                    cardName: "Mark Kram",
                    cvc: "123",
                })
            )
        ).toEqual({
            paymentInfo: {
                cardNumber: "0000 0000 0000 0000",
                expiryDate: "12/20",
                cardName: "Mark Kram",
                cvc: "123",
            },
            error: null,
            isLoaded: false,
        });
    });

    it("loft-taxi/auth/PUT_PROFILE_FAILURE", () => {
        expect(
            profile({ error: null, isLoaded: true }, putProfileFailure("error"))
        ).toEqual({
            isLoaded: false,
            error: "error",
        });
    });

    it("loft-taxi/auth/FETCH_PROFILE", () => {
        expect(profile({ isLoaded: false }, fetchProfile())).toEqual({
            isLoaded: true,
        });
    });

    it("loft-taxi/auth/FETCH_PROFILE_SUCCESS", () => {
        expect(
            profile(
                { error: null, isLoaded: true },
                fetchProfileSuccess({
                    cardNumber: "0000 0000 0000 0000",
                    expiryDate: "12/20",
                    cardName: "Mark Kram",
                    cvc: "123",
                })
            )
        ).toEqual({
            paymentInfo: {
                cardNumber: "0000 0000 0000 0000",
                expiryDate: "12/20",
                cardName: "Mark Kram",
                cvc: "123",
            },
            error: null,
            isLoaded: false,
        });
    });

    it("loft-taxi/auth/FETCH_PROFILE_FAILURE", () => {
        expect(
            profile(
                { error: null, isLoaded: true },
                fetchProfileFailure("error")
            )
        ).toEqual({
            isLoaded: false,
            error: "error",
        });
    });

    it("Action type null", () => {
        expect(profile({}, { type: null })).toEqual({});
    });
});
