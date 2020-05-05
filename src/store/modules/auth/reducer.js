import {
    loggedOut,
    loggedIn,
    loggedInSuccess,
    loggedInFailure,
    signUp,
    clearErrors
} from "./actions";

export default (state = {}, action) => {
    switch (action.type) {
        case clearErrors.toString():
            return { ...state, error: null };
        case loggedOut.toString():
            return { ...state, isLoggedIn: false };
        case loggedIn.toString():
            return { ...state, isLoaded: true };
        case signUp.toString():
            return { ...state, isLoaded: true };
        case loggedInSuccess.toString():
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload,
                isLoaded: false,
                error: null,
            };
        case loggedInFailure.toString():
            return { ...state, isLoaded: false, error: action.payload };
        default:
            return state;
    }
};
