import {
	POST_LIST_REQUEST,
	POST_LIST_SUCCESS,
	POST_LIST_FAIL,
	POST_SINGLE_SUCCESS,
	POST_SINGLE_REQUEST,
	POST_SINGLE_FAIL,
} from '../constants/postConstants'
import axios from 'axios'

export const listAllPosts = () => async (dispatch) => {
	try {
		dispatch({ type: POST_LIST_REQUEST })

		const res = await axios.get('/api/posts')

		const data = res.data.data

		dispatch({
			type: POST_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: POST_LIST_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const singlePost = (id) => async (dispatch) => {
	try {
		dispatch({
			type: POST_SINGLE_REQUEST,
		})

		const res = await axios.get(`/api/posts/${id}`)

		const data = res.data.data

		dispatch({
			type: POST_SINGLE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: POST_SINGLE_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}
