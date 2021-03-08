import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
	return <Alert variant={variant}>{children}</Alert>
}
// TODO: add a button to reset state on click by user
Message.defaultProps = {
	variant: 'info',
}

export default Message
