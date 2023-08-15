import { clientRoutePaths } from 'constants/routesConstants';
import { useAuth } from 'hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = (): JSX.Element => {
	const { isAuthenticated } = useAuth();

	return isAuthenticated() ? (
		<Outlet />
	) : (
		<Navigate to={clientRoutePaths.LOGIN} replace />
	);
};

export default PrivateRoute;
