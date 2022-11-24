import React from "react";
import { ChatList, SidebarHeader, SidebarSearch } from "../../../../components";
import styles from "./Sidebar.module.css";
import { useAppContext } from "../../../../contexts/AppContext";
import { useUserContext } from "../../../../contexts";
import { IChatroom } from "../../../../types";

interface ISidebarProps {}

export const Sidebar = ({}: ISidebarProps) => {
	const { chatrooms, setNewChatOpen, selectedChatroom, setSelectedChatroom } = useAppContext();
	const { signOut } = useUserContext();

	const handleSignOut = () => {
		signOut();
	};

	const handleClickNewChat = () => {
		setNewChatOpen(true);
	};

	const handleSelectChat = (room: IChatroom) => {
		setSelectedChatroom(room);
	};

	return (
		<div className={styles.sidebarContainer}>
			<SidebarHeader onClickNewChat={handleClickNewChat} onSignOut={handleSignOut} />
			<SidebarSearch />
			<ChatList selectedChat={selectedChatroom} onSelectChat={handleSelectChat} chatrooms={chatrooms} />
		</div>
	);
};
