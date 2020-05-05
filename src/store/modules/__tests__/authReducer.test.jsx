import auth, { loggedInSuccess, loggedInFailure, loggedOut } from "../auth";

describe("Auth Reducer", () => {
    it("loft-taxi/auth/LOGGED_IN_SUCCESS", () => {
        expect(auth({ isLoggedIn: false, isLoaded: true  }, loggedInSuccess("123"))).toEqual({
            isLoggedIn: true,
            isLoaded: false,
            token: "123",
            error: null,
        });
    });

    it("loft-taxi/auth/LOGGED_IN_FAILURE", () => {
        expect(auth({ isLoaded: true }, loggedInFailure("error"))).toEqual({
            isLoaded: false,
            error: "error",
        });
    });

    it("loft-taxi/auth/LOGGED_OUT", () => {
        expect(auth({ isLoggedIn: true }, loggedOut())).toEqual({
            isLoggedIn: false,
        });
    });
    it("Action type null", () => {
        expect(auth({}, { type: null })).toEqual({});
    });
});
