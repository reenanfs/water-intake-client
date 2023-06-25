import styled from 'styled-components';

interface IIconProps {
	name: string;
}

const StyledIcon = styled.i`
	font-family: 'Material Icons';
	font-style: normal;
	font-size: 25px;
`;

const Icon = ({ name }: IIconProps) => {
	return <StyledIcon>{name}</StyledIcon>;
};

export default Icon;
