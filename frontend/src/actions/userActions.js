import axios from 'axios'
import {
	USER_AUTH_START,
	USER_AUTH_SUCCESS,
	USER_AUTH_FAIL,
	USER_REGISTER_START,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	RESET,
	ALL_USERS_REQUEST,
	ALL_USERS_SUCCESS,
	ALL_USERS_FAIL,
	CHANGE_ROLE_REQUEST,
	CHANGE_ROLE_SUCCESS,
	CHANGE_ROLE_FAIL,
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_AUTH_START })

		const authData = {
			email,
			password,
		}

		await axios.post(`/api/users/login`, authData).then((resp) => {
			const loginDetails = { userInfo: resp.data }

			localStorage.setItem('userInfo', JSON.stringify(loginDetails))
			dispatch({
				type: USER_AUTH_SUCCESS,
				payload: resp.data,
			})
		})
	} catch (error) {
		dispatch({
			type: USER_AUTH_FAIL,
			payload: error.message,
		})
	}
}

export const register = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_START })

		const registerData = {
			email,
			password,
		}

		const res = await axios.post(`/api/users/register`, registerData)
		const data = res.data

		localStorage.setItem('userInfo', JSON.stringify(data))

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const LogoutUser = () => (dispatch) => {
	localStorage.removeItem('userInfo')

	dispatch({
		type: RESET,
	})
}

export const getAllUsers = () => async (dispatch, getState) => {
	dispatch({
		type: ALL_USERS_REQUEST,
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
		const res = await axios.get('/api/users', config)

		const data = res.data.data

		dispatch({
			type: ALL_USERS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ALL_USERS_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const changePermission = (id) => async (dispatch, getState) => {
	dispatch({
		type: CHANGE_ROLE_REQUEST,
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
		const res = await axios.put(`/api/users/${id}/changerole`, {}, config)

		dispatch({
			type: CHANGE_ROLE_SUCCESS,
			payload: res.data.data,
		})
	} catch (error) {
		dispatch({
			type: CHANGE_ROLE_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}
