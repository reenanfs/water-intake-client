import ThemeToggleButton from 'components/buttons/toggle-buttons/ThemeToggleButton';
import styled from 'styled-components';

const HeaderContainer = styled.header`
	background-color: ${props => props.theme.colors.primary};
	padding: 20px;
	box-shadow: 0 4px 2px -2px #33333333;
	align-items: center;
	justify-content: space-between;
	display: flex;
`;

const HeaderTitle = styled.h1`
	color: ${props => props.theme.colors.secondary};
	font-size: 28px;
	margin: 0;
`;

const Header = () => {
	return (
		<HeaderContainer>
			<HeaderTitle>Water Intake App</HeaderTitle>
			<ThemeToggleButton />
		</HeaderContainer>
	);
};

export default Header;
