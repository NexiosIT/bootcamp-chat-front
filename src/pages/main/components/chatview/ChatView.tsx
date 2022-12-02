import React, { useMemo } from "react";
import { useUserContext } from "../../../../contexts";
import { useAppContext } from "../../../../contexts/AppContext";
import { ChatHistory } from "./ChatHistory";
import { ChatInput } from "./ChatInput";
import { ChatViewHeader } from "./ChatViewHeader";
import styles from "./ChatView.module.css";

interface IChatViewProps {
	onSubmitMessage: (message: string) => void;
	submitMessageLoading: boolean;
}

export const ChatView = ({ onSubmitMessage, submitMessageLoading }: IChatViewProps) => {
	const { selectedChatroom, getMessagesForRoom, users } = useAppContext();
  const { user } = useUserContext();

	const isInputEnabled = useMemo(() => {
		return selectedChatroom !== undefined;
	}, [selectedChatroom]);

	let messages = getMessagesForRoom(selectedChatroom?.id);

	return (
		<div className={styles.chatViewContainer}>
			<ChatViewHeader selectedChat={selectedChatroom} />
			<ChatHistory users={users} userId={user?.id} messages={messages} />
			<ChatInput
				enabled={isInputEnabled}
				submitMessageLoading={submitMessageLoading}
				onSubmitMessage={onSubmitMessage}
			/>
		</div>
	);
};
