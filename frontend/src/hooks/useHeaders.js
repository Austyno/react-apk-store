import React from 'react'
import { useSelector } from 'react-redux'

const useHeaders = () => {
	const loginState = useSelector((state) => state.userLogin)

	const {
		userInfo: { userData, token },
	} = loginState

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
	return config
}
export default useHeaders
