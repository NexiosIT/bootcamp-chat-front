import React from "react";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import styles from "./ChatViewHeader.module.css";
import { MoreVert } from "@mui/icons-material";
import { IChatroom } from "../../types";

interface IChatViewHeaderProps {
	selectedChat?: IChatroom;
}

export const ChatViewHeader = ({ selectedChat }: IChatViewHeaderProps) => {
	return (
		<Grid padding={1} container flexDirection="row" className={styles.chatViewHeaderContainer}>
			{selectedChat ? (
				<>
					<Avatar sx={{ width: 42, height: 42 }}>
						<Typography>JD</Typography>
					</Avatar>
					<div className={styles.chatDetails}>
						<Typography variant="body1">{selectedChat.name}</Typography>
						<Typography variant="body2">-Chat Secondary-</Typography>
					</div>
					<Grid paddingTop={0.5} item>
						<IconButton size="small">
							<MoreVert fontSize="medium" />
						</IconButton>
					</Grid>
				</>
			) : null}
		</Grid>
	);
};
