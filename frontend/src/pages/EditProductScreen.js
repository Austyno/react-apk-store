import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategory } from '../actions/categoryActions'
import { fetchProduct, editProduct } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { LinkContainer } from 'react-router-bootstrap'

const EditProductScreen = ({ history, match }) => {
	const dispatch = useDispatch()
	const productToEdit = useSelector((state) => state.productDetails)

	const { loading, error, product } = productToEdit

	const productCat = useSelector((state) => state.allCategories)
	const { categories } = productCat

	const afterEdited = useSelector((state) => state.editedProduct)

	const { success } = afterEdited

	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [logo, setLogo] = useState('')
	const [googlePlayLink, setGooglePlayLink] = useState('')
	const [version, setVersion] = useState('')
	const [price, setPrice] = useState('')
	const [apk, setApk] = useState('')
	const [category, setCategory] = useState('')

	useEffect(() => {
		dispatch(fetchProduct(match.params.id))
		dispatch(getAllCategory())
	}, [dispatch, match])

	useEffect(() => {
		if (product) {
			setName(product.name)
			setDescription(product.description)
			setLogo(product.logo)
			setGooglePlayLink(product.googlePlayLink)
			setVersion(product.version)
			setPrice(product.price)
			setCategory(product.category)
		}
	}, [product])

	useEffect(() => {
		if (success) {
			history.pop()
		}
	}, [history, success])

	const submitHandler = (e) => {
		e.preventDefault()

		const submitData = {
			name,
			description,
			logo,
			googlePlayLink,
			version,
			price,
			apk,
			category,
		}

		dispatch(editProduct(match.params.id, submitData))
	}

	const uploadImage = async (e) => {
		const image = e.target.files[0]
		const formData = new FormData()

		formData.append('logo', image)
		const user = JSON.parse(localStorage.getItem('userInfo'))
		const { userInfo } = user

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		try {
			const res = await axios.post('/api/products/upload', formData, config)
			const imageUrl = res.data.data

			setLogo(imageUrl)
			console.log(imageUrl)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Container>
				<LinkContainer to={`/admin/products`}>
					<span
						className='mdi mdi-arrow-left mdi-36px'
						style={{ marginTop: '30px' }}></span>
				</LinkContainer>
				{loading ? (
					<Loader />
				) : error ? (
					<Message>{error}</Message>
				) : (
					<>
						<Row className='justify-content-md-center mt-5'>
							<Col xs={12} md={6}>
								<form>
									<div className='form-group'>
										<Row>
											<label className='col-4 control-label py-2'>Name</label>
											<div className='col-8'>
												<input
													name='email'
													className='form-control'
													type='text'
													value={name}
													required
													onChange={(e) => setName(e.target.value)}
												/>
											</div>
										</Row>
									</div>

									<div className='form-group'>
										<Row>
											<label className='col-4 control-label py-2'>
												Description
											</label>
											<div className='col-8'>
												<textarea
													name='description'
													className='form-control'
													value={description}
													required
													onChange={(e) =>
														setDescription(e.target.value)
													}></textarea>
											</div>
										</Row>
									</div>

									<div className='form-group'>
										<Row>
											<label className='col-4 control-label py-2'>Logo</label>
											<img
												src={logo}
												alt=''
												required
												style={{ height: '50px', width: '50px' }}
											/>
										</Row>
										<div className='form-group'>
											<Row>
												<div className='col-4'></div>
												<div className='col-8'>
													<Form.File
														name='logo'
														label='change apk Logo'
														custom
														onChange={uploadImage}></Form.File>
												</div>
											</Row>
										</div>
									</div>

									<div className='form-group'>
										<Row>
											<label className='col-4 control-label py-2'>
												GooglePlayLink
											</label>
											<div className='col-8'>
												<input
													className='form-control'
													type='text'
													value={googlePlayLink}
													onChange={(e) => setGooglePlayLink(e.target.value)}
												/>
											</div>
										</Row>
									</div>

									<div className='form-group'>
										<Row>
											<label className='col-4 control-label py-2'>
												Version
											</label>
											<div className='col-8'>
												<input
													className='form-control'
													type='number'
													value={version}
													onChange={(e) => setVersion(e.target.value)}
												/>
											</div>
										</Row>
									</div>

									{price !== 0 ? (
										<div className='form-group'>
											<Row>
												<label className='col-4 control-label py-2'>
													Price
												</label>
												<div className='col-8'>
													<input
														className='form-control'
														type='text'
														value={price}
														onChange={(e) => setPrice(e.target.value)}
													/>
												</div>
											</Row>
										</div>
									) : (
										''
									)}

									<div className='form-group'>
										{/* Todo: get the select to have a default value of the current product cat */}
										<Row>
											<label className='col-4 control-label py-2'>
												Category
											</label>
											<div className='col-8'>
												<select
													className='form-control'
													required
													onChange={(e) => setCategory(e.target.value)}>
													{categories.map((cat) => (
														<option value={cat._id}>{cat.categoryName}</option>
													))}
												</select>
											</div>
										</Row>
									</div>
									<div className='col-4 control-label py-2'></div>
									<button
										onClick={submitHandler}
										className='btn btn-primary block mb-5 col-8'
										style={{ float: 'right' }}>
										Update
									</button>
								</form>
							</Col>
						</Row>
					</>
				)}
			</Container>
		</>
	)
}

export default EditProductScreen
