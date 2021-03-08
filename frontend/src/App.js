import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './pages/HomeScreen'
import ProductScreen from './pages/ProductScreen'
import LoginScreen from './pages/LoginScreen'
import SignUpScreen from './pages/SignUpScreen'
import PostScreen from './pages/PostScreen'
import SinglePostScreen from './pages/SinglePostScreen'
import AppsScreen from './pages/AppsScreen'
import Logout from './pages/Logout'
import ProductListScreen from './pages/ProductListScreen'
import EditProductScreen from './pages/EditProductScreen'
import CreateProductScreen from './pages/CreateProductScreen'
import AdminRoute from './routes/AdminRoutes'
import CategoryListScreen from './pages/CategoryListScreen'
import CreateCategoryScreen from './pages/CreateCategoryScreen'
import EditCategoryScreen from './pages/EditCategoryScreen'
import UsersListScreen from './pages/UsersListScreen'

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Header />
				<main className='mr-5 ml-5'>
					<Switch>
						<Route exact={true} path='/' component={HomeScreen} />
						<AdminRoute
							exact={true}
							path='/admin/create/product'
							component={CreateProductScreen}
						/>
						<Route exact={true} path='/product/:id' component={ProductScreen} />
						<Route exact={true} path='/post' component={PostScreen} />
						<Route exact={true} path='/post/:id' component={SinglePostScreen} />
						<Route exact={true} path='/login/:id?' component={LoginScreen} />
						<Route
							exact={true}
							path='/register/:id?'
							component={SignUpScreen}
						/>
						<Route exact={true} path='/apps' component={AppsScreen} />
						<Route exact={true} path='/logout' component={Logout} />
						<AdminRoute
							exact={true}
							path='/admin/products'
							component={ProductListScreen}
						/>
						<AdminRoute
							exact={true}
							path='/admin/products/:id/edit'
							component={EditProductScreen}
						/>
						<AdminRoute
							exact={true}
							path='/admin/category'
							component={CategoryListScreen}
						/>
						<AdminRoute
							exact={true}
							path='/admin/category/create'
							component={CreateCategoryScreen}
						/>
						<AdminRoute
							exact={true}
							path='/admin/category/:id/edit'
							component={EditCategoryScreen}
						/>
						<AdminRoute
							exact={true}
							path='/admin/users'
							component={UsersListScreen}
						/>
					</Switch>
				</main>
				{/* </Container> */}
				<Footer />
			</BrowserRouter>
		</>
	)
}
export default App
