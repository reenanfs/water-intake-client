import Content from 'components/containers/Content';
import Header from 'components/header/Header';
import Sidebar from 'components/sidebar/Sidebar';

import { ReactNode } from 'react';
import styled from 'styled-components';

interface ILayoutProps {
	children: ReactNode;
}

const LayoutContainer = styled.div`
	display: flex;
`;

const MainContainer = styled.div`
	flex: 1;
`;

const Layout = ({ children }: ILayoutProps): JSX.Element => {
	return (
		<LayoutContainer>
			<Sidebar />
			<MainContainer>
				<Header />
				<Content>{children}</Content>
			</MainContainer>
		</LayoutContainer>
	);
};

export default Layout;
