import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LogoutUser } from '../actions/userActions'

const Logout = ({ history }) => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(LogoutUser())
	}, [dispatch])

	history.push('/')
}

export default Logout
