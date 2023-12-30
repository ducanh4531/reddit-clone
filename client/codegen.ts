import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://localhost:4000/graphql',
	documents: ['src/graphql-client/**/*.ts'],
	generates: {
		'./src/gql/': {
			preset: 'client'
		}
	}
}

export default config
