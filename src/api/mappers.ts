import { IApiChatmessage, IApiChatroom, IApiUser, IChatmessage, IChatroom, IUser } from "../types";

export const mapApiUser = (user: IApiUser): IUser => {
	return {
    id: user._id,
    initials: user.username.charAt(0),
		...user,
	};
};

export const mapApiChatroom = (room: IApiChatroom): IChatroom => {
	return {
		id: room._id,
		allowedUsers: room.allowed_users,
		...room,
	};
};

export const mapApiMessage = (message: IApiChatmessage): IChatmessage => {
	return {
		id: message._id,
		publishedAt: new Date(message.published_at),
		...message,
	};
};
