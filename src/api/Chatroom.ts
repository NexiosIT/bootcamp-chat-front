import axios from "axios";
import { getApiBaseUrl } from "./utils";

export const GetChatrooms = async () => {
	const url = getApiBaseUrl() + "/rooms";

	try {
		const response = axios.get(url);
		console.log("get rooms response", response);
	} catch (e) {
		console.log("get rooms error", e);
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
  } catch(e) {
    console.log("create room error", e)
  }
}