import Icon from 'components/icons/Icon';
import styled from 'styled-components';

interface SidebarTitleProps {
	iconName: string;
	text: string;
	onClick: () => void;
}

const Title = styled.h2`
	color: ${props => props.theme.colors.light};
	font-size: 20px;
	margin: 0;
	padding: 25px;
	padding-left: 10px;
	padding-bottom: 20px;
	align-items: center;
	display: flex;
	margin-right: 0px;
	cursor: pointer;

	i {
		margin-right: 10px;
	}
`;

const SidebarTitle = ({
	iconName,
	text,
	onClick,
}: SidebarTitleProps): JSX.Element => {
	return (
		<Title onClick={onClick}>
			<Icon name={iconName} />
			{text}
		</Title>
	);
};

export default SidebarTitle;
