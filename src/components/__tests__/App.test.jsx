import React from "react";
import { fireEvent, render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import App from "../App";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const mockStore = configureStore([]);

jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
    Map: jest.fn(function () {
        this.remove = () => {};
    }),
}));

global.MutationObserver = jest.fn(function MutationObserver(callback) {
    this.observe = jest.fn();
    this.disconnect = jest.fn();
});

describe("App Component", () => {
    it("Происходит успешная загрузка старницы Login", () => {
        const store = mockStore({ auth: { isLoggedIn: false } });
        const history = createBrowserHistory();
        const { getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        );

        expect(getByText("Новый пользователь?")).toBeInTheDocument();
    });

    it("Происходит успешная загрузка старницы Signup", () => {
        const store = mockStore({ auth: { isLoggedIn: false } });
        const history = createBrowserHistory();
        const { getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        );

        history.push("/signup", {});
        expect(getByText("Уже зарегистрированы?")).toBeInTheDocument();
    });

    it("Перемещение по приватным страницам (Profile, Map) происходит корретно", () => {
        const store = mockStore({
            auth: { isLoggedIn: true },
            profile: { paymentInfo: null, isLoaded: false },
            routes: { addresses: [], route: null },
        });
        const history = createBrowserHistory();
        const { getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        );

        expect(getByText("Заполните платежные данные")).toBeInTheDocument();

        fireEvent.click(getByText("Профиль"));
        expect(getByText("Способ оплаты")).toBeInTheDocument();

        fireEvent.click(getByText("Карта"));
        expect(getByText("Заполните платежные данные")).toBeInTheDocument();
    });

    it("Попытка неавторизованного пользователя перейти на приватные страницы приводит к переходу на сраницу авторизации", () => {
        const store = mockStore({
            auth: { isLoggedIn: false },
            profile: { paymentInfo: null, isLoaded: false },
            routes: { addresses: [], route: null },
        });
        const history = createBrowserHistory();
        const { getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        );

        history.push("/map", {});
        expect(getByText("Новый пользователь?")).toBeInTheDocument();

        history.push("/profile", {});
        expect(getByText("Новый пользователь?")).toBeInTheDocument();
    });
});
