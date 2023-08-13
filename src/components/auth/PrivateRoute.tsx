import { clientRoutePaths } from 'constants/routesConstants';
import { useAuth } from 'hooks/useAuth';
import LoadingPage from 'pages/Loading';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
	const { isAuthenticated } = useAuth();
	const [authenticated, setAuthenticated] = useState<boolean>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const checkAuthentication = async () => {
			const response = await isAuthenticated();
			setAuthenticated(response);
			setLoading(false);
		};

		checkAuthentication();
	}, [isAuthenticated]);

	if (loading) {
		return <LoadingPage />;
	}

	return authenticated ? (
		<Outlet />
	) : (
		<Navigate to={clientRoutePaths.LOGIN} replace />
	);
};

export default PrivateRoute;
