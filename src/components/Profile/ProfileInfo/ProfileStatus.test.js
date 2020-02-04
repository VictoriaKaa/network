import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="VIKAAA" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("VIKAAA");
    });

    test("after creation <span> should be displayed with correct status", () => {
        const component = create(<ProfileStatus status="VIKAAA" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    test("after creation <input> should be displayed with correct status", () => {
        const component = create(<ProfileStatus status="VIKAAA" />);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow;
    });

    test("input should be displayes in editMode", () => {
        const component = create(<ProfileStatus status="VIKAAA" />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("VIKAAA");
    });

    test("callbach should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="VIKAAA" updateStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});