import React from 'react'
import { Carousel } from 'react-bootstrap'
import Diablo from '../images/diablo.jpg'
import Diablo2 from '../images/diablo2.jpeg'
import Diablo3 from '../images/diablo3.jpeg'

const Slider = () => {
	return (
		<>
			<Carousel>
				<Carousel.Item>
					<img
						className='d-block w-100'
						src={Diablo}
						alt='First slide'
						style={{ backgroundSize: 'cover', height: '100%' }}
					/>
					<Carousel.Caption>
						{/* <h3>First slide label</h3> */}
						{/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className='d-block w-100'
						src={Diablo2}
						alt='Second slide'
						style={{ backgroundSize: 'cover' }}
					/>

					<Carousel.Caption>
						{/* <h3>Second slide label</h3> */}
						{/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className='d-block w-100'
						src={Diablo3}
						alt='Third slide'
						style={{ backgroundSize: 'cover' }}
					/>

					<Carousel.Caption>
						{/* <h3>Third slide label</h3> */}
						{/* <p>
							Praesent commodo cursus magna, vel scelerisque nisl consectetur.
						</p> */}
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
		</>
	)
}

export default Slider
