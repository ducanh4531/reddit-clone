require('dotenv').config()
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { DataSource } from 'typeorm'
import { Post } from './entities/Post'
import { User } from './entities/User'
import { HelloResolver } from './resolvers/hello'
import { UserResolver } from './resolvers/user'

const dataSource = new DataSource({
	type: 'postgres',
	database: 'reddit',
	username: process.env.DB_USERNAME_DEV,
	password: process.env.DB_PASSWORD_DEV,
	logging: true,
	synchronize: true,
	entities: [User, Post]
})

const PORT = process.env.PORT || 4000

const main = async () => {
	await dataSource.initialize()

	const app = express()

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, UserResolver],
			validate: false
		}),
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
	})

	await apolloServer.start()

	apolloServer.applyMiddleware({ app, cors: false })

	app.listen(PORT, () =>
		console.log(
			`Server started on port ${PORT}. GraphQL server is now running on http://localhost:${PORT}${apolloServer.graphqlPath}`
		)
	)
}

main().catch((error) => console.log(error))
