import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input
} from '@chakra-ui/react'
import { useField } from 'formik'
import { InputHTMLAttributes } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string
	label: string
	name: string
	type?: string
}

const InputField = (props: InputFieldProps) => {
	const [field, { error }] = useField(props)

	return (
		<FormControl>
			<FormLabel htmlFor={field.name}>{props.label}</FormLabel>
			<Input
				id={field.name}
				{...field}
				placeholder={props.placeholder}
				name={props.name}
				type={props.type}
			/>
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</FormControl>
	)
}

export default InputField
