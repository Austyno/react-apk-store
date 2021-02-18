import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
	productListReducer,
	productDetailsReducer,
	similarProductsReducer,
	productReviewsReducer,
	listCategoriesAndProductsReducer,
} from './reducers/productReducers'

import {
	userLoginReducer,
	userList,
	userDelete,
	userUpdate,
	getUser,
	forgotPassword,
	resetPassword,
	userRegisterReducer,
} from './reducers/userReducers'

import { allPostReducer, singlePostReducer } from './reducers/postReducers'

const reducers = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	similarProducts: similarProductsReducer,
	productReviews: productReviewsReducer,
	userLogin: userLoginReducer,
	categoriesAndProductsList: listCategoriesAndProductsReducer,
	allPost: allPostReducer,
	singlePost: singlePostReducer,
	register: userRegisterReducer,
})
const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null
const initialState = {
	userInfo: userInfoFromStorage,
}
const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(thunk))
)

export default store
