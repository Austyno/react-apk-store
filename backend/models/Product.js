const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Apk Name is required'],
			trim: true,
		},
		apk: {
			type: String,
			required: [true, 'File Apk is required'],
		},
		logo: {
			type: String,
			required: [true, 'Logo for the apk is required'],
		},
		productMedia: {
			type: [String],
			required: [true, 'Image or video is required'],
		},
		brand: {
			type: String,
			required: [true, 'Brand / company is required'],
			trim: true,
		},
		price: {
			type: Number,
		},
		category: {
			type: mongoose.Schema.ObjectId,
			required: true,
			ref: 'Category',
		},
		uploadedBy: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
		version: {
			type: String,
		},
		description: {
			type: String,
			required: [true, 'Description is required'],
		},
		googlePlayLink: {
			type: String,
		},
		isApproved: {
			type: Boolean,
			default: false,
		},
		averageRating: {
			type: Number,
			min: [1, 'Rating must be at least 1'],
			max: [10, 'Rating must can not be more than 10'],
		},
		numReviews: {
			type: Number,
			default: 0,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		toJSON: { virtuals: true },
	}
)
ProductSchema.pre('remove', async function (next) {
	await this.model('Review').deleteMany({ productId: this._id })

	next()
})

ProductSchema.virtual('reviews', {
	ref: 'Review',
	localField: '_id',
	foreignField: 'product',
	justOne: false,
})

module.exports = mongoose.model('Product', ProductSchema)
