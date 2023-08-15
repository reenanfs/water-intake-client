import { createBrowserRouter } from 'react-router-dom';

import Home from 'pages/Home';
import Login from 'pages/auth/Login';
import App from 'components/App';
import Settings from 'pages/Settings';
import Register from 'pages/auth/Register';
import PrivateRoute from 'components/outlets/PrivateRoute';
import { clientRoutePaths } from 'constants/routesConstants';
import { fetchCurrentUserLoader } from 'loaders/fetchCurrentUser';
import ErrorPage from 'pages/status/Error';

const router = createBrowserRouter([
	{
		path: clientRoutePaths.HOME,
		element: <App />,
		loader: fetchCurrentUserLoader,
		errorElement: <ErrorPage />,
		children: [
			{
				element: <PrivateRoute />,
				children: [
					{ index: true, element: <Home /> },
					{
						path: clientRoutePaths.SETTINGS,
						element: <Settings />,
					},
				],
			},
		],
	},
	{
		path: clientRoutePaths.LOGIN,
		element: <Login />,
	},
	{
		path: clientRoutePaths.REGISTER,
		element: <Register />,
	},
]);

export default router;
