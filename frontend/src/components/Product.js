import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Col, Row, Button } from 'react-bootstrap'
import Rating from './Rating'
import 'animate.css'

const Product = ({ product }) => {
	return (
		<>
			<Card
				className='apps-card'
				style={{
					height: '',
					background: '#F8F8F8',
					border: 'none',
				}}>
				<Card.Img
					className='mx-auto'
					variant='top'
					src={product.logo}
					style={{ height: '100px', width: '100px' }}
				/>
				<svg preserveAspectRatio='none' viewBox='0 0 375 100'>
					<path
						d='M0 32.711V100C64.5161 100 93.75 100 177.923 100C262.097 100 330.645 100 375 100V15.7947C282 -22.9496 206.5 53.6056 148 72.7049C89.5 91.8042 51.5 78.1619 0 32.711Z'
						fill='#F8F8F8'></path>
					<path
						d='M0 26.4033V56.4853C69.5 100.681 125 103.355 209.5 51.3608C294 -0.633482 334.5 6.12572 375 18.0844V10.2853C282 -26.6308 206.5 46.312 148 64.51C89.5 82.708 51.5 69.7096 0 26.4033Z'
						fill='#157298'></path>
				</svg>
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
