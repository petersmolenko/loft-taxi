import React from "react";
import { fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Login from "../Login";
import { Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { clearErrors, loggedIn } from "../../store/modules/auth";

const mockStore = configureStore([]);

global.MutationObserver = jest.fn(function MutationObserver(callback) {
    this.observe = jest.fn();
    this.disconnect = jest.fn();
});

describe("Login Component", () => {
    it("Происходит корректная отрисовка", () => {
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

    it("Переход по ссылке Регистрация выполняется корректно", () => {
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

    it("Нажатие кнопки Вход приводит к отправке валидной формы", async () => {
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

        fireEvent.input(getByTestId("userNameField"), {
            target: { value: "email@email.com" },
        });
        fireEvent.input(getByTestId("userPasswordField"), {
            target: { value: "password" },
        });
        await act(async () => {
            fireEvent.click(getByTestId("loginBtn"));
        });
        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenCalledWith(
            loggedIn({ email: "email@email.com", password: "password" })
        );
    });

    it("Имеется возможность изменения полей", () => {
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

        fireEvent.input(getByTestId("userNameField"), {
            target: { value: "name" },
        });
        expect(getByTestId("userNameField").value).toBe("name");

        fireEvent.input(getByTestId("userPasswordField"), {
            target: { value: "password" },
        });
        expect(getByTestId("userPasswordField").value).toBe("password");
    });

    it("При нажатии кнопки Войти невалидная форма не отправляется, выводятся сообщения об ошибках", async () => {
        const store = mockStore({
            auth: { isLoggedIn: false },
        });
        store.dispatch = jest.fn();
        const history = createBrowserHistory();
        const { getByTestId, getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Login />
                </Router>
            </Provider>
        );

        fireEvent.input(getByTestId("userNameField"), {
            target: { value: "email@" },
        });
        fireEvent.input(getByTestId("userPasswordField"), {
            target: { value: "" },
        });
        await act(async () => {
            fireEvent.click(getByTestId("loginBtn"));
        });
        expect(
            getByText(`Значение поля должно иметь вид "text@text.text"!`)
        ).toBeInTheDocument();
        expect(getByText(`Поле должно быть заполено!`)).toBeInTheDocument();
    });
});
