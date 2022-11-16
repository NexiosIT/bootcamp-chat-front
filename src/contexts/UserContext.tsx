import React, { createContext, ReactNode, useContext, useState } from "react";
import { LoginUser } from "../api/User";
import { LoginResult } from "../types/Api";
import { IUser } from "../types/User";

interface IProviderProps {
	children: ReactNode;
}

export interface IUserContext {
	loading: boolean;
	error?: string;
	user?: IUser;
	logIn: (email: string, password: string) => Promise<LoginResult>;
	logOut: () => void;
}

const UserContext = createContext<IUserContext | null>(null);

export const UserContextProvider = ({ children }: IProviderProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error] = useState<string>(); //TODO: setError to handle login error state
	const [user, setUser] = useState<IUser | undefined>();

	const logIn = async (email: string, password: string): Promise<LoginResult> => {
		setLoading(true);

		const result = await LoginUser(email, password);

		setLoading(false);
    
		return result;
	};

	const logOut = () => {
		setUser(undefined);
	};

	return <UserContext.Provider value={{ loading, logIn, logOut, error, user }}>{children}</UserContext.Provider>;
};

// Create a hook to access the user context
export const useUserContext = (): IUserContext => {
	const context = useContext<IUserContext | null>(UserContext);

	if (!context) {
		throw new Error("User context must be used within a Provider.");
	}
	return context;
};
