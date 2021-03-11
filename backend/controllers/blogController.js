const Blog = require('../models/Blog')
const ErrorResponse = require('../utils/errorResponse')

exports.allPost = async (req, res, next) => {
	try {
		const allPost = await Blog.find({}).sort({ createdAt: -1 })
		res.status(200).json({
			success: true,
			data: allPost,
		})
	} catch (error) {
		next(
			new ErrorResponse(
				'sorry something went wrong on the server,pleas try again',
				500
			)
		)
	}
}

exports.addPost = async (req, res, next) => {
	const { title, content } = req.body

	if (!title) {
		return next(new ErrorResponse('Title is required', 400))
	}
	if (!content) {
		return next(new ErrorResponse('Content is required', 400))
	}
	try {
		const post = await Blog.create(req.body)

		res.status(201).json({
			success: true,
			data: post,
		})
	} catch (error) {
		next(new ErrorResponse('sorry something went wrong please try again', 500))
	}
}

exports.singlePost = async (req, res, next) => {
	const id = req.params.id

	// try {
	const post = await Blog.findById(id).populate('category', 'categoryName')

	if (!post) {
		return next(new ErrorResponse('post does not exist', 400))
	}

	res.status(200).json({
		success: true,
		data: post,
	})
	// } catch (error) {
	// next(new ErrorResponse('something went wrong please try again', 500))
	// }
}

exports.allPostAdmin = async (req, res, next) => {
	try {
		const posts = await Blog.find()
			.sort({ createdAt: -1 })
			.populate('category', 'categoryName')

		res.status(200).json({
			success: true,
			data: posts,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			data: error,
		})
	}
}

exports.deletePost = async (req, res, next) => {
	const post = await Blog.findById(req.params.id)
	console.log(post)

	const imagePath = path.join(
		__dirname,
		'../../frontend/public/img/mediaFiles/'
	)
	const imageName = file.logo.split('/')[3]

	// console.log(`${imagePath}${imageName}`)
}
