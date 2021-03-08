import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import { createCategory } from '../actions/categoryActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const CreateCategoryScreen = ({ history }) => {
	const [cat, setCat] = useState('')
	const dispatch = useDispatch()

	const catState = useSelector((state) => state.createCategory)

	const { loading, error, success } = catState

	useEffect(() => {
		if (success) {
			history.push('/admin/category')
		}
	}, [history, success])

	const submitHandle = (e) => {
		e.preventDefault()

		const category = {
			categoryName: cat,
		}
		dispatch(createCategory(category))
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
												Category Name
											</label>
											<div className='col-8'>
												<input
													name='name'
													className='form-control'
													type='text'
													value={cat}
													onChange={(e) => setCat(e.target.value)}
													placeholder='Category Name'
												/>
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

export default CreateCategoryScreen
