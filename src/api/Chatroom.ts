import axios from "axios";
import { CreateChatroomRequest, CreateChatroomResult, GetChatroomsResult, IApiChatroom } from "../types";
import { mapApiChatroom } from "./mappers";
import { DEFAULT_ERROR_RESULT } from "./shared";
import { getApiBaseUrl, getDefaultHeaders, getErrorResponse } from "./utils";

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
    return getErrorResponse(e);
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
    return getErrorResponse(e);
	}
};
