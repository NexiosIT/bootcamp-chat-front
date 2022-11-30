import React, { createContext, ReactNode, useContext, useState, useEffect, useCallback, useRef } from "react";
import { GetMessages } from "../api/Chatmessage";
import { GetChatrooms } from "../api/Chatroom";
import { GetUsers } from "../api/User";
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
	usersError?: string;
	selectedChatroom?: IChatroom;
	setSelectedChatroom: React.Dispatch<React.SetStateAction<IChatroom | undefined>>;
	newChatOpen: boolean;
	setNewChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
	addChatroom: (chatroom: IChatroom) => void;
	addMessage: (message: IChatmessage) => void;
	removeMessage: (message: IChatmessage) => void;
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
	const [usersError, setUsersError] = useState<string>();

  // Websocket reference
  const webSocket = useRef<WebSocket | null>(null);

	// Navigation state
	const [selectedChatroom, setSelectedChatroom] = useState<IChatroom>();

	// UI states
	const [newChatOpen, setNewChatOpen] = useState<boolean>(false);

	// Effects
  // Fetch data
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

		const fetchUsers = async (jwt: string) => {
			setUsersLoading(true);
			setUsersError(undefined);

			const result = await GetUsers(jwt);

			if (result?.isSuccess && result.users) {
				setUsers(result.users);
			} else {
				setUsersError(result.error);
			}

			setUsersLoading(false);
		};

		// Do a basic fetch of current chatrooms on login
		if (jwt && chatrooms === undefined) {
			fetchRooms(jwt);
		}

		if (jwt && messages === undefined) {
			fetchMessages(jwt);
		}

		if (jwt && users === undefined) {
			fetchUsers(jwt);
		}
	}, [jwt, chatrooms, messages, users]);

  // Set up websocket
  useEffect(() => {
    if (jwt) {

      console.log("setting up websocket");
  
      webSocket.current = new WebSocket("ws://localhost:3001/ws");
  
      webSocket.current.onopen = () => {
        console.log("websocket opened")
      }
  
      webSocket.current.onclose = () => {
        console.log("websocket closed")
      }
      
      webSocket.current.onmessage = (ev: MessageEvent<any>) => {
        console.log("received message", ev)
      }
    }

    // return cleanup function
    return () => {
      if (webSocket.current) {
        console.log("demount, closing websocket")
        webSocket.current.close();
      }
    }

  }, [jwt])

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
		[messages]
	);

	const removeMessage = useCallback(
		(message: IChatmessage) => {
			setMessages(messages?.filter((msg) => msg.id !== message.id));
		},
		[messages]
	);

	// Memoized data getters
	const getMessagesForRoom = useCallback(
		(roomId?: string): IChatmessage[] | null => {
			if (!messages || !roomId) return null;
			return messages.filter((message) => message.chatroom.id === roomId).reverse();
		},
		[messages]
	);

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
				usersError,
				selectedChatroom,
				setSelectedChatroom,
				newChatOpen,
				setNewChatOpen,
				addChatroom,
				addMessage,
				removeMessage,
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
