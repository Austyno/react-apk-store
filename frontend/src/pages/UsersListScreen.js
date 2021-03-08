import React, { useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Container, Row, Table } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getAllUsers, changePermission } from '../actions/userActions'

const UsersListScreen = () => {
	const dispatch = useDispatch()

	const userState = useSelector((state) => state.allUsers)

	const { loading, error, users } = userState

	const permState = useSelector((state) => state.changeRole)

	const loggedinUser = useSelector((state) => state.userLogin)

	

	const {
		loading: permissionLoading,
		error: permissionError,
		success,
	} = permState

	useEffect(() => {
		dispatch(getAllUsers())
	}, [dispatch, success])

	const deleteHandler = async (e, id) => {
		const del = window.confirm('Are you sure')
		const user = JSON.parse(localStorage.getItem('userInfo'))
		const { token } = user.userInfo

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}

		if (del) {
			const res = await axios.delete(`/api/users/${id}`, config)
			if (res.data.success === true) {
				dispatch(getAllUsers())
			}
		}
	}

	const changeUserRole = (e, id) => {
		e.preventDefault()
		dispatch(changePermission(id))
	}
	return (
		<>
			<Container className='mt-5'>
				{loading ? (
					<Loader />
				) : error ? (
					<Message>{error}</Message>
				) : permissionError ? (
					<Message>{permissionError}</Message>
				) : (
					<>
						<Row className='d-sm-flex align-items-center justify-content-between mb-4'>
							<Container>
								<h2 style={{ float: 'left' }}>
									All users [{users && users.length}]{' '}
								</h2>
								{/* <LinkContainer
									to='/admin/category/create'
									style={{ float: 'right', cursor: 'pointer' }}>
									<Button className=''>
										<i className='mdi mdi-plus md-36px'></i> Category
									</Button>
								</LinkContainer> */}
							</Container>
						</Row>
						<Table striped bordered hover responsive className='table-sm'>
							<thead>
								<th>SN</th>
								<th>ID</th>
								<th>Email</th>
								<th>Date Joined</th>
								<th>Number of Apps Uploaded</th>
								<th>Role</th>
								<th></th>
								<th></th>
								{/* <th></th> */}
							</thead>
							<tbody>
								{users &&
									users.map((p) => (
										<tr key={p._id}>
											<td></td>
											<td>{p._id}</td>
											<td>{p.email}</td>
											<td>{p.createdAt && p.createdAt.split('T')[0]}</td>
											<td>{p.products.length}</td>
											<td>{p.role}</td>
											{/* <td>
												<LinkContainer to={`/admin/category/${p._id}/edit`}>
													<Button variant='secondary' className='btn btn'>
														<i className='fa fa-edit'></i>
													</Button>
												</LinkContainer>
											</td> */}
											<td>
												<Button
													className='btn btn-secondary my-2 my-sm-0'
													onClick={(e) => changeUserRole(e, p._id)}>
													{p.role === 'admin' ? 'Make User' : 'Make Admin'}
												</Button>
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

export default UsersListScreen
