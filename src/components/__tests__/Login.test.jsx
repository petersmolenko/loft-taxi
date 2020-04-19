import React from "react";
import { fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { AuthProvider } from "../../AuthContext";
import Login from "../Login";

describe("Login testing", () => {
    it("renders correctly", () => {
        const handler = jest.fn();
        const tree = renderer
            .create(
                <AuthProvider>
                    <Login setRoute={handler} />
                </AuthProvider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("signup-link click", () => {
        const handler = jest.fn();
        const { getByText } = render(
            <AuthProvider>
                <Login setRoute={handler} />
            </AuthProvider>
        );
        fireEvent.click(getByText("Зарегистрируйтесь"));
        expect(handler.mock.calls[0][0]).toBe("signup");
    });

    it("login-button click", () => {
        const handler = jest.fn();
        const { getByTestId } = render(
            <AuthProvider>
                <Login setRoute={handler} />
            </AuthProvider>
        );
        fireEvent.click(getByTestId("loginBtn"));
        expect(handler.mock.calls[0][0]).toBe("map");
    });

    it("change form fields", () => {
        const handler = jest.fn();
        const { getByTestId } = render(
            <AuthProvider>
                <Login setRoute={handler} />
            </AuthProvider>
        );
        fireEvent.click(getByTestId("userNameField"), {
            target: { value: "name" },
        });
        expect(getByTestId("userNameField").value).toBe("name");
        fireEvent.click(getByTestId("userPasswordField"), {
            target: { value: "password" },
        });
        expect(getByTestId("userPasswordField").value).toBe("password");
    });
});
