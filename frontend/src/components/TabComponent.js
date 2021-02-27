import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { Card, Col, Row } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'

const TabComponent = ({ catName, tab1, tab2 }) => {
	const [currentTab, setCurrentTab] = useState(1)

	const dispatch = useDispatch()
	const productList = useSelector((state) => state.productList)

	const { products } = productList

	const displayProducts = products.slice(0, 12)

	useEffect(() => {
		dispatch(listProducts())
	}, [dispatch])

	return (
		<Card className='mt-4' style={{ backgroundColor: '#FFFFFF' }}>
			<div className='tabs'>
				<Card.Header
					className=''
					style={{
						height: '55px',
						fontFamily: 'American Typewriter',
						fontWeight: 'bold',
					}}>
					<Card.Text style={{ float: 'left' }}>{catName} </Card.Text>
					<ul className='nav nav-tabs' style={{ float: 'right' }}>
						<li
							className={`nav-item nav-link ${
								currentTab === 1 ? 'active' : ''
							}`}
							onMouseOver={() => setCurrentTab(1)}>
							{tab1}
						</li>
						<li
							className={`nav-item nav-link ${
								currentTab === 2 ? 'active' : ''
							}`}
							style={{ float: 'right' }}
							onMouseOver={() => setCurrentTab(2)}>
							{tab2}
						</li>
					</ul>
				</Card.Header>
				<Card.Body>
					<div className='tab-content'>
						{currentTab === 1 && (
							<div className={`tab-pane ${currentTab === 1 ? 'active' : ''}`}>
								<Row>
									{displayProducts &&
										displayProducts.map((p) => (
											<Col key={p._id} sm={12} md={4} lg={3} xl={3}>
												<Product product={p} />
											</Col>
										))}
								</Row>
							</div>
						)}
						{currentTab === 2 && (
							<div className={`tab-pane ${currentTab === 2 ? 'active' : ''}`}>
								<Row>
									{displayProducts &&
										displayProducts.map((p) => (
											<Col key={p._id} sm={12} md={4} lg={3} xl={3}>
												<Product product={p} />
											</Col>
										))}
								</Row>
							</div>
						)}
					</div>
				</Card.Body>
			</div>
		</Card>
	)
}

export default TabComponent
