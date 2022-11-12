import React from "react";
import { Avatar, Grid, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import styles from "./ChatListItem.module.css";

export const ChatListItem = () => {
	return (
		<ListItem className={styles.chatListItemContainer}>
			<ListItemAvatar>
				<Avatar>MB</Avatar>
			</ListItemAvatar>
			<ListItemText 
        primary="Minka Borny"
        secondary="Bla bla bla bla bla bla"
      />
		{/* 	<Grid item xs={2}>
				<Typography variant="body2">17:30</Typography>
			</Grid> */}
		</ListItem>
	);
};
