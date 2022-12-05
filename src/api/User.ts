import axios from "axios";
import { ApiResultBase, GetUserResult, GetUsersResult, IApiUser, LoginResult, RegisterResult } from "../types";
import { mapApiUser } from "./mappers";
import { DEFAULT_ERROR_RESULT } from "./shared";
import { getApiBaseUrl, getDefaultHeaders, getErrorResponse } from "./utils";

export const RegisterUser = async (username: string, email: string, password: string): Promise<RegisterResult> => {
	const url = getApiBaseUrl() + "/users";

	try {
		const response = await axios.post(url, { username, email, password });
		if (response.status === 201) {
			return {
				isSuccess: true,
			};
		}

		return DEFAULT_ERROR_RESULT;
	} catch (e) {
		return getErrorResponse(e);
	}
};

export const LoginUser = async (email: string, password: string): Promise<LoginResult> => {
	const url = getApiBaseUrl() + "/auth/login";

	try {
		const response = await axios.post(url, { email, password });

		if (response.data && response.data.access_token) {
			return {
				isSuccess: true,
				accessToken: response.data.access_token,
			};
		}

		return DEFAULT_ERROR_RESULT;
	} catch (e) {
		return getErrorResponse(e);
	}
};

export const LogoutUser = async (jwt: string): Promise<ApiResultBase> => {
	const url = getApiBaseUrl() + "/auth/logout";

	try {
		const response = await axios.post(url, { headers: getDefaultHeaders(jwt) });
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

// Get a user details for a given token
export const GetUser = async (jwt: string): Promise<GetUserResult> => {
	const url = getApiBaseUrl() + "/users/profile";

	try {
		const response = await axios.get(url, { headers: getDefaultHeaders(jwt) });

		if (response.data) {
			return {
				isSuccess: true,
				user: mapApiUser(response.data),
			};
		}

		return DEFAULT_ERROR_RESULT;
	} catch (e) {
		return getErrorResponse(e);
	}
};

export const GetUsers = async (jwt: string): Promise<GetUsersResult> => {
	const url = getApiBaseUrl() + "/users";

	try {
		const response = await axios.get(url, { headers: getDefaultHeaders(jwt) });

		if (response.data && Array.isArray(response.data)) {
			return {
				isSuccess: true,
				users: response.data.map((user: IApiUser) => mapApiUser(user)),
			};
		}

		return DEFAULT_ERROR_RESULT;
	} catch (e) {
		return getErrorResponse(e);
	}
};
