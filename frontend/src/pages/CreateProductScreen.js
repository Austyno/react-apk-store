import React, { useState, useEffect } from 'react'
import { Col, Container, Card, Form, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../actions/categoryActions'

const CreateProductScreen = () => {
	const dispatch = useDispatch()
	const catState = useSelector((state) => state.allCategories)

	const { loading, error, categories } = catState

	useEffect(() => {
		dispatch(getAllCategory())
	}, [dispatch])

	const [formState, setFormState] = useState({})

	const handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value

		setFormState({
			...formState,
			[name]: value,
		})
	}
	const submitHandle = (e) => {
		e.preventDefault()
	}
	return (
		<Container>
			<Col md={8} className='mx-auto mb-5 mt-4' style={{}}>
				<Card className='py-4 p-3 mt-5' style={{ marginTop: '30px' }}>
					<Card.Text
						as='h5'
						className='mb-5'
						style={{
							fontFamily: 'American Typewriter',
							fontWeight: 'bold',
						}}>
						New Apk
					</Card.Text>
					<Container>
						<Form className='form-horizontal'>
							<div className='form-group'>
								<Row>
									<label for='email' className='col-4 control-label py-2'>
										Category
									</label>
									<div className='col-8'>
										<select
											name='cat'
											className='form-control'
											value={formState.email}
											onChange={(e) => handleChange(e)}>
											{categories &&
												categories.map((cat) => (
													<option value={cat._id}>{cat.categoryName}</option>
												))}
										</select>
									</div>
								</Row>
							</div>

							<div className='form-group'>
								<Row>
									<label for='email' className='col-4 control-label py-2'>
										Apk Name
									</label>
									<div className='col-8'>
										<input
											name='name'
											className='form-control'
											type='text'
											value={formState.email}
											onChange={(e) => handleChange(e)}
											placeholder='Apk Name'
										/>
									</div>
								</Row>
							</div>

							<div className='form-group'>
								<Row>
									<label for='email' className='col-4 control-label py-2'>
										Download Link
									</label>
									<div className='col-8'>
										<input
											name='download-link'
											className='form-control'
											type='text'
											value={formState.email}
											onChange={(e) => handleChange(e)}
											placeholder='Download Link'
										/>
									</div>
								</Row>
							</div>

							<div className='form-group'>
								<Row>
									<label className='col-4 control-label py-2'>Version</label>
									<div className='col-8'>
										<input
											className='form-control'
											type='number'
											value={formState.version}
											onChange={(e) => handleChange(e)}
										/>
									</div>
								</Row>
							</div>

							{/* <div className='form-group'>
							<Row>
								<label for='email' className='col-4 control-label py-2'>
									Price
								</label>
								<div className='col-8'>
									<input
										name='price'
										className='form-control'
										type='number'
										value={formState.email}
										onChange={handleChange}
										placeholder=''
									/>
								</div>
							</Row>
						</div> */}

							<div className='form-group'>
								<Row>
									<label for='email' className='col-4 control-label py-2'>
										Logo
									</label>
									<div className='col-8'>
										<input
											name='logo'
											className='form-control'
											type='file'
											value={formState.logo}
											onChange={(e) => handleChange(e)}
										/>
									</div>
								</Row>
							</div>

							<div className='form-group'>
								<Row>
									<label for='email' className='col-4 control-label py-2'>
										description
									</label>
									<div className='col-8'>
										<textarea
											name='description'
											className='form-control'
											type='text'
											onChange={(e) => handleChange(e)}
											placeholder='Description'></textarea>
									</div>
								</Row>
							</div>

							<div class='form-group'>
								<Row>
									<div className='col-4'></div>
									<div class='custom-control custom-switch col-8'>
										<input
											type='checkbox'
											class='custom-control-input'
											id='customSwitch1'
										/>
										<label class='custom-control-label' for='customSwitch1'>
											Editors Choice
										</label>
									</div>
								</Row>
							</div>
							<hr />
							<div className='col-4'></div>
							<div className='col-8 control-label py-2'>
								<button
									onClick={() => submitHandle}
									className='btn btn-primary block mb-5 w-100'
									style={{ float: 'right' }}>
									Create
								</button>
							</div>
						</Form>
					</Container>
				</Card>
			</Col>
		</Container>
	)
}

export default CreateProductScreen
