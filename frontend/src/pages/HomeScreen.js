import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Product from '../components/Product'
import Jumbotron from '../components/Jumbotron'

const HomeScreen = () => {
	const dispatch = useDispatch()
	const productList = useSelector((state) => state.productList)

	const { loading, error, products } = productList

	useEffect(() => {
		dispatch(listProducts())
	}, [dispatch])

	console.log(products)
	return (
		<>
			{loading ? (
				'Loading....'
			) : error ? (
				<h3>{error}</h3>
			) : (
				<>
					<Jumbotron />
					<Container>
						<Row>
							{products.map((product) => (
								<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
									<Product product={product} />
								</Col>
							))}
						</Row>
					</Container>
				</>
			)}
		</>
	)
}

export default HomeScreen
