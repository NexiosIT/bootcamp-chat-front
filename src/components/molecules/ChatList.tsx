import { Divider, Grid, List } from "@mui/material";
import React from "react";
import styles from "./ChatList.module.css";
import { ChatListItem } from "./ChatListItem";

const dummy = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const ChatList = () => {
	return (
		<div className={styles.chatListContainer}>
			<List component="nav">
				{dummy.map((message, index) => (
					<>
						<ChatListItem />
						{index !== dummy.length - 1 && <Divider />}
					</>
				))}
			</List>
		</div>
	);
};
