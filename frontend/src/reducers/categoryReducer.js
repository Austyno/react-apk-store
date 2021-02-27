import {
	ALL_CATEGORY_FAIL,
	ALL_CATEGORY_REQUEST,
	ALL_CATEGORY_SUCCESS,
} from '../constants/categoryConstants'

export const allCategoryReducer = (state = { categories: [] }, action) => {
	switch (action.type) {
		case ALL_CATEGORY_REQUEST:
			return { loading: true, categories: [] }
		case ALL_CATEGORY_SUCCESS:
			return { loading: false, categories: action.payload }
		case ALL_CATEGORY_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
