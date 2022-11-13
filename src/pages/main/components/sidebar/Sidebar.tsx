import React from "react";
import { Grid } from "@mui/material";
import { ChatList, SidebarHeader, SidebarSearch } from "../../../../components";
import styles from "./Sidebar.module.css";

interface ISidebarProps {}

export const Sidebar = ({}: ISidebarProps) => {
	return (
		<div className={styles.sidebarContainer}>
			<SidebarHeader />
			<SidebarSearch />
			<ChatList />
		</div>
	);
};
