import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import Tl from '../images/telegram.png'
import Wh from '../images/whatsapp.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'

const SignUpScreen = ({ match, history }) => {
	const dispatch = useDispatch()
	//get state after signup
	const regMsg = useSelector((state) => state.register)

	const { loading, error, userInfo } = regMsg

	//redirect back to single product page with the product id if present
	if (userInfo.success) {
		setTimeout(() => {
			const id = match.params.id
			if (id) {
				history.push(`/product/${id}`)
			} else {
				history.push('/')
			}
		}, 1000)
	}

	const [formState, setFomState] = useState({
		email: '',
		password: '',
	})
	const handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value

		setFomState({
			...formState,
			[name]: value,
		})
	}

	const submitHandle = (e) => {
		e.preventDefault()

		const password = formState.password
		const email = formState.email

		dispatch(register(email, password))
	}
	return (
		<>
			<Container className='mb-3'>
				{loading && <Loader />}
				{error && <Message>{error}</Message>}
				{userInfo.success === true ? (
					<Message variant='success'>Congrats Sign up Successful</Message>
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
							User Registration
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

							<Button onClick={submitHandle} className='w-100'>
								Register
							</Button>
						</Form>
						<hr />
						<Card.Text
							className='mx-auto'
							style={{
								fontFamily: 'American Typewriter',
								fontWeight: 'bold',
							}}>
							<Link to={`/login/${match.params.id}`}>Login</Link>
						</Card.Text>
						<Row className='mx-auto mt-3 d-flex justify-content-space-between'>
							<img
								src={Tl}
								height='40px'
								width='40px'
								style={{ float: 'left', marginRight: '3px' }}
								alt=''
							/>
							<img
								src={Wh}
								height='40px'
								width='40px'
								style={{ float: 'left' }}
								alt=''
							/>
						</Row>
					</Card>
				</Col>
			</Container>
		</>
	)
}

export default SignUpScreen
