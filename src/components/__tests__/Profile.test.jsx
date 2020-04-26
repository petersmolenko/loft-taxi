import React from "react";
import { fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Profile from "../Profile";
import { putProfile } from "../../redux/modules/profile";
import { Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";

const mockStore = configureStore([]);

describe("Profile testing", () => {
    it("renders correctly (authorized)", () => {
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

    it("save-button click", () => {
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
        const { getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Profile />
                </Router>
            </Provider>
        );
        fireEvent.click(getByText("Сохранить"));
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
