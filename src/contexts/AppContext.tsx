import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { GetChatrooms } from "../api/Chatroom";
import { IChatMessage, IChatRoom, IUser } from "../types";
import { LoginResult } from "../types/Api";
import { useUserContext } from "./UserContext";

interface IProviderProps {
	children: ReactNode;
}

export interface IAppContext {
	chatrooms?: IChatRoom[];
	chatroomsLoading: boolean;
	chatroomsError?: string;
	messages?: IChatMessage[];
	messagesLoading: boolean;
	users?: IUser[];
	usersLoading: boolean;
}

const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider = ({ children }: IProviderProps) => {
	const { jwt } = useUserContext();
	const [chatrooms, setChatrooms] = useState<IChatRoom[]>();
	const [chatroomsLoading, setChatroomsLoading] = useState<boolean>(false);
	const [chatroomsError, setChatroomsError] = useState<string>();
	const [messages, setMessages] = useState<IChatMessage[]>();
	const [messagesLoading, setMessagesLoading] = useState<boolean>(false);
	const [users, setUsers] = useState<IUser[]>();
	const [usersLoading, setUsersLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchRooms = async (jwt: string) => {
			setChatroomsLoading(true);
			setChatroomsError(undefined);

			const result = await GetChatrooms(jwt);

			if (result.isSuccess) {
				setChatrooms(result.chatrooms);
			} else {
				setChatroomsError(result.error);
			}

			setChatroomsLoading(false);
		};

		console.log("jwt changed", jwt);

		// Do a basic fetch of current chatrooms on login
		if (jwt && chatrooms === undefined) {
			fetchRooms(jwt);
		}
	}, [jwt]);

	console.log("Chatrooms on context render", chatrooms);

	return (
		<AppContext.Provider
			value={{ chatrooms, chatroomsError, chatroomsLoading, messages, messagesLoading, users, usersLoading }}
		>
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
