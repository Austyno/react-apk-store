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
							</Card.Header>
							<Card.Body>
								<Row>
									{loading ? (
										<div className='text-center'>
											<Loader />
										</div>
									) : error ? (
										<div className='text-center'>
											<Message>{error}</Message>{' '}
										</div>
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
														background: '#F8F8F8',
														border: 'none',
													}}>
													<Card.Img
														className='mx-auto'
														variant='top'
														src={p.logo}
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
														<Card.Title as='span'>{p.name}</Card.Title>
														<Card.Text as='span'>
															<Rating value={p.averageRating} />
														</Card.Text>
														<Button
															variant='default'
															className='w-100'
															style={{
																background: '#157298',
																color: 'white',
																marginBottom: 'px',
															}}>
															Install
														</Button>
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
