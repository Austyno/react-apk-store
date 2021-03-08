import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getAdminCategory, deleteCategory } from '../actions/categoryActions'

const CategoryListScreen = () => {
	const dispatch = useDispatch()

	const catState = useSelector((state) => state.adminCategory)

	const { loading, error, categories } = catState

	const delState = useSelector((state) => state.deleteCategory)

	const { success } = delState

	useEffect(() => {
		dispatch(getAdminCategory())
	}, [dispatch, success])

	const deleteHandler = (e, id) => {
		e.preventDefault()

		const del = window.confirm('Do you really want to delete the Category')

		if (del) {
			dispatch(deleteCategory(id))
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
									All Categories [{categories && categories.length}]{' '}
								</h2>
								<LinkContainer
									to='/admin/category/create'
									style={{ float: 'right',cursor:'pointer' }}>
									<Button className=''>
										<i className='mdi mdi-plus md-36px'></i> Category
									</Button>
								</LinkContainer>
							</Container>
						</Row>
						<Table striped bordered hover responsive className='table-sm'>
							<thead>
								<th>SN</th>
								<th>ID</th>
								<th>NAME</th>
								<th>Date Added</th>
								<th></th>
							</thead>
							<tbody>
								{categories &&
									categories.map((p) => (
										<tr key={p._id}>
											<td></td>
											<td>{p._id}</td>
											<td>{p.categoryName}</td>
											<td>{p.createdAt && p.createdAt.split('T')[0]}</td>
											<td>
												<LinkContainer to={`/admin/category/${p._id}/edit`}>
													<Button variant='secondary' className='btn btn'>
														<i className='fa fa-edit'></i>
													</Button>
												</LinkContainer>

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

export default CategoryListScreen
