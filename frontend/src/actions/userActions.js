import axios from 'axios'
import {
	USER_AUTH_START,
	USER_AUTH_SUCCESS,
	USER_AUTH_FAIL,
	USER_REGISTER_START,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_AUTH_START })

		const authData = {
			email,
			password,
		}

		await axios.post(`/api/auth/login`, authData).then((resp) => {
			const authData = resp.data.userData
			const token = resp.data.token

			const userInfo = {
				...authData,
				token,
			}

			localStorage.setItem('userInfo', JSON.stringify(userInfo))
			dispatch({
				type: USER_AUTH_SUCCESS,
				payload: userInfo,
			})
		})
	} catch (error) {
		dispatch({
			type: USER_AUTH_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const register = (username, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_START })

		const registerData = {
			username,
			password,
		}

		const res = await axios.post(`/api/users/register`, registerData)
		const data = res.data

		localStorage.setItem('userInfo',JSON.stringify(data))

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
