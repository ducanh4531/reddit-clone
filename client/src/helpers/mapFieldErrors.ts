import { FieldError } from '../gql/graphql'

export const mapFieldErrors = (errors: Array<FieldError>) => {
	return errors.reduce((accumulatedErrorsObj, error) => {
		return { ...accumulatedErrorsObj, [error.field]: error.message }
	}, {})
}
