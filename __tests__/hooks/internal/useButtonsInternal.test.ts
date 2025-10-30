import { renderHook } from "@testing-library/react";
import { useButtonInternal } from "../../../src/hooks/internal/useButtonsInternal";

// Mock dependencies
jest.mock("../../../src/context/SettingsContext", () => ({
	useSettingsContext: jest.fn(),
}));
jest.mock("../../../src/utils/buttonBuilder", () => ({
	createAudioButton: jest.fn(() => "AudioButton"),
	createCloseChatButton: jest.fn(() => "CloseChatButton"),
	createEmojiButton: jest.fn(() => "EmojiButton"),
	createFileAttachmentButton: jest.fn(() => "FileAttachmentButton"),
	createNotificationButton: jest.fn(() => "NotificationButton"),
	createSendButton: jest.fn(() => "SendButton"),
	createVoiceButton: jest.fn(() => "VoiceButton"),
	getButtonConfig: jest.fn(),
}));
jest.mock("../../../src/constants/Button", () => ({
	Button: {
		CLOSE_CHAT_BUTTON: "close",
		AUDIO_BUTTON: "audio",
		NOTIFICATION_BUTTON: "notification",
		EMOJI_PICKER_BUTTON: "emoji",
		FILE_ATTACHMENT_BUTTON: "file",
		SEND_MESSAGE_BUTTON: "send",
		VOICE_MESSAGE_BUTTON: "voice",
	},
}));

describe("useButtonInternal", () => {
	const mockSettings = { some: "settings" };
	const mockHeader = ["CloseChatButton"];
	const mockChatInput = ["SendButton", "EmojiButton"];
	const mockFooter = ["AudioButton", "VoiceButton"];

	beforeEach(() => {
		jest.clearAllMocks();
		require("../../../src/context/SettingsContext").useSettingsContext.mockReturnValue({ settings: mockSettings });
		require("../../../src/utils/buttonBuilder").getButtonConfig.mockReturnValue({
			header: mockHeader,
			chatInput: mockChatInput,
			footer: mockFooter,
		});
	});

	it("should return headerButtons, chatInputButtons, and footerButtons from getButtonConfig", () => {
		const { result } = renderHook(() => useButtonInternal());
		expect(result.current.headerButtons).toEqual(mockHeader);
		expect(result.current.chatInputButtons).toEqual(mockChatInput);
		expect(result.current.footerButtons).toEqual(mockFooter);
	});

	it("should call getButtonConfig with settings and staticButtonComponentMap", () => {
		renderHook(() => useButtonInternal());
		expect(require("../../../src/utils/buttonBuilder").getButtonConfig).toHaveBeenCalledWith(
			mockSettings,
			expect.any(Object)
		);
	});

	it("should update buttons when settings change", () => {
		const { rerender, result } = renderHook(() => useButtonInternal());
		expect(result.current.headerButtons).toEqual(mockHeader);

		// Change settings and mock new return
		const newSettings = { other: "settings" };
		const newHeader = ["NotificationButton"];
		require("../../../src/context/SettingsContext").useSettingsContext.mockReturnValue({ settings: newSettings });
		require("../../../src/utils/buttonBuilder").getButtonConfig.mockReturnValue({
			header: newHeader,
			chatInput: [],
			footer: [],
		});

		rerender();
		expect(result.current.headerButtons).toEqual(newHeader);
	});
});