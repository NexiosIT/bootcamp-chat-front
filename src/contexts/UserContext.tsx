import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { GetUser, LoginUser } from "../api/User";
import { LoginResult } from "../types/Api";
import { IUser } from "../types/User";

interface IProviderProps {
	children: ReactNode;
}

export interface IUserContext {
	loading: boolean;
	error?: string;
	user?: IUser;
	jwt?: string;
	signIn: (email: string, password: string) => Promise<LoginResult>;
	signOut: () => void;
}

const UserContext = createContext<IUserContext | null>(null);

export const UserContextProvider = ({ children }: IProviderProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error] = useState<string>(); //TODO: setError to handle login error state
	const [user, setUser] = useState<IUser | undefined>();
	const [jwt, setJwt] = useState<string>();

	const signIn = async (email: string, password: string): Promise<LoginResult> => {
		setLoading(true);

		const result = await LoginUser(email, password);
		if (result.accessToken) {
			const userResult = await GetUser(result.accessToken);

			if (userResult.user) {
				setJwt(result.accessToken);
				setUser(userResult.user);
			}
		}

		setLoading(false);

		return result;
	};

	const signOut = () => {
		setUser(undefined);
		setJwt(undefined);
	};

	return <UserContext.Provider value={{ loading, signIn, signOut, error, user, jwt }}>{children}</UserContext.Provider>;
};

// Create a hook to access the user context
export const useUserContext = (): IUserContext => {
	const context = useContext<IUserContext | null>(UserContext);

	if (!context) {
		throw new Error("User context must be used within a Provider.");
	}
	return context;
};
