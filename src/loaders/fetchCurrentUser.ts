import { apiRoutes } from 'api/axios';
import { IUser } from 'types/authTypes';

export interface IFetchCurrentUserResponse {
	accessToken: string;
	refreshToken: string;
	user: IUser;
}

export const fetchCurrentUserLoader = async () => {
	const {
		data: { access_token: accessToken, refresh_token: refreshToken, user },
	} = await apiRoutes.profile();

	return { accessToken, refreshToken, user };
};
