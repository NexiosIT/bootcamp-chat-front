import React, { useState, useMemo } from "react";
import { ChatList, SidebarHeader, SidebarSearch } from "../../../../components";
import styles from "./Sidebar.module.css";
import { useAppContext } from "../../../../contexts/AppContext";
import { useUserContext } from "../../../../contexts";
import { IChatroom } from "../../../../types";
import { filterChatrooms } from "../../../../utils/data";

interface ISidebarProps {}

export const Sidebar = ({}: ISidebarProps) => {
	const { chatrooms, setNewChatOpen, selectedChatroom, setSelectedChatroom, users } = useAppContext();
	const { signOut, user } = useUserContext();

	const [searchValue, setSearchValue] = useState<string>("");

	const handleSignOut = () => {
		signOut();
	};

	const handleClickNewChat = () => {
		setNewChatOpen(true);
	};

	const handleSelectChat = (room: IChatroom) => {
		setSelectedChatroom(room);
	};

	const filteredChatrooms: IChatroom[] | undefined = useMemo(() => {
		if (chatrooms && users && user) {
			return filterChatrooms(chatrooms, searchValue, users, user.id);
		}

		return chatrooms;
	}, [searchValue, chatrooms, users, user]);

	return (
		<div className={styles.sidebarContainer}>
			<SidebarHeader onClickNewChat={handleClickNewChat} onSignOut={handleSignOut} />
			<SidebarSearch value={searchValue} onChange={setSearchValue} />
			<ChatList selectedChat={selectedChatroom} onSelectChat={handleSelectChat} chatrooms={filteredChatrooms} />
		</div>
	);
};
