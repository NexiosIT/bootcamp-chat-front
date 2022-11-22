import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { GetChatrooms } from "../api/Chatroom";
import { CreateChatroomModal } from "../pages/main/components/create-modal/CreateChatroomModal";
import { IChatMessage, IChatroom, IUser } from "../types";
import { useUserContext } from "./UserContext";

interface IProviderProps {
	children: ReactNode;
}

export interface IAppContext {
	chatrooms?: IChatroom[];
	chatroomsLoading: boolean;
	chatroomsError?: string;
	messages?: IChatMessage[];
	messagesLoading: boolean;
	users?: IUser[];
	usersLoading: boolean;
  newChatOpen: boolean;
	setNewChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addChatroom: (chatroom: IChatroom) => void;
}

const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider = ({ children }: IProviderProps) => {
	const { jwt } = useUserContext();

  // App data states
	const [chatrooms, setChatrooms] = useState<IChatroom[]>();
	const [chatroomsLoading, setChatroomsLoading] = useState<boolean>(false);
	const [chatroomsError, setChatroomsError] = useState<string>();
	const [messages, setMessages] = useState<IChatMessage[]>();
	const [messagesLoading, setMessagesLoading] = useState<boolean>(false);
	const [users, setUsers] = useState<IUser[]>();
	const [usersLoading, setUsersLoading] = useState<boolean>(false);

  // UI states
	const [newChatOpen, setNewChatOpen] = useState<boolean>(false);

  // Effects
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

		// Do a basic fetch of current chatrooms on login
		if (jwt && chatrooms === undefined) {
			fetchRooms(jwt);
		}
	}, [jwt]);

  // Global state control functions
  const addChatroom = (chatroom: IChatroom) => {
    setChatrooms([...chatrooms || [], chatroom])
  }

	return (
		<AppContext.Provider
			value={{
				chatrooms,
				chatroomsError,
				chatroomsLoading,
				messages,
				messagesLoading,
				users,
				usersLoading,
        newChatOpen,
				setNewChatOpen,
        addChatroom
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
