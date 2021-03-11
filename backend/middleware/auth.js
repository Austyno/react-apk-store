const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')

// Protect routes
exports.protect = async (req, res, next) => {
	let token

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		// Set token from Bearer token in header
		token = req.headers.authorization.split(' ')[1]
	}

	// Make sure token exists
	if (token === null) {
		return next(new ErrorResponse('Not authorized to access this route', 401))
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		req.user = await User.findById(decoded.id)

		next()
	} catch (err) {
		// return next(new ErrorResponse('Access denied', 401))
		res.status(500).json({
			success: false,
			data: err,
		})
	}
}

// Grant access to specific roles
exports.admin = (req, res, next) => {
	if (req.user.role == 'admin') {
		return next()
	}
	// return next(new ErrorResponse('Access denied', 401))
	res.status(401).json({
		success: false,
		data: 'access denied',
	})
}
