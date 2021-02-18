import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './pages/HomeScreen'
import ProductScreen from './pages/ProductScreen'
import LoginScreen from './pages/LoginScreen'
import PostScreen from './pages/PostScreen'
import SinglePostScreen from './pages/SinglePostScreen'

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Header />
				<main className='mr-3 ml-3'>
					<Switch>
						<Route exact={true} path='/' component={HomeScreen} />
						<Route exact={true} path='/product/:id' component={ProductScreen} />
						<Route exact={true} path='/post' component={PostScreen} />
						<Route exact={true} path='/post/:id' component={SinglePostScreen} />
						<Route exact={true} path='/login/:id?' component={LoginScreen} />
					</Switch>
				</main>
				{/* </Container> */}
				<Footer />
			</BrowserRouter>
		</>
	)
}

export default App
