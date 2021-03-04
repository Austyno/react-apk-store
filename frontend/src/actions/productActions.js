import axios from 'axios'
import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_FETCH_REQUEST,
	PRODUCT_FETCH_SUCCESS,
	PRODUCT_FETCH_FAIL,
	SIMILAR_PRODUCT_REQUEST,
	SIMILAR_PRODUCT_SUCCESS,
	SIMILAR_PRODUCT_FAIL,
	PRODUCT_REVIEWS_REQUEST,
	PRODUCT_REVIEWS_SUCCESS,
	PRODUCT_REVIEWS_FAIL,
	PRODUCT_CATEGORY_REQUEST,
	PRODUCT_CATEGORY_SUCCESS,
	PRODUCT_CATEGORY_FAIL,
	EDITORS_CHOICE_REQUEST,
	EDITORS_CHOICE_SUCCESS,
	EDITORS_CHOICE_FAIL,
	ALL_APPS_REQUEST,
	ALL_APPS_SUCCESS,
	ALL_APPS_FAIL,
	ADMIN_APPS_REQUEST,
	ADMIN_APPS_SUCCESS,
	ADMIN_APPS_FAIL,
	EDIT_PRODUCT_REQUEST,
	EDIT_PRODUCT_SUCCESS,
	EDIT_PRODUCT_FAIL,
	ADMIN_APPROVE_REQUEST,
	ADMIN_APPROVE_SUCCESS,
	ADMIN_APPROVE_FAIL,
} from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_LIST_REQUEST,
		})

		const response = await axios.get(`/api/products`)
		const data = response.data.data

		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const fetchProduct = (id) => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_FETCH_REQUEST,
		})

		const res = await axios.get(`/api/products/${id}`)

		const data = res.data.data

		//get similar products
		if (data.category) {
			dispatch(similarProducts(data.category._id))
		}

		//get reviews for this product
		if (data._id) {
			dispatch(productReviews(data._id))
		}

		dispatch({
			type: PRODUCT_FETCH_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_FETCH_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const similarProducts = (catId) => async (dispatch) => {
	try {
		dispatch({ type: SIMILAR_PRODUCT_REQUEST })

		const res = await axios.get(`/api/category/${catId}`)

		const data = res.data.data

		dispatch({
			type: SIMILAR_PRODUCT_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: SIMILAR_PRODUCT_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const productReviews = (id) => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_REVIEWS_REQUEST,
		})

		const res = await axios.get(`/api/reviews/${id}`)

		const data = res.data.data

		dispatch({
			type: PRODUCT_REVIEWS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_REVIEWS_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const listCategoriesAndProducts = () => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_CATEGORY_REQUEST,
		})

		const res = await axios.get(`/api/category`)

		const data = res.data.data

		dispatch({
			type: PRODUCT_CATEGORY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_CATEGORY_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		})
	}
}

export const getEditorsChoice = () => async (dispatch) => {
	try {
		dispatch({
			type: EDITORS_CHOICE_REQUEST,
		})

		const res = await axios.get('/api/products/editor')

		const data = res.data.data

		dispatch({
			type: EDITORS_CHOICE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: EDITORS_CHOICE_FAIL,
			payload: error.message,
		})
	}
}

export const getAllApps = () => async (dispatch) => {
	try {
		dispatch({
			type: ALL_APPS_REQUEST,
		})

		const res = await axios.get('/api/products/apps')

		const data = res.data.data

		dispatch({
			type: ALL_APPS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ALL_APPS_FAIL,
			payload: error.response.data.error,
		})
	}
}

export const getAdminApps = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ADMIN_APPS_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const res = await axios.get('/api/products/admin/apps', config)

		const data = res.data.data

		dispatch({
			type: ADMIN_APPS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ADMIN_APPS_FAIL,
			payload: error.response.data.error,
		})
	}
}

export const editProduct = (id, editData) => async (dispatch, getState) => {
	dispatch({
		type: EDIT_PRODUCT_REQUEST,
	})

	const {
		userLogin: { userInfo },
	} = getState()

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`,
		},
	}

	try {
		await axios.put(`/api/products/${id}`, editData, config).then((resp) => {
			dispatch({
				type: EDIT_PRODUCT_SUCCESS,
				payload: 'Product updated successfully',
			})
		})
	} catch (error) {
		dispatch({
			type: EDIT_PRODUCT_FAIL,
			payload: error.response.data.error,
		})
	}
}

export const approveProduct = (id) => async (dispatch, getState) => {
	dispatch({
		type: ADMIN_APPROVE_REQUEST,
	})

	const {
		userLogin: { userInfo },
	} = getState()

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`,
		},
	}

	try {
		const res = await axios.put(`/api/products/${id}/approve`, {}, config)

		const data = res.data.data

		dispatch({
			type: ADMIN_APPROVE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ADMIN_APPROVE_FAIL,
			payload: error.response.data.error,
		})
	}
}
