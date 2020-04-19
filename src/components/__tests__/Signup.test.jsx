import React from "react";
import { fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { AuthProvider } from "../../AuthContext";
import Signup from "../Signup";

describe("Login testing", () => {
    it("renders correctly", () => {
        const handler = jest.fn();
        const tree = renderer
            .create(
                <AuthProvider>
                    <Signup setRoute={handler} />
                </AuthProvider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("login-link click", () => {
        const handler = jest.fn();
        const { getByText } = render(
            <AuthProvider>
                <Signup setRoute={handler} />
            </AuthProvider>
        );
        fireEvent.click(getByText("Войти"));
        expect(handler.mock.calls[0][0]).toBe("login");
    });

    it("signup-button click", () => {
        const handler = jest.fn();
        const { getByText } = render(
            <AuthProvider>
                <Signup setRoute={handler} />
            </AuthProvider>
        );
        fireEvent.click(getByText("Зарегистрироваться"));
        expect(handler.mock.calls[0][0]).toBe("map");
    });
    it("change form fields", () => {
        const handler = jest.fn();
        const { getByTestId } = render(
            <AuthProvider>
                <Signup setRoute={handler} />
            </AuthProvider>
        );

        fireEvent.click(getByTestId("userEmailField"), {
            target: { value: "email" },
        });
        expect(getByTestId("userEmailField").value).toBe("email");
        fireEvent.click(getByTestId("userFirstNameField"), {
            target: { value: "firstname" },
        });
        expect(getByTestId("userFirstNameField").value).toBe("firstname");
        fireEvent.click(getByTestId("userSurenameField"), {
            target: { value: "surename" },
        });
        expect(getByTestId("userSurenameField").value).toBe("surename");
        fireEvent.click(getByTestId("userPasswordField"), {
            target: { value: "password" },
        });
        expect(getByTestId("userPasswordField").value).toBe("password");
    });
});
