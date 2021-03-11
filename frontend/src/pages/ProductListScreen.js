import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import {
	getAdminApps,
	approveProduct,
	deleteProduct,
} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductListScreen = ({ history }) => {
	const [count, setCount] = useState(1)

	const dispatch = useDispatch()
	const productState = useSelector((state) => state.allAppsForAdmin)

	const { loading, error, adminApps } = productState

	const approveState = useSelector((state) => state.approveProduct)

	const { success } = approveState

	const delState = useSelector((state) => state.deleteProduct)

	const { success: deleteSuccess } = delState

	useEffect(() => {
		dispatch(getAdminApps())
	}, [dispatch, success, deleteSuccess])

	const deleteHandler = (id) => {
		const del = window.confirm('are you sure you want to delete the product')
		if (del) {
		dispatch(deleteProduct(id))
		}
	}

	const handleApprove = async (id) => {
		dispatch(approveProduct(id))
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
									All Apks [{adminApps && adminApps.length}]{' '}
								</h2>
								<LinkContainer
									to='/admin/create/product'
									style={{ float: 'right' }}>
									<Button className=''>
										<i className='mdi mdi-plus'></i>Product
									</Button>
								</LinkContainer>
							</Container>
						</Row>
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
													style={{ height: '50px', width: '50px' }}
												/>
											</td>
											<td>{p.name}</td>
											<td>{p.category && p.category.categoryName}</td>
											<td>
												{p.uploadedBy !== null ? p.uploadedBy.email : 'Admin'}
											</td>
											<td>{p.totalDownloads}</td>
											<td>{p.createdAt.split('T')[0]}</td>
											<td>
												{p.isApproved ? (
													<i
														className='fa fa-check'
														style={{ color: 'green' }}></i>
												) : (
													<Button
														className='btn btn-secondary my-2 my-sm-0'
														onClick={() => handleApprove(p._id)}>
														Approve
													</Button>
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
