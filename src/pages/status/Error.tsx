import { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'components/buttons/Button';
import { clientRoutePaths } from 'constants/routesConstants';

const ErrorContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 98vh;
	background-color: ${({ theme }) => theme.colors.primary};
`;

const ErrorTitle = styled.h1`
	font-size: 72px;
	color: ${({ theme }) => theme.colors.warning};
	margin-bottom: 16px;
`;

const ErrorMessage = styled.p`
	font-size: 24px;
	color: ${({ theme }) => theme.colors.secondary};
`;

interface IErrorProps {
	data: string;
	response: {
		status: number;
	};
}

const isAxiosError = (error: IErrorProps) => {
	return 'name' in error && error.name === 'AxiosError';
};

const ErrorPage = () => {
	const navigate = useNavigate();
	const error = useRouteError() as IErrorProps;
	console.log(error);
	useEffect(() => {
		if (isAxiosError(error) && error.response.status === 401) {
			navigate(clientRoutePaths.LOGIN);
		}
	}, [navigate, error]);

	return (
		<ErrorContainer>
			<ErrorTitle>Oops!</ErrorTitle>
			<ErrorMessage>
				{isAxiosError(error) ? (
					'An unexpected error has occurred'
				) : (
					<i>{error.data}</i>
				)}
			</ErrorMessage>
			<Button onClick={() => navigate(clientRoutePaths.HOME)}>
				Go to Home
			</Button>
		</ErrorContainer>
	);
};

export default ErrorPage;
