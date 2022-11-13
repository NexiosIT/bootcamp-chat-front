import { RegisterResult } from "../types/Api";

export const RegisterUser = async (username: string, email: string, password: string): Promise<RegisterResult> => {
	// fake wait for register to complete
	// TODO: call register function here
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ isSuccess: true });
		}, 1000);
	});
};
