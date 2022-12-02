import { IApiChatmessage, IApiChatroom, IApiUser, IChatmessage, IChatroom, IUser } from "../types";

const getInitialsForUsername = (username: string): string => {
	if (username === "") return "";
  
	const split = username.split(" ");

	if (split.length === 1) return split[0].charAt(0);
	if (split.length === 2 || split.length === 3) {
		return split.map((word) => word.charAt(0)).join("");
	}

	return username.charAt(0);
};

export const mapApiUser = (user: IApiUser): IUser => {
	return {
		id: user._id,
		initials: getInitialsForUsername(user.username),
		email: user.email,
		username: user.username,
	};
};

export const mapApiChatroom = (room: IApiChatroom): IChatroom => {
	return {
		id: room._id,
		allowedUsers: room.allowed_users,
		name: room.name,
		unreadMessages: 0,
	};
};

export const mapApiMessage = (message: IApiChatmessage): IChatmessage => {
	return {
		id: message._id,
		publishedAt: new Date(message.published_at),
		chatroom: message.chatroom,
		data: message.data,
		user: message.user,
	};
};
