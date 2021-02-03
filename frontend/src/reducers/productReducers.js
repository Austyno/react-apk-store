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

export const productReducer = (state = { product: {} }, action) => {
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
