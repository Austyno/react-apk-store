import {
	USER_AUTH_START,
	USER_AUTH_SUCCESS,
	USER_AUTH_FAIL,
	RESET,
	USER_REGISTER_START,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	ALL_USERS_REQUEST,
	ALL_USERS_SUCCESS,
	ALL_USERS_FAIL,
	CHANGE_ROLE_REQUEST,
	CHANGE_ROLE_SUCCESS,
	CHANGE_ROLE_FAIL,
} from '../constants/userConstants'

export const userLoginReducer = (state = { userInfo: {} }, action) => {
	switch (action.type) {
		case USER_AUTH_START:
			return {
				loading: true,
				userInfo: {},
			}
		case USER_AUTH_SUCCESS:
			return {
				loading: false,
				userInfo: action.payload,
			}
		case USER_AUTH_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case RESET:
			return { userInfo: {} }

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
export const allUsersReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case ALL_USERS_REQUEST:
			return { loading: true, users: [] }
		case ALL_USERS_SUCCESS:
			return { loading: false, users: action.payload }
		case ALL_USERS_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const changeUserRoleReducer = (state = {}, action) => {
	switch (action.type) {
		case CHANGE_ROLE_REQUEST:
			return { loading: true }
		case CHANGE_ROLE_SUCCESS:
			return { loading: false, success: true }
		case CHANGE_ROLE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
