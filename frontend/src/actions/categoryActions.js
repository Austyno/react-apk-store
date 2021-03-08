import axios from 'axios'
import {
	ALL_CATEGORY_REQUEST,
	ALL_CATEGORY_SUCCESS,
	ALL_CATEGORY_FAIL,
	ADMIN_CATEGORY_REQUEST,
	ADMIN_CATEGORY_FAIL,
	ADMIN_CATEGORY_SUCCESS,
	ADD_CATEGORY_REQUEST,
	ADD_CATEGORY_SUCCESS,
	ADD_CATEGORY_FAIL,
	EDIT_CATEGORY_REQUEST,
	EDIT_CATEGORY_SUCCESS,
	EDIT_CATEGORY_FAIL,
	POST_EDIT_CATEGORY_REQUEST,
	POST_EDIT_CATEGORY_SUCCESS,
	POST_EDIT_CATEGORY_FAIL,
	DELETE_CATEGORY_REQUEST,
	DELETE_CATEGORY_SUCCESS,
	DELETE_CATEGORY_FAIL,
} from '../constants/categoryConstants'

export const getAllCategory = () => async (dispatch) => {
	try {
		dispatch({
			type: ALL_CATEGORY_REQUEST,
		})

		const res = await axios.get('/api/category')

		const data = res.data.data

		dispatch({
			type: ALL_CATEGORY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ALL_CATEGORY_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const getAdminCategory = () => async (dispatch, getState) => {
	dispatch({
		type: ADMIN_CATEGORY_REQUEST,
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
		const res = await axios.get('/api/category/admin', config)

		const data = res.data.data

		dispatch({
			type: ADMIN_CATEGORY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ADMIN_CATEGORY_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const createCategory = (cat) => async (dispatch, getState) => {
	dispatch({
		type: ADD_CATEGORY_REQUEST,
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
		const res = await axios.post('/api/category', cat, config)

		const data = res.data.data

		dispatch({
			type: ADD_CATEGORY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ADD_CATEGORY_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const getCategory = (id) => async (dispatch, getState) => {
	dispatch({
		type: EDIT_CATEGORY_REQUEST,
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
		const res = await axios.get(`/api/category/${id}/edit`, config)

		const data = res.data.data

		dispatch({
			type: EDIT_CATEGORY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: EDIT_CATEGORY_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const postCategoryEdit = (id, cat) => async (dispatch, getState) => {
	dispatch({
		type: POST_EDIT_CATEGORY_REQUEST,
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
		const res = await axios.put(`/api/category/${id}`, cat, config)

		const data = res.data.data
		dispatch({
			type: POST_EDIT_CATEGORY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: POST_EDIT_CATEGORY_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const deleteCategory = (id) => async (dispatch, getState) => {
	dispatch({
		type: DELETE_CATEGORY_REQUEST,
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
		const res = await axios.delete(`/api/category/${id}`, config)

		const data = res.data.data

		dispatch({
			type: DELETE_CATEGORY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: DELETE_CATEGORY_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}
