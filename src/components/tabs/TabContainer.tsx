import styled from 'styled-components';

export const TabContainer = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
	margin-top: 20px;
	border-bottom: 1px solid ${props => props.theme.colors.secondary};
	padding-bottom: 10px;
	margin-bottom: 50px;
`;
