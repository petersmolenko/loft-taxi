import {
    fetchProfileSuccess, fetchProfileFailure
} from "./actions";
export default (
    state = {},
    action
) => {
    switch (action.type) {
        case fetchProfileSuccess.toString():
            return { ...action.payload, error: null };
        case fetchProfileFailure.toString():
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
