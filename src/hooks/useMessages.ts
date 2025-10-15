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
		getMessage,
	} = useMessagesInternal();

	return {
		endStreamMessage,
		injectMessage,
		removeMessage,
		simulateStreamMessage,
		streamMessage,
		messages,
		replaceMessages,
		getMessage,
	};
};
