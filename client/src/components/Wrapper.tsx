import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface WrapperProps {
	children: ReactNode
}

const Wrapper = ({ children }: WrapperProps) => {
	return (
		<Box maxW={'400px'} w={'100%'} mt={8} mx={'auto'}>
			{children}
		</Box>
	)
}

export default Wrapper
