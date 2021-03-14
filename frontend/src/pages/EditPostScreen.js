import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminCategory } from '../actions/categoryActions'
import { editPost, updatePost } from '../actions/postActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { UPDATE_POST_RESET } from '../constants/postConstants'

const EditPostScreen = ({ match, history }) => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [image, setImage] = useState('')
	const [category, setCategory] = useState('')
	const [imagePreview, setImagePreview] = useState('')
	const dispatch = useDispatch()

	const editState = useSelector((state) => state.editPost)

	const { loading, error, post } = editState

	const catState = useSelector((state) => state.adminCategory)

	const { categories } = catState

	const updateState = useSelector((state) => state.updatePost)

	const { success, loading: updateLoading, error: updateError } = updateState

	useEffect(() => {
		dispatch(editPost(match.params.id))
		dispatch(getAdminCategory())
	}, [dispatch, match])

	useEffect(() => {
		if (post) {
			setTitle(post.title)
			setContent(post.content)
			setImage(post.image)
			setCategory(post.category)
		}
	}, [post])

	useEffect(() => {
		if (success) {
			dispatch({
				type: UPDATE_POST_RESET,
			})
			history.push('/admin/posts')
		}
	}, [success, history, dispatch])

	const preview = (e) => {
		const image = e.target.files[0] ? e.target.files[0] : ''
		// setImage(image)
		const FR = new FileReader()
		FR.onload = () => {
			const url = FR.result
			setImage(url)
		}
		FR.readAsDataURL(image)
	}

	const submitHandler = (e) => {
		const id = match.params.id
		e.preventDefault()

		const data = {
			title,
			content,
			image,
			category,
		}

		dispatch(updatePost(id, data))
	}

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					{updateLoading ? (
						<Loader />
					) : updateError ? (
						<Message>{updateError}</Message>
					) : (
						''
					)}
					<Row className='justify-content-md-center mt-5'>
						<Col xs={12} md={6}>
							<form>
								<div className='form-group'>
									<Row>
										<label
											className='col-4 control-label py-2'
											style={{
												fontFamily: 'American Typewriter',
												fontWeight: 'bold',
											}}>
											Title
										</label>
										<div className='col-8'>
											<input
												name='title'
												className='form-control'
												type='text'
												value={title}
												required
												onChange={(e) => setTitle(e.target.value)}
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
											Content
										</label>
										<div className='col-8'>
											<textarea
												name='content'
												className='form-control'
												value={content}
												required
												onChange={(e) => setContent(e.target.value)}></textarea>
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
											Image
										</label>

										<img
											className='ml-3'
											src={image}
											alt=''
											name='image'
											style={{ height: '50px', width: '50px' }}
										/>
									</Row>
									<div className='form-group'>
										<Row>
											<div className='col-4'></div>
											<div className='col-8'>
												<Form.File
													name='image'
													label='change post image'
													custom
													onChange={(e) => preview(e)}></Form.File>
											</div>
										</Row>
									</div>
								</div>

								<div className='form-group'>
									{/* Todo: get the select to have a default value of the current product cat */}
									<Row>
										<label
											className='col-4 control-label py-2'
											style={{
												fontFamily: 'American Typewriter',
												fontWeight: 'bold',
											}}>
											Category
										</label>
										<div className='col-8'>
											<select
												className='form-control'
												required
												onChange={(e) => setCategory(e.target.value)}>
												{categories &&
													categories.map((cat) => (
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
									style={{
										float: 'right',
										fontFamily: 'American Typewriter',
										fontWeight: 'bold',
									}}>
									Update
								</button>
							</form>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}

export default EditPostScreen
