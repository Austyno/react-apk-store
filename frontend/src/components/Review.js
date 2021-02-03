import React from 'react'
import { Row, Card, Image } from 'react-bootstrap'
import Rating from './Rating'

const Review = ({ review }) => {
	return (
		<>
			<Row>
				<Card>
					<Card.Header>
						<Image src='' alt='' />
						<Card.Text as='h5' style={{ float: 'left' }}>
							{review.user.name}
						</Card.Text>
						<Card.Text as='h6' style={{ float: 'right' }}>
							<Rating value={review.rating} />
						</Card.Text>
					</Card.Header>
					<Card.Body>
						<Card.Title>
							<u>{review.title}</u>
						</Card.Title>
						<Card.Text>{review.text}</Card.Text>
					</Card.Body>
                    <Card.Footer className='text-muted'>{ review.createdAt && review.createdAt.split('T')[0] }</Card.Footer>
				</Card>
			</Row>
		</>
	)
}

export default Review
