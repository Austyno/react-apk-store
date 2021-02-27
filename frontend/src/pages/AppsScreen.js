import React, { useEffect } from 'react'
import {
	Button,
	Card,
	Col,
	Container,
	ListGroup,
	ListGroupItem,
	Row,
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getAllApps } from '../actions/productActions'
import { getAllCategory } from '../actions/categoryActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'

const AppsScreen = () => {
	const dispatch = useDispatch()
	const appsState = useSelector((state) => state.allApps)
	const { loading, error, allApps } = appsState

	const catState = useSelector((state) => state.allCategories)
	const { loading: catLoading, error: catError, categories } = catState

	useEffect(() => {
		dispatch(getAllApps())
		dispatch(getAllCategory())
	}, [dispatch])
	return (
		<>
			<Container>
				<Row className='' style={{ marginTop: '60px' }}>
					<Col md={3}>
						<Card.Header
							style={{
								fontFamily: 'American Typewriter',
								fontWeight: 'bold',
							}}>
							Category
						</Card.Header>
						<Card>
							{catLoading ? (
								<Loader />
							) : catError ? (
								<Message>{error}</Message>
							) : (
								categories.map((cat) => (
									<ListGroup variant='flush'>
										<ListGroupItem>{cat.categoryName}</ListGroupItem>
									</ListGroup>
								))
							)}
						</Card>
					</Col>
					<Col md={9}>
						<Card className='' style={{ backgroundColor: '#FFFFFF' }}>
							<Card.Header>
								<Card.Text
									as='p'
									style={{
										float: 'left',
										fontFamily: 'American Typewriter',
										fontWeight: 'bold',
									}}>
									Apps
								</Card.Text>
								<Card.Text style={{ float: 'right' }}>
									<Row className='apps-header'>
										Sort By:
										<Card.Text className='apps-header'>Downloads</Card.Text>
										<Card.Text>Latest</Card.Text>
										<Card.Text>Rating</Card.Text>
									</Row>
								</Card.Text>
							</Card.Header>
							<Card.Body>
								<Row>
									{loading ? (
										<Loader />
									) : error ? (
										<Message>{error}</Message>
									) : (
										allApps &&
										allApps.map((p) => (
											<Col
												key={p._id}
												sm={12}
												md={6}
												lg={3}
												xl={3}
												style={{ height: '' }}>
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
														src={p.logo}
														style={{ height: '100px', width: '100px' }}
													/>
													<Card.Body style={{ height: '' }}>
														<Card.Title as='span'>{p.name}</Card.Title>
														<Card.Text as='span'>
															<Rating value={p.averageRating} />
														</Card.Text>
														<Button variant='default'>DownLoad</Button>
													</Card.Body>
												</Card>
											</Col>
										))
									)}
								</Row>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default AppsScreen
