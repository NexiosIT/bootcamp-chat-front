import React from "react";
import { Avatar, Grid, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import styles from "./ChatListItem.module.css";
import { IChatroom } from "../../types";

interface IChatListItemProps {
  chatroom: IChatroom;
}

export const ChatListItem = ({chatroom}: IChatListItemProps) => {
	return (
		<ListItem className={styles.chatListItemContainer}>
			<ListItemAvatar>
				<Avatar><Typography>JD</Typography></Avatar>
			</ListItemAvatar>
			<ListItemText 
        primary={chatroom.name}
        secondary="< secondary text >"
      />
		</ListItem>
	);
};
