const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema(
	{
		categoryName: {
			type: String,
			required: [true, 'Please add a category name'],
			trim: true,
		},
	},
	{
		toJSON: { virtuals: true },
	},
	{
		timestamps: true,
	}
)

CategorySchema.virtual('products', {
	ref: 'Product',
	localField: '_id',
	foreignField: 'category',
	justOne: false,
})

module.exports = mongoose.model('Category', CategorySchema)
