import React, { useMemo } from "react";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import styles from "./ChatViewHeader.module.css";
import { MoreVert } from "@mui/icons-material";
import { IChatroom } from "../../types";
import { useAppContext } from "../../contexts/AppContext";
import { useUserContext } from "../../contexts";
import { getChatDisplayData, IChatDisplayData } from "../../utils/data";

interface IChatViewHeaderProps {
	selectedChat?: IChatroom;
}

export const ChatViewHeader = ({ selectedChat }: IChatViewHeaderProps) => {
	const { user } = useUserContext();
	const { users } = useAppContext();

	const chatDisplay = useMemo(
		() =>
			selectedChat
				? getChatDisplayData(selectedChat, users || [], user?.id)
				: { primary: "", secondary: "", avatar: "" },
		[selectedChat]
	);

	return (
		<Grid padding={1} container flexDirection="row" className={styles.chatViewHeaderContainer}>
			{selectedChat ? (
				<>
					<Avatar sx={{ width: 42, height: 42 }}>
						<Typography>{chatDisplay.avatar}</Typography>
					</Avatar>
					<div className={styles.chatDetails}>
						<Typography variant="body1">{chatDisplay.primary}</Typography>
						<Typography variant="body2">{chatDisplay.secondary}</Typography>
					</div>
				</>
			) : null}
		</Grid>
	);
};
