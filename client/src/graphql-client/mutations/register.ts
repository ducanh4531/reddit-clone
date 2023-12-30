import { graphql } from '../../gql'

export const registerMutationDocument = graphql(`
	mutation Register($registerInput: RegisterInput!) {
		register(registerInput: $registerInput) {
			...UserMutationResponse
		}
	}
`)
