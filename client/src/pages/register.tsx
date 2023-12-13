import { Box, Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import InputField from '../components/InputField'
import Wrapper from '../components/Wrapper'

const Register = () => {
	return (
		<Wrapper>
			<Formik
				onSubmit={(values, actions) => {
					console.log(values)
					setTimeout(() => actions.setSubmitting(false), 1000)
				}}
				initialValues={{ username: '', password: '' }}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form onSubmit={handleSubmit}>
						<InputField
							name='username'
							label='Username'
							placeholder='Username'
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
							Register
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	)
}

export default Register
