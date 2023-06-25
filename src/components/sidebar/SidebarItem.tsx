import Icon from 'components/icons/Icon';
import { darken } from 'polished';
import { Link, LinkProps } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface ISidebarItemProps extends LinkProps {
	iconName: string;
	text: string;
	isSelected: boolean;
}

interface ISidebarLinkProps {
	isSelected: boolean;
}

const SidebarLink = styled(Link)<ISidebarLinkProps>`
	display: flex;
	align-items: center;
	color: ${props => props.theme.colors.light};
	text-decoration: none;
	padding: 10px;
	font-weight: bold;
	${props =>
		props.isSelected &&
		css`
			border-right: 6px solid ${props.theme.colors.light};
		`}
	i {
		margin-right: 10px;
	}

	&:hover {
		background-color: ${props => darken(0.1, props.theme.colors.tertiary)};
	}
`;

const SidebarItem = ({
	iconName,
	text,
	isSelected,
	...rest
}: ISidebarItemProps): JSX.Element => {
	return (
		<SidebarLink {...rest} isSelected={isSelected}>
			<Icon name={iconName} />
			{text}
		</SidebarLink>
	);
};

export default SidebarItem;
