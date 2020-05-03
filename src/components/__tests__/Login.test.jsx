import React from "react";
import { fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Login from "../Login";
import { Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { clearErrors } from "../../redux/modules/auth";

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

describe("Login testing", () => {
    it("renders correctly", () => {
        const store = mockStore({
            auth: { isLoggedIn: false },
        });
        const history = createBrowserHistory();
        const tree = renderer
            .create(
                <Provider store={store}>
                    <Router history={history}>
                        <Login />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("signup-link click", () => {
        const store = mockStore({
            auth: { isLoggedIn: false },
        });
        const history = createBrowserHistory();
        const { getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Login />
                </Router>
            </Provider>
        );
        expect(getByText("Новый пользователь?")).toBeInTheDocument();
        fireEvent.click(getByText("Зарегистрируйтесь"));
        expect(history.location.pathname).toBe("/signup");
    });

    it("login-button click", () => {
        const store = mockStore({
            auth: { isLoggedIn: false },
        });
        store.dispatch = jest.fn();
        const history = createBrowserHistory();
        const { getByTestId } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Login />
                </Router>
            </Provider>
        );

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(clearErrors());
        fireEvent.click(getByTestId("loginBtn"));
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it("change form fields", () => {
        const store = mockStore({
            auth: { isLoggedIn: false },
        });

        const history = createBrowserHistory();
        const { getByTestId } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Login />
                </Router>
            </Provider>
        );

        fireEvent.change(getByTestId("userNameField"), {
            target: { value: "name" },
        });

        expect(getByTestId("userNameField").value).toBe("name");

        fireEvent.change(getByTestId("userPasswordField"), {
            target: { value: "password" },
        });

        expect(getByTestId("userPasswordField").value).toBe("password");
    });
});
