import { useMutation } from '@apollo/client'
import { Box, Button } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/navigation'
import InputField from '../components/InputField'
import Wrapper from '../components/Wrapper'
import { FragmentType, useFragment } from '../gql'
import { FieldError, LoginInput } from '../gql/graphql'
import { UserMutationResponseFragment } from '../graphql-client/fragments/userMutationResponse'
import { loginMutationDocument } from '../graphql-client/mutations/login'
import { mapFieldErrors } from '../helpers/mapFieldErrors'

const Login = () => {
	const initialValues = {
		usernameOrEmail: '',
		password: ''
	}

	const router = useRouter()
	const [loginUser, { loading: _loginUserLoading, data, error }] =
		useMutation(loginMutationDocument)
	const loginResponse = useFragment(
		UserMutationResponseFragment,
		data?.login as FragmentType<typeof UserMutationResponseFragment>
	)

	const handleLoginUser = async (
		values: LoginInput,
		actions: FormikHelpers<LoginInput>
	) => {
		const { data: dataLogin } = await loginUser({
			variables: { loginInput: values }
		})

		const loginResponse = useFragment(
			UserMutationResponseFragment,
			dataLogin?.login as FragmentType<
				typeof UserMutationResponseFragment
			>
		)

		console.log('RESPONSE', loginResponse)

		if (loginResponse.errors) {
			console.log('ERROR OCCURRED')
			actions.setErrors(
				mapFieldErrors(loginResponse.errors as Array<FieldError>)
			)
		} else if (loginResponse.user) {
			router.push('/')
			actions.resetForm()
		}
	}

	return (
		<Wrapper>
			{error && <p>Failed to login. Internal server error</p>}
			{loginResponse && loginResponse.success && (
				<p>Logged in successfully {JSON.stringify(data)}</p>
			)}
			<Formik onSubmit={handleLoginUser} initialValues={initialValues}>
				{({ handleSubmit, isSubmitting }) => (
					<Form onSubmit={handleSubmit}>
						<InputField
							name='usernameOrEmail'
							label='Username or Email'
							placeholder='Username or Email'
						/>
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
							Login
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	)
}

export default Login
