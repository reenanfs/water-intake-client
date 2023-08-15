import styled from 'styled-components';

const ErrorBoxContainer = styled.div`
	width: 80%;
	display: flex;
	align-items: center;
	border: 1px solid red;
	border-radius: 4px;
	background-color: #ffeeee;
	padding: 10px;
	color: red;
	font-size: 14px;
	justify-content: center;
	margin-top: 10px;
`;

interface IFormErrorBoxProps {
	msg: string;
}

const FormErrorBox = ({ msg }: IFormErrorBoxProps) => {
	return (
		<ErrorBoxContainer>
			<span>{msg}</span>
		</ErrorBoxContainer>
	);
};

export default FormErrorBox;
