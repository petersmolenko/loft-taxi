import React, { useContext } from "react";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { AuthProvider, AuthContext } from "../../AuthContext";
import Map from "../Map";
jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
    Map: jest.fn(function () {
        this.remove = () => {};
    }),
}));

describe("Map testing", () => {
    it("renders correctly (not authorized)", () => {
        const handler = jest.fn();
        const tree = renderer
            .create(
                <AuthProvider>
                    <Map stopSubmit={handler} />
                </AuthProvider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders correctly (authorized)", () => {
        const handler = jest.fn();
        const WrapperComponent = ({ isLogin, children }) => {
            const { login } = useContext(AuthContext);
            if (isLogin) login();
            return <>{children}</>;
        };

        const tree = renderer
            .create(
                <AuthProvider>
                    <WrapperComponent isLogin={true}>
                        <Map stopSubmit={handler} />
                    </WrapperComponent>
                </AuthProvider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("callTaxi-button disabled", () => {
        const handler = jest.fn();
        const WrapperComponent = ({ isLogin, children }) => {
            const { login } = useContext(AuthContext);
            if (isLogin) login();
            return <>{children}</>;
        };

        const { getByText } = render(
            <AuthProvider>
                <WrapperComponent isLogin={true}>
                    <Map stopSubmit={handler} />
                </WrapperComponent>
            </AuthProvider>
        );
        expect(getByText("Вызвать такси")).toBeDisabled();
    });
});
