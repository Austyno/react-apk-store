const Review = require('../models/Reviews')
const Product = require('../models/Product')
const ErrorResponse = require('../utils/errorResponse')

exports.addReviews = async (req, res, next) => {
	req.body.user = req.user.id
	req.body.product = req.params.id

	//check if user has downloaded app b4
	if (!req.user.myApps.includes(req.params.id)) {
		return next(new ErrorResponse('You cannot review this app', 400))
	}

	//check if user has reviewed this app b4
	const alreadyReviewed = await Review.findOne({
		$and: [{ user: req.user.id }, { product: req.body.product }],
	})

	if (alreadyReviewed !== null) {
		return next(new ErrorResponse('You have already reviewed this app', 400))
	}

	const review = new Review(req.body)

	try {
		await review.save()

		res.status(201).json({
			success: true,
			data: review,
		})
	} catch (error) {
		next(
			new ErrorResponse(
				`Sorry we could not add the review. Please try again`,
				500
			)
		)
	}
}

exports.getReviews = async (req, res, next) => {
	try {
		const reviews = await Review.find({ product: req.params.id }).populate(
			'user',
			'name'
		)

		res.status(200).json({
			success: true,
			count: reviews.length,
			data: reviews,
		})
	} catch (error) {
		next(new ErrorResponse('sorry something went wrong please try again', 500))
	}
}
