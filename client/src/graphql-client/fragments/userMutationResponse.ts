import { graphql } from '../../gql'

export const UserMutationResponseFragment = graphql(`
	fragment UserMutationResponse on UserMutationResponse {
		code
		success
		message
		user {
			...UserInfo
		}
		errors {
			...FieldError
		}
	}
`)
