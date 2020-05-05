import React from "react";
import { fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Signup from "../Signup";
import { Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { clearErrors, signUp } from "../../store/modules/auth";
import { act } from "react-dom/test-utils";

const mockStore = configureStore([]);

global.MutationObserver = jest.fn(function MutationObserver(callback) {
    this.observe = jest.fn();
    this.disconnect = jest.fn();
});

describe("Signup Component", () => {
    it("Происходит корректная отрисовка", () => {
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

    it("При переходе по ссылке Войти происходит переход на соответствующую страницу", () => {
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

    it("При загрузке очищается список ошибок", () => {
        const store = mockStore({
            auth: { isLoggedIn: false },
        });
        store.dispatch = jest.fn();
        const history = createBrowserHistory();
        render(
            <Provider store={store}>
                <Router history={history}>
                    <Signup />
                </Router>
            </Provider>
        );

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(clearErrors());
    });
    it("При нажатии кнопки Регистрация невалидная форма не отправляется, выводятся соощения об ошибках", async () => {
        const store = mockStore({
            auth: { isLoggedIn: false },
        });
        store.dispatch = jest.fn();
        const history = createBrowserHistory();
        const { getByTestId, getByLabelText, getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Signup />
                </Router>
            </Provider>
        );

        fireEvent.input(getByLabelText("Адрес электронной почты"), {
            target: { value: "email@" },
        });
        fireEvent.input(getByLabelText("Имя"), {
            target: { value: "Mark" },
        });
        fireEvent.input(getByLabelText("Фамилия"), {
            target: { value: "Cliff" },
        });
        fireEvent.input(getByLabelText("Пароль"), {
            target: { value: "" },
        });
        await act(async () => {
            fireEvent.click(getByTestId("signupBtn"));
        });
        expect(getByText("Поле должно быть заполено!")).toBeInTheDocument();
        expect(
            getByText('Значение поля должно иметь вид "text@text.text"!')
        ).toBeInTheDocument();
    });

    it("При нажатии кнопки Регистрация происходит отправка валидной формы", async () => {
        const store = mockStore({
            auth: { isLoggedIn: false },
        });
        store.dispatch = jest.fn();
        const history = createBrowserHistory();
        const { getByTestId, getByLabelText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Signup />
                </Router>
            </Provider>
        );

        fireEvent.input(getByLabelText("Адрес электронной почты"), {
            target: { value: "email@mail.ru" },
        });
        fireEvent.input(getByLabelText("Имя"), {
            target: { value: "Mark" },
        });
        fireEvent.input(getByLabelText("Фамилия"), {
            target: { value: "Cliff" },
        });
        fireEvent.input(getByLabelText("Пароль"), {
            target: { value: "password" },
        });
        await act(async () => {
            fireEvent.click(getByTestId("signupBtn"));
        });
        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenCalledWith(
            signUp({
                email: "email@mail.ru",
                name: "Mark",
                surname: "Cliff",
                password: "password",
            })
        );
    });

    it("Поля могут изменяться", () => {
        const store = mockStore({
            auth: { isLoggedIn: false },
        });
        const history = createBrowserHistory();
        const { getByLabelText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Signup />
                </Router>
            </Provider>
        );

        fireEvent.input(getByLabelText("Адрес электронной почты"), {
            target: { value: "email" },
        });
        expect(getByLabelText("Адрес электронной почты").value).toBe("email");

        fireEvent.input(getByLabelText("Имя"), {
            target: { value: "firstname" },
        });
        expect(getByLabelText("Имя").value).toBe("firstname");

        fireEvent.input(getByLabelText("Фамилия"), {
            target: { value: "surname" },
        });
        expect(getByLabelText("Фамилия").value).toBe("surname");

        fireEvent.input(getByLabelText("Пароль"), {
            target: { value: "password" },
        });
        expect(getByLabelText("Пароль").value).toBe("password");
    });
});
