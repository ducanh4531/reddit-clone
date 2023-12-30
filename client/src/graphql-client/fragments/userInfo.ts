import { graphql } from '../../gql'

export const UserInfoFragment = graphql(`
	fragment UserInfo on User {
		id
		username
		email
	}
`)
