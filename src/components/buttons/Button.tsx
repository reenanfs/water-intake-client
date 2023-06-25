import styled from 'styled-components';

const Button = styled.button`
	background-color: ${props => props.theme.colors.secondary};
	color: ${props => props.theme.colors.primary};
	padding: 10px;
	border: none;
	border-radius: 4px;
	font-size: 16px;
	cursor: pointer;
`;

export default Button;
