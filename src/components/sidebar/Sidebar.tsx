import styled from 'styled-components';
import SidebarItem from './SidebarItem';
import { sidebarOptions } from 'types/sidebarOptions';
import { useState } from 'react';

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
	const [option, setOption] = useState<sidebarOptions>(sidebarOptions.HOME);

	return (
		<SidebarContainer>
			<SidebarTitle>Navigation</SidebarTitle>

			<SidebarItem
				to='/'
				iconName='home'
				text='Home'
				isSelected={option === sidebarOptions.HOME}
				onClick={() => setOption(sidebarOptions.HOME)}
			/>
			<SidebarItem
				to='/settings'
				iconName='settings'
				text='Settings'
				isSelected={option === sidebarOptions.SETTINGS}
				onClick={() => setOption(sidebarOptions.SETTINGS)}
			/>
		</SidebarContainer>
	);
};

export default Sidebar;
