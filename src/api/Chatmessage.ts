import axios from "axios";
import {
	CreateMessageRequest,
	CreateMessageResult,
	DeleteMessageResult,
	GetMessagesResult,
	IApiChatmessage,
} from "../types";
import { DEFAULT_ERROR_MESSAGE } from "../vars/messages";
import { mapApiMessage } from "./mappers";
import { DEFAULT_ERROR_RESULT } from "./shared";
import { getApiBaseUrl, getDefaultHeaders } from "./utils";

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
