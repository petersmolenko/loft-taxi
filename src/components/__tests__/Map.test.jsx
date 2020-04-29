import React from "react";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Map from "../Map";
import { Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";

const mockStore = configureStore([]);

jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
    Map: jest.fn(function () {
        this.remove = () => {};
    }),
}));

describe("Map testing", () => {
    it("renders correctly (authorized)", () => {
        const store = mockStore({
            auth: { isLoggedIn: false },
            routes: {
                addresses: ['address1', 'address2']
            },
            profile: {
                paymentInfo: {info: 'info'}
            }
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
});
