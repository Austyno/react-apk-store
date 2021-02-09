import React from 'react'
import Slider from 'react-animated-slider'
import 'react-animated-slider/build/horizontal.css'
import Teacher from '../images/teachers.jpg'
import Edu from '../images/edu.jpg'
import Fin from '../images/finc.jpg'

const jumbotron = () => {
	const slides = [
		{ title: 'First item', description: 'Lorem ipsum', image: Fin },
		{ title: 'Second item', description: 'Lorem ipsum', image: Edu },
		{ title: 'Second item', description: 'Lorem ipsum', image: Teacher },
	]
	return (
		<>
			<Slider
				className='animateIn'
				autoplay={2000}
				duration={3000}
				previousButton={<i className='fa fa-angle-double-left'></i>}
				nextButton={<i className='fa fa-angle-double-right'></i>}
				style={{
					backgroundSize: 'cover',
					width: '100%',
					height: '1000px',
				}}>
				{slides.map((slide, index) => (
					<div key={index}>
						<img src={slide.image} alt='' />
					</div>
				))}
			</Slider>
		</>
	)
}

export default jumbotron
