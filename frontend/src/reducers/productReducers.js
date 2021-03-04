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
	EDIT_PRODUCT_RESET,
	ADMIN_APPROVE_REQUEST,
	ADMIN_APPROVE_SUCCESS,
	ADMIN_APPROVE_FAIL,
} from '../constants/productConstants'
export const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { loading: true, products: [] }
		case PRODUCT_LIST_SUCCESS:
			return { loading: false, products: action.payload }
		case PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const productDetailsReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case PRODUCT_FETCH_REQUEST:
			return { loading: true, product: {} }
		case PRODUCT_FETCH_SUCCESS:
			return { loading: false, product: action.payload }
		case PRODUCT_FETCH_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
export const similarProductsReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case SIMILAR_PRODUCT_REQUEST:
			return { loading: true, products: [] }
		case SIMILAR_PRODUCT_SUCCESS:
			return { loading: false, products: action.payload }
		case SIMILAR_PRODUCT_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const productReviewsReducer = (state = { reviews: [] }, action) => {
	switch (action.type) {
		case PRODUCT_REVIEWS_REQUEST:
			return { loading: true, reviews: [] }
		case PRODUCT_REVIEWS_SUCCESS:
			return { loading: false, reviews: action.payload }
		case PRODUCT_REVIEWS_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

//GET all categories and their products for display on home page
export const listCategoriesAndProductsReducer = (
	state = { categoriesAndProducts: [] },
	action
) => {
	switch (action.type) {
		case PRODUCT_CATEGORY_REQUEST:
			return { loading: true, categoriesAndProducts: [] }
		case PRODUCT_CATEGORY_SUCCESS:
			return { loading: false, categoriesAndProducts: action.payload }
		case PRODUCT_CATEGORY_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const editorsChoiceReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case EDITORS_CHOICE_REQUEST:
			return { loading: true, products: [] }
		case EDITORS_CHOICE_SUCCESS:
			return { loading: false, products: action.payload }
		case EDITORS_CHOICE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const getAllAppsReducer = (state = { allApps: [] }, action) => {
	switch (action.type) {
		case ALL_APPS_REQUEST:
			return { loading: true, allApps: [] }
		case ALL_APPS_SUCCESS:
			return { loading: false, allApps: action.payload }
		case ALL_APPS_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const getAdminAppsReducer = (state = { adminApps: [] }, action) => {
	switch (action.type) {
		case ADMIN_APPS_REQUEST:
			return { loading: true, adminApps: [] }
		case ADMIN_APPS_SUCCESS:
			return { loading: false, adminApps: action.payload }
		case ADMIN_APPS_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const editProductReducer = (state = {}, action) => {
	switch (action.type) {
		case EDIT_PRODUCT_REQUEST:
			return {
				loading: true,
			}
		case EDIT_PRODUCT_SUCCESS:
			return {
				success: true,
			}
		case EDIT_PRODUCT_FAIL:
			return {
				error: action.payload,
			}
		case EDIT_PRODUCT_RESET:
			return {}
		default:
			return state
	}
}

export const approveProductReducer = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_APPROVE_REQUEST:
			return { loading: true }
		case ADMIN_APPROVE_SUCCESS:
			return { loading: false, success: true }
		case ADMIN_APPROVE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
