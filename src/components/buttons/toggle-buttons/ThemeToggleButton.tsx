import { useTheme } from 'hooks/useTheme';
import styled from 'styled-components';

const Button = styled.button`
	background-color: ${props => props.theme.colors.secondary};
	border: none;
	cursor: pointer;
	width: 64px;
	height: 32px;
	border-radius: 16px;
	position: relative;
	overflow: hidden;
	transition: background-color 0.3s ease;
`;

const ToggleBall = styled.span`
	content: '';
	position: absolute;
	top: 2px;
	left: ${props => (props.theme.dark.isOn ? '34px' : '2px')};
	width: 28px;
	height: 28px;
	border-radius: 50%;
	background-color: #fff;
	transition: left 0.3s ease;
`;

const Icon = styled.span`
	position: absolute;
	top: 3px;
	font-size: 25px;
	pointer-events: none;
	color: ${props => props.theme.colors.primary};
	font-family: 'Material Icons';
`;

const MoonIcon = styled(Icon)`
	left: 7px;
	opacity: ${props => (props.theme.dark.isOn ? '1' : '0')};
`;

const SunIcon = styled(Icon)`
	right: 7px;
	opacity: ${props => (props.theme.dark.isOn ? '0' : '1')};
`;

const ThemeToggleButton = () => {
	const { toggleTheme } = useTheme();

	return (
		<Button onClick={toggleTheme}>
			<ToggleBall />
			<MoonIcon>dark_mode</MoonIcon>
			<SunIcon>light_mode</SunIcon>
		</Button>
	);
};

export default ThemeToggleButton;
