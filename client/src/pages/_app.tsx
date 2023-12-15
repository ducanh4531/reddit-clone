import { ChakraProvider } from '@chakra-ui/react'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { AppProps } from 'next/app'
import theme from '../theme'

const PORT = process.env.PORT || 4000

const client = new ApolloClient({
	uri: `http://localhost:${PORT}/graphql`,
	cache: new InMemoryCache(),
	credentials: 'include'
})

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</ApolloProvider>
	)
}

export default MyApp
