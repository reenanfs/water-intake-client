import { AuthContext } from 'contexts/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from 'types/authTypes';

export const useAuth = () => {
	const authStore = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogin = (
		newAccessToken: string,
		newRefreshToken: string,
		user: IUser
	) => {
		authStore.handleLogin(newAccessToken, newRefreshToken, user, navigate);
	};

	const handleLogout = () => {
		authStore.handleLogout(navigate);
	};

	return {
		...authStore,
		handleLogin,
		handleLogout,
	};
};
