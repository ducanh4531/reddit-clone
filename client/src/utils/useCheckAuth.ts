import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { meQueryDocument } from '../graphql-client/queries/me'

const useCheckAuth = () => {
	const router = useRouter()
	const { data: dataMe, loading } = useQuery(meQueryDocument)

	useEffect(() => {
		if (
			!loading &&
			dataMe?.me &&
			['/login', '/register'].some((path) => router.asPath.includes(path))
		) {
			router.replace('/')
		}
	}, [dataMe?.me])

	return { dataMe, loading }
}

export default useCheckAuth
