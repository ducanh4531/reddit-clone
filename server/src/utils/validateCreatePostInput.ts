import { CreatePostInput } from '../types/createPostInput'

export const validateCreatePostInput = ({ title, body }: CreatePostInput) => {
	if (title.length <= 2) {
		return {
			message: 'Invalid title',
			errors: [
				{
					field: 'title',
					message: 'Length must be greater than 2'
				}
			]
		}
	}

	if (body.length <= 2) {
		return {
			message: 'Invalid body',
			errors: [
				{
					field: 'body',
					message: 'Length must be greater than 2'
				}
			]
		}
	}

	return null
}
