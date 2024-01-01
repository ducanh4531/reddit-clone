import { useMutation } from '@apollo/client'
import { Box, Button, Flex, Spinner } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/navigation'
import InputField from '../components/InputField'
import Wrapper from '../components/Wrapper'
import { FragmentType, useFragment } from '../gql'
import {
	FieldError,
	LoginInput,
	MeQuery,
	UserMutationResponseFragmentDoc
} from '../gql/graphql'
import { loginMutationDocument } from '../graphql-client/mutations/login'
import { meQueryDocument } from '../graphql-client/queries/me'
import { mapFieldErrors } from '../helpers/mapFieldErrors'
import useCheckAuth from '../utils/useCheckAuth'

const Login = () => {
	const router = useRouter()
	const { dataMe, loading: loadingCheckAuth } = useCheckAuth()

	const initialValues = {
		usernameOrEmail: '',
		password: ''
	}

	const [loginUser, { loading: _loginUserLoading, data: dataLogin, error }] =
		useMutation(loginMutationDocument, {
			update: (cache, { data: dataLogin }) => {
				const loginResponse = useFragment(
					UserMutationResponseFragmentDoc,
					dataLogin?.login as FragmentType<
						typeof UserMutationResponseFragmentDoc
					>
				)

				if (loginResponse.success) {
					cache.writeQuery<MeQuery>({
						query: meQueryDocument,
						data: { me: loginResponse.user }
					})
				}
			}
		})
	const loginResponse = useFragment(
		UserMutationResponseFragmentDoc,
		dataLogin?.login as FragmentType<typeof UserMutationResponseFragmentDoc>
	)

	const handleLoginUser = async (
		values: LoginInput,
		actions: FormikHelpers<LoginInput>
	) => {
		const { data: dataLogin } = await loginUser({
			variables: { loginInput: values }
		})

		const loginResponse = useFragment(
			UserMutationResponseFragmentDoc,
			dataLogin?.login as FragmentType<
				typeof UserMutationResponseFragmentDoc
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
		<>
			{loadingCheckAuth || (!loadingCheckAuth && dataMe?.me) ? (
				<Flex
					justifyContent={'center'}
					align={'center'}
					minH={'100vh'}
				>
					<Spinner />
				</Flex>
			) : (
				<Wrapper>
					{error && <p>Failed to login. Internal server error</p>}
					{loginResponse && loginResponse.success && (
						<p>
							Logged in successfully {JSON.stringify(dataLogin)}
						</p>
					)}
					<Formik
						onSubmit={handleLoginUser}
						initialValues={initialValues}
					>
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
			)}
		</>
	)
}

export default Login
