import React from 'react'
import { Row, Card, Image, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

const Post = ({ post }) => {
	return (
		<>
			{/* <Row>
				<Card key={post._id}>
					<Card.Header
						style={{
							fontFamily: 'American Typewriter',
							fontWeight: 'bold',
						}}>
						<Card.Title as='h3' className='ml-5' style={{}}>
							<Link to={`/post/${post._id}`}>{post.title}</Link>
						</Card.Title>
					</Card.Header>

					<Card.Body>
						<Row>
							<Col md={3} style={{ textAlign: 'center' }}>
								<Image src={post.image} alt='' style={{ height: '100px' }} />
							</Col>
							<Col
								md={9}
								style={{
									justifyContent: 'left',
									fontFamily: 'Baskerville',
									fontSize: '18px',
								}}>
								{post.content}
							</Col>
						</Row>
					</Card.Body>
					<Card.Footer className='text-muted'>
						{post.createdAt && post.createdAt.split('T')[0]}
					</Card.Footer>
				</Card>
			</Row> */}
			<Col md={3}>
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
