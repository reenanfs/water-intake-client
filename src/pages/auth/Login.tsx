import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

import Button from 'components/buttons/Button';
import Input from 'components/inputs/FormInput';
import api from 'api/waterIntakeServer';
import FormContainer from './components/FormContainer';
import FormLabel from './components/FormLabel';
import Form from './components/form';
import { useState } from 'react';
import FormErrorBox from './components/FormErrorBox';
import { AxiosError } from 'axios';

const LoginInput = styled(Input)`
	width: 80%;
` as typeof Input;

const LoginButton = styled(Button)`
	margin-top: 10px;
	width: 80%;
`;

interface LoginFormValues {
	email: string;
	password: string;
}

const schema = yup.object().shape({
	email: yup
		.string()
		.email('Must be a valid email')
		.required('Email is required'),
	password: yup.string().required('Password is required'),
});

const Login = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: yupResolver(schema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const [serverError, setServerError] = useState('');

	const onFormSubmit: SubmitHandler<LoginFormValues> = async data => {
		try {
			const response = await api.post('/auth/login', data);
			console.log(response);
		} catch (err: any) {
			setServerError(err.response?.data?.msg || 'An unknown error occurred.');
		}
	};

	return (
		<FormContainer>
			<Form onSubmit={handleSubmit(onFormSubmit)}>
				<FormLabel>Login</FormLabel>
				<LoginInput name='email' errors={errors} control={control} />
				<LoginInput
					type='password'
					name='password'
					errors={errors}
					control={control}
				/>

				<LoginButton type='submit'>Login</LoginButton>
				<p>
					Doesn't have an account? <Link to='/register'>Create one now!</Link>
				</p>
				{serverError && <FormErrorBox msg={serverError} />}
			</Form>
		</FormContainer>
	);
};

export default Login;
