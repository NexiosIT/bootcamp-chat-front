import axios from "axios";
import { getApiBaseUrl } from "./urls";

export const GetMessages = async () => {
	const url = getApiBaseUrl() + "/messages";

	try {
		const response = await axios.get(url);
		console.log("get messages response", response);
	} catch (e) {
		console.log("get messages error", e);
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
