import React, { useMemo } from "react";
import { ChatHistory, ChatInput, ChatViewHeader } from "../../../../components";
import { useAppContext } from "../../../../contexts/AppContext";
import styles from "./ChatView.module.css";

interface IChatViewProps {
	onSubmitMessage: (message: string) => void;
	submitMessageLoading: boolean;
}

export const ChatView = ({ onSubmitMessage, submitMessageLoading }: IChatViewProps) => {
	const { selectedChatroom, getMessagesForRoom } = useAppContext();

	const isInputEnabled = useMemo(() => {
		return selectedChatroom !== undefined;
	}, [selectedChatroom]);

	let messages = useMemo(() => getMessagesForRoom(selectedChatroom?.id), [selectedChatroom]);

	return (
		<div className={styles.chatViewContainer}>
			<ChatViewHeader selectedChat={selectedChatroom} />
			<ChatHistory messages={messages} />
			<ChatInput
				enabled={isInputEnabled}
				submitMessageLoading={submitMessageLoading}
				onSubmitMessage={onSubmitMessage}
			/>
		</div>
	);
};
