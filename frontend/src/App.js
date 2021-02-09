import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './pages/HomeScreen'
import ProductScreen from './pages/ProductScreen'
import LoginScreen from './pages/LoginScreen'
import  PrivateRoutes from './routes/PrivateRoutes'

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Header />
				<main>
					<Switch>
						<Route exact={true} path='/' component={HomeScreen} />
						<Route exact={true} path='/product/:id' component={ProductScreen} />
						<PrivateRoutes exact={true} path='/login' component={LoginScreen} />
					</Switch>
				</main>
				<Footer />
			</BrowserRouter>
		</>
	)
}

export default App
