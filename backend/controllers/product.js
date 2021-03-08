const path = require('path')
const fs = require('fs')
const ErrorResponse = require('../utils/errorResponse')
const Product = require('../models/Product')


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

const uploadProduct = async (req, res, next) => {
	try {
		req.body.uploadedBy = req.user.id
		if (req.user.role === 'admin') {
			req.body.isApproved = true
		}
		const product = await Product.create(req.body)
		res.status(201).json({
			success: true,
			data: product,
		})
	} catch (error) {
		next(new ErrorResponse('something went wrong.Please try again', 500))
	}
}



const uploadApk = async (req, res, next) => {
	req.body.uploadedBy = req.user.id

	const apkFile = req.files.apk

	if (apkFile.name.split('.')[1] !== 'apk') {
		return next(new ErrorResponse('please upload an apk file', 400))
	}

	const newName = `${apkFile.name.split('.')[0]}-${Date.now()}${path.extname(
		apkFile.name
	)}`
	const uploadPath = path.join(__dirname, '../apks')

	try {
		const upld = apkFile.mv(`${uploadPath}/${newName}`)

		res.status(200).json({
			success: true,
			data: `${uploadPath}/${newName}`,
		})
	} catch (error) {
		next(new ErrorResponse('sorry could not upload file', 500))
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
				} is not allowed. Allowed image types ${allowedLogoTypes}`,
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


const deleteApk = async (req, res, next) => {
	const file = await Product.findById(req.params.id)

	if (!file) {
		return next(new ErrorResponse('file does not exist', 400))
	}
	const logoPath = path.join(__dirname, '../../frontend/public/img/mediaFiles/')
	const logoName = file.logo.split('/')[3]

	const apk = file.apk

	console.log(`${logoPath}${logoName}`)

	try {
		// locate logo and apk and delete
		if (fs.existsSync(apk) && fs.existsSync(`${logoPath}${logoName}`)) {
			fs.unlinkSync(`${logoPath}${logoName}`)
			fs.unlinkSync(apk)
		}
		// delete everything else
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
		/** change code in production to show only approved and editors choice */
		const editorchoice = await Product.find({
			$and: [{ isApproved: true }, { editorsChoice: true }],
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

const approve = async (req, res, next) => {
	const file = await Product.findById(req.params.id)
	if (!file) {
		return next(new ErrorResponse('the file does not exist', 400))
	}
	if (file.isApproved === true) {
		return next(new ErrorResponse('file has already been approved', 400))
	}

	try {
		const upd = await Product.findByIdAndUpdate(
			req.params.id,
			{ isApproved: true },
			{ new: true }
		)

		res.status(201).json({
			success: true,
			data: 'file updated successfully',
		})
	} catch (error) {
		return next(new ErrorResponse('something went wrong please try again', 500))
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
	approve,
	uploadProduct,
}
// t5cLH3Bv3Et&@fD
