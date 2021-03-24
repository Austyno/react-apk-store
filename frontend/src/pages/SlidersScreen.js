import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Row, Table } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listSliders } from '../actions/sliderActions'
import { LinkContainer } from 'react-router-bootstrap'

const SlidersScreen = () => {
	const dispatch = useDispatch()
	const sliderState = useSelector((state) => state.sliderList)

	const { loading, error, images } = sliderState

	useEffect(() => {
		dispatch(listSliders())
	}, [dispatch])

	const deleteHandler = (e, id) => {}
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
									All images [{images && images.length}]{' '}
								</h2>
								<LinkContainer
									to='/admin/sliders/create'
									style={{ float: 'right', cursor: 'pointer' }}>
									<Button className=''>
										<i className='mdi mdi-plus md-36px'></i> Image
									</Button>
								</LinkContainer>
							</Container>
						</Row>
						<Table striped bordered hover responsive className='table-sm'>
							<thead>
								<th>SN</th>
								<th>ID</th>
								<th>Name</th>
								<th>Image</th>
								<th></th>
							</thead>
							<tbody>
								{images &&
									images.map((p) => (
										<tr key={p._id}>
											<td></td>
											<td>{p._id}</td>
											<td>{p.name}</td>
											<td>
												<img src={p.image} alt='' />
											</td>
											<td>{p.createdAt && p.createdAt.split('T')[0]}</td>
											<td>
												<LinkContainer to={`/admin/sliders/${p._id}/edit`}>
													<Button variant='secondary' className='btn btn-sm'>
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

export default SlidersScreen
