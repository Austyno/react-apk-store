import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './pages/HomeScreen'
import Jumbotron from './components/Jumbotron'
import ProductScreen from './pages/ProductScreen'

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Header />
				{/* <Jumbotron /> */}
				<main>

						<Switch>
							<Route exact={true} path='/' component={HomeScreen} />
							<Route exact={true} path='/product/:id' component={ProductScreen} />
						</Switch>

				</main>
				<Footer />
			</BrowserRouter>
		</>
	)
}

export default App
