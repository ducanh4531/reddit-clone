import * as argon2 from 'argon2'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { COOKIE_NAME } from '../constants'
import { User } from '../entities/User'
import { Context } from '../types/Context'
import { LoginInput } from '../types/LoginInput'
import { RegisterInput } from '../types/RegisterInput'
import { UserMutationResponse } from '../types/UserMutationResponse'
import { validateRegisterInput } from '../utils/validateRegisterInput'

@Resolver()
export class UserResolver {
	@Mutation((_return) => UserMutationResponse)
	async register(
		@Arg('registerInput') registerInput: RegisterInput,
		@Ctx() { req }: Context
	): Promise<UserMutationResponse> {
		const validateRegisterInputErrors = validateRegisterInput(registerInput)

		if (validateRegisterInputErrors !== null)
			return {
				code: 400,
				success: false,
				...validateRegisterInputErrors
			}

		try {
			const { username, email, password } = registerInput

			const existingUser = await User.findOne({
				where: [{ username }, { email }]
			})

			if (existingUser)
				return {
					code: 400,
					success: false,
					message: 'Duplicated username or email',
					errors: [
						{
							field:
								existingUser.username === username
									? 'username'
									: 'email',
							message: `${
								existingUser.username === username
									? 'Username'
									: 'Email'
							} already taken`
						}
					]
				}

			const hashedPassword = await argon2.hash(password)

			let newUser = User.create({
				username,
				email,
				password: hashedPassword
			})

			newUser = await User.save(newUser)

			req.session.userId = newUser.id

			return {
				code: 200,
				success: true,
				message: 'User registration successful',
				user: newUser
			}
		} catch (error) {
			console.log(error)
			return {
				code: 500,
				success: false,
				message: `Internal server error ${error.message}`
			}
		}
	}

	@Mutation((_return) => UserMutationResponse)
	async login(
		@Arg('loginInput') loginInput: LoginInput,
		@Ctx() { req }: Context
	): Promise<UserMutationResponse> {
		try {
			const { usernameOrEmail, password } = loginInput

			const existingUser = await User.findOne({
				where: [
					usernameOrEmail.includes('@')
						? { email: usernameOrEmail }
						: { username: usernameOrEmail }
				]
			})

			if (!existingUser)
				return {
					code: 400,
					success: false,
					message: 'User not found',
					errors: [
						{
							field: 'usernameOrEmail',
							message: `${
								usernameOrEmail.includes('@')
									? 'Email'
									: 'Username'
							} is incorrect`
						}
					]
				}

			const passwordValid = await argon2.verify(
				existingUser.password,
				password
			)

			if (!passwordValid)
				return {
					code: 400,
					success: false,
					message: 'Wrong password',
					errors: [
						{
							field: 'password',
							message: 'Password incorrect'
						}
					]
				}

			// create session and return cookie
			// session: userId = existingUser.id
			req.session.userId = existingUser.id

			return {
				code: 200,
				success: true,
				message: 'Logged in successfully',
				user: existingUser
			}
		} catch (error) {
			console.log(error)
			return {
				code: 500,
				success: false,
				message: `Internal server error ${error.message}`
			}
		}
	}

	@Mutation((_return) => Boolean)
	logout(@Ctx() { req, res }: Context): Promise<boolean> {
		return new Promise((resolve, _reject) => {
			res.clearCookie(COOKIE_NAME)

			req.session.destroy((error) => {
				if (error) {
					console.log('DESTROYING SESSION ERROR', error)
					resolve(false)
				}
				resolve(true)
			})
		})
	}
}
