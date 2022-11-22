import React from "react";
import { ChatList, SidebarHeader, SidebarSearch } from "../../../../components";
import styles from "./Sidebar.module.css";
import { useAppContext } from "../../../../contexts/AppContext";
import { useUserContext } from "../../../../contexts";

interface ISidebarProps {}

export const Sidebar = ({}: ISidebarProps) => {
	const { chatrooms, setNewChatOpen } = useAppContext();
	const { signOut } = useUserContext();

	const handleSignOut = () => {
		signOut();
	};

	const handleClickNewChat = () => {
		setNewChatOpen(true);
	};

	return (
		<div className={styles.sidebarContainer}>
			<SidebarHeader onClickNewChat={handleClickNewChat} onSignOut={handleSignOut} />
			<SidebarSearch />
			<ChatList chatrooms={chatrooms} />
		</div>
	);
};
