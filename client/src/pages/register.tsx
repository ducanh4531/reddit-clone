import { useMutation } from '@apollo/client'
import { Box, Button } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import InputField from '../components/InputField'
import Wrapper from '../components/Wrapper'
import { graphql } from '../gql'
import { RegisterInput } from '../gql/graphql'

// prettier-ignore
const registerMutation = graphql(`mutation Register($registerInput: RegisterInput!) {\n  register(registerInput: $registerInput) {\n    code\n    success\n    message\n    user {\n      id\n      username\n      email\n    }\n    errors {\n      field\n      message\n    }\n  }\n}`)

const Register = () => {
	const initialValues = {
		username: '',
		email: '',
		password: ''
	}

	const [registerUser, { loading: _registerUserLoading, data, error }] =
		useMutation(registerMutation)

	const handleRegisterUser = async (
		values: RegisterInput,
		actions: FormikHelpers<RegisterInput>
	) => {
		const response = await registerUser({
			variables: { registerInput: values }
		})
		actions.resetForm()

		console.log('RESPONSE', response)

		if (response.data?.register.code === 200) {
			console.log('OK')
		}
	}

	return (
		<Wrapper>
			{error && <p>Failed to register</p>}
			{data && data.register.success && (
				<p>Registered successfully {JSON.stringify(data)}</p>
			)}
			<Formik onSubmit={handleRegisterUser} initialValues={initialValues}>
				{({ handleSubmit, isSubmitting }) => (
					<Form onSubmit={handleSubmit}>
						<InputField
							name='username'
							label='Username'
							placeholder='Username'
						/>
						<Box mt={4}>
							<InputField
								name='email'
								label='Email'
								placeholder='Email'
								type='text'
							/>
						</Box>
						<Box mt={4}>
							<InputField
								name='password'
								label='Password'
								placeholder='Password'
								type='password'
							/>
						</Box>
						<Button
							type='submit'
							colorScheme='teal'
							mt='4'
							isLoading={isSubmitting}
						>
							Register
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	)
}

export default Register
