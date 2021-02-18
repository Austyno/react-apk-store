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
