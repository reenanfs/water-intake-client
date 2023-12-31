import {
	useState,
	ReactNode,
	createContext,
	Dispatch,
	SetStateAction,
} from 'react';
import { NavigateFunction } from 'react-router-dom';
import { clientRoutePaths } from 'constants/routesConstants';

import { IUser } from 'types/authTypes';

import { apiRoutes } from 'api/axios';

interface IAuthProviderProps {
	children: ReactNode;
}

export interface AuthContextProps {
	currentUser: IUser | null;
	setCurrentUser: Dispatch<SetStateAction<IUser | null>>;
	accessToken: string | null;
	refreshToken: string | null;
	handleLogin: (
		newAccessToken: string,
		newRefreshToken: string,
		user: IUser,
		navigate: NavigateFunction
	) => void;
	handleLogout: (navigate: NavigateFunction) => void;
	isAuthenticated: () => boolean;
	setAuth: (accessToken: string, refreshToken: string, user: IUser) => void;
}

export const AuthContext = createContext<AuthContextProps>({
	currentUser: null,
	setCurrentUser: () => {},
	accessToken: null,
	refreshToken: null,
	handleLogin: () => {},
	handleLogout: () => {},
	isAuthenticated: () => false,
	setAuth: () => {},
});

export const AuthProvider = ({ children }: IAuthProviderProps): JSX.Element => {
	const [currentUser, setCurrentUser] = useState<IUser | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [refreshToken, setRefreshToken] = useState<string | null>(null);

	const setAuth = (
		accessToken: string,
		refreshToken: string,
		user: IUser
	): void => {
		setAccessToken(accessToken);
		setRefreshToken(refreshToken);

		setCurrentUser(user);
	};

	const handleLogin = (
		newAccessToken: string,
		newRefreshToken: string,
		user: IUser,
		navigate: NavigateFunction
	) => {
		setAuth(newAccessToken, newRefreshToken, user);

		navigate(clientRoutePaths.HOME);
	};

	const handleLogout = async (navigate: NavigateFunction) => {
		await apiRoutes.logout();

		setAccessToken(null);
		setRefreshToken(null);

		navigate(clientRoutePaths.LOGIN);
	};

	const isAuthenticated = (): boolean => {
		return !!accessToken;
	};

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				setCurrentUser,
				accessToken,
				refreshToken,
				isAuthenticated,
				handleLogin,
				handleLogout,
				setAuth,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
