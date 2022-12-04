import axios from "axios";
import { ApiResultBase } from "../types";
import { DEFAULT_ERROR_MESSAGE } from "../vars/messages";
import { DEFAULT_ERROR_RESULT } from "./shared";

export const getApiBaseUrl = (): string => {
	if (process.env.NODE_ENV === "development") return "http://localhost:5000";

	return "";
};

export const getDefaultHeaders = (jwt: string) => {
	return {
		"Accept": "application/json",
		"Content-Type": "application/json",
		"Authorization": "Bearer " + jwt,
	};
};

export const getErrorResponse = (e: any): ApiResultBase  => {
  if (axios.isAxiosError(e)) {
    return {
      isSuccess: false,
      error: e.response?.data?.message || DEFAULT_ERROR_MESSAGE,
    };
  } else {
    return DEFAULT_ERROR_RESULT;
  }
}
