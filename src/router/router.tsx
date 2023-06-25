import { createBrowserRouter } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import App from 'components/App';
import Settings from 'pages/Settings';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <Home /> },
			{
				path: 'settings',
				element: <Settings />,
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
]);

export default router;
