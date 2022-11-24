import { Divider, Grid, List } from "@mui/material";
import React from "react";
import { IChatroom } from "../../types";
import styles from "./ChatList.module.css";
import { ChatListItem } from "./ChatListItem";

interface IChatListProps {
	chatrooms?: IChatroom[];
	selectedChat?: IChatroom;
	onSelectChat: (chatroom: IChatroom) => void;
}

export const ChatList = ({ chatrooms = [], selectedChat, onSelectChat }: IChatListProps) => {
	return (
		<div className={styles.chatListContainer}>
			<List component="nav">
				{chatrooms.map((chatroom, index) => (
					<div key={index}>
						<ChatListItem
							selected={selectedChat?.id === chatroom.id}
							onClick={() => onSelectChat(chatroom)}
							chatroom={chatroom}
						/>
						{index !== chatrooms.length - 1 && <Divider />}
					</div>
				))}
			</List>
		</div>
	);
};
