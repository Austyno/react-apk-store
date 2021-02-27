import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../actions/productActions'
import Rating from '../components/Rating'
import Product from '../components/Product'
import Reviews from '../components/Review'
import Loader from '../components/Loader'
import axios from 'axios'
// import { Redirect } from 'react-router-dom'

import {
	Row,
	Col,
	Card,
	ListGroup,
	ListGroupItem,
	Button,
	Container,
} from 'react-bootstrap'
// import image from '../images/war_machines_1611642250300_logo.png'

const ProductScreen = ({ history, match }) => {
	const dispatch = useDispatch()
	const productState = useSelector((state) => state.productDetails)

	const { loading, error, product } = productState

	const similar = useSelector((state) => state.similarProducts)

	const { products: similarProducts } = similar

	const productReviews = useSelector((state) => state.productReviews)

	const {
		loading: reviewsLoading,
		error: reviewsError,
		reviews,
	} = productReviews

	useEffect(() => {
		dispatch(fetchProduct(match.params.id))
	}, [dispatch, match])

	const download = async () => {
		const user = JSON.parse(localStorage.getItem('userInfo'))

		if (!user) {
			return history.push(`/login/${match.params.id}`)
		}

		await axios.get(`/api/download/${product._id}`)
	}

	return (
		<>
			{loading ? (
				'loading...'
			) : error ? (
				<h3>{error}</h3>
			) : (
				<>
					<Container>
						<Row>
							<Col md={8}>
								<Card className='my-3 p-3 rounded productCard card animate__animated animate__fadeInUp'>
									<Card.Title>
										<Row>
											<Col md={4}>
												<Card.Img
													className='ml-3'
													src={product.logo && `${product.logo}`}
													style={{ width: '150px' }}
												/>
											</Col>
											<Col md={4}>
												<h3>{product.name}</h3>
												<Rating
													value={product.averageRating}
													text={`${
														product.numReviews ? product.numReviews : 0
													} reviews`}
												/>
											</Col>
											<Col md={4}>
												<ListGroup variant='flush'>
													<ListGroupItem>
														{product.price === 0 ? (
															<Button
																onClick={download}
																className='btn btn-primary'>
																Download
															</Button>
														) : (
															<>
																<h3>${product.price}</h3>
																<Button className='btn btn-primary'>
																	ADD TO CART
																</Button>
															</>
														)}
													</ListGroupItem>
													<ListGroupItem>
														<Card.Subtitle>
															Current Version: {product.version}
														</Card.Subtitle>
													</ListGroupItem>
													{product.googlePlayLink && (
														<ListGroupItem>
															{product.googlePlayLink}
														</ListGroupItem>
													)}
													<ListGroupItem>
														<Card.Subtitle>
															Category:{' '}
															{product.category &&
																product.category.categoryName}
														</Card.Subtitle>
													</ListGroupItem>
													<ListGroupItem>
														<Card.Subtitle>
															Total Downloads:{' '}
															{product.totalDownloads && product.totalDownloads}
														</Card.Subtitle>
													</ListGroupItem>
												</ListGroup>
											</Col>
										</Row>
									</Card.Title>
									<Card.Body>
										{/* add slider here if needed */}
										<Card.Text as='div' className='py-5 '>
											{product.description}
										</Card.Text>
										<hr />
										<Card.Text className='mb-3' as='h3'>
											{reviews.length > 0 && `${reviews.length} Reviews`}
										</Card.Text>
										{reviews.length === 0 && (
											<h4 style={{ textAlign: 'center' }}>No Reviews</h4>
										)}

										{reviewsLoading ? (
											<Loader />
										) : reviewsError ? (
											<h4>{reviewsError}</h4>
										) : (
											reviews &&
											reviews.map((r, index) => (
												<Reviews key={index} review={r} />
											))
										)}
									</Card.Body>
								</Card>
							</Col>
							<Col md={4}>
								<Card className='my-3 p-3 rounded productCard card animate__animated animate__fadeInUp'>
									<Card.Title>Similar Apps</Card.Title>
									<Row>
										{similarProducts &&
											similarProducts.map((p) => (
												<Col key={p._id} md={6}>
													<Product product={p} />
												</Col>
											))}
									</Row>
								</Card>
							</Col>
						</Row>
					</Container>
				</>
			)}
		</>
	)
}

export default ProductScreen
