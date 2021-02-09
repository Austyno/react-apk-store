import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Col, Row } from 'react-bootstrap'
import Rating from './Rating'
import 'animate.css'

const Product = ({ product }) => {
	return (
		<>
			<Card.Body className='my-2 p-3 productCard card animate__animated animate__fadeInUp'>
				<Row>
					<Col md={6}>
						<Link to={`/product/${product._id}`}>
							<Card.Img
								variant='flush'
								src={product.logo && `${product.logo}`}
								style={{ height: '70px', width: 'auto' }}
							/>
						</Link>
					</Col>
					<Col md={6}>
						<Row>
							<Link to={`/product/${product._id}`}>
								<Card.Title as='div'>
									<strong>{product.name}</strong>
								</Card.Title>
							</Link>
						</Row>
						<Row>
							<Card.Text as='div'>
								<Rating
									value={product.averageRating}
									// text={`${
									// 	product.numReviews ? product.numReviews : 0
									// } reviews`}
								/>
							</Card.Text>
						</Row>
						<Row></Row>
					</Col>
					{/* <Link
						to={`/product/${product._id}`}
						style={{ background: '#EDF3F3' }}>
						<button type='button' className='btn btn-sm btn-block'>
							Download
						</button>
					</Link> */}
				</Row>
			</Card.Body>
		</>
	)
}

export default Product
