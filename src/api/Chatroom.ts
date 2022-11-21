import axios from "axios";
import { GetChatroomsResult, IApiChatRoom } from "../types";
import { DEFAULT_ERROR_MESSAGE } from "../vars/messages";
import { DEFAULT_ERROR_RESULT } from "./shared";
import { getApiBaseUrl, getDefaultHeaders } from "./utils";

export const GetChatrooms = async (jwt: string): Promise<GetChatroomsResult> => {
	const url = getApiBaseUrl() + "/rooms";

	try {
		const response = await axios.get(url, { headers: getDefaultHeaders(jwt) });

		if (response.data && Array.isArray(response.data)) {
			return {
				isSuccess: true,
				chatrooms: response.data.map((item: IApiChatRoom) => {
					return {
						// TODO: real id
						id: "0",
						allowedUsers: item?.allowed_users || [],
						name: item?.name,
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

export const GetChatroom = async (id: string) => {
	const url = getApiBaseUrl() + `/rooms/${id}`;

	try {
		const response = axios.get(url);
		console.log("get room response", response);
	} catch (e) {
		console.log("get room error", e);
	}
};

export const CreateChatroom = async () => {
	const url = getApiBaseUrl() + "/rooms";

	try {
		const response = axios.post(url);
		console.log("create room response", response);
	} catch (e) {
		console.log("create room error", e);
	}
};
