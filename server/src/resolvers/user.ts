import * as argon2 from 'argon2'
import { Arg, Mutation, Resolver } from 'type-graphql'
import { User } from '../entities/User'

@Resolver()
export class UserResolver {
	@Mutation((_returns) => User, { nullable: true })
	async register(
		@Arg('username') username: string,
		@Arg('email') email: string,
		@Arg('password') password: string
	): Promise<User | null> {
		try {
			const existingUser = await User.findOne({
				where: [{ username }, { email }]
			})
			if (existingUser) return null

			const hashedPassword = await argon2.hash(password)

			const newUser = User.create({
				username,
				email,
				password: hashedPassword
			})

			return await User.save(newUser)
		} catch (error) {
			console.log(error)
			return null
		}
	}
}
