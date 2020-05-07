import React from "react";
import { fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Profile from "../Profile";
import { putProfile } from "../../store/modules/profile";
import { Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { act } from "react-dom/test-utils";

const mockStore = configureStore([]);

global.MutationObserver = jest.fn(function MutationObserver(callback) {
    this.observe = jest.fn();
    this.disconnect = jest.fn();
});

describe("Profile Component", () => {
    it("Происходит корректная отрисовка", () => {
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
                addresses: ["address1", "address2"],
            },
        });
        const history = createBrowserHistory();
        const tree = renderer
            .create(
                <Provider store={store}>
                    <Router history={history}>
                        <Profile />
                    </Router>
                </Provider>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it("При загрузке данных на сервер отображется прелоадер", async () => {
        const store = mockStore({ profile: { isLoaded: true } });
        const history = createBrowserHistory();
        const { getByRole } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Profile />
                </Router>
            </Provider>
        );

        expect(getByRole("progressbar")).toBeInTheDocument();
    });
    it("Имеется возможность изменения полей", () => {
        const store = mockStore({
            auth: { isLoggedIn: true },
            profile: {
                paymentInfo: {},
            },
        });
        const history = createBrowserHistory();
        const { getByLabelText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Profile />
                </Router>
            </Provider>
        );

        fireEvent.input(getByLabelText("Номер карты"), {
            target: { value: "0000" },
        });
        expect(getByLabelText("Номер карты").value).toBe('0000');

        fireEvent.input(getByLabelText("Срок действия"), {
            target: { value: "12/12" },
        });
        expect(getByLabelText("Срок действия").value).toBe('12/12');

        fireEvent.input(getByLabelText("Имя владельца"), {
            target: { value: "Mark" },
        });
        expect(getByLabelText("Имя владельца").value).toBe('Mark');
        
        fireEvent.input(getByLabelText("CVC"), {
            target: { value: "123" },
        });
        expect(getByLabelText("CVC").value).toBe('123');
    });

    it("При нажатии кнопки Сохранить невалидная форма не отправляется, выводятся сообщения об ошибках", async () => {
        const store = mockStore({
            auth: { isLoggedIn: true },
            profile: {
                paymentInfo: {},
            },
        });
        const history = createBrowserHistory();
        const { getAllByText, getByTestId, getByLabelText, getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Profile />
                </Router>
            </Provider>
        );

        fireEvent.input(getByLabelText("Номер карты"), {
            target: { value: "0000" },
        });
        await act(async () => {
            fireEvent.click(getByTestId("profileSubmitBtn"));
        });
        const [error] = getAllByText("Поле должно быть заполено!");
        expect(error).toBeInTheDocument();
        expect(getByText("Поле должно содержать 16 цифр")).toBeInTheDocument();
    });

    it("Нажатие кнопки Сохранить приводит к отправке валидной формы", async () => {
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
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Profile />
                </Router>
            </Provider>
        );

        await act(async () => {
            fireEvent.click(getByTestId("profileSubmitBtn"));
        });
        expect(
            getByText(
                "Платёжные данные обновлены. Теперь вы можете заказывать такси."
            )
        ).toBeInTheDocument();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(
            putProfile(store.getState().profile.paymentInfo)
        );
    });
});
