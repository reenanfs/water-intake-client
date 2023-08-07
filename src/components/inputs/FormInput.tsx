import {
	FieldErrors,
	DeepMap,
	FieldValues,
	useController,
	UseControllerProps,
} from 'react-hook-form';
import styled from 'styled-components';
import { capitalize } from 'utils/utils';

interface InputProps<T extends FieldValues> extends UseControllerProps<T> {
	type?: string;
	errors?: FieldErrors<T> | DeepMap<any, FieldErrors<T>> | undefined;
	className?: string;
}

const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 15px;
`;

const StyledInput = styled.input<{ hasError: boolean }>`
	padding: 10px;
	border: 1px solid ${props => (props.hasError ? 'red' : '#ccc')};
	border-radius: 5px;
`;

const ErrorMessage = styled.span`
	color: red;
	font-size: 14px;
`;

const Input = <T extends FieldValues>(props: InputProps<T>) => {
	const { type, name, errors, className } = props;
	const { field } = useController(props);

	return (
		<>
			<StyledInput
				{...field}
				type={type}
				placeholder={capitalize(name)}
				hasError={!!errors[name]}
				className={className}
			/>
			<InputWrapper>
				{errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
			</InputWrapper>
		</>
	);
};

export default Input;
