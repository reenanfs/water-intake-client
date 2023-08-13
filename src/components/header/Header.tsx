import Button from 'components/buttons/Button';
import ThemeToggleButton from 'components/buttons/toggle-buttons/ThemeToggleButton';
import { useAuth } from 'hooks/useAuth';
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

const ButtonsContainer = styled.div`
	display: flex;
	align-items: center;
`;

const SpaceBetweenButtons = styled.div`
	margin-left: 15px; /* Adjust the margin as needed */
`;

const Header = () => {
	const { handleLogout } = useAuth();
	return (
		<HeaderContainer>
			<HeaderTitle>Water Intake App</HeaderTitle>
			<ButtonsContainer>
				<ThemeToggleButton />
				<SpaceBetweenButtons />
				<Button onClick={handleLogout}>Logout</Button>
			</ButtonsContainer>
		</HeaderContainer>
	);
};

export default Header;
