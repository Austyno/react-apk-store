import React, { useEffect } from 'react'
import {
	Card,
	Col,
	Container,
	ListGroup,
	ListGroupItem,
	Row,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { singlePost } from '../actions/postActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const SinglePostScreen = ({ match }) => {
	const dispatch = useDispatch()
	const response = useSelector((state) => state.singlePost)

	const { loading, error, post } = response

	useEffect(() => {
		dispatch(singlePost(match.params.id))
	}, [dispatch, match])
	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Container>
					<Row>
						<Col md={8} className='mx-auto mt-5 mb-5'>
							<Card className='my-3 p-3 rounded postCard card animate__animated animate__fadeInUp'>
								<Card.Title>
									<Row>
										<Col md={6}>
											<Card.Img
												className='ml-3'
												src={post.image && `${post.image}`}
												style={{}}
											/>
										</Col>
										<Col
											md={6}
											style={{
												fontFamily: 'American Typewriter',
												fontWeight: 'bold',
											}}>
											<h3>{post.title}</h3>
											<ListGroup variant='flush'>
												<ListGroupItem>
													<Card.Subtitle style={{ fontFamily: 'Baskerville' }}>
														Category:{' '}
														{post.category && post.category.categoryName}
													</Card.Subtitle>
												</ListGroupItem>
												<ListGroupItem>
													{post.createdAt && post.createdAt.split('T')[0]}
												</ListGroupItem>
											</ListGroup>
										</Col>
									</Row>
								</Card.Title>
								<Card.Body>
									{/* add slider here if needed */}
									<Card.Text as='div' className='py-5 '>
										{post.desc}
									</Card.Text>
									<hr />
									<Card.Text
										as='p'
										style={{ fontFamily: 'Baskerville', fontSize: '18px' }}>
										{post.content}
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			)}
		</>
	)
}

export default SinglePostScreen
