import React, { useEffect, useState } from 'react'
import { Nav, Image, Dropdown, ButtonGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Logo from '../images/logo2.png'
import Android from '../images/android.png'
import Game from '../images/game.png'
import Topics from '../images/topics.png'
import Tech from '../images/products.png'
import './css/off-canvas.css'
import signUp from '../images/signup.png'
import { useSelector } from 'react-redux'

const Header = ({ history }) => {
	const user = useSelector((state) => state.userLogin)

	const { userInfo } = user

	// useEffect(() => {
	// 	const userFromStorage = JSON.parse(localStorage.getItem('userInfo'))
	// 	if (userFromStorage.userData.role === 'admin') {
	// 		return history.push('/admin/products/')
	// 	}
	// }, [history])

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
						{/* mobile nav */}
						<div className='mobile-nav'>
							<LinkContainer to='/login'>
								<Nav.Link
									className='mr-3'
									style={{
										fontFamily: 'American Typewriter',
										fontWeight: 'bold',
									}}>
									<span class='mdi mdi-account-outline mdi-24px'></span>
									sign in
								</Nav.Link>
							</LinkContainer>
							<hr />
							{/* <a href='#'>Home</a> */}
							<LinkContainer to=''>
								<Nav.Link
									className='mr-3'
									style={{
										fontFamily: 'American Typewriter',
										fontWeight: 'bold',
									}}>
									<i className='fa fa-user fa-2x'></i>
									search App
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to=''>
								<Nav.Link
									className='mr-3'
									style={{
										fontFamily: 'American Typewriter',
										fontWeight: 'bold',
									}}>
									<i className='fa fa-user fa-2x'></i>
									Hot Games
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to='/login'>
								<Nav.Link
									className='mr-3'
									style={{
										fontFamily: 'American Typewriter',
										fontWeight: 'bold',
									}}>
									<i className='fa fa-user fa-2x'></i>
									Hot Apps
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to=''>
								<Nav.Link
									className='mr-3'
									style={{
										fontFamily: 'American Typewriter',
										fontWeight: 'bold',
									}}>
									<i className='fa fa-user fa-2x'></i>
									Category
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to=''>
								<Nav.Link
									className='mr-3'
									style={{
										fontFamily: 'American Typewriter',
										fontWeight: 'bold',
									}}>
									<i className='fa fa-user fa-2x'></i>
									Editors Choice
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to=''>
								<Nav.Link
									className='mr-3'
									style={{
										fontFamily: 'American Typewriter',
										fontWeight: 'bold',
									}}>
									<i className='fa fa-user fa-2x'></i>
									Discover Apps
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to=''>
								<Nav.Link
									className='mr-3'
									style={{
										fontFamily: 'American Typewriter',
										fontWeight: 'bold',
									}}>
									<i className='fa fa-user fa-2x'></i>
									Games on Sale
								</Nav.Link>
							</LinkContainer>
						</div>
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
							{/* <button className='btn btn-outline-success' type='submit'>
								Search
							</button> */}
						</form>
					</div>
					<Dropdown as={ButtonGroup}>
						<Dropdown.Toggle
							className='sign-in'
							variant='default'
							style={{ border: 'none' }}>
							{/* <span className='fa fa-user fa-2x'></span> */}
							<img
								src={signUp}
								alt=''
								style={{ height: '40px', width: '40px' }}
							/>
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{userInfo &&
							userInfo.userData &&
							userInfo.userData.role === 'admin' ? (
								<>
									<LinkContainer to='/admin/products'>
										<Dropdown.Item>Product List</Dropdown.Item>
									</LinkContainer>

									<LinkContainer to='/admin/category'>
										<Dropdown.Item>Category List</Dropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/users'>
										<Dropdown.Item>User List</Dropdown.Item>
									</LinkContainer>
									<Dropdown.Divider />
								</>
							) : (
								''
							)}
							{userInfo && userInfo.userData ? (
								<LinkContainer to='/logout'>
									<Dropdown.Item>Logout</Dropdown.Item>
								</LinkContainer>
							) : (
								<>
									<LinkContainer to='/register'>
										<Dropdown.Item>Sign Up</Dropdown.Item>
									</LinkContainer>

									<Dropdown.Divider />
									<LinkContainer to='/login'>
										<Dropdown.Item>Sign In</Dropdown.Item>
									</LinkContainer>
								</>
							)}
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</nav>
		</header>
	)
}

export default Header
