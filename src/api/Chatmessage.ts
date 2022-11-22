import axios from "axios";
import { GetMessagesResult, IApiChatmessage } from "../types";
import { DEFAULT_ERROR_MESSAGE } from "../vars/messages";
import { DEFAULT_ERROR_RESULT } from "./shared";
import { getApiBaseUrl, getDefaultHeaders } from "./utils";

export const GetMessages = async (jwt: string): Promise<GetMessagesResult> => {
	const url = getApiBaseUrl() + "/messages";

	try {
		const response = await axios.get(url, { headers: getDefaultHeaders(jwt) });

		if (response.data && Array.isArray(response.data)) {
			return {
				isSuccess: true,
				messages: response.data.map((message: IApiChatmessage) => {
					return {
						id: message._id,
						chatroom: {
							id: message.chatroom._id,
							allowedUsers: message.chatroom.allowed_users,
							name: message.chatroom.name,
						},
						data: message.data,
						publishedAt: new Date(message.published_at),
						user: message.user,
					};
				}),
			};
		}

		return DEFAULT_ERROR_RESULT;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			return {
				isSuccess: false,
				error: e.response?.data?.message || DEFAULT_ERROR_MESSAGE,
			};
		} else {
			return DEFAULT_ERROR_RESULT;
		}
	}
};

export const GetMessage = async (id: string) => {
	const url = getApiBaseUrl() + `/messages/${id}`;

	try {
		const response = await axios.get(url);
		console.log("get message response", response);
	} catch (e) {
		console.log("get message error", e);
	}
};

export const CreateMessage = async () => {
	const url = getApiBaseUrl() + "/messages";

	try {
		const response = await axios.post(url);
		console.log("create message response", response);
	} catch (e) {
		console.log("create message error", e);
	}
};

export const DeleteMessage = async (id: string) => {
	const url = getApiBaseUrl() + `/messages/${id}`;

	try {
		const response = await axios.delete(url);
		console.log("delete message response", response);
	} catch (e) {
		console.log("delete message error", e);
	}
};
