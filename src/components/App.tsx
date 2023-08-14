import { Outlet, useLoaderData } from 'react-router-dom';

import Layout from 'components/layout/layout';
import { GlobalStyle } from 'theme/globalStyles';

import { useAuth } from 'hooks/useAuth';

import LoadingPage from 'pages/status/Loading';
import { useEffect, useState } from 'react';
import { IFetchCurrentUserResponse } from 'loaders/fetchCurrentUser';

const App = () => {
	const { accessToken, refreshToken, user } =
		useLoaderData() as IFetchCurrentUserResponse;
	const [loading, setLoading] = useState(true);
	const { setAuth } = useAuth();

	useEffect(() => {
		setAuth(accessToken, refreshToken, user);
		setLoading(false);
	}, [setAuth, setLoading, accessToken, refreshToken, user]);

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<>
			<GlobalStyle />

			<Layout>
				<Outlet />
			</Layout>
		</>
	);
};

export default App;
