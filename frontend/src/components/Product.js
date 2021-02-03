import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import 'animate.css'

const Product = ({ product }) => {
	return (
		<div className='' style={{ height: 'auto', width: '170px' }}>
			<Card className='my-3 p-3 rounded productCard card animate__animated animate__fadeInUp'>
				<Link to={`/product/${product._id}`}>
					<Card.Img
						variant='flush'
						src={`../images/${product.logo}`}
						style={{ height: '160px', width: 'auto' }}
					/>
				</Link>

				<Card.Body>
					<Link to={`/product/${product._id}`}>
						<Card.Title as='div'>
							<strong>{product.name}</strong>
						</Card.Title>
					</Link>

					<Card.Text as='div'>
						<Rating
							value={product.averageRating}
							text={`${product.numReviews ? product.numReviews : 0} reviews`}
						/>
					</Card.Text>

					{/* <Card.Text as='h3'>${product.price}</Card.Text> */}

					<Link
						to={`/product/${product._id}`}
						style={{ background: '#EDF3F3' }}>
						<button type='button' className='btn btn-primary btn-sm'>
							Download
						</button>
					</Link>
				</Card.Body>
			</Card>
		</div>
	)
}

export default Product
