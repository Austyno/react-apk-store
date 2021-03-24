import React, { useState, useEffect } from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { createSlider } from '../actions/sliderActions'
import { CREATE_SLIDER_RESET } from '../constants/sliderConstants'

const CreateSlidersScreen = ({ history }) => {
	const [name, setName] = useState('')
	const [image, setImage] = useState('')

	const dispatch = useDispatch()
	const createstate = useSelector((state) => state.createSlider)

	const { loading, error, success } = createstate

	useEffect(() => {
		if (success) {
			dispatch({
				type: CREATE_SLIDER_RESET,
			})
			history.push('/admin/sliders')
		}
	}, [success, dispatch, history])

	const preview = (e) => {
		const file = e.target.files[0]

		const reader = new FileReader()
		reader.onload = () => {
			const dataURL = reader.result
			setImage(dataURL)
		}
		reader.readAsDataURL(file)
	}

	const submitHandle = (e) => {
		e.preventDefault()

		const data = {
			name,
			image,
		}
		dispatch(createSlider(data))
	}
	return (
		<>
			<Container>
				<Col md={8} className='mx-auto mb-5 mt-4' style={{}}>
					{loading ? (
						<Loader />
					) : error ? (
						<Message>{error}</Message>
					) : (
						<Card className='py-4 p-3 mt-5' style={{ marginTop: '30px' }}>
							<Card.Text
								as='h5'
								className='mb-3 text-center'
								style={{
									fontFamily: 'American Typewriter',
									fontWeight: 'bold',
								}}>
								Add New Category
							</Card.Text>
							<hr />
							<Container>
								<Form className='form-horizontal'>
									<div className='form-group'>
										<Row>
											<label
												for='email'
												className='col-4 control-label py-2'
												style={{
													fontFamily: 'American Typewriter',
													fontWeight: 'bold',
												}}>
												Image Name
											</label>
											<div className='col-8'>
												<input
													name='name'
													className='form-control'
													type='text'
													value={name}
													onChange={(e) => setName(e.target.value)}
													placeholder='Image Name'
												/>
											</div>
										</Row>
									</div>

									<div className='form-group'>
										<Row>
											<label
												for='email'
												className='col-4 control-label py-2'
												style={{
													fontFamily: 'American Typewriter',
													fontWeight: 'bold',
												}}>
												Image
											</label>
											<div className='form-group'>
												<Row>
													{/* <label
														className='col-4 control-label py-2'
														style={{
															fontFamily: 'American Typewriter',
															fontWeight: 'bold',
														}}>
														Image
													</label> */}
													{image && (
														<img
															className='ml-3'
															src={image}
															alt=''
															name='image'
															style={{ height: '60px', width: '60px' }}
														/>
													)}
												</Row>
												<div className='form-group'>
													<Row>
														{/* <div className='col-4'></div> */}
														<div className='col-8'>
															<Form.File
																className='form-control'
																name='image'
																label='select image'
																custom
																onChange={(e) => preview(e)}></Form.File>
														</div>
													</Row>
												</div>
											</div>
										</Row>
									</div>

									<hr />

									<div className='row py2 d-flex justify-content-around align-items-center'>
										<button
											onClick={(e) => submitHandle(e)}
											className='btn btn-primary block mb-5 w-50'>
											Create
										</button>
									</div>
								</Form>
							</Container>
						</Card>
					)}
				</Col>
			</Container>
		</>
	)
}

export default CreateSlidersScreen
