import React from "react";
import { fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Header from "../Header";
import { Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { clearRoute } from "../../store/modules/routes";
import { loggedOut } from "../../store/modules/auth";

const mockStore = configureStore([]);

describe("Header Component", () => {
    it("Происходит корректная отрисовка", () => {
        const store = mockStore({
            auth: { isLoggedIn: true },
        });

        const history = createBrowserHistory();
        const tree = renderer
            .create(
                <Provider store={store}>
                    <Router history={history}>
                        <Header />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Нажатие кнопки Выход приводит к логауту", () => {
        const store = mockStore({
            auth: { isLoggedIn: true },
        });

        store.dispatch = jest.fn();

        const history = createBrowserHistory();
        const { getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Header />
                </Router>
            </Provider>
        );

        fireEvent.click(getByText("Выйти"));
        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenCalledWith(clearRoute());
        expect(store.dispatch).toHaveBeenCalledWith(loggedOut());
    });

    it("Переход по ссылке Карта происходит корректно", () => {
        const store = mockStore({
            auth: { isLoggedIn: true },
        });
        store.dispatch = jest.fn();

        const history = createBrowserHistory();
        const { getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Header />
                </Router>
            </Provider>
        );

        fireEvent.click(getByText("Карта"));
        expect(history.location.pathname).toBe("/map");
    });

    it("Переход по ссылке Профиль происходит корректно", () => {
        const store = mockStore({
            auth: { isLoggedIn: true },
        });
        store.dispatch = jest.fn();

        const history = createBrowserHistory();
        const { getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Header />
                </Router>
            </Provider>
        );

        fireEvent.click(getByText("Профиль"));
        expect(history.location.pathname).toBe("/profile");
    });
});
