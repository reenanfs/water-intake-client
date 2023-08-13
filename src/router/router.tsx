import { createBrowserRouter } from 'react-router-dom';

import Home from 'pages/Home';
import Login from 'pages/auth/Login';
import App from 'components/App';
import Settings from 'pages/Settings';
import Register from 'pages/auth/Register';
import PrivateRoute from 'components/auth/PrivateRoute';
import { clientRoutePaths } from 'constants/routesConstants';

const router = createBrowserRouter([
	{
		path: clientRoutePaths.HOME,
		element: <PrivateRoute />,
		children: [
			{
				element: <App />,
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
