import React from "react";
import { Grid } from "@mui/material";
import { ChatList, SidebarHeader, SidebarSearch } from "../../../../components";
import styles from "./Sidebar.module.css";
import { useAppContext } from "../../../../contexts/AppContext";

interface ISidebarProps {}

export const Sidebar = ({}: ISidebarProps) => {
	const { chatrooms } = useAppContext();

	return (
		<div className={styles.sidebarContainer}>
			<SidebarHeader />
			<SidebarSearch />
			<ChatList chatrooms={chatrooms} />
		</div>
	);
};
