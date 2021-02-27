import React, { useEffect } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { getAdminApps } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductListScreen = ({ history }) => {
	const dispatch = useDispatch()
	const productState = useSelector((state) => state.allAppsForAdmin)

	const { loading, error, adminApps } = productState

	const user = useSelector((state) => state.userLogin)

	const { userInfo } = user

	useEffect(() => {
		if (!userInfo.token) {
			history.push('/')
		} else {
			dispatch(getAdminApps())
		}
	}, [dispatch, history, userInfo.token])

	const deleteHandler = (id) => {
		console.log(id)
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
						<h1>All apks </h1>
						<Table striped bordered hover responsive className='table-sm'>
							<thead>
								<th>SN</th>
								<th>ID</th>
								<th>LOGO</th>
								<th>NAME</th>
								<th>CATEGORY</th>
								<th>UPLOADED BY</th>
								<th>TOTAL DOWNLOADS</th>
								<th>DATE ADDED</th>
								<th>IS APPROVED</th>
								<th></th>
							</thead>
							<tbody>
								{adminApps &&
									adminApps.map((p) => (
										<tr key={p._id}>
											<td></td>
											<td>{p._id}</td>
											<td>
												<img
													src={p.logo}
													alt=''
													style={{ height: '50p', width: '50px' }}
												/>
											</td>
											<td>{p.name}</td>
											<td>{p.category.categoryName}</td>
											<td>{p.uploadedBy !== null ? p.uploadedBy.email : ''}</td>
											<td>{p.totalDownloads}</td>
											<td>{p.createdAt.split('T')[0]}</td>
											<td>
												{p.isApproved ? (
													<i
														className='fa fa-check'
														style={{ color: 'green' }}></i>
												) : (
													<Button variant='info'>Approve</Button>
												)}
											</td>
											<td>
												<LinkContainer to={`/admin/products/${p._id}/edit`}>
													<Button variant='secondary' className='btn btn-sm'>
														<i className='fa fa-edit'></i>
													</Button>
												</LinkContainer>

												<Button
													variant='danger'
													className='btn btn-sm'
													onClick={() => deleteHandler(p._id)}>
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

export default ProductListScreen
