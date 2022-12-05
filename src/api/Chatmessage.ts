import axios from "axios";
import {
	CreateMessageRequest,
	CreateMessageResult,
	DeleteMessageResult,
	GetMessagesResult,
	IApiChatmessage,
} from "../types";
import { mapApiMessage } from "./mappers";
import { DEFAULT_ERROR_RESULT } from "./shared";
import { getApiBaseUrl, getDefaultHeaders, getErrorResponse } from "./utils";

export const GetMessages = async (jwt: string): Promise<GetMessagesResult> => {
	const url = getApiBaseUrl() + "/messages";

	try {
		const response = await axios.get(url, { headers: getDefaultHeaders(jwt) });

		if (response.data && Array.isArray(response.data)) {
			return {
				isSuccess: true,
				messages: response.data.map((message: IApiChatmessage) => mapApiMessage(message)),
			};
		}

		return DEFAULT_ERROR_RESULT;
	} catch (e) {
    return getErrorResponse(e);
	}
};

export const CreateMessage = async (jwt: string, message: CreateMessageRequest): Promise<CreateMessageResult> => {
	const url = getApiBaseUrl() + "/messages";

	try {
		const response = await axios.post(url, message, { headers: getDefaultHeaders(jwt) });

		if (response.data) {
			return {
				isSuccess: true,
				message: mapApiMessage(response.data),
			};
		}

		return DEFAULT_ERROR_RESULT;
	} catch (e) {
    return getErrorResponse(e);
	}
};

export const DeleteMessage = async (jwt: string, id: string): Promise<DeleteMessageResult> => {
	const url = getApiBaseUrl() + `/messages/${id}`;

	try {
		const response = await axios.delete(url, { headers: getDefaultHeaders(jwt) });
		if (response.status === 200) {
			return {
				isSuccess: true,
			};
		}

		return DEFAULT_ERROR_RESULT;
	} catch (e) {
    return getErrorResponse(e);
	}
};
