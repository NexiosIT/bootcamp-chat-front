import React from "react";
import { ChatList, SidebarHeader, SidebarSearch } from "../../../../components";
import styles from "./Sidebar.module.css";
import { useAppContext } from "../../../../contexts/AppContext";
import { useUserContext } from "../../../../contexts";

interface ISidebarProps {}

export const Sidebar = ({}: ISidebarProps) => {
	const { chatrooms } = useAppContext();
	const { signOut } = useUserContext();

	const handleSignOut = () => {
		signOut();
	};

	return (
		<div className={styles.sidebarContainer}>
			<SidebarHeader onSignOut={handleSignOut} />
			<SidebarSearch />
			<ChatList chatrooms={chatrooms} />
		</div>
	);
};
