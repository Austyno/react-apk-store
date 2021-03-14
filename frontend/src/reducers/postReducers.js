import {
	ALL_POST_FAIL,
	ALL_POST_REQUEST,
	ALL_POST_SUCCESS,
	DELETE_POST_FAIL,
	DELETE_POST_REQUEST,
	DELETE_POST_SUCCESS,
	EDIT_POST_FAIL,
	EDIT_POST_REQUEST,
	EDIT_POST_SUCCESS,
	POST_LIST_FAIL,
	POST_LIST_REQUEST,
	POST_LIST_SUCCESS,
	POST_SINGLE_FAIL,
	POST_SINGLE_REQUEST,
	POST_SINGLE_SUCCESS,
	EDIT_POST_RESET,
	UPDATE_POST_REQUEST,
	UPDATE_POST_SUCCESS,
	UPDATE_POST_FAIL,
	UPDATE_POST_RESET,
	CREATE_POST_REQUEST,
	CREATE_POST_SUCCESS,
	CREATE_POST_FAIL,
} from '../constants/postConstants'

export const allPostReducer = (state = { posts: [] }, action) => {
	switch (action.type) {
		case POST_LIST_REQUEST:
			return { loading: true, posts: [] }
		case POST_LIST_SUCCESS:
			return { loading: false, posts: action.payload }
		case POST_LIST_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const singlePostReducer = (state = { post: {} }, action) => {
	switch (action.type) {
		case POST_SINGLE_REQUEST:
			return { loading: true, post: {} }
		case POST_SINGLE_SUCCESS:
			return { loading: false, post: action.payload }
		case POST_SINGLE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const getAllPostAdminReducer = (state = { allPost: [] }, action) => {
	switch (action.type) {
		case ALL_POST_REQUEST:
			return { loading: true, posts: [] }
		case ALL_POST_SUCCESS:
			return { loading: false, posts: action.payload }
		case ALL_POST_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const deletePostReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_POST_REQUEST:
			return { loading: true }
		case DELETE_POST_SUCCESS:
			return { loading: false, success: true }
		case DELETE_POST_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const editPostReducer = (state = { post: {} }, action) => {
	switch (action.type) {
		case EDIT_POST_REQUEST:
			return { loading: true }
		case EDIT_POST_SUCCESS:
			return { loading: false, post: action.payload }
		case EDIT_POST_FAIL:
			return { loading: false, error: action.payload }
		case EDIT_POST_RESET:
			return {}
		default:
			return state
	}
}

export const updatePostReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_POST_REQUEST:
			return { loading: true }
		case UPDATE_POST_SUCCESS:
			return { loading: false, success: true }
		case UPDATE_POST_FAIL:
			return { loading: false }
		case UPDATE_POST_RESET:
			return {}
		default:
			return state
	}
}

export const createPostReducer = (state = {},action) => {
	switch (action.type) {
		case CREATE_POST_REQUEST:
			return { loading: true }
		case CREATE_POST_SUCCESS:
			return { loading: false, success: true }
		case CREATE_POST_FAIL:
			return { loading: false }
		default:
			return state
	}

}
