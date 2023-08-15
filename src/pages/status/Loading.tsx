import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animation for spinning the loader
const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	flex-direction: column;
`;

const Spinner = styled.div`
	border: 4px solid
		${props =>
			props.theme.dark.isOn
				? props.theme.colors.secondary
				: props.theme.colors.primary};
	border-left-color: ${props =>
		props.theme.dark.isOn
			? props.theme.colors.primary
			: props.theme.colors.secondary};
	border-radius: 50%;
	width: 40px;
	height: 40px;
	animation: ${spinAnimation} 1s linear infinite;
`;

const LoadingText = styled.p`
	font-size: 18px;
	color: #333;
	margin-top: 12px;
`;

const LoadingPage = () => {
	return (
		<LoadingContainer>
			<Spinner />
			<LoadingText>Loading...</LoadingText>
		</LoadingContainer>
	);
};

export default LoadingPage;
