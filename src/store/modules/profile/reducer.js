import {
    fetchProfileSuccess,
    fetchProfileFailure,
    fetchProfile,
    putProfileSuccess,
    putProfileFailure,
    putProfile,
} from "./actions";
import { loggedOut } from "../auth/actions";

export default (state = {}, action) => {
    switch (action.type) {
        case loggedOut.toString():
            return { ...state, paymentInfo: null };
        case putProfile.toString():
            return { ...state, isLoaded: true };
        case putProfileSuccess.toString():
            return {
                ...state,
                paymentInfo: action.payload,
                isLoaded: false,
                error: null,
            };
        case putProfileFailure.toString():
            return { ...state, isLoaded: false, error: action.payload };
        case fetchProfile.toString():
            return { ...state, isLoaded: true };
        case fetchProfileSuccess.toString():
            return {
                ...state,
                paymentInfo: action.payload,
                isLoaded: false,
                error: null,
            };
        case fetchProfileFailure.toString():
            return { ...state, isLoaded: false, error: action.payload };
        default:
            return state;
    }
};
