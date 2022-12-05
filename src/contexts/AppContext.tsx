import React, { createContext, ReactNode, useContext, useState, useEffect, useCallback, useRef } from "react";
import { GetMessages } from "../api/Chatmessage";
import { GetChatrooms } from "../api/Chatroom";
import { mapApiChatroom, mapApiMessage, mapApiUser } from "../api/mappers";
import { GetUsers } from "../api/User";
import { getWebsocketApi } from "../api/utils";
import { CreateChatroomModal } from "../pages/main/components/create-modal/CreateChatroomModal";
import { IChatmessage, IChatroom, IUser, IWSMessage } from "../types";
import { useUserContext } from "./UserContext";

interface IProviderProps {
	children: ReactNode;
}

export interface IAppContext {
	chatrooms?: IChatroom[];
	chatroomsError?: string;
	messages?: IChatmessage[];
	messagesError?: string;
	users?: IUser[];
	usersError?: string;
	appLoading: boolean;
	selectedChatroom?: IChatroom;
	setSelectedChatroom: React.Dispatch<React.SetStateAction<IChatroom | undefined>>;
	newChatOpen: boolean;
	setNewChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
	getMessagesForRoom: (roomId?: string) => IChatmessage[] | null;
}

const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider = ({ children }: IProviderProps) => {
	const { jwt, user } = useUserContext();

	// App data states
	const [appLoading, setAppLoading] = useState<boolean>(false);
	const [chatrooms, setChatrooms] = useState<IChatroom[]>();
	const [chatroomsError, setChatroomsError] = useState<string>();
	const [messages, setMessages] = useState<IChatmessage[]>();
	const [messagesError, setMessagesError] = useState<string>();
	const [users, setUsers] = useState<IUser[]>();
	const [usersError, setUsersError] = useState<string>();

	// Websocket reference
	const webSocket = useRef<WebSocket | null>(null);

	// Navigation state
	const [selectedChatroom, setSelectedChatroom] = useState<IChatroom>();

	// UI states
	const [newChatOpen, setNewChatOpen] = useState<boolean>(false);

	// Websocket setup
	const setupWebsocket = useCallback(() => {
		if (jwt) {
			if (webSocket.current) webSocket.current.close();

			webSocket.current = new WebSocket(getWebsocketApi());

			webSocket.current.onopen = () => {
				console.log("Websocket: Connection Opened.");
			};

			webSocket.current.onclose = () => {
				console.log("Websocket: Connection Closed.");
			};

			webSocket.current.onmessage = (ev: MessageEvent<any>) => {
				if (ev && ev.data) {
					const msg: IWSMessage = JSON.parse(ev.data);
					console.log("Websocket: Message Received.", msg);
					switch (msg.event) {
						case "new_message": {
							const newMessage: IChatmessage = mapApiMessage(msg.data);
							setMessages((prev) => [...(prev || []), newMessage]);

							// add new unread message to chatroom array
							setChatrooms((prev) =>
								prev?.map((room) => {
									if (room.id === newMessage.chatroom) {
										return {
											...room,
											unreadMessages: room.unreadMessages + 1,
										};
									}
									return room;
								})
							);

							break;
						}
						case "new_chatroom": {
							const newChatroom: IChatroom = mapApiChatroom(msg.data);
							setChatrooms((prev) => [...(prev || []), newChatroom]);
							break;
						}
						case "new_user": {
							const newUser: IUser = mapApiUser(msg.data);
							setUsers((prev) => [...(prev || []), newUser]);
							break;
						}
						case "delete_message": {
							const messageId = msg.data?.id;
							if (messageId) setMessages((prev) => (prev || []).filter((message) => message.id !== messageId));
							break;
						}
						case "delete_chatroom": {
							const chatroomId = msg.data?.id;
							if (chatroomId) {
								// remove the chatroom
								setChatrooms((prev) => (prev || []).filter((room) => room.id !== chatroomId));
								// remove any messages from that room too
								setMessages((prev) => (prev || []).filter((msg) => msg.chatroom !== chatroomId));
							}
						}
					}
				}
			};
		}
	}, [jwt]);

	// Effects
	// Fetch data
	useEffect(() => {
		const fetchData = async (jwt: string) => {
			setAppLoading(true);

			setUsersError(undefined);
			setChatroomsError(undefined);
			setMessagesError(undefined);

			// users
			const userResult = await GetUsers(jwt);

			if (userResult?.isSuccess && userResult.users) {
				setUsers(userResult.users);
			} else {
				setUsersError(userResult.error);
			}

			// rooms
			const roomResult = await GetChatrooms(jwt);

			if (roomResult.isSuccess && roomResult.chatrooms) {
				setChatrooms(roomResult.chatrooms);
			} else {
				setChatroomsError(roomResult.error);
			}

			// messages
			const messageResult = await GetMessages(jwt);

			if (messageResult.isSuccess && messageResult.messages) {
				setMessages(messageResult.messages);
			} else {
				setMessagesError(messageResult.error);
			}

			setAppLoading(false);
		};

		if (jwt) {
			fetchData(jwt).then(() => {
				setupWebsocket();
			});
		}

		return () => {
			if (webSocket.current) webSocket.current.close();
		};
	}, [jwt, webSocket, setupWebsocket]);

	// effect to clear out any unneeded unread messages counts every time a change occurs
	useEffect(() => {
		let changed = false;

		const tempRooms = chatrooms?.map((room) => {
			// if any unread messages on selected room, clear them
			if (selectedChatroom && room.unreadMessages > 0 && room.id === selectedChatroom.id) {
				changed = true;
				return { ...room, unreadMessages: 0 };
			}

			return room;
		});

		if (changed) setChatrooms(tempRooms);
	}, [chatrooms, selectedChatroom, user]);

	// Memoized data getters
	const getMessagesForRoom = useCallback(
		(roomId?: string): IChatmessage[] | null => {
			if (!messages || !roomId) return null;
			return messages.filter((message) => message.chatroom === roomId).reverse();
		},
		[messages]
	);

	return (
		<AppContext.Provider
			value={{
				appLoading,
				chatrooms,
				chatroomsError,
				messages,
				messagesError,
				users,
				usersError,
				selectedChatroom,
				setSelectedChatroom,
				newChatOpen,
				setNewChatOpen,
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
