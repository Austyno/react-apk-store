import React from 'react'
import { Card } from 'react-bootstrap'

const MobileSlider = ({ products }) => {
	return (
		<>
			<Card className='mt-3 app' aria-label='Gallery' style={{ height: '' }}>
				<Card.Header>
					<Card.Text style={{ float: 'right' }}>
						More <i className='fa fa-angle-double-right'></i>
					</Card.Text>
				</Card.Header>
				<ol className='hs full '>
					{/* {products &&
						products.map((p) => (
							<li>
								<Card.Img src={p.logo} style={{ width: '60px' }} />
							</li>
						))} */}
					<li>test1</li>
					<li>test2</li>
					<li>test3</li>
					<li>test4</li>
					<li>test5</li>
					<li>test6</li>
					<li>test7</li>
				</ol>
			</Card>
		</>
	)
}

export default MobileSlider
