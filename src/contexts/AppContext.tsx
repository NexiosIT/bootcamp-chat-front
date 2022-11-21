import React, { createContext, ReactNode, useContext, useState } from "react";
import { IChatMessage, IChatRoom, IUser } from "../types";
import { LoginResult } from "../types/Api";
import { useUserContext } from "./UserContext";

interface IProviderProps {
	children: ReactNode;
}

export interface IAppContext {
	chatrooms: IChatRoom[];
	chatroomsLoading: boolean;
	messages: IChatMessage[];
	messagesLoading: boolean;
	users: IUser[];
	usersLoading: boolean;
}

const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider = ({ children }: IProviderProps) => {
	const { jwt } = useUserContext();
	const [chatrooms, setChatrooms] = useState<IChatRoom[]>([]);
	const [chatroomsLoading, setChatroomsLoading] = useState<boolean>(false);
	const [messages, setMessages] = useState<IChatMessage[]>([]);
	const [messagesLoading, setMessagesLoading] = useState<boolean>(false);
	const [users, setUsers] = useState<IUser[]>([]);
	const [usersLoading, setUsersLoading] = useState<boolean>(false);

	console.log("jwt on render app context", jwt);

	return (
		<AppContext.Provider value={{ chatrooms, chatroomsLoading, messages, messagesLoading, users, usersLoading }}>
			{children}
		</AppContext.Provider>
	);
};

// create a hook to access the app context
export const useAppContext = (): IAppContext => {
	const context = useContext<IAppContext | null>(AppContext);

	if (!context) {
		throw new Error("App context must be used within a Provider.");
	}

	return context;
};
