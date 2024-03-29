const ErrorResponse = require('../utils/errorResponse')
const crypto = require('crypto')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const sendEmail = require('../utils/sendEmail')
const generateJwtToken = require('../utils/jwtToken')

// @desc      Create user
// @route     POST /api/users/register
// @access    Public
exports.register = async (req, res, next) => {
	const { email, password } = req.body

	//check if email already exist
	const emailExist = await User.findOne({ email })

	if (emailExist !== null) {
		return next(new ErrorResponse(`A user with ${email} already exist`, 400))
	}

	const salt = await bcrypt.genSalt(10)

	const hashPassword = await bcrypt.hash(password, salt)

	try {
		const user = await new User({
			email: email,
			password: hashPassword,
		}).save()

		const token = generateJwtToken(user._id)

		user.password = ''

		res.status(201).json({
			success: true,
			userData: user,
			token,
		})
	} catch (e) {
		next(
			new ErrorResponse(
				'sorry we could not register you now . please try again',
				500
			)
		)
	}
}

// @desc      Login User
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = async (req, res, next) => {
	const { email, password } = req.body

	if (!email || !password) {
		return next(new ErrorResponse('Please provide an email and password', 400))
	}

	const user = await User.findOne({ email }).select('+password')

	if (!user) {
		return next(new ErrorResponse('Invalid credentials', 401))
	}

	const matchPassword = bcrypt.compareSync(password, user.password)

	if (!matchPassword) {
		return next(new ErrorResponse('Invalid credentials', 401))
	}
	user.password = ''
	const token = generateJwtToken(user._id)

	res.status(200).json({
		success: true,
		userData: user,
		token,
	})
}

// @desc      Get forgot password rest token.email will be sent to the user from the frontend and include the reset token
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email })

	if (user === null) {
		next(new ErrorResponse(`There is no user with ${req.body.email}`, 404))
	}

	//create reset token
	const resetToken = crypto.randomBytes(20).toString('hex')

	//hash token(for security purposes) and save to db
	const hashedToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex')

	user.resetPasswordToken = hashedToken
	user.resetPasswordExpire = Date.now() + 15 * 60 * 1000

	await user.save()

	const resetUrl = `${req.protocol}://${req.get(
		'host'
	)}/api/auth/resetpassword/${resetToken}`

	const message = `You are receiving this email because you (or someone else) has requested the reset of a password. \n\n ${resetUrl}`

	try {
		await sendEmail({
			email: user.email,
			subject: 'Password reset token',
			message,
		})

		res.status(200).json({
			success: true,
			data: 'Email sent',
			expiresIn: user.resetPasswordExpire,
		})

		// res.status(200).json({
		//     success: true,
		//     data: resetToken,
		//     expiresIn : user.resetPasswordExpire
		//     })
	} catch (err) {
		user.resetPasswordToken = undefined
		user.resetPasswordExpire = undefined

		await user.save()
		next(
			new ErrorResponse(
				`Sorry Could not generate reset token at this point please try again`,
				500
			)
		)
	}
}
// @desc      Rest password
// @route     PUT /api/v1/auth/resetpassword/:resettokken
// @access    Public
exports.resetPassword = async (req, res, next) => {
	// Get hashed token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.resettoken)
		.digest('hex')

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	})

	if (user === null) {
		return next(new ErrorResponse(`Invalid token`, 400))
	}

	try {
		const salt = await bcrypt.genSalt(10)

		const hashPassword = bcrypt.hashSync(req.body.password, salt)

		user.password = hashPassword
		user.resetPasswordToken = undefined
		user.resetPasswordExpire = undefined

		//generate token to log user in
		const token = generateJwtToken(user._id)

		await user.save()

		res.status(200).json({
			success: true,
			data: token,
		})
	} catch (error) {
		next(
			new ErrorResponse(
				'sorry we could not reset the password at this time',
				500
			)
		)
	}
}
exports.allUsers = async (req, res, next) => {
	try {
		const users = await User.find().populate('products', 'name')
		res.status(200).json({
			success: true,
			data: users,
		})
	} catch (error) {
		next(new ErrorResponse('something went wrong,please try again', 500))
	}
}

exports.changeRole = async (req, res, next) => {
	const loggedinUserId = req.user._id
	const id = req.params.id

	if (loggedinUserId.toString() === id.toString()) {
		return next(new ErrorResponse('You cannot change your own role', 400))
	}

	try {
		const user = await User.findById(id)
		let changedRole

		if (user.role === 'admin') {
			changedRole = 'user'
		} else if (user.role === 'user') {
			changedRole = 'admin'
		}

		const updateUser = await User.findByIdAndUpdate(
			id,
			{ role: changedRole },
			{ new: true }
		)
		res.status(200).json({
			success: true,
			data: updateUser,
		})
	} catch (error) {
		next(new ErrorResponse('sorry something went wrong', 500))
	}
}
exports.deleteUser = async (req, res, next) => {
	const id = req.params.id
	try {
		const del = await User.findByIdAndDelete(id)

		res.status(200).json({
			success: true,
			data: [],
		})
	} catch (error) {}
}
