import styled from 'styled-components';

export const Tab = styled.div<{ active: boolean }>`
	font-size: 1.6rem;
	font-weight: ${props => (props.active ? 'bold' : 'normal')};
	padding: 10px 20px;
	cursor: pointer;
	color: ${props =>
		props.active ? props.theme.colors.secondary : props.theme.colors.secondary};
	border-bottom: ${props =>
		props.active ? `3px solid ${props.theme.colors.secondary}` : 'none'};
	transition: all 0.3s ease;

	&:hover {
		color: ${props => props.theme.colors.primary};
		border-bottom: 3px solid ${props => props.theme.colors.primary};
	}
`;
