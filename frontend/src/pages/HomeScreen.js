import React, { useEffect } from 'react'
import { Col, Row, Card, Button, Container, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Product from '../components/Product'
import Edu from '../images/city.svg'
import Ed from '../images/city2.svg'
import Slider from '../components/Slider'
import Logo from '../images/logo2.png'
import Android from '../images/android.png'

const HomeScreen = () => {
	const dispatch = useDispatch()
	const productList = useSelector((state) => state.productList)

	const { loading, error, products } = productList

	useEffect(() => {
		dispatch(listProducts())
	}, [dispatch])

	return (
		<>
			{loading ? (
				'Loading....'
			) : error ? (
				<h3>{error}</h3>
			) : (
				<>
					<Row>
						<Col md={8} style={{}}>
							<Slider />
						</Col>
						<Col md={4}>
							<Card>
								<Card.Img src={Edu} style={{ height: '187px' }} />
								<Card.Footer
									style={{
										height: '45px',
										textAlign: 'center',
										padding: '5px',
									}}>
									<Row className='ml-5' style={{}}>
										<Card.Img
											className='mr-2'
											src={Android}
											style={{ height: '30px', width: '30px' }}
										/>
										<Card.Text
											as='p'
											style={{
												fontFamily: 'Baskerville',
												fontWeight: 'bold',
												color: '#157298',
												fontSize: '20px',
											}}>
											Apex Hunter
										</Card.Text>
									</Row>
								</Card.Footer>
							</Card>
							<Card>
								<Card.Img src={Ed} style={{ height: '187px' }} />
								<Card.Footer
									className=''
									style={{
										height: '45px',
										textAlign: 'center',
										padding: '5px',
									}}>
									<Row className='ml-5' style={{}}>
										<Card.Img
											className='mr-2'
											src={Android}
											style={{ height: '30px', width: '30px' }}
										/>
										<Card.Text
											as='p'
											style={{
												fontFamily: 'Baskerville',
												fontWeight: 'bold',
												color: '#157298',
												fontSize: '20px',
											}}>
											City War
										</Card.Text>
									</Row>
								</Card.Footer>
							</Card>
						</Col>
					</Row>
					<Row className='mt-3'>
						<Col md={8}>
							<Card style={{ backgroundColor: '#FFFFFF' }}>
								<Card.Header>
									<Card.Text style={{ float: 'left' }}>Discover Apps</Card.Text>
									<Card.Text style={{ float: 'right' }}>
										More <i className='fa fa-angle-double-right'></i>
									</Card.Text>
								</Card.Header>
								<Card.Body>
									<Row>
										{products.map((product) => (
											<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
												<Product product={product} />
											</Col>
										))}
									</Row>
								</Card.Body>
							</Card>
						</Col>
						<Col md={4}>
							<Card className='my-2 p-3' style={{ background: '#FFFFFF' }}>
								<Card.Body>
									<Container>
										<Row>
											<Col md={4}>
												<Image
													src={Logo}
													style={{
														height: '50px',
														border: '5px solid black',
														padding: '5px',
													}}
												/>
											</Col>
											<Col md={8}>
												<Card.Title
													style={{
														fontFamily: 'Baskerville',
														fontWeight: 'bold',
														color: '#157298',
													}}>
													QubAngel App
												</Card.Title>
												<Card.Text
													className='text-muted'
													style={{ fontFamily: 'Helvetica Neue' }}>
													Get the Qubangel App and stay updated on the go!
												</Card.Text>
											</Col>
										</Row>
										<Row className='mt-2'>
											<Button className='btn btn-primary w-100'>
												Download Apk - v1.1
											</Button>
										</Row>
									</Container>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}

export default HomeScreen
