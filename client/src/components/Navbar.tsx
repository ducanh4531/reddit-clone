import { useMutation, useQuery } from '@apollo/client'
import { Link } from '@chakra-ui/next-js'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { MeQuery } from '../gql/graphql'
import { logoutMutationDocument } from '../graphql-client/mutations/logout'
import { meQueryDocument } from '../graphql-client/queries/me'

let Navbar = () => {
	const router = useRouter()
	const { data: dataMe, loading: loadingMe } = useQuery(meQueryDocument)
	const [logoutUser, { loading: loadingLogout }] = useMutation(
		logoutMutationDocument,
		{
			update: (cache, { data: dataLogout }) => {
				if (dataLogout?.logout.valueOf()) {
					cache.writeQuery<MeQuery>({
						query: meQueryDocument,
						data: { me: null }
					})
				}
			}
		}
	)

	const handleLogout = () => {
		router.push('/login')
		logoutUser()
	}

	if (loadingMe) {
		return null
	}

	return (
		<>
			<Box bg={'tan'} p={4}>
				<Flex
					maxW={800}
					justifyContent={'space-between'}
					m={'auto'}
					align={'center'}
				>
					<Link href='/' _hover={{ textDecoration: 'none' }}>
						<Heading>Reddit</Heading>
					</Link>
					<Box>
						{!dataMe?.me ? (
							<>
								<Link
									href='/login'
									_hover={{ textDecoration: 'none' }}
								>
									Login
								</Link>
								<Link
									href='/register'
									m={2}
									_hover={{ textDecoration: 'none' }}
								>
									Register
								</Link>
							</>
						) : (
							<Button
								onClick={handleLogout}
								isLoading={loadingLogout}
							>
								Logout
							</Button>
						)}
					</Box>
				</Flex>
			</Box>
		</>
	)
}

export default Navbar
