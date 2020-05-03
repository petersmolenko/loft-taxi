import React from "react";
import { fireEvent, render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import App from "../App";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
    Map: jest.fn(function () {
        this.remove = () => {};
    }),
}));

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

describe("App testing", () => {
    afterAll(() => {
        global.MutationObserver = {};
    });
    it("login page load", () => {
        const store = mockStore({
            auth: { isLoggedIn: false },
        });
        const history = createBrowserHistory();
        const { getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <App location={{}} />
                </Router>
            </Provider>
        );

        expect(getByText("Новый пользователь?")).toBeInTheDocument();
    });

    it("signup page load", () => {
        const store = mockStore({
            auth: { isLoggedIn: false },
        });
        const history = createBrowserHistory();
        history.push("/signup", {});
        const { getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        );

        expect(getByText("Уже зарегистрированы?")).toBeInTheDocument();
    });

    it("switch private pages", () => {
        const store = mockStore({
            auth: { isLoggedIn: true },
            profile: {
                paymentInfo: {
                    cardNumber: "0000 0000 0000 0000",
                    expiryDate: "12/20",
                    cardName: "Mark Kram",
                    cvc: "123",
                    error: null,
                },
            },
            routes: {
                route: null,
                addresses: ["address1"],
            },
        });
        const history = createBrowserHistory();
        history.push("/map", {});
        const { getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        );

        expect(getByText("Вызвать такси")).toBeInTheDocument();
        fireEvent.click(getByText("Карта"));
        expect(getByText("Вызвать такси")).toBeInTheDocument();
        fireEvent.click(getByText("Профиль"));
        expect(getByText("Способ оплаты")).toBeInTheDocument();
    });

    it("go to private pages is failed", () => {
        const store = mockStore({
            auth: { isLoggedIn: false },
            profile: {
                cardNumber: "0000 0000 0000 0000",
                expiryDate: "12/20",
                cardName: "Mark Kram",
                cvc: "123",
            },
        });
        const history = createBrowserHistory();
        history.push("/map", {});
        const { getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        );

        expect(getByText("Новый пользователь?")).toBeInTheDocument();
        history.push("/profile", {});
        expect(getByText("Новый пользователь?")).toBeInTheDocument();
    });
});
