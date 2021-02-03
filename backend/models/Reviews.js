const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: [true, 'Please add a title for the review'],
			maxlength: 100,
		},
		text: {
			type: String,
			required: [true, 'Please add some text'],
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: [true, 'Please add a rating between 1 and 5'],
		},
		product: {
			type: mongoose.Schema.ObjectId,
			ref: 'Product',
			required: true,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function (productId) {
	const obj = await this.aggregate([
		{
			$match: { product: productId },
		},
		{
			$group: {
				_id: '$productId',
				averageRating: { $avg: '$rating' },
			},
		},
	])

	try {
		await this.model('Product').findByIdAndUpdate(productId, {
			averageRating: obj[0].averageRating,
		})
	} catch (err) {
		console.error(err)
	}
}

// Call getAveragrating after save
ReviewSchema.post('save', function () {
	this.constructor.getAverageRating(this.product)
})

// Call getAverageCost before remove
ReviewSchema.pre('remove', function () {
	this.constructor.getAverageRating(this.product)
})

//update number of reviews for a product after save
ReviewSchema.post('save', async function () {
	const product = await this.model('Product').findById(this.product)
	product.numReviews = product.numReviews + 1
	product.save()
})

//update number of reviews for a course before deleting
ReviewSchema.pre('remove', async function () {
	const product = await this.model('Product').findById(this.product)
	product.numReviews = product.numReviews - 1
	product.save()
})
module.exports = mongoose.model('Review', ReviewSchema)
