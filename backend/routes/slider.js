const router = require('express').Router();
const { protect, admin } = require('../middleware/auth');
const { getSliders, createSlide, slideShow } = require('../controllers/slider');

router
	.route('/slides')
	.get(protect, admin, getSliders)
	.post(protect, admin, createSlide);

router.route('/').get(slideShow);

module.exports = router;
