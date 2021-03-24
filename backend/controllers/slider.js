const Slider = require('../models/Slider')
const errorHandler = require('../utils/errorHandler')

exports.addSlider = async (req, res, next) => {
	try {
		const slide = await Slider.create(req.body)
		return res.status(200).json({
			success: true,
			data: slide,
		})
	} catch (error) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		})
	}
}

exports.getSliders = async (req, res, next) => {
	try {
		const images = await Slider.find()
		return res.status(200).json({
			success: true,
			data: images,
		})
	} catch (error) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		})
	}
}
