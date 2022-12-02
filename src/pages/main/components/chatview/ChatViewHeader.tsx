import React, { useMemo } from "react";
import { Avatar, Grid, Typography } from "@mui/material";
import styles from "./ChatViewHeader.module.css";
import { useUserContext } from "../../../../contexts";
import { useAppContext } from "../../../../contexts/AppContext";
import { getChatDisplayData } from "../../../../utils/data";
import { IChatroom } from "../../../../types";

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
		[selectedChat, users, user]
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
