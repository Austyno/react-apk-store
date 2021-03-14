import React, { useEffect } from 'react'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { getAllPostAdmin, deletePost } from '../actions/postActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const AllPostScreen = () => {
	const dispatch = useDispatch()
	const adminPost = useSelector((state) => state.allPostAdmin)
	const { loading, error, posts } = adminPost

	useEffect(() => {
		dispatch(getAllPostAdmin())
	}, [dispatch])

	const deleteHandler = (id) => {
		const del = window.confirm('are you sure you want to delete the product')
		if (del) {
			dispatch(deletePost(id))
		}
	}
	return (
		<>
			<Container className='mt-5'>
				{loading ? (
					<Loader />
				) : error ? (
					<Message>{error}</Message>
				) : (
					<>
						<Row className='d-sm-flex align-items-center justify-content-between mb-4'>
							<Container>
								<h2 style={{ float: 'left' }}>
									All posts [{posts && posts.length}]{' '}
								</h2>
								<LinkContainer
									to='/admin/post/create'
									style={{ float: 'right', cursor: 'pointer' }}>
									<Button className=''>
										<i className='mdi mdi-plus md-36px'></i> Post
									</Button>
								</LinkContainer>
							</Container>
						</Row>
						<Table striped bordered hover responsive className='table-sm'>
							<thead>
								<th>SN</th>
								<th>ID</th>
								<th>Image</th>
								<th>Title</th>
								<th>Content</th>
								<th>Category</th>
								<th>Date Added</th>
								<th></th>
								<th></th>
							</thead>
							<tbody>
								{posts &&
									posts.map((p) => (
										<tr key={p._id}>
											<td></td>
											<td>{p._id}</td>
											<td>
												<img src={p.image} alt='' height='50px' />
											</td>
											<td>{p.title}</td>
											<td>{p.content.slice(0, 150)}...</td>
											<td>{p.category && p.category.categoryName}</td>
											<td>{p.createdAt && p.createdAt.split('T')[0]}</td>
											<td>
												<LinkContainer to={`/admin/post/${p._id}/edit`}>
													<Button variant='secondary' className='btn btn'>
														<i className='fa fa-edit'></i>
													</Button>
												</LinkContainer>
											</td>
											<td>
												<Button
													variant='danger'
													className='btn btn'
													onClick={(e) => deleteHandler(e, p._id)}>
													<i className='fa fa-trash'></i>
												</Button>
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					</>
				)}
			</Container>
		</>
	)
}

export default AllPostScreen
