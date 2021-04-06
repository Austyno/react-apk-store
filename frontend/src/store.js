import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

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
	deleteProductReducer,
	createProductReducer,
} from './reducers/productReducers';

import {
	userLoginReducer,
	userList,
	userDelete,
	userUpdate,
	getUser,
	forgotPassword,
	resetPassword,
	userRegisterReducer,
	allUsersReducer,
	changeUserRoleReducer,
} from './reducers/userReducers';
import {
	sliderListReducer,
	createSliderReducer,
	slideShowReducer,
	deleteSliderReducer,
} from './reducers/sliderReducer';
import {
	allPostReducer,
	singlePostReducer,
	getAllPostAdminReducer,
	deletePostReducer,
	editPostReducer,
	updatePostReducer,
	createPostReducer,
} from './reducers/postReducers';

import {
	allCategoryReducer,
	adminCategoryReducer,
	createCategoryReducer,
	editCategoryReducer,
	postCategoryEdit,
	deleteCategoryReducer,
} from './reducers/categoryReducer';

const reducers = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	similarProducts: similarProductsReducer,
	productReviews: productReviewsReducer,
	deleteProduct: deleteProductReducer,
	createdProduct: createProductReducer,
	userLogin: userLoginReducer,
	allUsers: allUsersReducer,
	changeRole: changeUserRoleReducer,
	categoriesAndProductsList: listCategoriesAndProductsReducer,
	allPost: allPostReducer,
	allPostAdmin: getAllPostAdminReducer,
	createPost: createPostReducer,
	editPost: editPostReducer,
	updatePost: updatePostReducer,
	deletePost: deletePostReducer,
	singlePost: singlePostReducer,
	register: userRegisterReducer,
	editorsChoice: editorsChoiceReducer,
	allApps: getAllAppsReducer,
	allCategories: allCategoryReducer,
	adminCategory: adminCategoryReducer,
	createCategory: createCategoryReducer,
	editCategory: editCategoryReducer,
	postCategoryEdit: postCategoryEdit,
	deleteCategory: deleteCategoryReducer,
	allAppsForAdmin: getAdminAppsReducer,
	editedProduct: editProductReducer,
	approveProduct: approveProductReducer,
	sliderList: sliderListReducer,
	createSlider: createSliderReducer,
	slideShow: slideShowReducer,
	deleteSlide: deleteSliderReducer,
});
const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: '';
const initialState = {
	userLogin: userInfoFromStorage,
};
const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
