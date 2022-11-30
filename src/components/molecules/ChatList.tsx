import { Divider, Grid, List } from "@mui/material";
import React from "react";
import { useUserContext } from "../../contexts";
import { useAppContext } from "../../contexts/AppContext";
import { IChatroom, IUser } from "../../types";
import { getChatDisplayData } from "../../utils/data";
import styles from "./ChatList.module.css";
import { ChatListItem } from "./ChatListItem";

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
					return (
						<div key={index}>
							<ChatListItem
								selected={selectedChat?.id === chatroom.id}
								onClick={() => onSelectChat(chatroom)}
								avatar={avatar}
								primary={primary}
								secondary={secondary}
							/>
							{index !== chatrooms.length - 1 && <Divider />}
						</div>
					);
				})}
			</List>
		</div>
	);
};
