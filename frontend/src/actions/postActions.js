import {
	POST_LIST_REQUEST,
	POST_LIST_SUCCESS,
	POST_LIST_FAIL,
	POST_SINGLE_SUCCESS,
	POST_SINGLE_REQUEST,
	POST_SINGLE_FAIL,
	ALL_POST_REQUEST,
	ALL_POST_SUCCESS,
	ALL_POST_FAIL,
	DELETE_POST_SUCCESS,
	DELETE_POST_REQUEST,
	DELETE_POST_FAIL,
	EDIT_POST_REQUEST,
	EDIT_POST_SUCCESS,
	EDIT_POST_FAIL,
	UPDATE_POST_REQUEST,
	UPDATE_POST_SUCCESS,
	UPDATE_POST_FAIL,
	CREATE_POST_REQUEST,
	CREATE_POST_SUCCESS,
	CREATE_POST_FAIL,
} from '../constants/postConstants'
import axios from 'axios'

import useHeaders from '../hooks/useHeaders'

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
export const getAllPostAdmin = () => async (dispatch, getState) => {
	dispatch({
		type: ALL_POST_REQUEST,
	})

	const userLogin = getState().userLogin
	const {
		userInfo: { token },
	} = userLogin

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	try {
		const res = await axios.get('/api/posts/admin', config)

		const data = res.data.data

		dispatch({
			type: ALL_POST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ALL_POST_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const deletePost = (id) => async (dispatch, getState) => {
	dispatch({ type: DELETE_POST_REQUEST })

	const userLogin = getState().userLogin
	const {
		userInfo: { token },
	} = userLogin

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	try {
		const res = await axios.delete(`/api/posts/admin/${id}`, config)

		const data = res.data.data

		dispatch({
			type: DELETE_POST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: DELETE_POST_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}
export const editPost = (id) => async (dispatch, getState) => {
	dispatch({
		type: EDIT_POST_REQUEST,
	})

	const userLogin = getState().userLogin
	const {
		userInfo: { token },
	} = userLogin

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
	try {
		const res = await axios.get(`/api/posts/${id}/edit`, config)
		const data = res.data.data

		dispatch({
			type: EDIT_POST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: EDIT_POST_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}
export const updatePost = (id, post) => async (dispatch, getState) => {
	dispatch({
		type: UPDATE_POST_REQUEST,
	})

	const userLogin = getState().userLogin
	const {
		userInfo: { token },
	} = userLogin

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	try {
		const res = await axios.put(`/api/posts/${id}/edit`, post, config)
		const data = res.data.data

		dispatch({
			type: UPDATE_POST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: UPDATE_POST_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const createPost = (postData) => async (dispatch, getState) => {
	dispatch({
		type: CREATE_POST_REQUEST,
	})

	const userLogin = getState().userLogin
	const {
		userInfo: { token },
	} = userLogin

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	try {
		const res = await axios.post('/api/posts', postData, config)

		const data = res.data.data

		dispatch({
			type: CREATE_POST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: CREATE_POST_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}
