const Category = require('../models/Category')
const ErrorResponse = require('../utils/errorResponse')
const Product = require('../models/Product')

exports.addCategory = async (req, res, next) => {
	try {
		const cat = await Category.create(req.body)

		res.status(201).json({
			success: true,
			data: cat,
		})
	} catch (error) {
		next(new ErrorResponse('category creation failed, Please try again', 500))
	}
}

exports.getCategories = async (req, res, next) => {
	const cat = await Category.find()
	res.status(200).json({
		success: true,
		count: cat.length,
		data: cat,
	})
}

exports.deleteCategory = async (req, res, next) => {
	const cat = Category.findById(req.params.id)

	if (!cat) {
		return next(new ErrorResponse('Category does not exist', 400))
	}
	try {
		const deleteCat = await Category.findByIdAndDelete(req.params.id)
		res.status(200).json({
			success: true,
			data: [],
		})
	} catch (error) {
		return next(
			new ErrorResponse('could not delete category. Please try again', 500)
		)
	}
}
exports.updateCategory = async (req, res, next) => {
	const cat = await Category.findById(req.params.id)

	if (!cat) {
		return next(new ErrorResponse('Category does not exist', 400))
	}

	try {
		const update = await Category.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})

		res.status(201).json({
			success: true,
			data: update,
		})
	} catch (error) {
		next(
			new ErrorResponse(
				'sorry could not update at the moment, please try again'
			)
		)
	}
}
exports.getProducts = async (req, res, next) => {
	const cat = await Category.findById(req.params.id)

	if (!cat) {
		return next(new ErrorResponse('this category does not exist', 400))
	}

	try {
		const products = await Product.find({ category: req.params.id })
		res.status(200).json({
			success: true,
			data: products,
		})
	} catch (error) {
		next(new ErrorResponse('sorry something went wrong please try again', 500))
	}
}
