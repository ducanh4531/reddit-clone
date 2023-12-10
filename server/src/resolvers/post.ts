import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Post } from '../entities/Post'
import { PostMutationResponse } from '../types/PostMutationResponse'
import { CreatePostInput } from '../types/createPostInput'
import { validateCreatePostInput } from '../utils/validateCreatePostInput'

@Resolver()
export class PostResolver {
	@Mutation((_return) => PostMutationResponse)
	async createPost(
		@Arg('createPostInput') createPostInput: CreatePostInput
	): Promise<PostMutationResponse> {
		const validateCreatePostInputError =
			validateCreatePostInput(createPostInput)

		if (validateCreatePostInputError !== null)
			return {
				code: 400,
				success: false,
				...validateCreatePostInputError
			}

		try {
			const { title, body } = createPostInput

			const newPost = Post.create({
				title,
				body
			})

			await newPost.save()

			return {
				code: 200,
				success: true,
				message: 'Post created successfully',
				post: newPost
			}
		} catch (error) {
			console.log(error)
			return {
				code: 500,
				success: false,
				message: `Internal server error ${error.message}`
			}
		}
	}

	@Query((_return) => [Post])
	async posts(): Promise<Array<Post>> {
		return Post.find()
	}

	@Query((_return) => Post, { nullable: true })
	async post(@Arg('id', (_type) => ID) id: number): Promise<Post | null> {
		const existingPost = await Post.findOne({ where: { id } })

		return existingPost
	}
}
