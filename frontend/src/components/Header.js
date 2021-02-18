import React from 'react'
import { Nav, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Logo from '../images/logo2.png'
import Android from '../images/android.png'
import Game from '../images/game.png'
import Topics from '../images/topics.png'
import Tech from '../images/products.png'
import './css/off-canvas.css'

const Header = () => {
	const toggleDrawer = () => {
		document.querySelector('.offcanvas-collapse').classList.toggle('open')
	}

	return (
		<header>
			<nav
				style={{
					fontFamily: 'American Typewriter',
					fontWeight: 'bold',
				}}
				className='navbar navbar-expand-lg fixed-top navbar-light bg-light'
				aria-label='Main navigation'>
				<div className='container-fluid'>
					<Image
						src={Logo}
						className='mr-5'
						style={{
							height: '50px',
							border: '4px solid black',
							padding: '5px',
							borderRadius: '2px',
						}}
					/>
					<button
						onClick={toggleDrawer}
						className='navbar-toggler p-0 border-0'
						type='button'
						data-bs-toggle='offcanvas'
						aria-label='Toggle navigation'>
						<span className='navbar-toggler-icon'></span>
					</button>

					<div
						className='navbar-collapse offcanvas-collapse mt-2 mx-auto'
						id='navbarsExampleDefault'>
						{/* <ul className='navbar-nav me-auto mb-2 mb-lg-0 mt-2'> */}
						<LinkContainer to='/'>
							<Nav.Link
								className='mr-3'
								style={{
									fontFamily: 'American Typewriter',
									fontWeight: 'bold',
								}}>
								<Image className='mr-3' src={Game} style={{ height: '30px' }} />
								Home
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/apps'>
							<Nav.Link
								className='mr-3 navFont'
								style={{
									fontFamily: 'American Typewriter',
									fontWeight: 'bold',
								}}>
								<Image
									className='mr-3'
									src={Android}
									style={{ height: '30px' }}
								/>
								APPS
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/post'>
							<Nav.Link
								className='mr-3 navFont'
								style={{
									fontFamily: 'American Typewriter',
									fontWeight: 'bold',
								}}>
								<Image
									className='mr-3'
									src={Topics}
									style={{ height: '25px' }}
								/>
								TOPICS
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/apps'>
							<Nav.Link
								className='mr-3'
								style={{
									fontFamily: 'American Typewriter',
									fontWeight: 'bold',
								}}>
								<Image className='mr-3' src={Tech} style={{ height: '25px' }} />
								PRODUCTS
							</Nav.Link>
						</LinkContainer>

						<form className='d-flex ml-auto'>
							<input
								className='form-control mr-2'
								type='search'
								placeholder='Search'
								aria-label='Search'
							/>
							<button className='btn btn-outline-success' type='submit'>
								Search
							</button>
						</form>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Header
