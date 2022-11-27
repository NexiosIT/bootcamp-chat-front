import React, { createContext, ReactNode, useContext, useState, useEffect, useCallback } from "react";
import { GetMessages } from "../api/Chatmessage";
import { GetChatrooms } from "../api/Chatroom";
import { CreateChatroomModal } from "../pages/main/components/create-modal/CreateChatroomModal";
import { IChatmessage, IChatroom, IUser } from "../types";
import { useUserContext } from "./UserContext";

interface IProviderProps {
	children: ReactNode;
}

export interface IAppContext {
	chatrooms?: IChatroom[];
	chatroomsLoading: boolean;
	chatroomsError?: string;
	messages?: IChatmessage[];
	messagesLoading: boolean;
	messagesError?: string;
	users?: IUser[];
	usersLoading: boolean;
	selectedChatroom?: IChatroom;
	setSelectedChatroom: React.Dispatch<React.SetStateAction<IChatroom | undefined>>;
	newChatOpen: boolean;
	setNewChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
	addChatroom: (chatroom: IChatroom) => void;
	addMessage: (message: IChatmessage) => void;
	getMessagesForRoom: (roomId?: string) => IChatmessage[] | null;
}

const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider = ({ children }: IProviderProps) => {
	const { jwt } = useUserContext();

	// App data states
	const [chatrooms, setChatrooms] = useState<IChatroom[]>();
	const [chatroomsLoading, setChatroomsLoading] = useState<boolean>(false);
	const [chatroomsError, setChatroomsError] = useState<string>();
	const [messages, setMessages] = useState<IChatmessage[]>();
	const [messagesLoading, setMessagesLoading] = useState<boolean>(false);
	const [messagesError, setMessagesError] = useState<string>();
	const [users, setUsers] = useState<IUser[]>();
	const [usersLoading, setUsersLoading] = useState<boolean>(false);

	// Navigation state
	const [selectedChatroom, setSelectedChatroom] = useState<IChatroom>();

	// UI states
	const [newChatOpen, setNewChatOpen] = useState<boolean>(false);

	// Effects
	useEffect(() => {
		const fetchRooms = async (jwt: string) => {
			setChatroomsLoading(true);
			setChatroomsError(undefined);

			const result = await GetChatrooms(jwt);

			if (result.isSuccess && result.chatrooms) {
				setChatrooms(result.chatrooms);
			} else {
				setChatroomsError(result.error);
			}

			setChatroomsLoading(false);
		};

		const fetchMessages = async (jwt: string) => {
			setMessagesLoading(true);
			setMessagesError(undefined);

			const result = await GetMessages(jwt);

			if (result.isSuccess && result.messages) {
				setMessages(result.messages);
			} else {
				setMessagesError(result.error);
			}

			setMessagesLoading(false);
		};

		// Do a basic fetch of current chatrooms on login
		if (jwt && chatrooms === undefined) {
			fetchRooms(jwt);
		}

		if (jwt && messages === undefined) {
			fetchMessages(jwt);
		}
	}, [jwt, chatrooms, messages]);

	// Global state control functions
	const addChatroom = useCallback(
		(chatroom: IChatroom) => {
			setChatrooms([...(chatrooms || []), chatroom]);
		},
		[setChatrooms, chatrooms]
	);

	const addMessage = useCallback(
		(message: IChatmessage) => {
			// fix for the return of the create call only having id of the chatroom
			// fill in other fields from the stored chatroom array
			const chatroomId = message.chatroom.id;
			const foundChatroom = chatrooms ? chatrooms.find((room) => room.id === chatroomId) : null;

			if (foundChatroom) {
				message.chatroom = foundChatroom;
			}

			setMessages([...(messages || []), message]);
		},
		[setMessages, messages]
	);

	// Memoized data getters
	const getMessagesForRoom = useCallback(
		(roomId?: string): IChatmessage[] | null => {
			console.log("get messages for room called", roomId, messages);
			if (!messages || !roomId) return null;
			return messages.filter((message) => message.chatroom.id === roomId).reverse();
		},
		[messages]
	);

	console.log("selected chat on render", selectedChatroom);
	console.log("messages on render", messages);

	return (
		<AppContext.Provider
			value={{
				chatrooms,
				chatroomsError,
				chatroomsLoading,
				messages,
				messagesLoading,
				messagesError,
				users,
				usersLoading,
				selectedChatroom,
				setSelectedChatroom,
				newChatOpen,
				setNewChatOpen,
				addChatroom,
				addMessage,
				getMessagesForRoom,
			}}
		>
			<CreateChatroomModal />
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
