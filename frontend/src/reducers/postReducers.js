import {
	POST_LIST_FAIL,
	POST_LIST_REQUEST,
	POST_LIST_SUCCESS,
	POST_SINGLE_FAIL,
	POST_SINGLE_REQUEST,
	POST_SINGLE_SUCCESS,
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

export const singlePostReducer = (state = {post:{}},action) => {
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
