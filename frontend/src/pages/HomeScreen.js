import React, { useEffect } from 'react'
import { Col, Row, Card, Button, Container, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
	listProducts,
	listCategoriesAndProducts,
} from '../actions/productActions'
import Product from '../components/Product'
import Edu from '../images/city.svg'
import Ed from '../images/city2.svg'
import Slider from '../components/Slider'
import Logo from '../images/logo2.png'
import Android from '../images/android.png'
import MobileSlider from '../components/MobileSlider'
import { listAllPosts } from '../actions/postActions'
import { getAllCategory } from '../actions/categoryActions'
import Post from '../components/Post'
import TabComponent from '../components/TabComponent'
import EditorsChoice from '../components/EditorsChoice'

const HomeScreen = () => {
	const dispatch = useDispatch()
	const productList = useSelector((state) => state.productList)

	const { products } = productList
	const productCategories = useSelector(
		(state) => state.categoriesAndProductsList
	)

	const { loading, error, categoriesAndProducts } = productCategories

	const listpost = useSelector((state) => state.allPost)

	const { posts } = listpost

	const allCategories = useSelector((state) => state.allCategories)

	const { categories } = allCategories

	let mobileCat
	if (categories) {
		mobileCat = categories.slice(0, 3)
	}

	//take the latest 3 from post array
	const displayPost = posts ? posts.slice(0, 4) : ''

	useEffect(() => {
		dispatch(listCategoriesAndProducts())
		dispatch(listProducts)
		dispatch(listAllPosts())
		dispatch(getAllCategory())
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
							{/* for mobile */}
							<Container>
								<Row className='cat mt-3'>
									{mobileCat &&
										mobileCat.map((cat) => (
											<Card.Body className='catbody' style={{ width: '50px' }}>
												<Image
													className='mb-3 ml-4'
													src={Android}
													style={{ height: '30px' }}
												/>
												<Card.Text className='ml-2'>
													{cat.categoryName}
												</Card.Text>
											</Card.Body>
										))}
								</Row>
							</Container>

							{/* mobilescroll */}
							<MobileSlider products={products} />

							<Card className='sideBar'>
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
							<Card className='sideBar'>
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
					<Row className=' sideBar'>
						{/* category and products */}
						<Col md={8}>
							{categoriesAndProducts &&
								categoriesAndProducts.map((cp) => (
									<Card className='mb-3' style={{ backgroundColor: '#FFFFFF' }}>
										<Card.Header>
											<Card.Text
												as='p'
												style={{
													float: 'left',
													fontFamily: 'American Typewriter',
													fontWeight: 'bold',
												}}>
												{cp.categoryName}
											</Card.Text>
											<Card.Text style={{ float: 'right' }}>
												More <i className='fa fa-angle-double-right'></i>
											</Card.Text>
										</Card.Header>
										<Card.Body>
											<Row>
												{cp.products.map((product) => (
													<Col key={product._id} sm={12} md={4} lg={3} xl={3}>
														<Product product={product} />
													</Col>
												))}
											</Row>
										</Card.Body>
									</Card>
								))}
							{/* tabs with hover	 */}
							<TabComponent tab1='Games' tab2='Apps' catName='Trending Now' />
							{/* end tabs with hover */}

							{/* blog topics */}
							<Card className='mt-3' style={{ backgroundColor: '#FFFFFF' }}>
								<Card.Header>
									<Card.Text
										as='p'
										style={{
											float: 'left',
											fontFamily: 'American Typewriter',
											fontWeight: 'bold',
										}}>
										Latest News
									</Card.Text>
									<Card.Text style={{ float: 'right' }}>
										More <i className='fa fa-angle-double-right'></i>
									</Card.Text>
								</Card.Header>
								<Row className='py-3 p-3'>
									{displayPost && displayPost.map((p) => <Post post={p} />)}
								</Row>
							</Card>
							{/* end latest news */}
						</Col>

						<Col md={4}>
							<EditorsChoice />
							<Card className='my-2 p-3' style={{ background: '#FFFFFF' }}>
								<Card.Body>
									{/* <Container> */}
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
									{/* </Container> */}
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
