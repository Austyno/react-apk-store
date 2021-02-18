import {
	USER_AUTH_START,
	USER_AUTH_SUCCESS,
	USER_AUTH_FAIL,
	RESET,
	USER_REGISTER_START,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_AUTH_START:
			return {
				loading: true,
			}
		case USER_AUTH_SUCCESS:
			return {
				userInfo: action.payload,
				success: true,
			}
		case USER_AUTH_FAIL:
			return {
				error: action.payload,
			}
		case RESET:
			return {}

		default:
			return state
	}
}
export const userRegisterReducer = (state = { userInfo: {} }, action) => {
	switch (action.type) {
		case USER_REGISTER_START:
			return { loading: true, userInfo: {} }
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload }
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
