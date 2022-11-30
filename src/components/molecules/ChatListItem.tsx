import React, { ReactNode } from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import styles from "./ChatListItem.module.css";
import { IChatroom } from "../../types";

interface IChatListItemProps {
	primary: ReactNode;
	secondary?: ReactNode;
	avatar?: ReactNode;
	onClick: () => void;
	selected: boolean;
}

export const ChatListItem = ({
	primary,
	secondary,
	onClick,
	selected,
	avatar,
}: IChatListItemProps) => {
	return (
		<ListItem selected={selected} onClick={onClick} className={styles.chatListItemContainer}>
			<ListItemAvatar>
				<Avatar>
					<Typography>{avatar}</Typography>
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={primary} secondary={secondary} />
		</ListItem>
	);
};
