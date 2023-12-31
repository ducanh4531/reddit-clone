import { useMutation } from '@apollo/client'
import { Box, Button } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/navigation'
import InputField from '../components/InputField'
import Wrapper from '../components/Wrapper'
import { FragmentType, useFragment } from '../gql'
import { FieldError, RegisterInput } from '../gql/graphql'
import { UserMutationResponseFragment } from '../graphql-client/fragments/userMutationResponse'
import { registerMutationDocument } from '../graphql-client/mutations/register'
import { mapFieldErrors } from '../helpers/mapFieldErrors'

const Register = () => {
	const initialValues = {
		username: '',
		email: '',
		password: ''
	}

	const router = useRouter()
	const [
		registerUser,
		{ loading: _registerUserLoading, data: dataRegister, error }
	] = useMutation(registerMutationDocument)
	const registerResponse = useFragment(
		UserMutationResponseFragment,
		dataRegister?.register as FragmentType<
			typeof UserMutationResponseFragment
		>
	)

	const handleRegisterUser = async (
		values: RegisterInput,
		actions: FormikHelpers<RegisterInput>
	) => {
		const { data: dataRegister } = await registerUser({
			variables: { registerInput: values }
		})

		const registerResponse = useFragment(
			UserMutationResponseFragment,
			dataRegister?.register as FragmentType<
				typeof UserMutationResponseFragment
			>
		)

		console.log('RESPONSE', registerResponse)

		if (registerResponse.errors) {
			console.log('ERROR OCCURRED')
			actions.setErrors(
				mapFieldErrors(registerResponse.errors as Array<FieldError>)
			)
		} else if (registerResponse.user) {
			router.push('/')
			actions.resetForm()
		}
	}

	return (
		<Wrapper>
			{error && <p>Failed to register. Internal server error</p>}
			{registerResponse && registerResponse.success && (
				<p>Registered successfully {JSON.stringify(dataRegister)}</p>
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
