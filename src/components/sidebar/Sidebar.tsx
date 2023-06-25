import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import SidebarItem from './SidebarItem';
import { SidebarOptions } from 'types/sidebarOptions';
import SidebarTitle from './SidebarTitle';
import { useState } from 'react';

interface ISidebarContainer {
	expanded: boolean;
}

const SidebarContainer = styled.div<ISidebarContainer>`
	width: ${({ expanded }) => (expanded ? '250px' : '50px')};
	height: 100vh;
	background-color: ${props => props.theme.colors.tertiary};
	transition: width 0.3s ease, box-shadow 0.3s ease;
`;

const Separator = styled.hr`
	margin-top: 0;
`;

const Sidebar = () => {
	const { pathname } = useLocation();
	const [expanded, setExpanded] = useState(false);

	const toggleExpanded = () => {
		setExpanded(prevValue => !prevValue);
	};

	return (
		<SidebarContainer expanded={expanded}>
			<SidebarTitle
				iconName={
					expanded
						? 'keyboard_double_arrow_left'
						: 'keyboard_double_arrow_right'
				}
				text={expanded ? 'Navigation' : ''}
				onClick={toggleExpanded}
			/>
			<Separator />
			<SidebarItem
				href='/'
				iconName='home'
				text={expanded ? 'Home' : ''}
				isSelected={pathname === SidebarOptions.HOME}
			/>
			<SidebarItem
				href='/settings'
				iconName='settings'
				text={expanded ? 'Settings' : ''}
				isSelected={pathname === SidebarOptions.SETTINGS}
			/>
		</SidebarContainer>
	);
};

export default Sidebar;
