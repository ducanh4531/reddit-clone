import { graphql } from '../../gql'

export const loginMutationDocument = graphql(`
	mutation Login($loginInput: LoginInput!) {
		login(loginInput: $loginInput) {
			...UserMutationResponse
		}
	}
`)
