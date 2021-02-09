import React from 'react'
import {
	Navbar,
	Nav,
	Form,
	FormControl,
	Image,
	FormGroup,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Logo from '../images/logo2.png'
import Android from '../images/android.png'
import Game from '../images/gamepad.jpeg'
import Bubble from '../images/chatbubble.png'
import Tech from '../images/tech.jpeg'

const Header = () => {
	return (
		<header>
			<Navbar
				bg='light'
				expand='lg'
				navbar='light'
				className='justify-content-between'>
				<LinkContainer to='/'>
					<Navbar.Brand>
						<Image
							src={Logo}
							style={{
								height: '50px',
								border: '5px solid black',
								padding: '5px',
							}}
						/>
					</Navbar.Brand>
				</LinkContainer>

				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						<LinkContainer to='/'>
							<Nav.Link
								className='mr-3'
								style={{
									fontFamily: 'Luminari, fantasy',
									fontWeight: 'bold',
								}}>
								<Image className='mr-2' src={Game} style={{ height: '30px' }} />
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
									className='mr-2'
									src={Android}
									style={{ height: '30px' }}
								/>
								APPS
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/blog'>
							<Nav.Link
								className='mr-3 navFont'
								style={{
									fontFamily: 'American Typewriter',
									fontWeight: 'bold',
								}}>
								<Image
									className='mr-2'
									src={Bubble}
									style={{ height: '25px' }}
								/>
								TOPICS
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/apps'>
							<Nav.Link
								className='mr-2'
								style={{
									fontFamily: 'American Typewriter',
									fontWeight: 'bold',
								}}>
								<Image className='mr-2' src={Tech} style={{ height: '25px' }} />
								PRODUCTS
							</Nav.Link>
						</LinkContainer>
					</Nav>
					<Form inline>
						<FormGroup style={{ float: 'right' }}>
							<FormControl
								type='text'
								placeholder='Search'
								className='mr-sm-2'
							/>
							{/* <i className='fa fa-search fa-2x'></i> */}
						</FormGroup>
					</Form>
				</Navbar.Collapse>
			</Navbar>
		</header>
	)
}

export default Header
