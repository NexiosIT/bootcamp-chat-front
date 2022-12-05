import React, { useMemo } from "react";
import { Avatar, Grid, ListItemIcon, MenuItem, Typography } from "@mui/material";
import styles from "./ChatViewHeader.module.css";
import { useUserContext } from "../../../../contexts";
import { useAppContext } from "../../../../contexts/AppContext";
import { getChatDisplayData } from "../../../../utils/data";
import { IChatroom } from "../../../../types";
import { ContextMenu } from "../../../../components";
import { DeleteOutline } from "@mui/icons-material";
import { DeleteChatroo } from "../../../../api/Chatroom";

interface IChatViewHeaderProps {
	selectedChat?: IChatroom;
}

export const ChatViewHeader = ({ selectedChat }: IChatViewHeaderProps) => {
	const { user, jwt } = useUserContext();
	const { users } = useAppContext();

	const handleClickDeleteChat = async (chatroom: IChatroom) => {
		if (jwt) {
			await DeleteChatroo(jwt, chatroom.id);
			// websocket message will delete the chatroom from the store
		}
	};

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
					<Grid direction="row-reverse" container item xs={3}>
						<ContextMenu>
							<MenuItem onClick={() => handleClickDeleteChat(selectedChat)}>
								<ListItemIcon>
									<DeleteOutline fontSize="small" color="error" />
								</ListItemIcon>
								<Typography color="error">Delete Chatroom</Typography>
							</MenuItem>
						</ContextMenu>
					</Grid>
				</>
			) : null}
		</Grid>
	);
};
