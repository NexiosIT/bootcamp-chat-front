import React, { ReactNode } from "react";
import { Avatar, Badge, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import styles from "./ChatListItem.module.css";

interface IChatListItemProps {
	primary: ReactNode;
	secondary?: ReactNode;
	avatar?: ReactNode;
	onClick: () => void;
	selected: boolean;
	newMessages?: number;
}

export const ChatListItem = ({
	primary,
	secondary,
	onClick,
	selected,
	avatar,
	newMessages = 0,
}: IChatListItemProps) => {
	const primaryContent = (
		<span>
			{primary}
			{newMessages > 0 && (
				<span className={styles.newMessagesContainer}>
					<Badge badgeContent={newMessages} color="primary" />
				</span>
			)}
		</span>
	);

	return (
		<ListItem selected={selected} onClick={onClick} className={styles.chatListItemContainer}>
			<ListItemAvatar>
				<Avatar>
					<Typography>{avatar}</Typography>
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={primaryContent} secondary={secondary} />
		</ListItem>
	);
};
