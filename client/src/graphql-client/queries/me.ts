import { graphql } from '../../gql'

export const meQueryDocument = graphql(`
	query Me {
		me {
			...UserInfo
		}
	}
`)
