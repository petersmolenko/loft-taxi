import { loggedIn, loggedInSuccess, loggedInFailure, signUp } from "./actions";

export const loginMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === loggedIn.toString()) {

        fetch("https://loft-taxi.glitch.me/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(action.payload),
        })
            .then((resp) => resp.json())
            .then((auth) => {
                if (auth.success === true) {
                    store.dispatch(loggedInSuccess(auth.token));
                } else {
                    store.dispatch(loggedInFailure(auth.error));
                }
            })
            .catch((error) => {
                store.dispatch(loggedInFailure("Error!!"));
            });
    }

    return result;
};

export const signupMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === signUp.toString()) {
        console.log(action.payload);
        fetch("https://loft-taxi.glitch.me/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(action.payload),
        })
            .then((resp) => resp.json())
            .then((auth) => {
                if (auth.success === true) {
                    store.dispatch(loggedInSuccess(auth.token));
                } else {
                    store.dispatch(loggedInFailure(auth.error));
                }
            })
            .catch((error) => {
                store.dispatch(loggedInFailure("Error!!"));
            });
    }

    return result;
};
