import { Outlet } from 'react-router-dom';

import Layout from 'components/layout/layout';
import { GlobalStyle } from 'theme/globalStyles';

const App = () => {
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
