import React from "react";
import { Avatar, Grid, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import styles from "./ChatListItem.module.css";
import { IChatroom } from "../../types";

interface IChatListItemProps {
	chatroom: IChatroom;
	onClick: (chatroom: IChatroom) => void;
	selected: boolean;
}

export const ChatListItem = ({ chatroom, onClick, selected }: IChatListItemProps) => {
	return (
		<ListItem selected={selected} onClick={() => onClick(chatroom)} className={styles.chatListItemContainer}>
			<ListItemAvatar>
				<Avatar>
					<Typography>JD</Typography>
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={chatroom.name} secondary="< secondary text >" />
		</ListItem>
	);
};
