const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: [true, 'this email is already in use'],
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'please enter a valid email',
			],
		},
		password: {
			type: String,
			minlength: [6, 'Password should be 6 character long'],
			required: [true, 'Please add a password'],
			select: false,
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
		myApps: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }],
		resetPasswordToken: String,
		resetPasswordExpire: Date,
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
)

UserSchema.pre('remove', async function (next) {
	await this.model('Review').deleteMany({ userId: this._id })
	await this.model('Order').deleteMany({ userId: this._id })
	next()
})

UserSchema.virtual('reviews', {
	ref: 'Review',
	localField: '_id',
	foreignField: 'user',
})
UserSchema.virtual('products', {
	ref: 'Product',
	localField: '_id',
	foreignField: 'uploadedBy',
})

module.exports = mongoose.model('User', UserSchema)
