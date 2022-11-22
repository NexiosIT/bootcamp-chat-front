import { Divider, Grid, List } from "@mui/material";
import React from "react";
import { IChatroom } from "../../types";
import styles from "./ChatList.module.css";
import { ChatListItem } from "./ChatListItem";

interface IChatListProps {
	chatrooms?: IChatroom[];
}

export const ChatList = ({ chatrooms = [] }: IChatListProps) => {
	return (
		<div className={styles.chatListContainer}>
			<List component="nav">
				{chatrooms.map((room, index) => (
					<div key={index}>
						<ChatListItem chatroom={room} />
						{index !== chatrooms.length - 1 && <Divider />}
					</div>
				))}
			</List>
		</div>
	);
};
