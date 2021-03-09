import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Container, Card, Form, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../actions/categoryActions'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { createProduct } from '../actions/productActions'

const CreateProductScreen = ({ history }) => {
	const [progress, setProgress] = useState(0)
	const [apkName, setApkName] = useState('')
	const [formState, setFormState] = useState({})
	const [uploading, setUploading] = useState(false)
	const dispatch = useDispatch()
	const catState = useSelector((state) => state.allCategories)

	const { loading, error, categories } = catState

	const userState = useSelector((state) => state.userLogin)

	const { userInfo } = userState

	const createdProductState = useSelector((state) => state.createdProduct)

	const { success } = createdProductState

	useEffect(() => {
		if (success) {
			history.push('/admin/products')
		}
		dispatch(getAllCategory())
	}, [dispatch, history, success])

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

		dispatch(createProduct(formState))
	}

	//upload apk
	const handleUpload = async (e) => {
		e.preventDefault()
		const file = e.target.files[0]
		setApkName(e.target.files[0].name)
		const formData = new FormData()
		formData.append('apk', file)
		setUploading(true)

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${userInfo.token}`,
				},
				onUploadProgress: (e) => {
					const completed = Math.round((e.loaded * 100) / e.total)
					setProgress(completed)
				},
			}

			const res = await axios.post(`/api/products/uploadapk`, formData, config)
			if (res) {
				setUploading(false)
			}

			const data = res.data.data

			setFormState({
				...formState,
				apk: data,
			})
			console.log(data)
		} catch (error) {
			console.log(error)
			setUploading(false)
		}
	}

	const uploadImage = async (e) => {
		e.preventDefault()
		const image = e.target.files[0]
		const formData = new FormData()
		setUploading(true)

		formData.append('logo', image)

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${userInfo.token}`,
				},
				onUploadProgress: (e) => {
					const completed = Math.round((e.loaded * 100) / e.total)
					setProgress(completed)
				},
			}

			const res = await axios.post('/api/products/upload', formData, config)
			const imageUrl = res.data.data

			setFormState({
				...formState,
				logo: imageUrl,
			})

			setUploading(false)

			console.log(imageUrl)
		} catch (error) {
			console.log(error)
			setUploading(false)
		}
	}

	return (
		<Container>
			<LinkContainer
				to={`/admin/products`}
				style={{ marginTop: '50px', cursor: 'pointer' }}>
				<span className='mdi mdi-arrow-left mdi-36px'></span>
			</LinkContainer>
			<Col md={8} className='mx-auto mb-5 mt-4' style={{}}>
				<Card className='py-4 p-3 mt-5' style={{ marginTop: '30px' }}>
					{uploading && (
						<div
							className='progress-bar progress-bar-info progress-bar-striped'
							role='progressbar'
							aria-valuenow={progress}
							aria-valuemin='0'
							aria-valuemax='100'
							style={{ width: progress + '%' }}>
							{progress}%
						</div>
					)}
					<Card.Text
						as='h5'
						className='mb-3 text-center'
						style={{
							fontFamily: 'American Typewriter',
							fontWeight: 'bold',
						}}>
						Upload New Apk
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
										Category
									</label>
									<div className='col-8'>
										<select
											name='category'
											className='form-control'
											value={formState.category}
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
									<label
										for='Apk Name'
										className='col-4 control-label py-2'
										style={{
											fontFamily: 'American Typewriter',
											fontWeight: 'bold',
										}}>
										Apk Name
									</label>
									<div className='col-8'>
										<input
											name='name'
											className='form-control'
											type='text'
											value={formState.name}
											onChange={(e) => handleChange(e)}
											placeholder='Apk Name'
										/>
									</div>
								</Row>
							</div>

							<div className='form-group'>
								<Row>
									<label
										className='col-4 control-label py-2'
										style={{
											fontFamily: 'American Typewriter',
											fontWeight: 'bold',
										}}>
										Version
									</label>
									<div className='col-8'>
										<input
											className='form-control'
											type='number'
											name='version'
											value={formState.version}
											onChange={(e) => handleChange(e)}
										/>
									</div>
								</Row>
							</div>

							<div className='form-group'>
								<Row>
									<div className='col-4'></div>
									<div className='col-8'>
										<Form.File
											name='apk'
											label='upload the apk file'
											custom
											onChange={handleUpload}></Form.File>
										<span>{apkName}</span>
									</div>
								</Row>
							</div>

							<div className='form-group'>
								<Row>
									<div className='col-4'></div>
									<div className='col-8'>
										<Form.File
											name='logo'
											label='upload apk Logo'
											custom
											onChange={uploadImage}></Form.File>
										<img
											src={formState.logo}
											alt=''
											style={{ height: '70px' }}
										/>
									</div>
								</Row>
							</div>

							<div className='form-group'>
								<Row>
									<label
										for='description'
										className='col-4 control-label py-2'
										style={{
											fontFamily: 'American Typewriter',
											fontWeight: 'bold',
										}}>
										description
									</label>
									<div className='col-8'>
										<textarea
											name='description'
											className='form-control'
											value={formState.description}
											onChange={(e) => handleChange(e)}
											placeholder='Description'></textarea>
									</div>
								</Row>
							</div>
							{userInfo && userInfo.userData.role === 'admin' ? (
								<div class='form-group'>
									<Row>
										<div className='col-4'></div>
										<div class='custom-control custom-switch col-8'>
											<input
												type='checkbox'
												class='custom-control-input'
												id='customSwitch1'
												name='editor'
											/>
											<label class='custom-control-label' for='customSwitch1'>
												Editors Choice
											</label>
										</div>
									</Row>
								</div>
							) : (
								''
							)}

							<hr />

							<div className='row py2 d-flex justify-content-around align-items-center'>
								<button
									onClick={(e) => submitHandle(e)}
									className='btn btn-primary block mb-5 w-50'
									disabled={uploading ? true : false}
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
