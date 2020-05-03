import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Profile from "../Profile";
import { Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";

const mockStore = configureStore([]);
const mutationObserverMock = jest.fn(function MutationObserver(callback) {
    this.observe = jest.fn();
    this.disconnect = jest.fn();
    // Optionally add a trigger() method to manually trigger a change
    this.trigger = (mockedMutationsList) => {
        callback(mockedMutationsList, this);
    };
});
global.MutationObserver = mutationObserverMock;

describe("Profile testing", () => {
    it("save-button click", () => {
        const store = mockStore({
            auth: { isLoggedIn: true },
            profile: {
                paymentInfo: {
                    cardNumber: "0000 0000 0000 0000",
                    expiryDate: "12/20",
                    cardName: "Mark Kram",
                    cvc: "123",
                },
            },
        });
        store.dispatch = jest.fn();
        const history = createBrowserHistory();
        const { getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Profile />
                </Router>
            </Provider>
        );
        fireEvent.click(getByText("Сохранить"));
    });
});
