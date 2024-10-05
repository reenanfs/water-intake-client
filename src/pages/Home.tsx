import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';

import Container from 'components/containers/container/Container';
import Button from 'components/buttons/Button';
import { SubmitHandler, useForm } from 'react-hook-form';

import FormInput from 'components/forms/FormInput';
import FormErrorBox from '../components/forms/FormErrorBox';
import Form from '../components/forms/form';
import Label from '../components/forms/FormLabel';
import { apiRoutes } from 'api/axios';
import { IWaterIntake } from 'types/waterIntakeTypes';
import { TabContainer } from 'components/tabs/TabContainer';
import { Tab } from 'components/tabs/Tab';
import { useAuth } from 'hooks/useAuth';
import Title from 'components/titles/Title';
import ConsumptionList from 'components/lists/List';
import ConsumptionItem from 'components/lists/ListItem';

const FormLabel = styled(Label)`
	font-size: 2rem;
` as typeof Label;

interface HomeFormValues {
	waterIntake: number;
}

const schema = yup.object().shape({
	waterIntake: yup
		.number()
		.moreThan(0, 'Intake must be greater than 0')
		.required('A daily consumption should be set'),
});

const Home: React.FC = () => {
	const { currentUser } = useAuth();

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<HomeFormValues>({
		resolver: yupResolver(schema),
	});

	const [activeTab, setActiveTab] = useState<number>(0);
	const [todayIntakes, setTodayIntakes] = useState<IWaterIntake[]>();
	const [todayTotalIntake, setTodayTotalIntake] = useState<number>(0);
	const [targetWaterIntake, setTargetWaterIntake] = useState<number>(0);
	const [dailyIntakeReached, setDailyIntakeReached] = useState<boolean>(false);

	const [serverError, setServerError] = useState('');

	const fetchData = useCallback(async () => {
		const today = moment().format('YYYY-MM-DD');
		const { data: intakes } = await apiRoutes.getWaterIntakes({
			startDate: today,
			endDate: today,
		});

		setTodayIntakes(intakes);

		const todayTotalIntake = intakes.reduce(
			(dayIntake, currentIntake) => dayIntake + currentIntake.amount,
			0
		);

		setTodayTotalIntake(todayTotalIntake);
		setTargetWaterIntake(currentUser!.target_water_amount);
		setDailyIntakeReached(todayTotalIntake >= currentUser!.target_water_amount);
	}, [currentUser]);

	const onFormSubmit: SubmitHandler<HomeFormValues> = async (data, e) => {
		try {
			reset({ waterIntake: 0 });
			await apiRoutes.addWaterIntake(data.waterIntake!);
			await fetchData();
		} catch (err: any) {
			setServerError(err.response?.data?.msg || 'An unknown error occurred.');
		}
	};

	useEffect(() => {
		fetchData();
	}, [fetchData]);

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
				dailyIntakeReached ? (
					<>
						<Title>Congrats! Your daily intake was reached!!</Title>
						<Title>
							You drank {todayTotalIntake} ml of water today and your target was{' '}
							{targetWaterIntake} ml
						</Title>
						<Title>Keep up the good work!</Title>
					</>
				) : (
					<Form onSubmit={handleSubmit(onFormSubmit)}>
						<FormLabel>Intake</FormLabel>
						<FormInput
							type='number'
							name='waterIntake'
							placeholder='Water intake (ml)'
							errors={errors}
							control={control}
						/>
						<Button type='submit'>Add</Button>
						{serverError && <FormErrorBox msg={serverError} />}
					</Form>
				)
			) : (
				<>
					{todayIntakes && (
						<Title>
							Total:{' '}
							{todayIntakes.reduce(
								(totalIntakes, currentIntake) =>
									totalIntakes + currentIntake.amount,
								0
							)}
						</Title>
					)}
					<ConsumptionList>
						{todayIntakes &&
							todayIntakes.map((intake, index) => (
								<ConsumptionItem key={index}>
									Intake {index + 1}: {intake.amount} ml
								</ConsumptionItem>
							))}
					</ConsumptionList>
				</>
			)}
		</Container>
	);
};

export default Home;
