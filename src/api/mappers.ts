import { IApiChatmessage, IApiChatroom, IApiUser, IChatmessage, IChatroom, IUser } from "../types";

export const mapApiUser = (user: IApiUser): IUser => {
	return {
		id: user._id,
		initials: user.username.charAt(0),
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
