import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const AdminRoute = ({ component: Component, ...rest }) => {
	const userState = useSelector((state) => state.userLogin)

	const {
		userInfo: { userData },
	} = userState


	return (
		<Route
			{...rest}
			render={(props) =>
				!userData ? (
					<Redirect to='/login' />
				) : userData.role !== 'admin' ? (
					<Redirect to='/' />
				) : (
					<Component {...props} />
				)
			}
		/>
	)
}

export default AdminRoute
