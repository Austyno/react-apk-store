const path = require('path')
const fs = require('fs')
const ErrorResponse = require('../utils/errorResponse')
const Product = require('../models/Product')

// @desc      Get all products
// @route     GET /api/v1/products
// @access    Public
const getApks = async (req, res, next) => {
	try {
		const apks = await Product.find({ isApproved: true })
			.populate('uploadedBy', 'name email')
			.populate('category', 'categoryName')
			.select('-apk')

		res.status(200).json({
			success: true,
			count: apks.length,
			data: apks,
		})
	} catch (error) {
		next(
			new ErrorResponse(
				`sorry something went wrong. Please reload your browser`,
				500
			)
		)
	}
}

// @desc      Get product
// @route     GET /api/v1/products/:id
// @access    Public
const getApk = async (req, res, next) => {
	const id = req.params.id

	try {
		const product = await Product.findById(id)
			.populate('uploadedBy', 'name')
			.populate('category', 'categoryName')
			.select('-apk')
		res.status(200).json({
			success: true,
			data: product,
		})
	} catch (error) {
		next(new ErrorResponse('sorry cannot load product now.', 500))
	}
}

// @desc      Add product
// @route     POST /api/v1/products/
// @access    Private
const uploadApk = async (req, res, next) => {
	req.body.uploadedBy = req.user.id

	const { apk } = req.body

	if (!req.user) {
		return next(
			new ErrorResponse(
				'user not authorized to upload apk. Please sign up and Login',
				400
			)
		)
	}
	if (req.user.role === 'admin') {
		req.body.isApproved = true
	}

	if (!apk) {
		return next(
			new ErrorResponse('Please add a download link for the apk', 400)
		)
	}

	if (apk) {
		try {
			const result = await Product.create(req.body)

			res.status(201).json({
				success: true,
				data: result,
			})
		} catch (err) {
			next(
				new ErrorResponse('sorry something went wrong. Please try again', 500)
			)
		}
	}
}

const uploadImages = (req, res, next) => {
	const logo = req.files.logo
	const allowedMediaTypes = ['jpg', 'jpeg', 'png', 'mp4', 'mp3']
	const allowedLogoTypes = ['jpg', 'jpeg', 'png']

	if (!allowedLogoTypes.includes(logo.mimetype.split('/')[1])) {
		return next(
			new ErrorResponse(
				`Image type ${
					logo.mimetype.split('/')[1]
				} is not allowed. Allowed Logo types ${allowedLogoTypes}`,
				400
			)
		)
	}

	if (logo.size > 1000000) {
		return next(
			new ErrorResponse(
				`logo file size is too large. Upload a file les than 1mb`,
				400
			)
		)
	}

	// //check image type
	// if (!allowedMediaTypes.includes(media.mimetype.split('/')[1])) {
	// 	return next(
	// 		new ErrorResponse(
	// 			`media type ${
	// 				media.mimetype.split('/')[1]
	// 			} is not allowed. Allowed media types ${allowedMediaTypes}`,
	// 			400
	// 		)
	// 	)
	// }

	// //check file size
	// if (media.size > process.env.MAX_FILE_UPLOAD) {
	// 	return next(
	// 		new ErrorResponse(
	// 			`Please upload a file less than ${
	// 				process.env.MAX_FILE_UPLOAD / 1000000
	// 			}mb`,
	// 			400
	// 		)
	// 	)
	// }

	const newName = `${logo.name.split('.')[0]}-${Date.now()}${path.extname(
		logo.name
	)}`

	const upldPath = path.join(__dirname, '../../frontend/public/img/mediaFiles/')

	const upld = logo.mv(`${upldPath}/${newName}`)

	res.status(201).json({
		success: true,
		data: `/img/mediaFiles/${newName}`,
	})
}

// @desc      Update apk
// @route     PUT /api/v1/products/:id
// @access    Private
const updateApk = async (req, res, next) => {
	const file = Product.findById(req.params.id)

	if (req.user.id !== file.uploadedBy && req.user.role !== 'admin') {
		return next(new ErrorResponse('you do not own this file', 400))
	}

	if (!file) {
		return next(new ErrorResponse('file not found', 404))
	}

	try {
		const updateFile = await Product.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		)
		res.status(200).json({
			success: true,
			data: updateFile,
		})
	} catch (error) {
		next(new ErrorResponse('failed to update, please try again', 500))
	}
}

// @desc      DElete apk
// @route     PUT /api/v1/products/:id
// @access    Private Admin
const deleteApk = async (req, res, next) => {
	const file = await Product.findById(req.params.id)

	if (!file) {
		return next(new ErrorResponse('file does not exist', 400))
	}

	try {
		// locate all media files and delete
		if (fs.existsSync(`${process.env.FILE_UPLOAD_PATH}/${file.productMedia}`)) {
			fs.unlinkSync(`${process.env.APK_FOLDER}/${file.name}`)
			fs.unlinkSync(`${process.env.FILE_UPLOAD_PATH}/${file.productMedia}`)
			fs.unlinkSync(`${process.env.FILE_UPLOAD_PATH}/${file.logo}`)
		}
		const del = await Product.findByIdAndDelete(req.params.id)

		res.status(200).json({
			success: true,
			data: [],
		})
	} catch (error) {
		return next(
			new ErrorResponse(
				'sorry could not delete file now. Please try again',
				500
			)
		)
	}
}

const getEditorsChoice = async (req, res, next) => {
	try {
		// const editorchoice = await Product.find({
		// 	$and: [{ isApproved: true }, { editorsChoice: true }],
		// })
		const editorchoice = await Product.find({
			isApproved: true,
		})
			.populate('category', 'categoryName')
			.select('-apk')

		res.status(200).json({
			success: true,
			data: editorchoice,
		})
	} catch (error) {
		next(
			new ErrorResponse(
				`sorry something went wrong. Please reload your browser`,
				500
			)
		)
	}
}
const allApps = async (req, res, next) => {
	try {
		const apps = await Product.find({ isApproved: true })

		res.status(200).json({
			success: true,
			data: apps,
		})
	} catch (error) {
		next(new ErrorResponse('something went wrong', 500))
	}
}

//for admin
const getApprovedAndUnapprovedApps = async (req, res, next) => {
	try {
		const allApks = await Product.find()
			.populate('uploadedBy', 'name email')
			.populate('category', 'categoryName')
			.select('-apk')

		res.status(200).json({
			success: true,
			count: allApks.length,
			data: allApks,
		})
	} catch (error) {
		next(
			new ErrorResponse(
				`sorry something went wrong. Please reload your browser`,
				500
			)
		)
	}
}

module.exports = {
	getApks,
	getApk,
	uploadApk,
	updateApk,
	deleteApk,
	uploadImages,
	getEditorsChoice,
	allApps,
	getApprovedAndUnapprovedApps,
}
// t5cLH3Bv3Et&@fD
