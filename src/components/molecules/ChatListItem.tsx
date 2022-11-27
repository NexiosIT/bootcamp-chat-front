import React, { ReactNode } from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import styles from "./ChatListItem.module.css";
import { IChatroom } from "../../types";

interface IChatListItemProps {
	primaryContent: ReactNode;
	secondaryContent?: ReactNode;
	avatarContent?: ReactNode;
	onClick: () => void;
	selected: boolean;
}

export const ChatListItem = ({
	primaryContent,
	secondaryContent,
	onClick,
	selected,
	avatarContent,
}: IChatListItemProps) => {
	return (
		<ListItem selected={selected} onClick={onClick} className={styles.chatListItemContainer}>
			<ListItemAvatar>
				<Avatar>
					<Typography>{avatarContent}</Typography>
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={primaryContent} secondary={secondaryContent} />
		</ListItem>
	);
};
