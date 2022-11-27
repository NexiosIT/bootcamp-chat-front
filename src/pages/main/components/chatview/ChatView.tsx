import React, { useMemo } from "react";
import { ChatHistory, ChatInput, ChatViewHeader } from "../../../../components";
import { useUserContext } from "../../../../contexts";
import { useAppContext } from "../../../../contexts/AppContext";
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

	console.log("messages for chat view", messages);

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
