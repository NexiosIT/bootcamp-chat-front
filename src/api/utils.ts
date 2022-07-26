export const getApiBaseUrl = (): string => {
	if (process.env.NODE_ENV === "development") return "http://localhost:3001";

	return "";
};

export const getDefaultHeaders = (jwt: string) => {
	return {
		"Accept": "application/json",
		"Content-Type": "application/json",
		"Authorization": "Bearer " + jwt,
	};
};
