import Button from 'components/buttons/Button';
import { clientRoutePaths } from 'constants/routesConstants';
import { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import styled from 'styled-components';

const ErrorContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 98vh;
	background-color: ${props => props.theme.colors.primary};
`;

const ErrorTitle = styled.h1`
	font-size: 72px;
	color: ${props => props.theme.colors.warning}; // Use error color
	margin-bottom: 16px;
`;

const ErrorMessage = styled.p`
	font-size: 24px;
	color: ${props => props.theme.colors.secondary}; // Use secondary color
`;

interface IErrorProps {
	response: {
		status: number;
	};
}

const ErrorPage = () => {
	const navigate = useNavigate();
	const error = useRouteError() as IErrorProps;

	useEffect(() => {
		if (error.response.status === 401) {
			navigate(clientRoutePaths.LOGIN);
		}
	}, [navigate, error]);

	return (
		<ErrorContainer>
			<ErrorTitle>Oops!</ErrorTitle>
			<ErrorMessage>Sorry, an unexpected error has ocurred</ErrorMessage>
			<Button onClick={() => navigate(clientRoutePaths.LOGIN)}>
				Go to Home
			</Button>
		</ErrorContainer>
	);
};

export default ErrorPage;
