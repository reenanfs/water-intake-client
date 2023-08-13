import axios from 'axios';
import { serverRoutePaths } from 'constants/routesConstants';
import { IUser } from 'types/authTypes';

interface ILoginPayload {
	email: string;
	password: string;
}

interface IRegisterPayload {
	username: string;
	email: string;
	password: string;
}

interface IAuthResponse {
	ok: boolean;
	msg: string;
	data: {
		access_token: string;
		refresh_token: string;
		user: IUser;
	};
}

export const api = axios.create({
	baseURL: 'http://localhost:4000',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

export const apiRoutes = {
	login: async (data: ILoginPayload): Promise<IAuthResponse> => {
		const response = await api.post(serverRoutePaths.LOGIN, data);
		return response.data;
	},
	register: async (data: IRegisterPayload): Promise<IAuthResponse> => {
		const response = await api.post(serverRoutePaths.REGISTER, data);
		return response.data;
	},
	profile: async (): Promise<IAuthResponse> => {
		const response = await api.get(serverRoutePaths.PROFILE);
		return response.data;
	},
	logout: async (): Promise<void> => {
		const response = await api.post(serverRoutePaths.LOGOUT);
		return response.data;
	},
};
