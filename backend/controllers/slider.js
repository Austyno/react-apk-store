const Slider = require('../models/Slider');
const errorHandler = require('../utils/errorHandler');

exports.createSlide = async (req, res, next) => {
	try {
		const slide = await Slider.create(req.body);
		return res.status(200).json({
			success: true,
			data: slide,
		});
	} catch (error) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

exports.getSliders = async (req, res, next) => {
	try {
		const images = await Slider.find().sort({ createdAt: -1 });
		return res.status(200).json({
			success: true,
			data: images,
		});
	} catch (error) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(error),
		});
	}
};
exports.slideShow = async (req, res, next) => {
	try {
		const slides = await Slider.find().sort({ createdAt: -1 }).limit(4);
		res.status(200).json({
			success: true,
			data: slides,
		});
	} catch (error) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(error),
		});
	}
};

exports.deleteSlide = async(req,res,next) => {
	const id = req.params.id
	try {
		const del = await Slider.findByIdAndDelete(id)
		res.status(200).json({
			success: true,
			data: ''
		})
	} catch (error) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(error),
		});
	}
}
