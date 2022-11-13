import classNames from "classnames";
import React from "react";
import { ChatMessage } from "../core/ChatMessage";
import styles from "./ChatHistory.module.css";

const dummy = [0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0];

export const ChatHistory = () => {
	return (
		<div className={styles.chatHistoryContainer}>
			{dummy.map((number, index) => {
				//TODO: find out if this is my message or not, for alignment
				const isMyMessage = number === 1;
				const isSameSenderAsLast = dummy[index - 1] !== undefined && dummy[index - 1] === dummy[index];

				return (
					<div key={index} className={classNames(styles.chatHistoryEntry, { [styles.isMine]: isMyMessage })}>
						<ChatMessage showName={!isSameSenderAsLast}>
							This is a sample text. Lorem ipsum and all that.
						</ChatMessage>
					</div>
				);
			})}
		</div>
	);
};
