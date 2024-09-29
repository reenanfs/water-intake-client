import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';

import Container from 'components/containers/container/Container';
import Button from 'components/buttons/Button';
import { SubmitHandler, useForm } from 'react-hook-form';

import FormInput from 'components/inputs/FormInput';
import FormErrorBox from '../components/forms/FormErrorBox';
import Form from '../components/forms/form';
import Label from '../components/forms/FormLabel';
import { apiRoutes } from 'api/axios';
import { IWaterIntake } from 'types/waterIntakeTypes';

const FormLabel = styled(Label)`
	font-size: 2rem;
` as typeof Label;

const TabContainer = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
	margin-top: 20px;
	border-bottom: 1px solid ${props => props.theme.colors.secondary};
	padding-bottom: 10px;
	margin-bottom: 50px;
`;

const Tab = styled.div<{ active: boolean }>`
	font-size: 1.6rem;
	font-weight: ${props => (props.active ? 'bold' : 'normal')};
	padding: 10px 20px;
	cursor: pointer;
	color: ${props =>
		props.active ? props.theme.colors.secondary : props.theme.colors.secondary};
	border-bottom: ${props =>
		props.active ? `3px solid ${props.theme.colors.secondary}` : 'none'};
	transition: all 0.3s ease;

	&:hover {
		color: ${props => props.theme.colors.primary};
		border-bottom: 3px solid ${props => props.theme.colors.primary};
	}
`;

const ConsumptionList = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 20px 0;
	border-top: 1px solid ${props => props.theme.colors.primary};
`;

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

interface HomeFormValues {
	waterIntake: number;
}

const schema = yup.object().shape({
	waterIntake: yup
		.number()
		.required('A daily consumption should be set')
		.moreThan(0, 'Intake must be greater than 0'),
});

const Home: React.FC = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<HomeFormValues>({
		resolver: yupResolver(schema),
		defaultValues: {
			waterIntake: 0,
		},
	});

	const [activeTab, setActiveTab] = useState<number>(0);
	const [todayIntakes, setTodayIntakes] = useState<IWaterIntake[]>();

	const [serverError, setServerError] = useState('');

	const fetchData = async () => {
		const today = moment().format('YYYY-MM-DD');
		const { data: intakes } = await apiRoutes.getWaterIntakes({
			startDate: today,
			endDate: today,
		});

		setTodayIntakes(intakes);
	};

	const onFormSubmit: SubmitHandler<HomeFormValues> = async (data, e) => {
		try {
			await apiRoutes.addWaterIntake(data.waterIntake);
			await fetchData();
			reset({ waterIntake: 0 });
		} catch (err: any) {
			setServerError(err.response?.data?.msg || 'An unknown error occurred.');
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Container>
			<TabContainer>
				<Tab active={activeTab === 0} onClick={() => setActiveTab(0)}>
					Add Intake
				</Tab>
				<Tab active={activeTab === 1} onClick={() => setActiveTab(1)}>
					View Intakes
				</Tab>
			</TabContainer>

			{activeTab === 0 ? (
				<Form onSubmit={handleSubmit(onFormSubmit)}>
					<FormLabel>Intake</FormLabel>
					<FormInput
						name='waterIntake'
						placeholder='Water intake in ml'
						errors={errors}
						control={control}
					/>
					<Button type='submit'>Add</Button>
					{serverError && <FormErrorBox msg={serverError} />}
				</Form>
			) : (
				<ConsumptionList>
					{todayIntakes &&
						todayIntakes.map((intake, index) => (
							<ConsumptionItem key={index}>
								Intake {index + 1}: {intake.amount} ml
							</ConsumptionItem>
						))}
				</ConsumptionList>
			)}
		</Container>
	);
};

export default Home;
