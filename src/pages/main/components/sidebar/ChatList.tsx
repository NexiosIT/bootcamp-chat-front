import React from "react";
import { Divider, List } from "@mui/material";
import styles from "./ChatList.module.css";
import { ChatListItem } from "./ChatListItem";
import { useUserContext } from "../../../../contexts";
import { useAppContext } from "../../../../contexts/AppContext";
import { IChatroom } from "../../../../types";
import { getChatDisplayData } from "../../../../utils/data";

interface IChatListProps {
	chatrooms?: IChatroom[];
	selectedChat?: IChatroom;
	onSelectChat: (chatroom: IChatroom) => void;
}

export const ChatList = ({ chatrooms = [], selectedChat, onSelectChat }: IChatListProps) => {
	const { user } = useUserContext();
	const { users } = useAppContext();
	return (
		<div className={styles.chatListContainer}>
			<List component="nav">
				{chatrooms.map((chatroom, index) => {
					const chatDisplay = getChatDisplayData(chatroom, users || [], user?.id);
					const { avatar, primary, secondary } = chatDisplay;
					const isSelected = selectedChat?.id === chatroom.id;
					return (
						<div key={index}>
							<ChatListItem
								selected={isSelected}
								onClick={() => onSelectChat(chatroom)}
								avatar={avatar}
								primary={primary}
								secondary={secondary}
								newMessages={!isSelected ? chatroom.unreadMessages : 0}
							/>
							{index !== chatrooms.length - 1 && <Divider />}
						</div>
					);
				})}
			</List>
		</div>
	);
};
