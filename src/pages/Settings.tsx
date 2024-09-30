import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from 'components/buttons/Button';
import Container from 'components/containers/container/Container';
import Title from 'components/titles/Title';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import FormErrorBox from 'components/forms/FormErrorBox';
import Form from 'components/forms/form';
import { apiRoutes } from 'api/axios';
import { ActivityLevel } from 'types/waterIntakeTypes';
import { useAuth } from 'hooks/useAuth';
import FormInput from 'components/inputs/FormInput';

const Input = styled.input`
	padding: 10px;
	margin: 10px 0;
	width: 200px;
	font-size: 16px;
`;

const Select = styled.select`
	padding: 10px;
	margin: 10px 0;
	width: 220px;
	font-size: 16px;
`;

interface SettingsFormValues {
	targetWaterAmount: number;
}

const schema = yup.object().shape({
	targetWaterAmount: yup
		.number()
		.required('A daily consumption should be set')
		.moreThan(0, 'Intake must be greater than 0'),
});

const Settings = (): JSX.Element => {
	const { currentUser } = useAuth();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SettingsFormValues>({
		resolver: yupResolver(schema),
	});

	const [serverError, setServerError] = useState('');

	const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
	const [weight, setWeight] = useState(0);
	const [activityLevel, setActivityLevel] = useState<ActivityLevel>();
	const [suggestedTargetWaterAmount, setSuggestTargetWaterAmount] =
		useState('');

	const onFormSubmit: SubmitHandler<SettingsFormValues> = async data => {
		try {
			console.log(data);
			// await apiRoutes.updateUserSettings(data.weight);
		} catch (err: any) {
			setServerError(err.response?.data?.msg || 'An unknown error occurred.');
		}
	};

	const fetchSuggestedWaterIntake = async (
		weight: number,
		activityLevel: ActivityLevel
	) => {
		const {
			data: { target_intake_amount: targetIntakeAmount },
		} = await apiRoutes.calculateTargetWaterIntake({
			weight,
			activityLevel,
		});

		setSuggestTargetWaterAmount(String(targetIntakeAmount));
	};

	const handleSaveUserConfig = async () => {
		await apiRoutes.updateUserSettings({ weight, activityLevel });
		setIsSaveButtonDisabled(true);
	};

	useEffect(() => {
		setActivityLevel(currentUser?.activity_level);
		setWeight(Number(currentUser?.weight));
		setSuggestTargetWaterAmount(String(currentUser?.target_water_amount || ''));
	}, [currentUser]);

	useEffect(() => {
		if (weight && activityLevel) {
			console.log(weight, activityLevel);
			fetchSuggestedWaterIntake(weight, activityLevel);
		}
	}, [weight, activityLevel]);

	const handleActivityLevelChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setActivityLevel(e.target.value as ActivityLevel);
		setIsSaveButtonDisabled(false);
	};

	const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setWeight(Number(e.target.value));
		setIsSaveButtonDisabled(false);
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit(onFormSubmit)}>
				<Title>Set your daily target</Title>
				<FormInput
					name='targetWaterAmount'
					type='number'
					placeholder='Set your daily target (ml)'
					errors={errors}
					control={control}
				/>
				<Button>Set Target</Button>
				{serverError && <FormErrorBox msg={serverError} />}
			</Form>

			<p>Discover suggested daily target by filling out the fields below:</p>
			<Title>Weight</Title>
			<Input
				name='weight'
				type='number'
				placeholder='Your current weight (kg)'
				value={weight}
				onChange={handleWeightChange}
			/>

			<Title>Activity Level</Title>
			<Select
				name='activityLevel'
				value={activityLevel || ''}
				onChange={handleActivityLevelChange}
			>
				<option value='' disabled>
					Select activity level
				</option>
				{Object.entries(ActivityLevel).map(([key, value]) => (
					<option key={key} value={key}>
						{value}
					</option>
				))}
			</Select>
			<Title>Suggested Target</Title>
			<p>
				{suggestedTargetWaterAmount ? `${suggestedTargetWaterAmount} ml` : ''}
			</p>
			<Button disabled={isSaveButtonDisabled} onClick={handleSaveUserConfig}>
				Save
			</Button>
		</Container>
	);
};

export default Settings;
