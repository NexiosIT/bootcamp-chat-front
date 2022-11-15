import axios from "axios";
import { RegisterResult } from "../types";
import { ERROR_DEFAULT } from "../vars/messages";
import { getApiBaseUrl } from "./urls";

export const RegisterUser = async (username: string, email: string, password: string): Promise<RegisterResult> => {
	const url = getApiBaseUrl() + "/users";

	try {
		const response = await axios.post(url, { username, email, password });
		console.log("register response", response);
		return {
			isSuccess: true,
		};
	} catch (e) {
		// console.log("register error", e);
		if (axios.isAxiosError(e)) {
			return {
				isSuccess: false,
				error: e.response?.data?.message || ERROR_DEFAULT,
			};
		} else {
			return {
				isSuccess: false,
				error: ERROR_DEFAULT,
			};
		}
	}
};

export const LoginUser = async (email: string, password: string) => {
	const url = getApiBaseUrl() + "/auth/login";

	try {
		const response = await axios.post(url, { email, password });
		console.log("login response", response);
	} catch (e) {
		console.log("login error", e);
	}
};

export const LogoutUser = async (email: string, password: string) => {
	const url = getApiBaseUrl() + "/auth/logout";

	try {
		const response = await axios.post(url, { email, password });
		console.log("logout response", response);
	} catch (e) {
		console.log("logout error", e);
	}
};

// Get a user details for a given token
export const GetUser = async () => {
	const url = getApiBaseUrl() + "/users/profile";

	try {
		const response = await axios.get(url);
		console.log("get user response", response);
	} catch (e) {
		console.log("get user error", e);
	}
};
