import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

import Button from 'components/buttons/Button';
import Input from 'components/inputs/FormInput';

import FormContainer from './components/FormContainer';
import FormLabel from './components/FormLabel';
import Form from './components/form';
import { clientRoutePaths } from 'constants/routesConstants';
import { apiRoutes } from 'api/axios';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';
import FormErrorBox from './components/FormErrorBox';

const StyledInput = styled(Input)`
	width: 80%;
` as typeof Input;

const StyledButton = styled(Button)`
	margin-top: 10px;
	width: 80%;
`;

interface RegisterFormValues {
	username: string;
	email: string;
	password: string;
}

const schema = yup.object().shape({
	username: yup.string().required(),
	email: yup
		.string()
		.email('Must be a valid email')
		.required('Email is required'),
	password: yup
		.string()
		.min(6, 'Password must have at least 6 characters')
		.required('Password is required'),
});

const Register = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormValues>({
		resolver: yupResolver(schema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
	});

	const { handleLogin } = useAuth();

	const [serverError, setServerError] = useState('');

	const onFormSubmit: SubmitHandler<RegisterFormValues> = async data => {
		try {
			const {
				data: { access_token, refresh_token, user },
			} = await apiRoutes.register(data);
			handleLogin(access_token, refresh_token, user);
		} catch (err: any) {
			setServerError(err.response?.data?.msg || 'An unknown error occurred.');
		}
	};

	return (
		<FormContainer>
			<Form onSubmit={handleSubmit(onFormSubmit)}>
				<FormLabel>Register</FormLabel>
				<StyledInput name='username' errors={errors} control={control} />
				<StyledInput name='email' errors={errors} control={control} />
				<StyledInput
					type='password'
					name='password'
					errors={errors}
					control={control}
				/>

				<StyledButton type='submit'>Register</StyledButton>

				<p>
					Already have an account?{' '}
					<Link to={clientRoutePaths.LOGIN}>Login over here!</Link>
				</p>
				{serverError && <FormErrorBox msg={serverError} />}
			</Form>
		</FormContainer>
	);
};

export default Register;
