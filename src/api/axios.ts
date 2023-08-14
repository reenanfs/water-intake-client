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

export interface IAuthResponse {
	ok: boolean;
	msg: string;
	data: {
		access_token: string;
		refresh_token: string;
		user: IUser;
	};
}

const api = axios.create({
	baseURL: 'http://localhost:4000',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config;

		if (
			error.response.status === 401 &&
			originalRequest.url !== serverRoutePaths.REFRESH
		) {
			try {
				await apiRoutes.refresh();

				return api(originalRequest);
			} catch (refreshError) {
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

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
	refresh: async (): Promise<void> => {
		const response = await api.post(serverRoutePaths.REFRESH);
		return response.data;
	},
};
