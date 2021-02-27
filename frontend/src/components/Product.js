import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Col, Row, Button } from 'react-bootstrap'
import Rating from './Rating'
import 'animate.css'

const Product = ({ product }) => {
	return (
		<>
			{/* <Card.Body className=' productCard card'>
				<Row>
					<Col md={4} style={{}}>
						<Link to={`/product/${product._id}`}>
							<Card.Img
								className='mx-auto'
								variant='flush'
								src={product.logo && `${product.logo}`}
								style={{ height: '70px', width: '70px' }}
							/>
						</Link>
					</Col>
					<Col md={8} className='text-center' style={{}}>
						<Row>
							<Link to={`/product/${product._id}`}>
								<Card.Title as='span'>
									<strong>{product.name}</strong>
								</Card.Title>
							</Link>
						</Row>
						<Row className='mx-auto'>
							<Card.Text as='span'>
								<Rating
									value={product.averageRating}
									text={`${
										product.numReviews ? product.numReviews : 0
									} reviews`}
								/>
							</Card.Text>
						</Row>
						<Row></Row>
					</Col>
					<Link
						to={`/product/${product._id}`}
						style={{ background: '#EDF3F3' }}>
						<button type='button' className='btn btn-sm btn-block'>
							Download
						</button>
					</Link>
				</Row>
			</Card.Body> */}
			<Card
				className='apps-card'
				style={{
					height: '',
					background: 'white',
					border: 'none',
				}}>
				<Card.Img
					className='mx-auto'
					variant='top'
					src={product.logo}
					style={{ height: '100px', width: '100px' }}
				/>
				<Card.Body style={{ height: '' }}>
					<Link to={`/product/${product._id}`}>
						<Card.Title
							as='span'
							style={{
								fontFamily: 'American Typewriter',
							}}>
							{product.name}
						</Card.Title>
						<Card.Text as='span'>
							<Rating value={product.averageRating} />
						</Card.Text>
					</Link>
					<Button
						className='w-100'
						variant='default'
						style={{
							background: '#157298',
							color: 'white',
							marginBottom: 'px',
						}}>
						Install
					</Button>
				</Card.Body>
			</Card>
		</>
	)
}

export default Product
