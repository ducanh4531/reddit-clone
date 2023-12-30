import { Link } from '@chakra-ui/next-js'
import { Box, Flex, Heading } from '@chakra-ui/react'

let Navbar = () => {
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
						<Link href='/login' _hover={{ textDecoration: 'none' }}>
							Login
						</Link>
						<Link
							href='/register'
							m={2}
							_hover={{ textDecoration: 'none' }}
						>
							Register
						</Link>
						<Link
							href='/logout'
							_hover={{ textDecoration: 'none' }}
						>
							Logout
						</Link>
					</Box>
				</Flex>
			</Box>
		</>
	)
}

export default Navbar
