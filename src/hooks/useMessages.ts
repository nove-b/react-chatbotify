import { useMessagesInternal } from "./internal/useMessagesInternal";

/**
 * External custom hook for managing messages.
 */
export const useMessages = () => {
	// handles messages
	const {
		endStreamMessage,
		injectMessage,
		removeMessage,
		simulateStreamMessage,
		streamMessage,
		messages,
		replaceMessages,
		getMessages,
	} = useMessagesInternal();

	return {
		endStreamMessage,
		injectMessage,
		removeMessage,
		simulateStreamMessage,
		streamMessage,
		messages,
		replaceMessages,
		getMessages,
	};
};
