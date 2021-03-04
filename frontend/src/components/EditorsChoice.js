import React, { useEffect } from 'react'
import { Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { getEditorsChoice } from '../actions/productActions'
import Image from '../images/diablo.jpg'
import Loader from './Loader'
import Message from './Message'
import Rating from './Rating'

const EditorsChoice = () => {
	const dispatch = useDispatch()
	const editor = useSelector((state) => state.editorsChoice)

	const { loading, error, products } = editor

	useEffect(() => {
		dispatch(getEditorsChoice())
	}, [dispatch])
	return (
		<>
			<Card>
				<Card.Header>
					<Card.Text
						as='p'
						style={{
							float: 'left',
							fontFamily: 'American Typewriter',
							fontWeight: 'bold',
						}}>
						Editor's Choice
					</Card.Text>
					<Card.Text style={{ float: 'right' }}>
						More <i className='fa fa-angle-double-right'></i>
					</Card.Text>
				</Card.Header>
				<Card.Body>
					<ListGroup variant='flush'>
						{loading ? (
							<Loader />
						) : error ? (
							<Message>{error}</Message>
						) : (
							products.map((p) => (
								<ListGroupItem>
									<LinkContainer
										to={`/product/${p._id}`}
										style={{ cursor: 'pointer' }}>
										<Row className='' style={{}}>
											<Col md={3} style={{}}>
												<Card.Img
													style={{
														height: '60px',
														width: '60px',
														borderRadius: '3px',
													}}
													src={p.logo}></Card.Img>
											</Col>
											<Col md={9} style={{}}>
												<Card.Text
													className='mb-2'
													as='span'
													style={{
														float: 'left',
														fontFamily: 'American Typewriter',
														fontWeight: 'bold',
													}}>
													{p.name}
												</Card.Text>
												<Card.Text as='span' style={{ float: 'right' }}>
													<Rating value={p.averageRating} />
												</Card.Text>
												<Card.Subtitle
													as='span'
													style={{
														height: '18px',
														float: 'left',
														fontFamily: 'Baskerville',
														fontSize: '15px',
													}}>
													{p.description.slice(0, 45)}...
												</Card.Subtitle>
											</Col>
										</Row>
									</LinkContainer>
								</ListGroupItem>
							))
						)}
					</ListGroup>
				</Card.Body>
			</Card>
		</>
	)
}

export default EditorsChoice
