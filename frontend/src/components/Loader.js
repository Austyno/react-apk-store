import React from 'react'
import { Container } from 'react-bootstrap'
import './css/loader1.css'

const Loader = () => {
	return (
		<>
			<Container className='mt-5'>
				<div className='boxes'>
					<div className='box'>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<div className='box'>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<div className='box'>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<div className='box'>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			</Container>
		</>
	)
}

export default Loader
