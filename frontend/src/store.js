import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
	productListReducer,
	productReducer,
	similarProductsReducer,
	productReviewsReducer,
} from './reducers/productReducers'

const reducers = combineReducers({
	productList: productListReducer,
	product: productReducer,
	similarProducts: similarProductsReducer,
	productReviews: productReviewsReducer,
})
const initialState = {}
const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(thunk))
)

export default store
