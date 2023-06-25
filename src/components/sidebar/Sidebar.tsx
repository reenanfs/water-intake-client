import styled from 'styled-components';
import SidebarItem from './SidebarItem';
import { SidebarOptions } from 'types/sidebarOptions';
import { useLocation } from 'react-router-dom';

const SidebarContainer = styled.div`
	width: 250px;
	height: 100vh;
	background-color: ${props => props.theme.colors.tertiary};
`;

const SidebarTitle = styled.h2`
	color: ${props => props.theme.colors.light};
	font-size: 20px;
	margin: 0;
	padding: 25px;
`;

const Sidebar = () => {
	const { pathname } = useLocation();

	return (
		<SidebarContainer>
			<SidebarTitle>Navigation</SidebarTitle>

			<SidebarItem
				href='/'
				iconName='home'
				text='Home'
				isSelected={pathname === SidebarOptions.HOME}
			/>
			<SidebarItem
				href='/settings'
				iconName='settings'
				text='Settings'
				isSelected={pathname === SidebarOptions.SETTINGS}
			/>
		</SidebarContainer>
	);
};

export default Sidebar;
