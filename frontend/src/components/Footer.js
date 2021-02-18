import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
	return (
		<footer style={{ backgroundColor: '#E8EFFF' }}>
			<Container>
				<Row>
					<Col className='text-center py-3'>copyright &copy; Apk Store</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer
