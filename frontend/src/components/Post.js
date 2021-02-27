import React from 'react'
import { Card, Image, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

const Post = ({ post }) => {
	return (
		<>
			<Col md={3} sm={12}>
				<Card className='post-card' style={{ height: '200px' }}>
					<LinkContainer to={`/post/${post._id}`}>
						<Image src={post.image} className='card-img-top' style={{}} />
					</LinkContainer>

					<Card.Body>
						<Card.Text as='h6'>
							<Link to={`/post/${post._id}`}>{post.title}</Link>
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>
		</>
	)
}

export default Post
