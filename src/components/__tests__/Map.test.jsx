import React from "react";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import Map from "../Map";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { fetchRoute, clearRoute } from "../../store/modules/routes";

const mockStore = configureStore([]);

global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
        nodeName: "BODY",
        ownerDocument: document,
    },
});

jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
    Map: jest.fn(function () {
        this.remove = () => {};
    }),
}));

global.MutationObserver = jest.fn(function MutationObserver(callback) {
    this.observe = jest.fn();
    this.disconnect = jest.fn();
});

describe("Map Component", () => {
    it("Происходит корректная отрисовка", () => {
        const store = mockStore({
            auth: { isLoggedIn: false },
            routes: {
                addresses: [],
            },
            profile: {
                paymentInfo: {},
            },
        });
        const history = createBrowserHistory();
        const tree = renderer
            .create(
                <Provider store={store}>
                    <Router history={history}>
                        <Map />
                    </Router>
                </Provider>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it("Когда пользователь не ввел платежные данные, выводится сообщение с просьбой это сделать", () => {
        const store = mockStore({
            routes: {
                addresses: [],
            },
            profile: {
                paymentInfo: null,
            },
        });
        const history = createBrowserHistory();

        const { getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Map />
                </Router>
            </Provider>
        );

        expect(getByText("Заполните платежные данные")).toBeInTheDocument();
    });

    it("При наличии платежных данных отображается форма заказа такси", () => {
        const store = mockStore({
            routes: {
                addresses: [],
            },
            profile: {
                paymentInfo: { info: "info" },
            },
        });
        const history = createBrowserHistory();

        const { getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Map />
                </Router>
            </Provider>
        );

        expect(getByText("Вызвать такси")).toBeInTheDocument();
    });

    it('При обрабоке заказа показывается сообщение "Поиск маршрута..."', () => {
        const store = mockStore({
            routes: {
                addresses: null,
                isLoaded: true,
            },
            profile: {
                paymentInfo: { info: "info" },
            },
        });
        const history = createBrowserHistory();

        const { getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Map />
                </Router>
            </Provider>
        );

        expect(getByText("Поиск маршрута...")).toBeInTheDocument();
    });

    it("При загрузке страницы данные о предыдущих заказах очищаются", () => {
        const store = mockStore({
            routes: {
                addresses: [],
            },
            profile: {
                paymentInfo: { info: "info" },
            },
        });
        store.dispatch = jest.fn();
        const history = createBrowserHistory();

        render(
            <Provider store={store}>
                <Router history={history}>
                    <Map />
                </Router>
            </Provider>
        );

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(clearRoute());
    });

    it("Нажатие кнопки заказа такси приводит к отправке валидной формы", async () => {
        const store = mockStore({
            routes: {
                addresses: ["address1", "address2"],
            },
            profile: {
                paymentInfo: { info: "info" },
            },
        });
        store.dispatch = jest.fn();
        const history = createBrowserHistory();
        const { getByLabelText, getByText, getByTestId } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Map />
                </Router>
            </Provider>
        );

        fireEvent.input(getByLabelText("Откуда"), {
            target: { value: "add" },
        });
        fireEvent.click(getByText("address1"));
        fireEvent.input(getByLabelText("Куда"), {
            target: { value: "add" },
        });
        fireEvent.click(getByText("address2"));
        await act(async () => {
            fireEvent.click(getByTestId("getRouteBtn"));
        });
        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenCalledWith(
            fetchRoute({ start: "address1", end: "address2" })
        );
    });
    it("При невалидности формы кнопка заказа отключена", async () => {
        const store = mockStore({
            routes: {
                addresses: [],
            },
            profile: {
                paymentInfo: { info: "info" },
            },
        });
        store.dispatch = jest.fn();
        const history = createBrowserHistory();
        const {getByTestId } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Map />
                </Router>
            </Provider>
        );
        expect(getByTestId("getRouteBtn")).toBeDisabled()
    });
});
