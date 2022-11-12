import React from "react";
import { Avatar, Container, Grid, IconButton } from "@mui/material";
import styles from "./ChatViewHeader.module.css";
import { MoreVert } from "@mui/icons-material";

export const ChatViewHeader = () => {
	return (
		<Grid padding={2} container flexDirection="row" className={styles.chatViewHeaderContainer}>
			<Avatar sx={{ width: 54, height: 54 }}>MB</Avatar>
			<div className={styles.chatDetails}>
				<div>-Chat Name-</div>
				<div>-Chat Secondary-</div>
			</div>
			<div>
				<IconButton>
					<MoreVert fontSize="large" />
				</IconButton>
			</div>
		</Grid>
	);
};
