import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
	productListReducer,
	productDetailsReducer,
	similarProductsReducer,
	productReviewsReducer,
} from './reducers/productReducers'

import {
	userLoginReducer,
	userRegister,
	userList,
	userDelete,
	userUpdate,
	getUser,
	forgotPassword,
	resetPassword,
} from './reducers/userReducers'

const reducers = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	similarProducts: similarProductsReducer,
	productReviews: productReviewsReducer,
	userLogin: userLoginReducer,
})
const initialState = {}
const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(thunk))
)

export default store
