import React from "react";
import { fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Signup from "../Signup";
import { Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { clearErrors } from "../../redux/modules/auth";

const mockStore = configureStore([]);
const mutationObserverMock = jest.fn(function MutationObserver(callback) {
    this.observe = jest.fn();
    this.disconnect = jest.fn();
    this.trigger = (mockedMutationsList) => {
        callback(mockedMutationsList, this);
    };
});
global.MutationObserver = mutationObserverMock;
describe("Signup testing", () => {
    it("renders correctly", () => {
        const store = mockStore({
            auth: { isLoggedIn: false },
        });
        const history = createBrowserHistory();
        const tree = renderer
            .create(
                <Provider store={store}>
                    <Router history={history}>
                        <Signup />
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
                    <Signup />
                </Router>
            </Provider>
        );
        expect(getByText("Уже зарегистрированы?")).toBeInTheDocument();
        fireEvent.click(getByText("Войти"));
        expect(history.location.pathname).toBe("/login");
    });

    it("login-button click", () => {
        const store = mockStore({
            auth: { isLoggedIn: false },
        });
        store.dispatch = jest.fn();
        const history = createBrowserHistory();
        const { getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Signup />
                </Router>
            </Provider>
        );
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(clearErrors());
        fireEvent.click(getByText("Зарегистрироваться"));
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
                    <Signup />
                </Router>
            </Provider>
        );

        fireEvent.change(getByTestId("userEmailField"), {
            target: { value: "email" },
        });
        expect(getByTestId("userEmailField").value).toBe("email");
        fireEvent.change(getByTestId("userFirstNameField"), {
            target: { value: "firstname" },
        });
        expect(getByTestId("userFirstNameField").value).toBe("firstname");
        fireEvent.change(getByTestId("userSurnameField"), {
            target: { value: "surename" },
        });
        expect(getByTestId("userSurnameField").value).toBe("surename");
        fireEvent.change(getByTestId("userPasswordField"), {
            target: { value: "password" },
        });
        expect(getByTestId("userPasswordField").value).toBe("password");
    });
});
