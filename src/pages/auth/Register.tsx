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
	password: yup.string().required('Password is required'),
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

	const onFormSubmit: SubmitHandler<RegisterFormValues> = async data => {
		console.log(data);
		try {
			const response = await api.post('/auth/register', data);
			console.log(response);
		} catch (err: any) {
			console.log(err.response.data);
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
					Already have an account? <Link to='/login'>Login over here!</Link>
				</p>
			</Form>
		</FormContainer>
	);
};

export default Register;
