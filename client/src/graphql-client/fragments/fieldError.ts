import { graphql } from '../../gql'

export const FieldErrorFragment = graphql(`
	fragment FieldError on FieldError {
		field
		message
	}
`)
