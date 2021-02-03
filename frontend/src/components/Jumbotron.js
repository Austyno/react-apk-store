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
			<Slider className='animateIn' autoplay={2000} duration={3000}>
				{slides.map((slide, index) => (
					<div key={index}>
						{/* <span style={{ marginBottom: '-100px' }}>{slide.title}</span> */}
						<img
							src={slide.image}
							alt=''
							style={{
								backgroundSize: 'cover',
								width: '100%',
								height: '1000px',
							}}
						/>
						{/* <div>{slide.description}</div> */}
					</div>
				))}
			</Slider>
		</>
	)
}

export default jumbotron
