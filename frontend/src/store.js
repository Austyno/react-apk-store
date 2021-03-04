import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
	productListReducer,
	productDetailsReducer,
	similarProductsReducer,
	productReviewsReducer,
	listCategoriesAndProductsReducer,
	editorsChoiceReducer,
	getAllAppsReducer,
	getAdminAppsReducer,
	editProductReducer,
	approveProductReducer,
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

import { allCategoryReducer } from './reducers/categoryReducer'

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
	editorsChoice: editorsChoiceReducer,
	allApps: getAllAppsReducer,
	allCategories: allCategoryReducer,
	allAppsForAdmin: getAdminAppsReducer,
	editedProduct: editProductReducer,
	approveProduct: approveProductReducer
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
