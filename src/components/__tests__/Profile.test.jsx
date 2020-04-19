import React, { useContext } from "react";
import { fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Profile from "../Profile";
import { AuthProvider, AuthContext } from "../../AuthContext";

describe("Profile testing", () => {
    it("renders correctly (not authorized)", () => {
        const handler = jest.fn();
        const WrapperComponent = ({ isLogin, children }) => {
            const { login } = useContext(AuthContext);
            if (isLogin) login();
            return <>{children}</>;
        };
        const tree = renderer
            .create(
                <AuthProvider>
                    <WrapperComponent isLogin={false}>
                        <Profile stopSubmit={handler} />
                    </WrapperComponent>
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
                        <Profile stopSubmit={handler} />
                    </WrapperComponent>
                </AuthProvider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("save-button click", () => {
        const handler = jest.fn();
        const WrapperComponent = ({ isLogin, children }) => {
            const { login } = useContext(AuthContext);
            if (isLogin) login();
            return <>{children}</>;
        };
        const { getByText } = render(
            <AuthProvider>
                <WrapperComponent isLogin={true}>
                    <Profile stopSubmit={handler} />
                </WrapperComponent>
            </AuthProvider>
        );
        fireEvent.click(getByText("Сохранить"));
        expect(handler.mock.calls.length).toBe(1);
    });
});
