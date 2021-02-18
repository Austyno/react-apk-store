const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'please add a title'],
		},
		content: {
			type: String,
			required: [true, 'please add content to the blog'],
		},
		image: {
			type: String,
		},
		category: {
			type: mongoose.Schema.ObjectId,
			ref: 'Category',
		},
	},
	{
		timestamps: true,
	}
)
module.exports = mongoose.model('Blog', blogSchema)
