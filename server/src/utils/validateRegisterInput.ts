import { RegisterInput } from '../types/RegisterInput'

export const validateRegisterInput = ({
	username,
	email,
	password
}: RegisterInput) => {
	if (!email.includes('@'))
		return {
			message: 'Invalid email',
			errors: [
				{
					field: 'email',
					message: 'Email must be include @ symbol'
				}
			]
		}

	if (username.length <= 2)
		return {
			message: 'Invalid username',
			errors: [
				{
					field: 'username',
					message: 'Length must be greater than 2'
				}
			]
		}

	if (username.includes('@'))
		return {
			message: 'Invalid username',
			errors: [
				{
					field: 'username',
					message: 'Username must not be include @'
				}
			]
		}

	if (password.length <= 2)
		return {
			message: 'Invalid password',
			errors: [
				{
					field: 'password',
					message: 'Length must be greater than 2'
				}
			]
		}

	return null
}
