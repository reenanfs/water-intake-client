import { ReactNode } from 'react';
import styled from 'styled-components';

interface IContentProps {
	children: ReactNode;
}
const OuterContainer = styled.div`
	width: 100%;
	max-width: 80vw;
	margin: auto;
`;

const InnerContainer = styled.div`
	border: 1px solid #ddd;
	border-radius: 16px;
	padding: 20px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	height: 80vh;
	margin-top: 40px;
`;

const Content = ({ children }: IContentProps) => (
	<OuterContainer>
		<InnerContainer>{children}</InnerContainer>
	</OuterContainer>
);

export default Content;
