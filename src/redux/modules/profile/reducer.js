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
            return {
                cardNumber: "",
                expiryDate: "",
                cardName: "",
                cvc: "",
            };
        case putProfile.toString():
            return { ...state, isLoaded: true };
        case putProfileSuccess.toString():
            return { paymentInfo: action.payload, isLoaded: false, error: null };
        case putProfileFailure.toString():
            return { ...state, isLoaded: false, error: action.payload };
        case fetchProfile.toString():
            return { ...state, isLoaded: true };
        case fetchProfileSuccess.toString():
            return { paymentInfo: action.payload, isLoaded: false, error: null };
        case fetchProfileFailure.toString():
            return { ...state, isLoaded: false, error: action.payload };
        default:
            return state;
    }
};
