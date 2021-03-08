import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getCategory, postCategoryEdit } from '../actions/categoryActions'
import { LinkContainer } from 'react-router-bootstrap'

const EditCategoryScreen = ({ match, history }) => {
	const [category, setCategory] = useState('')
	const dispatch = useDispatch()

	const catState = useSelector((state) => state.editCategory)

	const { loading, error, cat } = catState

	const postCatState = useSelector((state) => state.postCategoryEdit)

	const { success } = postCatState

	useEffect(() => {
		if (success) {
			history.push('/admin/category')
		}
		dispatch(getCategory(match.params.id))
	}, [match, dispatch, success, history])

	useEffect(() => {
		if (cat) {
			setCategory(cat.categoryName)
		}
	}, [cat])

	const submitHandle = (e) => {
		e.preventDefault()
		const cat = {
			categoryName: category,
		}

		dispatch(postCategoryEdit(match.params.id, cat))
	}
	return (
		<>
			<Container className='mb-5'>
				<LinkContainer to={`/admin/category`}>
					<span
						className='mdi mdi-arrow-left mdi-36px'
						style={{ marginTop: '30px' }}></span>
				</LinkContainer>
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
													value={category}
													onChange={(e) => setCategory(e.target.value)}
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

export default EditCategoryScreen
