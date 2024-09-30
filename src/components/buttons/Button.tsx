import styled from 'styled-components';

const Button = styled.button<{ disabled?: boolean }>`
	background-color: ${props =>
		props.disabled ? 'gray' : props.theme.colors.secondary};
	color: ${props => props.theme.colors.primary};
	padding: 10px;
	border: none;
	border-radius: 4px;
	font-size: 1rem;
	cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
	min-width: 100px;
	opacity: ${props => (props.disabled ? 0.6 : 1)};
`;

export default Button;
