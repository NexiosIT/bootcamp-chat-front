import React from "react";
import { Avatar, Divider, Grid, ListItemIcon, MenuItem, Typography, IconButton, Tooltip } from "@mui/material";
import styles from "./SidebarHeader.module.css";
import { ContextMenu } from "../core/ContextMenu";
import { Add, Logout } from "@mui/icons-material";

interface ISidebarHeaderProps {
	onSignOut: () => void;
}

export const SidebarHeader = ({ onSignOut }: ISidebarHeaderProps) => {
	return (
		<Grid container padding={1} className={styles.sidebarHeaderContainer}>
			<Grid item xs={9}>
				<Avatar sx={{ width: 42, height: 42 }}>
					<Typography>JD</Typography>
				</Avatar>
			</Grid>
			<Grid direction="row-reverse" container paddingTop={0.5} xs={3}>
				<ContextMenu>
					<MenuItem onClick={onSignOut}>
						<ListItemIcon>
							<Logout fontSize="small" />
						</ListItemIcon>
						Sign Out
					</MenuItem>
				</ContextMenu>
				<Tooltip title="New Chatroom">
					<IconButton>
						<Add />
					</IconButton>
				</Tooltip>
			</Grid>
		</Grid>
	);
};
