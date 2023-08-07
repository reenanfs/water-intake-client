import { createBrowserRouter } from 'react-router-dom';

import Home from 'pages/Home';
import Login from 'pages/auth/Login';
import App from 'components/App';
import Settings from 'pages/Settings';
import Register from 'pages/auth/Register';
import PrivateRoute from 'components/auth/PrivateRoute';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				element: <PrivateRoute />,
				children: [
					{ index: true, element: <Home /> },
					{
						path: 'settings',
						element: <Settings />,
					},
				],
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
]);

export default router;
