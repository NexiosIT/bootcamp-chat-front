import React from "react";
import classNames from "classnames";
import { ChatMessage } from "../core/ChatMessage";
import styles from "./ChatHistory.module.css";
import { IChatmessage } from "../../types";
import { Typography } from "@mui/material";

interface IChatHistoryProps {
	messages: IChatmessage[];
}

export const ChatHistory = ({ messages }: IChatHistoryProps) => {
	return (
		<div className={styles.chatHistoryContainer}>
			{!messages || messages.length === 0 ? (
				<Typography variant="h5">No messages found</Typography>
			) : (
				<>
					{messages.map((message, index) => {
						//TODO: find out if this is my message or not, for alignment
						const isMyMessage = message.user === "";
						const isSameSenderAsLast =
							messages[index - 1] !== undefined && messages[index - 1].user === messages[index].user;

						return (
							<div key={index} className={classNames(styles.chatHistoryEntry, { [styles.isMine]: isMyMessage })}>
								<ChatMessage showName={!isSameSenderAsLast}>{message.data}</ChatMessage>
							</div>
						);
					})}
				</>
			)}
		</div>
	);
};
