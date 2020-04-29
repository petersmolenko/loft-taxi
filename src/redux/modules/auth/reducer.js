import {
    loggedOut,
    loggedInSuccess,
    loggedInFailure,
} from "./actions";

export default (state = {}, action) => {
    switch (action.type) {
        case loggedOut.toString():
            return { ...state, isLoggedIn: false,  };
        case loggedInSuccess.toString():
            return { ...state, isLoggedIn: true, token: action.payload, error: null };
        case loggedInFailure.toString():
            return { ...state, isLoggedIn: false, error: action.payload };
        default:
            return state;
    }
};
