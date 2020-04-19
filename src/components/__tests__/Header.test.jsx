import React from "react";
import { fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { AuthProvider } from "../../AuthContext";
import Header from "../Header";

describe("Header testing", () => {
    it("renders correctly", () => {
        const handler = jest.fn();
        const tree = renderer
            .create(
                <AuthProvider>
                    <Header setRoute={handler} />
                </AuthProvider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("map-button click", () => {
        const handler = jest.fn();
        const { getByText } = render(
            <AuthProvider>
                <Header setRoute={handler} />
            </AuthProvider>
        );
        fireEvent.click(getByText("Карта"));
        expect(handler.mock.calls[0][0]).toBe("map");
    });

    it("profile-button click", () => {
        const handler = jest.fn();
        const { getByText } = render(
            <AuthProvider>
                <Header setRoute={handler} />
            </AuthProvider>
        );
        fireEvent.click(getByText("Профиль"));
        expect(handler.mock.calls[0][0]).toBe("profile");
    });

    it("logout-button click", () => {
        const handler = jest.fn();
        const { getByText } = render(
            <AuthProvider>
                <Header setRoute={handler} />
            </AuthProvider>
        );
        fireEvent.click(getByText("Выйти"));
        expect(handler.mock.calls[0][0]).toBe("login");
    });
});
