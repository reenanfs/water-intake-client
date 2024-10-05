import styled from "styled-components";

const ConsumptionList = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 20px 0;
	border-top: 1px solid ${props => props.theme.colors.primary};
`;

export default ConsumptionList