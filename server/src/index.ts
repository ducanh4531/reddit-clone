require('dotenv').config()
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { DataSource } from 'typeorm'
import { COOKIE_NAME, __prod__ } from './constants'
import { Post } from './entities/Post'
import { User } from './entities/User'
import { HelloResolver } from './resolvers/hello'
import { PostResolver } from './resolvers/post'
import { UserResolver } from './resolvers/user'
import { Context } from './types/Context'

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
const mongoUrl = `mongodb+srv://${process.env.SESSION_DB_USERNAME_DEV_PROD}:${process.env.SESSION_DB_PASSWORD_DEV_PROD}@reddit.mvqf7dm.mongodb.net/?retryWrites=true&w=majority`

const main = async () => {
	await dataSource.initialize()

	const app = express()

	app.use(
		cors({
			origin: 'http://localhost:3000',
			credentials: true
		})
	)

	// Session/Cookie store
	await mongoose.connect(mongoUrl)

	app.use(
		session({
			name: COOKIE_NAME,
			store: MongoStore.create({ mongoUrl }),
			cookie: {
				maxAge: 1000 * 60, // one min, 1000 * 60 * 60 one hour
				httpOnly: true, // JS frontend side cannot access the cookie
				secure: __prod__, // cookie only works in https
				sameSite: 'lax' // protection against CSRF
			},
			secret: process.env.SESSION_SECRET_DEV_PROD as string,
			saveUninitialized: false, // do not save empty sessions, right from the start
			resave: false
		})
	)

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, UserResolver, PostResolver],
			validate: false
		}),
		context: ({ req, res }): Context => ({ req, res }),
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
