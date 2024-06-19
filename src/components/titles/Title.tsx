import { ReactNode } from 'react';
import styled from 'styled-components';

const H1Title = styled.h1`
	color: ${props => props.theme.colors.secondary};
	background-color: ${props => props.theme.colors.primary};
	font-size: 28px;
	margin: 0;
	padding: 10px;
	border-radius: 8px;
`;

interface ITitleProps {
	children: ReactNode;
}

const Title = ({ children }: ITitleProps) => {
	return <H1Title>{children}</H1Title>;
};

export default Title;
