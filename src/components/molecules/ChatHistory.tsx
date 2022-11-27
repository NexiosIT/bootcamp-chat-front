import React from "react";
import classNames from "classnames";
import { ChatMessage } from "../core/ChatMessage";
import styles from "./ChatHistory.module.css";
import { IChatmessage, IUser } from "../../types";
import { Typography } from "@mui/material";
import { NO_CHAT_SELECTED, NO_MESSAGES } from "../../vars/messages";

interface IChatHistoryProps {
	messages: IChatmessage[] | null;
	userId?: string;
	users?: IUser[];
}

export const ChatHistory = ({ messages, userId, users }: IChatHistoryProps) => {
	const renderMessages = (messages: IChatmessage[]) => {
		if (messages.length === 0)
			return (
				<div className={styles.noMessagesFound}>
					<Typography variant="h5">{NO_MESSAGES}</Typography>
				</div>
			);

		return (
			<>
				{messages.map((message, index) => {
					const isMyMessage = userId && message.user === userId;
					const isSameSenderAsLast =
						messages[index + 1] !== undefined && messages[index + 1].user === messages[index].user;

					const foundUser = users?.find((user) => user.id === message.user);

					return (
						<div key={index} className={classNames(styles.chatHistoryEntry, { [styles.isMine]: isMyMessage })}>
							<ChatMessage title={foundUser ? foundUser.username : ""} showTitle={!isSameSenderAsLast}>
								{message.data}
							</ChatMessage>
						</div>
					);
				})}
			</>
		);
	};

	return (
		<div className={styles.chatHistoryContainer}>
			{messages === null ? (
				<div className={styles.noMessagesFound}>
					<Typography variant="h5">{NO_CHAT_SELECTED}</Typography>
				</div>
			) : (
				renderMessages(messages)
			)}
		</div>
	);
};
