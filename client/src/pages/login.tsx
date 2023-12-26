import { useMutation } from '@apollo/client'
import { Box, Button } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/navigation'
import InputField from '../components/InputField'
import Wrapper from '../components/Wrapper'
import { graphql } from '../gql'
import { LoginInput } from '../gql/graphql'
import { mapFieldErrors } from '../helpers/mapFieldErrors'

// prettier-ignore
const loginMutation = graphql(`mutation Login($loginInput: LoginInput!) {\n  login(loginInput: $loginInput) {\n    code\n    success\n    message\n    user {\n      id\n      username\n      email\n    }\n    errors {\n      field\n      message\n    }\n  }\n}`)

const Login = () => {
	const initialValues = {
		usernameOrEmail: '',
		password: ''
	}

	const [loginUser, { loading: _loginUserLoading, data, error }] =
		useMutation(loginMutation)
	const router = useRouter()

	const handleLoginUser = async (
		values: LoginInput,
		actions: FormikHelpers<LoginInput>
	) => {
		const response = await loginUser({
			variables: { loginInput: values }
		})

		console.log('RESPONSE', response)

		if (response.data?.login.errors) {
			console.log('ERROR OCCURRED')
			actions.setErrors(mapFieldErrors(response.data.login.errors))
		} else if (response.data?.login.user) {
			router.push('/')
			actions.resetForm()
		}
	}

	return (
		<Wrapper>
			{error && <p>Failed to login</p>}
			{data && data.login.success && (
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
