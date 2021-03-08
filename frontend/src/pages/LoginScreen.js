import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Tl from '../images/telegram.png'
import Wh from '../images/whatsapp.jpg'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const LoginScreen = ({ match, history }) => {
	const dispatch = useDispatch()

	const loginState = useSelector((state) => state.userLogin)

	const { loading, error, userInfo } = loginState

	const [formState, setFomState] = useState({
		email: '',
		password: '',
	})

	useEffect(() => {
		if (userInfo && userInfo.userData) {
			setTimeout(() => {
				const id = match.params.id

				if (userInfo.userData.role === 'admin') {
					return history.push('/admin/products')
				}
				if (id) {
					history.push(`/product/${id}`)
				} else {
					history.push('/')
				}
			}, 1000)
		}
	}, [history,match,userInfo])

	

	const handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value

		setFomState({
			...formState,
			[name]: value,
		})
	}

	const submitHandler = (e) => {
		e.preventDefault()

		const password = formState.password
		const email = formState.email

		dispatch(login(email, password))
	}

	return (
		<>
			<Container className='mb-3'>
				{loading && <Loader />}
				{error && <Message>{error}</Message>}
				{userInfo && userInfo.success === true ? (
					<Message variant='success'>Congrats login Successful</Message>
				) : (
					''
				)}
				<Col md={5} className='mx-auto mb-5 mt-4' style={{ height: '400px' }}>
					<Card className='py-4 p-3 mt-5' style={{ marginTop: '30px' }}>
						<Card.Text
							as='h5'
							className='mb-5'
							style={{
								fontFamily: 'American Typewriter',
								fontWeight: 'bold',
							}}>
							User Login
						</Card.Text>
						<Form className='form-horizontal'>
							<div className='form-group'>
								<Row>
									<label for='email' className='col-4 control-label py-2'>
										email
									</label>
									<div className='col-8'>
										<input
											name='email'
											className='form-control'
											type='text'
											value={formState.email}
											onChange={handleChange}
											placeholder='email'
										/>
									</div>
								</Row>
							</div>
							<div className='form-group'>
								<Row>
									<label for='password' className='col-4 control-label py-2'>
										Password
									</label>
									<div className='col-8'>
										<input
											name='password'
											className='form-control'
											type='password'
											value={formState.password}
											onChange={handleChange}
											placeholder='password'
										/>
									</div>
								</Row>
							</div>

							<Button onClick={submitHandler} className='w-100'>
								Proceed
							</Button>
						</Form>
						<hr />
						<Card.Text
							className='mx-auto'
							style={{
								fontFamily: 'American Typewriter',
								fontWeight: 'bold',
							}}>
							<Link to={`/register/${match.params.id}`}>Register</Link>
						</Card.Text>
						<Row className='mx-auto mt-3 d-flex justify-content-space-between'>
							<img
								src={Tl}
								height='40px'
								width='40px'
								style={{ float: 'left', marginRight: '3px' }}
								alt=''
							/>
							{/* <img
								src={Wh}
								height='40px'
								width='40px'
								style={{ float: 'left' }}
								alt=''
							/> */}
						</Row>
					</Card>
				</Col>
			</Container>
		</>
	)
}

export default LoginScreen
