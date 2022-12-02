import React from "react";
import { Avatar, Divider, Grid, ListItemIcon, MenuItem, Typography } from "@mui/material";
import styles from "./SidebarHeader.module.css";
import { Logout } from "@mui/icons-material";
import { useUserContext } from "../../../../contexts";
import { ContextMenu } from "../../../../components";

interface ISidebarHeaderProps {
	onSignOut: () => void;
	onClickNewChat: () => void;
}

export const SidebarHeader = ({ onSignOut, onClickNewChat }: ISidebarHeaderProps) => {
	const { user } = useUserContext();
	return (
		<Grid container padding={1} className={styles.sidebarHeaderContainer}>
			<Grid item xs={9} container flexDirection="row">
				<Avatar sx={{ width: 42, height: 42, marginRight: "20px" }}>
					<Typography>{user ? user.initials : ""}</Typography>
				</Avatar>
				<Typography style={{ marginTop: "6px" }}>{user ? user.username : ""}</Typography>
			</Grid>
			<Grid direction="row-reverse" container item xs={3}>
				<ContextMenu>
					<MenuItem onClick={onClickNewChat}>New Chatroom</MenuItem>
					<Divider />
					<MenuItem onClick={onSignOut}>
						<ListItemIcon>
							<Logout fontSize="small" />
						</ListItemIcon>
						Sign Out
					</MenuItem>
				</ContextMenu>
			</Grid>
		</Grid>
	);
};
