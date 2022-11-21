import React from "react";
import { Avatar, Grid, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import styles from "./ChatListItem.module.css";
import { IChatRoom } from "../../types";

interface IChatListItemProps {
  chatroom: IChatRoom;
}

export const ChatListItem = ({chatroom}: IChatListItemProps) => {
	return (
		<ListItem className={styles.chatListItemContainer}>
			<ListItemAvatar>
				<Avatar>JD</Avatar>
			</ListItemAvatar>
			<ListItemText 
        primary={chatroom.name}
        secondary="< secondary text >"
      />
		</ListItem>
	);
};
