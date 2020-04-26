import React from "react";
import { fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Header from "../Header";
import { Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { loggedOut } from "../../redux/modules/auth";

const mockStore = configureStore([]);

describe("Header testing", () => {
    it("renders correctly", () => {
        const store = mockStore({
            auth: { isLoggedIn: true },
        });
        store.dispatch = jest.fn();

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

    it("logout", () => {
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
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(loggedOut());
    });

    it("map button click", () => {
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
        console.log(history.location.pathname);
        expect(history.location.pathname).toBe("/map");
    });
    it("profile button click", () => {
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
        console.log(history.location.pathname);
        expect(history.location.pathname).toBe("/profile");
    });
});
