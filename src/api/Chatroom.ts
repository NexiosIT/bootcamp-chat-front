import axios from "axios";
import { CreateChatroomRequest, CreateChatroomResult, GetChatroomsResult, IApiChatroom } from "../types";
import { DEFAULT_ERROR_MESSAGE } from "../vars/messages";
import { mapApiChatroom } from "./mappers";
import { DEFAULT_ERROR_RESULT } from "./shared";
import { getApiBaseUrl, getDefaultHeaders } from "./utils";

export const GetChatrooms = async (jwt: string): Promise<GetChatroomsResult> => {
	const url = getApiBaseUrl() + "/rooms";

	try {
		const response = await axios.get(url, { headers: getDefaultHeaders(jwt) });

		if (response.data && Array.isArray(response.data)) {
			return {
				isSuccess: true,
				chatrooms: response.data.map((room: IApiChatroom) => mapApiChatroom(room)),
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

export const CreateChatroom = async (jwt: string, chatroom: CreateChatroomRequest): Promise<CreateChatroomResult> => {
	const url = getApiBaseUrl() + "/rooms";

	try {
		const response = await axios.post(url, chatroom, { headers: getDefaultHeaders(jwt) });
		if (response.data && response.data.allowed_users && response.data.name && response.data._id) {
			return {
				isSuccess: true,
				chatroom: mapApiChatroom(response.data),
			};
		} else {
			return DEFAULT_ERROR_RESULT;
		}
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
