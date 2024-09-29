import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from 'components/buttons/Button';
import Container from 'components/containers/container/Container';
import Title from 'components/titles/Title';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Input = styled.input`
	padding: 10px;
	margin: 10px 0;
	width: 200px;
	font-size: 16px;
`;

interface SettingsFormValues {
	weight: number;
	activityLevel: number;
	targetWaterAmount: number;
}

const schema = yup.object().shape({
	weight: yup
		.number()
		.required('A daily consumption should be set')
		.moreThan(0, 'Intake must be greater than 0'),
	activityLevel: yup
		.number()
		.required('A daily consumption should be set')
		.moreThan(0, 'Intake must be greater than 0'),
	targetWaterAmount: yup
		.number()
		.required('A daily consumption should be set')
		.moreThan(0, 'Intake must be greater than 0'),
});

const Settings = (): JSX.Element => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SettingsFormValues>({
		resolver: yupResolver(schema),
		defaultValues: {
			weight: 0,
			activityLevel: 0,
			targetWaterAmount: 0,
		},
	});

	return (
		<Container>
			<Title>Set your daily target</Title>
			<Input type='number' placeholder='Set your daily target (ml)' />
			<Button>Set Target</Button>
		</Container>
	);
};

export default Settings;
