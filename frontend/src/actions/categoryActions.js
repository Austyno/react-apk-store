import axios from 'axios'
import {
	ALL_CATEGORY_REQUEST,
	ALL_CATEGORY_SUCCESS,
	ALL_CATEGORY_FAIL,
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
