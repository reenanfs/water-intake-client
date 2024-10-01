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
	placeholder?: string;
	onValueChange?: (value: string) => void;
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
	margin: 10px 0;
	width: 200px;
	font-size: 16px;
`;

const ErrorMessage = styled.span`
	color: red;
	font-size: 14px;
`;

const Input = <T extends FieldValues>(props: InputProps<T>) => {
	const { type, name, errors, className, placeholder, onValueChange } = props;
	const { field } = useController(props);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		field.onChange(e);
		const newValue = e.target.value;

		if (onValueChange) {
			onValueChange(newValue);
		}
	};

	return (
		<>
			<StyledInput
				{...field}
				type={type}
				placeholder={placeholder ? placeholder : capitalize(name)}
				hasError={!!errors[name]}
				className={className}
				onChange={handleChange}
			/>
			<InputWrapper>
				{errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
			</InputWrapper>
		</>
	);
};

export default Input;
