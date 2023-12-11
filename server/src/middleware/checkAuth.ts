import { AuthenticationError } from 'apollo-server-core'
import { MiddlewareFn } from 'type-graphql'
import { Context } from '../types/Context'

export const checkAuth: MiddlewareFn<Context> = ({ context }, next) => {
	const { req } = context

	console.log('REQUEST.SESSION', req.session)

	if (!req.session.userId)
		throw new AuthenticationError(
			'Not authenticated to perform GraphQL operations'
		)

	return next()
}
