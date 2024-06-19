import Button from 'components/buttons/Button';
import Container from 'components/containers/container/Container';
import Title from 'components/titles/Title';
import { useState } from 'react';
import styled from 'styled-components';

const Input = styled.input`
	padding: 10px;
	margin: 10px 0;
	width: 200px;
	font-size: 16px;
`;

const Settings = (): JSX.Element => {
	const [dailyTarget, setDailyTarget] = useState<number | string>('');

	const handleSetTarget = () => {
		if (dailyTarget) {
			alert(`Daily target set to ${dailyTarget} ml`);
		}
	};

	return (
		<Container>
			<Title>Set your daily target</Title>
			<Input
				type='number'
				placeholder='Set your daily target (ml)'
				value={dailyTarget}
				onChange={e => setDailyTarget(e.target.value)}
			/>
			<Button onClick={handleSetTarget}>Set Target</Button>
		</Container>
	);
};

export default Settings;
