import styled from "styled-components";

const ConsumptionItem = styled.li`
	padding: 15px 0;
	font-size: 1.4rem;
	color: ${props => props.theme.colors.secondary};
	border-bottom: 1px solid ${props => props.theme.colors.primary};
	display: flex;
	justify-content: space-between;
	align-items: center;
	transition: background-color 0.3s ease;
	overflow-x: auto;
	&:hover {
		background-color: ${props => props.theme.colors.primary};
	}

	&:last-child {
		border-bottom: none;
	}
`;

export default ConsumptionItem