import { ReactNode } from 'react';
import styled from 'styled-components';

interface IContentProps {
	children: ReactNode;
}

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	overflow-x: hidden;
	overflow-y: hidden;
`;

const Container = ({ children }: IContentProps) => (
	<MainContainer>{children}</MainContainer>
);

export default Container;
