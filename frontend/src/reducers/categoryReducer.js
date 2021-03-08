import {
	ADD_CATEGORY_FAIL,
	ADD_CATEGORY_REQUEST,
	ADD_CATEGORY_SUCCESS,
	ADMIN_CATEGORY_FAIL,
	ADMIN_CATEGORY_REQUEST,
	ADMIN_CATEGORY_SUCCESS,
	ALL_CATEGORY_FAIL,
	ALL_CATEGORY_REQUEST,
	ALL_CATEGORY_SUCCESS,
	DELETE_CATEGORY_FAIL,
	DELETE_CATEGORY_REQUEST,
	DELETE_CATEGORY_SUCCESS,
	EDIT_CATEGORY_REQUEST,
	EDIT_CATEGORY_SUCCESS,
	POST_EDIT_CATEGORY_FAIL,
	POST_EDIT_CATEGORY_REQUEST,
	POST_EDIT_CATEGORY_SUCCESS,
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

export const adminCategoryReducer = (state = { categories: [] }, action) => {
	switch (action.type) {
		case ADMIN_CATEGORY_REQUEST:
			return { loading: true }
		case ADMIN_CATEGORY_SUCCESS:
			return { loading: false, categories: action.payload }
		case ADMIN_CATEGORY_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const createCategoryReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_CATEGORY_REQUEST:
			return { loading: true }
		case ADD_CATEGORY_SUCCESS:
			return { loading: false, success: true }
		case ADD_CATEGORY_FAIL:
			return { loading: false }
		default:
			return state
	}
}

export const editCategoryReducer = (state = { cat: {} }, action) => {
	switch (action.type) {
		case EDIT_CATEGORY_REQUEST:
			return { loading: true, cat: {} }
		case EDIT_CATEGORY_SUCCESS:
			return { loading: false, cat: action.payload }
		default:
			return state
	}
}

export const postCategoryEdit = (state = {}, action) => {
	switch (action.type) {
		case POST_EDIT_CATEGORY_REQUEST:
			return { loading: true }
		case POST_EDIT_CATEGORY_SUCCESS:
			return { loading: false, success: true }
		case POST_EDIT_CATEGORY_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const deleteCategoryReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_CATEGORY_REQUEST:
			return { loading: true }
		case DELETE_CATEGORY_SUCCESS:
			return { loading: false, success: true }
		case DELETE_CATEGORY_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
