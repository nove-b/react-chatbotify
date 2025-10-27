import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import BotTypingIndicator from "../../../../src/components/ChatBotBody/BotTypingIndicator/BotTypingIndicator";
import { TestChatBotProvider } from "../../../__mocks__/TestChatBotContext";
import type { Settings } from "../../../../src/types/Settings";
import type { Styles } from "../../../../src/types/Styles";

/**
 * Helper function to render BotTypingIndicator with mocked settings and styles.
 *
 * @param {Partial<Settings>} settings Overrides for default settings
 * @param {Styles} styles Overrides for default styles
 */
const renderBotTypingIndicator = (settings?: Partial<Settings>, styles?: Styles) => {
	return render(
		<TestChatBotProvider initialSettings={settings} initialStyles={styles}>
			<BotTypingIndicator />
		</TestChatBotProvider>
	);
};

describe("BotTypingIndicator Component", () => {
	it("renders three dots for the typing indicator", () => {
		renderBotTypingIndicator();
		const dots = document.querySelectorAll(".rcb-dot");
		expect(dots.length).toBe(3);
	});

	describe("Avatar Display based on Settings", () => {
		it("displays the avatar when showAvatar is true", () => {
			const settings = { botBubble: { showAvatar: true, avatar: "test-avatar.png" } };
			renderBotTypingIndicator(settings);
			const avatar = document.querySelector(".rcb-message-bot-avatar");
			expect(avatar).toBeInTheDocument();
			expect(avatar).toHaveStyle('background-image: url("test-avatar.png")');
		});

		it("does not display the avatar when showAvatar is false", () => {
			const settings = { botBubble: { showAvatar: false } };
			renderBotTypingIndicator(settings);
			const avatar = document.querySelector(".rcb-message-bot-avatar");
			expect(avatar).not.toBeInTheDocument();
		});
	});

	describe("Animation Class based on Settings", () => {
		it("applies entry animation class when animate is true", () => {
			const settings = { botBubble: { animate: true } };
			renderBotTypingIndicator(settings);
			const message = document.querySelector(".rcb-bot-message");
			expect(message).toHaveClass("rcb-bot-message-entry");
		});

		it("does not apply entry animation class when animate is false", () => {
			const settings = { botBubble: { animate: false } };
			renderBotTypingIndicator(settings);
			const message = document.querySelector(".rcb-bot-message");
			expect(message).not.toHaveClass("rcb-bot-message-entry");
		});
	});

	describe("Custom Styles based on StylesContext", () => {
		it("applies custom style to the indicator container", () => {
			const styles = { rcbTypingIndicatorContainerStyle: { backgroundColor: "blue" } };
			renderBotTypingIndicator(undefined, styles);
			const container = document.querySelector(".rcb-typing-indicator");
			expect(container).toHaveStyle("background-color: blue");
		});

		it("applies custom style to each dot", () => {
			const styles = { rcbTypingIndicatorDotStyle: { width: "10px" } };
			renderBotTypingIndicator(undefined, styles);
			const dots = document.querySelectorAll(".rcb-dot");
			dots.forEach(dot => {
				expect(dot).toHaveStyle("width: 10px");
			});
		});
	});

	it("calls preventDefault on mouseDown event", () => {
		renderBotTypingIndicator();
		const messageContainer = document.querySelector(".rcb-bot-message");
		
		// Assert that the element exists before proceeding
		expect(messageContainer).toBeInTheDocument();

		// We need to create a mock event that has the preventDefault method
		const mouseDownEvent = new MouseEvent("mousedown", { bubbles: true, cancelable: true });
		const preventDefaultSpy = jest.spyOn(mouseDownEvent, "preventDefault");

		// The assertion above guarantees messageContainer is not null, so we can use '!'
		fireEvent(messageContainer!, mouseDownEvent);
		expect(preventDefaultSpy).toHaveBeenCalled();
	});

	it("renders without crashing when context values are not provided", () => {
		// The TestChatBotProvider provides default empty objects if nothing is passed,
		// so this test effectively checks for robustness against empty/default context values.
		expect(() => render(
			<TestChatBotProvider>
				<BotTypingIndicator />
			</TestChatBotProvider>
		)).not.toThrow();
	});
});
